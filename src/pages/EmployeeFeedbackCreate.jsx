import React, { useEffect, useState } from "react";
import ReactSelect from "../components/formComponent/ReactSelect";
import { useCryptoLocalStorage } from "../utils/hooks/useCryptoLocalStorage";
import axios from "axios";
import { apiUrls } from "../networkServices/apiEndpoints";
import { headers } from "../utils/apitools";
import { toast } from "react-toastify";
import Loading from "../components/loader/Loading";
import { useTranslation } from "react-i18next";
import Input from "../components/formComponent/Input";
const EmployeeFeedbackCreate = (showData) => {
  //   console.log("showData", showData);
  const ReportingManager = useCryptoLocalStorage(
    "user_Data",
    "get",
    "IsReportingManager"
  );

  const [loading, setLoading] = useState(false);
  const [assignto, setAssignedto] = useState([]);
  const [formData, setFormData] = useState({
    Employee: "0",
    QuestionID: "",
    Question: "",
  });
  const [t] = useTranslation();

  const getEmployee = () => {
    let form = new FormData();
    form.append(
      "CrmEmployeeID",
      useCryptoLocalStorage("user_Data", "get", "CrmEmployeeID")
    ),
      form.append(
        "RoleID",
        useCryptoLocalStorage("user_Data", "get", "RoleID")
      ),
      axios
        // .post(apiUrls?.AssignTo_Select, form, { headers })
        .post(apiUrls?.EmployeeFeebackBind, form, { headers })
        .then((res) => {
          const assigntos = res?.data.data.map((item) => {
            return { label: item?.EmployeeName, value: item?.Employee_ID };
          });
          setAssignedto(assigntos);
        })
        .catch((err) => {
          console.log(err);
        });
  };
  const handleFeedback = () => {
    setLoading(true);
    let form = new FormData();
    form.append("ID", useCryptoLocalStorage("user_Data", "get", "ID")),
      form.append(
        "LoginName",
        useCryptoLocalStorage("user_Data", "get", "realname")
      ),
      form.append("CrmEmployeeID", formData.Employee);
    axios
      .post(apiUrls?.CreateEmployeeFeedback, form, { headers })
      .then((res) => {
        if (res?.data?.status === true) {
          toast.success(res?.data?.message);
          // setFormData({
          //   Employee: "",
          //   QuestionID: "",
          //   Question: "",
          // });
          showData?.setVisible(false);
          showData?.handleSearchList();

          setLoading;
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
  const handleDeliveryChange = (name, e) => {
    const { value } = e;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSelectChange = (e) => {
    const { name, value, checked, type } = e?.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? (checked ? 1 : 0) : value,
    });
  };

  useEffect(() => {
    getEmployee();
  }, []);
  return (
    <>
      <div className="card">
        <div className="row p-2">
          <ReactSelect
            respclass="col-xl-7 col-md-4 col-sm-6 col-12"
            name="Employee"
            placeholderName={t("Employee")}
            dynamicOptions={[{ label: "Select", value: "0" }, ...assignto]}
            handleChange={handleDeliveryChange}
            value={formData?.Employee}
          />
          {/* <Input
            type="text"
            className="form-control"
            id="QuestionID"
            name="QuestionID"
            lable="QuestionID"
            placeholder=" "
            onChange={handleSelectChange}
            value={formData?.QuestionID}
            respclass="col-xl-2 col-md-4 col-sm-4 col-12"
          /> */}
          {/* <Input
            type="text"
            className="form-control"
            id="Question"
            name="Question"
            lable="Question"
            placeholder=" "
            onChange={handleSelectChange}
            value={formData?.Question}
            respclass="col-xl-6 col-md-4 col-sm-4 col-12"
          /> */}
          {loading ? (
            <Loading />
          ) : (
            <button
              className="btn btn-sm btn-success ml-3"
              onClick={handleFeedback}
            >
              Save
            </button>
          )}
        </div>
      </div>
    </>
  );
};
export default EmployeeFeedbackCreate;
