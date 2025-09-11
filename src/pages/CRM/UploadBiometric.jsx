import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Heading from "../../components/UI/Heading";
import Input from "../../components/formComponent/Input";
import ReactSelect from "../../components/formComponent/ReactSelect";
import axios from "axios";
import { headers } from "../../utils/apitools";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { EmployeeAttendanceTable } from "./BiometricTable";

import * as XLSX from "xlsx";
import Loading from "../../components/loader/Loading";
import BrowseButton from "../../components/formComponent/BrowseButton";
import Tables from "../../components/UI/customTable";
import TableSelect from "../../components/formComponent/TableSelect";
import { apiUrls } from "../../networkServices/apiEndpoints";
import { useCryptoLocalStorage } from "../../utils/hooks/useCryptoLocalStorage";

const UploadBiometric = () => {
  const [errors, setErros] = useState({});
  const { VITE_DATE_FORMAT } = import.meta.env;
  const [t] = useTranslation();
  const navigate = useNavigate();
  const [ticketid, setticketid] = useState("");
  const [formData, setFormData] = useState({
    ProjectID: "",
    Category: "",
    AssignedTo: "",
    Priority: "",
    ReportedName: "",
    ReportedMobile: "",
    Description: "",
    Summary: "",
  });
  const [tableData, setTableData] = useState([]);
  const [project, setProject] = useState([]);
  const [category, setCategory] = useState([]);
  const [assignto, setAssignedto] = useState([]);
  const [priority, setPriority] = useState([]);

  const [rowHandler, setRowHandler] = useState({
    SummaryShow: false,
    DateSubmittedShow: false,
    TextEditorShow: false,
  });

  const handleDeliveryChange = (name, e) => {
    const { value } = e;
    console.log(value);
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const transformData = (data) => {
    const headers = data[0]; // First array is the header
    const rows = data.slice(1); // Remaining arrays are the data rows

    return rows.map((row) => {
      let obj = {};
      row.forEach((value, index) => {
        obj[headers[index]] = value;
      });
      return obj;
    });
  };

  const getReportNote = (event) => {
    const file = event.target.files[0]; // Get the uploaded file

    const reader = new FileReader();

    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });

      // Assuming the first sheet is the one you want
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];

      // Convert the sheet to JSON
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      console.log(jsonData);
      const isValidMobile = (mobile) => /^[0-9]{10}$/.test(mobile);
      const mappedData = transformAttendanceData(jsonData);
      console.log(mappedData);
      setTableData(mappedData?.employees);
      event.target.value = null;
    };

    reader.readAsArrayBuffer(file);
  };

  function transformAttendanceData(dataArray) {
    let employees = [];
    let currentEmployee = null;

    dataArray.forEach((row) => {
      if (row.length === 3 && row[1].startsWith("IISPL")) {
        // Start a new employee entry
        if (currentEmployee) {
          // If there is an existing employee being processed, push it to the result
          employees.push(currentEmployee);
        }
        currentEmployee = {
          code: row[1],
          name: row[2],
          attendance: [],
        };
      } else if (row.length === 10 && row[0].includes("/")) {
        // Process attendance record
        currentEmployee.attendance.push({
          date: row[0],
          day: row[1],
          shift: row[2],
          inTime: row[3] || null,
          outTime: row[4] || null,
          shiftLate: row[5] || null,
          shiftEarly: row[6] || null,
          hoursWorked: row[7] || null,
          overTime: row[8] || null,
          status: row[9] || null,
        });
      } else if (row.length === 14 && row[0] === "Present") {
        // Process summary if present
        currentEmployee.summary = {
          presentDays: row[1],
          absentDays: row[3],
          leaveDays: row[5],
          holidays: row[7],
          weeklyOffs: row[9],
          hoursWorked: row[11],
          overTime: row[13],
        };
      }
    });

    // Push the last employee record
    if (currentEmployee) {
      employees.push(currentEmployee);
    }

    return { employees };
  }

  const fetchemptyexcel = () => {
    // Define the columns for your Excel sheet
    const data = [
      [
        "Category",
        "AssignTo",
        "Priority",
        "Summary",
        "ReportedByName",
        "ReportedByMobile",
        "Email",
      ],
    ];

    // Create a worksheet from the data
    const worksheet = XLSX.utils.aoa_to_sheet(data);

    // Create a new workbook and add the worksheet to it
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Template");

    // Convert the workbook to a binary Excel file
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    // Create a Blob from the binary Excel file
    const blob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    // Create a download link and trigger the download
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "Template.xlsx";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {}, []);

  const ValidationForm = (formData) => {
    let err = "";
    if (formData?.ReportedName === "") {
      err = { ...err, ReportedName: "Please Enter ReportedName." };
    }

    if (
      formData?.ReportedMobile?.length >= 0 &&
      formData?.ReportedMobile.length < 10
    ) {
      err = {
        ...err,
        ReportedMobile: "Mobile No. Must be of 10 Digit",
      };
    }
    // if (payload?.Address === "") {
    //   err = { ...err, Address: "This Field is Required" };
    // }
    // if (payload?.AutoReceive === "") {
    //   err = { ...err, AutoReceive: "This Field is Required" };
    // }
    // if (payload?.ContactPersonEmail.trim() === "") {
    //   err = { ...err, ContactPersonEmail: "This Field is Required" };
    // }
    // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // if (!emailRegex.test(payload?.ContactPersonEmail)) {
    //   err = { ...err, Emailvalid: "Enter a valid email address" };
    // }
    return err;
  };
  const handleInputChange = (index, field, selectedOption) => {
    const newData = [...tableData];

    // Update the value and validation status
    newData[index][field].value = selectedOption ? selectedOption.value : null;
    newData[index][field].isValid = selectedOption ? true : false;

    setTableData(newData);
  };
  const handleChange = (index, name, value) => {
    const newData = [...tableData];
    newData[index][name] = value;
    setTableData(newData);
  };

  const handleSave = () => {
    function transformPayload(originalPayload, projectId) {
      return originalPayload.map((item) => ({
        CategoryId: item.Category.value,
        AssignTo: item.AssignTo.value,
        PriorityID: item.Priority.value,
        Summary: item.Summary,
        ReporterName: item.ReportedByName,
        ReporterMobile: String(item.ReportedByMobile),
        Description: "",
      }));
    }
    const valid = validateIssues(tableData);
    if (valid == true) {
      console.log(tableData);
      const form = new FormData();
      form.append("ID", useCryptoLocalStorage("user_Data", "get", "ID"));
      form.append("ProjectID", formData?.ProjectID);
      form.append("TicketData", JSON.stringify(transformPayload(tableData)));

      axios
        .post("/CRMAPI/API/BugReport/BulkNewTicket", form, { headers })
        .then((res) => {
          if (res?.data?.status == true) {
            toast.success(res?.data?.message);
            setTableData([]);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log(valid);
      setTableData(valid);
    }
  };
  const [loading, setLoading] = useState(false);
  const uploadtodatabase = () => {
    setLoading(true);
    let form = new FormData();
    form.append("ID", useCryptoLocalStorage("user_Data", "get", "ID")),
      form.append("LoginName", useCryptoLocalStorage("user_Data", "get", "realname") ),
      form.append("CrmID", useCryptoLocalStorage("user_Data", "get", "CrmEmployeeID")),
      form.append("AttendanceData", JSON.stringify(tableData)),
      console.log(tableData);
    axios
      .post(apiUrls?.UploadAttendanceExcel, form, { headers })
      .then((res) => {
        //   setTableData(res?.data?.data);
        //   setFilteredData(res?.data?.data);
        toast.success(res?.data?.message);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const [visible, setVisible] = useState({
    showVisible: false,
    showData: {},
  });
  const handleDeleteRow = (index) => {
    // Create a new array by filtering out the row at the specified index
    const newData = tableData.filter((_, i) => i !== index);

    // Update the state with the new data
    setTableData(newData);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 1;
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
  function validateIssues(issues) {
    let allValid = true;

    const isValidMobile = (mobile) => /^[0-9]{10}$/.test(mobile);

    const validatedIssues = issues.map((issue) => {
      const isValidCategory =
        issue.Category?.value !== null && issue.Category?.value !== undefined;
      const isValidAssignTo =
        issue.AssignTo?.value !== null && issue.AssignTo?.value !== undefined;
      const isValidPriority =
        issue.Priority?.value !== null && issue.Priority?.value !== undefined;
      const isValidMobileNumber = isValidMobile(issue.ReportedByMobile);
      const isValidreporter = issue?.ReportedByName?.length > 0 ? true : false;

      const isRowValid =
        isValidCategory &&
        isValidAssignTo &&
        isValidPriority &&
        isValidMobileNumber &&
        isValidreporter;

      if (!isRowValid) {
        allValid = false;
      }

      return {
        ...issue,
        Category: { ...issue.Category, isValid: isValidCategory },
        AssignTo: { ...issue.AssignTo, isValid: isValidAssignTo },
        Priority: { ...issue.Priority, isValid: isValidPriority },
        ReportedByMobile: issue.ReportedByMobile,
        ValidMobile: isValidMobileNumber ? true : false,
        ValidReporter: isValidreporter ? true : false,
        ValidSummary: issue?.Summary?.length > 0 ? true : false,
      };
    });

    return allValid ? true : validatedIssues;
  }

  return (
    <>
      <div className="card patient_registration border">
        <Heading title={t("Upload Biometric")} isBreadcrumb={true} />
        <div className="row g-4 m-2">
          <div className=" d-flex col-2">
            <div>
              <BrowseButton handleImageChange={getReportNote} accept="xls/*" />
            </div>
            {loading ? (
              <Loading />
            ) : (
              <button
                className="btn btn-sm btn-success ml-5"
                onClick={uploadtodatabase}
              >
                Save to Database
              </button>
            )}

            {/* <button className="btn btn-sm btn-success ml-2"  onClick={() => {
                          setVisible({ showVisible: true,  });
                        }} >
              Preview
            </button> */}
          </div>
        </div>
      </div>
      <div className="card">
        {currentData.length > 0 && (
          <>
            <Heading title="Attendance Details" />
            <div>
              <EmployeeAttendanceTable employees={currentData} />
            </div>
            <div className="pagination ml-auto mb-1">
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
          </>
        )}
      </div>
    </>
  );
};

export default UploadBiometric;
