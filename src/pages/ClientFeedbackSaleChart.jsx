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

const ClientFeedbackSaleChart = () => {
  const { t } = useTranslation();
  const { memberID, developerSearchType } = useSelector(
    (state) => state?.loadingSlice
  );
  const [chartData, setChartData] = useState([]);

  const handleFetchSalesData = (developerId, searchType) => {
    let form = new FormData();
    form.append("ID", useCryptoLocalStorage("user_Data", "get", "ID"));
    form.append("DeveloperID", "0");
    form.append("SearchType","3");
    axios
      .post(apiUrls?.CoorDashboard_NewSales, form, { headers })
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
    labels: chartData.map((item) => item.NewSaleMonth),
    datasets: [
      {
        label: t("Total Sales"),
        borderRadius: 0,
        data: chartData.map((item) => item.TotalAmount),
        backgroundColor: "#8bd6ad",
        borderColor: "#8bd6ad",
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
    <div style={{ width: "100%", height: "150px" }}>
      <Bar data={data} options={options} />
    </div>
  );
};

export default ClientFeedbackSaleChart;
