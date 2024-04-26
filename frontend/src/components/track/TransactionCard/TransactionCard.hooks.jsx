import { useQuery } from '@tanstack/react-query';

const deleteTransaction = async (transactionId) => {
  try {
    const response = await fetch('/api/transaction/delete/local-transaction', {
      method:'DELETE',
      headers:{
        'Content-Type' : 'application/json',
      },
      body:JSON.stringify(transactionId),
    });

    return await response.json();
  } catch (err) {
    console.log(err);
  }
};
const useDeleteTransaction = (transactionId, canFetch) => {
  const query = useQuery({
    queryKey:[`deleteTransaction-${transactionId}`],
    queryFn:() => deleteTransaction(transactionId),
    enabled:canFetch,
  });

  return {
    responseData: query.data,
    responseStatus: query.status,
    isTransactionLoading: query.isLoading,
    isTransactionError: query.isError,
  };
};

export default useDeleteTransaction;
