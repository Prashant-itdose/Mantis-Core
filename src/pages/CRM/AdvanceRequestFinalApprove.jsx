import React, { useState } from "react";
import Loading from "../../components/loader/Loading";
import { apiUrls } from "../../networkServices/apiEndpoints";
import { toast } from "react-toastify";
import { useCryptoLocalStorage } from "../../utils/hooks/useCryptoLocalStorage";
import { axiosInstances } from "../../networkServices/axiosInstance";

const AdvanceRequestFinalApprove = ({
  visible,
  setVisible,
  handleSearchAdvance,
}) => {
  const [loading, setLoading] = useState(false);

  const handleApprove = () => {
    setLoading(true);
    axiosInstances
      .post(apiUrls.AdvanceAmount_Status_Update, {
        Status: String("FinalApprove"),
        AdvanceReqID: Number(visible?.showData?.ID),
        Remarks: String(""),
        CrmEmpID: String(
          useCryptoLocalStorage("user_Data", "get", "CrmEmployeeID")
        ),
      })
      .then((res) => {
        if (res?.data?.success === true) {
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
