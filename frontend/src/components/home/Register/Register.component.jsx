import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  FormSwapButton,
  Title,
} from '@src/components/home';
import {
  FormError,
  InputField,
  PasswordInputField,
  SubmitButton,
} from '@src/components/form-related';
import { useHandleRegisterFormOnSubmit } from './Register.hooks.jsx';
import { iconLibraryConfig } from '@src/config';
import './Register.styles.css';

const Register = ({ clickHandler }) => {
  const { isLoading, errorMessage, onSubmit } = useHandleRegisterFormOnSubmit();

  return (
    <>
      <Title title={'Who are you?'} />
      <form
        id={'registerForm'}
        onSubmit={(event) => onSubmit(event)}
      >
        <InputField
          id={'registerEmail'}
          labelContent={'Email'}
          type={'email'}
          placeholder={'Enter your email address...'}
        />
        <PasswordInputField
          id={'registerPassword'}
          labelContent={'Password'}
          placeholder={'Enter your password...'}
        />
        <PasswordInputField
          id={'registerPasswordRepeat'}
          labelContent={'Password'}
          placeholder={'Enter your password...'}
        />
        {!isLoading ?
          <article>
            <SubmitButton />
            {errorMessage && <FormError errorMessage={errorMessage} />}
          </article> :
          <FontAwesomeIcon icon={iconLibraryConfig.faCircleNotch} spin className={'loading-icon'} />}
      </form>
      <article className={'bottom-button-container'}>
        <FormSwapButton buttonName={'reset'} buttonContent={'Forgot password?'} clickHandler={clickHandler} />
        <FormSwapButton buttonName={'login'} buttonContent={'Sign in'} clickHandler={clickHandler} />
      </article>
    </>
  );
};

export default Register;
