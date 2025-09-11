import React from "react";
import { toast } from "react-toastify";
import { apiUrls } from "../networkServices/apiEndpoints";
import { headers } from "../utils/apitools";
import axios from "axios";
import { useCryptoLocalStorage } from "../utils/hooks/useCryptoLocalStorage";

const ModuleDeleteModal = ({ visible, setVisible }) => {
  console.log("visible", visible);

  const handleRemove = () => {
    let form = new FormData();
    form.append("ID", useCryptoLocalStorage("user_Data", "get", "ID")),
      form.append("LoginName", useCryptoLocalStorage("user_Data", "get", "realname") ),
      form.append("ProjectID", visible?.showData[0]?.ProjectID),
      form.append("ModulePrimaryID", "-1"),
      form.append("ActionType", "DeleteModule"),
      axios
        .post(apiUrls?.ProjectMasterUpdate, form, { headers })
        .then((res) => {
          toast.success(res?.data?.message);
          setVisible(false);
        })
        .catch((err) => {
          console.log(err);
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
          Do you want to delete all items in the ModuleList?
          </h1>

          <button className="btn btn-sm btn-danger ml-4" onClick={handleRemove}>
            Yes
          </button>
        </div>
      </div>
    </>
  );
};

export default ModuleDeleteModal;
