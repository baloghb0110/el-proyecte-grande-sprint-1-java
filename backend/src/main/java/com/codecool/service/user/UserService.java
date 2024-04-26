package com.codecool.service.user;

import com.codecool.dto.access.NewUserDTO;
import com.codecool.dto.user.UserDataAfterProfileUpdateDTO;
import com.codecool.entity.Account;
import com.codecool.entity.Currency;
import com.codecool.entity.Role;
import com.codecool.entity.TrackeroUser;
import com.codecool.entity.TransactionCategory;
import com.codecool.exception.FormErrorException;
import com.codecool.repository.TransactionCategoryRepository;
import com.codecool.repository.UserRepository;
import com.codecool.service.currency.CurrencyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class UserService {
  private final UserRepository userRepository;
  private final TransactionCategoryRepository transactionCategoryRepository;
  private final CurrencyService currencyService;
  private final PasswordEncoder encoder;

  @Autowired
  public UserService(UserRepository userRepository, TransactionCategoryRepository transactionCategoryRepository, CurrencyService currencyService, PasswordEncoder encoder) {
    this.userRepository = userRepository;
    this.transactionCategoryRepository = transactionCategoryRepository;
    this.currencyService = currencyService;
    this.encoder = encoder;
  }

  @Transactional
  public void addUser(NewUserDTO user, String hashedPassword, Set<Role> roles) {
    Currency currency = currencyService.findCurrencyByCode("huf");
    Account account = new Account(currency);

    TransactionCategory defaultCategoryOne = transactionCategoryRepository.findById(1).get();
    TransactionCategory defaultCategoryTwo = transactionCategoryRepository.findById(2).get();
    TransactionCategory defaultCategoryThree = transactionCategoryRepository.findById(3).get();
    TransactionCategory defaultCategoryFour = transactionCategoryRepository.findById(4).get();
    List<TransactionCategory> defaultTransactionsCategories = new ArrayList<>(){{
      add(defaultCategoryOne);
      add(defaultCategoryTwo);
      add(defaultCategoryThree);
      add(defaultCategoryFour);
    }};

    TrackeroUser newTrackeroUser = new TrackeroUser(user.registerEmail(), hashedPassword, account, roles);
    newTrackeroUser.setCategories(defaultTransactionsCategories);

    userRepository.save(newTrackeroUser);
  }

  public TrackeroUser findUserByEmail(String email) {
    Optional<TrackeroUser> user = userRepository.findByEmail(email);

    if (user.isEmpty()) {
      throw new FormErrorException("This email address is not registered in our database.");
    }

    return user.get();
  }

  public void checkEmailInDatabase(String email) {
    Optional<TrackeroUser> user = userRepository.findByEmail(email);

    if (user.isPresent()) {
      throw new FormErrorException("This email is already registered in our system. Choose another one.");
    }
  }

  @Transactional
  public void updateUserProfile(UserDataAfterProfileUpdateDTO profileData, TrackeroUser currentTrackeroUser) {
    currentTrackeroUser.setUserName(profileData.username());
    currentTrackeroUser.setEmail(profileData.email());
    currentTrackeroUser.setHashedPassword(encoder.encode(profileData.password()));

    userRepository.save(currentTrackeroUser);
  }
}
