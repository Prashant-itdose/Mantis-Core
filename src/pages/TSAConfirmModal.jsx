import React, { useState } from "react";
import { toast } from "react-toastify";
import Loading from "../components/loader/Loading";
import { useCryptoLocalStorage } from "../utils/hooks/useCryptoLocalStorage";
import axios from "axios";
import { apiUrls } from "../networkServices/apiEndpoints";
import { headers } from "../utils/apitools";
const TSAConfirmModal = (showData) => {
  console.log("showdata",showData)
  const [loading, setLoading] = useState(false);

  const handleConfirm = () => {
    setLoading(true);
    let form = new FormData();
    form.append("Id", useCryptoLocalStorage("user_Data", "get", "ID")),
      form.append(
        "LoginName",
        useCryptoLocalStorage("user_Data", "get", "realname")
      );
    form.append("TSAID", showData?.visible?.showData?.TSAID);
    form.append("ProjectID", showData?.visible?.showData?.ProjectID);
    form.append(
      "AgreementTenure",
      showData?.visible?.showData?.AgreementTenure
    );
    form.append("ProjectName", showData?.visible?.showData?.ProjectName);
    form.append("ToEmailID", showData?.visible?.showData?.ToEmailID);
    form.append("Amount", showData?.visible?.showData?.Amount);
    form.append("RenewalDate", showData?.visible?.showData?.RenewalDate);
    form.append(
      "ValidTo",
      new Date(showData?.visible?.showData?.ValidTo).toLocaleDateString(
        "en-GB",
        {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }
      )
    );
    form.append(
      "ValidFrom",
      new Date(showData?.visible?.showData?.ValidFrom).toLocaleDateString(
        "en-GB",
        {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }
      )
    );
    form.append("DocumentNo", showData?.visible?.showData?.DocumentNo);
    form.append("DocumentURL", showData?.visible?.showData?.DocumentURL);
    form.append("ClientName", showData?.visible?.showData?.ClientName);
    form.append(
      "ClientDesignation",
      showData?.visible?.showData?.ClientDesignation
    );
    axios
      .post(apiUrls?.ConfirmTSA, form, { headers })
      .then((res) => {
        if (res?.data?.status === true) {
          toast.success(res?.data?.message);
          setLoading(false);
          showData?.setVisible(false);
          showData?.handleSearch();
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
      {/* <Heading
        title={
          <span style={{ fontWeight: "bold" }}>TSA Confirm Details</span>
        } /> */}
      <div className="card p-1">
        <span style={{ fontWeight: "bold" }}>
          Project Name : {showData?.visible?.showData?.ProjectName}
        </span>
      </div>
      <div className="card">
        <div className="row p-2">
          <label style={{ fontWeight: "bold", marginLeft: "5px" }}>
            Kindly confirm the receipt of the agreement sent to your email.
          </label>

          {loading ? (
            <Loading />
          ) : (
            <button
              className="btn btn-sm btn-danger ml-2"
              onClick={handleConfirm}
            >
              Yes
            </button>
          )}
        </div>
      </div>
    </>
  );
};
export default TSAConfirmModal;
