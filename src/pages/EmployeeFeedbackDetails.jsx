import React, { useEffect, useState } from "react";
import { apiUrls } from "../networkServices/apiEndpoints";
import { headers } from "../utils/apitools";
import { useCryptoLocalStorage } from "../utils/hooks/useCryptoLocalStorage";
import axios from "axios";
import Tables from "../components/UI/customTable";
import NoRecordFound from "../components/formComponent/NoRecordFound";
const EmployeeFeedbackDetails = (showData) => {
  console.log("data", showData);
  const [tableData, setTableData] = useState([]);
  const handleApprove = () => {
    let form = new FormData();
    form.append("Id", useCryptoLocalStorage("user_Data", "get", "ID")),
      form.append(
        "LoginName",
        useCryptoLocalStorage("user_Data", "get", "realname")
      );
    form.append("FeedbackID", showData?.visible?.showData?.FeedbackID);
    axios
      .post(apiUrls?.EmployeeFeedbackTransaction, form, { headers })
      .then((res) => {
        setTableData(res?.data?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const TSAHEAD = [
    "S.No.",
    "Mode",
    "Email",
    "Mobile",
    "CreatedBy",
    "CreatedDate",
    "SendDate",
  ];

  useEffect(() => {
    handleApprove();
  }, []);
  return (
    <>
      <div className="card p-1">
        <span style={{ fontWeight: "bold" }}>
          Employee Name : {showData?.visible?.showData?.EmployeeName} &nbsp;
          &nbsp; &nbsp;&nbsp; &nbsp;
          {/* FeedbackID: {showData?.visible?.showData?.FeedbackID}  &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; */}
          {/* FeedbackBy: {showData?.visible?.showData?.FeedbackBy}  &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;
          FeedbackDate: {new Date(showData?.visible?.showData?.dtFeedback).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}  &nbsp; &nbsp; &nbsp; */}
        </span>
      </div>
      {tableData?.length > 0 ? (
        <div className="card">
          <Tables
            thead={TSAHEAD}
            tbody={tableData?.map((ele, index) => ({
              "S.No.": index + 1,
              Mode: ele?.MessageSentMode,
              Email: ele?.FeedbackSubmittedBy,
              Mobile: ele?.MobileNo,
              CreatedBy: ele?.CreatedBy,
              CreatedDate: new Date(ele.dtEntry).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              }),
              SendDate: ele?.dtSent,
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

export default EmployeeFeedbackDetails;
