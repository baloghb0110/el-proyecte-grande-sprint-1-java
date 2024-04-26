import { MonthlyCharts } from '@src/components/dashboard/index.js';
import { useUser } from '@src/context/UserContext.jsx';
import { useCurrencyFormatter } from '@src/hooks';
import {
  useEffect,
  useState,
} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { iconLibraryConfig } from '@src/config';
import './Overview.styles.css';

const Overview = ({ transactions, isLoading }) => {
  const [spending, setSpending] = useState(null);
  const [income, setIncome] = useState(null);
  const [plannedSpending, setPlannedSpending] = useState(null);
  const [plannedIncome, setPlannedIncome] = useState(null);
  const [incomeArray, setIncomeArray] = useState([]);
  const [spendingArray, setSpendingArray] = useState([]);
  const { user } = useUser();
  const { formatCurrency } = useCurrencyFormatter();

  const getAmountSumOf = (list) => {
    let sum = 0;

    for (let i = 0; i < list.length; i++) {
      sum += list[i].amount;
    }

    return sum;
  };

  const getSpendingArray = (exTransactionList) => {
    return exTransactionList.filter((tr) => tr.amount < 0);
  };
  const getIncomeArray = (exTransactionList) => {
    return exTransactionList.filter((tr) => tr.amount > 0);
  };

  const calculateSpending = (exTransactionList) => {
    return getAmountSumOf(exTransactionList.filter((tr) => tr.amount < 0));
  };

  const calculateIncome = (exTransactionList) => {
    return getAmountSumOf(exTransactionList.filter((tr) => tr.amount > 0));
  };

  const calculatePlannedSpending = (exTransactionList) => {
    return getAmountSumOf(exTransactionList.filter((tr) => tr.amount < 0 && tr.isPlanned));
  };

  const calculatePlannedIncome = (exTransactionList) => {
    return getAmountSumOf(exTransactionList.filter((tr) => tr.amount > 0 && tr.isPlanned));
  };
  //TODO Implement custom hook for helper functions

  useEffect(() => {
    if (!isLoading) {
      const data = transactions.externalTransactionDTOS;

      setSpending(calculateSpending(data));
      setIncome(calculateIncome(data));
      setPlannedSpending(calculatePlannedSpending(data));
      setPlannedIncome(calculatePlannedIncome(data));
      setSpendingArray(getSpendingArray(data));
      setIncomeArray(getIncomeArray(data));
    }
  }, [transactions, isLoading]);

  return (
    <div className={'track-page-overview'}>
      {isLoading &&
        <div className={'track-page-overview-loading'}>
          <FontAwesomeIcon icon={iconLibraryConfig.faCircleNotch} spin className={'loading-icon'}/>
        </div>}
      <section className={'track-overview-summation'}>
        <div className={'track-overview-sum-container'}>
          <div className={'track-overview-sum-labels'}>
            <div>
              <b>All spendings</b>
              <p>{formatCurrency(spending)}</p>
            </div>
            <div>
              <b>Planned spendings</b>
              <p>{formatCurrency(plannedSpending)}</p>
            </div>
          </div>
          <MonthlyCharts
            transactionArray={spendingArray}
            borderColor={'rgb(192,75,75)'}
            backgroundColor={'rgba(192,75,75,0.2)'}
            dataText={'Spending'}
            isTransactionLoading={isLoading}/>
        </div>
        <div className={'track-overview-sum-container'}>
          <div className={'track-overview-sum-labels'}>
            <div>
              <b>All income</b>
              <p>{formatCurrency(income)}</p>
            </div>
            <div>
              <b>Planned income</b>
              <p>{formatCurrency(plannedIncome)}</p>
            </div>
          </div>
          <MonthlyCharts
            transactionArray={incomeArray}
            borderColor={'rgb(75,192,85)'}
            backgroundColor={'rgba(87,192,75,0.2)'}
            dataText={'income'}
            isTransactionLoading={isLoading}/>
        </div>
      </section>
      <section className={'track-page-overview-balance'}>
        <div>
          <b>Actual balance</b>
          <p>{formatCurrency(user.actualBalance)}</p>
        </div>
        <div>
          <b>Savings balance</b>
          <p>{formatCurrency(user.savingsBalance)}</p>
        </div>
      </section>
    </div>
  );
};

export default Overview;
