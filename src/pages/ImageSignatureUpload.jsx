import React, { useEffect, useRef, useState } from "react";
import BrowseSignature from "../components/formComponent/BrowseSignature";
import Loading from "../components/loader/Loading";
import { useCryptoLocalStorage } from "../utils/hooks/useCryptoLocalStorage";
import axios from "axios";
import { apiUrls } from "../networkServices/apiEndpoints";
import { toast } from "react-toastify";
import { headers } from "../utils/apitools";
import { useTranslation } from "react-i18next";
import Heading from "../components/UI/Heading";
import Tables from "../components/UI/customTable";
import NoRecordFound from "../components/formComponent/NoRecordFound";
const ImageSignatureUpload = (showData) => {
  console.log("showData", showData);
  const [t] = useTranslation();
  const [selectedImageUrl, setSelectedImageUrl] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [signData, setSignData] = useState([]);
  const [imageData, setImageData] = useState([]);
  const fileInputRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [formData, setFormData] = useState({
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
  const signThead = [
    "S.No.",
    "Signature",
    "Created By",
    "Created Date",
    "Remove",
  ];
  const profileThead = [
    "S.No.",
    "Image",
    "Created By",
    "Created Date",
    "Remove",
  ];
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

  const handleSignatureUpload = () => {
    const SignatureJson = JSON.stringify([
      {
        Document_Base64: formData?.SigDocument_Base64,
        FileExtension: formData?.FileExtensionSig,
      },
    ]);
    setLoading(true);
    let form = new FormData();
    form.append("ID", useCryptoLocalStorage("user_Data", "get", "ID")),
      form.append(
        "LoginName",
        useCryptoLocalStorage("user_Data", "get", "realname")
      ),
      form.append("ActionType", "Signature"),
      form.append("EmployeeID", showData?.visible?.showData?.id),
      form.append("ImageDetails", SignatureJson),
      axios
        .post(apiUrls?.UploadEmployeeImages, form, { headers })
        .then((res) => {
          if (res?.data?.success === true) {
            toast.success(res?.data?.message);
            setLoading(false);
            setFormData({
              SelectFile: "",
              SelectFileSig: "",

              Document_Base64: "",
              FileExtension: "",

              SigDocument_Base64: "",
              FileExtensionSig: "",
            });
            // showData?.setVisible(false);
          } else {
            toast.error(res?.data?.message);
            setLoading(false);
          }
        })
        .catch((err) => {
          console.log(err);
        });
  };

  const handleImageUpload = () => {
    if (formData?.SelectFile == "") {
      toast.error("Please Select File.");
      return;
    }
    const ImageJson = JSON.stringify([
      {
        Document_Base64: formData?.Document_Base64,
        FileExtension: formData?.FileExtension,
      },
    ]);
    setLoading(true);
    let form = new FormData();
    form.append("ID", useCryptoLocalStorage("user_Data", "get", "ID")),
      form.append(
        "LoginName",
        useCryptoLocalStorage("user_Data", "get", "realname")
      ),
      form.append("ActionType", "Profile"),
      form.append("EmployeeID", showData?.visible?.showData?.id),
      form.append("ImageDetails", ImageJson),
      axios
        .post(apiUrls?.UploadEmployeeImages, form, { headers })
        .then((res) => {
          if (res?.data?.success === true) {
            toast.success(res?.data?.message);
            setLoading(false);
            setFormData({
              SelectFile: "",
              SelectFileSig: "",

              Document_Base64: "",
              FileExtension: "",

              SigDocument_Base64: "",
              FileExtensionSig: "",
            });
            // showData?.setVisible(false);
          } else {
            toast.error(res?.data?.message);
            setLoading(false);
          }
        })
        .catch((err) => {
          console.log(err);
        });
  };

  const handleSearch = () => {
    let form = new FormData();
    form.append("EmployeeID", showData?.visible?.showData?.id),
      axios
        .post(apiUrls?.SearchEmployeeImages, form, {
          headers,
        })
        .then((res) => {
          setImageData(res?.data?.data);
          setSignData(res?.data?.data);
        })
        .catch((err) => {
          console.log(err);
        });
  };

  const handleImageRemove = (id) => {
    setLoading(true);
    let form = new FormData();
    form.append("ID", useCryptoLocalStorage("user_Data", "get", "ID")),
      form.append(
        "LoginName",
        useCryptoLocalStorage("user_Data", "get", "realname")
      ),
      form.append("ActionType", "Profile"),
      form.append("EmployeeID", id),
      axios
        .post(apiUrls?.RemoveEmployeeImages, form, {
          headers,
        })
        .then((res) => {
          if (res?.data?.success === true) {
            toast.success(res?.data?.message);
            setLoading(false);
            handleSearch();
          } else {
            toast.error(res?.data?.message);
            setLoading(false);
          }
        })
        .catch((err) => {
          console.log(err);
        });
  };
  const handleSignRemove = (id) => {
    let form = new FormData();
    form.append("ID", useCryptoLocalStorage("user_Data", "get", "ID")),
      form.append(
        "LoginName",
        useCryptoLocalStorage("user_Data", "get", "realname")
      ),
      form.append("ActionType", "Signature"),
      form.append("EmployeeID", id),
      axios
        .post(apiUrls?.RemoveEmployeeImages, form, {
          headers,
        })
        .then((res) => {
          if (res?.data?.success === true) {
            toast.success(res?.data?.message);
            setLoading(false);
            handleSearch();
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
    handleSearch();
  }, []);
  return (
    <>
      <div className="card  p-2">
        <span style={{ fontWeight: "bold" }}>
          UserID : {showData?.visible?.showData?.id} &nbsp; &nbsp; &nbsp; &nbsp;
          &nbsp; User Name : {showData?.visible?.showData?.username} &nbsp;
          &nbsp; &nbsp; &nbsp; &nbsp; Real Name :{" "}
          {showData?.visible?.showData?.realname}
          &nbsp; &nbsp; &nbsp; Email : {showData?.visible?.showData?.email}
        </span>
      </div>
      {/* <div className="card">
        <div className="row p-2">
          <div className="ml-2">
            <BrowseSignature handleSignatureChange={handleSignatureChange} />
          </div>

          {loading ? (
            <Loading />
          ) : (
            <button
              className="btn btn-sm btn-success ml-5"
              onClick={handleSignatureUpload}
            >
              Upload
            </button>
          )}
        </div>
      </div> */}
      <div className="card">
        <div className="row p-2">
          <label className="ml-2" style={{ fontWeight: "bold" }}>
            Upload Signature:
          </label>
          <div className=" ml-3 mr-2" style={{ display: "flex" }}>
            <div style={{ width: "100%", marginRight: "3px" }}>
              <button
                className="btn btn-sm btn-success"
                onClick={handleDeliveryButton4}
                title="Click to Upload File."
              >
                {t("Select Signature")}
              </button>
            </div>
          </div>

          {rowHandler?.TextEditorShow && (
            <div
              className={`col-sm-5 dropzone ${dragActive ? "drag-active" : ""}`}
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
                    marginTop: "10px",
                    fontSize: "14px",
                    color: "black",
                  }}
                >
                  Selected: <strong>{formData?.SelectFileSig?.name}</strong>
                </p>
              )}
            </div>
          )}

          {loading ? (
            <Loading />
          ) : (
            <button
              className="btn btn-sm btn-success ml-3"
              onClick={handleSignatureUpload}
            >
              Upload
            </button>
          )}
        </div>
      </div>
      <div className="row">
        <div className="col">
          <div className="card mt-1">
            <Heading
              title={
                <span style={{ fontWeight: "bold" }}>Signature Details</span>
              }
            />
            {signData?.filter((ele) => ele?.SignatureURL)?.length > 0 ? (
              <Tables
                thead={signThead}
                tbody={signData?.map((ele, index) => ({
                  "S.No.": index + 1,

                  Signature: (
                    <>
                      {ele?.SignatureURL && (
                        <i
                          className="fa fa-eye"
                          style={{
                            marginLeft: "5px",
                            cursor: "pointer",
                            color: "white",
                            border: "1px solid grey",
                            padding: "2px",
                            background: "black",
                            borderRadius: "3px",
                          }}
                          onClick={() => {
                            setSelectedImageUrl(ele?.SignatureURL);
                            setIsModalOpen(true);
                          }}
                        ></i>
                      )}

                      {/* Modal */}
                      {isModalOpen && selectedImageUrl && (
                        <div
                          style={{
                            position: "fixed",
                            top: 0,
                            left: 0,
                            width: "100vw",
                            height: "100vh",
                            backgroundColor: "rgba(0,0,0,0.6)",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            zIndex: 1000,
                            overflowY: "auto",
                          }}
                        >
                          <div
                            style={{
                              background: "white",
                              width: "500px",
                              height: "auto",
                              position: "relative",
                              padding: "10px",
                              borderRadius: "8px",
                              border: "2px solid grey",
                              maxHeight: "90vh",
                              overflow: "auto",
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                            }}
                          >
                            {/* Close button */}
                            <div
                              style={{
                                width: "100%",
                                display: "flex",
                                justifyContent: "flex-end",
                              }}
                            >
                              <button
                                onClick={() => {
                                  setIsModalOpen(false);
                                  setSelectedImageUrl(null);
                                }}
                                style={{
                                  padding: "5px 10px",
                                  backgroundColor: "#dc3545",
                                  color: "#fff",
                                  border: "none",
                                  borderRadius: "4px",
                                  cursor: "pointer",
                                  marginBottom: "10px",
                                }}
                              >
                                X
                              </button>
                            </div>

                            <img
                              src={selectedImageUrl}
                              alt="Document"
                              style={{
                                width: "100%",
                                height: "auto",
                                borderRadius: "5px",
                              }}
                            />
                          </div>
                        </div>
                      )}
                    </>
                  ),
                  "Created By": ele?.SignatureCreatedBy,
                  "Created Date":
                    ele?.SignautureCreatedDate == null
                      ? ""
                      : `${new Date(ele.SignautureCreatedDate).getDate().toString().padStart(2, "0")}-${(new Date(ele.SignautureCreatedDate).getMonth() + 1).toString().padStart(2, "0")}-${new Date(ele.SignautureCreatedDate).getFullYear()}`,
                  Remove: (
                    <i
                      className="fa fa-trash"
                      style={{ color: "red", cursor: "pointer" }}
                      onClick={() => handleSignRemove(ele?.EmployeeID)}
                      title="Click to Remove"
                    ></i>
                  ),
                }))}
                tableHeight={"tableHeight"}
              />
            ) : (
              <span
                style={{ fontWeight: "bold", color: "red", padding: "10px" }}
              >
                No Record Found..
              </span>
            )}
          </div>
        </div>
      </div>
      <div className="card mt-2">
        <div className="row p-2">
          <label className="ml-2" style={{ fontWeight: "bold" }}>
            Upload Profile Image:
          </label>
          <div className=" ml-3 mr-2" style={{ display: "flex" }}>
            <div style={{ width: "100%", marginRight: "3px" }}>
              <button
                className="btn btn-sm btn-success"
                onClick={handleDeliveryButton3}
                title="Click to Upload File."
              >
                {t("Select Image")}
              </button>
            </div>
          </div>

          {rowHandler?.ButtonShow && (
            <div
              className={`col-sm-5 dropzone ${dragActive ? "drag-active" : ""}`}
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

          {loading ? (
            <Loading />
          ) : (
            <button
              className="btn btn-sm btn-success ml-3"
              onClick={handleImageUpload}
            >
              Upload
            </button>
          )}
        </div>
      </div>

      <div className="row">
        <div className="col">
          <div className="card mt-1">
            <Heading
              title={
                <span style={{ fontWeight: "bold" }}>Profile Details</span>
              }
            />
            {imageData?.filter((ele) => ele?.ProfilePic)?.length > 0 ? (
              <Tables
                thead={profileThead}
                tbody={imageData?.map((ele, index) => ({
                  "S.No.": index + 1,

                  Image: (
                    <>
                      {ele?.ProfilePic && (
                        <i
                          className="fa fa-eye"
                          style={{
                            marginLeft: "5px",
                            cursor: "pointer",
                            color: "white",
                            border: "1px solid grey",
                            padding: "2px",
                            background: "black",
                            borderRadius: "3px",
                          }}
                          onClick={() => {
                            setSelectedImageUrl(ele?.ProfilePic);
                            setIsModalOpen(true);
                          }}
                        ></i>
                      )}

                      {/* Modal */}
                      {isModalOpen && selectedImageUrl && (
                        <div
                          style={{
                            position: "fixed",
                            top: 0,
                            left: 0,
                            width: "100vw",
                            height: "100vh",
                            backgroundColor: "rgba(0,0,0,0.6)",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            zIndex: 1000,
                            overflowY: "auto",
                          }}
                        >
                          <div
                            style={{
                              background: "white",
                              width: "500px",
                              height: "auto",
                              position: "relative",
                              padding: "10px",
                              borderRadius: "8px",
                              border: "2px solid grey",
                              maxHeight: "90vh",
                              overflow: "auto",
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                            }}
                          >
                            {/* Close button */}
                            <div
                              style={{
                                width: "100%",
                                display: "flex",
                                justifyContent: "flex-end",
                              }}
                            >
                              <button
                                onClick={() => {
                                  setIsModalOpen(false);
                                  setSelectedImageUrl(null);
                                }}
                                style={{
                                  padding: "5px 10px",
                                  backgroundColor: "#dc3545",
                                  color: "#fff",
                                  border: "none",
                                  borderRadius: "4px",
                                  cursor: "pointer",
                                  marginBottom: "10px",
                                }}
                              >
                                X
                              </button>
                            </div>

                            <img
                              src={selectedImageUrl}
                              alt="Document"
                              style={{
                                width: "100%",
                                height: "auto",
                                borderRadius: "5px",
                              }}
                            />
                          </div>
                        </div>
                      )}
                    </>
                  ),
                  "Created By": ele?.ProfileCreatedBy,
                  "Created Date":
                    ele?.ProfileCreatedDate == null
                      ? ""
                      : `${new Date(ele.ProfileCreatedDate).getDate().toString().padStart(2, "0")}-${(new Date(ele.ProfileCreatedDate).getMonth() + 1).toString().padStart(2, "0")}-${new Date(ele.ProfileCreatedDate).getFullYear()}`,
                  Remove: (
                    <i
                      className="fa fa-trash"
                      style={{ color: "red", cursor: "pointer" }}
                      onClick={() => handleImageRemove(ele?.EmployeeID)}
                      title="Click to Remove"
                    ></i>
                  ),
                }))}
                tableHeight={"tableHeight"}
              />
            ) : (
              <span
                style={{ fontWeight: "bold", color: "red", padding: "10px" }}
              >
                No Record Found..
              </span>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default ImageSignatureUpload;
