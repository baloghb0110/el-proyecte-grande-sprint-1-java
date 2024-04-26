import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useUser } from '@src/context/UserContext.jsx';
import { axiosConfigWithAuth } from '@src/config';
import { serialiseFormData } from '@src/utilities';

const useHandleFormOnSubmit = (editHandler) => {
  const { setUser } = useUser();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const { mutate, reset } = useMutation({
    mutationKey: ['profileEdit'],
    mutationFn: async ({ payload }) => {
      setLoading(true);

      const { data } = await axiosConfigWithAuth.request({
        method: 'PUT',
        url: '/api/users/update-profile',
        data: payload,
      });

      return data;
    },
    onSuccess: (data) => {
      const userData = {
        userId: data.id,
        userName: data.userName,
        email: data.email,
        dateOfReg: data.dateOfRegistration,
        category: data.categories,
      };

      window.localStorage.setItem('userData', JSON.stringify(userData));
      window.localStorage.setItem('token', data.jwtResponse.jwt);
      setUser({ userId: userData.userId, email: userData.email, userName: userData.userName });

      editHandler();
      reset();
      setLoading(false);
      window.reload();
    },
    onError: (error) => {
      setErrorMessage(error.response.data.message);
      setLoading(false);
    },
  });

  const onSubmit = (event) => {
    event.preventDefault();
    const payload = serialiseFormData(event.target);

    mutate({ payload });
  };

  return {
    loading,
    errorMessage,
    onSubmit,
  };
};

export {
  useHandleFormOnSubmit,
};
