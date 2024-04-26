package com.codecool.dto.user;

import com.codecool.entity.TransactionCategory;

import java.util.Date;
import java.util.List;

public record AboutMeDTO(
  int id,
  String email,
  String username,
  List<String> userRoles,
  Double actualBalance,
  Double savingsBalance,
  Date dateOfRegistration,
  List<TransactionCategory> categories

) {}
