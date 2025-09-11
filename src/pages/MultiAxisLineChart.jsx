import React from "react";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import moment from "moment";
import { useTranslation } from "react-i18next";

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend
);

function MultiAxisLineChart({ data1 }) {
      const { t } = useTranslation();
  const data = {
    // labels:
    //   data1 && data1.length > 0
    //     ? data1.map((ele) => moment(ele?.Date).format("DD MMM"))
    //     : [],
    labels: [
        t("Planned Resolved "),
        t("Delayed Resolved "),
        t("Shifted"),
        t("Reopened"),
        t("Delayed Open"),
      ],
    //   "rgb(255, 99, 71)",
    //   "rgb(144, 238, 144)",
    //   "rgb(255, 165, 0)",
    //   "rgb(34, 34, 146)",
    //   "rgb(241, 31, 129)",
    datasets: [
      {
        label: "Planned Resolved",
        // data:
        //   data1 && data1.length > 0
        //     ? data1.map((ele) => ele?.TotalNetAmount)
        //     : [],
        data:[20,10],
        borderColor: [
            "rgb(255, 99, 71)",
          ],
        backgroundColor: [
            "rgb(255, 99, 71)",
          ],
        yAxisID: "y-axis-1",
        fill: true,
        tension: 0.4,
      },
      {
        label: "Delayed Resolved",
        // data:
        //   data1 && data1.length > 0
        //     ? data1.map((ele) => ele?.TotalReceiptBooked)
        //     : [],
        data:[20,40],
        borderColor:  "rgb(144, 238, 144)",
        backgroundColor:  "rgb(144, 238, 144)",
        yAxisID: "y-axis-2",
        fill: true,
        tension: 0.4,
      },
      {
        label: "Shifted",
        // data:
        //   data1 && data1.length > 0
        //     ? data1.map((ele) => ele?.TotalReceiptBooked)
        //     : [],
        data:[20,40],
        borderColor:  "rgb(255, 165, 0)",
        backgroundColor:  "rgb(255, 165, 0)",
        yAxisID: "y-axis-2",
        fill: true,
        tension: 0.4,
      },
      {
        label: "Reopened",
        // data:
        //   data1 && data1.length > 0
        //     ? data1.map((ele) => ele?.TotalReceiptBooked)
        //     : [],
        data:[20,40],
        borderColor:  "rgb(34, 34, 146)",
        backgroundColor:  "rgb(34, 34, 146)",
        yAxisID: "y-axis-2",
        fill: true,
        tension: 0.4,
      },
      {
        label: "Delayed Open",
        // data:
        //   data1 && data1.length > 0
        //     ? data1.map((ele) => ele?.TotalReceiptBooked)
        //     : [],
        data:[20,40],
        borderColor:  "rgb(241, 31, 129)",
        backgroundColor:  "rgb(241, 31, 129)",
        yAxisID: "y-axis-2",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      "y-axis-1": {
        type: "linear",
        position: "left",
        ticks: {
          beginAtZero: true,
        },
      },
      "y-axis-2": {
        type: "linear",
        position: "right",
        ticks: {
          beginAtZero: true,
        },
      },
      "y-axis-2": {
        type: "linear",
        position: "right",
        ticks: {
          beginAtZero: true,
        },
      },
      "y-axis-2": {
        type: "linear",
        position: "right",
        ticks: {
          beginAtZero: true,
        },
      },
      "y-axis-2": {
        type: "linear",
        position: "right",
        ticks: {
          beginAtZero: true,
        },
      },
    },
    plugins: {
      legend: {
        position: "top",
      },
    },
  };

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Line data={data} options={options} />
    </div>
  );
}

export default MultiAxisLineChart;
