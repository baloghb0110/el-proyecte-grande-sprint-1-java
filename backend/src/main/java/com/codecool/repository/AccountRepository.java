package com.codecool.repository;

import com.codecool.entity.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface AccountRepository extends JpaRepository<Account, Integer> {
  Optional<Account> findById(int accountId);

  @Modifying
  @Query(
    value =
      """
        UPDATE
          accounts
        SET
          actual_balance = actual_balance + :amount
        WHERE
          id = :accountId
      """, nativeQuery = true
  )
  void updateAccountBalanceById(@Param("accountId") int accountId, @Param("amount") double amount);

  @Modifying
  @Query(
          value =
                  """
                    UPDATE
                      accounts
                    SET
                      savings_balance = savings_balance + :amount
                    WHERE
                      id = :accountId
                  """, nativeQuery = true
  )
  void updateAccountSavingsBalanceById(@Param("accountId") int accountId, @Param("amount") double amount);
}
