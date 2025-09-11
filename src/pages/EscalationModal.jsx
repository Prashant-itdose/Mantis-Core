import axios from "axios";
import React, { useEffect, useState } from "react";
import { apiUrls } from "../networkServices/apiEndpoints";
import { headers } from "../utils/apitools";
import ReactSelect from "../components/formComponent/ReactSelect";
import Loading from "../components/loader/Loading";
import { toast } from "react-toastify";
import { useCryptoLocalStorage } from "../utils/hooks/useCryptoLocalStorage";
const EscalationModal = ({ data }) => {

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    AllowSecEmail: "",
    AllowEscMatrix: "",
    Level1Employee1: "",
    Level2Employee1: "",
    Level3Employee1: "",
    Level1Employee2: "",
    Level2Employee2: "",
    Level3Employee2: "",
    Engineer1: "",
    Engineer2: "",
  });
  const [user, setUser] = useState([]);
  const handleSelectChange = (e) => {
    const { name, value, checked, type } = e?.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? (checked ? "1" : "0") : value,
    });
  };
  const getReporter = () => {
    let form = new FormData();
    form.append("ID", useCryptoLocalStorage("user_Data", "get", "ID")),
      axios
        .post(apiUrls?.Reporter_Select, form, { headers })
        .then((res) => {
          const reporters = res?.data.data.map((item) => {
            return { label: item?.NAME, value: item?.ID };
          });
          setUser(reporters);
        })
        .catch((err) => {
          console.log(err);
        });
  };
  const handleDeliveryChange = (name, e) => {
    const { value } = e;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleUpdateEscalation = () => {
    if (formData?.AllowEscMatrix == "") {
      toast.error("Please Select Allowesclationmatrix.");
    } else if (formData?.AllowSecEmail == "") {
      toast.error("Please Select AllowSecEmail.");
    } else if (formData?.Level1Employee1 == "") {
      toast.error("Please Select Level1Employee1.");
    } else if (formData?.Level2Employee1 == "") {
      toast.error("Please Select Level2Employee1.");
    } else if (formData?.Level3Employee1 == "") {
      toast.error("Please Select Level3Employee1.");
    } else {
      setLoading(true);
      let form = new FormData();
      form.append("ID", useCryptoLocalStorage("user_Data", "get", "ID")),
        form.append("LoginName", useCryptoLocalStorage("user_Data", "get", "realname") ),
        form.append("ProjectID", formData?.ProjectID  || data?.ProjectID);
      form.append("Allowesclationmatrix", formData?.AllowEscMatrix ?? "");
      form.append("AllowEngeenermail", formData?.AllowSecEmail ?? "");
      form.append("Engineer1", formData?.Engineer1 ?? "");
      form.append("Engineer2", formData?.Engineer2 ?? "");
      form.append("level1employee_1", formData?.Level1Employee1 ?? "");
      form.append("level2employee_1", formData?.Level2Employee1 ?? "");
      form.append("level3employee_1", formData?.Level3Employee1 ?? "");
      form.append("level1employee_2", formData?.Level1Employee2 ?? "");
      form.append("level2employee_2", formData?.Level2Employee2 ?? "");
      form.append("level3employee_2", formData?.Level3Employee2 ?? "");
      axios
        .post(apiUrls?.UpdateEscalation, form, { headers })
        .then((res) => {
          if (res?.data?.status == true) {
            toast.success(res?.data?.message);
            setLoading(false);
            setFormData({
              ...formData,
              AllowSecEmail: "",
              AllowEscMatrix: "",
              Level1Employee1: "",
              Level2Employee1: "",
              Level3Employee1: "",
              Level1Employee2: "",
              Level2Employee2: "",
              Level3Employee2: "",
              Engineer1: "",
              Engineer2: "",
            });
          } else {
            toast.error(res?.data?.message);
            setLoading(false);
          }
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }
  };

  const filldetails = () => {
    setFormData({
      ...formData,
      AllowSecEmail: data?.AllowEngeenermail,
      AllowEscMatrix: data?.Allowesclationmatrix,
      Level1Employee1: data?.level1employee_1,
      Level2Employee1: data?.level2employee_1,
      Level3Employee1: data?.level3employee_1,
      Level1Employee2: data?.level1employee_2,
      Level2Employee2: data?.level2employee_2,
      Level3Employee2: data?.level3employee_2,
      Engineer1: data?.Engineer1,
      Engineer2: data?.Engineer2,
      ProjectID: data?.Id,
    });
  };
  useEffect(() => {
    filldetails();
  }, []);

  useEffect(() => {
    getReporter();
  }, []);
  return (
    <>
      <div className="card p-2">
        <span style={{ fontWeight: "bold" }}>Project Name : {data?.NAME || data?.ProjectName}</span>
      </div>
      <div className="card border p-2">
        <div className="row">
          <div className="col-2">
            <div
              className="search-col"
              style={{
                display: "flex",
                marginRight: "auto",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <label className="switch" style={{ marginTop: "7px" }}>
                  <input
                    type="checkbox"
                    name="AllowSecEmail"
                    checked={formData?.AllowSecEmail == "1" ? true : false}
                    onChange={handleSelectChange}
                  />
                  <span className="slider"></span>
                </label>
                <span
                  className="sec-email-text"
                  style={{
                    marginLeft: "3px",
                    marginRight: "5px",
                    fontSize: "12px",
                  }}
                >
                  Allow Sec_Email
                </span>
              </div>
            </div>
          </div>
          <div className="col-10">
            {formData?.AllowSecEmail == true && (
              <>
                <div className="row">
                  <ReactSelect
                    name="Engineer1"
                    respclass="col-xl-3 col-md-4 col-sm-6 col-12"
                    placeholderName="Level 1"
                    dynamicOptions={user}
                    value={formData?.Engineer1}
                    handleChange={handleDeliveryChange}
                  />
                  <ReactSelect
                    name="Engineer2"
                    respclass="col-xl-3 col-md-4 col-sm-6 col-12"
                    placeholderName="Level 2"
                    dynamicOptions={user}
                    value={formData?.Engineer2}
                    handleChange={handleDeliveryChange}
                  />
                </div>
              </>
            )}
          </div>
        </div>
        <div className="row">
          <div className="col-2">
            <div
              className="search-col"
              style={{
                display: "flex",
                marginRight: "auto",
              }}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <label className="switch" style={{ marginTop: "7px" }}>
                  <input
                    type="checkbox"
                    name="AllowEscMatrix"
                    checked={formData?.AllowEscMatrix == "1" ? true : false}
                    onChange={handleSelectChange}
                  />
                  <span className="slider"></span>
                </label>
                <span
                  style={{
                    marginLeft: "3px",
                    marginRight: "5px",
                    fontSize: "12px",
                  }}
                >
                  Allow Esc_Matrix
                </span>
              </div>
            </div>
          </div>
          <div className="col-10">
            {formData?.AllowEscMatrix == true && (
              <>
                <div className="row">
                  <ReactSelect
                    style={{ marginLeft: "20px" }}
                    name="Level1Employee1"
                    respclass="col-xl-3 col-md-4 col-sm-6 col-12"
                    placeholderName="Level 1"
                    dynamicOptions={user}
                    value={formData?.Level1Employee1}
                    handleChange={handleDeliveryChange}
                  />
                  <ReactSelect
                    name="Level1Employee2"
                    respclass="col-xl-3 col-md-4 col-sm-6 col-12"
                    placeholderName="Level 1"
                    dynamicOptions={user}
                    value={formData?.Level1Employee2}
                    handleChange={handleDeliveryChange}
                  />
                </div>
                <div className="row">
                  <ReactSelect
                    style={{ marginLeft: "20px" }}
                    name="Level2Employee1"
                    respclass="col-xl-3 col-md-4 col-sm-6 col-12"
                    placeholderName="Level 2"
                    dynamicOptions={user}
                    value={formData?.Level2Employee1}
                    handleChange={handleDeliveryChange}
                  />
                  <ReactSelect
                    name="Level2Employee2"
                    respclass="col-xl-3 col-md-4 col-sm-6 col-12"
                    placeholderName="Level 2"
                    dynamicOptions={user}
                    value={formData?.Level2Employee2}
                    handleChange={handleDeliveryChange}
                  />
                </div>
                <div className="row">
                  <ReactSelect
                    style={{ marginLeft: "20px" }}
                    name="Level3Employee1"
                    respclass="col-xl-3 col-md-4 col-sm-6 col-12"
                    placeholderName="Level 3"
                    dynamicOptions={user}
                    value={formData?.Level3Employee1}
                    handleChange={handleDeliveryChange}
                  />
                  <ReactSelect
                    name="Level3Employee2"
                    respclass="col-xl-3 col-md-4 col-sm-6 col-12"
                    placeholderName="Level 3"
                    dynamicOptions={user}
                    value={formData?.Level3Employee2}
                    handleChange={handleDeliveryChange}
                  />
                </div>
              </>
            )}
          </div>
        </div>
        {loading ? (
          <Loading />
        ) : (
          <div className="ml-3 mt-1">
            <button
              className="btn btn-sm btn-success"
              onClick={handleUpdateEscalation}
            >
              Update
            </button>
          </div>
        )}
      </div>
    </>
  );
};
export default EscalationModal;
