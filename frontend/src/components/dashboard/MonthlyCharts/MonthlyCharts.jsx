import './MonthlyCharts.css';
import Chart from 'chart.js/auto';
import { useEffect, useRef } from 'react';

const MonthlyCharts = ({ transactionArray, isTransactionLoading, backgroundColor, borderColor, dataText }) => {
  const chartRef = useRef();
  const chartInstance = useRef(null);

  const getRandomColorCode = () => {
    const r = Math.random(255);
    const g = Math.random(255);
    const b = Math.random(255);

    return [r, g, b];
  };

  const getMonthlyDataSet = () => {
    const monthlyDataSet = {};

    for (const transaction of transactionArray) {
      if (monthlyDataSet[transaction.dateOfTransaction.slice(-5)]) {
        monthlyDataSet[transaction.dateOfTransaction.slice(-5)] += transaction.amount;
      } else {
        monthlyDataSet[transaction.dateOfTransaction.slice(-5)] = transaction.amount;
      }
    }

    return monthlyDataSet;
  };


  useEffect(() => {
    if (transactionArray) {
      const monthlyDataSet = getMonthlyDataSet();
      const labels = Object.keys(monthlyDataSet);
      const data = Object.values(monthlyDataSet);
      let delayed;

      const ctx = chartRef.current.getContext('2d');

      chartInstance.current = new Chart(ctx, {
        type: 'line',
        data: {
          labels,
          datasets: [
            {
              label: dataText,
              data,
              backgroundColor: borderColor,
              borderColor: backgroundColor,
              borderWidth: 5,
            },
          ],
        },
        options: {
          animation: {
            onComplete: () => {
              delayed = true;
            },
            delay: (context) => {
              let delay = 0;

              if (context.type === 'data' && context.mode === 'default' && !delayed) {
                delay = context.dataIndex * 200 + context.datasetIndex * 70;
              }

              return delay;
            },
          },
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [isTransactionLoading]);

  return <canvas ref={chartRef} width='100%' height='40%' />;
};

export default MonthlyCharts;
