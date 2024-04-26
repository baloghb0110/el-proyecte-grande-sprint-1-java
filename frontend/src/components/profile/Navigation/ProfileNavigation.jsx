import './ProfileNavigation.styles.css';

const NavigationButton = ({ label, clickHandler }) => {
  return (<button
    className={'profile-page-selector'}
    onClick={() => clickHandler(label)}
    type='button'
  >{label}</button>);
};

const ProfileNavigation = ({clickHandler}) => {
  return (
    <>
      <div className={'profile-navigation'}>
        <NavigationButton label={'Profile'} clickHandler={clickHandler} />
        <NavigationButton label={'Account'} clickHandler={clickHandler} />
        <NavigationButton label={'Categories'} clickHandler={clickHandler} />
      </div>
    </>
  );
};

export default ProfileNavigation;
