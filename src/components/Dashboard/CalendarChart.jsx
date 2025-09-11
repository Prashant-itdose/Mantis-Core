import React from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";
import { MatrixController, MatrixElement } from "chartjs-chart-matrix";
import { Chart } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, Tooltip, Legend, MatrixController, MatrixElement);

const CalendarChart = () => {
  const data = {
    datasets: [
      {
        label: "Activity",
        data: [
          { x: "Mon", y: 1, v: 20 },
          { x: "Tue", y: 1, v: 50 },
          { x: "Wed", y: 1, v: 10 },
          { x: "Thu", y: 1, v: 20 },
          { x: "Fri", y: 1, v: 10 },
          { x: "Sat", y: 1, v: 40 },
          { x: "Sun", y: 1, v: 19 },
          // Add more data points...
        ],
        backgroundColor: (context) => {
          const value = context.raw.v;
          const alpha = value / 10; // Adjust opacity based on value
          return `rgba(0, 128, 0, ${alpha})`; // Green color scale
        },
        borderWidth: 1,
        width:20,
         height: 60,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      x: {
        type: "category",
        labels: ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
        offset: true,
        grid: { display: true },
      },
      y: {
        type: "linear",
        labels: ["0", "1", "2", "3", "4", "5","6"],
        offset: true,
        grid: { display: true },
      },
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (context) => `Value: ${context.raw.v}`,
        },
      },
    },
  };

  return <Chart type="matrix" data={data} options={options} />;
};

export default CalendarChart;
