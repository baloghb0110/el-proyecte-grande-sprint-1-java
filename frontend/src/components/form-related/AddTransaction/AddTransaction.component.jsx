import './AddTransaction.styles.css';

const AddTransaction = ({ handleOnClick }) => {
  return (
    <button
      className={'add-transaction'}
      type={'button'}
      onClick={handleOnClick}
    >
      ADD TRANSACTION
    </button>
  );
};

export default AddTransaction;
