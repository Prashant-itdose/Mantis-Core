import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { axiosInstances } from "../networkServices/axiosInstance";
import { apiUrls } from "../networkServices/apiEndpoints";
import BrowseInput from "../components/formComponent/BrowseInput";
import Tables from "../components/UI/customTable";

const OverseasExpenseModal = ({ visible, setVisible, handleViewSearch }) => {
  //   console.log("view issue", visible);
  const [tableData, setTableData] = useState([]);
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
          setFormData({
            ...formData,
            DocumentType: "",
            SelectFile: "",
            Document_Base64: "",
            FileExtension: "",
          });

          handleViewSearch();
          handleSearch();
        } else {

          toast?.error(res?.data?.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const localTHEAD = ["S.No.", "Created By", "Created Date", "View"];

  const handleSearch = () => {
    axiosInstances
      .post(apiUrls.GetOverseasInvoiceList, {
        Expense_No: String(visible?.showData?.Expense_No),
      })
      .then((res) => {
        if (res?.data?.success === true) {
          setTableData(res.data.data);
        } else {
          toast.error(res?.data?.message);
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
      <div className="card p-2">
        <span style={{ fontWeight: "bold" }}>
          Employee Name:- {visible?.showData?.Employee_Name}&nbsp; &nbsp;
          Invoice No.:- {visible?.showData?.Invoice_No}&nbsp; &nbsp; Expense
          No.:- {visible?.showData?.Expense_No}
        </span>
      </div>
      {/* <div className="card p-2">
        <span style={{ fontWeight: "bold" }}>
          <i
            className="fa fa-eye"
            onClick={handleView}
            style={{ cursor: "pointer" }}
            title="Click to View Invoice."
          ></i>{" "}
          <span className="ml-3">View Previous Invoice</span>
        </span>
      </div> */}
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
      <div className="card">
        <Tables
          thead={localTHEAD}
          tbody={tableData?.map((ele, index) => ({
            "S.No.": index + 1,
            "Created By": ele?.CreatedBy,
            "Created Date": ele?.CreatedOn,
            View: (
              <i
                className="fa fa-eye"
                onClick={() => {
                  const fileUrl = ele?.Invoice_File_Url;
                  window.open(fileUrl, "_blank", "noreferrer");
                }}
              ></i>
            ),
          }))}
          tableHeight={"tableHeight"}
        />
      </div>
    </>
  );
};
export default OverseasExpenseModal;
