package com.codecool.service.transaction;

import com.codecool.dto.transactions.NewExternalTransactionDTO;
import com.codecool.entity.ExternalTransaction;
import com.codecool.entity.TrackeroUser;
import com.codecool.entity.TransactionCategory;
import com.codecool.repository.ExternalTransactionRepository;
import com.codecool.repository.TransactionCategoryRepository;
import com.codecool.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class ExternalTransactionService {
  private final ExternalTransactionRepository externalTransactionRepository;
  private final UserRepository userRepository;
  private final TransactionCategoryRepository transactionCategoryRepository;

  @Autowired
  public ExternalTransactionService(ExternalTransactionRepository externalTransactionRepository, UserRepository userRepository, TransactionCategoryRepository transactionCategoryRepository) {
    this.externalTransactionRepository = externalTransactionRepository;
    this.userRepository = userRepository;
    this.transactionCategoryRepository = transactionCategoryRepository;
  }

  public List<ExternalTransaction> findTransactionsByYearAndMonth(int userId, int currentYear, int currentMonth) {
    return externalTransactionRepository.findAllByYearAndMonth(userId, currentYear, currentMonth);
  }

  @Transactional
  public ExternalTransaction addTransaction(TrackeroUser user, NewExternalTransactionDTO newExternalTransactionDTO) {
    TransactionCategory transactionCategory = transactionCategoryRepository.findById(newExternalTransactionDTO.categoryId()).get();

    ExternalTransaction externalTransaction = new ExternalTransaction(
      user,
      newExternalTransactionDTO.description(),
      newExternalTransactionDTO.dateOfTransaction(),
      newExternalTransactionDTO.amount(),
      newExternalTransactionDTO.isPlanned(),
      newExternalTransactionDTO.isRecurring(),
      user.getAccount(),
      transactionCategory
    );

    externalTransactionRepository.save(externalTransaction);

    return externalTransaction;
  }
}
