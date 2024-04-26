package com.codecool.controller.user;

import com.codecool.config.postgreSQL.PostgreSQLImpl;
import com.codecool.dto.access.ForgottenPasswordDTO;
import com.codecool.dto.access.LoginUserDTO;
import com.codecool.dto.access.NewUserDTO;
import com.codecool.dto.access.ResetPasswordDTO;
import com.codecool.dto.user.AboutMeDTO;
import com.codecool.dto.user.UserDataAfterProfileUpdateDTO;
import com.codecool.dto.user.UserDataAfterLoginDTO;
import com.codecool.entity.Account;
import com.codecool.entity.Role;
import com.codecool.entity.TrackeroUser;
import com.codecool.config.webSecurity.JwtResponse;
import com.codecool.entity.TransactionCategory;
import com.codecool.exception.FormErrorException;
import com.codecool.security.JwtUtils;
import com.codecool.service.account.AccountService;
import com.codecool.service.email.EmailService;
import com.codecool.dto.access.EmailDetailsDTO;
import com.codecool.service.role.RoleService;
import com.codecool.service.transaction.ExternalTransactionService;
import com.codecool.service.transaction.LocalTransactionsService;
import com.codecool.service.user.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.text.MessageFormat;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping(path = "/api/users")
public class UserController {
  private final UserService userService;
  private final AccountService accountService;
  private final EmailService emailService;
  private final ExternalTransactionService externalTransactionService;
  private final LocalTransactionsService localTransactionsService;
  private final RoleService roleService;
  private final UserMessages userMessages;
  private final PasswordEncoder encoder;
  private final JwtUtils jwtUtils;
  private final AuthenticationManager authenticationManager;
  private static final Logger logger = LoggerFactory.getLogger(PostgreSQLImpl.class);

  @Autowired
  public UserController(
    UserService userService,
    AccountService accountService,
    EmailService emailService,
    ExternalTransactionService externalTransactionService,
    LocalTransactionsService localTransactionsService,
    RoleService roleService,
    UserMessages userMessages,
    PasswordEncoder encoder,
    JwtUtils jwtUtils,
    AuthenticationManager authenticationManager) {
    this.userService = userService;
    this.accountService = accountService;
    this.emailService = emailService;
    this.externalTransactionService = externalTransactionService;
    this.localTransactionsService = localTransactionsService;
    this.roleService = roleService;
    this.userMessages = userMessages;
    this.encoder = encoder;
    this.jwtUtils = jwtUtils;
    this.authenticationManager = authenticationManager;
  }

  @GetMapping(value = "/me", produces = "application/json")
  @ResponseStatus(HttpStatus.OK)
  @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
  public ResponseEntity<AboutMeDTO> findUser() {
    User userDetails = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    TrackeroUser trackeroUser = userService.findUserByEmail(userDetails.getUsername());
    List<String> userRoles = userDetails.getAuthorities()
      .stream()
      .map(GrantedAuthority::getAuthority)
      .toList();
    Account account = accountService.findAccountById( trackeroUser.getAccount().getId() );
    List<TransactionCategory> categories = trackeroUser.getCategories();

    AboutMeDTO aboutMeDTO = new AboutMeDTO(
      trackeroUser.getId(),
      trackeroUser.getEmail(),
      trackeroUser.getUserName(),
      userRoles,
      account.getActualBalance(),
      account.getSavingsBalance(),
      trackeroUser.getDateOfRegistration(),
      categories
    );

    return new ResponseEntity<>(aboutMeDTO, HttpStatus.OK);
  }

  @PostMapping(value = "/login", consumes = "application/json", produces = "application/json")
  @ResponseStatus(HttpStatus.OK)
  public ResponseEntity<UserDataAfterLoginDTO> loginUser(@RequestBody LoginUserDTO userLoginData) {
    if (isLoginFormDataValidated(userLoginData)) {
      throw new FormErrorException(userMessages.LOGIN_ERROR_MESSAGE);
    }

    TrackeroUser foundTrackeroUser = userService.findUserByEmail(userLoginData.loginEmail());

    UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(userLoginData.loginEmail(), userLoginData.loginPassword());
    Authentication authentication = authenticationManager.authenticate(auth);
    SecurityContextHolder.getContext().setAuthentication(authentication);

    String jwt = jwtUtils.generateJwtToken(authentication);
    User userDetails = (User) authentication.getPrincipal();
    List<String> userRoles = userDetails.getAuthorities()
      .stream()
      .map(GrantedAuthority::getAuthority)
      .toList();

    JwtResponse jwtResponse = new JwtResponse(jwt, userDetails.getUsername(), userRoles);

    UserDataAfterLoginDTO userData = new UserDataAfterLoginDTO(
      foundTrackeroUser.getId(),
      foundTrackeroUser.getDateOfRegistration(),
      foundTrackeroUser.getUserName(),
      foundTrackeroUser.getEmail(),
      foundTrackeroUser.getCategories(),
      jwtResponse
    );
    System.out.println(userData);
    return new ResponseEntity<>(userData, HttpStatus.OK);
  }

  @PostMapping(path = "/register", consumes = "application/json")
  @ResponseStatus(HttpStatus.CREATED)
  public ResponseEntity<HttpStatus> registerUser(@RequestBody NewUserDTO userData) {
    if (isRegisterFormDataValidated(userData)) {
      throw new FormErrorException(userMessages.FORM_ERROR_MESSAGE);
    }

    userService.checkEmailInDatabase(userData.registerEmail());

    Role userRole = roleService.findRoleByName("ROLE_USER");
    userService.addUser(userData, encoder.encode(userData.registerPassword()), Set.of(userRole));

    String subject = userMessages.WELCOME_EMAIL_SUBJECT;
    String body = userMessages.WELCOME_EMAIL_BODY;
    EmailDetailsDTO emailDetailsDTO = new EmailDetailsDTO(userData.registerEmail(), subject, body);
//    emailService.sendEmail(emailDetailsDTO);

    return new ResponseEntity<>(HttpStatus.CREATED);
  }

  @PostMapping("/password-reset")
  public ResponseEntity<HttpStatus> sendResetPasswordEmail(@RequestBody ForgottenPasswordDTO userData) {
    if (userData == null || userData.resetEmail().isEmpty()) {
      throw new FormErrorException(userMessages.FORM_ERROR_MESSAGE);
    }

    TrackeroUser foundTrackeroUser = userService.findUserByEmail(userData.resetEmail());
    String subject = userMessages.PASSWORD_RESET_SUBJECT;
    // TODO send the email in hashed form.
    String body = MessageFormat.format(userMessages.PASSWORD_RESET_BODY, foundTrackeroUser.getEmail());
    EmailDetailsDTO emailDetailsDTO = new EmailDetailsDTO(foundTrackeroUser.getEmail(), subject, body);
//    emailService.sendEmail(emailDetailsDTO);

    return new ResponseEntity<>(HttpStatus.OK);
  }

  @PostMapping("/password-reset/{hashedUserEmail}")
  public ResponseEntity<HttpStatus> resetPassword(@PathVariable("hashedUserEmail") String email, @RequestBody ResetPasswordDTO userData) {
    if (email == null || userData == null || userData.resetPassword().isEmpty()) {
      throw new FormErrorException(userMessages.FORM_ERROR_MESSAGE);
    }

    TrackeroUser foundTrackeroUser = userService.findUserByEmail(email);

    // TODO - check the hashed string once it is set like that
    UserDataAfterProfileUpdateDTO updatedData = new UserDataAfterProfileUpdateDTO(foundTrackeroUser.getUserName(), email, userData.resetPassword());
    userService.updateUserProfile(updatedData, foundTrackeroUser);

    return new ResponseEntity<>(HttpStatus.OK);
  }

  @GetMapping(value = "/get-accounts", produces = "application/json")
  @ResponseStatus(HttpStatus.OK)
  @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
  public ResponseEntity<Account> getProfileAccounts() {
    User userDetails = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    TrackeroUser trackeroUser = userService.findUserByEmail(userDetails.getUsername());
    Account userAccount = accountService.findAccountById(trackeroUser.getAccount().getId());

    return new ResponseEntity<>(userAccount, HttpStatus.OK);
  }

  @PutMapping(value = "/update-profile", consumes = "application/json", produces = "application/json")
  @ResponseStatus(HttpStatus.OK)
  @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
  public ResponseEntity<?> updateProfile(@RequestBody UserDataAfterProfileUpdateDTO updatedProfileData) {
    if (isProfileUpdateFormDataValidated(updatedProfileData)) {
      throw new FormErrorException("The update was unsuccessful, please try again.");
    }

    User userDetails = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    TrackeroUser trackeroUser = userService.findUserByEmail(userDetails.getUsername());

    // if the user should be able to change his password as well, they need to enter that in the form AND the new password
    // because this auth object needs the user's original email/pw combination to validate them.
    UsernamePasswordAuthenticationToken authOriginalCredentials = new UsernamePasswordAuthenticationToken(trackeroUser.getEmail(), updatedProfileData.password());
    Authentication authOriginal = authenticationManager.authenticate(authOriginalCredentials);
    SecurityContextHolder.getContext().setAuthentication(authOriginal);

    userService.updateUserProfile(updatedProfileData, trackeroUser);

    // here the updated credentials are validated again.
    UsernamePasswordAuthenticationToken authNewCredentials = new UsernamePasswordAuthenticationToken(updatedProfileData.email(), updatedProfileData.password());
    Authentication authNew = authenticationManager.authenticate(authNewCredentials);

    String jwt = jwtUtils.generateJwtToken(authNew);
    List<String> userRoles = userDetails.getAuthorities()
      .stream()
      .map(GrantedAuthority::getAuthority)
      .toList();

    JwtResponse jwtResponse = new JwtResponse(jwt, updatedProfileData.email(), userRoles);

    UserDataAfterLoginDTO userData = new UserDataAfterLoginDTO(
      trackeroUser.getId(),
      trackeroUser.getDateOfRegistration(),
      updatedProfileData.username(),
      updatedProfileData.email(),
      trackeroUser.getCategories(),
      jwtResponse
    );

    return new ResponseEntity<>(userData, HttpStatus.OK);
  }

  private boolean isLoginFormDataValidated(LoginUserDTO userLoginData) {
    return userLoginData == null || userLoginData.loginEmail().isEmpty() || userLoginData.loginPassword().isEmpty();
  }

  private boolean isRegisterFormDataValidated(NewUserDTO userData) {
    return userData == null || userData.registerEmail().isEmpty() || userData.registerPassword().isEmpty();
  }

  private boolean isProfileUpdateFormDataValidated(UserDataAfterProfileUpdateDTO updatedProfileData) {
    return updatedProfileData == null || updatedProfileData.email().isEmpty() || updatedProfileData.password().isEmpty() || updatedProfileData.username().isEmpty();
  }
}
