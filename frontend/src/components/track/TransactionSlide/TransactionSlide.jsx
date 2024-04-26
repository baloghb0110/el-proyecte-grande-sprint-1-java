import './TransactionSlide.css';
import { useCurrencyFormatter } from '@src/hooks';

const TransactionSlide = ({ transactionData }) => {
  const { formatCurrency } = useCurrencyFormatter();


  return (
    <div className={'transaction-slide'}>
      <p> {formatCurrency(transactionData.amount)} </p>
      <p> { transactionData.description }</p>
      <button> X </button>
    </div>
  );
};

export default TransactionSlide;
