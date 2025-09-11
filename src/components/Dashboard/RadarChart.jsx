import React from "react";
import { Radar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import { useTranslation } from "react-i18next";

const RadarChart = ({ state }) => {
  const { t } = useTranslation();

  ChartJS.register(
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend
  );

  // Extract labels and data from API response
  const labels = state.map((item) => t(item.StatusNew));
  const dataValues = state.map((item) => item.Ticket);

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Radar Chart",
        data: dataValues,
        borderColor: [
          "rgba(252, 186, 3)",
          "rgba(99,104,116,0.8)",
          "rgba(51, 122, 183)",
          "rgba(237, 21, 21)",
          "rgba(25, 163, 18)",
          "rgba(128, 0, 128)",
          "rgba(255, 165, 0)",
          "rgba(0, 128, 255)",
        ],
        borderWidth: 3,
        hoverOffset: 8,
      },
    ],
  };

  return (
    <div style={{ width: "100%", height: "68%" }}>
      <Radar
        data={data}
        options={{
          maintainAspectRatio: false,
          responsive: true,
          plugins: {
            legend: {
              display: false,
            },
            title: {
              display: false,
            },
          },
          scales: {
            r: {
              beginAtZero: false,
              ticks: {
                stepSize: 1,
              },
            },
          },
        }}
      />
    </div>
  );
};

export default RadarChart;
