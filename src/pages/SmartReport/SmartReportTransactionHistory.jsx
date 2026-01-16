import React, { useEffect, useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { axiosInstances } from "../../networkServices/axiosInstance";
import { apiUrls } from "../../networkServices/apiEndpoints";
import ReactSelect from "../../components/formComponent/ReactSelect";
import Input from "../../components/formComponent/Input";
import Loading from "../../components/loader/Loading";
import Heading from "../../components/UI/Heading";
import Tables from "../../components/UI/customTable";
import { toast } from "react-toastify";
import DatePicker from "../../components/formComponent/DatePicker";
import moment from "moment";

const SmartReportTransactionHistory = () => {
  const [t] = useTranslation();
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [project, setProject] = useState([]);
  const { VITE_DATE_FORMAT } = import.meta.env;
  const [formData, setFormData] = useState({
    ProjectID: "",
    Type: "",
    FromDate: new Date(),
    ToDate: new Date(),
  });

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

  const handleSearch = () => {
    if (!formData?.ProjectID) {
      toast.error("Please Select Project.");
      return;
    }
    setLoading(true);
    axiosInstances
      .post(apiUrls.GetReportCount, {
        ProjectId: String(formData?.ProjectID) || "",
        Type: String(formData?.Type) || "",
        FromDate: String(moment(formData?.FromDate).format("YYYY-MM-DD")) || "",
        ToDate: String(moment(formData?.ToDate).format("YYYY-MM-DD")) || "",
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
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const searchHandleChange = (e) => {
    const { name, value } = e?.target;
    setFormData({ ...formData, [name]: value });
  };

  const descriptionTHEAD = [
    "S.No.",
    "ProjectID",
    "ProjectName",
    "Total Report Count",
    "Generated Report Count",
    "Remaining Report Count",
  ];

  useEffect(() => {
    bindProject();
  }, []);

  return (
    <>
      <div className="row p-2">
        <ReactSelect
          respclass="col-xl-3 col-md-4 col-sm-6 col-12"
          name="ProjectID"
          placeholderName={t("Project")}
          dynamicOptions={project}
          value={formData?.ProjectID}
          handleChange={handleDeliveryChange}
          requiredClassName={"required-fields"}
          searchable={true}
        />
        <ReactSelect
          respclass="col-xl-3 col-md-4 col-sm-6 col-12"
          name="Type"
          placeholderName={t("Type")}
          dynamicOptions={[
            { label: "Recharge History", value: "1" },
            { label: "Transaction History", value: "2" },
          ]}
          value={formData?.Type}
          handleChange={handleDeliveryChange}
        />

        <DatePicker
          className="custom-calendar"
          id="FromDate"
          name="FromDate"
          lable="From Date"
          placeholder={VITE_DATE_FORMAT}
          value={formData?.FromDate}
          respclass="col-xl-3 col-md-4 col-sm-6 col-12"
          handleChange={searchHandleChange}
        />

        <DatePicker
          className="custom-calendar"
          id="ToDate"
          name="ToDate"
          lable="To Date"
          placeholder={VITE_DATE_FORMAT}
          value={formData?.ToDate}
          respclass="col-xl-3 col-md-4 col-sm-6 col-12"
          handleChange={searchHandleChange}
        />

        {loading ? (
          <Loading />
        ) : (
          <button
            className="btn btn-sm btn-success ml-2 mt-2"
            onClick={handleSearch}
          >
            Search
          </button>
        )}
      </div>

      {tableData?.length > 0 && (
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
      )}
    </>
  );
};

export default SmartReportTransactionHistory;
