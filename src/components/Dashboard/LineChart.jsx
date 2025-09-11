import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

const Linechart = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    data: [],
  });

  const { t } = useTranslation();

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  // Example API response data
  const apiResponse = [
    { "StatusNew": "Total_Resolved", "Ticket": 0 },
    { "StatusNew": "Planned_Resolved", "Ticket": 0 },
    { "StatusNew": "Delayed_Resolved", "Ticket": 0 },
    { "StatusNew": "ReOpen_1", "Ticket": 0 },
    { "StatusNew": "ReOpen_2", "Ticket": 0 },
    { "StatusNew": "ReOpen_More", "Ticket": 0 },
    { "StatusNew": "ReOpen_More", "Ticket": 0 },
    { "StatusNew": "DeliveryDateChange", "Ticket": 0 }
  ];

  useEffect(() => {
    // Map the API response to chart-friendly format
    const labels = apiResponse.map(item => item.StatusNew);
    const data = apiResponse.map(item => item.Ticket);

    setChartData({
      labels,
      data,
    });
  }, []);

  // Data format for chart
  const data = {
    labels: chartData.labels,
    datasets: [
      {
        label: t("Tickets by Status"),
        data: chartData.data,
        backgroundColor: [
          "rgba(252, 186, 3)",
          "rgba(128,0,128)",
          "rgba(2, 146, 242)",
          "rgba(237, 21, 21)",
          "rgba(25, 163, 18)",
        ],
        fill: true,
      },
    ],
  };

  return (
    <div className="row">
      <div style={{ width: "100%", height: "", textAlign: "end" }}>
        <Line
          data={data}
          style={{ paddingBottom: "45px" }}
          options={{
            responsive: true,
            plugins: {
              legend: {
                display: false,
              },
              title: {
                display: true,
                // text: 'Sales Data Over Time',
              },
            },
            scales: {
              x: {
                ticks: {
                  autoSkip: false, // Do not skip labels
                  maxRotation: 90, // Rotate labels if necessary
                  minRotation: 45,
                  font: {
                    size: 10, // Adjust the font size if needed
                  },
                },
              },
              y: {
                beginAtZero: true,
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default Linechart;
