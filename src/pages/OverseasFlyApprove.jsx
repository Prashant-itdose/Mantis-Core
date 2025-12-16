import React, { useEffect, useState } from "react";
import { axiosInstances } from "../networkServices/axiosInstance";
import { apiUrls } from "../networkServices/apiEndpoints";
import { toast } from "react-toastify";
import Loading from "../components/loader/Loading";

const OverseasFlyApprove = ({ visible, setVisible, handleSearch }) => {
  // console.log("ID ID visible", visible);
  const [loading, setLoading] = useState(false);
  const handleApprove = () => {
    setLoading(true);
    axiosInstances
      .post(apiUrls.ApproveOrRejectOverseasTravel, {
        RequestId: Number(visible.showData.ID),
        ActionType: Number(1),
        Remarks: String(""),
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
export default OverseasFlyApprove;
