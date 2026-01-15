import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  Title,
  BarElement,
  Tooltip,
} from "chart.js";
// import ChartDataLabels from 'chartjs-plugin-datalabels';
import { useTranslation } from "react-i18next";

ChartJS.register(
  CategoryScale,
  LinearScale,
  Title,
  BarElement,
  Tooltip
  //   ChartDataLabels // Register the plugin
);

const SmartReportChart = ({ state }) => {
  const { t } = useTranslation();
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    if (state) {
      const projectData = Array.isArray(state) ? state[0] : state;

      if (projectData) {
        // Add counts to labels
        const labels = [
          `${t("Total Reports")} (${projectData.TotalReportCount})`,
          `${t("Generated Reports")} (${projectData.GeneratedReportCount})`,
          `${t("Remaining Reports")} (${projectData.RemainingReportCount})`,
        ];

        const data = [
          projectData.TotalReportCount,
          projectData.GeneratedReportCount,
          projectData.RemainingReportCount,
        ];

        const colors = [
          "#594ef5", // Yellow for total
          "#80f699", // Teal for generated
          "#ec9a3d", // Orange-red for remaining
        ];

        setChartData({
          labels,
          datasets: [
            {
              data,
              backgroundColor: colors,
              hoverBackgroundColor: colors.map((color) =>
                color.replace(/^#/, "#80")
              ),
              borderRadius: 6,
              barThickness: 40,
            },
          ],
        });
      }
    }
  }, [state, t]);

  const chartOptions = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      title: {
        display: false,
      },
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
        callbacks: {
          label: function (context) {
            return `${context.dataset.label || ""}: ${context.parsed.y}`;
          },
        },
      },
      // Datalabels configuration for showing values on bars
      datalabels: {
        display: true,
        color: "#000",
        font: {
          size: 14,
          weight: "bold",
        },
        formatter: function (value, context) {
          return value;
        },
        anchor: "end",
        align: "end",
        offset: -10,
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#333",
          font: {
            size: 13,
            weight: "bold",
          },
          padding: 10,
        },
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          display: true,
          color: "#666",
          font: {
            size: 12,
          },
          callback: function (value) {
            return Number.isInteger(value) ? value : "";
          },
        },
        grid: {
          color: "rgba(0, 0, 0, 0.05)",
        },
      },
    },
  };

  return (
    <div>
      {chartData ? (
        <div>
          {state && (Array.isArray(state) ? state[0] : state).ProjectName && (
            <h3
              style={{
                textAlign: "center",
                marginBottom: "20px",
                color: "#333",
                fontSize: "18px",
                fontWeight: "bold",
              }}
            >
              {(Array.isArray(state) ? state[0] : state).ProjectName ||
                (Array.isArray(state) ? state[0] : state).PrjectName}
            </h3>
          )}
          <Bar
            data={chartData}
            options={chartOptions}
            // plugins={[ChartDataLabels]}
          />
        </div>
      ) : (
       ""
      )}
    </div>
  );
};

export default SmartReportChart;
