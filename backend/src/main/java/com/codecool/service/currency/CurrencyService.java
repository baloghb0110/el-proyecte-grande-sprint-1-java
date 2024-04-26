package com.codecool.service.currency;

import com.codecool.entity.Currency;
import com.codecool.repository.CurrencyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CurrencyService {
  private final CurrencyRepository currencyRepository;

  @Autowired
  public CurrencyService(CurrencyRepository currencyRepository) {
    this.currencyRepository = currencyRepository;
  }

  public Currency findCurrencyByCode(String currencyCode) {
    return currencyRepository.findCurrenciesByName(currencyCode);
  }
}
