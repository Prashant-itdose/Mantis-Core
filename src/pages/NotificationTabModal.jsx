import React, { useEffect, useState } from "react";
import { headers } from "../utils/apitools";
import axios from "axios";
import { toast } from "react-toastify";
import { apiUrls } from "../networkServices/apiEndpoints";
import { useCryptoLocalStorage } from "../utils/hooks/useCryptoLocalStorage";

const NotificationTabModal = ({data}) => {
 
  const [formData, setFormData] = useState({
    AllowNotification: "0",
    AllowUrlValid: "0",
    AllowRateValid: "0",
    AllowChangePassword: "0",
    AllowOnlineLab: "0",
    AllowDoctorID: "0",
    AllowNewsLetter: "0",
  });

  const handleSelectChange = (e) => {
    const { name, checked } = e.target;
    const value = checked ? "1" : "0";

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    getNotficationModal({ ...formData, [name]: value });
  };

  const getNotficationModal = (updatedFormData) => {
    let form = new FormData();
    form.append("ID", useCryptoLocalStorage("user_Data", "get", "ID"));
    form.append("LoginName", useCryptoLocalStorage("user_Data", "get", "realname") );
    form.append("ProjectID", data?.Id || data?.ProjectID);
    form.append(
      "AllowAutobackupNotification",
      updatedFormData.AllowNotification
    );
    form.append("AllowURLValidation", updatedFormData.AllowUrlValid);
    form.append("AllowDoctorIDValidation", updatedFormData.AllowDoctorID);
    form.append("AllowRateValidation", updatedFormData.AllowRateValid);
    form.append("AllowChangePassword", updatedFormData.AllowChangePassword);
    form.append("AllowOnlineLab", updatedFormData.AllowOnlineLab);
    form.append("AllowNewsLetter", updatedFormData.AllowNewsLetter);

    axios
      .post(apiUrls?.UpdateNotification, form, { headers })
      .then((res) => {
        if(res?.data?.success==true){
          toast.success(res?.data?.message);
        }else{
          toast.error(res?.data?.message);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <>
      <div className="card p-2">
        <span style={{ fontWeight: "bold" }}>
          Project Name : {data?.NAME || data?.ProjectName}
        </span>
      </div>

      <div className="card LocalityCard border p-2">
        <div className="row">
          <div
            className="search-col"
            style={{ marginLeft: "8px", display: "flex", marginRight: "auto" }}
          >
            {[
              { name: "AllowNotification", label: "Allow Notification" },
              { name: "AllowUrlValid", label: "Allow Url Valid" },
              { name: "AllowRateValid", label: "Allow Rate Valid" },
              { name: "AllowChangePassword", label: "Allow Change Password" },
              { name: "AllowOnlineLab", label: "Allow Online Lab" },
              { name: "AllowDoctorID", label: "Allow DoctorID" },
              { name: "AllowNewsLetter", label: "Allow NewsLetter" },
            ].map((item, idx) => (
              <div
                key={idx}
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginLeft: idx !== 0 ? "15px" : "0px",
                }}
              >
                <label className="switch" style={{ marginTop: "7px" }}>
                  <input
                    type="checkbox"
                    name={item.name}
                    checked={formData[item.name] === "1"}
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
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
        {/* <div className="row">
          <div
            className="search-col"
            style={{ marginLeft: "8px", display: "flex", marginRight: "auto" }}
          >
            {[
              { name: "AllowDoctorID", label: "Allow DoctorID" },
              { name: "AllowNewsLetter", label: "Allow NewsLetter" },
            ].map((item, idx) => (
              <div
                key={idx}
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginLeft: idx !== 0 ? "30px" : "0px",
                }}
              >
                <label className="switch" style={{ marginTop: "7px" }}>
                  <input
                    type="checkbox"
                    name={item.name}
                    checked={formData[item.name] === "1"}
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
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div> */}
      </div>
    </>
  );
};

export default NotificationTabModal;
