package com.codecool.dto.user;

import java.util.UUID;

public record GetAccountDTO(
  UUID uuid,
  String name,
  String description,
  String currency,
  double actualBalance,
  double savingsBalance
) {}
