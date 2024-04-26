const useGetOverviewData = ({ exTransactionList }) => {

  const getAmountSumOf = (list) => {
    let sum = 0;
    for (let i = 0; i < list.length; i++) {
      sum += list[i].amount;
    }
    return sum;
  };

  const calculateSpending = (exTransactionList) => {
    return getAmountSumOf(exTransactionList.filter((tr) => tr.amount < 0));
  };

  const calculateIncome = (exTransactionList) => {
    return getAmountSumOf(exTransactionList.filter((tr) => tr.amount > 0));
  };

  const calculatePlannedSpending = (exTransactionList) => {
    return getAmountSumOf(exTransactionList.filter((tr) => tr.amount < 0 && tr.isPlanned));
  };

  const calculatePlannedIncome = (exTransactionList) => {
    return getAmountSumOf(exTransactionList.filter((tr) => tr.amount > 0 && tr.isPlanned));
  };

  return {
    // key: value pairs
    calculateSpending: calculateSpending(exTransactionList),
    calculateIncome: calculateIncome(exTransactionList),
    calculatePlannedSpending: calculatePlannedSpending(exTransactionList),
    calculatePlannedIncome: calculatePlannedIncome(exTransactionList),
  };
};

export default useGetOverviewData;
