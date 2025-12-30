import React, { useEffect, useState } from "react";
import Heading from "../components/UI/Heading";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { axiosInstances } from "../networkServices/axiosInstance";
import { apiUrls } from "../networkServices/apiEndpoints";
import ReactSelect from "../components/formComponent/ReactSelect";
import MultiSelectComp from "../components/formComponent/MultiSelectComp";
import Input from "../components/formComponent/Input";
import Loading from "../components/loader/Loading";
import { EmployeeManagerTHEAD } from "../components/modalComponent/Utils/HealperThead";
import Tables from "../components/UI/customTable";

const ManagerSearchEmployee = () => {
  const [selected, setSelected] = React.useState("no");
  const navigate = useNavigate();
  const [tableData, setTableData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [vertical, setVertical] = useState([]);
  const [team, setTeam] = useState([]);
  const [reporter, setReporter] = useState([]);
  const [wing, setWing] = useState([]);
  const [designation, setDesignation] = useState([]);
  const [officedesignation, setOfficeDesignation] = useState([]);
  const [formData, setFormData] = useState({
    Designation: [],
    OfficeDesignation: [],
    VerticalID: [],
    TeamID: [],
    WingID: [],
    ReportingTo: [],
    OfficeDesignation: [],
  });
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 20;
  const totalPages = Math.ceil(tableData?.length / rowsPerPage);
  const currentData = tableData?.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );
  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const getOfficeDesignation = () => {
    axiosInstances
      .post(apiUrls.Connector_Select, {
        ProjectID: 0,
        SearchType: "ProfileDesignation",
        IssueNo: "",
      })
      .then((res) => {
        const reporters = res?.data.data.map((item) => {
          return { label: item?.PaymentMode, value: item?.PaymentMode };
        });
        setOfficeDesignation(reporters);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getReporter = () => {
    axiosInstances
      .post(apiUrls.GetReportingTo_Employee, {})

      .then((res) => {
        const reporters = res?.data.data.map((item) => {
          return { name: item?.NAME, code: item?.Employee_ID };
        });
        setReporter(reporters);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [loading, setLoading] = useState(false);
  const handleRadioChange = (value) => {
    setSelected(value);
    if (value === "yes") {
      navigate("/SearchEmployeeMaster");
    } else if (value === "no") {
      navigate("/ManagerSearchEmployee");
    }
  };
  const handleSearch = () => {
    setLoading(true);
    axiosInstances
      .post(apiUrls?.SearchAllEmployees, {
        EmployeeName: String(""),
        DesignationID: String(""),
        EmployeeEmail: String(""),
        EmployeeMobileNo: String(""),
        TeamID: String(formData?.TeamID || ""),
        ManagerName: String(""),
        CompanyRoleName: String(""),
        DefaultVerticalID: String(formData?.VerticalID || ""),
        DefaultWingID: String(formData?.WingID || ""),
        ProfileDesignationID: String(formData?.OfficeDesignation || ""),
      })
      .then((res) => {
        if (res?.data?.success === true) {
          setTableData(res?.data?.data);
          setFilteredData(res?.data?.data);
          setLoading(false);
        } else {
          toast.error(res.data.message);
          setLoading(false);
          setTableData([]);
          setFilteredData([]);
        }
      })
      .catch((err) => {
        toast.error(
          err?.response?.data?.message
            ? err?.response?.data?.message
            : "Error Occured"
        );
      });
  };
  const normalizeString = (str) => str.toLowerCase().replace(/\s+/g, "").trim();
  const handleMultiSelectChange = (name, selectedOptions) => {
    const selectedValues = selectedOptions.map((option) => option.code);
    setFormData((prev) => ({
      ...prev,
      [`${name}`]: selectedValues,
    }));
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
      .post(apiUrls?.Old_Mantis_Team_Select, {})
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
  const getDesignation = () => {
    axiosInstances
      .post(apiUrls?.ViewDesignation, {})
      .then((res) => {
        const reporters = res?.data.data.map((item) => {
          return { name: item?.DesignationName, code: item?.ID };
        });
        setDesignation(reporters);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleSearchTable = (event) => {
    const rawQuery = event.target.value;
    const query = normalizeString(rawQuery);
    setSearchQuery(rawQuery);
    if (query === "") {
      setTableData(filteredData);
      setCurrentPage(1);
      return;
    }
    const filtered = filteredData?.filter((item) =>
      Object.keys(item).some(
        (key) => item[key] && normalizeString(String(item[key])).includes(query)
      )
    );
    if (filtered.length === 0) {
      setSearchQuery("");
      setTableData(filteredData);
    } else {
      setTableData(filtered);
    }
    setCurrentPage(1);
  };
  useEffect(() => {
    getTeam();
    getDesignation();
    getVertical();
    getOfficeDesignation();
    getWing();
    getReporter();
  }, []);
  return (
    <>
      <div className="card">
        <Heading
          isBreadcrumb={true}
          secondTitle={
            <>
              <div
                className="d-flex"
                style={{ justifyContent: "space-between" }}
              >
                <label>
                  <input
                    className="ml-1"
                    type="radio"
                    name="option"
                    value="yes"
                    checked={selected === "yes"}
                    onChange={() => handleRadioChange("yes")}
                    style={{ cursor: "pointer" }}
                  />
                  <span className="mb-2 ml-1">Search Employee Master</span>
                </label>

                <label className="ml-4">
                  <input
                    className="ml-1"
                    type="radio"
                    name="option"
                    value="no"
                    checked={selected === "no"}
                    style={{ cursor: "pointer" }}
                    onChange={() => handleRadioChange("no")}
                  />
                  <span className="mb-2 ml-1">Search Manager Employee</span>
                </label>
              </div>
            </>
          }
        />
        <div className="row m-2">
          <MultiSelectComp
            respclass="col-xl-2 col-md-4 col-sm-6 col-12"
            name="VerticalID"
            placeholderName="Vertical"
            dynamicOptions={vertical}
            optionLabel="VerticalID"
            className="VerticalID"
            handleChange={handleMultiSelectChange}
            value={formData.VerticalID.map((code) => ({
              code,
              name: vertical.find((item) => item.code === code)?.name,
            }))}
          />

          <MultiSelectComp
            respclass="col-xl-2 col-md-4 col-sm-6 col-12"
            name="TeamID"
            placeholderName="Team"
            dynamicOptions={team}
            handleChange={handleMultiSelectChange}
            value={formData.TeamID.map((code) => ({
              code,
              name: team.find((item) => item.code === code)?.name,
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
          <MultiSelectComp
            name="ReportingTo"
            respclass="col-xl-2 col-md-4 col-sm-6 col-12"
            placeholderName="Reporting Manager"
            dynamicOptions={reporter}
            handleChange={handleMultiSelectChange}
            value={formData.ReportingTo?.map((code) => ({
              code,
              name: reporter?.find((item) => item.code === code)?.name,
            }))}
          />
          <MultiSelectComp
            name="OfficeDesignation"
            respclass="col-xl-2 col-md-4 col-sm-6 col-12"
            defaultValue={formData?.OfficeDesignation}
            placeholderName="Designation"
            dynamicOptions={designation}
            value={formData.OfficeDesignation.map((code) => ({
              code,
              name: designation.find((item) => item.code === code)?.name,
            }))}
            handleChange={handleMultiSelectChange}
          />
          <MultiSelectComp
            name="OfficeDesignation"
            respclass="col-xl-2 col-md-4 col-sm-6 col-12"
            defaultValue={formData?.OfficeDesignation}
            placeholderName="Office Designation"
            dynamicOptions={officedesignation}
            value={formData.OfficeDesignation.map((code) => ({
              code,
              name: designation.find((item) => item.code === code)?.name,
            }))}
            handleChange={handleMultiSelectChange}
          />

          {loading ? (
            <Loading />
          ) : (
            <button className="btn btn-sm btn-info ml-3" onClick={handleSearch}>
              Search
            </button>
          )}
        </div>
      </div>

      {tableData?.length > 0 && (
        <div className="card mt-1">
          <Heading
            title={<span className="font-weight-bold">Search Details</span>}
            secondTitle={
              <div className="d-flex">
                <div style={{ padding: "0px !important", marginLeft: "10px" }}>
                  <Input
                    type="text"
                    className="form-control"
                    id="Title"
                    name="Title"
                    lable="Search"
                    placeholder=" "
                    onChange={handleSearchTable}
                    value={searchQuery}
                    respclass="col-xl-12 col-md-4 col-sm-6 col-12"
                  />
                </div>
                <span style={{ fontWeight: "bold" }}>
                  Total Record :&nbsp;{tableData?.length}
                </span>
              </div>
            }
          />

          <Tables
            thead={EmployeeManagerTHEAD}
            tbody={currentData?.map((ele, index) => ({
              "S.No.": (currentPage - 1) * rowsPerPage + index + 1,
              Vertical: ele?.DefaultVerticalName,
              Team: ele?.TeamName,
              Wing: ele?.DefaultWingName,
              "Employee Name": ele?.EmployeeName,
              "Office Designation": ele?.Designation,
              "Profile Designation": ele?.ProfileDesignationName,
              "Reporting Manager": ele?.ManagerName,
              "Experience (Years)": ele?.TotalExperienceYears,
            }))}
            tableHeight={"tableHeight"}
          />
          <div
            className="pagination"
            style={{ marginLeft: "auto", marginBottom: "9px" }}
          >
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
      )}
    </>
  );
};

export default ManagerSearchEmployee;
