import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { axiosInstances } from "../../networkServices/axiosInstance";
import { apiUrls } from "../../networkServices/apiEndpoints";
import ReactSelect from "../../components/formComponent/ReactSelect";
import { useTranslation } from "react-i18next";
import Loading from "../../components/loader/Loading";
import Input from "../../components/formComponent/Input";
import NoRecordFound from "../../components/formComponent/NoRecordFound";
import Tables from "../../components/UI/customTable";
import Heading from "../../components/UI/Heading";

const QRCode = () => {
  const [t] = useTranslation();
  const [loading, setLoading] = useState(false);
  const [editData, setEditData] = useState(false);
  const [project, setProject] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [formData, setFormData] = useState({
    ProjectID: "",
    HeightPixel: "",
    Allignment: "",
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
  const handleSearch = (value) => {
    axiosInstances
      .post(apiUrls.BindQRCodeGrid, {
        ProjectId: String(value),
      })
      .then((res) => {
        if (res.data.success === true) {
          setTableData(res.data.data);
        } else {
          toast.error(res.data.message);
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
    if (!formData?.HeightPixel) {
      toast.error("Please Enter HeightPixel.");
      return;
    }
    if (!formData?.Allignment) {
      toast.error("Please Select Allignment.");
      return;
    }
    setLoading(true);
    axiosInstances
      .post(apiUrls.Centre_QRCode, {
        ProjectId: String(formData?.ProjectID),
        Alignment: String(formData?.Allignment),
        Height: formData?.HeightPixel ? `${formData.HeightPixel}px` : "",
      })
      .then((res) => {
        if (res.data.success === true) {
          toast.success(res.data.message);
          setLoading(false);
          setFormData({
            ...formData,
            ProjectID: "",
            HeightPixel: "",
            Allignment: "",
          });
          setEditData(false);
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
  const handleSave = () => {
    if (!formData?.ProjectID) {
      toast.error("Please Select Project.");
      return;
    }
    if (!formData?.HeightPixel) {
      toast.error("Please Enter HeightPixel.");
      return;
    }
    if (!formData?.Allignment) {
      toast.error("Please Select Allignment.");
      return;
    }
    setLoading(true);
    axiosInstances
      .post(apiUrls.Centre_QRCode, {
        ProjectId: String(formData?.ProjectID),
        Alignment: String(formData?.Allignment),
        Height: formData?.HeightPixel ? `${formData.HeightPixel}px` : "",
      })
      .then((res) => {
        if (res.data.success === true) {
          toast.success(res.data.message);
          setLoading(false);
          setFormData({
            ...formData,
            ProjectID: "",
            HeightPixel: "",
            Allignment: "",
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

  const handleSelectChange = (e) => {
    const { name, value, checked, type } = e?.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? (checked ? 1 : 0) : value,
    });
  };
  useEffect(() => {
    bindProject();
  }, []);

  const centreprojectTHEAD = [
    "S.No.",
    "ProjectName",
    "Height",
    "Allignment",
    "Edit",
  ];
  const handleEdit = (ele) => {
    setFormData({
      ...formData,
      ProjectID: ele?.ProjectId,
      Allignment: ele?.Alignment,
      HeightPixel: ele?.Height ? ele.Height.replace("px", "") : "",
    });
    setEditData(true);
  };

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
            id="HeightPixel"
            name="HeightPixel"
            lable="Height Pixel"
            placeholder=" "
            onChange={handleSelectChange}
            value={formData?.HeightPixel}
            respclass="col-xl-2 col-md-4 col-sm-4 col-12"
          />
          <ReactSelect
            respclass="col-xl-2 col-md-4 col-sm-6 col-12"
            name="Allignment"
            placeholderName={t("Select Allignment")}
            dynamicOptions={[
              { label: "Left", value: "left" },
              { label: "Right", value: "right" },
            ]}
            value={formData?.Allignment}
            handleChange={handleDeliveryChange}
          />

          {editData ? (
            <>
              {loading ? (
                <Loading />
              ) : (
                <button
                  className="btn btn-sm btn-success ml-3"
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
                  className="btn btn-sm btn-success ml-3"
                  onClick={handleSave}
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
            thead={centreprojectTHEAD}
            tbody={tableData?.map((ele, index) => ({
              "S.No.": index + 1,
              ProjectName: ele?.ProjectName,
              Height: ele?.Height,
              Allignment: ele?.Alignment,
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

export default QRCode;
