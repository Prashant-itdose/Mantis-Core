import React, { useEffect, useState } from "react";
import ReactSelect from "../components/formComponent/ReactSelect";
import Input from "../components/formComponent/Input";
import { axiosInstances } from "../networkServices/axiosInstance";
import { apiUrls } from "../networkServices/apiEndpoints";
import Heading from "../components/UI/Heading";
import DatePicker from "../components/formComponent/DatePicker";
import { useTranslation } from "react-i18next";

const OverseasFly = () => {
  const [t] = useTranslation();
  const [country, setCountry] = useState([]);
  const { VITE_DATE_FORMAT } = import.meta.env;
  const [formData, setFormData] = useState({
    Employee: "",
    ReportingManager: "",
    FromDate: new Date(),
    ToDate: new Date(),
    Country: "",
  });
  const [reporter, setReporter] = useState([]);
  const [assignto, setAssignedto] = useState([]);
  const getAssignTo = (value) => {
    axiosInstances
      .post(apiUrls.AssignTo_Select, {
        ProjectID: value,
      })
      .then((res) => {
        const assigntos = res?.data?.data?.map((item) => {
          return { label: item?.Name, value: item?.ID };
        });
        setAssignedto(assigntos);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getCountry = () => {
    axiosInstances
      .post(apiUrls?.GetCountry, {})
      .then((res) => {
        const countrys = res?.data.data.map((item) => {
          return { label: item?.NAME, value: item?.CountryID };
        });
        setCountry(countrys);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getReporter = () => {
    axiosInstances
      .post(apiUrls.GetReportingTo_Employee, {})

      .then((res) => {
        const reporters = res?.data.data.map((item) => {
          return { label: item?.NAME, value: item?.Employee_ID };
        });
        setReporter(reporters);
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
  const handleSelectChange = (e) => {
    const { name, value, checked, type } = e?.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? (checked ? 1 : 0) : value,
    });
  };
  const searchHandleChange = (e, index) => {
    const { name, value } = e?.target;
    setFormData({ ...formData, [name]: value });
  };
  const flyTHEAD = ["S.No.", ""];

  useEffect(() => {
    getAssignTo();
    getReporter();
    getCountry();
  }, []);
  return (
    <>
      <div className="card">
        <Heading isBreadcrumb={true} />
        <div className="row p-2">
          <ReactSelect
            name="Employee"
            respclass="col-xl-2 col-md-4 col-sm-6 col-12"
            placeholderName="Employee"
            dynamicOptions={assignto}
            value={formData?.Employee}
            handleChange={handleDeliveryChange}
          />
          {/* <ReactSelect
            name="ReportingManager"
            respclass="col-xl-2 col-md-4 col-sm-6 col-12"
            placeholderName="Reporting Manager"
            dynamicOptions={reporter}
            value={formData?.ReportingManager}
            handleChange={handleDeliveryChange}
          /> */}
          <ReactSelect
            name="Country"
            respclass="col-xl-2 col-md-4 col-sm-6 col-12"
            placeholderName="Country"
            dynamicOptions={country}
            value={formData?.Country}
            handleChange={handleDeliveryChange}
          />
          <DatePicker
            className="custom-calendar"
            id="FromDate"
            name="FromDate"
            lable={t("From Date")}
            placeholder={VITE_DATE_FORMAT}
            value={formData?.FromDate}
            respclass="col-xl-2 col-md-4 col-sm-6 col-12"
            handleChange={searchHandleChange}
            requiredClassName={"required-fields"}
          />
          <DatePicker
            className="custom-calendar"
            id="ToDate"
            name="ToDate"
            lable={t("To Date")}
            placeholder={VITE_DATE_FORMAT}
            value={formData?.ToDate}
            respclass="col-xl-2 col-md-4 col-sm-6 col-12"
            handleChange={searchHandleChange}
          />
          <button className="btn btn-sm btn-success ml-3">Save</button>
        </div>
      </div>

      <div className="card mt-2">
        <Heading
          title={<span className="font-weight-bold">Search Details</span>}
        />
        <div className="row p-2"></div>
      </div>
    </>
  );
};
export default OverseasFly;
