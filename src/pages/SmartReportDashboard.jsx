import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Input from "../components/formComponent/Input";
import { toast } from "react-toastify";
import { axiosInstances } from "../networkServices/axiosInstance";
import { apiUrls } from "../networkServices/apiEndpoints";
import ReactSelect from "../components/formComponent/ReactSelect";
import Loading from "../components/loader/Loading";
import Heading from "../components/UI/Heading";
import Tables from "../components/UI/customTable";
import SmartReportChart from "../components/Dashboard/SmartReportChart";

const SmartReportDashboard = () => {
  const [t] = useTranslation();
  const [filterdata, setTableData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editData, setEditData] = useState(false);
  const [project, setProject] = useState([]);

  const [formData, setFormData] = useState({
    ProjectID: "",
    TestName: "",
    chart: "Pie Chart",
  });
  const handleSelectChange = (e) => {
    const { name, value, checked, type } = e?.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? (checked ? 1 : 0) : value,
    });
  };
  const bindProject = () => {
    axiosInstances
      .post(apiUrls.BindProjectSmartReport, {})
      .then((res) => {
        const datas = res?.data?.data;
        const poc3s = datas?.map((item) => {
          return { label: item?.PrjectName, value: item?.ProjectId };
        });
        setProject(poc3s);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSearch = (value) => {
    setLoading(true);
    axiosInstances
      .post(apiUrls.GetReportCount, {
        ProjectId: String(value) || "",
      })
      .then((res) => {
        if (res.data.success === true) {
          setTableData(res.data.data);
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

  const handleDeliveryChange = (name, e) => {
    const { value } = e;
    if (name === "ProjectID") {
      setFormData({
        ...formData,
        ProjectID: value,
        TestName: "",
      });
      handleSearch(value);
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };
  const getChart = (s, filterdata) => {
    // console.log("Pie Chart", s, filterdata);
    switch (s) {
      case "Pie Chart":
        return <SmartReportChart state={filterdata} />;
        break;
    }
  };
  const handleSubmit = () => {
    if (!formData?.ProjectID) {
      toast.error("Please Select Project.");
      return;
    }
    if (!formData?.TestName) {
      toast.error("Please Enter Report Count.");
      return;
    }

    setLoading(true);
    axiosInstances
      .post(apiUrls.InsertReportcount, {
        ProjectId: String(formData?.ProjectID),
        Totalreportcount: String(formData?.TestName),
      })
      .then((res) => {
        if (res.data.success === true) {
          toast.success(res.data.message);
          setLoading(false);
          handleSearch(formData?.ProjectID);
          setFormData({
            ...formData,
            ProjectID: "",
            TestName: "",
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

  const descriptionTHEAD = [
    "S.No.",
    "ProjectID",
    "ProjectName",
    "Total Report Count",
    "Generated Report Count",
    "Remaining Report Count",
    // "Edit",
  ];

  useEffect(() => {
    bindProject();
  }, []);
  return (
    <>
      <div className="card">
        <Heading
          isBreadcrumb={false}
          title={
            <span className="font-weight-bold m-2">Smart Report Dashboard</span>
          }
        />
        <div className="row p-2">
          <ReactSelect
            respclass="col-xl-2 col-md-4 col-sm-6 col-12"
            name="ProjectID"
            placeholderName={t("Project")}
            dynamicOptions={project}
            value={formData?.ProjectID}
            handleChange={handleDeliveryChange}
            requiredClassName={"required-fields"}
            searchable={true}
          />
          <Input
            type="text"
            className="form-control"
            id="TestName"
            name="TestName"
            lable="TestName"
            placeholder=" "
            onChange={handleSelectChange}
            value={formData?.TestName}
            respclass="col-xl-2 col-md-4 col-sm-4 col-12"
          />

          {loading ? (
            <Loading />
          ) : (
            <button
              className="btn btn-sm btn-success ml-3"
              onClick={handleSubmit}
            >
              Add
            </button>
          )}
        </div>
      </div>
      <div className="card">
        <div>{getChart(formData?.chart, filterdata)}</div>
      </div>
      {/* {tableData?.length > 0 && (
        <div className="card mt-1">
          <Heading
            title={<span className="font-weight-bold">Search Details</span>}
          />
          <Tables
            thead={descriptionTHEAD}
            tbody={tableData?.map((ele, index) => ({
              "S.No.": index + 1,
              ProjectID: ele?.ProjectId,
              ProjectName: ele?.PrjectName,
              "Total Report Count": ele?.TotalReportCount,
              "Generated Report Count": ele?.GeneratedReportCount,
              "Remaining Report Count": ele?.RemainingReportCount,
           
            }))}
            tableHeight={"tableHeight"}
          />
        </div>
      )} */}
    </>
  );
};

export default SmartReportDashboard;
