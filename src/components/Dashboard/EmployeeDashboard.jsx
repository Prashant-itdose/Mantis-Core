import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const EmployeeDashboard = () => {
  const attendanceData = [
    { date: "Mon", present: 20, absent: 5 },
    { date: "Tue", present: 22, absent: 3 },
    { date: "Wed", present: 19, absent: 6 },
    { date: "Thu", present: 23, absent: 2 },
    { date: "Fri", present: 21, absent: 4 },
    { date: "Sat", present: 29, absent: 2 },
  ];

  const labels = attendanceData.map((entry) => entry.date);
  const presentData = attendanceData.map((entry) => entry.present);
  const absentData = attendanceData.map((entry) => entry.absent);

  const data = {
    labels,
    datasets: [
      {
        label: "Mail Sent",
        data: presentData,
        backgroundColor: "rgba(109, 173, 245, 0.6)", // Green for present
        stack: "stack1", // Enable stacking
      },
      {
        label: "Not Sent",
        data: absentData,
        backgroundColor: "rgba(243, 216, 63, 0.6)", // Red for absent
        stack: "stack1", // Same stack group
      },
    
      {
        label: "Received",
        data: absentData,
        backgroundColor: "rgba(134, 241, 141, 0.6)", // Red for absent
        stack: "stack1", // Same stack group
      },
        {
        label: "Rating",
        data: absentData,
        backgroundColor: "rgba(198, 244, 30, 0.6)", // Red for absent
        stack: "stack1", // Same stack group
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        labels: {
          font: {
            size: 8, // Increased for better readability
          },
          color: "#333", // Neutral color for better theme compatibility
          usePointStyle: true,
          pointStyle: "circle",
        },
      },
      title: {
        display: true, // Enabled to show chart title
        text: "Employee Feedback",
        font: {
          size: 10,
        },
        color: "#333",
      },
    },
    scales: {
      x: {
        stacked: true, // Stack bars on x-axis
      },
      y: {
        stacked: true, // Stack bars on y-axis
        beginAtZero: true, // Start y-axis at 0
        title: {
          display: false,
          text: "Number of Employees",
          font: {
            size: 12,
          },
        },
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default EmployeeDashboard;