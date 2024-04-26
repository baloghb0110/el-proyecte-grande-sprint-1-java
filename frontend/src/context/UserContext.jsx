import {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { axiosConfigWithAuth } from '@src/config';
import { getLocalStorageItem } from '@src/utilities';

const UserContext = createContext({});

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const getMe = async () => {
    try {
      const { data } = await axiosConfigWithAuth.request({
        method: 'GET',
        url: '/api/users/me',
      });

      setUser(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = getLocalStorageItem('token');

    if (!token) {
      setLoading(false);

      return;
    }

    getMe();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {!loading && children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);

export default UserProvider;
