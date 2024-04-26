package com.codecool.dto.account;

public record DashboardDataDTO(
  int userId,
  int accountId,
  String accountName,
  double actualBalance,
  double savingsBalance
) {}
