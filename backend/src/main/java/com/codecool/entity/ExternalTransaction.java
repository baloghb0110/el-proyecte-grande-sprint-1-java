package com.codecool.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Table(name = "external_transactions")
@Getter
@Setter
@NoArgsConstructor
public class ExternalTransaction extends Transaction {
  @ManyToOne
  @JoinColumn(name = "account_id")
  protected Account account;

  @OneToOne
  @JoinColumn(name = "category_id")
  protected TransactionCategory category;

  public ExternalTransaction(
    TrackeroUser trackeroUser,
    String description,
    LocalDate dateOfTransaction,
    double amount,
    boolean isPlanned,
    boolean isRecurring,
    Account account,
    TransactionCategory category) {
    super(trackeroUser, description, dateOfTransaction, amount, isPlanned, isRecurring);
    this.account = account;
    this.category = category;
  }

  public String getCategoryName() {
    return category.getName();
  }
}
