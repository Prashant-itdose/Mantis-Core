import React, { useState } from "react";
import Heading from "../components/UI/Heading";
import ReactSelect from "../components/formComponent/ReactSelect";

const DashboardConfiguration = () => {
  const [dashboard, setDashboard] = useState([]);
  const [formData, setFormData] = useState({
    Dashboard: "",
    IsTitle: "",
  });
  const handleDeliveryChange = (name, e) => {
    const { value } = e;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleCheckBox = (e) => {
    const { name, value, checked, type } = e?.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? (checked ? 1 : 0) : value,
    });
  };
  return (
    <>
      <div className="card">
        <Heading title={"Dashboard Configuration"} isBreadcrumb={true} />
        <div className="row m-2">
          <ReactSelect
            respclass="col-xl-2 col-md-4 col-sm-6 col-12"
            name="Dashboard"
            placeholderName="Dashboard"
            dynamicOptions={dashboard}
            value={formData?.Dashboard}
            handleChange={handleDeliveryChange}
          />
          <div className="search-col" style={{ marginLeft: "8px" }}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <label className="switch" style={{ marginTop: "7px" }}>
                <input
                  type="checkbox"
                  name="IsTitle"
                  checked={formData?.IsTitle ? 1 : 0}
                  onChange={handleCheckBox}
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
                IsTitle
              </span>
            </div>
          </div>
          <button className="btn btn-sm btn-primary ml-4">Save</button>
        </div>
      </div>
    </>
  );
};
export default DashboardConfiguration;
