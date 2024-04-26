import { useQuery } from '@tanstack/react-query';
import { axiosConfigWithAuth } from '@src/config';
import { getLocalStorageItem } from '../utilities/index.js';

const fetchMonthlyTransactions = async (year, month) => {
  try {
    const { data } = await axiosConfigWithAuth.request({
      method: 'GET',
      url: `/api/transaction/${year}/${month + 1}`,
    });

    return data;
  } catch (err) {
    console.log(err);
  }
};
//TODO Wrap fetch to check localstorage first

const useGetMonthlyTransactions = (year, month) => {
  const query = useQuery({
    queryKey: ['monthlyTransactions'],
    queryFn:() => fetchMonthlyTransactions(year, month),
  });

  return {
    transactionsData: query.data,
    isTransactionLoading: query.isLoading,
    isTransactionError: query.isError,
    refetch: query.refetch,
  };
};

export default useGetMonthlyTransactions;
