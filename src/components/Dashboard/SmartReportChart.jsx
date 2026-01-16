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
import { useTranslation } from "react-i18next";

ChartJS.register(CategoryScale, LinearScale, Title, BarElement, Tooltip);

const SmartReportChart = ({ state }) => {
  const { t } = useTranslation();
  const [chartData, setChartData] = useState(null);

  // Normalize state safely
  const project = Array.isArray(state) ? state?.[0] : state;

  useEffect(() => {
    // Clear chart when no data (e.g., Clear button clicked)
    if (!project) {
      setChartData(null);
      return;
    }

    const labels = [
      `${t("Total Reports")} (${project.TotalReportCount || 0})`,
      `${t("Generated Reports")} (${project.GeneratedReportCount || 0})`,
      `${t("Remaining Reports")} (${project.RemainingReportCount || 0})`,
    ];

    const data = [
      project.TotalReportCount || 0,
      project.GeneratedReportCount || 0,
      project.RemainingReportCount || 0,
    ];

    const colors = [
      "#594ef5", // Total
      "#80f699", // Generated
      "#ec9a3d", // Remaining
    ];

    setChartData({
      labels,
      datasets: [
        {
          data,
          backgroundColor: colors,
          borderRadius: 6,
          barThickness: 40,
        },
      ],
    });
  }, [project, t]);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
        datalabels: {
          display: false, // 👈 disables value labels on bars
        },
      },
      title: { display: false },
      tooltip: {
        enabled: true,
        callbacks: {
          label: (context) => context.parsed.y,
        },
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: {
          font: { size: 13, weight: "bold" },
          color: "#333",
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value) => (Number.isInteger(value) ? value : ""),
          color: "#666",
        },
        grid: {
          color: "rgba(0,0,0,0.05)",
        },
      },
    },
  };

  if (!chartData) return null;

  return (
    <div>
      {project?.PrjectName && (
        <h3
          style={{
            textAlign: "center",
            marginBottom: "20px",
            color: "#333",
            fontSize: "18px",
            fontWeight: "bold",
          }}
        >
          {project.PrjectName}
        </h3>
      )}

      <div style={{ height: "110px" }}>
        <Bar data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default SmartReportChart;
