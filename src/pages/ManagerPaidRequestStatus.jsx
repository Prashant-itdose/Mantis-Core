import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import axios from "axios";
import { headers } from "../utils/apitools";
import { apiUrls } from "../networkServices/apiEndpoints";
import { useCryptoLocalStorage } from "../utils/hooks/useCryptoLocalStorage";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { axiosInstances } from "../networkServices/axiosInstance";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ManagerPaidRequestStatus = () => {
  const { t } = useTranslation();
  const [chartData, setChartData] = useState([]);
  const [chartLabels, setChartLabels] = useState([]);
  const { memberID, developerSearchType } = useSelector(
    (state) => state?.loadingSlice
  );

  const handleFirstDashboardCount = (developerId, searchType) => {
    // let form = new FormData();
    // form.append("ID",  useCryptoLocalStorage("user_Data", "get", "ID"));
    // form.append("DeveloperID", developerId);
    // form.append("SearchType", searchType == "" ? "0" : searchType);
    // axios
    //   .post(apiUrls?.ManagerDashboard_Paid_Request_Status, form, { headers })
    axiosInstances
      .post(apiUrls?.ManagerDashboard_Paid_Request_Status, {
        DeveloperID: String(developerId),
        SearchType: String(searchType == "" ? "0" : searchType),
      })
      .then((res) => {
        const response = res?.data?.data;
        if (Array.isArray(response) && response.length > 0) {
          const sortedData = response.sort(
            (a, b) =>
              new Date(`01-${a.status_name}`) -
              new Date(`01-${b.total_requests}`)
          );

          const labels = sortedData?.map((item) => item?.status_name);
          const amounts = sortedData?.map((item) => item?.total_requests);

          setChartLabels(labels);
          setChartData(amounts);
        }
      })
      .catch((err) => {
        console.error("API error:", err);
      });
  };

  useEffect(() => {
    handleFirstDashboardCount(memberID, developerSearchType);
  }, [memberID, developerSearchType]);

  const data = {
    labels: chartLabels,
    datasets: [
      {
        borderRadius: 0,
        data: chartData,
        borderColor: ["#C2DFFF", "#44E3AA", "#FFF000", "#FFF494"],
        backgroundColor: ["#C2DFFF", "#44E3AA", "#FFF000", "#FFF494"],

        borderWidth: 2,
        hoverOffset: 8,
      },
    ],
  };

  const options = {
    indexAxis: "y",
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
      x: {
        beginAtZero: true,
      },
      y: {
        ticks: {
          autoSkip: false,
        },
      },
    },
  };

  return (
    <div style={{ width: "100%", height: "120px" }}>
      <Bar data={data} options={options} />
    </div>
  );
};

export default ManagerPaidRequestStatus;
