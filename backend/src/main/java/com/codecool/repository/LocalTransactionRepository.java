package com.codecool.repository;

import com.codecool.entity.LocalTransaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface LocalTransactionRepository extends JpaRepository<LocalTransaction, Integer> {
  @Query(
    value = """
      SELECT
        *
      FROM
        local_transactions
      WHERE
        user_id = :userId AND
        EXTRACT(YEAR FROM date_of_transaction) = :year AND
        EXTRACT(MONTH FROM date_of_transaction) = :month
    """, nativeQuery = true
  )
  List<LocalTransaction> findAllByYearAndMonth(@Param("userId") int userId, @Param("year") int year, @Param("month") int month);
  LocalTransaction findLocalTransactionById( int transactionID );
}
