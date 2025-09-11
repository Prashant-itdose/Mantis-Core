import React, { useState } from "react";
import Input from "../../formComponent/Input";
import { toast } from "react-toastify";
import axios from "axios";
import { apiUrls } from "../../../networkServices/apiEndpoints";
import { headers } from "../../../utils/apitools";
import { useCryptoLocalStorage } from "../../../utils/hooks/useCryptoLocalStorage";

const AmountPIModal = (visible) => {
  const [formData, setFormData] = useState({
    TaxInvoiceNo: "",
    DocumentType: "",
    SelectFile: "",
    Document_Base64: "",
    FileExtension: "",
  });
  const handleUploadDocs = () => {
    if(formData?.TaxInvoiceNo ==""){
      toast.error("Please Enter Tax Invoice No.")
    }else{
      let form = new FormData();
      form.append("ID", useCryptoLocalStorage("user_Data", "get", "ID")),
        form.append("LoginName", useCryptoLocalStorage("user_Data", "get", "realname")),
        form.append("TaxInvoiceID", visible ?.visible?.showData?.EncryptID),
        form.append("TaxInvoiceNo", visible ?.visible?.showData?.TaxInvoiceNo),
        form.append("Document_Base64", formData?.Document_Base64),
        form.append("Document_FormatType", formData?.FileExtension),
        axios
          .post(apiUrls?.TaxInvoice_Upload, form, { headers })
          .then((res) => {
           toast.success(res?.data?.message)
          })
          .catch((err) => {
            console.log(err);
          });
    }
   
  };
  const searchHandleChange = (e, index) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };
  const handleFileChange = (e) => {
    const file = e?.target?.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader?.result.split(",")[1];
        const fileExtension = file?.name.split(".").pop();
        // console.log("chchc",file?.name ,fileExtension)
        setFormData({
          ...formData,
          SelectFile: file,
          Document_Base64: base64String,
          FileExtension: fileExtension,
        });
      };
      reader.readAsDataURL(file); // Convert file to base64
    }
  };
  return (
    <>
      <div className="card p-2">
        <span style={{ fontWeight: "bold" }}>Project Name:- {visible ?.visible?.showData?.ProjectName}</span>
      </div>
      <div className="card">
        <div className="row m-2">
          <Input
            type="text"
            className="form-control"
            id="TaxInvoiceNo"
            name="TaxInvoiceNo"
            lable="Tax Invoice No."
            placeholder=" "
            onChange={searchHandleChange}
            value={formData?.TaxInvoiceNo}
            respclass="col-xl-4 col-md-4 col-sm-6 col-12"
          />
          <Input
            type="file"
            id="SelectFile"
            name="SelectFile"
            respclass="col-md-4 col-12 col-sm-12"
            style={{ width: "100%", marginLeft: "5px" }}
            onChange={handleFileChange}
          />

          <button className="btn btn-sm btn-primary ml-5" onClick={handleUploadDocs}>Save</button>
        </div>
      </div>
    </>
  );
};
export default AmountPIModal;
