import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { axiosConfigWithAuth } from '@src/config';
import { serialiseFormData } from '@src/utilities';

const useHandleAddTransactionFormOnSubmit = (handleOnClick) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const { mutate, reset } = useMutation({
    mutationKey: ['addTransactionForm'],
    mutationFn: async ({ payload }) => {
      setIsLoading(true);

      await axiosConfigWithAuth.request({
        method: 'POST',
        url: '/api/transaction/add/external-transaction',
        data: payload,
      });

      return payload;
    },
    onSuccess: (payload) => {
      reset();
      setIsLoading(false);
      handleOnClick();

      const userData = JSON.parse(localStorage.getItem('userData'));
      userData.actualBalance = userData.actualBalance + parseInt(payload.amount);
      localStorage.setItem('userData', JSON.stringify(userData));
    },
    onError: (error) => {
      setErrorMessage(error.response.data.message);
      setIsLoading(false);
    },
  });

  const onSubmit = (event) => {
    event.preventDefault();
    const payload = serialiseFormData(event.target);

    if (payload.amount === '' || payload.dateOfTransaction === '' || payload.categoryId === undefined) {
      setErrorMessage('Make sure to fill in all mandatory fields (amount, date, category) before submitting the form.');

      return;
    }

    payload.isRecurring = payload.isRecurring === 'on';
    payload.isPlanned = Date.parse(payload.dateOfTransaction) > Date.now();

    mutate({ payload });
  };

  return {
    isLoading,
    errorMessage,
    onSubmit,
  };
};

export {
  useHandleAddTransactionFormOnSubmit,
};
