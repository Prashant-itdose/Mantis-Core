import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { axiosInstances } from "../../networkServices/axiosInstance";
import { apiUrls } from "../../networkServices/apiEndpoints";
import ReactSelect from "../../components/formComponent/ReactSelect";
import { useTranslation } from "react-i18next";
import Loading from "../../components/loader/Loading";
import Input from "../../components/formComponent/Input";
import "./ReportHeader.css";
import FullTextEditor from "../../components/formComponent/FullTextEditor";
import { useNavigate } from "react-router-dom";

const ReportHeaderPage = () => {
  const [t] = useTranslation();
  const [editData, setEditData] = useState(false);
  const [loading, setLoading] = useState(false);
  const [project, setProject] = useState([]);
  const [tableData, setTableData] = useState([]);
  const TemplateBind = tableData?.[0];
  const [formData, setFormData] = useState({
    ProjectID: "",
    ReportHedaerHeight: "",
    ReportHedaerXPosition: "",
    ReportHedaerYPosition: "",
    ReportFooterHeight: "",
    editorValue: "",
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

  const handleDeliveryChange = (name, e) => {
    const { value } = e;
    if (name === "ProjectID") {
      setFormData({
        ...formData,
        ProjectID: value,
        HeightPixel: "",
        Allignment: "",
      });
      handleSearch(value);
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  // useEffect(() => {
  //   if (TemplateBind) {
  //     setFormData((prev) => ({
  //       ...prev,
  //       editorValue: TemplateBind?.Template,
  //       ReportHedaerHeight: TemplateBind?.ReportHeaderHeight,
  //       ReportHedaerXPosition: TemplateBind?.ReportHeaderXPosition,
  //       ReportHedaerYPosition: TemplateBind?.ReportHeaderYPosition,
  //       ReportFooterHeight: TemplateBind?.ReportFoterheight,
  //     }));
  //   }
  // }, [TemplateBind]);
  useEffect(() => {
    if (TemplateBind && editData) {
      setFormData((prev) => ({
        ...prev,
        editorValue: TemplateBind?.Template,
        ReportHedaerHeight: TemplateBind?.ReportHeaderHeight,
        ReportHedaerXPosition: TemplateBind?.ReportHeaderXPosition,
        ReportHedaerYPosition: TemplateBind?.ReportHeaderYPosition,
        ReportFooterHeight: TemplateBind?.ReportFoterheight,
      }));
    }
  }, [TemplateBind, editData]);

  const handleSearch = (value) => {
    setLoading(true);
    axiosInstances
      .post(apiUrls.GetReportHeader, {
        ProjectId: String(value),
      })
      .then((res) => {
        if (res.data.success === true) {
          const datas = res.data.data;
          setTableData(datas);
          setEditData(true);
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

  const handleSelectChange = (e) => {
    const { name, value, checked, type } = e?.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? (checked ? 1 : 0) : value,
    });
  };

  // New validation function
  const validateInput = (name, value) => {
    const numValue = parseInt(value, 10);

    if (isNaN(numValue)) return false;

    const ranges = {
      ReportHedaerHeight: { min: 180, max: 350 },
      ReportHedaerXPosition: { min: 20, max: 25 },
      ReportHedaerYPosition: { min: 50, max: 130 },
      ReportFooterHeight: { min: 80, max: 110 },
    };

    if (ranges[name]) {
      return numValue >= ranges[name].min && numValue <= ranges[name].max;
    }

    return true;
  };

  // Modified handleSave function with validation
  const handleSave = () => {
    if (!formData?.ProjectID) {
      toast.error("Please Select Project.");
      return;
    }

    // Validate all inputs
    const validations = {
      ReportHedaerHeight: validateInput(
        "ReportHedaerHeight",
        formData?.ReportHedaerHeight
      ),
      ReportHedaerXPosition: validateInput(
        "ReportHedaerXPosition",
        formData?.ReportHedaerXPosition
      ),
      ReportHedaerYPosition: validateInput(
        "ReportHedaerYPosition",
        formData?.ReportHedaerYPosition
      ),
      ReportFooterHeight: validateInput(
        "ReportFooterHeight",
        formData?.ReportFooterHeight
      ),
    };

    const errorMessages = {
      ReportHedaerHeight: "Header Height must be between 180-350",
      ReportHedaerXPosition: "Header X Position must be between 20-25",
      ReportHedaerYPosition: "Header Y Position must be between 50-130",
      ReportFooterHeight: "Footer Height must be between 80-110",
    };

    for (const [field, isValid] of Object.entries(validations)) {
      if (!isValid) {
        toast.error(errorMessages[field]);
        return;
      }
    }

    setLoading(true);
    axiosInstances
      .post(apiUrls.Smartreport_header, {
        ProjectId: String(formData?.ProjectID),
        Reportheaderheight: String(formData?.ReportHedaerHeight),
        ReportheaderXposition: String(formData?.ReportHedaerXPosition),
        ReportHeaderYPosition: String(formData?.ReportHedaerYPosition),
        ReportFoterheight: String(formData?.ReportFooterHeight),
        Template: String(formData?.editorValue),
      })
      .then((res) => {
        if (res.data.success === true) {
          toast.success(res.data.message);
          setFormData({
            ...formData,
            ProjectID: "",
            editorValue: "",
            ReportHedaerHeight: "",
            ReportHedaerXPosition: "",
            ReportHedaerYPosition: "",
            ReportFooterHeight: "",
          });
          setLoading(false);
          handleSearch(formData?.ProjectID);
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

    // Validate all inputs
    const validations = {
      ReportHedaerHeight: validateInput(
        "ReportHedaerHeight",
        formData?.ReportHedaerHeight
      ),
      ReportHedaerXPosition: validateInput(
        "ReportHedaerXPosition",
        formData?.ReportHedaerXPosition
      ),
      ReportHedaerYPosition: validateInput(
        "ReportHedaerYPosition",
        formData?.ReportHedaerYPosition
      ),
      ReportFooterHeight: validateInput(
        "ReportFooterHeight",
        formData?.ReportFooterHeight
      ),
    };

    const errorMessages = {
      ReportHedaerHeight: "Header Height must be between 180-350",
      ReportHedaerXPosition: "Header X Position must be between 20-25",
      ReportHedaerYPosition: "Header Y Position must be between 50-130",
      ReportFooterHeight: "Footer Height must be between 80-110",
    };

    for (const [field, isValid] of Object.entries(validations)) {
      if (!isValid) {
        toast.error(errorMessages[field]);
        return;
      }
    }

    setLoading(true);
    axiosInstances
      .post(apiUrls.Smartreport_header, {
        ProjectId: String(formData?.ProjectID),
        Reportheaderheight: String(formData?.ReportHedaerHeight),
        ReportheaderXposition: String(formData?.ReportHedaerXPosition),
        ReportHeaderYPosition: String(formData?.ReportHedaerYPosition),
        ReportFoterheight: String(formData?.ReportFooterHeight),
        Template: String(formData?.editorValue),
      })
      .then((res) => {
        if (res.data.success === true) {
          toast.success(res.data.message);
          setLoading(false);
          setFormData({
            ...formData,
            ProjectID: "",
            editorValue: "",
            ReportHedaerHeight: "",
            ReportHedaerXPosition: "",
            ReportHedaerYPosition: "",
            ReportFooterHeight: "",
          });
          setTableData([]);
          setLoading(false);
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
  useEffect(() => {
    bindProject();
  }, []);

  const updateState = (updates) => {
    setFormData((prev) => ({ ...prev, ...updates }));
  };
  const columns = [
    "SubCategoryID",
    "Plo Status",
    "Mark Sign",
    "LabNo",
    "SRF_ID",
    "PassportNo.",
    "PLOID",
    "LaboutscreID",
    "FieldExe",
    "InterpretationID",
    "InterpretationType",
    "PName",
    "Mobile",
    "PAddress",
    "Fasting",
    "Age",
    "BarCodeNo.",
    "Gender",
    "ReportStatus",
    "ReportStatus1",
  ];
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
            isDisabled={editData === true}
          />
          <Input
            type="number"
            className="form-control"
            id="ReportHedaerHeight"
            name="ReportHedaerHeight"
            lable="Hedaer Height(Range :180-350)"
            placeholder=" "
            onChange={handleSelectChange}
            value={formData?.ReportHedaerHeight}
            respclass="col-xl-2 col-md-4 col-sm-4 col-12"
          />
          <Input
            type="number"
            className="form-control"
            id="ReportHedaerXPosition"
            name="ReportHedaerXPosition"
            lable="HedaerXPosition(Range :20-25)"
            placeholder=" "
            onChange={handleSelectChange}
            value={formData?.ReportHedaerXPosition}
            respclass="col-xl-2 col-md-4 col-sm-4 col-12"
          />
          <Input
            type="number"
            className="form-control"
            id="ReportHedaerYPosition"
            name="ReportHedaerYPosition"
            lable="HedaerYPosition(Range :50-130)"
            placeholder=" "
            onChange={handleSelectChange}
            value={formData?.ReportHedaerYPosition}
            respclass="col-xl-2 col-md-4 col-sm-4 col-12"
          />
          <Input
            type="number"
            className="form-control"
            id="ReportFooterHeight"
            name="ReportFooterHeight"
            lable="FooterHeight(Range :80-110)"
            placeholder=" "
            onChange={handleSelectChange}
            value={formData?.ReportFooterHeight}
            respclass="col-xl-2 col-md-4 col-sm-4 col-12"
          />
        </div>
        <div className="row">
          <div className="col-sm-10">
            <FullTextEditor
              value={formData.editorValue}
              onChange={(value) => updateState({ editorValue: value })}
              clear={formData.clear}
            />
          </div>
          <div className="col-sm-2">
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th className="font-weight-bold">S.No.</th>
                    <th className="font-weight-bold">Report Column</th>
                  </tr>
                </thead>
                <tbody>
                  {columns.map((col, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{col}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        {editData ? (
          <>
            {loading ? (
              <Loading />
            ) : (
              <button
                className="btn btn-sm btn-success ml-3 mt-2 mb-2"
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
                className="btn btn-sm btn-success ml-3 mt-2 mb-2"
                onClick={handleSave}
              >
                Save
              </button>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default ReportHeaderPage;
