import React, { useEffect, useState } from "react";
import { apiUrls } from "../networkServices/apiEndpoints";
import { headers } from "../utils/apitools";
import axios from "axios";
import { toast } from "react-toastify";
import Input from "../components/formComponent/Input";
import Loading from "../components/loader/Loading";
import ReactSelect from "../components/formComponent/ReactSelect";
import Heading from "../components/UI/Heading";
import { useCryptoLocalStorage } from "../utils/hooks/useCryptoLocalStorage";


const DocumentTypeModalProject = (visible, showData) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    DocumentType: "",
    SelectFile: "",
    Document_Base64: "",
    FileExtension: "",
  });

  const handleDeliveryChange = (name, e) => {
    const { value } = e;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const [documenttype, setDocumentType] = useState([]);
  const getType = () => {
    let form = new FormData();
    form.append("ID",  useCryptoLocalStorage("user_Data", "get", "ID")),
      axios
        .post(
          apiUrls?.DocumentType_Select,
          form,
          { headers }
        )
        .then((res) => {
          const wings = res?.data.data.map((item) => {
            return {
              label: item?.DocumentTypeName,
              value: item?.DocumentTypeID,
            };
          });
          setDocumentType(wings);
        })
        .catch((err) => {
          console.log(err);
        });
  };

  const handleUploadDocument = () => {
    setLoading(true);
    let form = new FormData();
    form.append("ID",  useCryptoLocalStorage("user_Data", "get", "ID")),
      form.append("LoginName", useCryptoLocalStorage("user_Data", "get", "realname")),
      form.append("ProjectID", visible?.tableData?.ProjectID),
      form.append("DocumentTypeID", formData?.DocumentType),
      form.append(
        "DocumentTypeName",
        documenttype.find((item) => item?.value === formData?.DocumentType)
          ?.label
      ),
      form.append("Document_Base64", formData?.Document_Base64),
      form.append("FileExtension", formData?.FileExtension),
      axios
        .post(
         apiUrls?.UploadDocument,
          form,
          { headers }
        )
        .then((res) => {
          toast.success(res?.data?.message);
          setLoading(false);
          setFormData({
            ...formData,
            DocumentType: "",
            SelectFile: "",
            Document_Base64: "",
            FileExtension: "",
          });
          document.getElementById('SelectFile').value = '';
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
  };

  useEffect(() => {
    getType();
  }, []);

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
      <div className="card ViewIssues border">
        <Heading
          title={
            <div style={{ float: "left" }}>
              {visible?.tableData?.ProjectName}
            </div>
          }
        />
        <div className="row g-4 m-2">
          <ReactSelect
            name="DocumentType"
            respclass="col-md-4 col-12 col-sm-12"
            placeholderName="DocumentType"
            dynamicOptions={documenttype}
            value={formData?.DocumentType}
            handleChange={handleDeliveryChange}
          />
          <Input
            type="file"
            id="SelectFile"
            name="SelectFile"
            respclass="col-md-4 col-12 col-sm-12"
            style={{ width: "100%", marginLeft: "5px" }}
            onChange={handleFileChange}
          />
          {loading ? (
            <Loading />
          ) : (
            <div className="col-3 col-sm-4 d-flex">
              <button
                className="btn btn-sm btn-info"
                onClick={handleUploadDocument}
                disabled={loading}
              >
                Upload
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default DocumentTypeModalProject;
