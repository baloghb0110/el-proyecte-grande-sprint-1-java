package com.codecool.dto.access;

public record EmailDetailsDTO(
  String recipient,
  String subject,
  String messageBody
) {}
