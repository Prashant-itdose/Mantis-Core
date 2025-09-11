import React, { useState } from "react";
import Heading from "../components/UI/Heading";
import { useTranslation } from "react-i18next";
import ShortBreakLogModal from "./ShortBreakLogModal";

const ShortLongBreakModal = () => {
  const [t] = useTranslation();
  const [formData, setFormData] = useState({
    Short: "",
    Long: "",
  });
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
        <Heading
          title={
            <div style={{display:"flex",justifyContent:"space-between"}}>
              <div className="search-col" style={{ marginLeft: "5px" }}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <label className="switch" style={{ marginTop: "7px" }}>
                <input
                  type="checkbox"
                  name="Short"
                  checked={formData?.Short ? 1 : 0}
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
                {t("Short Attendance")}
              </span>
            </div>
          </div>

          {formData?.Short && <ShortBreakLogModal />}
       
          <div className="search-col" style={{ marginLeft: "8px" }}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <label className="switch" style={{ marginTop: "7px" }}>
                <input
                  type="checkbox"
                  name="Long"
                  checked={formData?.Long ? 1 : 0}
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
                {t("Long Break")}
              </span>
            </div>
          </div>
            </div>
          }
        />
        <div className="row p-2">
         
        </div>
      </div>
    </>
  );
};

export default ShortLongBreakModal;
