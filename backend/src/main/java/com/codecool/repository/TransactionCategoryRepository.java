package com.codecool.repository;

import com.codecool.entity.TransactionCategory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TransactionCategoryRepository extends JpaRepository<TransactionCategory, Integer> {
    TransactionCategory findByName(String name);
}
