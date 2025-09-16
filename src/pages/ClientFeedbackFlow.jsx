import React, { useEffect, useState } from "react";
import Heading from "../components/UI/Heading";
import { Button } from "react-bootstrap";
import Input from "../components/formComponent/Input";
import ReactSelect from "../components/formComponent/ReactSelect";
import { useTranslation } from "react-i18next";
import Loading from "../components/loader/Loading";
import "./ClientFeedbackFlow.css";
import ClientFeedbackSaleChart from "./ClientFeedbackSaleChart";
import { headers } from "../utils/apitools";
import ClientCategoryBreakdown from "../components/Dashboard/ClientCategoryBreakdown";
import {
  FaUser,
  FaBuilding,
  FaPhone,
  FaHashtag,
  FaStar,
  FaRegStar,
  FaRegCommentDots,
} from "react-icons/fa";
import DatePicker from "../components/formComponent/DatePicker";
import MultiSelectComp from "../components/formComponent/MultiSelectComp";
import { apiUrls } from "../networkServices/apiEndpoints";
import axios from "axios";
import { useCryptoLocalStorage } from "../utils/hooks/useCryptoLocalStorage";
import { toast } from "react-toastify";
import { inputBoxValidation } from "../utils/utils";
import { MOBILE_NUMBER_VALIDATION_REGX } from "../utils/constant";
import moment from "moment";
import ClientFeddbackMsgModal from "./ClientFeddbackMsgModal";
import Modal from "../components/modalComponent/Modal";
import { axiosInstances } from "../networkServices/axiosInstance";

const ClientFeedbackFlow = () => {
  const [t] = useTranslation();
  const { VITE_DATE_FORMAT } = import.meta.env;
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    RatingType: "0",
    CustomerName: "",
    CustomerPhone: "",
    CustomerEmail: "",
    Category: "0",
    SearchBy: "1",
    FromDate: "",
    ToDate: "",
    ProjectID: [],
    CustomerSearchBy: "",
  });
  const [tableData, setTableData] = useState([
    {
      Month: "4",
      TotalSubmission: "30",
      AverageRating: "4",
      ChangePrevMonth: "",
    },
    {
      Month: "2",
      TotalSubmission: "27",
      AverageRating: "3",
      ChangePrevMonth: "",
    },
  ]);
  const [project, setProject] = useState([]);
  const handleDeliveryChange = (name, e) => {
    const { value } = e;

    setFormData((prev) => {
      let updatedData = { ...prev, [name]: value };

      if (value === "1") {
        updatedData.CustomerPhone = "";
        updatedData.CustomerEmail = "";
      } else if (value === "2") {
        updatedData.CustomerName = "";
        updatedData.CustomerEmail = "";
      } else if (value === "3") {
        updatedData.CustomerName = "";
        updatedData.CustomerPhone = "";
      }

      return updatedData;
    });
  };

  const searchHandleChange = (e, index) => {
    const { name, value } = e?.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSelectChange = (e) => {
    const { name, value, checked, type } = e?.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? (checked ? 1 : 0) : value,
    });
  };
  const getProject = () => {
    // let form = new FormData();
    // form.append("ID", useCryptoLocalStorage("user_Data", "get", "ID")),
    //   form.append(
    //     "LoginName",
    //     useCryptoLocalStorage("user_Data", "get", "realname")
    //   ),
    //   axios
    //     .post(apiUrls?.ProjectSelect, form, { headers })
    axiosInstances
      .post(apiUrls.ProjectSelect, {
        ProjectID: 0,
        IsMaster: String(""),
        VerticalID: 0,
        TeamID: 0,
        WingID: 0,
      })
      .then((res) => {
        const poc3s = res?.data.data.map((item) => {
          return { name: item?.Project, code: item?.ProjectId };
        });
        setProject(poc3s);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const [rowHandler, setRowHandler] = useState({
    overview: true,
    analysis: false,
    allfeedback: false,
  });

  const handleOverview = () => {
    setRowHandler((prev) => ({
      overview: !prev.overview,
      analysis: false,
      allfeedback: false,
    }));
  };

  const handleAnalysis = () => {
    setRowHandler((prev) => ({
      overview: false,
      analysis: !prev.analysis,
      allfeedback: false,
    }));
  };

  const handleAllFeedback = () => {
    setRowHandler((prev) => ({
      overview: false,
      analysis: false,
      allfeedback: !prev.allfeedback,
    }));
  };
  const mpnthTHEAD = [
    "S.No.",
    "Month",
    "Total Submissions",
    "Average Rating",
    "Change vs. Prev. Month",
  ];

  const monthlyData = [
    {
      month: "May 2025",
      submissions: 35,
      rating: 2.8,
      changeSubs: 0,
      changeRating: 0,
    },
    {
      month: "June 2025",
      submissions: 57,
      rating: 3.2,
      changeSubs: 22,
      changeRating: 0.4,
    },
    {
      month: "July 2025",
      submissions: 54,
      rating: 3.2,
      changeSubs: -3,
      changeRating: 0,
    },
    {
      month: "August 2025",
      submissions: 4,
      rating: 4.5,
      changeSubs: -50,
      changeRating: 1.3,
    },
  ];

  const getChangeColor = (value) => {
    if (value > 0) return "text-success";
    if (value < 0) return "text-danger";
    return "text-danger";
  };
  const feedbackData = [
    {
      name: "Raj Kamal",
      company: "Lotus Pvt. Ltd.",
      phone: "9430978818",
      tag: "Delivery",
      rating: 2,
      comment: "The quality is not what was advertised. Feels ...",
      sentiment: { label: "Bad", type: "orange", icon: "☹️" },
      submitted: "3 months ago",
    },
    {
      name: "Mohd Asif Khan",
      company: "Khan Pvt. Ltd.",
      phone: "9793800201",
      tag: "General",
      rating: 4,
      comment: "The design is beautiful and very user-friendly.",
      sentiment: { label: "Okay", type: "pink", icon: "😐" },
      submitted: "26 days ago",
    },
    {
      name: "Prashant Singhal",
      company: "Singhal Labs Ltd.",
      phone: "9599265429",
      tag: "Support",
      rating: 3,
      comment: "The design is beautiful and very user-friendly.",
      sentiment: { label: "Good", type: "yellow", icon: "🙂" },
      submitted: "16 days ago",
    },
    {
      name: "Taufique Ali",
      company: "Ali Labs Ltd.",
      phone: "9599265429",
      tag: "Support",
      rating: 1,
      comment: "The design is beautiful and very user-friendly.",
      sentiment: { label: "Very Bad", type: "red", icon: "😡" },
      submitted: "11 days ago",
    },
    {
      name: "Priyam Singh",
      company: "Singh Labs Ltd.",
      phone: "9599265429",
      tag: "Support",
      rating: 5,
      comment: "The design is beautiful and very user-friendly.",
      sentiment: { label: "Excellent", type: "green", icon: "😍" },
      submitted: "14 days ago",
    },
  ];

  const renderStars = (count) => {
    const getColor = (count) => {
      switch (count) {
        case 1:
          return "red"; // Very Bad
        case 2:
          return "orange"; // Bad
        case 3:
          return "yellow"; // Okay
        case 4:
          return "pink"; // Good
        case 5:
          return "green"; // Excellent
        default:
          return "gray";
      }
    };

    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        i <= count ? (
          <FaStar key={i} color={getColor(count)} size={20} />
        ) : (
          <FaRegStar key={i} color="lightgray" size={20} />
        )
      );
    }
    return stars;
  };

  const handleFileClick = () => {
    handleAllFeedback(() =>
      setRowHandler((prev) => ({
        overview: false,
        analysis: false,
        allfeedback: !prev.allfeedback,
      }))
    );
  };
  const handleImogiClick = () => {
    handleAllFeedback(() =>
      setRowHandler((prev) => ({
        overview: false,
        analysis: false,
        allfeedback: !prev.allfeedback,
      }))
    );
  };
  const handleRatingClick = () => {
    handleAllFeedback(() =>
      setRowHandler((prev) => ({
        overview: false,
        analysis: false,
        allfeedback: !prev.allfeedback,
      }))
    );
  };
  const handleMultiSelectChange = (name, selectedOptions) => {
    const selectedValues = selectedOptions.map((option) => option.code);
    setFormData((prev) => ({
      ...prev,
      [`${name}`]: selectedValues,
    }));
  };

  const handleSearch = () => {
    setLoading(true);
    // let form = new FormData();
    // form.append("ID", useCryptoLocalStorage("user_Data", "get", "ID")),
    //   form.append(
    //     "LoginName",
    //     useCryptoLocalStorage("user_Data", "get", "realname")
    //   ),
    //   form.append("SearchBy", formData?.SearchBy),
    //   form.append(
    //     "FromDate",
    //     moment(formData?.FromDate).isValid()
    //       ? moment(formData?.FromDate).format("YYYY-MM-DD")
    //       : ""
    //   );
    // form.append(
    //   "ToDate",
    //   moment(formData?.ToDate).isValid()
    //     ? moment(formData?.ToDate).format("YYYY-MM-DD")
    //     : ""
    // ),
    //   form.append("ProjectID", formData?.ProjectID),
    //   form.append(
    //     "CustomerSearchBy",
    //     formData?.CustomerName ||
    //       formData?.CustomerPhone ||
    //       formData?.CustomerEmail
    //   ),
    //   form.append("RatingType", formData?.RatingType),
    //   form.append("Category", formData?.Category),
    // axios
    //   .post(apiUrls?.ProjectSelect, form, { headers })
    const payload = {
      SearchBy: String(formData?.SearchBy || ""),
      FromDate: moment(formData?.FromDate).isValid()
        ? moment(formData?.FromDate).format("YYYY-MM-DD")
        : "",
      ToDate: moment(formData?.ToDate).isValid()
        ? moment(formData?.ToDate).format("YYYY-MM-DD")
        : "",
      ProjectID: Number(formData?.ProjectID || 0),
      CustomerSearchBy:
        formData?.CustomerName ||
        formData?.CustomerPhone ||
        formData?.CustomerEmail ||
        "",
      RatingType: String(formData?.RatingType || ""),
      Category: String(formData?.Category || ""),
    };

    axiosInstances
      .post(apiUrls?.ProjectSelect, payload)
      .then((res) => {
        if (res?.data?.status === true) {
          toast.success(res.data.message);
          setLoading(false);
          setFormData({
            ...formData,
            CustomerSearchBy: "",
          });
        } else {
          toast.error(res.data.message);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    getProject();
  }, []);

  const [visible, setVisible] = useState({
    showVisible: false,
    showData: {},
  });
  return (
    <>
      {visible?.showVisible && (
        <Modal
          modalWidth={"600px"}
          visible={visible}
          setVisible={setVisible}
          Header="Response Message"
        >
          <ClientFeddbackMsgModal visible={visible} setVisible={setVisible} />
        </Modal>
      )}
      <div className="card">
        {/* <Heading title={"Client Feedback"} isBreadcrumb={false} /> */}
        <div className="row m-2">
          <div className="d-flex ">
            <Button
              onClick={handleOverview}
              style={{
                backgroundColor: rowHandler?.overview === true ? "#029e48" : "",
                color: "white",
                border: "#029e48",
              }}
            >
              Overview
            </Button>
            <Button
              className="ml-2"
              onClick={handleAnalysis}
              style={{
                backgroundColor: rowHandler?.analysis === true ? "#029e48" : "",
                color: "white",
                border: "#029e48",
              }}
            >
              Analytics
            </Button>
            <Button
              className="ml-2"
              onClick={handleAllFeedback}
              style={{
                backgroundColor:
                  rowHandler?.allfeedback === true ? "#029e48" : "",
                color: "white",
                border: "#029e48",
              }}
            >
              All Feedback
            </Button>
          </div>
        </div>
      </div>
      <div className="card">
        <div className="row m-2">
          {/* <button className="btn btn-sm btn-primary ml-2">Today</button>
          <button className="btn btn-sm btn-primary ml-4">Last 7 Days</button>
          <button className="btn btn-sm btn-primary ml-4">Last 30 Days</button>
          <button className="btn btn-sm btn-primary ml-4">All Time</button> */}
          {/* <button className="btn btn-sm btn-primary ml-4">Date Range</button> */}
          <ReactSelect
            className="form-control"
            name="SearchBy"
            respclass="col-xl-2 col-md-4 col-sm-6 col-12"
            placeholderName="Search By"
            id="SearchBy"
            dynamicOptions={[
              { label: "Select", value: "0" },
              { label: "Today", value: "1" },
              { label: "Last 7 Days", value: "2" },
              { label: "Last 30 Days", value: "3" },
              { label: "Date Range", value: "4" },
            ]}
            value={formData?.SearchBy}
            handleChange={handleDeliveryChange}
          />
          {["4"].includes(formData?.SearchBy) && (
            <>
              <DatePicker
                className="custom-calendar"
                id="FromDate"
                name="FromDate"
                lable={t("From Date")}
                placeholder={VITE_DATE_FORMAT}
                value={formData?.FromDate}
                respclass="col-xl-2 col-md-4 col-sm-6 col-12"
                handleChange={searchHandleChange}
              />
              <DatePicker
                className="custom-calendar"
                id="ToDate"
                name="ToDate"
                lable={t("To Date")}
                placeholder={VITE_DATE_FORMAT}
                value={formData?.ToDate}
                respclass="col-xl-2 col-md-4 col-sm-6 col-12"
                handleChange={searchHandleChange}
              />{" "}
            </>
          )}

          <MultiSelectComp
            respclass="col-xl-2 col-md-4 col-sm-6 col-12"
            name="ProjectID"
            placeholderName="Project"
            dynamicOptions={project}
            handleChange={handleMultiSelectChange}
            value={formData.ProjectID.map((code) => ({
              code,
              name: project.find((item) => item.code === code)?.name,
            }))}
          />

          <ReactSelect
            className="form-control"
            name="CustomerSearchBy"
            respclass="col-xl-2 col-md-4 col-sm-6 col-12"
            placeholderName="Cutomer Search By"
            id="CustomerSearchBy"
            dynamicOptions={[
              { label: "Select", value: "0" },
              { label: "Name", value: "1" },
              { label: "Mobile", value: "2" },
              { label: "Email", value: "3" },
            ]}
            value={formData?.CustomerSearchBy}
            handleChange={handleDeliveryChange}
          />
          {formData?.CustomerSearchBy == "1" && (
            <Input
              type="text"
              className="form-control"
              id="CustomerName"
              name="CustomerName"
              lable="Customer Name"
              placeholder=" "
              onChange={handleSelectChange}
              value={formData?.CustomerName}
              respclass="col-xl-2 col-md-4 col-sm-4 col-12"
            />
          )}
          {formData?.CustomerSearchBy == "2" && (
            <Input
              type="number"
              className="form-control"
              id="CustomerPhone"
              name="CustomerPhone"
              lable="Customer Mobile"
              placeholder=" "
              onChange={(e) => {
                inputBoxValidation(
                  MOBILE_NUMBER_VALIDATION_REGX,
                  e,
                  handleSelectChange
                );
              }}
              value={formData?.CustomerPhone}
              respclass="col-xl-2 col-md-4 col-sm-4 col-12"
            />
          )}
          {formData?.CustomerSearchBy == "3" && (
            <Input
              type="text"
              className="form-control"
              id="CustomerEmail"
              name="CustomerEmail"
              lable="Customer Email"
              placeholder=" "
              onChange={handleSelectChange}
              value={formData?.CustomerEmail}
              respclass="col-xl-2 col-md-4 col-sm-4 col-12"
            />
          )}
          <ReactSelect
            className="form-control"
            name="RatingType"
            respclass="col-xl-2 col-md-4 col-sm-6 col-12"
            placeholderName="Rating"
            id="RatingType"
            dynamicOptions={[
              { label: "All Rating", value: "0" },
              { label: "1 Star Rating", value: "1" },
              { label: "2 Star Rating", value: "2" },
              { label: "3 Star Rating", value: "3" },
              { label: "4 Star Rating", value: "4" },
              { label: "5 Star Rating", value: "5" },
            ]}
            value={formData?.RatingType}
            handleChange={handleDeliveryChange}
          />
          <ReactSelect
            className="form-control"
            name="Category"
            respclass="col-xl-2 col-md-4 col-sm-6 col-12"
            placeholderName="Category"
            id="Category"
            dynamicOptions={[
              { label: "All", value: "0" },
              { label: "Support", value: "1" },
              { label: "Delivery", value: "2" },
            ]}
            value={formData?.Category}
            handleChange={handleDeliveryChange}
          />
          {loading ? (
            <Loading />
          ) : (
            <button
              className="btn btn-sm btn-primary ml-2 mt-0"
              onClick={handleSearch}
            >
              <i className="fa fa-search mr-1" aria-hidden="true"></i> Search
            </button>
          )}
          <button className="btn btn-sm btn-primary ml-2 mt-0">
            <i className="fa fa-download mr-1" aria-hidden="true"></i> Export
          </button>
        </div>
      </div>
      {rowHandler?.overview && (
        <>
          <div className="row d-flex m-0 mt-3">
            <div className="col-md-4 col-sm-12 mb-3">
              <div className="card h-100 hover-shadow">
                <div className="clientDashboardWrp">
                  <div className="mainBox1 p-3">
                    <div className="d-flex flex-wrap mainHeader">
                      <label className="titlefont">{t("New Feedback")}</label>
                      <i
                        className="far fa-file-alt"
                        onClick={handleFileClick}
                      ></i>
                    </div>
                    <div className="Newfeedback55">55</div>
                    <div className="textfontSize">
                      Total submissions in period
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-4 col-sm-12 mb-3">
              <div className="card h-100 hover-shadow">
                <div className="clientDashboardWrp">
                  <div
                    className="mainBox1 p-3"
                    style={{ width: "100%", height: "100px" }}
                  >
                    <div className="d-flex flex-wrap mainHeader">
                      <label className="titlefont">{t("Average Rating")}</label>
                      <i class="far fa-star" onClick={handleRatingClick}></i>
                    </div>
                    <div className="Newfeedback55">4/5</div>
                    <div className="textfontSize">
                      Based on ratings in period
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-4 col-sm-12 mb-3">
              <div className="card h-100 hover-shadow">
                <div className="clientDashboardWrp">
                  <div
                    className="mainBox1 p-3"
                    style={{ width: "100%", height: "100px" }}
                  >
                    <div className="d-flex flex-wrap mainHeader">
                      <label className="titlefont">
                        {t("Flagged Comments")}
                      </label>
                      <i class="far fa-smile" onClick={handleImogiClick}></i>{" "}
                    </div>
                    <div className="Newfeedback55">65</div>
                    <div className="textfontSize">
                      Negative comments in period
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="row m-2">
              <i className="fa fa-paperclip mr-2 mt-1"></i>
              <span className="keyFeedbackTopics">Key Feedback Topics</span>
            </div>
          </div>
        </>
      )}
      {rowHandler?.analysis && (
        <>
          <div className="row m-1">
            <div className="col-md-6 col-sm-12 mt-2">
              <div className="clientDashboardWrp">
                <div
                  className="mainBox1"
                  style={{ width: "100%", height: "180px" }}
                >
                  <div className="d-flex flex-wrap mainHeader">
                    <label className="ml-2 Newfeedback55">
                      {t("Feedback Trends")}
                    </label>
                    <ClientFeedbackSaleChart />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-sm-12 mt-2">
              <div className="clientDashboardWrp">
                <div
                  className="mainBox1"
                  style={{ width: "100%", height: "180px" }}
                >
                  <div className="d-flex flex-wrap mainHeader">
                    <label className="ml-2 Newfeedback55">
                      {t("Category Breakdown")}
                    </label>
                    <ClientCategoryBreakdown />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="card mt-3">
            <div className="row m-2">
              {/* <i className="fa fa-paperclip mr-2 mt-1"></i> */}
              <span className="keyFeedbackTopics mr-1">Monthly Comparison</span>
              <span
                style={{
                  color: "#3D5DA9",
                  fontWeight: "bold",
                  marginTop: "2px",
                }}
              >
                (A month-over-month look at feedback submissions and average
                ratings.)
              </span>
            </div>{" "}
          </div>
          {/* <div className="card">
                <Tables
                  thead={mpnthTHEAD}
                  tbody={tableData?.map((ele, index) => ({
                    "S.No.": index + 1,
                    Month: ele?.Month,
                    "Total Submissions": ele?.TotalSubmission,
                    "Average Rating": ele?.AverageRating,
                    "Change vs. Prev. Month": ele?.ChangePrevMonth,
                  }))}
                  tableHeight={"tableHeight"}
                />
              </div> */}
          <div className="mt-0 p-0 bg-light rounded shadow-sm">
            <table className="table table-hover table-bordered">
              <thead className="custom-thead">
                <tr>
                  <th>Month</th>
                  <th>Total Submissions</th>
                  <th>Average Rating</th>
                  <th>Change vs. Prev. Month</th>
                </tr>
              </thead>
              <tbody>
                {monthlyData.map((row, index) => (
                  <tr key={index}>
                    <td>{row.month}</td>
                    <td>{row.submissions}</td>
                    <td>{row.rating}</td>
                    <td>
                      <span
                        className={`${getChangeColor(row.changeSubs)} me-3`}
                      >
                        {row.changeSubs === 0
                          ? "0 subs"
                          : `${row.changeSubs > 0 ? "↗" : "↘"} ${Math.abs(row.changeSubs)} subs`}
                      </span>
                      <span className={getChangeColor(row.changeRating)}>
                        {row.changeRating === 0
                          ? "0.00 rating"
                          : `↗ +${row.changeRating.toFixed(2)} rating`}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
      {rowHandler?.allfeedback && (
        <>
          <div className="card mt-1">
            <div className="row m-2">
              <div className="col">
                <span className="keyFeedbackTopics mr-1">
                  Feedback Submissions
                </span>
              </div>
            </div>
          </div>

          <div className="mt-0 p-0 bg-light rounded shadow-sm">
            <table className="table table-hover table-bordered">
              <thead className="custom-thead">
                <tr>
                  <th>Customer</th>
                  <th>Rating</th>
                  <th>Comment</th>
                  <th>Sentiment</th>
                  <th>Submitted</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {feedbackData.map((row, index) => (
                  <tr key={index}>
                    <td>
                      {" "}
                      <div>
                        <FaUser className="ml-2" />{" "}
                        <strong style={{ color: "#3D5DA9" }}>{row.name}</strong>{" "}
                        <span>🏅</span>
                      </div>
                      <div>
                        <FaBuilding className="ml-2" /> {row.company}
                      </div>
                      <div>
                        <FaPhone className="ml-2" /> {row.phone}
                      </div>
                      <div>
                        <FaHashtag className="ml-2" /> {row.tag}
                      </div>
                    </td>
                    <td>{renderStars(row.rating)}</td>
                    <td>{row.comment}</td>
                    <td>
                      {
                        <span className={`badge bg-${row.sentiment.type}`}>
                          {row.sentiment.icon} {row.sentiment.label}
                        </span>
                      }
                    </td>

                    <td>{row.submitted}</td>
                    <td>
                      {
                        <i
                          className="far fa-comment"
                          style={{
                            fontSize: "20px !important",
                            marginLeft: "10px",
                            cursor: "pointer",
                          }}
                          onClick={() => {
                            setVisible({
                              showVisible: true,
                              showData: row,
                              row,
                            });
                          }}
                        ></i>
                      }
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </>
  );
};
export default ClientFeedbackFlow;
