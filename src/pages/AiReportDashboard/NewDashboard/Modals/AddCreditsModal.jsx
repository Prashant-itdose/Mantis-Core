import React, { useEffect, useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { axiosInstances } from "../../../../networkServices/axiosInstance";
import { apiUrls } from "../../../../networkServices/apiEndpoints";
import ReactSelect from "../../../../components/formComponent/ReactSelect";
import Input from "../../../../components/formComponent/Input";
import Loading from "../../../../components/loader/Loading";
import Heading from "../../../../components/UI/Heading";
import Tables from "../../../../components/UI/customTable";

const AddCreditsModal = () => {
  const [t] = useTranslation();
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [project, setProject] = useState([]);

  const [formData, setFormData] = useState({
    ProjectID: "",
    Amount: "",
    ReportCount: "",
    Token: "",
  });

  // Calculate ReportCount based on Amount and Token
  const calculateReportCount = useMemo(() => {
    if (!formData.Amount || !formData.Token) return "";

    const amount = parseFloat(formData.Amount);
    const token = parseInt(formData.Token);

    if (isNaN(amount) || isNaN(token) || token === 0) return "";

    // Calculate and round down the result
    const result = amount / token;
    return Math.floor(result).toString();
  }, [formData.Amount, formData.Token]);

  const handleSelectChange = (e) => {
    const { name, value, checked, type } = e?.target;
    const newFormData = {
      ...formData,
      [name]: type === "checkbox" ? (checked ? 1 : 0) : value,
    };

    // If Amount or Token changes, recalculate ReportCount
    if (name === "Amount" || name === "Token") {
      setFormData({
        ...newFormData,
        ReportCount: calculateReportCountForInput(newFormData),
        Token: "",
        ReportCount: "",
      });
    } else {
      setFormData(newFormData);
    }
  };

  // Helper function to calculate ReportCount
  const calculateReportCountForInput = (data) => {
    if (!data.Amount || !data.Token) return "";

    const amount = parseFloat(data.Amount);
    const token = parseInt(data.Token);

    if (isNaN(amount) || isNaN(token) || token === 0) return "";

    // Calculate and round down the result
    const result = amount / token;
    return Math.floor(result).toString();
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
    let newFormData = { ...formData };

    if (name === "ProjectID") {
      newFormData = {
        ...formData,
        ProjectID: value,
        Amount: "",
        ReportCount: "",
        Token: "",
      };
      handleSearch(value);
    } else if (name === "Amount" || name === "Token") {
      newFormData = {
        ...formData,
        [name]: value,
      };
      // Calculate ReportCount when Amount or Token changes
      newFormData.ReportCount = calculateReportCountForInput(newFormData);
    } else {
      newFormData = {
        ...formData,
        [name]: value,
      };
    }

    setFormData(newFormData);
  };

  const handleSubmit = () => {
    if (!formData?.ProjectID) {
      toast.error("Please Select Project.");
      return;
    }
    if (!formData?.Amount) {
      toast.error("Please Enter Amount.");
      return;
    }
    if (!formData?.Token) {
      toast.error("Please Select Token.");
      return;
    }

    setLoading(true);
    axiosInstances
      .post(apiUrls.InsertReportcount, {
        ProjectId: String(formData?.ProjectID),
        ReportCount: String(formData?.ReportCount),
        Amount: String(formData?.Amount),
        PerTokenRate: String(formData?.Token),
      })
      .then((res) => {
        if (res.data.success === true) {
          toast.success(res.data.message);
          setLoading(false);
          handleSearch(formData?.ProjectID);
          setFormData({
            ...formData,
            ProjectID: "",
            Amount: "",
            ReportCount: "",
            Token: "",
          });
        } else {
          toast.error(res.data.message);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
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
        <Input
          type="number"
          className="form-control"
          id="Amount"
          name="Amount"
          lable="Amount"
          placeholder=" "
          onChange={handleSelectChange}
          value={formData?.Amount}
          respclass="col-xl-3 col-md-4 col-sm-4 col-12"
          min="0"
        />
        <ReactSelect
          respclass="col-xl-3 col-md-4 col-sm-6 col-12"
          name="Token"
          placeholderName={t("PerTokenRate")}
          dynamicOptions={[
            { label: "1", value: "1" },
            { label: "2", value: "2" },
            { label: "3", value: "3" },
          ]}
          value={formData?.Token}
          handleChange={handleDeliveryChange}
        />
        <Input
          type="text"
          className="form-control"
          id="ReportCount"
          name="ReportCount"
          lable="Report Count"
          placeholder=" "
          value={formData?.ReportCount}
          respclass="col-xl-3 col-md-4 col-sm-4 col-12"
          disabled
          readOnly
        />
        {loading ? (
          <Loading />
        ) : (
          <button
            className="btn btn-sm btn-success ml-3 mt-2"
            onClick={handleSubmit}
          >
            Add
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

export default AddCreditsModal;
