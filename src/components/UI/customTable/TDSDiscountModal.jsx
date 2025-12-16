
import React from "react";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { axiosInstances } from "../../../networkServices/axiosInstance";
import { apiUrls } from "../../../networkServices/apiEndpoints";

const TDSDiscountModal = ({ visible, handleSave}) => {
  const [t] = useTranslation();
  // const handleSave = () => {
   
  // };
  return (
    <>
      <div className="row  m-2">
        <label>
          {t("Do you want to adjust amount against TDS.")}{" "}
          {visible?.visible?.connectdata?.IssueNo}
        </label>
        <div className="col-3">
          <button className="btn btn-sm btn-success ml-3" onClick={()=>handleSave(1)}>
            {t("Yes")}
          </button>
          <button className="btn btn-sm btn-success ml-4" onClick={()=>handleSave(0)}>
            {t("No")}
          </button>
        </div>
      </div>
    </>
  );
};
export default TDSDiscountModal;
