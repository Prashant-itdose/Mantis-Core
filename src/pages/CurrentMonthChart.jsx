// import React, { useEffect, useState } from "react";
// import { Bar } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   BarElement,
//   CategoryScale,
//   LinearScale,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";
// import axios from "axios";
// import { apiUrls } from "../networkServices/apiEndpoints";
// import { headers } from "../utils/apitools";
// import { useSelector } from "react-redux";
// import { useCryptoLocalStorage } from "../utils/hooks/useCryptoLocalStorage";

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend
// );

// const CurrentMonthChart = () => {
//   const { memberID } = useSelector(
//     (state) => state?.loadingSlice
//   );
//   const { developerSearchType } = useSelector(
//     (state) => state?.loadingSlice
//   );

//   const [chartRawData, setChartRawData] = useState([]);

//   const fetchSalesData = (developerId, searchType) => {
//     let form = new FormData();
//     form.append("ID", useCryptoLocalStorage("user_Data", "get", "ID"));
//     form.append("DeveloperID", developerId);
//     form.append("SearchType", searchType == "" ? "0" : searchType);

//     axios
//       .post(apiUrls?.CoorDashboard_Current_Month_Bifurcation, form, {
//         headers,
//       })
//       .then((res) => {
//         setChartRawData(res?.data?.data || []);
//       })
//       .catch((err) => {
//         console.error(err);
//       });
//   };

//   useEffect(() => {
//   fetchSalesData(memberID, developerSearchType);
//   }, [memberID, developerSearchType]);

//   const transformData = (data) => {
//     const labels = data.map((item) => item.DataType);

//     return {
//       labels,
//       datasets: [
//         {
//           label: "NonSettled",
//           data: data.map((item) => item.Amount),
//           backgroundColor: "#3399FF",
//         },
//         {
//           label: "CurrentMonth",
//           data: data.map((item) => item.Age_2_Month),
//           backgroundColor: "#7373bd",
//         },
//         {
//           label: "LastMonth",
//           data: data.map((item) => item.Age_3_Month),
//           backgroundColor: "#f5b371",
//         },
//         {
//           label: "Last2Month",
//           data: data.map((item) => item.More_Than_3_Month),
//           backgroundColor: "#bf71bf",
//         },
//         {
//           label: "Last3Month",
//           data: data.map((item) => item.More_Than_3_Month),
//           backgroundColor: "#89e6f5",
//         },
//         {
//           label: "Unknown",
//           data: data.map((item) => item.More_Than_3_Month),
//           backgroundColor: "#dedb7e",
//         },
//         // {
//         //   label: "Total",
//         //   data: data.map((item) => item.Total),
//         //   backgroundColor: "#FF66CC",
//         // },
//       ],
//     };
//   };

//   const chartData = transformData(chartRawData);

//   const options = {
//     plugins: {
//       legend: {
//         display: true,
//         labels: {
//           font: {
//             size: 7,
//           },
//           color: "black",
//           usePointStyle: true,
//           pointStyle: "circle",
//         },
//       },
//       tooltip: {
//         callbacks: {
//           label: (context) => `${context.dataset.label}: ${context.raw}`,
//           // label: (context) => `${context.dataset.label}: ${context.raw}M`,
//         },
//       },
//     },
//     responsive: true,
//     scales: {
//       x: {
//         title: {
//           display: false,
//           text: "Status",
//         },
//       },
//       y: {
//         beginAtZero: true,
//         title: {
//           display: false,
//           text: "1Month, 2Month, 3Month, >3Month and Total",
//         },
//         // ticks: {
//         //   callback: (value) => `${value}L`,
//         // },
//         ticks: {
//           callback: (value) => {
//             return Number.isInteger(value) ? `${value}` : null;
//             // return Number.isInteger(value) ? `${value}L` : null;
//           }
//         }
//       },
//     },
//   };

//   return (
//     <div style={{ width: "100%", height: "127px",marginLeft:"20px" }}>
//       <Bar
//         data={chartData}
//         options={options}
//         // style={{
//         //   height: "120px",
//         //   width: "100%",
//         // }}
//       />
//     </div>
//   );
// };

// export default CurrentMonthChart;

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
import axios from "axios";
import { apiUrls } from "../networkServices/apiEndpoints";
import { headers } from "../utils/apitools";
import { useSelector } from "react-redux";
import { useCryptoLocalStorage } from "../utils/hooks/useCryptoLocalStorage";
import { axiosInstances } from "../networkServices/axiosInstance";

const CurrentMonthChart = () => {
  const { t } = useTranslation();
  const { memberID, developerSearchType } = useSelector(
    (state) => state?.loadingSlice
  );
  const [chartData, setChartData] = useState([]);

  const handleFetchSalesData = (developerId, searchType) => {
    // let form = new FormData();
    // form.append("ID", useCryptoLocalStorage("user_Data", "get", "ID"));
    // form.append("DeveloperID", developerId);
    // form.append("SearchType", searchType === "" ? "0" : searchType);
    // axios
    //   .post(apiUrls?.CoorDashboard_Current_Month_Bifurcation, form, { headers })
    axiosInstances
      .post(apiUrls.CoorDashboard_Current_Month_Bifurcation, {
        CoordinatorID: Number(useCryptoLocalStorage("user_Data", "get", "ID")),
        DeveloperID: Number(developerId),
        SearchType: Number(searchType == "" ? "0" : searchType),
      })
      .then((res) => {
        setChartData(res?.data?.data || []);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    handleFetchSalesData(memberID, developerSearchType);
  }, [memberID, developerSearchType]);

  ChartJS.register(CategoryScale, LinearScale, Title, BarElement, Tooltip);

  const data = {
    labels: chartData.map(() => ""), // Blank labels
    datasets: [
      {
        label: t("Status"),
        borderRadius: 0,
        data: chartData.map((item) => item.Amount),
        backgroundColor: "#8ff2a9",
        borderColor: "#8ff2a9",
        borderWidth: 1,
      },
    ],
  };
  const options = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      title: {
        display: false,
      },
      legend: {
        display: true,
        labels: {
          font: {
            size: 6,
          },
          color: "black",
          usePointStyle: true,
          pointStyle: "circle",
        },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const index = context.dataIndex;
            const projectName = chartData[index]?.DataType || "";
            const amount = context.raw;
            return [`Status: ${projectName}`, `Amount: ${amount}`];
          },
        },
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
        beginAtZero: true,
        ticks: {
          precision: 0,
        },
      },
    },
  };

  return (
    <div style={{ width: "100%", height: "130px" }}>
      <Bar data={data} options={options} />
    </div>
  );
};

export default CurrentMonthChart;
