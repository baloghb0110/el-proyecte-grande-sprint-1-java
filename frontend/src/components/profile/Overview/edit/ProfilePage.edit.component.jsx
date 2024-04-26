import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  FormError,
  InputField,
  PasswordInputField,
  SubmitButton,
} from '@src/components/form-related';
import { iconLibraryConfig } from '@src/config';
import { useHandleFormOnSubmit } from './ProfilePage.hooks';
import './ProfilePage.edit.styles.css';

const ProfilePageEdit = ({ editHandler }) => {
  const [profileData, setProfileData] = useState({});
  const { loading, errorMessage, onSubmit } = useHandleFormOnSubmit(editHandler);

  useEffect(() => {
    setProfileData(JSON.parse(localStorage.getItem('userData')));
  }, []);

  return <>
    <div className={'profile-page-edit'}>
      <form id='profileEdit' onSubmit={(event) => onSubmit(event)}>
        <InputField
          id={'username'}
          labelContent={'Username'}
          type={'text'}
          placeholder={'Enter your username...'}
          defaultValue={profileData.userName}
        />

        <InputField
          id={'email'}
          labelContent={'Email'}
          type={'email'}
          placeholder={'Enter your email address...'}
          defaultValue={profileData.email}
        />

        <PasswordInputField
          id={'password'}
          labelContent={'Password'}
          placeholder={'Enter your password...'}
        />

        {!loading ?
          <article className={'button-component-container'}>
            {errorMessage && <FormError errorMessage={errorMessage} />}
            <SubmitButton />
            <button onClick={editHandler}>Back</button>
          </article> :
          <article className={'button-component-container'}>
            <FontAwesomeIcon icon={iconLibraryConfig.faCircleNotch} spin className={'loading-icon'} />
          </article>
        }
      </form>
    </div>
  </>;
};

export default ProfilePageEdit;
