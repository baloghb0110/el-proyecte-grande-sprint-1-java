package com.codecool.service.account;

import com.codecool.entity.Account;
import com.codecool.repository.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AccountService {
  private final AccountRepository accountRepository;

  @Autowired
  public AccountService(AccountRepository accountRepository) {
    this.accountRepository = accountRepository;
  }

  public Account findAccountById(int accountId) {
    return accountRepository.findById(accountId).get();
  }

  @Transactional
  public void updateBalance(int accountId, double amount) {
    accountRepository.updateAccountBalanceById(accountId, amount);
  }

  @Transactional
  public void updateSavingsBalance(int id, double amount) {
    accountRepository.updateAccountSavingsBalanceById(id,amount);
  }
}
