// import React, { useEffect, useState } from "react";
// import { useTranslation } from "react-i18next";
// import Input from "../components/formComponent/Input";
// import { toast } from "react-toastify";
// import { axiosInstances } from "../networkServices/axiosInstance";
// import { apiUrls } from "../networkServices/apiEndpoints";
// import ReactSelect from "../components/formComponent/ReactSelect";
// import Loading from "../components/loader/Loading";
// import Heading from "../components/UI/Heading";
// import Tables from "../components/UI/customTable";
// import SmartReportChart from "../components/Dashboard/SmartReportChart";

// const SmartReportDashboard = () => {
//   const [t] = useTranslation();
//   const [filterdata, setTableData] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [project, setProject] = useState([]);

//   const [formData, setFormData] = useState({
//     ProjectID: "",
//     TestName: "",
//     chart: "Pie Chart",
//   });
//   const handleSelectChange = (e) => {
//     const { name, value, checked, type } = e?.target;
//     setFormData({
//       ...formData,
//       [name]: type === "checkbox" ? (checked ? 1 : 0) : value,
//     });
//   };
//   const bindProject = () => {
//     axiosInstances
//       .post(apiUrls.BindProjectSmartReport, {})
//       .then((res) => {
//         const datas = res?.data?.data;
//         const poc3s = datas?.map((item) => {
//           return { label: item?.PrjectName, value: item?.ProjectId };
//         });
//         setProject(poc3s);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };

//   const handleSearch = (value) => {
//     setLoading(true);
//     axiosInstances
//       .post(apiUrls.GetReportCount, {
//         ProjectId: String(value) || "",
//       })
//       .then((res) => {
//         if (res.data.success === true) {
//           setTableData(res.data.data);
//           setLoading(false);
//         } else {
//           toast.error(res.data.message);
//           setLoading(false);
//         }
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };

//   const handleDeliveryChange = (name, e) => {
//     const { value } = e;
//     if (name === "ProjectID") {
//       setFormData({
//         ...formData,
//         ProjectID: value,
//         TestName: "",
//       });
//       handleSearch(value);
//     } else {
//       setFormData({
//         ...formData,
//         [name]: value,
//       });
//     }
//   };
//   const getChart = (s, filterdata) => {
//     switch (s) {
//       case "Pie Chart":
//         return <SmartReportChart state={filterdata} />;
//         break;
//     }
//   };
//   const handleSubmit = () => {
//     if (!formData?.ProjectID) {
//       toast.error("Please Select Project.");
//       return;
//     }
//     if (!formData?.TestName) {
//       toast.error("Please Enter Report Count.");
//       return;
//     }

//     setLoading(true);
//     axiosInstances
//       .post(apiUrls.InsertReportcount, {
//         ProjectId: String(formData?.ProjectID),
//         Totalreportcount: String(formData?.TestName),
//       })
//       .then((res) => {
//         if (res.data.success === true) {
//           toast.success(res.data.message);
//           setLoading(false);
//           handleSearch(formData?.ProjectID);
//           setFormData({
//             ...formData,
//             ProjectID: "",
//             TestName: "",
//           });
//           setLoading(false);
//         } else {
//           toast.error(res.data.message);
//           setLoading(false);
//         }
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };

//   const descriptionTHEAD = [
//     "S.No.",
//     "ProjectID",
//     "ProjectName",
//     "Total Report Count",
//     "Generated Report Count",
//     "Remaining Report Count",
//     // "Edit",
//   ];

//   useEffect(() => {
//     bindProject();
//   }, []);
//   return (
//     <>
//       <div className="card">
//         <Heading
//           isBreadcrumb={false}
//           title={
//             <span className="font-weight-bold m-2">Smart Report Dashboard</span>
//           }
//         />
//         <div className="row p-2">
//           <ReactSelect
//             respclass="col-xl-2 col-md-4 col-sm-6 col-12"
//             name="ProjectID"
//             placeholderName={t("Project")}
//             dynamicOptions={project}
//             value={formData?.ProjectID}
//             handleChange={handleDeliveryChange}
//             requiredClassName={"required-fields"}
//             searchable={true}
//           />
//           <Input
//             type="text"
//             className="form-control"
//             id="TestName"
//             name="TestName"
//             lable="Report Count"
//             placeholder=" "
//             onChange={handleSelectChange}
//             value={formData?.TestName}
//             respclass="col-xl-2 col-md-4 col-sm-4 col-12"
//           />

//           {loading ? (
//             <Loading />
//           ) : (
//             <button
//               className="btn btn-sm btn-success ml-3"
//               onClick={handleSubmit}
//             >
//               Add
//             </button>
//           )}
//         </div>
//       </div>
//       <div className="card">
//         <div>{getChart(formData?.chart, filterdata)}</div>
//       </div>
//       {/* {tableData?.length > 0 && (
//         <div className="card mt-1">
//           <Heading
//             title={<span className="font-weight-bold">Search Details</span>}
//           />
//           <Tables
//             thead={descriptionTHEAD}
//             tbody={tableData?.map((ele, index) => ({
//               "S.No.": index + 1,
//               ProjectID: ele?.ProjectId,
//               ProjectName: ele?.PrjectName,
//               "Total Report Count": ele?.TotalReportCount,
//               "Generated Report Count": ele?.GeneratedReportCount,
//               "Remaining Report Count": ele?.RemainingReportCount,

//             }))}
//             tableHeight={"tableHeight"}
//           />
//         </div>
//       )} */}
//     </>
//   );
// };

// export default SmartReportDashboard;
"use client";

import { useEffect, useState } from "react";
import {
  Calendar,
  CreditCard,
  History,
  LogOut,
  Users,
  MessageSquare,
  Settings,
} from "lucide-react";
import "./SmartReportDashboard.css";
// import logo from "../../assets/image/logo.png";
import logo from "../../src/assets/image/logo-itdose.png";
import moment from "moment";
import TransactionHistory from "./AiReportDashboard/NewDashboard/Modals/TransactionHistory";
import AddCreditsModal from "./AiReportDashboard/NewDashboard/Modals/AddCreditsModal";
import SettingsModal from "./AiReportDashboard/NewDashboard/Modals/SettingsModal";
import RateCardMasterModal from "./AiReportDashboard/NewDashboard/Modals/RateCardMasterModal";
import PatientVisitAIToday from "./AiReportDashboard/NewDashboard/Modals/PatientVisitAIToday";
import PatientVisitAIRangePeriod from "./AiReportDashboard/NewDashboard/Modals/PatientVisitAIRangePeriod";
import PatientVisitAIQuestionPeriod from "./AiReportDashboard/NewDashboard/Modals/PatientVisitAIQuestionPeriod";
import PatientVisitAI from "./AiReportDashboard/NewDashboard/Modals/PatientVisitAI";
import DatePicker from "../components/formComponent/DatePicker";
import { RateCardSVg } from "../utils/SVGICON";
import Modal from "../components/modalComponent/Modal";
import { apiUrls } from "../networkServices/apiEndpoints";
import { axiosInstances } from "../networkServices/axiosInstance";
import { useTranslation } from "react-i18next";
import Heading from "../components/UI/Heading";
import ReactSelect from "../components/formComponent/ReactSelect";
import Input from "../components/formComponent/Input";
import Loading from "../components/loader/Loading";
import SmartReportChart from "../components/Dashboard/SmartReportChart";
import { toast } from "react-toastify";

const SmartReportDashboard = () => {
  /////////////////////////////////////////
  const [t] = useTranslation();
  const [filterdata, setfilterdata] = useState([]);
  const [loading, setLoading] = useState(false);
  const [project, setProject] = useState([]);

  const [formData, setFormData] = useState({
    ProjectID: "",
    TestName: "",
    chart: "Pie Chart",
  });
  const handleSelectChange = (e) => {
    const { name, value, checked, type } = e?.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? (checked ? 1 : 0) : value,
    });
  };
  const bindProject = () => {
    axiosInstances
      .post(apiUrls.BindProjectSmartReport, {})
      .then((res) => {
        const datas = res?.data?.data;
        const poc3s = datas?.map((item) => {
          return { label: item?.PrjectName, value: item?.ProjectId };
        });
        setProject(poc3s);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSearch = (value) => {
    setLoading(true);
    axiosInstances
      .post(apiUrls.GetReportCount, {
        ProjectId: String(value) || "",
      })
      .then((res) => {
        if (res.data.success === true) {
          setfilterdata(res.data.data);
          setLoading(false);
        } else {
          toast.error(res.data.message);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDeliveryChange = (name, e) => {
    const { value } = e;
    if (name === "ProjectID") {
      setFormData({
        ...formData,
        ProjectID: value,
        TestName: "",
      });
      handleSearch(value);
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };
  const getChart = (s, filterdata) => {
    switch (s) {
      case "Pie Chart":
        return <SmartReportChart state={filterdata} />;
        break;
    }
  };

  const handleClear = () => {
    setFormData({
      ...formData,
      ProjectID: "",
      TestName: "",
      chart: "Pie Chart",
    });
    setfilterdata(null);
  };
  const handleSubmit = () => {
    if (!formData?.ProjectID) {
      toast.error("Please Select Project.");
      return;
    }
    if (!formData?.TestName) {
      toast.error("Please Enter Report Count.");
      return;
    }

    setLoading(true);
    axiosInstances
      .post(apiUrls.InsertReportcount, {
        ProjectId: String(formData?.ProjectID),
        Totalreportcount: String(formData?.TestName),
      })
      .then((res) => {
        if (res.data.success === true) {
          toast.success(res.data.message);
          setLoading(false);
          handleSearch(formData?.ProjectID);
          setFormData({
            ...formData,
            ProjectID: "",
            TestName: "",
          });
          setLoading(false);
        } else {
          toast.error(res.data.message);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const descriptionTHEAD = [
    "S.No.",
    "ProjectID",
    "ProjectName",
    "Total Report Count",
    "Generated Report Count",
    "Remaining Report Count",
    // "Edit",
  ];

  useEffect(() => {
    bindProject();
  }, []);

  ///////////////////////////////////////////////////////////////////////////
  const [selectedPeriod, setSelectedPeriod] = useState(15);
  const [fromDate, setFromDate] = useState(
    new Date(new Date().setDate(new Date().getDate() - 15))
  );
  // e2d141b29e54b236424a42d7282fa415
  const [toDate, setToDate] = useState(new Date());
  const [apiURL, setApiURL] = useState("");
  const [dashboardData, setDashboardData] = useState([]);

  const periods = [
    { name: "Current Date", value: 0 },
    { name: "Last 7 Days", value: 7 },
    { name: "Last 15 Days", value: 15 },
    { name: "Last 30 Days", value: 30 },
  ];

  const [tableData, setTableData] = useState([]);

  const handleAiDetails = () => {
    axiosInstances
      .post(apiUrls.AIClientDashboard, {
        clientCode: "REACT2025e8d7c6b5a4f3e2d1c0b",
        Type: String(""),
      })
      .then((res) => {
        setTableData(res.data.data);
      })
      .catch((err) => console.log(err));
  };

  const getAIClientOpeningAPI = () => {
    axiosInstances
      .post(apiUrls.AIClientOpening, {
        clientCode: "REACT2025e8d7c6b5a4f3e2d1c0b",
        asOnDate: moment(new Date()).format("YYYY-MM-DD"),
        isCurrent: "1",
      })
      .then((res) => {
        setDashboardData(res.data.data);
      })
      .catch((err) => console.log(err));
  };
  const [type1, setType1] = useState([]);
  const [type2, setType2] = useState([]);
  const [type3, setType3] = useState([]);
  const [type4, setType4] = useState([]);

  const AIClientDashboardAPIType1 = () => {
    axiosInstances
      .post(apiUrls.AIClientDashboard, {
        clientCode: "REACT2025e8d7c6b5a4f3e2d1c0b",
        type: "1",
        requestID: "1",
        patientID: "1",
        fromDate: moment(fromDate).format("YYYY-MM-DD"),
        toDate: moment(toDate).format("YYYY-MM-DD"),
        queryRequest: "1",
      })
      .then((res) => {
        setType1(res.data.data);
      })
      .catch((err) => console.log(err));
  };
  const AIClientDashboardAPIType2 = () => {
    axiosInstances
      .post(apiUrls.AIClientDashboard, {
        clientCode: "REACT2025e8d7c6b5a4f3e2d1c0b",
        type: "2",
        requestID: "1",
        patientID: "1",
        fromDate: moment(fromDate).format("YYYY-MM-DD"),
        toDate: moment(toDate).format("YYYY-MM-DD"),
        queryRequest: "1",
      })
      .then((res) => {
        setType2(res.data.data);
      })
      .catch((err) => console.log(err));
  };
  const AIClientDashboardAPIType3 = () => {
    axiosInstances
      .post(apiUrls.AIClientDashboard, {
        clientCode: "REACT2025e8d7c6b5a4f3e2d1c0b",
        type: "3",
        requestID: "1",
        patientID: "1",
        fromDate: moment(fromDate).format("YYYY-MM-DD"),
        toDate: moment(toDate).format("YYYY-MM-DD"),
        queryRequest: "1",
      })
      .then((res) => {
        setType3(res.data.data);
      })
      .catch((err) => console.log(err));
  };
  const AIClientDashboardAPIType4 = () => {
    axiosInstances
      .post(apiUrls.AIClientDashboard, {
        clientCode: "REACT2025e8d7c6b5a4f3e2d1c0b",
        type: "4",
        requestID: "1",
        patientID: "1",
        fromDate: moment(fromDate).format("YYYY-MM-DD"),
        toDate: moment(toDate).format("YYYY-MM-DD"),
        queryRequest: "1",
      })
      .then((res) => {
        setType4(res.data.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    handleAiDetails();
    getAIClientOpeningAPI();
    // AIClientDashboardAPIType1();
    // AIClientDashboardAPIType2();
    // AIClientDashboardAPIType3();
    // AIClientDashboardAPIType4();
  }, []);
  const [visible, setVisible] = useState({
    showVisible: false,
    removeVisible: false,
    gmailVisible: false,
    emailVisible: false,
    creditVisible: false,
    transactionVisible: false,
    settingsVisible: false,
    ratecardVisible: false,
    showData: {},
  });

  useEffect(() => {
    if (fromDate) {
      AIClientDashboardAPIType1(fromDate);
      AIClientDashboardAPIType2(fromDate);
      AIClientDashboardAPIType3(fromDate);
      AIClientDashboardAPIType4(fromDate);
    }
  }, [fromDate]);
  return (
    <>
      {visible?.showVisible && (
        <Modal
          modalWidth={"800px"}
          visible={visible}
          setVisible={setVisible}
          Header="Today's Patients in AI"
        >
          <PatientVisitAIToday
            visible={visible}
            setVisible={setVisible}
            type2={type2}
            fromDate={fromDate}
            toDate={toDate}
          />
        </Modal>
      )}
      {visible?.removeVisible && (
        <Modal
          modalWidth={"800px"}
          visible={visible}
          setVisible={setVisible}
          Header="Range Period Patients in AI"
        >
          <PatientVisitAIRangePeriod
            visible={visible}
            setVisible={setVisible}
            fromDate={fromDate}
            toDate={toDate}
          />
        </Modal>
      )}
      {visible?.gmailVisible && (
        <Modal
          modalWidth={"800px"}
          visible={visible}
          setVisible={setVisible}
          Header="Today's Questions in AI"
        >
          <PatientVisitAI
            visible={visible}
            setVisible={setVisible}
            fromDate={fromDate}
            toDate={toDate}
          />
        </Modal>
      )}
      {visible?.emailVisible && (
        <Modal
          modalWidth={"800px"}
          visible={visible}
          setVisible={setVisible}
          Header="Range Period Questions in AI"
        >
          <PatientVisitAIQuestionPeriod
            visible={visible}
            setVisible={setVisible}
            fromDate={fromDate}
            toDate={toDate}
          />
        </Modal>
      )}
      {visible?.creditVisible && (
        <Modal
          modalWidth={"500px"}
          visible={visible}
          setVisible={setVisible}
          Header="Add Credits"
        >
          <AddCreditsModal
            visible={visible}
            setVisible={setVisible}
            clientCode={"617c6783237cce08f9198d57cbb0a90b"}
            PerCreditTokenCost={dashboardData?.PerCreditTokenCost}
          />
        </Modal>
      )}
      {visible?.transactionVisible && (
        <Modal
          modalWidth={"1000px"}
          visible={visible}
          setVisible={setVisible}
          Header="Transaction History"
        >
          <TransactionHistory visible={visible} setVisible={setVisible} />
        </Modal>
      )}
      {visible?.settingsVisible && (
        <Modal
          modalWidth={"800px"}
          visible={visible}
          setVisible={setVisible}
          Header="Settings"
        >
          <SettingsModal
            visible={visible}
            setVisible={setVisible}
            handleAiDetails={handleAiDetails}
          />
        </Modal>
      )}
      {visible?.ratecardVisible && (
        <Modal
          modalWidth={"400px"}
          visible={visible}
          setVisible={setVisible}
          Header="Rate Card"
        >
          <RateCardMasterModal visible={visible} setVisible={setVisible} />
        </Modal>
      )}
      <div className="hospital-dashboard">
        {/* Header */}
        <header className="dashboard-header">
          <div className="header-container">
            <div className="hospital-branding">
              <div className="hospital-logo">
                <div className="">
                  <div className="">
                    <img
                      // src="../../../public/img/MOH.png"
                      src={logo}
                      alt="Logo"
                      height={"20vh"}
                      width={"40vh"}
                    />
                  </div>
                </div>
              </div>
              <div>
                <h1 className="hospital-title">{tableData[0]?.name}</h1>
                <p className="hospital-subtitle font-weight-bold">
                  Smart Report Dashboard
                </p>
              </div>
            </div>

            <div className="header-actions">
              <div className="credit-display">
                Credit :{" "}
                <span className="ml-0">
                  {dashboardData ? dashboardData : 0}
                </span>
              </div>
              <button
                className="action-button"
                onClick={() => {
                  setVisible({
                    creditVisible: true,
                  });
                }}
                style={{
                  marginLeft: "10px",
                  color: "red",
                  cursor: "pointer",
                }}
              >
                <CreditCard size={16} />
                Add Credit
              </button>
              <button
                className="action-button"
                onClick={() => {
                  setVisible({
                    transactionVisible: true,
                  });
                }}
                style={{
                  marginLeft: "10px",
                  color: "red",
                  cursor: "pointer",
                }}
              >
                <History size={16} />
                Credit History
              </button>
              <button
                className="action-button"
                onClick={() => {
                  setVisible({
                    settingsVisible: true,
                  });
                }}
                style={{
                  marginLeft: "10px",
                  color: "red",
                  cursor: "pointer",
                }}
              >
                <Settings size={16} />
                Settings
              </button>
              <button
                className="action-button"
                onClick={() => {
                  setVisible({
                    ratecardVisible: true,
                  });
                }}
                style={{
                  marginLeft: "10px",
                  color: "red",
                  cursor: "pointer",
                }}
              >
                <RateCardSVg />
                Rate Card
              </button>
            </div>
          </div>
        </header>

        {/* Date Filter Section */}
        <div className="date-filter-section">
          <div className="filter-container">
            {periods.map((period) => (
              <button
                key={period?.value}
                onClick={() => (
                  setSelectedPeriod(period?.value),
                  setFromDate(
                    new Date(
                      new Date().setDate(new Date().getDate() - period?.value)
                    )
                  ),
                  setToDate(new Date())
                )}
                className={`period-button ${
                  selectedPeriod === period?.value
                    ? "period-button-active"
                    : "period-button-inactive"
                }`}
              >
                {period?.name}
              </button>
            ))}

            <div className="date-picker-group">
              <DatePicker
                className="custom-calendar"
                placeholder=""
                lable="From Date" // Corrected to "lable"
                name="fromDate"
                id="From"
                value={fromDate}
                handleChange={(e) => setFromDate(e.target.value)}
              />
              <DatePicker
                className="custom-calendar"
                placeholder=""
                lable="To Date" // Corrected to "lable"
                name="toDate"
                id="toDate"
                value={toDate}
                handleChange={(e) => setToDate(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="main-content-dashboard">
          {/* Section 1: Patient Visit in AI */}
          <section className="dashboard-section">
            <div className="section-header section-header-cyan">
              <h2 className="section-title">1. Project Visit in AI</h2>
            </div>

            <div className="metrics-grid">
              <button className="metric-card">
                <div className="card-content">
                  <div className="card-info">
                    <h3 className="card-title card-title-blue">
                      Today's Project in AI
                    </h3>

                    <div className="card-metric">
                      {type1?.[0]?.TotalVisit || 0}
                    </div>
                    <p className="card-description card-description-blue">
                      Total AI project visits for today. Click to view details.
                    </p>
                  </div>
                  <div className="card-icon card-icon-blue">
                    <Users
                      size={20}
                      className="card-title-blue mr-2"
                      onClick={() => {
                        setVisible({
                          showVisible: true,
                        });
                      }}
                      style={{
                        marginLeft: "10px",
                        color: "red",
                        cursor: "pointer",
                      }}
                    />
                  </div>
                </div>
              </button>

              <button className="metric-card">
                <div className="card-content">
                  <div className="card-info">
                    <h3 className="card-title card-title-blue">
                      Range Period Project in AI
                    </h3>
                    <div className="card-metric">
                      {type2?.[0]?.TotalVisit || 0}
                    </div>
                    <p className="card-description card-description-blue">
                      Total AI project visits for Range Period. Click to view
                      details.
                    </p>
                  </div>
                  <div className="card-icon card-icon-blue">
                    <Users
                      size={20}
                      className="card-title-blue mr-2"
                      onClick={() => {
                        setVisible({
                          removeVisible: true,
                        });
                      }}
                      style={{
                        marginLeft: "10px",
                        color: "red",
                        cursor: "pointer",
                      }}
                    />
                  </div>
                </div>
              </button>
            </div>
          </section>
        </div>
      </div>
      <div className="card mt-2">
        <Heading
          isBreadcrumb={false}
          title={
            <span className="font-weight-bold m-2">Smart Report Add Count</span>
          }
        />
        <div className="row p-2">
          <ReactSelect
            respclass="col-xl-2 col-md-4 col-sm-6 col-12"
            name="ProjectID"
            placeholderName={t("Project")}
            dynamicOptions={project}
            value={formData?.ProjectID}
            handleChange={handleDeliveryChange}
            requiredClassName={"required-fields"}
            searchable={true}
          />
          <Input
            type="text"
            className="form-control"
            id="TestName"
            name="TestName"
            lable="Report Count"
            placeholder=" "
            onChange={handleSelectChange}
            value={formData?.TestName}
            respclass="col-xl-2 col-md-4 col-sm-4 col-12"
          />

          {loading ? (
            <Loading />
          ) : (
            <button
              className="btn btn-sm btn-success ml-3"
              onClick={handleSubmit}
            >
              Add
            </button>
          )}

          <button className="btn btn-sm btn-success ml-3" onClick={handleClear}>
            Clear
          </button>
        </div>
      </div>
      <div className="card">
        <div>{getChart(formData?.chart, filterdata)}</div>
      </div>
    </>
  );
};

export default SmartReportDashboard;
