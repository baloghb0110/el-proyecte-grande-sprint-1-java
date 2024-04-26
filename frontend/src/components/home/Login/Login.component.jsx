import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FormError,
  InputField,
  PasswordInputField,
  SubmitButton,
} from '@src/components/form-related';
import {
  FormSwapButton,
  Title,
} from '@src/components/home';
import { useHandleLoginFormSubmission } from './Login.hooks.jsx';
import { iconLibraryConfig } from '@src/config';
import './Login.styles.css';

const Login = ({ clickHandler }) => {
  const navigate = useNavigate();
  const { isLoading, errorMessage, onSubmit } = useHandleLoginFormSubmission();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      navigate('/dashboard');
    }
  }, []);

  return (
    <>
      <Title title={'Who are you?'} />
      <form
        id={'loginForm'}
        onSubmit={(event) => onSubmit(event)}
      >
        <InputField
          id={'loginEmail'}
          labelContent={'Email'}
          type={'email'}
          placeholder={'Enter your email address...'}
        />
        <PasswordInputField
          id={'loginPassword'}
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
        <FormSwapButton buttonName={'register'} buttonContent={'Create account'} clickHandler={clickHandler} />
      </article>
    </>
  );
};

export default Login;
