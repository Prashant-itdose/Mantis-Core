import React, { useRef, useState } from "react";
import Input from "../../formComponent/Input";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { axiosInstances } from "../../../networkServices/axiosInstance";
import { apiUrls } from "../../../networkServices/apiEndpoints";

const PoSalesModal = ({ visible, setVisible, handleSearch }) => {
  // console.log("visible data in po sales modal", visible?.showData?.PoNo);
  const [loading, setLoading] = useState(false);
  const [t] = useTranslation();
  const fileInputRef = useRef(null);
  const [dragActive, setDragActive] = useState(false);
  const [formData, setFormData] = useState({
    PiNumber: visible?.showData?.PoNo || "",
    DocumentType: "",
    SelectFile: "",
    Document_Base64: "",
    FileExtension: "",
  });

  const handleSelectChange = (e) => {
    const { name, value, checked, type } = e?.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? (checked ? "1" : "0") : value,
    });
  };

  const [rowHandler, setRowHandler] = useState({
    ButtonShow: false,
  });

  const handleDeliveryButton3 = () => {
    setRowHandler({
      ...rowHandler,
      ButtonShow: !rowHandler?.ButtonShow,
    });
  };

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
    if (!formData?.PiNumber) {
      toast.error("Please Enter PO Number.");
      return;
    }

    if (!formData?.SelectFile) {
      toast.error("Please Select File.");
      return;
    }
    setLoading(true);

    axiosInstances
      .post(apiUrls.POAttachementUpload, {
        PiId: String(visible?.showData?.ID || ""),
        PoId: String(formData?.PiNumber || visible?.showData?.PoNo),
        Image_Base64: formData?.Document_Base64,
        FileFormat_Base64: formData?.FileExtension,
      })
      .then((res) => {
        if (res?.data?.success === true) {
          toast.success(res?.data?.message);
          setLoading(false);
          setFormData({
            ...formData,
            PiNumber: "",
            DocumentType: "",
            SelectFile: "",
            Document_Base64: "",
            FileExtension: "",
          });
          handleSearch();
          setVisible({ ...visible, showData: {}, poVisible: false });
        } else {
          toast.error(res?.data?.message);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <div className="card">
        <div className="row m-2">
          {visible?.showData?.PoNo !== "" ? (
            <Input
              type="text"
              className="form-control required-fields "
              id="PiNumber"
              name="PiNumber"
              lable={t("PO No.")}
              onChange={handleSelectChange}
              value={visible?.showData?.PoNo}
              respclass="col-xl-4 col-md-3 col-sm-4 col-12"
              disabled
            />
          ) : (
            <Input
              type="number"
              className="form-control required-fields "
              id="PiNumber"
              name="PiNumber"
              lable={t("PO No.")}
              onChange={handleSelectChange}
              value={formData?.PiNumber}
              respclass="col-xl-4 col-md-3 col-sm-4 col-12"
            />
          )}
          {/* <div className=" ml-3 mr-2" style={{ display: "flex" }}>
            <div style={{ width: "100%", marginRight: "3px" }}>
              <button
                className="btn btn-sm btn-success"
                onClick={handleDeliveryButton3}
                title="Click to Upload File."
              >
                {t("Select File")}
              </button>
            </div>
          </div> */}

          {/* {rowHandler?.ButtonShow && ( */}
          <div
            className={`col-sm-4 dropzone ${dragActive ? "drag-active" : ""}`}
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
          <button className="btn btn-sm btn-success ml-4" onClick={handleSave}>
            Save
          </button>
          {/* )} */}
        </div>
      </div>
    </>
  );
};
export default PoSalesModal;
