import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { useUser } from '@src/context/UserContext.jsx';
import { axiosConfig } from '@src/config';
import { serialiseFormData } from '@src/utilities';

const useHandleLoginFormSubmission = () => {
  const { setUser } = useUser();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const { mutate } = useMutation({
    mutationKey: ['loginForm'],
    mutationFn: async ({ payload }) => {
      setIsLoading(true);

      const { data } = await axiosConfig.request({
        method: 'POST',
        url: '/api/users/login',
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

      setIsLoading(false);
      // could be targeted to the url from where the user comes for better ux
      navigate('/dashboard');
    },
    onError: (error) => {
      setErrorMessage(error.response.data.message);
      setIsLoading(false);
    },
  });

  const onSubmit = (event) => {
    event.preventDefault();
    const payload = serialiseFormData(event.target);

    if (payload.loginEmail === '' || payload.loginPassword === '') {
      setErrorMessage('Make sure to fill in all fields before submitting the form.');

      return;
    }

    mutate({ payload });
  };

  return {
    isLoading,
    errorMessage,
    onSubmit,
  };
};

export {
  useHandleLoginFormSubmission,
};
