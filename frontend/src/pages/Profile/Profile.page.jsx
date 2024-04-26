import {
  useEffect,
  useState,
} from 'react';
import {
  PageTitle,
} from '@src/components/form-related';
import {
  Categories,
  ProfileAccountDisplay,
  ProfileAccountEdit,
  ProfileNavigation,
  ProfilePageDisplay,
  ProfilePageEdit,
} from '@src/components/profile';
import getProfileData from './Profile.page.hooks';
import './Profile.styles.css';

const Profile = () => {
  const [isEditing, setEditing] = useState(false);
  const [currentTile, setCurrentTile] = useState('Profile');

  const { data, isDataLoading, isDataError, refetch } = getProfileData('users/get-accounts');

  useEffect(() => {
    refetch();
  }, []);

  const onEditHandler = () => {
    setEditing(!isEditing);
  };

  const handleClick = (tileName) => {
    setCurrentTile(tileName);
    setEditing(false);
  };

  const renderFormComponent = () => {
    switch (currentTile) {
    case 'Profile':
      return isEditing ?
        <ProfilePageEdit editHandler={onEditHandler} /> :
        <ProfilePageDisplay onEditHandler={onEditHandler} loading={isDataLoading} />;

    case 'Account':
      return isEditing ?
        <ProfileAccountEdit /> :
        <ProfileAccountDisplay account={data} loading={isDataLoading} />;

    case 'Categories':
      return <Categories />;

    default:
      return 'error';
    }
  };

  return (
    <div className={'profile-page'}>
      <PageTitle title={'Profile'} />
      <ProfileNavigation clickHandler={handleClick} />
      {renderFormComponent()}
    </div>
  );
};

export default Profile;
