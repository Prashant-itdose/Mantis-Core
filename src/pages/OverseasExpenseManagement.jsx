import React, { useEffect, useState } from "react";
import Heading from "../components/UI/Heading";
import * as XLSX from "xlsx";
import { useTranslation } from "react-i18next";
import BrowseExcelButton from "../components/formComponent/BrowseExcelButton";
import ReactSelect from "../components/formComponent/ReactSelect";
import { axiosInstances } from "../networkServices/axiosInstance";
import { apiUrls } from "../networkServices/apiEndpoints";
import BrowseInvoiceButton from "../components/formComponent/BrowseInvoiceButton";
import { toast } from "react-toastify";

const OverseasExpenseManagement = () => {
  const [t] = useTranslation();
  const [assignto, setAssignedto] = useState([]);
  const [formData, setFormData] = useState({
    FromDate: "",
    ToDate: "",
    Employee: "",

    DocumentType: "",
    SelectFile: "",
    Document_Base64: "",
    FileExtension: "",
  });

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
  const [tableData, setTableData] = useState([]);
  const getReportNote = (event) => {
    const file = event?.target?.files[0]; // Get the uploaded file
    const reader = new FileReader();
    // console.log("reader", reader);

    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });

      // Assuming the first sheet is the one you want
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];

      // Convert the sheet to JSON
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      const isValidMobile = (mobile) => /^[0-9]{10}$/.test(mobile);
      const mappedData = transformData(jsonData).map((ele, index) => {
        return {
          "S.No.": index + 1,
          Month: ele?.Month,
          Period: ele?.Period,
          EmployeeName: ele?.EmployeeName,
          EmployeeCode: ele?.EmployeeCode,
          InvoiceNo: ele?.InvoiceNo,
          Description: ele?.Description,
          LocalCurrencySymbol: ele?.LocalCurrencySymbol,

          DrLocalCurrencyPayment: ele?.DrLocalCurrencyPayment,
          DrLocalConversionRate: ele?.DrLocalConversionRate,
          DrLocalConvertedDollar: ele?.DrLocalConvertedDollar,
          DrLocalConversionRateINR: ele?.DrLocalConversionRateINR,
          DrLocalConvertedINR: ele?.DrLocalConvertedINR,

          CrLocalCurrencyPayment: ele?.CrLocalCurrencyPayment,
          CrLocalConversionRate: ele?.CrLocalConversionRate,
          CrLocalConvertedDollar: ele?.CrLocalConvertedDollar,
          CrLocalConversionRateINR: ele?.CrLocalConversionRateINR,
          CrLocalConvertedINR: ele?.CrLocalConvertedINR,

          ClosingBalanceInDollar: ele?.ClosingBalanceInDollar,
          ClosingBalanceInINR: ele?.ClosingBalanceInINR,
        };
      });
      setTableData(mappedData);
      event.target.value = null;
    };
    reader.readAsArrayBuffer(file);
  };
  const getAssignTo = () => {
    axiosInstances
      .post(apiUrls.AssignTo_Select, {
        ProjectID: 0,
      })
      .then((res) => {
        const assigntos = res?.data?.data?.map((item) => {
          return { label: item?.Name, value: item?.ID };
        });
        setAssignedto(assigntos);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleDeliveryChange = (name, e) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleImageChange = (e) => {
    const file = e?.target?.files[0];
    if (file) {
      const maxSize = 5 * 1024 * 1024;
      if (file.size > maxSize) {
        alert("File size exceeds 5MB. Please choose a smaller file.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader?.result.split(",")[1];
        const fileExtension = file?.name.split(".").pop();
        setFormData({
          ...formData,
          SelectFile: file,
          Document_Base64: base64String,
          FileExtension: fileExtension,
        });
      };
      reader.readAsDataURL(file);
    }
  };
  const handleSave = () => {
    axiosInstances
      .post(apiUrls.AssignTo_Select, {
        FileExtension: String(formData?.FileExtension || ""),
        Document_Base64: String(formData?.Document_Base64 || ""),
        XLSXData: tableData,
      })
      .then((res) => {
        if (res.data.success === true) {
          toast.success(res.data.message);
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getAssignTo();
  }, []);
  return (
    <>
      <div className="card">
        <Heading isBreadcrumb={true} />
        <div className="row m-2">
          {/* <ReactSelect
            respclass="col-xl-2 col-md-4 col-sm-6 col-12"
            name="Employee"
            placeholderName={t("Employee")}
            dynamicOptions={assignto}
            handleChange={handleDeliveryChange}
            value={formData.Employee}
          /> */}
          <div className="ml-2">
            <BrowseExcelButton
              handleImageChange={getReportNote}
              accept="xls/*"
            />
          </div>
          <div className="ml-4">
            <BrowseInvoiceButton handleImageChange={handleImageChange} />
          </div>
          <button
            className="btn btn-sm btn-primary ml-4 mt-0"
            onClick={handleSave}
          >
            <i className="fa fa-upload mr-1" aria-hidden="true"></i> Upload
          </button>
        </div>
      </div>
    </>
  );
};
export default OverseasExpenseManagement;
