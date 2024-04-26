import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { axiosConfigWithAuth } from '@src/config';
import { serialiseFormData } from '@src/utilities';

const useHandleFormOnSubmit = (handleOnClick) => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const { mutate, reset } = useMutation({
    mutationKey: ['addCategoryForm'],
    mutationFn: async ({ payload }) => {
      setLoading(true);

      await axiosConfigWithAuth.request({
        method: 'POST',
        url: '/api/category/add',
        data: payload,
      });
    },
    onSuccess: () => {
      reset();
      setLoading(false);

      handleOnClick();
    },
    onError: (error) => {
      setErrorMessage(error.response.data.message);
      setLoading(false);
    },
  });

  const onSubmit = (event) => {
    event.preventDefault();
    const payload = serialiseFormData(event.target);

    if (payload.name === '') {
      setErrorMessage('Make sure to fill in all mandatory fields (name) before submitting the form.');

      return;
    }
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
