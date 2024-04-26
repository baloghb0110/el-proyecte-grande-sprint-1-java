import {
  useEffect,
  useRef,
} from 'react';
import './PasswordResetConfirmationModal.styles.css';

const PasswordResetConfirmationModal = ({ isModalVisible, handleOnClick, handleOnKeyClose }) => {
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
      className={'forgotten-password-modal'}
      ref={dialogRef}
      onKeyDown={(event) => handleOnKeyClose(event)}
    >
      <button className={'close-x-button'} onClick={handleOnClick}>X</button>
      <p>A password reset email was successfully sent to your email address. Kindly ask you to follow the steps detailed there.</p>
    </dialog>
  );
};

export default PasswordResetConfirmationModal;
