
import React from "react";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { axiosInstances } from "../../../networkServices/axiosInstance";
import { apiUrls } from "../../../networkServices/apiEndpoints";

const TDSDiscountModal = ({ visible }) => {
  const [t] = useTranslation();
  const handleSave = () => {
    // let form = new FormData();
    // form.append("ID", useCryptoLocalStorage("user_Data", "get", "ID")),
    //   form.append(
    //     "LoginName",
    //     useCryptoLocalStorage("user_Data", "get", "realname")
    //   ),
    //   form.append("ConnectorID", visible?.visible?.connectdata?.ID),
    //   form.append("Status", "Issue"),
    //   axios
    //     .post(apiUrls?.Connector_Status_Update, form, { headers })
    axiosInstances
      .post(apiUrls.Connector_Status_Update, {
        ConnectorID: visible?.visible?.connectdata?.ID,
        Status: "Issue",
      })
      .then((res) => {
        toast.success(res?.data?.message);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <div className="row  m-2">
        <label>
          {t("Do you want to adjust amount against TDS.")}{" "}
          {visible?.visible?.connectdata?.IssueNo}
        </label>
        <div className="col-3">
          <button className="btn btn-sm btn-success ml-3" onClick={handleSave}>
            {t("Yes")}
          </button>
          <button className="btn btn-sm btn-success ml-4" onClick={handleSave}>
            {t("No")}
          </button>
        </div>
      </div>
    </>
  );
};
export default TDSDiscountModal;
