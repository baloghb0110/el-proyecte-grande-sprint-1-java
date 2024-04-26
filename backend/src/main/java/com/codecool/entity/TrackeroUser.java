package com.codecool.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
public class TrackeroUser {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id")
  private int id;

  @Column(name = "registered_at")
  private Timestamp dateOfRegistration;

  @Column(name = "user_name")
  private String userName;

  @Column(name = "email")
  private String email;

  @Column(name = "hashed_password")
  private String hashedPassword;

  @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
  @JoinColumn(name = "account_id", referencedColumnName = "id")
  @JsonManagedReference
  private Account account;

  @ManyToMany(cascade = CascadeType.ALL)
  @JoinTable(
    name = "categories_users_join",
    joinColumns = { @JoinColumn(name = "user_id") },
    inverseJoinColumns = { @JoinColumn(name = "category_id") }
  )
  @JsonManagedReference
  private List<TransactionCategory> categories;

  @ManyToMany(fetch = FetchType.EAGER)
  @JoinTable(
    name = "users_roles_join",
    joinColumns = { @JoinColumn(name = "user_id") },
    inverseJoinColumns = { @JoinColumn(name = "role_id") }
  )
  @JsonManagedReference
  private Set<Role> roles;

  public TrackeroUser(String email, String hashedPassword, Account account, Set<Role> roles) {
    this.email = email;
    this.hashedPassword = hashedPassword;
    this.categories = new ArrayList<>();
    this.dateOfRegistration = new Timestamp(System.currentTimeMillis());
    this.userName = "CHANGE ME!";
    this.roles = roles;
    this.account = account;
  }

  @Override
  public String toString() {
    return String.format("[ENTITY]: User | [Id]: %s | [DateOfRegistration]: %s | [UserName]: %s | [Email]: %s | [Categories]: %s | [Role(s)]: %s", id, dateOfRegistration, userName, email, categories, roles);
  }
}
