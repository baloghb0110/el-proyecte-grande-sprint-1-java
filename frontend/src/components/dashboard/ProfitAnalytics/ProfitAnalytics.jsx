import { useEffect, useState } from 'react';
import { useUser } from '@src/context/UserContext.jsx';
import { useCurrencyFormatter } from '@src/hooks';
import './ProfitAnalytics.css';

const ProfitAnalytics = ({ transactionsData, isTransactionLoading }) => {
  const [profit, setProfit] = useState(0);
  const [topThreeCategories, setTopThreeCategories] = useState([]);
  const { user } = useUser();
  const { formatCurrency } = useCurrencyFormatter();

  if (isTransactionLoading) {
    return (
      <div>Loading data...</div>
    );
  }

  const calculateProfit = () => {
    if (!transactionsData?.externalTransactionDTOS) return 0;
    const allExpenseThisMonth = transactionsData?.externalTransactionDTOS.filter((transaction) => transaction.amount < 0).reduce((acc, curr) => acc + curr.amount, 0);
    const allIncomeThisMonth = transactionsData?.externalTransactionDTOS.filter((transaction) => transaction.amount > 0).reduce((acc, curr) => acc + curr.amount, 0);

    return (allIncomeThisMonth + allExpenseThisMonth);
  };

  const getSpendings = (exTransactionList) => {
    if (!exTransactionList) return [];

    return exTransactionList.filter((tr) => tr.amount < 0).reverse();
  }; //TODO Remove code duplication ( spendings component )

  const getAmountSumOf = (list) => {
    let sum = 0;

    for (let i = 0; i < list.length; i++) {
      sum += list[i].amount;
    }

    return sum;
  }; //TODO Remove code duplication ( spendings component )

  const calculateSumForCategories = (categoryNameList, exTransactionList) => {
    const result = [];
    const spendingList = getSpendings(exTransactionList);

    for (let i = 0; i < categoryNameList.length; i++) {
      const transactionsByCategory = spendingList
        .filter((tr) => tr.categoryName === categoryNameList[i]);

      result.push({ name: categoryNameList[i], sum: getAmountSumOf(transactionsByCategory) });
    }

    return result.sort((a, b) => a.sum - b.sum).slice(0, 3);
  }; //TODO Remove code duplication ( spendings component )

  useEffect(() => {
    let categoryNameArray = [];

    if (user.categories !== undefined) {
      categoryNameArray = user.categories.map((category) => category.name);
    }

    setProfit(calculateProfit());
    setTopThreeCategories(calculateSumForCategories(categoryNameArray, transactionsData?.externalTransactionDTOS));
  }, [isTransactionLoading]);

  return (
    <div className={'profit-analytics-container'}>
      <h2>Total profit this month</h2>
      <h3 className={profit > 0 ? 'profit-sum positive-profit' : 'profit-sum negative-profit'} >{ formatCurrency(profit) }</h3>
      <p> Top three expense categories</p>
      <section className={'profit-analytics-category-container'}>
        { topThreeCategories.map((category) => {
          return (
            <div className={'profit-analytics-category'} key={category.name}>
              <b>{category.name}</b>
              <p>{formatCurrency(category.sum)}</p>
            </div>
          );
        })}
      </section>
    </div>
  );
};

export default ProfitAnalytics;

