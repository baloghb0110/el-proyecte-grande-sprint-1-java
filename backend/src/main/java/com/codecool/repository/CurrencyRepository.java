package com.codecool.repository;

import com.codecool.entity.Currency;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface CurrencyRepository extends JpaRepository<Currency, Integer> {
  @Query(value =
    """
      SELECT
        *
      FROM
        currencies
      WHERE
        name = :currencyCode
    """, nativeQuery = true
  )
  Currency findCurrenciesByName(@Param("currencyCode") String currencyCode);
}
