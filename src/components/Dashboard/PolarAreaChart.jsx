import React, { useEffect, useState } from "react";
import { PolarArea } from "react-chartjs-2";
import {
  Chart,
  PolarAreaController,
  RadialLinearScale,
  PointElement,
  LineElement,
  ArcElement,
} from "chart.js";
import { useTranslation } from "react-i18next";

const PolarAreaChart = ({ state }) => {
  const { t } = useTranslation();
  const [chartData, setChartData] = useState([]);

  // Register chart.js controllers and elements
  Chart.register(
    PolarAreaController,
    RadialLinearScale,
    PointElement,
    LineElement,
    ArcElement
  );

  useEffect(() => {
    if (state && state.length > 0) {
      const ticketData = state.map((item) => item.Ticket);
      setChartData(ticketData);
    }
  }, [state]);

  const data = {
    labels: [
      t("Total Resolved"),
      t("Planned Resolved"),
      t("Delayed Resolved"),
      t("ReOpen 1"),
      t("ReOpen 2"),
      t("ReOpen More"),
      t("Delivery Date Change"),
    ],
    datasets: [
      {
        data: chartData.length > 0 ? chartData : [0, 0, 0, 0, 0, 0, 0], // Use the state or default to zeros
        borderColor: [
          "rgba(252, 186, 3)",
          "rgba(99,104,116,0.8)",
          "rgba(51, 122, 183)",
          "rgba(237, 21, 21)",
          "rgba(25, 163, 18)",
          "rgba(202, 29, 175)",
          "rgba(60, 140, 255)",
        ],
        borderWidth: 2,
        hoverOffset: 8,
      },
    ],
  };

  return (
    <div style={{ width: "100%", height: "80%" }}>
      <PolarArea
        data={data}
        options={{
          maintainAspectRatio: false,
          responsive: true,
          plugins: {
            legend: {
              display: false, // Hide the legend in the plugins section
            },
          },
          scales: {
            r: {
              ticks: {
                stepSize: 1,
                beginAtZero: true,
              },
            },
          },
        }}
      />
    </div>
  );
};

export default PolarAreaChart;
