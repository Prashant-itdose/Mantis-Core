import React, { useState } from "react";
import Loading from "../components/loader/Loading";
import { toast } from "react-toastify";
import { apiUrls } from "../networkServices/apiEndpoints";
import axios from "axios";
import { headers } from "../utils/apitools";
import { useCryptoLocalStorage } from "../utils/hooks/useCryptoLocalStorage";
import { useTranslation } from "react-i18next";
import Input from "../components/formComponent/Input";
const FeedbackGmailModal = (showData) => {
  console.log("showdata", showData);
  const [loading, setLoading] = useState(false);
  const [t] = useTranslation();
  const [formData, setFormData] = useState({
    Gmail: showData?.visible?.showData?.ToEmailID
      ? showData?.visible?.showData?.ToEmailID
      : "",
  });
  const handleConfirm = () => {
    setLoading(true);
    let form = new FormData();
    form.append("ID", useCryptoLocalStorage("user_Data", "get", "ID")),
      form.append(
        "LoginName",
        useCryptoLocalStorage("user_Data", "get", "realname")
      ),
      form.append("FeedbackID", showData?.visible?.showData?.FeedbackID),
      form.append("ProjectID", showData?.visible?.showData?.ProjectID),
      form.append("ProjectName", showData?.visible?.showData?.ProjectName),
      form.append("ToEmailID", formData?.Gmail),
      form.append("Content", showData?.visible?.showData?.Content),
      axios
        .post(apiUrls?.ResendFeedbackMail, form, { headers })
        .then((res) => {
          if (res?.data?.status === true) {
            toast.success(res?.data?.message);
            showData?.setVisible(false);
            showData?.handleSearchFeedback();
            setLoading(false);
          } else {
            toast.error(res?.data?.message);
            setLoading(false);
          }
        })
        .catch((err) => {
          console.log(err);
        });
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e?.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? (checked ? "1" : "0") : value,
    });
  };
  return (
    <>
      <div className="card p-1">
        <span style={{ fontWeight: "bold" }}>
          Project Name : {showData?.visible?.showData?.ProjectName}
        </span>
      </div>
      <div className="card">
        <div className="row p-2 d-none">
          <label style={{ fontWeight: "bold", marginLeft: "5px" }}>
            Do you want to send this message through Gmail now?
          </label>
        </div>
        <div className="row p-1">
          <Input
            type="text"
            className="form-control"
            id="Gmail"
            name="Gmail"
            lable={t("Gmail")}
            placeholder=" "
            onChange={handleChange}
            value={formData?.Gmail}
            respclass="col-xl-7 col-md-4 col-sm-4 col-12"
          />
          {loading ? (
            <Loading />
          ) : (
            <button
              className="btn btn-sm btn-danger ml-2"
              onClick={handleConfirm}
            >
              Send
            </button>
          )}
        </div>
      </div>
    </>
  );
};
export default FeedbackGmailModal;
