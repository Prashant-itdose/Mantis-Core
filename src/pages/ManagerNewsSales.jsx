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

const ManagerNewsSales = () => {
  const { t } = useTranslation();
  const { memberID, developerSearchType } = useSelector(
    (state) => state?.loadingSlice
  );
  const [chartData, setChartData] = useState([]);

  const handleFetchSalesData = (developerId, searchType) => {
    let form = new FormData();
    form.append("ID", useCryptoLocalStorage("user_Data", "get", "ID"));
    // form.append("DeveloperID", developerId);
    // form.append("SearchType", searchType == "" ? "0" : searchType);
    axios
      .post(apiUrls?.ManagerDashboard_New_Sales, form, { headers })
      .then((res) => {
        setChartData(res?.data?.data || []);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    handleFetchSalesData();
  }, []);

  ChartJS.register(CategoryScale, LinearScale, Title, BarElement, Tooltip);

  const data = {
    labels: chartData.map((item) => item.RecoveryMonth),
    datasets: [
      {
        label: t("Total Sales"),
        borderRadius: 0,
        data: chartData.map((item) => item.RecoveryAmount),
        backgroundColor: "#86c3d9",
        borderColor: "#86c3d9",
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
        display: false,
      },
    },
    scales: {
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

export default ManagerNewsSales;
