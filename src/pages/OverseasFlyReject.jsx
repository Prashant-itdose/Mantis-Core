import React, { useState } from "react";
import { axiosInstances } from "../networkServices/axiosInstance";
import { apiUrls } from "../networkServices/apiEndpoints";
import { toast } from "react-toastify";
import Loading from "../components/loader/Loading";
import Input from "../components/formComponent/Input";

const OverseasFlyReject = ({ visible, setVisible, handleSearch }) => {
//   console.log("ID ID", visible);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    Reason: "",
  });
  const handleReject = () => {
    if (!formData?.Reason) {
      toast.error("Please Enter Reject Reason.");
      return;
    }
    setLoading(true);
    axiosInstances
      .post(apiUrls.ApproveOrRejectOverseasTravel, {
        RequestId: Number(visible.showData.ID),
        ActionType: Number(2),
        Remarks: String(formData?.Reason),
      })
      .then((res) => {
        if (res.data.success === true) {
          toast.success(res.data.message);
          setLoading(false);
          setVisible(false);
          handleSearch();
        } else {
          toast.error(res.data.message);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleSelectChange = (e) => {
    const { name, value, checked, type } = e?.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? (checked ? 1 : 0) : value,
    });
  };
  return (
    <>
      <div className="card p-2">
        <span style={{ fontWeight: "bold" }}>
          Employee Name : {visible?.showData?.EmployeeName} &nbsp; &nbsp; &nbsp;
          &nbsp; &nbsp; &nbsp;
          {/* Date :{" "}
          {new Date(visible?.showData?.DATE)
            .toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })
            .replace(/ /g, " ")}{" "}
          &nbsp; */}
        </span>
      </div>
      <div className="card">
        <div className="row p-2">
          {/* <span style={{ fontWeight: "bold", marginLeft: "10px" }}>
            Do you want to Reject this request?
          </span> */}

          <Input
            type="text"
            className="form-control required-fields"
            id="Reason"
            name="Reason"
            lable="Reject Reason"
            placeholder=" "
            onChange={handleSelectChange}
            value={formData?.Reason}
            respclass="col-xl-9 col-md-4 col-sm-4 col-12"
          />

          <div className="col-sm-2">
            {loading ? (
              <Loading />
            ) : (
              <button
                className="btn btn-sm btn-success ml-2"
                onClick={handleReject}
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
export default OverseasFlyReject;
