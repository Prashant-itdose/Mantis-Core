import React, { useState } from "react";
import { toast } from "react-toastify";
import { apiUrls } from "../networkServices/apiEndpoints";
import { headers } from "../utils/apitools";
import axios from "axios";
import Loading from "../components/loader/Loading";
import { useCryptoLocalStorage } from "../utils/hooks/useCryptoLocalStorage";

const UserDeleteModal = ({ visible, setVisible }) => {
  console.log("visible", visible);
  const [loading, setLoading] = useState(false);
  const handleRemove = () => {
    setLoading(true);
    let form = new FormData();
    form.append("ID", useCryptoLocalStorage("user_Data", "get", "ID")),
      form.append("RoleID", useCryptoLocalStorage("user_Data", "get", "RoleID")),
      form.append("LoginName", useCryptoLocalStorage("user_Data", "get", "realname") ),
      form.append("ProjectID", visible?.data?.Id),
      form.append("EmployeeID", ""),
      form.append("ActionType", "DeleteUserMapping"),
      axios
        .post(apiUrls?.ProjectMasterUpdate, form, { headers })
        .then((res) => {
          if (res?.data?.status === true) {
            toast.success(res?.data?.message);
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
            Do you want to delete all items in the UserMapping List?
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

export default UserDeleteModal;
