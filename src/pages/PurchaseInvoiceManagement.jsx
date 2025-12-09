import React, { useState } from "react";
import Heading from "../components/UI/Heading";
import { useTranslation } from "react-i18next";
import { axiosInstances } from "../networkServices/axiosInstance";
import { apiUrls } from "../networkServices/apiEndpoints";
import BrowseInvoiceButton from "../components/formComponent/BrowseInvoiceButton";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const PurchaseInvoiceManagement = () => {
  const [t] = useTranslation();
  const [tableData, setTableData] = useState([]);
  const [formData, setFormData] = useState({
    FromDate: "",
    ToDate: "",
    Employee: "",
    DocumentType: "",
    SelectFile: "",
    Document_Base64: "",
    FileExtension: "",
  });

  const handleImageChange = (e) => {
    const file = e?.target?.files[0];
    if (file) {
      const maxSize = 1 * 1024 * 1024;
      if (file.size > maxSize) {
        alert("File size exceeds 1MB. Please choose a smaller file.");
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
    const payload = {
      FileExtension: String(formData?.FileExtension || ""),
      Document_Base64: String(formData?.Document_Base64 || ""),
    };
    axiosInstances
      .post(apiUrls.AssignTo_Select, payload)
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

  return (
    <>
      <div className="card">
        <Heading
          isBreadcrumb={true}
          secondTitle={
            <div style={{ fontWeight: "bold" }}>
              <Link to="/PurchaseInvoiceManagementSearch" className="ml-3">
                Back to List
              </Link>
            </div>
          }
        />
        <div className="row m-2">
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
export default PurchaseInvoiceManagement;
