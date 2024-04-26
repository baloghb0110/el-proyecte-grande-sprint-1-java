import { useNavigate } from 'react-router-dom';
import './NavbarButton.styles.css';

const NavbarButton = ({ buttonLabel, destinationPath }) => {
  const nav = useNavigate();
  const handleButtonClick = () => nav(destinationPath);

  return (
    <button className={'navbar-button'} onClick={handleButtonClick}>
      {buttonLabel}
    </button>
  );
};

export default NavbarButton;
