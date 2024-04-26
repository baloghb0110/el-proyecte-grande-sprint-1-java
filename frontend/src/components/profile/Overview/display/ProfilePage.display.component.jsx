import { useEffect, useState } from 'react';
import {
  FormSwapButton,
} from '@src/components/home';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { iconLibraryConfig } from '@src/config';
import './ProfilePage.display.styles.css';

const ProfilePageDisplay = ({ onEditHandler, loading }) => {
  const [profileData, setProfileData] = useState({});

  useEffect(() => {
    setProfileData(JSON.parse(localStorage.getItem('userData')));
  }, []);

  if (loading) {
    return (<div className={'profile-page-overview'}>
      <div className={'profile-page-overview-loading'}>
        <FontAwesomeIcon icon={iconLibraryConfig.faCircleNotch} spin className={'loading-icon'} />
      </div>
    </div>);
  }

  return <>
    <div className={'profile-page-overview'}>
      <div className={'overview-content'}>
        <h2>Username</h2>
        <label>{profileData.userName}</label>
      </div>

      <div className={'overview-content'}>
        <h2>Email address</h2>
        <label>{profileData.email}</label>
      </div>

      <div className={'line'}></div>

      <div className={'overview-content'}>
        <h2>Account name</h2>
        <label>{profileData?.account?.name}</label>
      </div>

      <div className={'line'}></div>

      <div className={'overview-content'}>
        <h2>Registration date</h2>
        <label>{profileData?.dateOfReg?.split('T')[0]}</label>
      </div>

      <article className={'bottom-button-container'}>
        <FormSwapButton buttonName={'editProfile'} buttonContent={'Edit'} clickHandler={onEditHandler} />
      </article>
    </div>
  </>;
};

export default ProfilePageDisplay;
