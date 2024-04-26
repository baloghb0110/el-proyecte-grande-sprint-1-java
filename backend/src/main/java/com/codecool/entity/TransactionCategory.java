package com.codecool.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity()
@Table(name = "transaction_categories")
@Getter
@Setter
public class TransactionCategory {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id")
  private int id;

  @Column(name = "name")
  private String name;

  @ManyToMany(mappedBy = "categories")
  @JsonBackReference
  private List<TrackeroUser> trackeroUsers;

  public TransactionCategory() {
    this.trackeroUsers = new ArrayList<>();
  }
}
