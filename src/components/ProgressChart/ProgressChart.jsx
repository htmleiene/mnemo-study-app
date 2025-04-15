import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import './ProgressChart.css';

const ProgressChart = ({ data }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartRef.current && data) {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      const ctx = chartRef.current.getContext('2d');
      chartInstance.current = new Chart(ctx, {
        type: 'line',
        data: {
          labels: data.labels,
          datasets: [{
            label: 'Flashcards Dominados',
            data: data.values,
            borderColor: '#371cea',
            backgroundColor: 'rgba(55, 28, 234, 0.1)',
            tension: 0.3,
            fill: true
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
            tooltip: {
              callbacks: {
                label: (context) => `${context.dataset.label}: ${context.raw}`
              }
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              max: Math.max(...data.values) + 5
            }
          }
        }
      });
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [data]);

  return <canvas ref={chartRef} />;
};

export default ProgressChart;
