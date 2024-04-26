import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@src/context/UserContext.jsx';
import { Layout } from '../index.js';

const Protected = () => {
  const { user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, []);

  return (
    <>
      <Layout />
    </>
  );
};

export default Protected;
