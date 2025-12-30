import React, { useEffect, useState } from "react";
import ReactSelect from "../components/formComponent/ReactSelect";
import Input from "../components/formComponent/Input";
import { axiosInstances } from "../networkServices/axiosInstance";
import { apiUrls } from "../networkServices/apiEndpoints";
import Heading from "../components/UI/Heading";
import DatePicker from "../components/formComponent/DatePicker";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useCryptoLocalStorage } from "../utils/hooks/useCryptoLocalStorage";
import moment from "moment";
import Loading from "../components/loader/Loading";

const OverseasFly = () => {
  const ReportingManager = useCryptoLocalStorage(
    "user_Data",
    "get",
    "IsReportingManager"
  );
  const IsEmployee = useCryptoLocalStorage("user_Data", "get", "realname");
  const [t] = useTranslation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [country, setCountry] = useState([]);
  const { VITE_DATE_FORMAT } = import.meta.env;
  const [formData, setFormData] = useState({
    Employee: useCryptoLocalStorage("user_Data", "get", "CrmEmployeeID")
      ? useCryptoLocalStorage("user_Data", "get", "CrmEmployeeID")
      : "",
    FromDate: new Date(),
    ToDate: new Date(),
    Country: "",
    Remark: "",
  });

  const [assignto, setAssignedto] = useState([]);
  const getAssignTo = () => {
    axiosInstances
      .post(apiUrls.EmployeeBind, {
        CrmEmployeeID: Number(
          useCryptoLocalStorage("user_Data", "get", "CrmEmployeeID")
        ),
        RoleID: Number(useCryptoLocalStorage("user_Data", "get", "RoleID")),
      })

      .then((res) => {
        const wings = res?.data?.data?.map((item) => {
          return { label: item?.EmployeeName, value: item?.Employee_ID };
        });
        setAssignedto(wings);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getCountry = () => {
    axiosInstances
      .post(apiUrls?.GetCountry, {})
      .then((res) => {
        const countrys = res?.data?.data
          ?.filter((item) => item?.NAME !== "INDIA")
          .map((item) => {
            return { label: item?.NAME, value: item?.CountryID };
          });
        setCountry(countrys);
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
  const searchHandleChange = (e) => {
    const { name, value } = e?.target;
    setFormData({ ...formData, [name]: value });
  };

  function getlabel(id, dropdownData) {
    const ele = dropdownData?.filter((item) => item?.value === id);
    return ele?.length > 0 ? ele[0].label : undefined;
  }
  const handleSave = () => {
    if (!formData?.Employee) {
      toast.error("Please Select Employee.");
      return;
    }
    if (!formData?.Country) {
      toast.error("Please Select Country.");
      return;
    }
    // if (!formData?.Remark) {
    //   toast.error("Please Enter Remarks.");
    //   return;
    // }

    setLoading(true);
    axiosInstances
      .post(apiUrls.ManageOverseasTravelInsert, {
        EmployeeID:
          ReportingManager == 1
            ? Number(formData?.Employee)
            : useCryptoLocalStorage("user_Data", "get", "CrmEmployeeID"),
        EmployeeName:
          ReportingManager == 1
            ? String(getlabel(formData?.Employee, assignto))
            : useCryptoLocalStorage("user_Data", "get", "realname"),
        CountryID: Number(formData?.Country),
        CountryName: String(getlabel(formData?.Country, country)),
        FromDate: String(moment(formData?.FromDate).format("YYYY-MM-DD") || ""),
        ToDate: String(moment(formData?.ToDate).format("YYYY-MM-DD") || ""),
        Remarks: String(formData?.Remark) || "",
      })
      .then((res) => {
        if (res.data.success === true) {
          toast.success(res.data.message);
          // navigate("/OverseasFlySearch");
          setFormData({
            ...formData,
            FromDate: new Date(),
            ToDate: new Date(),
            Country: "",
            Remark: "",
          });
          setLoading(false);
        } else {
          toast.error(res.data.message);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getAssignTo();
    getCountry();
  }, []);
  return (
    <>
      <div className="card">
        <Heading
          isBreadcrumb={true}
          secondTitle={
            <div style={{ fontWeight: "bold" }}>
              <Link to="/OverseasFlySearch" className="ml-3">
                Overseas Business Travel Approval
              </Link>
            </div>
          }
        />
        <div className="row p-2">
          {ReportingManager == 1 ? (
            <ReactSelect
              name="Employee"
              respclass="col-xl-2 col-md-4 col-sm-6 col-12"
              placeholderName="Employee"
              dynamicOptions={assignto}
              value={formData?.Employee}
              handleChange={handleDeliveryChange}
              requiredClassName={"required-fields"}
            />
          ) : (
            <Input
              type="text"
              respclass="col-xl-2 col-md-4 col-sm-6 col-12"
              className="form-control"
              placeholder=" "
              lable="Employee"
              id="Employee"
              name="Employee"
              value={IsEmployee}
              disabled={true}
            />
          )}

          <ReactSelect
            name="Country"
            respclass="col-xl-2 col-md-4 col-sm-6 col-12"
            placeholderName="Country"
            dynamicOptions={country}
            value={formData?.Country}
            handleChange={handleDeliveryChange}
            requiredClassName={"required-fields"}
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
          <Input
            type="text"
            className="form-control"
            id="Remark"
            name="Remark"
            lable="Remarks"
            placeholder=" "
            onChange={handleSelectChange}
            value={formData?.Remark}
            respclass="col-xl-3 col-md-4 col-sm-4 col-12"
          />
          {loading ? (
            <Loading />
          ) : (
            <button
              className="btn btn-sm btn-success ml-3"
              onClick={handleSave}
            >
              Save
            </button>
          )}
        </div>
      </div>
    </>
  );
};
export default OverseasFly;
