import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { axiosInstances } from "../../networkServices/axiosInstance";
import { apiUrls } from "../../networkServices/apiEndpoints";
import ReactSelect from "../../components/formComponent/ReactSelect";
import { useTranslation } from "react-i18next";
import Loading from "../../components/loader/Loading";
import FullTextEditor from "../../components/formComponent/FullTextEditor";
const RiskFactorPage = () => {
  const [t] = useTranslation();
  const [loading, setLoading] = useState(false);
  const [editData, setEditData] = useState(false);
  const [project, setProject] = useState([]);
  const [test, setTest] = useState([]);
  const [tableData, setTableData] = useState([]);
  const TemplateBind = tableData?.[0]?.Template;
  const [formData, setFormData] = useState({
    ProjectID: "",
    TestName: "",
    Description: "",
    clear: false,
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
  const bindTest = (value) => {
    axiosInstances
      .post(apiUrls.BindInvestigation, {
        ProjectId: String(value),
      })
      .then((res) => {
        const datas = res?.data?.data;
        const poc3s = datas?.map((item) => {
          return {
            label: item?.TestName,
            value: item?.Id,
            TestCode: item?.TestCode,
          };
        });
        setTest(poc3s);
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
      });
      bindTest(value);
    } else if (name === "TestName") {
      const selectedTest = test?.find((item) => item.value === value);
      setFormData({
        ...formData,
        TestName: value,
        TestCode: selectedTest?.TestCode || "",
      });
      handleSearch(selectedTest?.TestCode);
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  useEffect(() => {
    if (TemplateBind) {
      setFormData((prev) => ({
        ...prev,
        Description: TemplateBind,
      }));
    }
  }, [TemplateBind]);

  const handleSearch = (value) => {
    setLoading(true);
    axiosInstances
      .post(apiUrls.GetRiskFactor, {
        ProjectId: String(formData?.ProjectID),
        TestCode: String(value),
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
  const handleUpdate = () => {
    if (!formData?.ProjectID) {
      toast.error("Please Select Project.");
      return;
    }
    if (!formData?.TestName) {
      toast.error("Please Select Test.");
      return;
    }
    if (!formData?.Description) {
      toast.error("Please Enter Description.");
      return;
    }
    setLoading(true);
    axiosInstances
      .post(apiUrls.Investigation_Riskfactor, {
        ProjectId: String(formData?.ProjectID),
        Test_id: String(formData?.TestName),
        TestCode: String(formData?.TestCode),
        Template: String(formData?.Description),
      })
      .then((res) => {
        if (res.data.success === true) {
          toast.success(res.data.message);
          setLoading(false);
          setFormData({
            ...formData,
            ProjectID: "",
            TestName: "",
            Description: "",
          });
          setEditData(false);
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
  const updateState = (updates) => {
    setFormData((prev) => ({ ...prev, ...updates }));
  };
  useEffect(() => {
    bindProject();
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
            isDisabled={formData?.TestName}
          />
          <ReactSelect
            respclass="col-xl-2 col-md-4 col-sm-6 col-12"
            name="TestName"
            placeholderName={t("Select Test")}
            dynamicOptions={test}
            value={formData?.TestName}
            handleChange={handleDeliveryChange}
            isDisabled={editData === true}
          />
        </div>
        <FullTextEditor
          value={formData.Description}
          onChange={(value) => updateState({ Description: value })}
          clear={formData.clear}
        />

        {loading ? (
          <Loading />
        ) : (
          <button
            className="btn btn-sm btn-success ml-3 mt-2 mb-2"
            onClick={handleUpdate}
          >
            Submit
          </button>
        )}
      </div>
    </>
  );
};

export default RiskFactorPage;
