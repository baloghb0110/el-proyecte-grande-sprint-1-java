import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { axiosConfig } from '@src/config';
import { serialiseFormData } from '@src/utilities';

const useHandleRequestPasswordFormOnSubmit = (handleModal) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const { mutate, reset } = useMutation({
    mutationKey: ['forgottenPasswordForm'],
    mutationFn: async ({ payload }) => {
      setIsLoading(true);

      const response = await axiosConfig.request({
        method: 'POST',
        url: '/api/users/password-reset',
        data: payload,
      });

      return response;
    },
    onSuccess: () => {
      reset();
      setIsLoading(false);
      handleModal();
    },
    onError: (error) => {
      setErrorMessage(error.response.data.message);
      setIsLoading(false);
    },
  });

  const onSubmit = (event) => {
    event.preventDefault();
    const payload = serialiseFormData(event.target);

    if (payload.resetEmail === '') {
      setErrorMessage('Make sure to fill in the email field before submitting the form.');

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
  useHandleRequestPasswordFormOnSubmit,
};
