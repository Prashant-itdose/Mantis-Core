import React, { useState } from "react";
import Heading from "../components/UI/Heading";
import { useTranslation } from "react-i18next";
import { axiosInstances } from "../networkServices/axiosInstance";
import { apiUrls } from "../networkServices/apiEndpoints";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import ExcelPreviewHandler from "./ExcelImport/ExcelPreviewHandler";
import Loading from "../components/loader/Loading";
import * as XLSX from "xlsx";
import BrowseInvoiceButton from "../components/formComponent/BrowseInvoiceButton";
const MAX_FILE_SIZE = 1 * 1024 * 1024;
const OverseasExpenseManagement = () => {
  const [t] = useTranslation();
  const [excelData, setExcelData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    FromDate: "",
    ToDate: "",
    Employee: "",
    SelectFile: "",
    SelectFileInvoice: "",
    Document_Base64: "",
    FileExtension: "",
    InvoiceSheet: "",
    InvoiceFileExtension: "",
  });

  // const base64OverseasData = excelData;
  // const jsonString = JSON.stringify(base64OverseasData);
  // console.log("jsonstring", excelData);
  // const base64DataModern = btoa(
  //   String.fromCharCode.apply(
  //     null,
  //     new Uint8Array(new TextEncoder().encode(jsonString))
  //   )
  // );

  const worksheet = XLSX.utils.aoa_to_sheet(excelData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Expenses");
  const base64DataModern = XLSX.write(workbook, {
    type: "base64",
    bookType: "xlsx",
  });

  const handleSave = () => {
    const payload = {
      FileExtension: String("xlsx"),
      Document_Base64: String(base64DataModern),
      OverseasExcelData: excelData,
      InvoiceSheet: String(formData.InvoiceSheet ?? ""),
      InvoiceFileExtension: String(formData.InvoiceFileExtension ?? ""),
    };
    setLoading(true);
    axiosInstances
      .post(apiUrls.OverseasExcelInsert, payload)
      .then((res) => {
        if (res.data.success === true) {
          toast.success(res.data.message);
          setLoading(false);
          setFormData({
            ...formData,
            FromDate: "",
            ToDate: "",
            Employee: "",
            SelectFile: "",
            SelectFileInvoice: "",
            Document_Base64: "",
            FileExtension: "",
            InvoiceSheet: "",
            InvoiceFileExtension: "",
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

  const handleImageChange1 = (e) => {
    const file = e.target.files[0];
    convertFileToBase64(
      file,
      "SelectFileInvoice",
      "InvoiceSheet",
      "InvoiceFileExtension"
    );
  };

  const handleCancel = () => {
    window.location.reload();
  };
  const convertFileToBase64 = (file, fileKey, base64Key, extensionKey) => {
    if (!file) return;

    if (file.size > MAX_FILE_SIZE) {
      alert("File size exceeds 5MB. Please choose a smaller file.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const base64String = reader.result.split(",")[1];
      const fileExtension = file.name.split(".").pop();

      setFormData((prev) => ({
        ...prev,
        [fileKey]: file,
        [base64Key]: base64String,
        [extensionKey]: fileExtension,
      }));
    };

    reader.readAsDataURL(file);
  };
  return (
    <>
      <div className="card">
        <Heading
          isBreadcrumb={true}
          secondTitle={
            <div style={{ fontWeight: "bold" }}>
              <Link to="/OverseasExpenseManagementSearch" className="ml-3">
                Back to List
              </Link>
            </div>
          }
        />

        <div className="row m-2">
          <div className="ml-2">
            <ExcelPreviewHandler setCallBackState={setExcelData} />
          </div>

          {excelData.length > 0 && (
            <i
              className="fa fa-retweet ml-3 mt-2"
              aria-hidden="true"
              onClick={handleCancel}
              title="Click to remove select Excel Sheet"
              style={{ cursor: "pointer" }}
            ></i>
          )}

          <div className="ml-4">
            <BrowseInvoiceButton handleImageChange={handleImageChange1} />
          </div>

          {loading ? (
            <Loading />
          ) : (
            <button
              className="btn btn-sm btn-primary ml-4 mt-0"
              onClick={handleSave}
            >
              {/* <i className="fa fa-upload mr-1"></i> */}
              Save
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default OverseasExpenseManagement;
