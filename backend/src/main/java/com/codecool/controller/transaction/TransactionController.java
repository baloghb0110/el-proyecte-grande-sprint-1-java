package com.codecool.controller.transaction;
import com.codecool.dto.transactions.ExternalTransactionDTO;
import com.codecool.dto.transactions.LocalTransactionDTO;
import com.codecool.dto.transactions.MonthlyTransactionsDTO;
import com.codecool.dto.transactions.NewExternalTransactionDTO;
import com.codecool.entity.ExternalTransaction;
import com.codecool.entity.LocalTransaction;
import com.codecool.entity.TrackeroUser;
import com.codecool.service.account.AccountService;
import com.codecool.service.transaction.ExternalTransactionService;
import com.codecool.service.transaction.LocalTransactionsService;
import com.codecool.service.transaction.MainTransactionService;
import com.codecool.service.transactionCategory.TransactionCategoryService;
import com.codecool.service.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/transaction")
public class TransactionController {
    private final MainTransactionService mainTransactionService;
    private final ExternalTransactionService externalTransactionService;
    private final TransactionCategoryService transactionCategoryService;
    private final LocalTransactionsService localTransactionsService;
    private final AccountService accountService;
    private final UserService userService;

    @Autowired
    public TransactionController(
      MainTransactionService mainTransactionService,
      LocalTransactionsService localTransactionsService,
      ExternalTransactionService externalTransactionService,
      TransactionCategoryService transactionCategoryService,
      AccountService accountService,
      UserService userService) {
        this.mainTransactionService = mainTransactionService;
        this.externalTransactionService = externalTransactionService;
        this.transactionCategoryService = transactionCategoryService;
        this.accountService = accountService;
        this.localTransactionsService = localTransactionsService;
        this.userService = userService;
    }

    @GetMapping("/{year}/{month}")
    public ResponseEntity<MonthlyTransactionsDTO> getTransactionsForMonth(@PathVariable int year, @PathVariable int month) {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        TrackeroUser trackeroUser = userService.findUserByEmail(user.getUsername());
        MonthlyTransactionsDTO result = mainTransactionService.getMonthlyTransactions(trackeroUser.getId(), year, month);

        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @PostMapping("/add/external-transaction")
    public ResponseEntity<ExternalTransactionDTO> addTransaction(@RequestBody NewExternalTransactionDTO newExternalTransaction) {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        TrackeroUser trackeroUser = userService.findUserByEmail(user.getUsername());

        ExternalTransaction externalTransaction = externalTransactionService.addTransaction(trackeroUser, newExternalTransaction);
        accountService.updateBalance(newExternalTransaction.accountId(), newExternalTransaction.amount());

        ExternalTransactionDTO externalTransactionDTO = new ExternalTransactionDTO(
          externalTransaction.getId(),
          externalTransaction.getDescription(),
          externalTransaction.getDateOfTransaction(),
          externalTransaction.getAmount(),
          externalTransaction.isPlanned(),
          externalTransaction.isRecurring(),
          externalTransaction.getCategoryName()
        );

        return new ResponseEntity<>(externalTransactionDTO, HttpStatus.CREATED);
    }

    @PostMapping("/add/local-transaction")
    public ResponseEntity<LocalTransactionDTO> addLocalTransaction(@RequestBody LocalTransactionDTO localTransactionDTO) {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        TrackeroUser trackeroUser = userService.findUserByEmail(user.getUsername());

        localTransactionsService.addTransaction( localTransactionDTO );
        accountService.updateBalance( trackeroUser.getAccount().getId(), localTransactionDTO.amount() * -1);
        accountService.updateSavingsBalance( trackeroUser.getAccount().getId(), localTransactionDTO.amount());


        return new ResponseEntity<>(localTransactionDTO,HttpStatus.CREATED);
    }

    @DeleteMapping("/delete/local-transaction")
    public ResponseEntity<LocalTransaction> deleteLocalTransaction(@RequestBody int transactionId) {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        LocalTransaction localTransaction = localTransactionsService.deleteTransaction(transactionId);

        return new ResponseEntity<>(localTransaction,HttpStatus.ACCEPTED);
    }
}
