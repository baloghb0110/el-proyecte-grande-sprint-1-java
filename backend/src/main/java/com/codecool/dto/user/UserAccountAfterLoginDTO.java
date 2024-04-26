package com.codecool.dto.user;

import com.codecool.entity.ExternalTransaction;
import com.codecool.entity.LocalTransaction;

import java.util.List;

public record UserAccountAfterLoginDTO(
  int id,
  String name,
  String description,
  double actualBalance,
  double savingsBalance,
  List<ExternalTransaction> externalTransactions,
  List<LocalTransaction> localTransactions
) {}
