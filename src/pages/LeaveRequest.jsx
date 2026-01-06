import React, { useState, useEffect, useRef } from "react";
import Heading from "../components/UI/Heading";
import DatePickerMonth from "../components/formComponent/DatePickerMonth";
import Modal from "../components/modalComponent/Modal";
import { toast } from "react-toastify";
import { apiUrls } from "../networkServices/apiEndpoints";
import { useCryptoLocalStorage } from "../utils/hooks/useCryptoLocalStorage";
import LeaveRequestModal from "./LeaveRequestModal";
import Loading from "../components/loader/Loading";
import { axiosInstances } from "../networkServices/axiosInstance";
import "./LeaveRequest.css";
import ReactSelect from "../components/formComponent/ReactSelect";
import Input from "../components/formComponent/Input";

const getDaysInMonth = (year, month) => {
  return new Array(new Date(year, month, 0).getDate())
    .fill(null)
    .map((_, index) => {
      return { date: `${month}/${index + 1}`, status: "" };
    });
};

const getStartDayOfWeek = (year, month) => {
  return new Date(year, month - 1, 1).getDay();
};

const currentDate = new Date();
const currentMonth = currentDate.getMonth() + 1;
const currentYear = currentDate.getFullYear();

const LeaveRequest = ({ data }) => {
  console.log("data check", currentYear);

  const dataMonth = data?.MonthYear;
  const jsDate = new Date(`${dataMonth?.replace("-", " ")} 1`);
  // console.log("data?.MonthYear", data?.MonthYear);
  // console.log("js date", jsDate);
  const CRMID = useCryptoLocalStorage("user_Data", "get", "CrmEmployeeID");
  const [employee, setEmployee] = useState([]);
  const [formData, setFormData] = useState({
    Month: dataMonth == undefined ? new Date() : jsDate,
    // Month: new Date(),
    Year: "",
    currentMonth: currentMonth,
    currentYear: currentYear,
    Employee: useCryptoLocalStorage("user_Data", "get", "CrmEmployeeID")
      ? useCryptoLocalStorage("user_Data", "get", "CrmEmployeeID")
      : "",
  });

  const ReportingManager = useCryptoLocalStorage(
    "user_Data",
    "get",
    "IsReportingManager"
  );
  const IsEmployee = useCryptoLocalStorage("user_Data", "get", "realname");
  const [CalenderDetails, setCalenderDetails] = useState([]);

  const [daysInMonth, setDaysInMonth] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [startDayOfWeek, setStartDayOfWeek] = useState(0);
  const [clickedate, setclickeddate] = useState("");

  useEffect(() => {
    const updatedDays = getDaysInMonth(selectedYear, selectedMonth + 1);
    const startDay = getStartDayOfWeek(selectedYear, selectedMonth + 1);
    setDaysInMonth(updatedDays);
    setStartDayOfWeek(startDay);
  }, [selectedMonth, selectedYear]);

  const getReporter = () => {
    axiosInstances
      .post(apiUrls.EmployeeBind, {
        CrmEmployeeID: Number(
          useCryptoLocalStorage("user_Data", "get", "CrmEmployeeID")
        ),
        RoleID: Number(useCryptoLocalStorage("user_Data", "get", "RoleID")),
      })
      .then((res) => {
        const assigntos = res?.data?.data?.map((item) => {
          return { label: item?.EmployeeName, value: item?.Employee_ID };
        });
        setEmployee(assigntos);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleDeliveryChange = (name, e) => {
    const { value } = e;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleMonthYearChange = (name, e) => {
    const { value } = e.target;
    const date = new Date(value);
    setSelectedMonth(date.getMonth());
    setSelectedYear(date.getFullYear());
    handleLeaveRequest_BindCalender({
      month: date.getMonth() + 1,
      year: date.getFullYear(),
    });
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const apiCalledRef = useRef(false);
  useEffect(() => {
    if (apiCalledRef.current) return;
    if (data?.MonthYear) {
      apiCalledRef.current = true;
      const jsDate = new Date(`${data?.MonthYear?.replace("-", " ")} 1`);
      const selYear = jsDate.getFullYear();
      const selMonthZeroBased = jsDate.getMonth();

      setSelectedYear(selYear);
      setSelectedMonth(selMonthZeroBased);
      setFormData((prev) => ({
        ...prev,
        Month: jsDate,
        currentYear: selYear,
        currentMonth: selMonthZeroBased + 1,
        Employee: data?.EmployeeId || data?.Employee_Id || prev.Employee,
      }));

      handleLeaveRequest_BindCalender({
        year: selYear,
        month: selMonthZeroBased + 1,
        employee: data?.EmployeeId || data?.Employee_Id,
      });
    } else {
      apiCalledRef.current = true;
      handleLeaveRequest_BindCalender({
        year: selectedYear,
        month: selectedMonth + 1,
        employee: formData?.Employee,
      });
    }
  }, [data?.MonthYear]);

  const getStatusClass = (day, table1Data) => {
    const Table1LeaveList = table1Data?.find((d) => d.Day === day);

    if (!Table1LeaveList) return "";

    const approvedHolidays = [
      "CL",
      "SL",
      "Comp Off",
      "COMP-Off",
      "WO",
      "LWP",
      "OL",
    ];

    const { IsApproved, HasLeave, Holiday } = Table1LeaveList;

    // Case 1: Working day (not approved, manual entry)
    if (IsApproved == 0 && HasLeave === "2") {
      return "working-day";
    }

    // Case 2: Optional leave requested but not approved
    if (IsApproved == 0 && HasLeave === "OL") {
      return "optional-leave";
    }

    // Case 3: Approved but marked as working day
    if (
      IsApproved == 1 &&
      HasLeave === "0" &&
      !approvedHolidays.includes(Holiday)
    ) {
      return "working-day";
    }

    // Case 4: Leave pending approval
    if (
      IsApproved == 0 &&
      HasLeave === "0" &&
      approvedHolidays.includes(Holiday)
    ) {
      return "pending-approval";
    }

    // Case 5: Leave approved
    if (
      IsApproved == 1 &&
      HasLeave === "0" &&
      approvedHolidays.includes(Holiday)
    ) {
      return "approved-leave";
    }

    // Case 6: Gazetted / Restricted holiday
    if (["GZ", "RT"].includes(HasLeave)) {
      return "gazetted-holiday";
    }

    // Default: Missing attendance
    return "missing-attendance";
  };

  const renderDay = (day, index, today, table1Data) => {
    console.log("tabledata tabledta", table1Data);

    const { date, status } = day;
    const [month, dayOfMonth] = date?.split("/")?.map(Number);
    const dayDate = new Date(today.getFullYear(), month - 1, dayOfMonth);

    const AttendanceDateFormat = new Date(
      table1Data?.find((d) => d.AttendanceDate)?.AttendanceDate
    );

    console.log("AttendanceDateFormat", AttendanceDateFormat);

    const formattedDate = dayDate?.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });

    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    const targetMonth = month - 1;
    const targetYear = today.getFullYear();

    let isDisabled = false;

    if (ReportingManager == 1) {
      if (
        targetYear < currentYear ||
        (targetYear === currentYear && targetMonth < currentMonth)
      ) {
        const daysPassed = today.getDate();
        isDisabled = daysPassed > 2; //// Only enable 2nd Day of every month
      } else if (targetYear === currentYear && targetMonth === currentMonth) {
        isDisabled = false;
      } else {
        isDisabled = true;
      }
    } else {
      if (
        targetYear < currentYear ||
        (targetYear === currentYear && targetMonth < currentMonth)
      ) {
        isDisabled = true;
      } else if (targetYear === currentYear && targetMonth === currentMonth) {
        isDisabled = false;
      } else {
        isDisabled = true;
      }
    }

    const dayDetails = table1Data?.find((d) => d?.Day === dayOfMonth);

    const getWorkHourFromString = (text) => {
      const match = text.match(
        /Work Hour:\s*<span[^>]*>(\d{2}:\d{2})<\/span>/i
      );
      return match ? match[1] : null;
    };

    return (
      <td
        key={index}
        className={`verticalTable ${isDisabled ? "disabled-day" : "active-day"} ${getStatusClass(dayOfMonth, table1Data)}`}
        onClick={() => {
          if (isDisabled) return;
          let isDisabledPopUpTime = 0;
          if (dayDetails?.Holiday) {
            isDisabledPopUpTime = Number(
              getWorkHourFromString(dayDetails?.Holiday)?.split(":")?.[0]
            );
          }
          if (
            isDisabledPopUpTime <= 7 ||
            (!dayDetails?.Holiday?.includes("Logout") &&
              dayDetails?.HasLeave != "GZ")
          ) {
            setVisible({
              showVisible: true,
              data: dayDate,
              CalenderDetails: CalenderDetails,
              ApproveDate: AttendanceDateFormat,
            });
          }

          setclickeddate(AttendanceDateFormat);
        }}
        style={{
          cursor: isDisabled ? "not-allowed" : "pointer",
          pointerEvents: isDisabled ? "none" : "auto",
        }}
      >
        {console.log("CalenderDetails", CalenderDetails)}

        <label className="formattedDate">{formattedDate}</label>
        {status && <div className="day-status">{status}</div>}

        {dayDetails && (
          <div
            className="day-details"
            dangerouslySetInnerHTML={{ __html: dayDetails.Holiday }}
          />
        )}
      </td>
    );
  };

  const renderCalendarRows = () => {
    const weeks = [];
    const today = new Date();
    let currentWeek = new Array(startDayOfWeek).fill(null);
    daysInMonth.forEach((day) => {
      if (currentWeek.length === 7) {
        weeks.push(currentWeek);
        currentWeek = [];
      }
      currentWeek.push(day);
    });
    if (currentWeek.length > 0) {
      weeks.push([
        ...currentWeek,
        ...new Array(7 - currentWeek.length).fill(null),
      ]);
    }
    return weeks?.map((week, index) => (
      <tr key={index}>
        {week?.map((day, i) =>
          day ? (
            renderDay(
              day,
              i,
              today,
              CalenderDetails?.[1] ? CalenderDetails?.[1] : []
            )
          ) : (
            <td key={i} className="empty-day"></td>
          )
        )}
      </tr>
    ));
  };

  const [loading, setLoading] = useState(false);

  const [visible, setVisible] = useState({
    showVisible: false,
    showData: {},
  });

  const handleLeaveRequest_BindCalender = (details) => {
    setLoading(true);

    const empFromForm = formData?.Employee;
    const empFromProp = data?.Employee_Id || data?.EmployeeId;
    const empId = Number(
      details?.employee ?? empFromForm ?? empFromProp ?? CRMID
    );

    const year = Number(details?.year ?? selectedYear);
    const month = Number(details?.month ?? selectedMonth + 1);

    axiosInstances
      .post(apiUrls.LeaveRequest_BindCalender, {
        CrmEmpID: empId,
        Year: year,
        Month: month,
      })
      .then((res) => {
        if (res.data.success === true) {
          setCalenderDetails(res?.data?.data);
          setLoading(false);
        } else {
          toast.error("No Records Found..");
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const leaveData = CalenderDetails?.[0] || [];

  const getLeaveAvailable = (leaveType) => {
    const leave = leaveData.find((item) => item?.LeaveType === leaveType);
    return leave ? leave.Available : "0";
  };

  useEffect(() => {
    getReporter();
  }, []);

  function format2Date(inputDate) {
    const date = new Date(inputDate);
    const formattedDate = date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
    return formattedDate;
  }
  const handleLeaveRequest_Approve = () => {
    setLoading(true);
    axiosInstances
      .post(apiUrls.LeaveRequest_ApproveALL, {
        CrmEmpID: Number(
          useCryptoLocalStorage("user_Data", "get", "CrmEmployeeID")
        ),
        ToApproveCrmEmpID: String(formData?.Employee),
        Month: Number(formData?.currentMonth),
        Year: Number(formData?.currentYear),
      })
      .then((res) => {
        if (res?.data?.success === true) {
          toast.success(res?.data?.message);
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
  // console.log("check", CalenderDetails);
  return (
    <>
      {visible?.showVisible && (
        <Modal
          modalWidth={"600px"}
          visible={visible}
          setVisible={setVisible}
          tableData={CalenderDetails}
          // Header={`Selected Date: ${format2Date(clickedate)}`}
          Header={"Leave Request Details"}
        >
          <LeaveRequestModal
            visible={visible}
            setVisible={setVisible}
            tableData={CalenderDetails}
            data={data}
            CrmEmployee={formData?.Employee}
            handleLeaveRequest_BindCalender={handleLeaveRequest_BindCalender}
          />
        </Modal>
      )}
      {loading ? (
        <Loading />
      ) : (
        <div className="card">
          <Heading title={"Attendance Calendar"} isBreadcrumb={true} />
          <div className="row g-4 m-2">
            {/* <label className="mr-2">Name :</label>
            <span style={{ textAlign: "right" }}>
              {data ? data?.Name : LoginUserName}
            </span> */}
            {ReportingManager == 1 ? (
              <ReactSelect
                respclass="col-xl-2 col-md-4 col-sm-6 col-12"
                name="Employee"
                placeholderName="Employee"
                dynamicOptions={employee}
                handleChange={handleDeliveryChange}
                value={formData.Employee}
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

            <div className="col-sm-4 d-flex">
              {/* <div className="ml-4">
                <label>Leave Month/Year :</label>
              </div> */}
              <div className="cl-sm-4">
                <DatePickerMonth
                  className="custom-calendar"
                  id="Month"
                  name="Month"
                  lable="Month/Year"
                  placeholder={"MM/YY"}
                  respclass="col-xl-12 col-md-6 col-sm-6 col-12"
                  value={formData?.Month}
                  handleChange={(e) => handleMonthYearChange("Month", e)}
                />
              </div>
              <button
                className="btn btn-sm btn-info ml-3"
                onClick={() =>
                  handleLeaveRequest_BindCalender({
                    year: selectedYear,
                    month: selectedMonth + 1,
                    employee: formData?.Employee,
                  })
                }
              >
                Search
              </button>
            </div>
            <div className="col-sm-2"></div>
            <div className="col-sm-4">
              <div className="d-flex flex-wrap">
                <label className="mr-5">Available </label>
                <label className="mr-5">
                  CL :
                  <span style={{ color: "red" }}>
                    &nbsp;{getLeaveAvailable("CL")}
                  </span>
                </label>
                <label className="mr-5">
                  SL :
                  <span style={{ color: "red" }}>
                    &nbsp;{getLeaveAvailable("SL")}
                  </span>
                </label>
                <label className="mr-5">
                  WO :
                  <span style={{ color: "red" }}>
                    &nbsp; {getLeaveAvailable("WO")}
                  </span>
                </label>
                <label className="mr-5">
                  OL :
                  <span style={{ color: "red" }}>
                    &nbsp; {getLeaveAvailable("OL")}
                  </span>
                </label>
              </div>
            </div>
          </div>

          <div className="row d-flex custom-layout">
            <div className="col-md-9 calendar-container-wrapper">
              <div className="calendar-container">
                <table className="calendar">
                  <thead style={{ color: "#0099ff" }}>
                    <tr>
                      <th>Sunday</th>
                      <th>Monday</th>
                      <th>Tuesday</th>
                      <th>Wednesday</th>
                      <th>Thursday</th>
                      <th>Friday</th>
                      <th>Saturday</th>
                    </tr>
                  </thead>
                  <tbody>{renderCalendarRows()}</tbody>
                </table>
              </div>
            </div>
            <div className="col-md-3 legend-wrapper">
              {/* {CalenderDetails?.[1]?.some(
                (item) =>
                  item?.LeaveDescription?.trim() !== "" &&
                  item?.IsApproved !== 1
              ) && (
                <div>
                  {ReportingManager === 1 && (
                    <button
                      className="btn btn-sm mb-2"
                      style={{
                        background: "#0eb342",
                        color: "white",
                        border: "none",
                      }}
                      onClick={handleLeaveRequest_Approve}
                    >
                      Approve All
                    </button>
                  )}
                </div>
              )} */}

              <div className="legend">
                <p>
                  <span className="pending-approval"></span> Pending Approval
                </p>
                <p>
                  <span className="approved-leave"></span> Approved Leave
                </p>
                <p>
                  <span className="gazetted-holiday"></span> Gazetted/Restricted
                  Holiday
                </p>
                <p>
                  <span className="optional-leave"></span> Optional Leave
                </p>
                <p>
                  <span className="missing-attendance"></span> Missing
                  Attendance
                </p>
                <p>
                  <span className="working-day"></span> Working Day
                </p>
              </div>
              <div>
                <span style={{ color: "red" }}>
                  <strong>Note</strong>: Pending SL will carry forward in the
                  next financial year
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LeaveRequest;
