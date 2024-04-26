package com.codecool.service.transaction;

import com.codecool.dto.transactions.ExternalTransactionDTO;
import com.codecool.dto.transactions.MonthlyTransactionsDTO;
import com.codecool.dto.transactions.LocalTransactionDTO;
import com.codecool.entity.ExternalTransaction;
import com.codecool.entity.LocalTransaction;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MainTransactionService {
    private final ExternalTransactionService externalTransactionService;
    private final LocalTransactionsService localTransactionsService;

    @Autowired
    public MainTransactionService(ExternalTransactionService externalTransactionService, LocalTransactionsService localTransactionsService) {
        this.externalTransactionService = externalTransactionService;
        this.localTransactionsService = localTransactionsService;
    }

    public MonthlyTransactionsDTO getMonthlyTransactions(int userId, int year, int month) {
        List<ExternalTransaction> externalTransactions = externalTransactionService.findTransactionsByYearAndMonth(userId,year,month);
        List<LocalTransaction> localTransactions = localTransactionsService.findTransactionsByYearAndMonth(userId,year,month);

        return new MonthlyTransactionsDTO(
            mapExternalTransactionsToExternalDTOList(externalTransactions),
            mapLocalTransactionsToLocalDTOList(localTransactions)
        );
    }

    private LocalTransactionDTO convertTransactionToLocalDTO( LocalTransaction transaction ) {
        return new LocalTransactionDTO(
            transaction.getId(),
            transaction.getUser().getId(),
            transaction.getDescription(),
            transaction.getDateOfTransaction(),
            transaction.getAmount(),
            transaction.isPlanned(),
            transaction.isRecurring()
        );
    }

    private ExternalTransactionDTO convertTransactionToExternalDTO( ExternalTransaction transaction ) {
        return new ExternalTransactionDTO(
            transaction.getId(),
            transaction.getDescription(),
            transaction.getDateOfTransaction(),
            transaction.getAmount(),
            transaction.isPlanned(),
            transaction.isRecurring(),
            transaction.getCategoryName()
        );
    }

    private List<LocalTransactionDTO> mapLocalTransactionsToLocalDTOList( List<LocalTransaction> localTransactions ) {
        return localTransactions
            .stream()
            .map(this::convertTransactionToLocalDTO)
            .toList();
    }

    private List<ExternalTransactionDTO> mapExternalTransactionsToExternalDTOList( List<ExternalTransaction> externalTransactions ) {
        return externalTransactions
            .stream()
            .map(this::convertTransactionToExternalDTO)
            .toList();
    }
}
