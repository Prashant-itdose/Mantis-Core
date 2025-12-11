import React, { useRef, useState } from "react";
import Heading from "../components/UI/Heading";
import { useTranslation } from "react-i18next";
import { axiosInstances } from "../networkServices/axiosInstance";
import { apiUrls } from "../networkServices/apiEndpoints";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import ReactSelect from "../components/formComponent/ReactSelect";
import Input from "../components/formComponent/Input";
import DatePicker from "../components/formComponent/DatePicker";

const PurchaseInvoiceManagement = () => {
  const [t] = useTranslation();
  const fileInputRef = useRef(null);
  const [dragActive, setDragActive] = useState(false);
  const { VITE_DATE_FORMAT } = import.meta.env;
  const [formData, setFormData] = useState({
    FromDate: "",
    ToDate: "",
    Employee: "",
    DocumentType: "",
    SelectFile: "",
    Document_Base64: "",
    FileExtension: "",
    SupplierType: "",
    InvoiceNo: "",
    FromDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
    ToDate: new Date(),
    DueDate: new Date(),
    Amount: "",
    Tax: "",
    Total: "",
  });
  const [rowHandler, setRowHandler] = useState({
    ButtonShow: false,
    TextEditorShow: false,
  });
  const searchHandleChange = (e) => {
    const { name, value } = e?.target;
    setFormData({ ...formData, [name]: value });
  };
  const [suppliertype, setSupplierType] = useState([
    { value: "Local", label: "Local" },
    { value: "International", label: "International" },
  ]);

  const handleFileChange = (e) => {
    const file = e?.target?.files?.[0];
    processFile(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    const file = e.dataTransfer.files?.[0];
    processFile(file);
  };

  const processFile = (file) => {
    if (file) {
      if (file.size > 1 * 1024 * 1024) {
        toast.error("File size exceeds 1MB limit");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result.split(",")[1];
        const fileExtension = file.name.split(".").pop();

        setFormData((prev) => ({
          ...prev,
          SelectFile: file,
          Document_Base64: base64String,
          FileExtension: fileExtension,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = () => {
    setDragActive(false);
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
      [name]: type === "checkbox" ? (checked ? 1 : 0) : value,
    });
  };
  const handleDeliveryButton3 = () => {
    setRowHandler({
      ...rowHandler,
      ButtonShow: !rowHandler?.ButtonShow,
    });
  };

  return (
    <>
      <div className="card ">
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
        <div className="row p-2">
          <ReactSelect
            name="SupplierType"
            respclass="col-xl-2 col-md-4 col-sm-6 col-12"
            placeholderName="Supplier Type"
            dynamicOptions={suppliertype}
            value={formData?.SupplierType}
            handleChange={handleDeliveryChange}
          />
          <Input
            type="text"
            className="form-control"
            id="InvoiceNo"
            name="InvoiceNo"
            lable="Invoice No."
            placeholder=" "
            onChange={handleSelectChange}
            value={formData?.InvoiceNo}
            respclass="col-xl-2 col-md-4 col-sm-4 col-12"
          />
          <DatePicker
            className="custom-calendar"
            id="FromDate"
            name="FromDate"
            lable="From Date"
            placeholder={VITE_DATE_FORMAT}
            value={formData?.FromDate}
            respclass="col-xl-2 col-md-4 col-sm-6 col-12"
            handleChange={searchHandleChange}
          />

          <DatePicker
            className="custom-calendar"
            id="ToDate"
            name="ToDate"
            lable="To Date"
            placeholder={VITE_DATE_FORMAT}
            value={formData?.ToDate}
            respclass="col-xl-2 col-md-4 col-sm-6 col-12"
            handleChange={searchHandleChange}
          />
          <DatePicker
            className="custom-calendar"
            id="DueDate"
            name="DueDate"
            lable="Due Date"
            placeholder={VITE_DATE_FORMAT}
            value={formData?.DueDate}
            respclass="col-xl-2 col-md-4 col-sm-6 col-12"
            handleChange={searchHandleChange}
          />
          <Input
            type="number"
            className="form-control"
            id="Amount"
            name="Amount"
            lable="Amount"
            placeholder=" "
            onChange={handleSelectChange}
            value={formData?.Amount}
            respclass="col-xl-2 col-md-4 col-sm-4 col-12"
          />
          <Input
            type="number"
            className="form-control"
            id="Tax"
            name="Tax"
            lable="Tax"
            placeholder=" "
            onChange={handleSelectChange}
            value={formData?.Tax}
            respclass="col-xl-2 col-md-4 col-sm-4 col-12 mt-2"
          />
          <Input
            type="number"
            className="form-control"
            id="Total"
            name="Total"
            lable="Total"
            placeholder=" "
            onChange={handleSelectChange}
            value={formData?.Total}
            respclass="col-xl-2 col-md-4 col-sm-4 col-12 mt-2"
          />
          <div className=" ml-3 mr-2 mt-2" style={{ display: "flex" }}>
            <div style={{ width: "100%", marginRight: "3px" }}>
              <button
                className="btn btn-sm btn-success"
                onClick={handleDeliveryButton3}
                title="Click to Upload File."
              >
                {t("Select File")}
              </button>
            </div>
          </div>

          {rowHandler?.ButtonShow && (
            <div
              className={`col-sm-3 dropzone ${dragActive ? "drag-active" : ""}`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              style={{
                border: "2px dashed #ccc",
                borderRadius: "8px",
                padding: "20px",
                textAlign: "center",
                cursor: "pointer",
                backgroundColor: dragActive ? "#e6f7ff" : "#fff",
              }}
            >
              <p>Drag & Drop your file here or click below to select</p>
              <input
                type="file"
                id="SelectFile"
                name="SelectFile"
                accept=".png,.jpg,.jpeg"
                ref={fileInputRef}
                onChange={handleFileChange}
                style={{ display: "none" }}
              />
              <button
                type="button"
                className="btn btn-sm btn-outline-secondary"
                style={{ color: "white" }}
                onClick={() => fileInputRef.current?.click()}
              >
                Browse File
              </button>
              {formData?.SelectFile?.name && (
                <p
                  style={{
                    marginTop: "10px",
                    fontSize: "14px",
                    color: "black",
                  }}
                >
                  Selected: <strong>{formData?.SelectFile?.name}</strong>
                </p>
              )}
            </div>
          )}
          <button
            className="btn btn-sm btn-primary ml-2 mt-2"
            // onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
    </>
  );
};
export default PurchaseInvoiceManagement;
