import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { axiosInstances } from "../../networkServices/axiosInstance";
import { apiUrls } from "../../networkServices/apiEndpoints";
import ReactSelect from "../../components/formComponent/ReactSelect";
import { useTranslation } from "react-i18next";
import Input from "../../components/formComponent/Input";
import NoRecordFound from "../../components/formComponent/NoRecordFound";
import Heading from "../../components/UI/Heading";
import Tables from "../../components/UI/customTable";
import Loading from "../../components/loader/Loading";

const InvestigationPage = () => {
  const [t] = useTranslation();
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editData, setEditData] = useState(false);
  const [project, setProject] = useState([]);
  const [formData, setFormData] = useState({
    ProjectID: "",
    TestName: "",
    TestCode: "",
    Department: "",
    DepartmentCode: "",
    ReportType: "",
    Status: "",
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
      .post(apiUrls.BindTestgrid, {
        ProjectId: String(value),
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
        [name]: value,
      });
      handleSearch(value);
      setTableData([]);
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };
  const handleSubmit = () => {
    setLoading(true);
    axiosInstances
      .post(apiUrls.AddTest, {
        ProjectId: String(formData?.ProjectID),
        TestName: String(formData?.TestName),
        Testcode: String(formData?.TestCode),
        Department: String(formData?.Department),
        chkactive: String(formData?.Status),
        departcode: String(formData?.DepartmentCode),
        ReportFormat: String(formData?.ReportType),
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
            TestCode: "",
            Department: "",
            DepartmentCode: "",
            ReportType: "",
            Status: "",
          });
        } else {
          toast.error(res.data.message);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleUpdate = () => {
    setLoading(true);
    axiosInstances
      .post(apiUrls.UpdateTest, {
        ProjectId: String(formData?.ProjectID),
        TestName: String(formData?.TestName),
        Testcode: String(formData?.TestCode),
        Department: String(formData?.Department),
        chkactive: String(formData?.Status),
        departcode: String(formData?.DepartmentCode),
        idd: String(formData?.idd),
        ReportFormat: String(formData?.ReportType),
      })
      .then((res) => {
        if (res.data.success === true) {
          toast.success(res.data.message);
          setLoading(false);
          setFormData({
            ...formData,
            ProjectID: "",
            TestName: "",
            TestCode: "",
            Department: "",
            DepartmentCode: "",
            ReportType: "",
            Status: "",
          });
          handleSearch(formData?.ProjectID);
          setEditData(false);
        } else {
          toast.error(res.data.message);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleEdit = (ele) => {
    setFormData({
      ...formData,
      ProjectID: ele?.ProjectId,
      TestName: ele?.TestName,
      TestCode: ele?.TestCode,
      Department: ele?.Department,
      DepartmentCode: ele?.DepartCode,
      ReportType: ele?.ReportFormat,
      Status: ele?.IsActive,
      idd: ele?.Id,
    });
    setEditData(true);
  };

  const investigationTHEAD = [
    "S.No.",
    "ProjectName",
    "TestName",
    "TestCode",
    "Department",
    "DepartmentCode",
    "ReportType",
    "Status",
    "Edit",
  ];
  useEffect(() => {
    bindProject();
    // handleSearch();
  }, []);
  return (
    <>
      <div className="">
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
          <Input
            type="text"
            className="form-control"
            id="TestCode"
            name="TestCode"
            lable="TestCode"
            placeholder=" "
            onChange={handleSelectChange}
            value={formData?.TestCode}
            respclass="col-xl-2 col-md-4 col-sm-4 col-12"
          />
          <Input
            type="text"
            className="form-control"
            id="Department"
            name="Department"
            lable="Department"
            placeholder=" "
            onChange={handleSelectChange}
            value={formData?.Department}
            respclass="col-xl-2 col-md-4 col-sm-4 col-12"
          />
          <Input
            type="text"
            className="form-control"
            id="DepartmentCode"
            name="DepartmentCode"
            lable="DepartmentCode"
            placeholder=" "
            onChange={handleSelectChange}
            value={formData?.DepartmentCode}
            respclass="col-xl-2 col-md-4 col-sm-4 col-12"
          />
          <ReactSelect
            respclass="col-xl-2 col-md-4 col-sm-6 col-12"
            name="ReportType"
            placeholderName={t("Report Type")}
            dynamicOptions={[
              { label: "Format1", value: "1" },
              { label: "Format2", value: "2" },
              { label: "Format3", value: "3" },
              { label: "Format4", value: "4" },
              { label: "Format5", value: "5" },
            ]}
            value={formData?.ReportType}
            handleChange={handleDeliveryChange}
          />
          <ReactSelect
            respclass="col-xl-2 col-md-4 col-sm-6 col-12 mt-1"
            name="Status"
            placeholderName={t("Status")}
            dynamicOptions={[
              { label: "Active", value: "1" },
              { label: "InActive", value: "2" },
            ]}
            value={formData?.Status}
            handleChange={handleDeliveryChange}
          />
          {editData ? (
            <>
              {loading ? (
                <Loading />
              ) : (
                <button
                  className="btn btn-sm btn-success ml-3 mt-1"
                  onClick={handleUpdate}
                >
                  Update
                </button>
              )}
            </>
          ) : (
            <>
              {loading ? (
                <Loading />
              ) : (
                <button
                  className="btn btn-sm btn-success ml-3 mt-1"
                  onClick={handleSubmit}
                >
                  Save
                </button>
              )}
            </>
          )}
        </div>
      </div>

      {tableData?.length > 0 && (
        <div className="card mt-1">
          <Heading
            title={<span className="font-weight-bold">Search Details</span>}
          />
          <Tables
            thead={investigationTHEAD}
            tbody={tableData?.map((ele, index) => ({
              "S.No.": index + 1,
              ProjectName: ele?.PrjectName,
              TestName: ele?.TestName,
              TestCode: ele?.TestCode,
              Department: ele?.Department,
              DepartmentCode: ele?.DepartCode,
              ReportType: ele?.FormatName,
              Status: ele?.STATUS,
              Edit: (
                <i className="fa fa-edit" onClick={() => handleEdit(ele)}></i>
              ),
            }))}
            tableHeight={"tableHeight"}
          />
        </div>
      )}
    </>
  );
};

export default InvestigationPage;
