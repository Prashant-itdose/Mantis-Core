import React, { useEffect, useState } from "react";
import Heading from "../../components/UI/Heading";
import Tables from "../../components/UI/customTable";
import ReactSelect from "../../components/formComponent/ReactSelect";
import { apiUrls } from "../../networkServices/apiEndpoints";
import { headers } from "../../utils/apitools";
import axios from "axios";
import { toast } from "react-toastify";
import { isContentEditable } from "@testing-library/user-event/dist/cjs/utils/index.js";
import { useCryptoLocalStorage } from "../../utils/hooks/useCryptoLocalStorage";

const ManageRoleEmployeeMaster = (ele) => {
  const [roleMaster, setRoleMaster] = useState([]);
  const [formData, setFormData] = useState({
    IsActive: "",
    RoleMaster: "",
  });
  const handleSelectChange = (e) => {
    const { name, value, checked, type } = e?.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? (checked ? "1" : "0") : value,
    });
  };
  const [tableData, setTableData] = useState([
    {
      "S.No.": 1,
      RoleName: "Mantis",
    },
  ]);

  const newRoleTHEAD = ["S.No.", "Role Name", "Remove"];
  const handleDeliveryChange = (name, e) => {
    const { value } = e;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const bindRole = () => {
    let form = new FormData();
    form.append("ID",  useCryptoLocalStorage("user_Data", "get", "ID")),
      form.append("LoginName", useCryptoLocalStorage("user_Data", "get", "realname")),
      form.append("RoleName", ""),
      axios
        .post(apiUrls?.SearchRole, form, { headers })
        .then((res) => {
          const poc3s = res?.data.data.map((item) => {
            return { label: item?.RoleName, value: item?.ID };
          });
          setRoleMaster(poc3s);
        })
        .catch((err) => {
          console.log(err);
        });
  };
  const addRole = (item) => {
    let form = new FormData();
    form.append("ID",  useCryptoLocalStorage("user_Data", "get", "ID")),
      form.append("LoginName", useCryptoLocalStorage("user_Data", "get", "realname")),
      form.append("UserID", ele?.visible?.showData?.id),
      form.append("Status", "Add"),
      form.append("TargetUserID", ""),
      form.append("RoleID", formData?.RoleMaster),
      axios
        .post(apiUrls?.UserVsRoleMapping, form, { headers })
        .then((res) => {
          toast.success(res?.data?.message);
          handleSearch();
        })
        .catch((err) => {
          console.log(err);
        });
  };
  const removeRole = (item) => {
    console.log("hhhh", item);
    let form = new FormData();
    form.append("ID",  useCryptoLocalStorage("user_Data", "get", "ID")),
      form.append("LoginName", useCryptoLocalStorage("user_Data", "get", "realname")),
      form.append("UserID", ele?.visible?.showData?.id),
      form.append("Status", "Remove"),
      form.append("TargetUserID", ""),
      form.append("RoleID", item?.RoleID),
      axios
        .post(apiUrls?.UserVsRoleMapping, form, { headers })
        .then((res) => {
          toast.success(res?.data?.message);
          handleSearch();
        })
        .catch((err) => {
          console.log(err);
        });
  };
  const handleSearch = () => {
    let form = new FormData();
    form.append("ID",  useCryptoLocalStorage("user_Data", "get", "ID"));
    form.append("LoginName", useCryptoLocalStorage("user_Data", "get", "realname"));
    form.append("UserID", ele?.visible?.showData?.id);

    axios
      .post(apiUrls?.UserVsRole_Select, form, {
        headers,
      })
      .then((res) => {
        const data = res?.data?.data;
        setTableData(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const transferRole = () => {
    let form = new FormData();
    form.append("ID",  useCryptoLocalStorage("user_Data", "get", "ID")),
      form.append("LoginName", useCryptoLocalStorage("user_Data", "get", "realname")),
      form.append("UserID", ele?.visible?.showData?.id),
      form.append("Status", "Transfer"),
      form.append("TargetUserID", ""),
      form.append("RoleID", formData?.RoleMaster),
      axios
        .post(apiUrls?.UserVsRoleMapping, form, { headers })
        .then((res) => {
          toast.success(res?.data?.message);
          handleSearch();
        })
        .catch((err) => {
          console.log(err);
        });
  };
  useEffect(() => {
    bindRole();
    handleSearch();
  }, []);
  return (
    <>
      <div className="row ml-2">
        <span style={{ fontWeight: "bold" }}>
          Employee Name: &nbsp; {ele?.visible?.showData?.realname}
        </span>
      </div>
      <div className="row m-2">
        <ReactSelect
          respclass="col-xl-4 col-md-4 col-sm-6 col-12"
          name="RoleMaster"
          placeholderName="Role"
          dynamicOptions={roleMaster}
          handleChange={handleDeliveryChange}
          value={formData.RoleMaster}
        />
        <div className="col-3 d-flex">
          <button className="btn btn-sm btn-success" onClick={addRole}>
            Add Role
          </button>
          {/* <button
            className="btn btn-sm btn-success ml-3"
            onClick={transferRole}
          >
            Transfer Role
          </button> */}
        </div>
      </div>
      {tableData?.length > 0 && (
        <div className="card">
          <Heading title={"Search Details"} />
          <Tables
            thead={newRoleTHEAD}
            tbody={tableData?.map((ele, index) => ({
              "S.No.": index + 1,
              "Role Name": ele?.RoleName,
              Remove: (
                <i
                  className="fa fa-remove"
                  style={{ color: "red" }}
                  onClick={() => {
                    removeRole(ele);
                  }}
                >
                  X{" "}
                </i>
              ),
            }))}
            tableHeight={"tableHeight"}
          />
          {/* <div className="col-2">
          <button className="btn btn-sm btn-success m-1">Save</button>
        </div> */}
        </div>
      )}
    </>
  );
};

export default ManageRoleEmployeeMaster;
