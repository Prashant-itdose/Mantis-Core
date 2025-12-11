import React, { useState } from "react";
import { toast } from "react-toastify";
import { axiosInstances } from "../networkServices/axiosInstance";
import { apiUrls } from "../networkServices/apiEndpoints";
import BrowseInput from "../components/formComponent/BrowseInput";

const OverseasExpenseModal = ({ visible, setVisible, handleViewSearch }) => {
  //   console.log("view issue", visible);
  const [formData, setFormData] = useState({
    DocumentType: "",
    SelectFile: "",
    Document_Base64: "",
    FileExtension: "",
  });

  const handleImageChange = (e) => {
    const file = e?.target?.files[0];
    if (file) {
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

  const handleUploadDocs = () => {
    axiosInstances
      .post(apiUrls.OverseasInvoiceInsert, {
        Expense_No: String(visible?.showData?.Expense_No),
        Document_Base64: String(formData?.Document_Base64),
        FileExtension: String(formData?.FileExtension),
      })
      .then((res) => {
        if (res?.data?.success === true) {
          toast.success(res?.data?.message);
          setVisible(false);
          handleViewSearch();
        } else {
          toast.error(res?.data?.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleView = () => {
    window.open(visible?.showData?.Invoice_File_Url, "_blank");
  };
  return (
    <>
      <div className="card p-2">
        <span style={{ fontWeight: "bold" }}>
          Employee Name:- {visible?.showData?.Employee_Name}&nbsp; &nbsp;
          Invoice No.:- {visible?.showData?.Invoice_No}&nbsp; &nbsp; Expense
          No.:- {visible?.showData?.Expense_No}
        </span>
      </div>
      <div className="card p-2">
        <span style={{ fontWeight: "bold" }}>
          <i
            className="fa fa-eye"
            onClick={handleView}
            style={{ cursor: "pointer" }}
          ></i>{" "}
          <span className="ml-3">View Previous Invoice</span>
        </span>
      </div>
      <div className="card">
        <div className="row m-2">
          <div style={{ marginLeft: "5px", marginTop: "0px" }}>
            <BrowseInput handleImageChange={handleImageChange} />
          </div>

          <button
            className="btn btn-sm btn-primary ml-5"
            onClick={handleUploadDocs}
          >
            Upload
          </button>
        </div>
      </div>
    </>
  );
};
export default OverseasExpenseModal;
