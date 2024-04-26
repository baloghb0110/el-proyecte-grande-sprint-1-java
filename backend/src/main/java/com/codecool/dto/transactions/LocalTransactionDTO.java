package com.codecool.dto.transactions;

import java.time.LocalDate;

public record LocalTransactionDTO(
  int id,
  int userId,
  String description,
  LocalDate dateOfTransaction,
  double amount,
  boolean isPlanned,
  boolean isRecurring
) {}
