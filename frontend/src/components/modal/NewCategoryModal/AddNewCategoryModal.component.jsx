import {
  useEffect,
  useRef,
  useState,
} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  FormError,
  InputField,
  SubmitButton,
} from '@src/components/form-related';
import { iconLibraryConfig } from '@src/config';
import { useHandleFormOnSubmit } from './AddNewCategoryModal.hooks.jsx';
import './AddNewCategoryModal.styles.css';

const AddNewCategoryModal = ({ isModalVisible, handleOnClick, handleOnKeyClose }) => {
  const { loading, errorMessage, onSubmit } = useHandleFormOnSubmit(handleOnClick);
  const dialogRef = useRef(null);

  useEffect(() => {
    if (dialogRef.current?.open && !isModalVisible) {
      dialogRef.current?.close();
    } else if (!dialogRef.current?.open && isModalVisible) {
      dialogRef.current?.showModal();
    }
  }, [isModalVisible]);

  return (
    <dialog
      className={'add-category-modal'}
      ref={dialogRef}
      onKeyDown={(event) => handleOnKeyClose(event)}
    >
      <button className={'close-x-button'} onClick={handleOnClick}>X</button>
      <form
        id={'addCategoryForm'}
        onSubmit={(event) => onSubmit(event)}
      >
        <InputField
          type={'text'}
          id={'name'}
          labelContent={'Category name'}
          placeholder={'Category name'}
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

export default AddNewCategoryModal;
