import React, { useState } from "react";
import Loading from "../../components/loader/Loading";
import { apiUrls } from "../../networkServices/apiEndpoints";
import { headers } from "../../utils/apitools";
import axios from "axios";
import { toast } from "react-toastify";
import { useCryptoLocalStorage } from "../../utils/hooks/useCryptoLocalStorage";
const AdvanceRequestFinalApprove = ({
  visible,
  setVisible,
  handleSearchAdvance,
}) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    Remarks: "",
  });
  const handleSelectChange = (e) => {
    const { name, value, checked, type } = e?.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? (checked ? "1" : "0") : value,
    });
  };
  const handleApprove = () => {
    setLoading(true);
    let form = new FormData();
    form.append("Id", useCryptoLocalStorage("user_Data", "get", "ID"));
    form.append(
      "CrmID",
      useCryptoLocalStorage("user_Data", "get", "CrmEmployeeID")
    );
    form.append(
      "LoginName",
      useCryptoLocalStorage("user_Data", "get", "realname")
    );
    form.append("Status", "FinalApprove");
    form.append("AdvanceReqID", visible?.showData?.ID);
    form.append("Remarks", formData?.Remarks || "");
    axios
      .post(apiUrls?.AdvanceAmount_Status_Update, form, { headers })
      .then((res) => {
        if (res?.data?.status === true) {
          toast.success(res?.data?.message);
          setLoading(false);
          setVisible(false);
          handleSearchAdvance();
        } else {
          toast.error(res?.data?.message);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };
  return (
    <>
      <div className="">
        <div className="row p-2">
          {/* <textarea
            type="text"
            respclass="col-md-12 col-12 col-sm-12"
            className=""
            placeholder="Remarks "
            id={"Remarks"}
            name="Remarks"
            value={formData?.Remarks}
            onChange={handleSelectChange}
            style={{ width: "95%", marginLeft: "7.5px", height: "55px" }}
          ></textarea> */}
          <span style={{ fontWeight: "bold", marginLeft: "10px" }}>
            Do you want to Final Approve this request?
          </span>
          <div className="col-sm-6">
            {loading ? (
              <Loading />
            ) : (
              <button
                className="btn btn-sm btn-success ml-2"
                onClick={handleApprove}
              >
                Yes
              </button>
            )}
            <button
              className="btn btn-sm btn-success ml-3"
              onClick={() => setVisible(false)}
            >
              No
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default AdvanceRequestFinalApprove;
