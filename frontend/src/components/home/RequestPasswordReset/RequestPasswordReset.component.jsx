import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  FormError,
  InputField,
  SubmitButton,
} from '@src/components/form-related';
import {
  FormSwapButton,
  Title,
} from '../index.js';
import { useHandleRequestPasswordFormOnSubmit } from './RequestPasswordReset.hooks.jsx';
import { iconLibraryConfig } from '@src/config';
import './RequestPasswordReset.styles.css';

const RequestPasswordReset = ({ clickHandler, handleModal }) => {
  const { isLoading, errorMessage, onSubmit } = useHandleRequestPasswordFormOnSubmit(handleModal);

  return (
    <>
      <Title title={'Who are you?'} />
      <form
        id={'resetForm'}
        onSubmit={(event) => onSubmit(event)}
      >
        <InputField
          id={'resetEmail'}
          labelContent={'Email'}
          type={'email'}
          placeholder={'Enter your email address...'}
        />
        {!isLoading ?
          <article>
            <SubmitButton />
            {errorMessage && <FormError errorMessage={errorMessage} />}
          </article> :
          <FontAwesomeIcon icon={iconLibraryConfig.faCircleNotch} spin className={'loading-icon'} />}
      </form>
      <article className={'bottom-button-container'}>
        <FormSwapButton buttonName={'login'} buttonContent={'Sign in'} clickHandler={clickHandler} />
        <FormSwapButton buttonName={'register'} buttonContent={'Create account'} clickHandler={clickHandler} />
      </article>
    </>
  );
};

export default RequestPasswordReset;
