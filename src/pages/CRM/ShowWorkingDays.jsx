import React, { useEffect, useState } from "react";
import MultiSelectComp from "../../components/formComponent/MultiSelectComp";
import { headers } from "../../utils/apitools";
import axios from "axios";
import { apiUrls } from "../../networkServices/apiEndpoints";
import Heading from "../../components/UI/Heading";
import DatePickerMonth from "../../components/formComponent/DatePickerMonth";
import Input from "../../components/formComponent/Input";
import Tables from "../../components/UI/customTable";
import { showWorkingDaysTHEAD } from "../../components/modalComponent/Utils/HealperThead";
import Loading from "../../components/loader/Loading";
import { useCryptoLocalStorage } from "../../utils/hooks/useCryptoLocalStorage";
import ReactSelect from "../../components/formComponent/ReactSelect";
import { toast } from "react-toastify";
const currentDate = new Date();
const currentMonth = currentDate.getMonth() + 1; // Months are 0-indexed, so add 1
const currentYear = currentDate.getFullYear();
const ShowWorkingDays = () => {
  const [tableData, setTableData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [team, setTeam] = useState([]);
  const [subteam, setSubTeam] = useState([]);
  const [loading, setLoading] = useState(false);
  const [employee, setEmployee] = useState([]);
  const [formData, setFormData] = useState({
    EmployeeName: [],
    TeamID: "",
    SubTeamID: "",
    Year: "",
    currentMonth: currentMonth,
    currentYear: currentYear,
    Month: new Date(),
  });
  const handleMultiSelectChange = (name, selectedOptions) => {
    const selectedValues = selectedOptions.map((option) => option.code);
    setFormData((prev) => ({
      ...prev,
      [`${name}`]: selectedValues,
    }));
  };
  const getReporter = () => {
    let form = new FormData();
    form.append(
      "CrmEmployeeID",
      useCryptoLocalStorage("user_Data", "get", "CrmEmployeeID")
    );
    form.append("RoleID", useCryptoLocalStorage("user_Data", "get", "RoleID"));
    axios
      .post(apiUrls?.EmployeeEmail, form, { headers })
      .then((res) => {
        const assigntos = res?.data?.data?.map((item) => {
          return { name: item?.EmployeeName, code: item?.Employee_ID };
        });
        setEmployee(assigntos);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getTeam = () => {
    let form = new FormData();
    form.append("ID", useCryptoLocalStorage("user_Data", "get", "ID")),
      axios
        .post(apiUrls?.Old_Mantis_Team_Select, form, { headers })
        .then((res) => {
          const teams = res?.data.data.map((item) => {
            return { label: item?.Team, value: item?.TeamID };
          });
          setTeam(teams);
        })
        .catch((err) => {
          console.log(err);
        });
  };

  const getSubTeam = (item) => {
    let form = new FormData();
    form.append("ID", useCryptoLocalStorage("user_Data", "get", "ID")),
      form.append("TeamName", item?.label),
      axios
        .post(apiUrls?.Old_Mantis_Sub_Team_Select, form, { headers })
        .then((res) => {
          const teams = res?.data?.data?.map((item) => {
            return { label: item?.SubTeam, value: item?.ID };
          });
          setSubTeam(teams);
        })
        .catch((err) => {
          console.log(err);
        });
  };
  const handleDeliveryChange = (name, e) => {
    const { value } = e;
    if (name == "TeamID") {
      setFormData({
        ...formData,
        [name]: value,
      });
      getSubTeam(e);
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };
  const handleMonthYearChange = (name, e) => {
    const { value } = e.target;
    const date = new Date(value);
    setFormData({
      ...formData,
      currentMonth: date.getMonth() + 1,
      currentYear: date.getFullYear(),
    });
  };
  function getlabel(id, dropdownData) {
    const ele = dropdownData.filter((item) => item.value === id);
    return ele.length > 0 ? ele[0].label : "";
  }
  const handleTableSearch = () => {
    setLoading(true);
    let form = new FormData();
    form.append("Id", useCryptoLocalStorage("user_Data", "get", "ID"));
    form.append(
      "LoginName",
      useCryptoLocalStorage("user_Data", "get", "realname")
    );
    form.append("Month", formData?.currentMonth);
    form.append("Year", formData?.currentYear);
    form.append("EmployeeID", formData?.EmployeeName);
    form.append("Team", getlabel(formData?.TeamID, team));
    form.append("SubTeam", formData?.SubTeamID || "0");
    form.append("ReportType", "");
    axios
      .post(apiUrls?.MonthWiseAttendanceReoprt, form, { headers })
      .then((res) => {
        if (res?.data?.status === true) {
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
  const handleExport = () => {
    if (!formData?.TeamID) {
      toast.error("Please Select Team");
      return;
    }

    let form = new FormData();
    form.append("ID", useCryptoLocalStorage("user_Data", "get", "ID"));
    form.append(
      "LoginName",
      useCryptoLocalStorage("user_Data", "get", "realname")
    );
    form.append("Month", formData?.currentMonth);
    form.append("Year", formData?.currentYear);
    form.append("EmployeeID", formData?.EmployeeName);
    form.append("Team", getlabel(formData?.TeamID, team));
    form.append("SubTeam", formData?.SubTeamID);
    form.append("ReportType", "Export");

    axios
      .post(apiUrls?.MonthWiseAttendanceReoprt, form, { headers })
      .then((res) => {
        const htmlTable = res?.data;

        // Get 3-letter month name
        const monthIndex = parseInt(formData?.currentMonth, 10) - 1;
        const shortMonth = [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ][monthIndex];

        // const fileName = `MyLeaveReport_${formData?.currentMonth}_${shortMonth}_${formData?.currentYear}.xls`;
        const fileName = `MyLeaveReport_${shortMonth}_${formData?.currentYear}.xls`;
        const blob = new Blob([htmlTable], {
          type: "application/vnd.ms-excel",
        });

        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      })
      .catch((err) => {
        console.log("Export error:", err);
        toast.error("Export failed. Try again.");
      });
  };

  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 15;
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

  const totalEntries = filteredData.length;
  const startEntry = (currentPage - 1) * rowsPerPage + 1;
  const endEntry = Math.min(currentPage * rowsPerPage, totalEntries);
  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    if (query === "") {
      // If the search query is empty, reset the filtered data to the original table data
      setFilteredData([...tableData]);
    } else {
      const filtered = filteredData.filter((item) =>
        item.Name.toLowerCase().includes(query)
      );
      setFilteredData(filtered);
      setCurrentPage(1); // Reset to the first page after search
    }
  };

  useEffect(() => {
    getTeam();
    getReporter();
  }, []);
  return (
    <>
      <div className="card">
        <Heading isBreadcrumb={true} />
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

          <ReactSelect
            respclass="col-xl-2 col-md-4 col-sm-6 col-12"
            name="TeamID"
            placeholderName="Team"
            dynamicOptions={team}
            handleChange={handleDeliveryChange}
            value={formData?.TeamID}
          />
          <ReactSelect
            respclass="col-xl-2 col-md-4 col-sm-6 col-12"
            name="SubTeamID"
            placeholderName="Sub Team"
            dynamicOptions={subteam}
            handleChange={handleDeliveryChange}
            value={formData?.SubTeamID}
          />

          <MultiSelectComp
            respclass="col-xl-2 col-md-4 col-sm-6 col-12"
            name="EmployeeName"
            placeholderName="Employee"
            dynamicOptions={employee}
            optionLabel="EmployeeName"
            className="form-control"
            handleChange={handleMultiSelectChange}
            value={formData.EmployeeName?.map((code) => ({
              code,
              name: employee.find((item) => item.code === code)?.name,
            }))}
          />
          <div className="col-2 d-flex">
            {loading ? (
              <Loading />
            ) : (
              <button
                className="btn btn-sm btn-info"
                onClick={handleTableSearch}
              >
                Search
              </button>
            )}
            {loading ? (
              <Loading />
            ) : (
              <button
                className="btn btn-sm btn-info ml-2"
                onClick={handleExport}
              >
                Export
              </button>
            )}
          </div>
        </div>
      </div>
      {loading ? (
        <Loading />
      ) : (
        <>
          {tableData?.length > 0 && (
            <div className="card">
              <Heading
                title="Search Details"
                secondTitle={
                  <div className="d-flex">
                    <div className="">
                      Showing {startEntry} to {endEntry} of {totalEntries}{" "}
                      entries
                    </div>
                    <div
                      style={{ padding: "0px !important", marginLeft: "50px" }}
                    >
                      <Input
                        type="text"
                        className="form-control"
                        id="Name"
                        name="Name"
                        placeholder="Search By Name"
                        onChange={handleSearch}
                        value={searchQuery}
                        respclass="col-xl-12 col-md-4 col-sm-6 col-12"
                      />
                    </div>
                  </div>
                }
              />

              <Tables
                thead={showWorkingDaysTHEAD}
                tbody={currentData?.map((ele, index) => ({
                  "S.No.": (currentPage - 1) * rowsPerPage + index + 1,
                  Name: ele?.Name,
                  Designation: ele?.Designation,
                  Team: ele?.TeamName,
                  "Total Days:": ele?.TotalDays,
                  Sundays: ele?.Sundays,
                  CL: ele?.CL,
                  SL: ele?.SL,
                  WeekOff: ele?.WO,
                  CompOff: ele?.COMPOff,
                  "CL-CIR": ele?.CLCIR,
                  "SL-CIR": ele?.SLCIR,
                  LWP: ele?.LWP,
                  "Working Days": ele?.WorkingDays,
                  "Non Working Days": ele?.NonWorkingDays,
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
      )}
    </>
  );
};

export default ShowWorkingDays;
