import React, { useEffect, useState } from "react";
import Input from "../../components/formComponent/Input";
import MultiSelectComp from "../../components/formComponent/MultiSelectComp";
import { apiUrls } from "../../networkServices/apiEndpoints";
import axios from "axios";
import { headers } from "../../utils/apitools";
import ReactSelect from "../../components/formComponent/ReactSelect";
import { inputBoxValidation } from "../../utils/utils";
import { MOBILE_NUMBER_VALIDATION_REGX } from "../../utils/constant";
import Tables from "../../components/UI/customTable";
import { showEmployeeTHEAD } from "../../components/modalComponent/Utils/HealperThead";
import Heading from "../../components/UI/Heading";
import { useCryptoLocalStorage } from "../../utils/hooks/useCryptoLocalStorage";
const ShowEmployee = () => {
  const [vertical, setVertical] = useState([]);
  const [team, setTeam] = useState([]);
  const [wing, setWing] = useState([]);
  const [designation, setDesignation] = useState([]);
  const [formData, setFormData] = useState({
    EmployeeName: "",
    VerticalID: [],
    TeamID: [],
    WingID: [],
    Designation: [],
    ReportingPerson: "",
    Mobile: "",
    Status: "",
    MaximumWeekoffs: "",
    Name: "",
  });
  const tabledata1 = [
    {
      SNo: 1,
      MonthYear: "Sep-2024",
      Team: "LIS",
      Vertical: "LIS Support",
      Wing: "LIS Support",
      Name: "PRASHANT SINGHAL",
      NoOfDays: 0,
      Dates: "",
      Action: "View",
    },
    {
      SNo: 2,
      MonthYear: "Sep-2024",
      Team: "Machine Team",
      Vertical: "LIS Support",
      Wing: "LIS Support",
      Name: "PANKAJ PATHAK",
      NoOfDays: 4,
      Dates: "07,14,21,28",
      Action: "View",
    },
    {
      SNo: 3,
      MonthYear: "Sep-2024",
      Team: "LIS",
      Vertical: "LIS Support",
      Wing: "LIS Support",
      Name: "Aman Srivastav",
      NoOfDays: 6,
      Dates: "05,06,07,14,21,28",
      Action: "View",
    },
    {
      SNo: 4,
      MonthYear: "Sep-2024",
      Team: "LIS",
      Vertical: "LIS Support",
      Wing: "LIS Support",
      Name: "Sneh Jaiswal",
      NoOfDays: 2,
      Dates: "07,21",
      Action: "View",
    },
    {
      SNo: 5,
      MonthYear: "Sep-2024",
      Team: "Machine Team",
      Vertical: "LIS Support",
      Wing: "LIS Support",
      Name: "RAHUL NAGAR",
      NoOfDays: 3,
      Dates: "14,04,07",
      Action: "View",
    },
    {
      SNo: 6,
      MonthYear: "Sep-2024",
      Team: "LIS",
      Vertical: "LIS Support",
      Wing: "LIS Support",
      Name: "Mukesh Kumar",
      NoOfDays: 1,
      Dates: "07",
      Action: "View",
    },
    {
      SNo: 6,
      MonthYear: "Sep-2024",
      Team: "LIS",
      Vertical: "LIS Support",
      Wing: "LIS Support",
      Name: "Mukesh Kumar",
      NoOfDays: 1,
      Dates: "07",
      Action: "View",
    },
    {
      SNo: 6,
      MonthYear: "Sep-2024",
      Team: "LIS",
      Vertical: "LIS Support",
      Wing: "LIS Support",
      Name: "Mukesh Kumar",
      NoOfDays: 1,
      Dates: "07",
      Action: "View",
    },
    {
      SNo: 6,
      MonthYear: "Sep-2024",
      Team: "LIS",
      Vertical: "LIS Support",
      Wing: "LIS Support",
      Name: "Mukesh Kumar",
      NoOfDays: 1,
      Dates: "07",
      Action: "View",
    },
    {
      SNo: 6,
      MonthYear: "Sep-2024",
      Team: "LIS",
      Vertical: "LIS Support",
      Wing: "LIS Support",
      Name: "Mukesh Kumar",
      NoOfDays: 1,
      Dates: "07",
      Action: "View",
    },
    {
      SNo: 6,
      MonthYear: "Sep-2024",
      Team: "LIS",
      Vertical: "LIS Support",
      Wing: "LIS Support",
      Name: "Mukesh Kumar",
      NoOfDays: 1,
      Dates: "07",
      Action: "View",
    },
    {
      SNo: 6,
      MonthYear: "Sep-2024",
      Team: "LIS",
      Vertical: "LIS Support",
      Wing: "LIS Support",
      Name: "Mukesh Kumar",
      NoOfDays: 1,
      Dates: "07",
      Action: "View",
    },
    {
      SNo: 6,
      MonthYear: "Sep-2024",
      Team: "LIS",
      Vertical: "LIS Support",
      Wing: "LIS Support",
      Name: "Mukesh Kumar",
      NoOfDays: 1,
      Dates: "07",
      Action: "View",
    },
    {
      SNo: 6,
      MonthYear: "Sep-2024",
      Team: "LIS",
      Vertical: "LIS Support",
      Wing: "LIS Support",
      Name: "Mukesh Kumar",
      NoOfDays: 1,
      Dates: "07",
      Action: "View",
    },
    {
      SNo: 6,
      MonthYear: "Sep-2024",
      Team: "LIS",
      Vertical: "LIS Support",
      Wing: "LIS Support",
      Name: "Mukesh Kumar",
      NoOfDays: 1,
      Dates: "07",
      Action: "View",
    },
    {
      SNo: 6,
      MonthYear: "Sep-2024",
      Team: "LIS",
      Vertical: "LIS Support",
      Wing: "LIS Support",
      Name: "Mukesh Kumar",
      NoOfDays: 1,
      Dates: "07",
      Action: "View",
    },
    {
      SNo: 6,
      MonthYear: "Sep-2024",
      Team: "LIS",
      Vertical: "LIS Support",
      Wing: "LIS Support",
      Name: "Mukesh Kumar",
      NoOfDays: 1,
      Dates: "07",
      Action: "View",
    },
    {
      SNo: 6,
      MonthYear: "Sep-2024",
      Team: "LIS",
      Vertical: "LIS Support",
      Wing: "LIS Support",
      Name: "Mukesh Kumar",
      NoOfDays: 1,
      Dates: "07",
      Action: "View",
    },
    {
      SNo: 6,
      MonthYear: "Sep-2024",
      Team: "LIS",
      Vertical: "LIS Support",
      Wing: "LIS Support",
      Name: "Mukesh Kumar",
      NoOfDays: 1,
      Dates: "07",
      Action: "View",
    },
    {
      SNo: 6,
      MonthYear: "Sep-2024",
      Team: "LIS",
      Vertical: "LIS Support",
      Wing: "LIS Support",
      Name: "Mukesh Kumar",
      NoOfDays: 1,
      Dates: "07",
      Action: "View",
    },
    {
      SNo: 6,
      MonthYear: "Sep-2024",
      Team: "LIS",
      Vertical: "LIS Support",
      Wing: "LIS Support",
      Name: "Mukesh Kumar",
      NoOfDays: 1,
      Dates: "07",
      Action: "View",
    },
    {
      SNo: 6,
      MonthYear: "Sep-2024",
      Team: "LIS",
      Vertical: "LIS Support",
      Wing: "LIS Support",
      Name: "Mukesh Kumar",
      NoOfDays: 1,
      Dates: "07",
      Action: "View",
    },
    {
      SNo: 6,
      MonthYear: "Sep-2024",
      Team: "LIS",
      Vertical: "LIS Support",
      Wing: "LIS Support",
      Name: "Mukesh Kumar",
      NoOfDays: 1,
      Dates: "07",
      Action: "View",
    },
    {
      SNo: 6,
      MonthYear: "Sep-2024",
      Team: "LIS",
      Vertical: "LIS Support",
      Wing: "LIS Support",
      Name: "Mukesh Kumar",
      NoOfDays: 1,
      Dates: "07",
      Action: "View",
    },
    {
      SNo: 6,
      MonthYear: "Sep-2024",
      Team: "LIS",
      Vertical: "LIS Support",
      Wing: "LIS Support",
      Name: "Mukesh Kumar",
      NoOfDays: 1,
      Dates: "07",
      Action: "View",
    },
    {
      SNo: 6,
      MonthYear: "Sep-2024",
      Team: "LIS",
      Vertical: "LIS Support",
      Wing: "LIS Support",
      Name: "Mukesh Kumar",
      NoOfDays: 1,
      Dates: "07",
      Action: "View",
    },
    {
      SNo: 6,
      MonthYear: "Sep-2024",
      Team: "LIS",
      Vertical: "LIS Support",
      Wing: "LIS Support",
      Name: "Mukesh Kumar",
      NoOfDays: 1,
      Dates: "07",
      Action: "View",
    },
    {
      SNo: 6,
      MonthYear: "Sep-2024",
      Team: "LIS",
      Vertical: "LIS Support",
      Wing: "LIS Support",
      Name: "Mukesh Kumar",
      NoOfDays: 1,
      Dates: "07",
      Action: "View",
    },
    {
      SNo: 6,
      MonthYear: "Sep-2024",
      Team: "LIS",
      Vertical: "LIS Support",
      Wing: "LIS Support",
      Name: "Mukesh Kumar",
      NoOfDays: 1,
      Dates: "07",
      Action: "View",
    },
    {
      SNo: 6,
      MonthYear: "Sep-2024",
      Team: "LIS",
      Vertical: "LIS Support",
      Wing: "LIS Support",
      Name: "Mukesh Kumar",
      NoOfDays: 1,
      Dates: "07",
      Action: "View",
    },
    {
      SNo: 6,
      MonthYear: "Sep-2024",
      Team: "LIS",
      Vertical: "LIS Support",
      Wing: "LIS Support",
      Name: "Mukesh Kumar",
      NoOfDays: 1,
      Dates: "07",
      Action: "View",
    },
    {
      SNo: 6,
      MonthYear: "Sep-2024",
      Team: "LIS",
      Vertical: "LIS Support",
      Wing: "LIS Support",
      Name: "Mukesh Kumar",
      NoOfDays: 1,
      Dates: "07",
      Action: "View",
    },
    {
      SNo: 6,
      MonthYear: "Sep-2024",
      Team: "LIS",
      Vertical: "LIS Support",
      Wing: "LIS Support",
      Name: "Mukesh Kumar",
      NoOfDays: 1,
      Dates: "07",
      Action: "View",
    },
    {
      SNo: 6,
      MonthYear: "Sep-2024",
      Team: "LIS",
      Vertical: "LIS Support",
      Wing: "LIS Support",
      Name: "Mukesh Kumar",
      NoOfDays: 1,
      Dates: "07",
      Action: "View",
    },
    {
      SNo: 6,
      MonthYear: "Sep-2024",
      Team: "LIS",
      Vertical: "LIS Support",
      Wing: "LIS Support",
      Name: "Mukesh Kumar",
      NoOfDays: 1,
      Dates: "07",
      Action: "View",
    },
    {
      SNo: 6,
      MonthYear: "Sep-2024",
      Team: "LIS",
      Vertical: "LIS Support",
      Wing: "LIS Support",
      Name: "Mukesh Kumar",
      NoOfDays: 1,
      Dates: "07",
      Action: "View",
    },
    {
      SNo: 6,
      MonthYear: "Sep-2024",
      Team: "LIS",
      Vertical: "LIS Support",
      Wing: "LIS Support",
      Name: "Mukesh Kumar",
      NoOfDays: 1,
      Dates: "07",
      Action: "View",
    },
    {
      SNo: 6,
      MonthYear: "Sep-2024",
      Team: "LIS",
      Vertical: "LIS Support",
      Wing: "LIS Support",
      Name: "Mukesh Kumar",
      NoOfDays: 1,
      Dates: "07",
      Action: "View",
    },
    {
      SNo: 6,
      MonthYear: "Sep-2024",
      Team: "LIS",
      Vertical: "LIS Support",
      Wing: "LIS Support",
      Name: "Mukesh Kumar",
      NoOfDays: 1,
      Dates: "07",
      Action: "View",
    },
    {
      SNo: 6,
      MonthYear: "Sep-2024",
      Team: "LIS",
      Vertical: "LIS Support",
      Wing: "LIS Support",
      Name: "Mukesh Kumar",
      NoOfDays: 1,
      Dates: "07",
      Action: "View",
    },
    {
      SNo: 6,
      MonthYear: "Sep-2024",
      Team: "LIS",
      Vertical: "LIS Support",
      Wing: "LIS Support",
      Name: "Mukesh Kumar",
      NoOfDays: 1,
      Dates: "07",
      Action: "View",
    },
    {
      SNo: 6,
      MonthYear: "Sep-2024",
      Team: "LIS",
      Vertical: "LIS Support",
      Wing: "LIS Support",
      Name: "Mukesh Kumar",
      NoOfDays: 1,
      Dates: "07",
      Action: "View",
    },
    {
      SNo: 6,
      MonthYear: "Sep-2024",
      Team: "LIS",
      Vertical: "LIS Support",
      Wing: "LIS Support",
      Name: "Mukesh Kumar",
      NoOfDays: 1,
      Dates: "07",
      Action: "View",
    },
    {
      SNo: 6,
      MonthYear: "Sep-2024",
      Team: "LIS",
      Vertical: "LIS Support",
      Wing: "LIS Support",
      Name: "Mukesh Kumar",
      NoOfDays: 1,
      Dates: "07",
      Action: "View",
    },
    {
      SNo: 6,
      MonthYear: "Sep-2024",
      Team: "LIS",
      Vertical: "LIS Support",
      Wing: "LIS Support",
      Name: "Mukesh Kumar",
      NoOfDays: 1,
      Dates: "07",
      Action: "View",
    },
    {
      SNo: 6,
      MonthYear: "Sep-2024",
      Team: "LIS",
      Vertical: "LIS Support",
      Wing: "LIS Support",
      Name: "Mukesh Kumar",
      NoOfDays: 1,
      Dates: "07",
      Action: "View",
    },
    {
      SNo: 6,
      MonthYear: "Sep-2024",
      Team: "LIS",
      Vertical: "LIS Support",
      Wing: "LIS Support",
      Name: "Mukesh Kumar",
      NoOfDays: 1,
      Dates: "07",
      Action: "View",
    },
    {
      SNo: 6,
      MonthYear: "Sep-2024",
      Team: "LIS",
      Vertical: "LIS Support",
      Wing: "LIS Support",
      Name: "Mukesh Kumar",
      NoOfDays: 1,
      Dates: "07",
      Action: "View",
    },
  ];
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const [filteredData, setFilteredData] = useState([...tabledata1]); // Filtered data

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    if (query === "") {
      // If the search query is empty, reset the filtered data to the original table data
      setFilteredData([...tabledata1]);
    } else {
      const filtered = filteredData.filter((item) =>
        item.Name.toLowerCase().includes(query)
      );
      setFilteredData(filtered);
      setCurrentPage(1); // Reset to the first page after search
    }
  };

  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;
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
  const handleDeliveryChange = (name, e) => {
    const { value } = e;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSelectChange = (e) => {
    const { name, value, checked, type } = e?.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? (checked ? "1" : "0") : value,
    });
  };
  const handleMultiSelectChange = (name, selectedOptions) => {
    const selectedValues = selectedOptions.map((option) => option.code);
    setFormData((prev) => ({
      ...prev,
      [`${name}`]: selectedValues,
    }));
  };
  const getDesignation = () => {
    let form = new FormData();
    form.append("ID", useCryptoLocalStorage("user_Data", "get", "ID")),
      form.append("LoginName", useCryptoLocalStorage("user_Data", "get", "realname") ),
      axios
        .post(apiUrls?.ViewDesignation, form, { headers })
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
  const getVertical = () => {
    let form = new FormData();
    form.append("Id", useCryptoLocalStorage("user_Data", "get", "ID")),
      axios
        .post(apiUrls?.Vertical_Select, form, { headers })
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
    let form = new FormData();
    form.append("ID", useCryptoLocalStorage("user_Data", "get", "ID")),
      axios
        .post(apiUrls?.Team_Select, form, { headers })
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
    let form = new FormData();
    form.append("ID", useCryptoLocalStorage("user_Data", "get", "ID")),
      axios
        .post(apiUrls?.Wing_Select, form, { headers })
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

  useEffect(() => {
    getVertical();
    getTeam();
    getWing();
    getDesignation();
  }, []);
  return (
    <>
      <div className="card">
        <Heading title={"Employee/Show Employee"}/>
        <div className="row g-4 m-2">
          <Input
            type="text"
            className="form-control"
            id="EmployeeName"
            name="EmployeeName"
            lable="Employee Name"
            placeholder=""
            onChange={handleSelectChange}
            value={formData?.EmployeeName}
            respclass="col-xl-2 col-md-4 col-sm-4 col-12"
          />
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
            name="Designation"
            respclass="col-xl-2 col-md-4 col-sm-6 col-12"
            defaultValue={formData?.Designation}
            placeholderName="Designation"
            dynamicOptions={designation}
            value={formData.Designation.map((code) => ({
              code,
              name: designation.find((item) => item.code === code)?.name,
            }))}
            handleChange={handleMultiSelectChange}
          />
          <Input
            type="text"
            className="form-control"
            id="ReportingPerson"
            name="ReportingPerson"
            lable="ReportingPerson"
            placeholder=""
            onChange={handleSelectChange}
            value={formData?.ReportingPerson}
            respclass="col-xl-2 col-md-4 col-sm-4 col-12"
          />
          <Input
            type="number"
            className="form-control"
            id="Mobile"
            name="Mobile"
            lable="Mobile"
            placeholder=" "
            onChange={(e) => {
              inputBoxValidation(
                MOBILE_NUMBER_VALIDATION_REGX,
                e,
                handleSelectChange
              );
            }}
            value={formData?.Mobile}
            respclass="col-xl-2 col-md-4 col-sm-4 col-12"
          />
          <ReactSelect
            respclass="col-xl-2 col-md-4 col-sm-6 col-12"
            name="Status"
            placeholderName="Status"
            dynamicOptions={[
              { label: "All", value: "All" },
              { label: "Active", value: "Active" },
              { label: "DeActive", value: "DeActive" },
            ]}
            handleChange={handleDeliveryChange}
            value={formData.Status}
          />
          <ReactSelect
            name="MaximumWeekoffs"
            respclass="col-xl-2 col-md-4 col-sm-6 col-12"
            placeholderName="Maximum Weekoffs"
            dynamicOptions={[
              {
                label: "None",
                value: "None",
              },
              {
                label: "Alternate Saturdays",
                value: "AlternateSaturdays",
              },
              {
                label: "All Saturdays",
                value: "AllSaturdays",
              },
            ]}
            value={formData?.MaximumWeekoffs}
            handleChange={handleDeliveryChange}
          />
          <div className="col-2">
            <button className="btn btn-m btn-success">Search</button>
          </div>
        </div>
      </div>
      <div className="card">
        <Heading
          title="Search Details"
          secondTitle={
            <div className="d-flex">
              <div className="">
                Showing {startEntry} to {endEntry} of {totalEntries} entries
              </div>
              <div style={{ padding: "0px !important", marginLeft: "50px" }}>
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
          thead={showEmployeeTHEAD}
          tbody={currentData?.map((ele, index) => ({
            "S.No.": (currentPage - 1) * rowsPerPage + index + 1,
            Name: ele?.Name,
            Team: ele?.Team,
            "Report To": ele?.ReportTo,
            "Email Id": ele?.emailid,
            "Mobile No": ele?.Mobile,
            Weekoffs: ele?.Weekoffs,
            "Available Leaves": ele?.AvailableLeaves,
            Status:
              ele?.Status == "0" ? (
                <button className="btn btn-xs btn-success">Active</button>
              ) : (
                <button className="btn btn-xs btn-success">DeActive</button>
              ),
            Inventory: <i className="fa fa-paperclip"></i>,
            View: <i className="fa fa-eye" title="View Leave Request"></i>,
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
    </>
  );
};
export default ShowEmployee;
