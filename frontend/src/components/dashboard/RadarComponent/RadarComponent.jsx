import './RadarComponent.css';
import Chart from 'chart.js/auto';
import { useEffect, useRef, useState } from 'react';
import Logo from '../../../assets/Trackero_logo.png';

const RadarComponent = ({ transactionArray, isTransactionLoading, dataText, randomColor }) => {
  const chartRef = useRef();
  const chartInstance = useRef(null);

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  const getRandomColorCode = () => {
    const r = getRandomInt(255);
    const g = getRandomInt(255);
    const b = getRandomInt(255);

    return [r, g, b];
  };

  const generateRandomColors = (number) => {
    const colors = [];

    for (let i = 0; i < number; i++) {
      const colorCode = getRandomColorCode();

      colors.push(`rgb(${colorCode[0]},${colorCode[1]},${colorCode[2]})`);
    }

    console.log(colors);

    return colors;
  };

  const provideCategoryFrequencyTable = () => {
    const frequencyTable = {};

    for (const transaction of transactionArray) {
      if (frequencyTable[transaction.categoryName]) {
        frequencyTable[transaction.categoryName] += transaction.amount;
      } else {
        frequencyTable[transaction.categoryName] = transaction.amount;
      }
    }

    return frequencyTable;
  };


  useEffect(() => {
    if (transactionArray) {
      const image = new Image();
      image.src = Logo;

      const plugin = {
        id: 'customCanvasBackgroundImage',
        beforeDraw: (chart) => {
          if (image.complete) {
            const ctx = chart.ctx;
            const {top, left, width, height} = chart.chartArea;
            const x = left + width / 2 - image.width / 2;
            const y = (top + 5) + height / 2 - image.height / 2;
            ctx.drawImage(image, x, y);
          } else {
            image.onload = () => chart.draw();
          }
        }
      };

      const monthlyDataSet = provideCategoryFrequencyTable();
      const labels = Object.keys(monthlyDataSet);
      const data = Object.values(monthlyDataSet);
      let delayed;

      const ctx = chartRef.current.getContext('2d');

      chartInstance.current = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels,
          datasets: [
            {
              label: dataText,
              data,
              backgroundColor: randomColor ?
                generateRandomColors(labels.length) :
                [
                  'rgb(194,6,80)',
                  'rgb(152,28,131)',
                  'rgb(118,18,148)',
                  'rgb(248, 244, 236)',
                ],
              borderWidth: 2,
            },
          ],
        },
        plugins: [plugin],
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

  return <canvas ref={chartRef} className={'dashboard-pie-chart'}/>;
};

export default RadarComponent;
