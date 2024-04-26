import {
  useEffect,
  useRef,
  useState,
} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  FormError,
  InputField,
  SelectField,
  SingleCheckbox,
  SubmitButton,
} from '@src/components/form-related';
import { iconLibraryConfig } from '@src/config';
import { useHandleAddTransactionFormOnSubmit } from './AddTransactionModal.hooks.jsx';
import './AddTransactionModal.styles.css';

const AddTransactionModal = ({ isModalVisible, handleOnClick, handleOnKeyClose, data }) => {
  const { isLoading, errorMessage, onSubmit } = useHandleAddTransactionFormOnSubmit(handleOnClick);
  const [ids, setIds] = useState({ userId: 0, accountId: 0 });
  const [options, setOptions] = useState([]);
  const dialogRef = useRef(null);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('userData'));

    setOptions(userData.category);
    setIds({ userId: data.userId, accountId: data.accountId });

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
        <SelectField
          id={'categoryId'}
          options={options}
          labelContent={'Category'}
          defaultValue={'select a category'}
        />
        {!isLoading ?
          <article>
            <SubmitButton />
            {errorMessage && <FormError errorMessage={errorMessage} />}
          </article> :
          <FontAwesomeIcon icon={iconLibraryConfig.faCircleNotch} spin className={'transaction-loading-icon'} />}
      </form>
    </dialog>
  );
};

export default AddTransactionModal;
