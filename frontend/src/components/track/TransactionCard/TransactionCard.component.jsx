import { useCurrencyFormatter } from '@src/hooks';
import {
  useEffect,
  useState,
} from 'react';
import useDeleteTransaction from './TransactionCard.hooks.jsx';
import './TransactionCard.styles.css';

const provideAmountColor = (amount) => {
  return amount > 0 ? 'transaction-card-income' : 'transaction-card-expense';
};

const provideAmountSign = (amount) => {
  return amount > 0 ? '+' : '';
};

const TransactionCard = ({ transaction, refetch }) => {
  const [enableDelete, setEnableDelete] = useState(false);
  const { responseData, responseStatus, isTransactionLoading, isTransactionError } = useDeleteTransaction(transaction.id, enableDelete);
  const { formatCurrency } = useCurrencyFormatter();
  const handleClick = () => {
    setEnableDelete(true);
    refetch();
  };

  useEffect(() => {
    if (enableDelete && isTransactionLoading) {
      refetch();
    }
  }, [isTransactionLoading]);

  return (
    <div className={'transaction-card-container'}>
      <div className={'transaction-card-upper-container'}>
        <h2 className={provideAmountColor(transaction.amount)}>{provideAmountSign(transaction.amount)}{formatCurrency(transaction.amount)}</h2>
        <h2>{transaction.dateOfTransaction}</h2>
        <button type={'button'} onClick={handleClick}> X </button>
      </div>
      <div className={'transaction-card-bottom-container'}>
        <h3>{transaction.description}</h3>
      </div>
    </div>
  );
};

export default TransactionCard;
