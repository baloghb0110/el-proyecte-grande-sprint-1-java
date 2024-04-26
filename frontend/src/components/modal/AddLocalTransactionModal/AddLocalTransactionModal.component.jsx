import { useUpdateLocalBalance } from '@src/hooks/useUpdateLocalBalance.jsx';
import {
  useEffect,
  useRef,
  useState,
} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  FormError,
  InputField,
  SingleCheckbox,
  SubmitButton,
} from '@src/components/form-related';
import { iconLibraryConfig } from '@src/config';
import { useHandleAddTransactionFormOnSubmit } from './AddLocalTransactionModal.hooks.jsx';
import './AddLocalTransactionModal.styles.css';

const AddLocalTransactionModal = ({ isModalVisible, handleOnClick, handleOnKeyClose, transactionDirection }) => {

  const { loading, errorMessage, onSubmit } = useHandleAddTransactionFormOnSubmit(handleOnClick, transactionDirection);
  const [ids, setIds] = useState({ userId: 0, accountId: 0 });
  const dialogRef = useRef(null);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('userData'));
    setIds({ userId: userData.userId, accountId: userData.accountId });

    if (dialogRef.current?.open && !isModalVisible) {
      dialogRef.current?.close();
    } else if (!dialogRef.current?.open && isModalVisible) {
      dialogRef.current?.showModal();
    }
  }, [isModalVisible]);

  return (
    <dialog
      className={'add-transaction-modal'}
      ref={dialogRef}
      onKeyDown={(event) => handleOnKeyClose(event)}
    >
      <button className={'close-x-button'} onClick={handleOnClick}>X</button>
      <form
        id={'addTransactionForm'}
        onSubmit={(event) => onSubmit(event)}
      >
        <InputField
          type={'hidden'}
          id={'userId'}
          defaultValue={ids.userId}
        />
        <InputField
          type={'hidden'}
          id={'accountId'}
          defaultValue={ids.accountId}
        />
        <InputField
          type={'text'}
          id={'description'}
          labelContent={'Description'}
          placeholder={'Add a short optional description'}
        />
        <InputField
          type={'number'}
          id={'amount'}
          labelContent={'Transaction amount'}
          placeholder={'Add amount'}
        />
        <InputField
          type={'date'}
          id={'dateOfTransaction'}
          labelContent={'Date of Transaction'}
        />
        <SingleCheckbox
          id={'isRecurring'}
          labelContent={'Is this a monthly recurring item?'}
        />
        {!loading ?
          <article>
            <SubmitButton />
            {errorMessage && <FormError errorMessage={errorMessage} />}
          </article> :
          <FontAwesomeIcon icon={iconLibraryConfig.faCircleNotch} spin className={'transaction-loading-icon'} />}
      </form>
    </dialog>
  );
};

export default AddLocalTransactionModal;
