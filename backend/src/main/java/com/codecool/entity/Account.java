package com.codecool.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "accounts")
@Getter
@Setter
@NoArgsConstructor
public class Account {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id")
  private int id;

  @Column(name = "name")
  private String name;

  @Column(name = "description")
  private String description;

  @Column(name = "actual_balance")
  private double actualBalance;

  @Column(name = "savings_balance")
  private double savingsBalance;

  @OneToOne(mappedBy = "account", orphanRemoval = true)
  @JsonBackReference
  private TrackeroUser trackeroUser;

  @ManyToOne
  @JoinColumn(name = "currency_id")
  @JsonIgnore
  private Currency currency;

  @OneToMany(mappedBy = "account")
  @JsonIgnore
  private List<ExternalTransaction> externalTransactionList;

  @OneToMany(mappedBy = "account")
  @JsonIgnore
  private List<LocalTransaction> localTransactionList;

  public Account(Currency currency) {
    this.currency = currency;
    this.name = "CHANGE ME";
    this.description = "FILL ME IN";
    this.actualBalance = 0.0;
    this.savingsBalance = 0.0;
    this.externalTransactionList = new ArrayList<>();
    this.localTransactionList = new ArrayList<>();
  }

  @Override
  public String toString() {
    return String.format("[Id]: %s | [Name]: %s | [Description]: %s | [Currency]: %s | [Actual Balance]: %s | [Savings Balance]: %s | [External Transaction]: %s | [Local Transaction list]: %s", id, name, description, currency, actualBalance, savingsBalance, externalTransactionList, localTransactionList);
  }
}
