// src/features/analysis/EmotionsChart.tsx
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface EmotionsChartProps {
  emotionsData: Record<string, number>;
}

export const EmotionsChart = ({ emotionsData }: EmotionsChartProps) => {
  const chartData = {
    labels: Object.keys(emotionsData).map(
      (key) => key.charAt(0).toUpperCase() + key.slice(1)
    ),
    datasets: [
      {
        label: 'Emotion Score',
        data: Object.values(emotionsData),
        backgroundColor: 'rgba(56, 189, 248, 0.6)', // Light blue with opacity
        borderColor: 'rgba(56, 189, 248, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Emotion Analysis',
        color: '#e5e7eb', // Gray-200 for text
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 1,
        ticks: { color: '#9ca3af' }, // Gray-400
        grid: { color: '#4b5563' }, // Gray-600
      },
      x: {
        ticks: { color: '#9ca3af' }, // Gray-400
        grid: { color: '#4b5563' }, // Gray-600
      },
    },
  };

  return <Bar options={options} data={chartData} />;
};