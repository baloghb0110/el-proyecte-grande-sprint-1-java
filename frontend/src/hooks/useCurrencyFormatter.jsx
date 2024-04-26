const useCurrencyFormatter = () => {
  const formatCurrency = (currency) => {
    if(!currency) return '0 Ft';
    return currency.toLocaleString('hu-HU', {
      style: 'currency',
      currency: 'HUF',
      maximumFractionDigits: 0
    });

  };

  return {
    formatCurrency,
  };
};

export default useCurrencyFormatter;
