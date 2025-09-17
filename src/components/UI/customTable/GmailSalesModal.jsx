import React, { useEffect, useState } from "react";
import Input from "../../formComponent/Input";
import { apiUrls } from "../../../networkServices/apiEndpoints";
import { headers } from "../../../utils/apitools";
import axios from "axios";
import { toast } from "react-toastify";
import { gmailQuotationTHEAD } from "../../modalComponent/Utils/HealperThead";
import Tables from ".";
import moment from "moment";
import Heading from "../Heading";
import ReactSelect from "../../formComponent/ReactSelect";
import Loading from "../../loader/Loading";
import { useCryptoLocalStorage } from "../../../utils/hooks/useCryptoLocalStorage";
import NoRecordFound from "../../formComponent/NoRecordFound";
import { axiosInstances } from "../../../networkServices/axiosInstance";

const GmailSalesModal = ({ visible, setVisible }) => {
  // console.log("visible visible", visible);
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [quotationLog, setQuotationLog] = useState([]);
  const [projectEmail, setProjectEmail] = useState([]);
  console.log("projectemail", projectEmail);
  const [formData, setFormData] = useState({
    EmailTo: projectEmail?.EmailTo || "",
    EmailCC: projectEmail?.EmailCC || "",
  });
  // const searchHandleChange = (e, index) => {
  //   const { name, value } = e.target;
  //   setFormData({ ...formData, [name]: value });
  // };
  const searchHandleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (projectEmail) {
      setFormData((prev) => ({
        ...prev,
        ...(projectEmail.EmailTo && { EmailTo: projectEmail.EmailTo }),
        ...(projectEmail.EmailCC && { EmailCC: projectEmail.EmailCC }),
      }));
    }
  }, [projectEmail]);
  const handleQuotation_Email_Log = () => {
    // let form = new FormData();
    // form.append("ID", useCryptoLocalStorage("user_Data", "get", "ID")),
    //   form.append(
    //     "LoginName",
    //     useCryptoLocalStorage("user_Data", "get", "realname")
    //   ),
    //   form.append("DocumentType", "PI"),
    //   form.append("DocumentID", visible?.showData?.EncryptID),
    //   axios
    //     .post(apiUrls?.Quotation_Email_Log, form, { headers })
    axiosInstances
      .post(apiUrls.Quotation_Email_Log, {
        DocumentID: String(visible?.showData?.EncryptID),
        DocumentType: String("PI"),
      })
      .then((res) => {
        setTableData(res?.data?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleQuotation_Email = () => {
    if (formData?.EmailTo == "") {
      toast.error("Please Enter EmailTo.");
    } else if (formData?.EmailCC == "") {
      toast.error("Please Enter EmailCC.");
    } else {
      setLoading(true);
      // let form = new FormData();
      // form.append("ID", useCryptoLocalStorage("user_Data", "get", "ID")),
      //   form.append(
      //     "LoginName",
      //     useCryptoLocalStorage("user_Data", "get", "realname")
      //   ),
      //   form.append("DocumentType", "PI"),
      //   form.append("DocumentID", visible?.showData?.EncryptID),
      //   form.append("EmailTo", formData?.EmailTo),
      //   form.append("EmailCC", formData?.EmailCC),
      //   axios
      //     .post(apiUrls?.Quotation_Email, form, { headers })
      axiosInstances
        .post(apiUrls.SalesBooking_IsCancel, {
          DocumentID: String(visible?.showData?.EncryptID),
          EmailTo: String(formData?.EmailTo),
          EmailCC: String(formData?.EmailCC),
          DocumentType: String("PI"),
          ActionType: String(""),
        })
        .then((res) => {
          if (res?.data?.success === true) {
            toast.success(res?.data?.messsage);
            handleQuotation_Email_Log();
            setFormData({
              EmailTo: "",
              EmailCC: "",
            });
            setLoading(false);
            setVisible(false);
          } else {
            toast.error(res?.data?.messsage);
            setLoading(false);
          }
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }
  };
  const getProjectEmail = () => {
    // let form = new FormData();
    // form.append("ID", useCryptoLocalStorage("user_Data", "get", "ID")),
    //   form.append(
    //     "LoginName",
    //     useCryptoLocalStorage("user_Data", "get", "realname")
    //   ),
    //   form.append("ProjectID", visible?.showData?.ProjectID),
    //   axios
    //     .post(apiUrls?.ProjectSelect, form, { headers })
    axiosInstances
      .post(apiUrls.ProjectSelect, {
        ProjectID: Number(visible?.showData?.ProjectID),
        IsMaster: String("0"),
        WingID: Number("0"),
        TeamID: Number("0"),
        VerticalID: Number("0"),
      })
      .then((res) => {
        setProjectEmail(res?.data?.data[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    handleQuotation_Email_Log();
    getProjectEmail();
  }, []);
  return (
    <>
      <div className="card p-2">
        <div className="d-flex">
          <span style={{ fontWeight: "bold" }}>
            Project Name:- &nbsp;{visible?.showData?.ProjectName}
          </span>
          <span style={{ fontWeight: "bold", marginLeft: "20px" }}>
            PI No.:- &nbsp;{visible?.showData?.PINo}
          </span>
        </div>
      </div>
      <div className="card p-1">
        <div className="row mt-1">
          <Input
            type="text"
            className="form-control"
            id="EmailTo"
            name="EmailTo"
            lable="EmailTo"
            placeholder=" "
            onChange={searchHandleChange}
            value={formData?.EmailTo}
            // value={
            //   formData?.EmailTo ? formData?.EmailTo : projectEmail?.EmailTo
            // }
            respclass="col-xl-12 col-md-4 col-sm-6 col-12"
          />
        </div>
        <div className="row mt-1">
          <Input
            type="text"
            className="form-control"
            id="EmailCC"
            name="EmailCC"
            lable="EmailCC"
            placeholder=" "
            onChange={searchHandleChange}
            value={formData?.EmailCC}
            // value={
            //   formData?.EmailCC ? formData?.EmailCC : projectEmail?.EmailCC
            // }
            respclass="col-xl-12 col-md-4 col-sm-6 col-12"
          />
        </div>
        <div className="row mt-1">
          {loading ? (
            <Loading />
          ) : (
            <button
              className="btn btn-sm btn-primary ml-3"
              onClick={handleQuotation_Email}
            >
              Send
            </button>
          )}
        </div>
      </div>
      {tableData?.length > 0 ? (
        <div className="card p-2">
          {/* <Heading title={"Gmail Details"}/> */}
          <Tables
            thead={gmailQuotationTHEAD}
            tbody={tableData?.map((ele, index) => ({
              "S.No.": index + 1,
              EmailTo: ele?.ToEMailID,
              EmailCC: ele?.CCEmailID,
              "Email Status": ele?.EmaiStatus,
              "Entry Date": moment(ele?.dtEntry).format("DD-MMM-YYYY"),
              "Send Date": ele?.dtSent
                ? moment(ele.dtSent).format("DD-MMM-YYYY")
                : "",
            }))}
            tableHeight={"tableHeight"}
          />
        </div>
      ) : (
        <NoRecordFound />
      )}
    </>
  );
};
export default GmailSalesModal;
