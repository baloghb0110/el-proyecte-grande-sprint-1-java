import { useState } from 'react';
import {
  FormSwapButton,
} from '@src/components/home';
import './ProfileAccountDisplay.styles.css';

// TODO implement account selector

const ProfileAccountDisplay = ({ account, loading }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <>
      {!loading &&
        <div className={'profile-page-overview'}>
          <div className={'overview-content'}>
            <h2>Account name</h2>
            {account[currentIndex].name}
          </div>

          <div className={'overview-content'}>
            <h2>Description</h2>
            {account[currentIndex].description}
          </div>

          <div className={'line'}></div>

          <div className={'overview-content'}>
            <h2>Actual balance</h2>
            {account[currentIndex].actualBalance} {account[currentIndex].currency}
          </div>

          <div className={'overview-content'}>
            <h2>Savings balance</h2>
            {account[currentIndex].savingsBalance} {account[currentIndex].currency}
          </div>

          <article className={'bottom-button-container'}>
            <FormSwapButton buttonName={'editProfile'} buttonContent={'Edit'} />
          </article>
        </div>
      }
    </>);
};

export default ProfileAccountDisplay;
