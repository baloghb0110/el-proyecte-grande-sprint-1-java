package com.codecool.dto.transactions;

import java.time.LocalDate;

public record NewExternalTransactionDTO(
  int accountId,
  int userId,
  int categoryId,
  String description,
  double amount,
  LocalDate dateOfTransaction,
  boolean isRecurring,
  boolean isPlanned
) {}
