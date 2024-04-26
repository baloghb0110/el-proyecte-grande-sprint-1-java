import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { axiosConfig } from '@src/config';
import { serialiseFormData } from '@src/utilities';

const useHandleRegisterFormOnSubmit = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const { mutate, reset } = useMutation({
    mutationKey: ['registerForm'],
    mutationFn: async ({ payload }) => {
      setIsLoading(true);

      await axiosConfig.request({
        method: 'POST',
        url: '/api/users/register',
        data: payload,
      });
    },
    onSuccess: () => {
      reset();
      setIsLoading(false);
      window.location.reload();
    },
    onError: (error) => {
      setErrorMessage(error.response.data.message);
      setIsLoading(false);
    },
  });

  const onSubmit = (event) => {
    event.preventDefault();
    const payload = serialiseFormData(event.target);

    if (payload.registerEmail === '' || payload.registerPassword === '' || payload.registerPasswordRepeat === '') {
      setErrorMessage('Make sure to fill in all fields before submitting the form.');

      return;
    }

    if (payload.registerPassword !== payload.registerPasswordRepeat) {
      setErrorMessage('Make sure that you have entered the same password twice.');

      return;
    }

    delete payload.registerPasswordRepeat;

    mutate({ payload });
  };

  return {
    isLoading,
    errorMessage,
    onSubmit,
  };
};

export {
  useHandleRegisterFormOnSubmit,
};
