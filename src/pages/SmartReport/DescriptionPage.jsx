import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { axiosInstances } from "../../networkServices/axiosInstance";
import { apiUrls } from "../../networkServices/apiEndpoints";
import ReactSelect from "../../components/formComponent/ReactSelect";
import { useTranslation } from "react-i18next";
import Input from "../../components/formComponent/Input";
import Heading from "../../components/UI/Heading";
import Tables from "../../components/UI/customTable";
import Loading from "../../components/loader/Loading";
import Tooltip from "../Tooltip";
import DescriptionTemplateModal from "./DescriptionTemplateModal";
import Modal from "../../components/modalComponent/Modal";

const DescriptionPage = () => {
  const [t] = useTranslation();
  const [tableData, setTableData] = useState([]);
  const fileInputRef = React.useRef(null);
  const [dragActive, setDragActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editData, setEditData] = useState(false);
  const [project, setProject] = useState([]);
  const [test, setTest] = useState([]);

  const [formData, setFormData] = useState({
    ProjectID: "",
    TestName: "",
    Description: "",

    SelectFile: "",
    SelectFileSig: "",

    Document_Base64: "",
    FileExtension: "",

    SigDocument_Base64: "",
    FileExtensionSig: "",
  });
  const handleSelectChange = (e) => {
    const { name, value, checked, type } = e?.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? (checked ? 1 : 0) : value,
    });
  };
  const bindProject = () => {
    axiosInstances
      .post(apiUrls.BindProjectSmartReport, {})
      .then((res) => {
        const datas = res?.data?.data;
        const poc3s = datas?.map((item) => {
          return { label: item?.PrjectName, value: item?.ProjectId };
        });
        setProject(poc3s);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const bindTest = (value) => {
    axiosInstances
      .post(apiUrls.BindInvestigation, {
        ProjectId: String(value),
      })
      .then((res) => {
        const datas = res?.data?.data;
        const poc3s = datas?.map((item) => {
          return {
            label: item?.TestName,
            value: item?.Id,
            TestCode: item?.TestCode,
          };
        });
        setTest(poc3s);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleSearch = (value) => {
    setLoading(true);
    axiosInstances
      .post(apiUrls.GetDescription, {
        ProjectId: String(value),
      })
      .then((res) => {
        if (res.data.success === true) {
          setTableData(res.data.data);
          setLoading(false);
        } else {
          toast.error(res.data.message);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const shortenNamesummary = (name) => {
    return name?.length > 20 ? name?.substring(0, 25) + "..." : name;
  };
  const handleDeliveryChange = (name, e) => {
    const { value } = e;
    if (name === "ProjectID") {
      setFormData({
        ...formData,
        ProjectID: value,
        TestName: "",
        Description: "",
        SelectFile: "",
        SelectFileSig: "",

        Document_Base64: "",
        FileExtension: "",

        SigDocument_Base64: "",
        FileExtensionSig: "",
      });
      bindTest(value);
      handleSearch(value);
    } else if (name === "TestName") {
      const selectedTest = test?.find((item) => item.value === value);
      setFormData({
        ...formData,
        TestName: value,
        TestCode: selectedTest?.TestCode || "",
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = () => {
    if (!formData?.ProjectID) {
      toast.error("Please Select Project.");
      return;
    }
    if (!formData?.TestName) {
      toast.error("Please Select TestName.");
      return;
    }
    if (!formData?.Description) {
      toast.error("Please Enter Description.");
      return;
    }
    setLoading(true);
    axiosInstances
      .post(apiUrls.Investigation_Description, {
        ProjectId: String(formData?.ProjectID),
        Test_id: String(formData?.TestName),
        TestCode: String(formData?.TestCode),
        Description: String(formData?.Description),
        Image: String(formData?.Document_Base64),
      })
      .then((res) => {
        if (res.data.success === true) {
          toast.success(res.data.message);
          setLoading(false);
          handleSearch(formData?.ProjectID);
          setFormData({
            ...formData,
            ProjectID: "",
            TestName: "",
            Description: "",

            SelectFile: "",
            SelectFileSig: "",

            Document_Base64: "",
            FileExtension: "",

            SigDocument_Base64: "",
            FileExtensionSig: "",
          });
          setRowHandler(false);
          setLoading(false);
        } else {
          toast.error(res.data.message);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleUpdate = () => {
    if (!formData?.ProjectID) {
      toast.error("Please Select Project.");
      return;
    }
    if (!formData?.TestName) {
      toast.error("Please Select TestName.");
      return;
    }
    if (!formData?.Description) {
      toast.error("Please Enter Description.");
      return;
    }
    setLoading(true);
    axiosInstances
      .post(apiUrls.Investigation_Description, {
        ProjectId: String(formData?.ProjectID),
        Test_id: String(formData?.TestName),
        TestCode: String(formData?.TestCode),
        Description: String(formData?.Description),
        Image: String(formData?.Document_Base64),
      })
      .then((res) => {
        if (res.data.success === true) {
          toast.success(res.data.message);
          setLoading(false);
          handleSearch(formData?.ProjectID);
          setFormData({
            ...formData,
            ProjectID: "",
            TestName: "",
            Description: "",

            SelectFile: "",
            SelectFileSig: "",

            Document_Base64: "",
            FileExtension: "",

            SigDocument_Base64: "",
            FileExtensionSig: "",
          });
          setRowHandler(false);
          setEditData(false);
          setLoading(false);
        } else {
          toast.error(res.data.message);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleEdit = (ele) => {
    setFormData({
      ...formData,
      ProjectID: ele?.ProjectId,
      TestName: ele?.TestId,
      TestCode: ele?.TestCode,
      Description: ele?.Desription,
      Document_Base64: ele?.Image,
    });
    setEditData(true);
  };

  const descriptionTHEAD = [
    "S.No.",
    "ProjectName",
    "TestName",
    "Description",
    "Edit",
  ];
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

  const handleRemoveImage = () => {
    setFormData((prev) => ({
      ...prev,
      Document_Base64: "",
    }));
  };
  useEffect(() => {
    bindProject();
  }, []);
  const [visible, setVisible] = useState({
    summaryVisible: false,
    showData: {},
  });
  return (
    <>
      {visible?.summaryVisible && (
        <Modal
          modalWidth={"600px"}
          visible={visible}
          setVisible={setVisible}
          Header="Description Details"
        >
          <DescriptionTemplateModal visible={visible} setVisible={setVisible} />
        </Modal>
      )}
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
            isDisabled={editData === true}
          />
          <ReactSelect
            respclass="col-xl-2 col-md-4 col-sm-6 col-12"
            name="TestName"
            placeholderName={t("Select Test")}
            dynamicOptions={test}
            value={formData?.TestName}
            handleChange={handleDeliveryChange}
            isDisabled={editData === true}
          />
          <Input
            type="text"
            className="form-control"
            id="Description"
            name="Description"
            lable="Description"
            placeholder=" "
            onChange={handleSelectChange}
            value={formData?.Description}
            respclass="col-xl-8 col-md-4 col-sm-4 col-12"
          />
          <div className="mt-2">
            <div className="ml-3 mr-2" style={{ display: "flex" }}>
              <div style={{ width: "100%", marginRight: "3px" }}>
                <button
                  className="btn btn-sm btn-success"
                  onClick={handleDeliveryButton3}
                  title="Click to Upload File."
                >
                  {t("Upload Image")}
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
            <span style={{ width: "50px", height: "50px", marginLeft: "10px" }}>
              {FileDisplay()}
            </span>
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
                  onClick={handleSubmit}
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
            thead={descriptionTHEAD}
            tbody={tableData?.map((ele, index) => ({
              "S.No.": index + 1,
              ProjectName: ele?.PrjectName,
              TestName: ele?.Test,
              // Description: (
              //   <Tooltip label={ele?.Desription}>
              //     <span
              //       id={`Desription-${index}`}
              //       targrt={`Desription-${index}`}
              //       style={{ textAlign: "center" }}
              //     >
              //       {shortenNamesummary(ele?.Desription)}
              //     </span>
              //   </Tooltip>
              // ),
              Description: (
                <>
                  {/* <Tooltip label={ele?.Desription}>
                    <span
                      id={`Desription-${index}`}
                      targrt={`Desription-${index}`}
                      style={{ textAlign: "center" }}
                    >
                      {shortenNamesummary(ele?.Desription)}
                    </span>
                  </Tooltip> */}
                  <i
                    className="fa fa-eye"
                    onClick={() => {
                      setVisible({
                        summaryVisible: true,
                        showData: ele,
                        ele,
                      });
                    }}
                    style={{
                      cursor: "pointer",
                      color: "black",
                      marginLeft: "2px",
                    }}
                    title="View Description Details"
                  ></i>
                </>
              ),
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

export default DescriptionPage;
