package com.codecool.dto.transactions;

import java.util.List;

public record MonthlyTransactionsDTO(
  List<ExternalTransactionDTO> externalTransactionDTOS,
  List<LocalTransactionDTO> localTransactionDTOS
) {}
