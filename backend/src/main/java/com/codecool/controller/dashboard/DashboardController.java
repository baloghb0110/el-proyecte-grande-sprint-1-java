package com.codecool.controller.dashboard;

import com.codecool.dto.account.DashboardDataDTO;
import com.codecool.entity.Account;
import com.codecool.entity.TrackeroUser;
import com.codecool.service.account.AccountService;
import com.codecool.service.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "/api/dashboard")
public class DashboardController {
  private final AccountService accountService;
  private final UserService userService;

  @Autowired
  public DashboardController(AccountService accountService, UserService userService) {
    this.accountService = accountService;
    this.userService = userService;
  }

  @GetMapping(value = "", produces = "application/json")
  @ResponseStatus(HttpStatus.OK)
  public ResponseEntity<DashboardDataDTO> getAccountData() {
    User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    TrackeroUser trackeroUser = userService.findUserByEmail(user.getUsername());
    Account userAccount = accountService.findAccountById(trackeroUser.getAccount().getId());

    DashboardDataDTO dashboardData = new DashboardDataDTO(
      trackeroUser.getId(),
      userAccount.getId(),
      userAccount.getName(),
      userAccount.getActualBalance(),
      userAccount.getSavingsBalance()
    );

    return new ResponseEntity<>(dashboardData, HttpStatus.OK);
  }
}
