import React, { useEffect, useState } from "react";
import Input from "../../formComponent/Input";
import { toast } from "react-toastify";
import axios from "axios";
import { apiUrls } from "../../../networkServices/apiEndpoints";
import { headers } from "../../../utils/apitools";
import BrowseInput from "../../formComponent/BrowseInput";
import { useCryptoLocalStorage } from "../../../utils/hooks/useCryptoLocalStorage";
import NoRecordFound from "../../formComponent/NoRecordFound";
import Heading from "../Heading";
import Tables from ".";
import { axiosInstances } from "../../../networkServices/axiosInstance";
const ViewIssueDocModal = ({ visible, setVisible, handleViewSearch }) => {
  // console.log("lotus ", visible);
  const [loading, setLoading] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [formData, setFormData] = useState({
    TaxInvoiceNo: "",
    DocumentType: "",
    SelectFile: "",
    Document_Base64: "",
    FileExtension: "",
  });

  const handleImageChange = (e) => {
    // console.log(e);
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
    const picsDocsJson = JSON.stringify([
      {
        Document_Base64: formData?.Document_Base64,
        FileExtension: formData?.FileExtension,
      },
    ]);
    axiosInstances
      .post(apiUrls.InsertAttachment, {
  "TicketID": visible?.showData?.TicketID,
  "ImageDetails": [
      {
        Document_Base64: formData?.Document_Base64,
        FileExtension: formData?.FileExtension,
      },
    ]
})
    // let form = new FormData();
    // form.append("ID", useCryptoLocalStorage("user_Data", "get", "ID")),
    //   form.append(
    //     "LoginName",
    //     useCryptoLocalStorage("user_Data", "get", "realname")
    //   ),
    //   form.append("TicketID", visible?.showData?.TicketID),
    //   form.append("ImageDetails", picsDocsJson);
    // axios
    //   .post(apiUrls?.InsertAttachment, form, { headers })
      .then((res) => {
        if (res?.data?.status === true) {
          toast.success(res?.data?.message);
          setVisible(false);
          // handleViewSearch();
        } else {
          toast.error(res?.data?.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleDetails = () => {
    axiosInstances
      .post(apiUrls.ViewAttachment, {
  "TicketID": visible?.showData?.TicketID
})
    // let form = new FormData();
    // form.append("ID", useCryptoLocalStorage("user_Data", "get", "ID")),
    //   form.append("TicketID", visible?.showData?.TicketID),
    //   axios
    //     .post(apiUrls?.ViewAttachment, form, { headers })
        .then((res) => {
          setTableData(res?.data?.data);
        })
        .catch((err) => {
          console.log(err);
        });
  };
  const handleRemove = (ele) => {
    // console.log("ele", ele);
    axiosInstances
      .post(apiUrls.DeleteAttachment, {
  "TicketID": ele?.TicketID,
  "AttachmentID": ele?.ID
})
    // let form = new FormData();
    // form.append("ID", useCryptoLocalStorage("user_Data", "get", "ID")),
    //   form.append(
    //     "RoleID",
    //     useCryptoLocalStorage("user_Data", "get", "RoleID")
    //   ),
    //   form.append(
    //     "LoginName",
    //     useCryptoLocalStorage("user_Data", "get", "realname")
    //   ),
    //   form.append("TicketID", ele?.TicketID),
    //   form.append("AttachmentID", ele?.ID),
    //   axios
    //     .post(apiUrls?.DeleteAttachment, form, { headers })
        .then((res) => {
          toast.success(res?.data?.message);
          handleDetails();
          setVisible(false);
          handleViewSearch();
        })
        .catch((err) => {
          console.log(err);
        });
  };
  const centreTHEAD = ["S.No.", "CreatedBy", "EntryDate", "Print", "Remove"];
  useEffect(() => {
    handleDetails();
  }, []);
  return (
    <>
      <div className="card p-2">
        <span style={{ fontWeight: "bold" }}>
          Project Name:- {visible?.showData?.ProjectName}&nbsp; &nbsp; Ticket
          No.:- {visible?.showData?.TicketID}&nbsp; &nbsp; Summary:-{" "}
          {visible?.showData?.summary}
        </span>
      </div>
      <div className="card">
        <div className="row m-2">
          {/* <Input
            type="text"
            className="form-control"
            id="TaxInvoiceNo"
            name="TaxInvoiceNo"
            lable="Tax Invoice No."
            placeholder=" "
            onChange={searchHandleChange}
            value={formData?.TaxInvoiceNo}
            respclass="col-xl-4 col-md-4 col-sm-6 col-12"
          /> */}
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

      <div className="card mt-2">
        {tableData?.length > 0 ? (
          <div className="">
            <Heading title={"Search Details"} />
            <Tables
              thead={centreTHEAD}
              tbody={tableData?.map((ele, index) => ({
                "S.No.": index + 1,
                CreatedBy: ele?.CreatedBy,
                EntryDate: ele?.dtEntry,
                Print: (
                  <i
                    className="fa fa-print"
                    style={{
                      marginLeft: "5px",
                      cursor: "pointer",
                      color: "black",
                      padding: "2px",
                      borderRadius: "3px",
                    }}
                    onClick={() => window.open(ele?.DocumentUrl, "_blank")}
                  ></i>
                ),
                Remove: (
                  <i
                    className="fa fa-remove"
                    style={{ color: "red" }}
                    onClick={() => {
                      handleRemove(ele);
                    }}
                  >
                    X
                  </i>
                ),
              }))}
              tableHeight={"tableHeight"}
            />
          </div>
        ) : (
          <div className="">
            <Heading title={"Search Details"} />
            <NoRecordFound />
          </div>
        )}
      </div>
    </>
  );
};
export default ViewIssueDocModal;
