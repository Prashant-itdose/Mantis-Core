import React, { useEffect, useRef, useState } from "react";
import Heading from "../components/UI/Heading";
import { useTranslation } from "react-i18next";
import Modal from "../components/modalComponent/Modal";
import UploadFile from "../utils/UploadFile";
import Loading from "../components/loader/Loading";
import { toast } from "react-toastify";
import { apiUrls } from "../networkServices/apiEndpoints";
import axios from "axios";
import { headers } from "../utils/apitools";
import { useCryptoLocalStorage } from "../utils/hooks/useCryptoLocalStorage";
import "./MorningWish.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Input from "../components/formComponent/Input";
import ReactSelect from "../components/formComponent/ReactSelect";
import DatePicker from "../components/formComponent/DatePicker";
import TextEditor from "../components/formComponent/TextEditor";
import moment from "moment/moment";
import { axiosInstances } from "../networkServices/axiosInstance";
const FestivalWish = () => {
  const fileInputRef = useRef(null);
  const { VITE_DATE_FORMAT } = import.meta.env;
  const [t] = useTranslation();
  const location = useLocation();
  const { state } = location;
  const [editMode, setEditMode] = useState(state?.edit);
  const navigate = useNavigate();
  const [dragActive, setDragActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    SelectDate: "",
    Description: "",
    DocumentType: "",
    SelectFile: "",
    Document_Base64: "",
    FileExtension: "",
    WishID: "",
    FestivalName: "",
    FestivalDate: "",
    LeaveType: "",
  });
  const IsEmployee = useCryptoLocalStorage("user_Data", "get", "realname");
  const CRMID = useCryptoLocalStorage("user_Data", "get", "CrmEmployeeID");
  const ReportingManager = useCryptoLocalStorage(
    "user_Data",
    "get",
    "IsReportingManager"
  );

  const handleDeliveryChange = (name, e) => {
    const { value } = e;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const [rowHandler, setRowHandler] = useState({
    ButtonShow: false,
    TextEditorShow: false,
  });

  const handleDeliveryButton2 = () => {
    setRowHandler({
      ...rowHandler,
      TextEditorShow: !rowHandler?.TextEditorShow,
    });
  };
  const handleDeliveryButton3 = () => {
    setRowHandler({
      ...rowHandler,
      ButtonShow: !rowHandler?.ButtonShow,
    });
  };

  const handleChange1 = (value) => {
    setFormData((prevData) => ({
      ...prevData,
      Description: value,
    }));
  };

  const [visible, setVisible] = useState({
    showVisible: false,
    showData: {},
  });

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

  function removeHtmlTags(text) {
    return text?.replace(/<[^>]*>?/gm, "");
  }
  const handleSave = () => {
    if (formData?.FestivalName == "") {
      toast.error("Please Enter Festival Name.");
      return;
    }
    if (formData?.LeaveType == "") {
      toast.error("Please Select LeaveType.");
      return;
    }

    if (formData?.FestivalDate == "") {
      toast.error("Please Select FestivalDate.");
      return;
    }

    // if (formData?.Description?.trim() == "") {
    //   toast.error("Please Enter Description.");
    //   return;
    // }

    setLoading(true);

    axiosInstances
      .post(apiUrls.FestivalWishSave, {
        Day: formData?.SelectDate,
        FestivalName: formData?.FestivalName,
        FestivalDate: formData?.FestivalDate,
        LeaveType: formData?.LeaveType,
        Content: formData.Description
          ? removeHtmlTags(formData.Description)
          : "",
        Image_Base64: formData?.Document_Base64,
        FileFormat_Base64: formData?.FileExtension,
      })
      .then((res) => {
        if (res?.data?.success === true) {
          toast.success(res?.data?.message);
          setLoading(false);
          setFormData({
            ...formData,
            SelectDate: "",
            Description: "",
            DocumentType: "",
            SelectFile: "",
            Document_Base64: "",
            FileExtension: "",
            WishID: "",
            FestivalName: "",
            FestivalDate: "",
            LeaveType: "",
          });
          setRowHandler({});
          // navigate("/FestivalWishSearch");
        } else {
          toast.error(res?.data?.message);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleUpdate = () => {
    if (formData?.SelectDate == "") {
      toast.error("Please Select Day.");
      return;
    }

    if (formData?.SelectFile == "") {
      toast.error("Please Select File.");
      return;
    }

    // if (formData?.Description?.trim() == "") {
    //   toast.error("Please Enter Description.");
    //   return;
    // }
    setLoading(true);

    axiosInstances
      .post(apiUrls.FestivalWishUpdate, {
        Day: formData?.SelectDate,
        FestivalName: formData?.FestivalName,
        WishID: formData?.WishID,
        FestivalDate: formData?.FestivalDate,
        LeaveType: formData?.LeaveType,
        Content: formData.Description
          ? removeHtmlTags(formData.Description)
          : "",
        Image_Base64: formData?.Document_Base64,
        FileFormat_Base64: formData?.FileExtension,
      })
      .then((res) => {
        if (res?.data?.success === true) {
          toast.success(res?.data?.message);
          setLoading(false);
          setFormData({
            ...formData,
            SelectDate: "",
            Description: "",
            DocumentType: "",
            SelectFile: "",
            Document_Base64: "",
            FileExtension: "",
            WishID: "",
            FestivalName: "",
            FestivalDate: "",
            LeaveType: "",
          });
          setRowHandler({});
          // navigate("/FestivalWishSearch");
        } else {
          toast.error(res?.data?.message);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const EditMorningWish = (id) => {
    axiosInstances
      .post(apiUrls.EditFestivalWish, {
        WishID: id,
      })
      .then((res) => {
        const datas = res?.data?.data[0];

        setFormData({
          ...formData,
          SelectDate: datas?.Day,
          Description: datas?.Content,
          DocumentType: "",
          SelectFile: "",
          Document_Base64: "",
          FileExtension: "",
          WishID: datas?.ID,
          FestivalName: datas?.FestivalName,
          FestivalDate: new Date(datas?.FestivalDate),
          LeaveType: datas?.LeaveType,
        });
        setEditMode(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const searchHandleChange = (e) => {
    const { name, value, checked, type } = e?.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? (checked ? "1" : "0") : value,
    });
  };

  useEffect(() => {
    if (state?.edit) {
      EditMorningWish(state?.data);
    }
  }, []);
  const [selected, setSelected] = React.useState("no");

  const handleRadioChange = (value) => {
    setSelected(value);
    if (value === "yes") {
      navigate("/MorningWish");
    } else if (value === "no") {
      navigate("/FestivalWish");
    }
  };
  return (
    <>
      <Modal
        modalWidth={"500px"}
        visible={visible?.showVisible}
        setVisible={setVisible}
        Header="Upload Document"
        tableData={visible}
      >
        <UploadFile
          visible={visible?.showVisible}
          setVisible={setVisible}
          tableData={visible}
        />
      </Modal>
      <div className="card">
        <Heading
          title={<span style={{ fontWeight: "bold" }}>Festival Wish</span>}
          isBreadcrumb={true}
          secondTitle={
            <div className="d-flex" style={{ justifyContent: "space-between" }}>
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
                <span className="mb-2 ml-1">Morning Wish</span>
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
                <span className="mb-2 ml-1">Festival Wish</span>
              </label>
            </div>
          }
        />
        <div className="row p-2">
          <Input
            type="text"
            className="form-control"
            id="FestivalName"
            name="FestivalName"
            lable="Festival Name"
            onChange={searchHandleChange}
            value={formData?.FestivalName}
            respclass="col-xl-2 col-md-4 col-12 col-sm-12"
          />

          <ReactSelect
            name="LeaveType"
            respclass="col-xl-2 col-md-4 col-sm-6 col-12"
            placeholderName="Leave Type"
            dynamicOptions={[
              { label: "GZ", value: "GZ" },
              { label: "RT", value: "RT" },
              { label: "OL", value: "OL" },
              { label: "OTHER", value: "OTHER" },
            ]}
            value={formData?.LeaveType}
            handleChange={handleDeliveryChange}
          />
          <DatePicker
            className="custom-calendar"
            id="FestivalDate"
            name="FestivalDate"
            lable={t("Festival Date")}
            placeholder={VITE_DATE_FORMAT}
            value={formData?.FestivalDate}
            respclass="col-xl-2 col-md-4 col-sm-6 col-12"
            handleChange={searchHandleChange}
          />
          <div className=" ml-3 mr-2" style={{ display: "flex" }}>
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

          {(rowHandler?.ButtonShow || editMode) && (
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

          <div className=" ml-3" style={{ display: "flex" }}>
            <div style={{ width: "40%", marginRight: "3px" }}>
              <button
                className="btn btn-sm btn-success"
                onClick={handleDeliveryButton2}
                title="Click to Write Content."
              >
                {t("Content")}
              </button>
            </div>
          </div>

          {(rowHandler?.TextEditorShow || editMode) && (
            <div className="col-12 mt-2">
              <TextEditor
                value={formData?.Description}
                onChange={handleChange1}
              />
            </div>
          )}

          {loading ? (
            <Loading />
          ) : (
            <div className="col-2">
              {state?.edit ? (
                <button
                  className="btn btn-sm btn-info ml-2"
                  onClick={handleUpdate}
                >
                  Update
                </button>
              ) : (
                <button
                  className="btn btn-sm btn-info ml-2"
                  onClick={handleSave}
                >
                  Save
                </button>
              )}
            </div>
          )}
          <div
            style={{ fontWeight: "bold" }}
            className="col d-flex justify-content-end"
          >
            <Link to="/FestivalWishSearch">Festival Wish Search</Link>
          </div>
        </div>
      </div>
    </>
  );
};
export default FestivalWish;
