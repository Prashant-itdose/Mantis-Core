import React, { useState } from "react";
import { toast } from "react-toastify";
import { apiUrls } from "../networkServices/apiEndpoints";
import { headers } from "../utils/apitools";
import axios from "axios";
import Loading from "../components/loader/Loading";
import { useCryptoLocalStorage } from "../utils/hooks/useCryptoLocalStorage";

const MachineDeleteModal = ({ visible, setVisible }) => {
//   console.log("visible", visible);
  const [loading, setLoading] = useState(false);

  const handleRemove = () => {
    setLoading(true);
    let form = new FormData();
    form.append("ID", useCryptoLocalStorage("user_Data", "get", "ID")),
      form.append("LoginName", useCryptoLocalStorage("user_Data", "get", "realname") ),
      form.append("ProjectID", visible.showData[0]?.ProjectID),
      form.append("ActionType", "DeleteMachine"),
      form.append("MachinePrimaryID", "-1"),
      axios
        .post(apiUrls?.ProjectMasterUpdate, form, { headers })
        .then((res) => {
          if (res?.data?.success === true) {
            toast.success(res?.data?.message);
            setLoading(false);
            setVisible(false);
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
      {/* <div className="card p-2">
        <span style={{ fontWeight: "bold" }}>
          Project Name : {""}
        </span>
      </div> */}
      <div className="card p-2">
        <div className="row">
          <h1 style={{ fontWeight: "bold", marginLeft: "10px" }}>
            Do you want to delete all items in the MachineList?
          </h1>

          {loading ? (
            <Loading />
          ) : (
            <button
              className="btn btn-sm btn-danger ml-4"
              onClick={handleRemove}
            >
              Yes
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default MachineDeleteModal;
