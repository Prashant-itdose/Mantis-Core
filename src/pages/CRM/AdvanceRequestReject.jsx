import React, { useState } from "react";
import Loading from "../../components/loader/Loading";
import { apiUrls } from "../../networkServices/apiEndpoints";
import { toast } from "react-toastify";
import { useCryptoLocalStorage } from "../../utils/hooks/useCryptoLocalStorage";
import { axiosInstances } from "../../networkServices/axiosInstance";
const AdvanceRequestReject = ({ visible, setVisible, handleSearchAdvance }) => {
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
  const handleReject = () => {
    if (!formData?.Remarks) {
      toast.error("Please enter remarks for rejection.");
      return;
    }
    setLoading(true);
    axiosInstances
      .post(apiUrls.AdvanceAmount_Status_Update, {
        Status: String("Reject"),
        AdvanceReqID: Number(visible?.showData?.ID),
        Remarks: String(formData?.Remarks || ""),
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
        <div className="row m-2">
          <textarea
            type="text"
            respclass="col-md-12 col-12 col-sm-12"
            className=""
            placeholder="Remarks "
            id={"Remarks"}
            name="Remarks"
            value={formData?.Remarks}
            onChange={handleSelectChange}
            style={{ width: "95%", marginLeft: "7.5px", height: "45px" }}
          ></textarea>
          <div className="col mt-2">
            {loading ? (
              <Loading />
            ) : (
              <button className="btn btn-sm btn-danger" onClick={handleReject}>
                Yes
              </button>
            )}
            <button
              className="btn btn-sm btn-danger ml-4"
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
export default AdvanceRequestReject;
