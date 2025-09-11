// import React, { useEffect, useState } from "react";
// import { Bar } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   Title,
//   BarElement,
//   Tooltip,
// } from "chart.js";
// import { useTranslation } from "react-i18next";

// ChartJS.register(CategoryScale, LinearScale, Title, BarElement, Tooltip);

// const QuotationChartMonth = ({ state }) => {
//   console.log("state",state)
//   const { t } = useTranslation();
//   const [chartData, setChartData] = useState(null); // Use null to wait for data

//   useEffect(() => {
//     if (state?.length) {
//       const labels = state?.map((item) => t(item.DataType));
//       const data = state?.map((item) => item.Amount);

//       // Ensure you have enough colors for all bars
//       const colors = [
//         "#ecdb23",
//         "#f6961e",
//         "#FF4500",
//         "#d5eb34",
//         "#f75e4d",
//         "#8A2BE2",
//         "#20B2AA",
//         "#6495ED",
//         "#A0522D",
//       ];

//       setChartData({
//         labels,
//         datasets: [
//           {
//             data,
//             backgroundColor: colors.slice(0, data.length),
//             hoverOffset: 8,
//             borderRadius: 4,
//           },
//         ],
//       });
//     }
//   }, [state, t]);
// console.log("kamal",chartData)
//   return (
//     <div style={{ width: "100%", height: "100px" }}>
//       {chartData ? (
//         <Bar
//           data={chartData}
//           options={{
//             maintainAspectRatio: false,
//             responsive: true,
//             plugins: {
//               title: {
//                 display: false,
//               },
//               legend: {
//                 display: false,
//               },
//             },
//             scales: {
//               y: {
//                 beginAtZero: false,
//               },
//             },
//           }}
//         />
//       ) : (
//         <p>{t("Loading chart...")}</p>
//       )}
//     </div>
//   );
// };

// export default QuotationChartMonth;

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

const QuotationChartMonth = ({ state }) => {
  const { t } = useTranslation();
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    if (state?.length) {
      const labels = state.map((item) => t(item.DataType));
      const data = state.map((item) => item.Amount);

      const colors = [
        "#ecdb23",
        "#f6961e",
        "#FF4500",
        "#d5eb34",
        "#f75e4d",
        "#8A2BE2",
        "#20B2AA",
        "#6495ED",
        "#A0522D",
      ];

      setChartData({
        labels,
        datasets: [
          {
            data,
            backgroundColor: colors.slice(0, data.length),
            hoverOffset: 8,
            borderRadius: 4,
          },
        ],
      });
    }
  }, [state, t]);

  return (
    <div style={{ width: "100%", height: "100px" }}>
      {chartData ? (
        <Bar
          data={chartData}
          options={{
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
                enabled: true, // Show tooltips on hover
              },
            },
            scales: {
              x: {
                ticks: {
                  display: false, // Hide X-axis labels
                },
                grid: {
                  display: false,
                },
              },
              y: {
                ticks: {
                  display: false, // Hide Y-axis labels
                },
                grid: {
                  display: false,
                },
              },
            },
          }}
        />
      ) : (
        <p>{t("Loading chart...")}</p>
      )}
    </div>
  );
};

export default QuotationChartMonth;
