import {
  Footer,
  Navbar,
} from '@src/components/layout';
import { Outlet } from 'react-router-dom';
import './Layout.styles.css';

const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <div className={'content-wrap'}></div>
      <Footer />
    </>
  );
};

export default Layout;
