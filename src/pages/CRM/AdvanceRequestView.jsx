import React, { useEffect, useState } from "react";
import Heading from "../../components/UI/Heading";
import DatePickerMonth from "../../components/formComponent/DatePickerMonth";
import MultiSelectComp from "../../components/formComponent/MultiSelectComp";
import { apiUrls } from "../../networkServices/apiEndpoints";
import ReactSelect from "../../components/formComponent/ReactSelect";
import Tables from "../../components/UI/customTable";
import {
  advanceRequestTHEAD,
  leaveViewRequestTHEAD,
} from "../../components/modalComponent/Utils/HealperThead";
import Input from "../../components/formComponent/Input";
import { toast } from "react-toastify";
import Modal from "../../components/modalComponent/Modal";
import AdvanceRequestSettelementModal from "./AdvanceRequestSettelementModal";
import Loading from "../../components/loader/Loading";
import AdvanceRequestReject from "./AdvanceRequestReject";
import AdvanceRequestApprove from "./AdvanceRequestApprove";
import AdvanceRequestFinalApprove from "./AdvanceRequestFinalApprove";
import { useCryptoLocalStorage } from "../../utils/hooks/useCryptoLocalStorage";
import { Link } from "react-router-dom";
import { axiosInstances } from "../../networkServices/axiosInstance";

const currentDate = new Date();
const currentMonth = currentDate.getMonth() + 1;
const currentYear = currentDate.getFullYear();

const AdvanceRequestView = () => {
  const [loading, setLoading] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const ReportingManager = useCryptoLocalStorage(
    "user_Data",
    "get",
    "IsReportingManager"
  );
  const IsAccountant = useCryptoLocalStorage("user_Data", "get", "ID");

  const IsCEO = useCryptoLocalStorage("user_Data", "get", "IsCEO");

  const IsEmployee = useCryptoLocalStorage("user_Data", "get", "realname");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 13;
  const totalPages = Math.ceil(filteredData?.length / rowsPerPage);
  const currentData = filteredData?.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );
  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const totalEntries = filteredData?.length;
  const startEntry = (currentPage - 1) * rowsPerPage + 1;
  const endEntry = Math.min(currentPage * rowsPerPage, totalEntries);

  const [vertical, setVertical] = useState([]);
  const [team, setTeam] = useState([]);
  const [wing, setWing] = useState([]);
  const [employee, setEmployee] = useState([]);
  const [formData, setFormData] = useState({
    Month: new Date(),
    VerticalID: [],
    TeamID: [],
    WingID: [],
    Employee: "",
    Name: "",
    Year: "",
    currentMonth: currentMonth,
    currentYear: currentYear,
  });

  const CrmEmployeeID = useCryptoLocalStorage(
    "user_Data",
    "get",
    "CrmEmployeeID"
  );
  const handleMonthYearChange = (name, e) => {
    const { value } = e.target;
    const date = new Date(value);
    setFormData({
      ...formData,
      currentMonth: date.getMonth() + 1,
      currentYear: date.getFullYear(),
    });
  };
  const getReporter = () => {
    axiosInstances
      .post(apiUrls.EmployeeBind, {
        CrmEmployeeID: Number(
          useCryptoLocalStorage("user_Data", "get", "CrmEmployeeID")
        ),
        RoleID: Number(useCryptoLocalStorage("user_Data", "get", "RoleID")),
      })

      .then((res) => {
        const wings = res?.data?.data?.map((item) => {
          return { label: item?.EmployeeName, value: item?.MantisEmployee_ID };
        });
        setEmployee(wings);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getVertical = () => {
    axiosInstances
      .post(apiUrls.Vertical_Select, {})
      .then((res) => {
        const verticals = res?.data.data.map((item) => {
          return { name: item?.Vertical, code: item?.VerticalID };
        });
        setVertical(verticals);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getTeam = () => {
    axiosInstances
      .post(apiUrls.Team_Select, {})
      .then((res) => {
        const teams = res?.data.data.map((item) => {
          return { name: item?.Team, code: item?.TeamID };
        });
        setTeam(teams);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getWing = () => {
    axiosInstances
      .post(apiUrls.Wing_Select, {})
      .then((res) => {
        const wings = res?.data.data.map((item) => {
          return { name: item?.Wing, code: item?.WingID };
        });
        setWing(wings);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleMultiSelectChange = (name, selectedOptions) => {
    const selectedValues = selectedOptions.map((option) => option.code);
    setFormData((prev) => ({
      ...prev,
      [`${name}`]: selectedValues,
    }));
  };
  const handleDeliveryChange = (name, e) => {
    const { value } = e;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSearchAdvance = () => {
    // if (formData?.Employee === "") {
    //   toast.error("Please Select Employee.");
    //   return;
    // }
    setLoading(true);
    axiosInstances
      .post(apiUrls.AdvanceRequest_Search, {
        Month: String(formData?.currentMonth),
        Year: String(formData?.currentYear),
        RequestedBy: Number(formData?.Employee) || Number("0"),
        SearchType: Number(0),
        VerticalID: Number(formData?.VerticalID),
        TeamID: Number(formData?.TeamID),
        WingID: Number(formData?.WingID),
      })
      .then((res) => {
        if (res?.data?.success === true) {
          setTableData(res?.data?.data);
          setFilteredData(res?.data?.data);
          setLoading(false);
        } else {
          toast.error(res?.data?.message);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };
  const handleSearchAdvanceEmployee = () => {
    setLoading(true);
    axiosInstances
      .post(apiUrls.AdvanceRequest_Search, {
        Month: String(formData?.currentMonth),
        Year: String(formData?.currentYear),
        RequestedBy:
          IsCEO == "1"
            ? Number("0")
            : Number(useCryptoLocalStorage("user_Data", "get", "ID")),
        SearchType: Number(0),
        VerticalID: Number(formData?.VerticalID),
        TeamID: Number(formData?.TeamID),
        WingID: Number(formData?.WingID),
      })

      .then((res) => {
        if (res?.data?.success === true) {
          setTableData(res?.data?.data);
          setFilteredData(res?.data?.data);
          setLoading(false);
        } else {
          toast.error(res?.data?.message);
          setTableData([]);
          setFilteredData([]);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const [visible, setVisible] = useState({
    showVisible: false,
    ShowReject: false,
    ShowApprove: false,
    ShowFinalApprove: false,
    showData: {},
  });

  useEffect(() => {
    getVertical();
    getTeam();
    getWing();
    getReporter();
  }, []);
  return (
    <>
      {visible?.showVisible && (
        <Modal
          modalWidth={"400px"}
          visible={visible}
          setVisible={setVisible}
          Header="Payment Details"
        >
          <AdvanceRequestSettelementModal
            visible={visible}
            setVisible={setVisible}
            handleSearchAdvance={handleSearchAdvance}
          />
        </Modal>
      )}
      {visible?.ShowReject && (
        <Modal
          modalWidth={"500px"}
          visible={visible}
          setVisible={setVisible}
          Header="Reject Advance Request"
        >
          <AdvanceRequestReject
            visible={visible}
            setVisible={setVisible}
            handleSearchAdvance={handleSearchAdvance}
          />
        </Modal>
      )}
      {visible?.ShowApprove && (
        <Modal
          modalWidth={"400px"}
          visible={visible}
          setVisible={setVisible}
          Header="Approve Advance Request"
        >
          <AdvanceRequestApprove
            visible={visible}
            setVisible={setVisible}
            handleSearchAdvance={handleSearchAdvance}
          />
        </Modal>
      )}
      {visible?.ShowFinalApprove && (
        <Modal
          modalWidth={"500px"}
          visible={visible}
          setVisible={setVisible}
          Header="Final Approve Details"
        >
          <AdvanceRequestFinalApprove
            visible={visible}
            setVisible={setVisible}
            handleSearchAdvance={handleSearchAdvance}
          />
        </Modal>
      )}
      <div className="card">
        <Heading
          isBreadcrumb={true}
          title={
            <span style={{ fontWeight: "bold" }}>Advance Request View</span>
          }
          secondTitle={
            <>
              <div className="d-flex">
                {tableData?.length > 0 && (
                  <div className="attendance-status">
                    <div className="status-item ">
                      <span className="dot white"></span>
                      <strong>Pending</strong>
                    </div>
                    <div className="status-item ">
                      <span className="dot lemonchiffonAdvReq"></span>
                      <strong>First Level Approved </strong>
                    </div>
                    <div className="status-item ">
                      <span className="dot skyblueAdReq"></span>
                      <strong>Final Approved</strong>
                    </div>
                    <div className="status-item ">
                      <span className="dot pinkAdvReq"></span>
                      <strong>Rejected </strong>
                    </div>
                    <div className="status-item ">
                      <span className="dot yellowAdvReq"></span>
                      <strong>Settelement </strong>
                    </div>
                    <div className="status-item ">
                      <span className="dot greenAdvReq"></span>
                      <strong>Paid </strong>
                    </div>
                  </div>
                )}
                <div style={{ fontWeight: "bold" }}>
                  <Link to="/AdvanceRequest" className="ml-3">
                    Advance Request Create
                  </Link>
                </div>
              </div>
            </>
          }
        />
        <div className="row g-4 m-2">
          <DatePickerMonth
            className="custom-calendar"
            id="Month"
            name="Month"
            lable="Month/Year"
            placeholder={"MM/YY"}
            respclass="col-xl-2 col-md-4 col-sm-6 col-12"
            value={formData?.Month}
            handleChange={(e) => handleMonthYearChange("Month", e)}
          />
          {ReportingManager == 1 || CrmEmployeeID == "650" ? (
            <ReactSelect
              name="Employee"
              respclass="col-xl-2 col-md-4 col-sm-6 col-12"
              placeholderName="Employee"
              dynamicOptions={employee}
              value={formData?.Employee}
              handleChange={handleDeliveryChange}
            />
          ) : (
            <Input
              type="text"
              respclass="col-xl-2 col-md-4 col-sm-6 col-12"
              className="form-control"
              placeholder=" "
              lable="Employee"
              id="Employee"
              name="Employee"
              value={IsEmployee}
              disabled={true}
            />
          )}
          <MultiSelectComp
            respclass="col-xl-2 col-md-4 col-sm-6 col-12"
            name="VerticalID"
            placeholderName="Vertical"
            dynamicOptions={vertical}
            optionLabel="VerticalID"
            className="VerticalID"
            handleChange={handleMultiSelectChange}
            value={formData?.VerticalID?.map((code) => ({
              code,
              name: vertical?.find((item) => item.code === code)?.name,
            }))}
          />
          <MultiSelectComp
            respclass="col-xl-2 col-md-4 col-sm-6 col-12"
            name="TeamID"
            placeholderName="Team"
            dynamicOptions={team}
            handleChange={handleMultiSelectChange}
            value={formData?.TeamID?.map((code) => ({
              code,
              name: team?.find((item) => item.code === code)?.name,
            }))}
          />
          <MultiSelectComp
            respclass="col-xl-2 col-md-4 col-sm-6 col-12"
            name="WingID"
            placeholderName="Wing"
            dynamicOptions={wing}
            handleChange={handleMultiSelectChange}
            value={formData.WingID.map((code) => ({
              code,
              name: wing.find((item) => item.code === code)?.name,
            }))}
          />

          {ReportingManager == 1 || CrmEmployeeID == "650" ? (
            <div className="col-2">
              {loading ? (
                <Loading />
              ) : (
                <button
                  className="btn btn-sm btn-info"
                  onClick={handleSearchAdvance}
                >
                  Search
                </button>
              )}
            </div>
          ) : (
            <div className="col-2">
              {loading ? (
                <Loading />
              ) : (
                <button
                  className="btn btn-sm btn-info"
                  onClick={handleSearchAdvanceEmployee}
                >
                  Search
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {tableData?.length > 0 && (
        <div className="card">
          <Heading
            title={<span style={{ fontWeight: "bold" }}>Search Details</span>}
          />

          <Tables
            thead={advanceRequestTHEAD}
            tbody={currentData?.map((ele, index) => ({
              "S.No.": (currentPage - 1) * rowsPerPage + index + 1,
              "Entry Date": ele?.dtEntry,
              "Expected Date": ele?.ExpectedDate,
              Name: ele?.RequestedBy,
              Vertical: ele?.Vertical,
              Team: ele?.Team,
              Wing: ele?.Wing,
              Purpose: ele?.PurposeofAdvance,
              "Bank Name": ele?.BankName,
              IFSCCODE: ele?.IFSCCODE,
              "Account Number": ele?.AccountNumber,
              Amount: ele?.AmountRequired,
              Settlement: IsAccountant == "1688" &&
                ele?.IsFinalApproved == "1" && (
                  <>
                    {ele?.IsPaid > 0 ? (
                      ""
                    ) : (
                      <button
                        className="btn btn-xs"
                        style={{ color: "white" }}
                        onClick={() => {
                          setVisible({ showVisible: true, showData: ele });
                        }}
                      >
                        Pay
                      </button>
                    )}
                  </>
                ),
              Action: (
                <div>
                  {ReportingManager == "1" && (
                    <>
                      {ele?.RequestedById ==
                      useCryptoLocalStorage("user_Data", "get", "ID") ? (
                        ""
                      ) : (
                        <>
                          {ele?.ApprovalStatus > 0 ? (
                            ""
                          ) : (
                            <button
                              className="btn btn-xs"
                              style={{
                                background: "#80EF80",
                                border: "none",
                                color: "white",
                              }}
                              // onClick={handleApprove}
                              onClick={() => {
                                setVisible({
                                  ShowApprove: true,
                                  showData: ele,
                                });
                              }}
                            >
                              Approve
                            </button>
                          )}
                        </>
                      )}
                      {ele?.RequestedById ==
                      useCryptoLocalStorage("user_Data", "get", "ID") ? (
                        ""
                      ) : (
                        <>
                          {ele?.ApprovalStatus > 0 ? (
                            ""
                          ) : (
                            <button
                              className="btn btn-xs ml-3"
                              style={{
                                background: "#FF746C",
                                border: "none",
                                color: "white",
                              }}
                              onClick={() => {
                                setVisible({ ShowReject: true, showData: ele });
                              }}
                            >
                              Reject
                            </button>
                          )}
                        </>
                      )}
                    </>
                  )}
                  {IsCEO == "1" && ele?.ApprovalStatus == "1" && (
                    <>
                      {ele?.IsFinalApproved == "1" ? (
                        " "
                      ) : (
                        <button
                          className="btn btn-xs ml-1"
                          style={{
                            background: "#80EF80",
                            border: "none",
                            color: "white",
                          }}
                          onClick={() => {
                            setVisible({
                              ShowFinalApprove: true,
                              showData: ele,
                            });
                          }}
                        >
                          Final Approve
                        </button>
                      )}
                    </>
                  )}
                </div>
              ),
              colorcode: ele?.rowColor,
            }))}
            tableHeight={"tableHeight"}
          />
          <div className="pagination ml-auto">
            <div>
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <span>
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default AdvanceRequestView;
