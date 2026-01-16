import React, { useEffect, useState } from "react";
import { axiosInstances } from "../../networkServices/axiosInstance";
import { apiUrls } from "../../networkServices/apiEndpoints";
import ReactSelect from "../../components/formComponent/ReactSelect";
import { useTranslation } from "react-i18next";
import Input from "../../components/formComponent/Input";
import Loading from "../../components/loader/Loading";
import { toast } from "react-toastify";
import Tables from "../../components/UI/customTable";
import "./SmartReport.css";
import Heading from "../../components/UI/Heading";

const CentreMasterPage = () => {
  const [t] = useTranslation();
  const [loading, setLoading] = useState(false);
  const fileInputRef = React.useRef(null);
  const [dragActive, setDragActive] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [project, setProject] = useState([]);
  const [formData, setFormData] = useState({
    ProjectID: "",
    FrontPage: "",
    HealthAnalysis: "",
    IsActive: "",
    Letterhead: "",
    Logo_Img: "",
    Country: "",
    State: "",
    City: "",
    Address: "",

    SelectFile: "",
    SelectFileSig: "",

    Document_Base64: "",
    FileExtension: "",

    SigDocument_Base64: "",
    FileExtensionSig: "",
  });

  const [rowHandler, setRowHandler] = useState({
    ButtonShow: false,
    TextEditorShow: false,
  });
  const handleDeliveryButton3 = () => {
    setRowHandler({
      ...rowHandler,
      ButtonShow: !rowHandler?.ButtonShow,
    });
  };
  const handleDeliveryButton4 = () => {
    setRowHandler({
      ...rowHandler,
      TextEditorShow: !rowHandler?.TextEditorShow,
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
      if (file.size > 5 * 1024 * 1024) {
        toast.error("File size exceeds 5MB limit");
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

  const handleSignatureChange = (e) => {
    const file = e?.target?.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result.split(",")[1];
        const fileExtension = file.name.split(".").pop();

        setFormData((prev) => ({
          ...prev,
          SelectFileSig: file,
          SigDocument_Base64: base64String,
          FileExtensionSig: fileExtension,
        }));
      };
      reader.readAsDataURL(file);
    }
  };
  const getProject = () => {
    axiosInstances
      .post(apiUrls.ProjectSelect, {
        ProjectID: 0,
        IsMaster: "0",
        VerticalID: 0,
        TeamID: 0,
        WingID: 0,
      })
      .then((res) => {
        const datas = res?.data?.data;
        const poc3s = datas?.map((item) => {
          return { label: item?.Project, value: item?.ProjectId };
        });
        setProject(poc3s);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [getStateDetails, setGetStateDetails] = useState([]);

  const GetProjectDetails = (value) => {
    axiosInstances
      .post(apiUrls.GetProjectDetail, {
        ProjectID: Number(value),
      })
      .then((res) => {
        if (res.data.success === true) {
          const datas = res?.data?.data[0];
          setGetStateDetails(datas);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleSearch = () => {
    setLoading(true);
    axiosInstances
      .post(apiUrls.GetSmartReportProjectList, {})
      .then((res) => {
        if (res.data.success === true) {
          const datas = res?.data?.data;
          setTableData(datas);
          setLoading(false);
        } else {
          console.log("");
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const handleDeliveryChange = (name, e) => {
    const { value } = e;
    if (name === "ProjectID") {
      setFormData({
        ...formData,
        [name]: value,
      });
      GetProjectDetails(value);
      setTableData([]);
      handleSearch();
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleCheckBox = (e) => {
    const { name, value, checked, type } = e?.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? (checked ? 1 : 0) : value,
    });
  };
  const handleSelectChange = (e) => {
    const { name, value, checked, type } = e?.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? (checked ? 1 : 0) : value,
    });
  };
  function getlabel(id, dropdownData) {
    const ele = dropdownData?.filter((item) => item?.value === id);
    return ele?.length > 0 ? ele[0].label : undefined;
  }
  const handleSave = () => {
    if (!formData?.ProjectID) {
      toast.error("Please Select Project.");
      return;
    }
    if (!formData?.FrontPage) {
      toast.error("Please Select FrontPage.");
      return;
    }
    if (!formData?.HealthAnalysis) {
      toast.error("Please Enter HealthAnalysis.");
      return;
    }
    if (!formData?.Document_Base64) {
      toast.error("Please Upload Logo.");
      return;
    }
    if (!formData?.SigDocument_Base64) {
      toast.error("Please Upload LetterHead.");
      return;
    }
    setLoading(true);
    axiosInstances
      .post(apiUrls.CreateSmartReportProjectMap, {
        ProjectId: Number(formData?.ProjectID),
        PrjectName: String(getlabel(formData?.ProjectID, project)),
        FrontPage: Boolean(formData?.FrontPage == 1 ? true : false),
        HistoricRepresent: Boolean(
          formData?.HealthAnalysis == 1 ? true : false
        ),
        IsActive: Boolean(formData?.IsActive == 1 ? true : false),
        LetterHead: String(formData?.SigDocument_Base64),
        Logo_Img: String(formData?.Document_Base64),
        DoctSign: Boolean(false),
      })
      .then((res) => {
        if (res.data.success === true) {
          toast.success(res?.data?.message);
          setLoading(false);
          setGetStateDetails([]);
          handleSearch();
          setFormData({
            ProjectID: "",
            FrontPage: "",
            HealthAnalysis: "",
            IsActive: "",
            Letterhead: "",
            Logo_Img: "",
            Country: "",
            State: "",
            City: "",
            Address: "",
            SelectFile: "",
            SelectFileSig: "",
            Document_Base64: "",
            FileExtension: "",
            SigDocument_Base64: "",
            FileExtensionSig: "",
          });
          setRowHandler(false);
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
    setLoading(true);
    axiosInstances
      .post(apiUrls.UpdateSmartReportProjectMap, {
        ProjectId: Number(formData?.ProjectID),
        PrjectName: String(getlabel(formData?.ProjectID, project)),
        FrontPage: Boolean(formData?.FrontPage == 1 ? true : false),
        HistoricRepresent: Boolean(
          formData?.HealthAnalysis == 1 ? true : false
        ),
        IsActive: Boolean(formData?.IsActive == 1 ? true : false),
        LetterHead: String(formData?.SigDocument_Base64 || ""),
        Logo_Img: String(formData?.Document_Base64 || ""),
        DoctSign: Boolean(false),
      })
      .then((res) => {
        if (res.data.success === true) {
          toast.success(res?.data?.message);

          setGetStateDetails([]);
          setLoading(false);
          handleSearch();
          setEditData(false);
          setFormData({
            ProjectID: "",
            FrontPage: "",
            HealthAnalysis: "",
            IsActive: "",
            Letterhead: "",
            Logo_Img: "",
            Country: "",
            State: "",
            City: "",
            Address: "",
            SelectFile: "",
            SelectFileSig: "",
            Document_Base64: "",
            FileExtension: "",
            SigDocument_Base64: "",
            FileExtensionSig: "",
          });
          setRowHandler(false);
        } else {
          toast.error(res?.data?.message);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getProject();
    handleSearch();
  }, []);

  const FileDisplay = () => {
    const base64Image = formData?.Document_Base64;

    if (!base64Image) {
      return <p>No image available</p>;
    }

    return (
      <img
        src={`data:image/png;base64,${base64Image}`}
        alt="Base64"
        style={{ maxWidth: "100%" }}
      />
    );
  };
  const FileDisplayHeader = () => {
    const base64Image = formData?.SigDocument_Base64;

    if (!base64Image) {
      return <p>No image available</p>;
    }

    return (
      <img
        src={`data:image/png;base64,${base64Image}`}
        alt="Base64"
        style={{ maxWidth: "100%" }}
      />
    );
  };

  const centreprojectTHEAD = [
    "S.No.",
    "ProjectID",
    "ProjectName",
    "Country",
    "State",
    "City",
    "Address",
    "FrontPage",
    "HealthAnalysis",
    "Status",
    "Edit",
  ];
  const [editData, setEditData] = useState(false);
  const handleEdit = (ele) => {
    setFormData({
      ...formData,
      ProjectID: ele?.ProjectId,
      FrontPage: ele?.Frontpage == "No" ? "0" : "1",
      HealthAnalysis: ele?.Historicrepresnt == "No" ? "0" : "1",
      IsActive: ele?.IsActiveStatus == "Active" ? "1" : "0",
      Country: ele?.Country,
      State: ele?.State,
      City: ele?.City,
      Address: ele?.Address,
      SigDocument_Base64: ele?.Letterhead,
      Document_Base64: ele?.Logo_Img,
    });
    setEditData(true);
  };

  const handleRemoveImage = () => {
    setFormData((prev) => ({
      ...prev,
      Document_Base64: "",
    }));
  };
  const handleRemoveLogo = () => {
    setFormData((prev) => ({
      ...prev,
      SigDocument_Base64: "",
    }));
  };

  return (
    <>
      <div className="">
        <div className="row p-2">
          <ReactSelect
            respclass="col-xl-2 col-md-4 col-sm-6 col-12"
            name="ProjectID"
            placeholderName={t("Project")}
            dynamicOptions={project}
            value={formData?.ProjectID}
            handleChange={handleDeliveryChange}
            requiredClassName={"required-fields"}
            searchable={true}
          />
          <Input
            type="text"
            className="form-control"
            id="Country"
            name="Country"
            lable="Country"
            placeholder=" "
            onChange={handleSelectChange}
            value={getStateDetails?.Country || formData?.Country}
            respclass="col-xl-2 col-md-4 col-sm-4 col-12"
            disabled
          />

          <Input
            type="text"
            className="form-control"
            id="State"
            name="State"
            lable="State"
            placeholder=" "
            onChange={handleSelectChange}
            value={getStateDetails?.State || formData?.State}
            respclass="col-xl-2 col-md-4 col-sm-4 col-12"
            disabled
          />
          <Input
            type="text"
            className="form-control"
            id="City"
            name="City"
            lable="City"
            placeholder=" "
            onChange={handleSelectChange}
            value={getStateDetails?.City || formData?.City}
            respclass="col-xl-2 col-md-4 col-sm-4 col-12"
            disabled
          />
          <Input
            type="text"
            className="form-control"
            id="Address"
            name="Address"
            lable="Address"
            placeholder=" "
            onChange={handleSelectChange}
            value={getStateDetails?.Address || formData?.Address}
            respclass="col-xl-2 col-md-4 col-sm-4 col-12"
            disabled
          />
          <ReactSelect
            respclass="col-xl-2 col-md-4 col-sm-6 col-12"
            name="FrontPage"
            placeholderName={t("Front Page")}
            dynamicOptions={[
              { label: "Yes", value: "1" },
              { label: "No", value: "0" },
            ]}
            value={formData?.FrontPage}
            handleChange={handleDeliveryChange}
          />
          <ReactSelect
            respclass="col-xl-2 col-md-4 col-sm-6 col-12 mt-2"
            name="HealthAnalysis"
            placeholderName={t("Health Analysis")}
            dynamicOptions={[
              { label: "Yes", value: "1" },
              { label: "No", value: "0" },
            ]}
            value={formData?.HealthAnalysis}
            handleChange={handleDeliveryChange}
          />
          <div className=" mt-2">
            <div className=" ml-3 mr-2" style={{ display: "flex" }}>
              <div style={{ width: "100%", marginRight: "3px" }}>
                <button
                  className="btn btn-sm btn-success"
                  onClick={handleDeliveryButton3}
                  title="Click to Upload File."
                >
                  {t("Upload Logo")}
                </button>
              </div>
            </div>
          </div>
          {rowHandler?.ButtonShow && (
            <div
              className={`col-sm-3 mt-2 dropzone ${dragActive ? "drag-active" : ""}`}
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
          {formData?.Document_Base64 ? (
            <span className="ml-2 mt-2 zoom-container">{FileDisplay()}</span>
          ) : (
            ""
          )}
          {/* {formData?.Document_Base64 ? (
            <span
              className="fa fa-times ml-2"
              onClick={handleRemoveImage}
              style={{ cursor: "pointer" }}
            ></span>
          ) : (
            ""
          )} */}
          <div className="mt-2">
            <div className=" ml-3 mr-2" style={{ display: "flex" }}>
              <div style={{ width: "100%", marginRight: "3px" }}>
                <button
                  className="btn btn-sm btn-success"
                  onClick={handleDeliveryButton4}
                  title="Click to Upload File."
                >
                  {t("Upload LettterHead")}
                </button>
              </div>
            </div>
          </div>
          {rowHandler?.TextEditorShow && (
            <div
              className={`col-sm-3 mt-2 dropzone ${dragActive ? "drag-active" : ""}`}
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
                onChange={handleSignatureChange}
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
              {formData?.SelectFileSig?.name && (
                <p
                  style={{
                    marginTop: "0px",
                    fontSize: "14px",
                    color: "black",
                  }}
                >
                  Selected: <strong>{formData?.SelectFileSig?.name}</strong>
                </p>
              )}
            </div>
          )}
          {formData?.SigDocument_Base64 ? (
            <span className="ml-2 mt-2 zoom-container">
              {FileDisplayHeader()}
            </span>
          ) : (
            ""
          )}
          {/* {formData?.SigDocument_Base64 ? (
            <span
              className="fa fa-times ml-2"
              onClick={handleRemoveLogo}
              style={{ cursor: "pointer" }}
            ></span>
          ) : (
            ""
          )} */}
          <div className="search-col mt-2" style={{ marginLeft: "8px" }}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <label className="switch" style={{ marginTop: "7px" }}>
                <input
                  type="checkbox"
                  name="IsActive"
                  checked={formData?.IsActive ? 1 : 0}
                  onChange={handleCheckBox}
                />
                <span className="slider"></span>
              </label>
              <span
                style={{
                  marginLeft: "3px",
                  marginRight: "5px",
                  fontSize: "12px",
                }}
              >
                {t("IsActive")}
              </span>
            </div>
          </div>
          {editData ? (
            <>
              {loading ? (
                <Loading />
              ) : (
                <button
                  className="btn btn-sm btn-success ml-3 mt-2"
                  onClick={handleUpdate}
                >
                  Update
                </button>
              )}
            </>
          ) : (
            <>
              {loading ? (
                <Loading />
              ) : (
                <button
                  className="btn btn-sm btn-success ml-3 mt-2"
                  onClick={handleSave}
                >
                  Save
                </button>
              )}
            </>
          )}
        </div>
      </div>

      {tableData?.length > 0 && (
        <div className="card mt-1">
          <Heading
            title={<span className="font-weight-bold">Search Details</span>}
          />
          <Tables
            thead={centreprojectTHEAD}
            tbody={tableData?.map((ele, index) => ({
              "S.No.": index + 1,
              ProjectID: ele?.ProjectId,
              ProjectName: ele?.PrjectName,
              Country: ele?.Country,
              State: ele?.State,
              City: ele?.City,
              Address: ele?.Address,
              FrontPage: ele?.Frontpage,
              HealthAnalysis: ele?.Historicrepresnt,
              Status: ele?.IsActiveStatus,
              Edit: (
                <i className="fa fa-edit" onClick={() => handleEdit(ele)}></i>
              ),
            }))}
            tableHeight={"tableHeight"}
          />
        </div>
      )}
    </>
  );
};

export default CentreMasterPage;
