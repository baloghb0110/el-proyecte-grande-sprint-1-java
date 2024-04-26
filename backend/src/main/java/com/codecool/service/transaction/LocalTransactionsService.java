package com.codecool.service.transaction;

import com.codecool.dto.transactions.LocalTransactionDTO;
import com.codecool.entity.LocalTransaction;
import com.codecool.entity.TrackeroUser;
import com.codecool.repository.LocalTransactionRepository;
import com.codecool.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class LocalTransactionsService {
  private final LocalTransactionRepository localTransactionRepository;
  private final UserRepository userRepository;

  public LocalTransactionsService(LocalTransactionRepository localTransactionRepository, UserRepository userRepository) {
    this.localTransactionRepository = localTransactionRepository;
    this.userRepository = userRepository;
  }

  public List<LocalTransaction> findTransactionsByYearAndMonth(int userId, int currentYear, int currentMonth) {
    return localTransactionRepository.findAllByYearAndMonth(userId, currentYear, currentMonth);
  }

  public LocalTransaction addTransaction(LocalTransactionDTO localTransactionDTO) {
    Optional<TrackeroUser> user = userRepository.findById(localTransactionDTO.userId());

    LocalTransaction localTransaction = new LocalTransaction(
            user.get(),
            localTransactionDTO.description(),
            localTransactionDTO.dateOfTransaction(),
            localTransactionDTO.amount(),
            localTransactionDTO.isPlanned(),
            localTransactionDTO.isRecurring(),
            user.get().getAccount()
    );

    localTransactionRepository.save(localTransaction);

    return localTransaction;
  }

  public LocalTransaction deleteTransaction(int transactionId) {
    LocalTransaction localTransaction = localTransactionRepository.findLocalTransactionById(transactionId);

    localTransactionRepository.delete(localTransaction);

    return localTransaction;
  }
}
