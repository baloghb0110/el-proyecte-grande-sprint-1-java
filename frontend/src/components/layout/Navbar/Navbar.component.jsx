import { NavbarButton } from '../index.js';
import './Navbar.styles.css';

const Navbar = () => {
  return (
    <nav>
      <NavbarButton buttonLabel={'Dashboard'} destinationPath={'/dashboard'} />
      <NavbarButton buttonLabel={'Track'} destinationPath={'/track'} />
      <NavbarButton buttonLabel={'Insights'} destinationPath={'/insights'} />
      <NavbarButton buttonLabel={'Profile'} destinationPath={'/profile'} />
    </nav>
  );
};

export default Navbar;
