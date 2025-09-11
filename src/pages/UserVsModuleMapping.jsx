import React, { useEffect, useState } from "react";
import Heading from "../components/UI/Heading";
import ReactSelect from "../components/formComponent/ReactSelect";
import { useTranslation } from "react-i18next";
import { apiUrls } from "../networkServices/apiEndpoints";
import axios from "axios";
import { headers } from "../utils/apitools";
import { useCryptoLocalStorage } from "../utils/hooks/useCryptoLocalStorage";
const UserVsModuleMapping = () => {
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [reporter, setReporter] = useState([]);
  const [moduleName, setModuleName] = useState([]);
  const [formData, setFormData] = useState({
    User: "",
    ModuleName: "",
  });
  const [t] = useTranslation();
  const getModule = (proj) => {
    let form = new FormData();
    form.append("ID", useCryptoLocalStorage("user_Data", "get", "ID")),
      form.append("RoleID", useCryptoLocalStorage("user_Data", "get", "RoleID")),
      form.append("ProjectID", "0"),
      form.append("IsActive", "1"),
      form.append("IsMaster", "2"),
      axios
        .post(apiUrls?.Module_Select, form, { headers })
        .then((res) => {
          const poc3s = res?.data.data.map((item) => {
            return { label: item?.ModuleName, value: item?.ModuleID };
          });
          setModuleName(poc3s);
        })
        .catch((err) => {
          console.log(err);
        });
  };

  const handleDeliveryChange = (name, e) => {
    const { value } = e;
    if (name == "User") {
      setFormData({ ...formData, [name]: value });
      getUserVsProject_Select(value);
    }
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const getReporter = () => {
    let form = new FormData();
    form.append("ID", useCryptoLocalStorage("user_Data", "get", "ID")),
      form.append("RoleID", useCryptoLocalStorage("user_Data", "get", "RoleID")),
      form.append("IsMaster", "1"),
      axios
        .post(apiUrls?.Reporter_Select, form, { headers })
        .then((res) => {
          const reporters = res?.data.data.map((item) => {
            return { label: item?.NAME, value: item?.ID };
          });
          setReporter(reporters);
        })
        .catch((err) => {
          console.log(err);
        });
  };

  useEffect(() => {
    getReporter();
    getModule();
  }, []);
  return (
    <>
      <div className="card">
        <Heading isBreadcrumb={true} />
        <div className="row p-2">
          <ReactSelect
            name="User"
            respclass="col-xl-2 col-md-4 col-sm-6 col-12"
            placeholderName="User"
            dynamicOptions={reporter}
            value={formData?.User}
            handleChange={handleDeliveryChange}
          />

          <ReactSelect
            respclass="col-xl-2 col-md-4 col-sm-6 col-12 mr-1"
            name="ModuleName"
            placeholderName={t("ModuleName")}
            dynamicOptions={moduleName}
            value={formData?.ModuleName}
            handleChange={handleDeliveryChange}
          />

          <button className="btn btn-sm btn-primary ml-4">Add Module</button>
          <button className="btn btn-sm btn-primary ml-4">Transfer Module</button>

        </div>
      </div>
    </>
  );
};
export default UserVsModuleMapping;
