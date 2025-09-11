import moment from "moment";

import { toast } from "react-toastify";
import axiosInstance from "../../src/networkServices/axiosInstance"
import Chat2 from "../components/Dashboard/Chat2";
import PolarAreaChart from "../components/Dashboard/PolarAreaChart";
import RadarChart from "../components/Dashboard/RadarChart";
import Linechart from "../components/Dashboard/LineChart";
import BarChart from "../components/Dashboard/BarChart";
import { useCryptoLocalStorage } from "../utils/hooks/useCryptoLocalStorage";


export const getColor1 = () => {
  // const theme = localStorage?.getItem("Theme");
  const theme = useCryptoLocalStorage("user_Data", "get", "theme");
  switch (theme) {
    case "Default":
      return "#231d8c";
    case "light Green":
      return "#036e21";
    case "Peach":
      return "#a65308";
    case "Pale Pink":
      return "#b50e8b";
    case "Red":
      return "#b50502";
    case "SkyBlue":
      return "#03515e";
    case "Grey":
      return "#4f5152";
    default:
      return "#231d8c";
  }
};

export const getChart = (s, maindashboard) => {
  switch (s) {
    case "Pie Chart":
      return <Chat2 state={maindashboard} />;
      break;
    case "PolarArea Chart":
      return <PolarAreaChart state={maindashboard} />;
      break;
    case "Radar Chart":
      return <RadarChart state={maindashboard} />;
      break;
    case "Line Chart":
      return <Linechart state={maindashboard} />;
      break;
    case "Bar Chart":
      return <BarChart state={maindashboard} />;
      break;
  }
};

export const ChartData = [
  {
    label: "Bar Chart",
    value: "Bar Chart",
  },
  {
    label: "Pie Chart",
    value: "Pie Chart",
  },
  
  {
    label: "Radar Chart",
    value: "Radar Chart",
  },
  {
    label: "PolarArea Chart",
    value: "PolarArea Chart",
  },
  {
    label: "Line Chart",
    value: "Line Chart",
  },
];

// export const fetchuserdata = (data, state) => {
//   axiosInstance
//     .post("CommonController/UserwiseDashboard", {
//       FromDate: moment(data?.FromDate).format("YYYY-MM-DD"),
//       ToDate: moment(data?.ToDate).format("YYYY-MM-DD"),
//       CentreID: Array.isArray(data?.CentreID)
//         ? data?.CentreID
//         : [data?.CentreID],
//       FromTime: data?.FromTime,
//       ToTime: data?.ToTime,
//     })
//     .then((res) => {
//       state(res?.data?.message);
//     })
//     .catch((err) => {
//       toast.error(
//         err?.response?.data?.message
//           ? err?.response?.data?.message
//           : "Something Wents Wrong"
//       );
//     });
// };

// export const getDashBoardData = (type, value, payload, state) => {
//   axiosInstance
//     .post("CommonController/GetDashBoardData", {
//       CentreID:
//         type === "CentreID"
//           ? Array.isArray(value)
//             ? value
//             : [value]
//           : Array.isArray(payload?.CentreID)
//           ? payload?.CentreID
//           : [payload?.CentreID],
//       FromDate:
//         type === "FromDate"
//           ? moment(value).format("YYYY-MM-DD")
//           : moment(payload?.FromDate).format("YYYY-MM-DD"),
//       ToDate:
//         type === "ToDate"
//           ? moment(value).format("YYYY-MM-DD")
//           : moment(payload?.ToDate).format("YYYY-MM-DD"),
//       FromTime: type === "FromTime" ? value : payload?.FromTime,
//       ToTime: type === "ToTime" ? value : payload?.ToTime,
//     })
//     .then((res) => {
//       state(res?.data?.message);
//     })
//     .catch((err) => {
//       toast.error(
//         err?.response?.data?.message
//           ? err?.response?.data?.message
//           : err?.data?.message
//       );
//     });
// };
