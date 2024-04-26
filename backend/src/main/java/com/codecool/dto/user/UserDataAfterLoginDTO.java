package com.codecool.dto.user;

import com.codecool.entity.TransactionCategory;
import com.codecool.config.webSecurity.JwtResponse;

import java.sql.Timestamp;
import java.util.List;

public record UserDataAfterLoginDTO(
  int id,
  Timestamp dateOfRegistration,
  String userName,
  String email,
  List<TransactionCategory> categories,
  JwtResponse jwtResponse
) {}
