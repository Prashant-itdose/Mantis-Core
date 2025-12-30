import React, { useEffect, useState } from "react";
import Heading from "../../components/UI/Heading";
import Tables from "../../components/UI/customTable";
import ReactSelect from "../../components/formComponent/ReactSelect";
import { apiUrls } from "../../networkServices/apiEndpoints";
import { toast } from "react-toastify";
import { axiosInstances } from "../../networkServices/axiosInstance";
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
  const [tableData, setTableData] = useState([]);

  const newRoleTHEAD = ["S.No.", "Role Name", "Remove"];

  const handleDeliveryChange = (name, e) => {
    const { value } = e;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const RoleID = useCryptoLocalStorage("user_Data", "get", "RoleID");
  const bindRole = () => {
    axiosInstances
      .post(apiUrls?.SearchRole, {
        RoleName: "",
      })
      .then((res) => {
        const excludedRoles = ["Accounts", "HR", "UAT", "HR Executive"];
        const poc3s = res?.data?.data
          ?.filter((item) => {
            if (RoleID == 5 || RoleID == 3) {
              return true;
            }
            return item?.RoleName && !excludedRoles?.includes(item?.RoleName);
          })
          .map((item) => {
            return { label: item?.RoleName, value: item?.ID };
          });

        setRoleMaster(poc3s);
      })
      .catch((err) => {
        console.error("Error fetching roles:", err);
      });
  };

  const addRole = (item) => {
    axiosInstances
      .post(apiUrls?.UserVsRoleMapping, {
        Status: "Add",
        TargetUserID: Number(ele?.visible?.showData?.id),
        RoleID: Number(formData?.RoleMaster),
      })
      .then((res) => {
        toast.success(res?.data?.message);
        handleSearch();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const removeRole = (item) => {
    axiosInstances
      .post(apiUrls?.UserVsRoleMapping, {
        Status: "Remove",
        TargetUserID: Number(ele?.visible?.showData?.id),
        RoleID: Number(item?.RoleID),
      })
      .then((res) => {
        toast.success(res?.data?.message);
        handleSearch();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleSearch = () => {
    axiosInstances
      .post(apiUrls?.UserVsRole_Select, {
        UserID: Number(ele?.visible?.showData?.id),
      })
      .then((res) => {
        const data = res?.data?.data;
        setTableData(data);
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
        </div>
      )}
    </>
  );
};

export default ManageRoleEmployeeMaster;
