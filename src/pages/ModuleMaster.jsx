import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { apiUrls } from "../networkServices/apiEndpoints";
import { headers } from "../utils/apitools";
import axios from "axios";
import Input from "../components/formComponent/Input";
import Loading from "../components/loader/Loading";
import Heading from "../components/UI/Heading";
import Tables from "../components/UI/customTable";
import { useTranslation } from "react-i18next";
import ReactSelect from "../components/formComponent/ReactSelect";
import { axiosInstances } from "../networkServices/axiosInstance";

const ModuleMaster = () => {
  const [tableData, setTableData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [t] = useTranslation();
  const [productversion, setProductVersion] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [project, setProject] = useState([]);
  const [reporter, setReporter] = useState([]);
  const [formData, setFormData] = useState({
    ModuleName: "",
    Incharge: "",
    IsActive: "1",
    ModuleID: "",
    ProductVersion: "",
    ProjectID: "",
  });
  const handleSelectChange = (e) => {
    const { name, value, checked, type } = e?.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? (checked ? 1 : 0) : value,
    });
  };

  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 20;
  const totalPages = Math.ceil(tableData?.length / rowsPerPage);
  const currentData = tableData?.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );
  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const moduleTHEAD = [
    { name: t("S.No."), width: "19%" },
    t("Product Name"),
    t("Module Name"),
    t("Incharge"),
    t("Created By"),
    t("Created Date"),
    t("Status"),
    t("Edit"),
  ];
  function getlabel(id, dropdownData) {
    const ele = dropdownData?.filter((item) => item?.value === id);
    return ele?.length > 0 ? ele[0].label : undefined;
  }
  const normalizeString = (str) => str.toLowerCase().replace(/\s+/g, "").trim();
  const handleSearchTable = (event) => {
    const rawQuery = event.target.value;
    const query = normalizeString(rawQuery);

    setSearchQuery(rawQuery);

    if (query === "") {
      setTableData(filteredData);
      setCurrentPage(1);
      return;
    }

    const filtered = filteredData?.filter((item) =>
      Object.keys(item).some(
        (key) => item[key] && normalizeString(String(item[key])).includes(query)
      )
    );

    if (filtered.length === 0) {
      setSearchQuery("");
      setTableData(filteredData);
    } else {
      setTableData(filtered);
    }

    setCurrentPage(1);
  };

  const handleSave = () => {
    if (formData?.ModuleName == "") {
      toast.error("Please Enter Module Name.");
    } else if (formData?.Incharge == "") {
      toast.error("Please Select Incharge.");
    } else {
      setLoading(true);

      axiosInstances
        .post(apiUrls.CreateModule, {
          ProjectID: Number(0),
          InchargeID: Number(formData?.Incharge || 0),
          ModuleName: String(formData?.ModuleName),
          ProductID: Number(formData?.ProductVersion || 0),
          ProductName: String(
            getlabel(formData?.ProductVersion, productversion) || ""
          ),
          // ModuleID: Number(formData?.ModuleID || 0),
          IsActive: Number(formData?.IsActive || 0),
        })
        .then((res) => {
          if (res?.data?.success === true) {
            toast.success(res?.data?.message);
            getModuleSearch();
            setLoading(false);
            setFormData({
              ...formData,
              ModuleName: "",
              Incharge: "",
              IsActive: "1",
              ModuleID: "",
              ProductVersion: "",
            });
          } else {
            toast.error(res?.data?.message);
            setLoading(false);
          }
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }
  };
  const handleUpdate = () => {
    if (formData?.ModuleName == "") {
      toast.error("Please Enter Module Name.");
    } else if (formData?.Incharge == "") {
      toast.error("Please Select Incharge.");
    } else {
      setLoading(true);

      axiosInstances
        .post(apiUrls.UpdateModule, {
          ProjectID: Number(0),
          InchargeID: Number(formData?.Incharge || 0),
          ModuleName: String(formData?.ModuleName),
          ProductID: Number(formData?.ProductVersion || 0),
          ProductName: String(
            getlabel(formData?.ProductVersion, productversion) || ""
          ),
          ModuleID: Number(formData?.ModuleID || 0),
          IsActive: Number(formData?.IsActive || 0),
        })
        .then((res) => {
          if (res?.data?.success === true) {
            toast.success(res?.data?.message);
            getModuleSearch();
            setLoading(false);
            setEditMode(false);
            setFormData({
              ...formData,
              ModuleName: "",
              Incharge: "",
              IsActive: "1",
              ModuleID: "",
              ProductVersion: "",
            });
          } else {
            toast.error(res?.data?.message);
            setLoading(false);
          }
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }
  };
  const getModuleSearch = () => {
    axiosInstances
      .post(apiUrls.Module_Search, {
        InchargeID: 0,
        IsActive: 0,
      })
      .then((res) => {
        if (res.data.success === true) {
          setTableData(res?.data?.data);
          setFilteredData(res?.data?.data);
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleEditModule = (ele) => {
    setFormData({
      ...formData,
      ModuleName: ele?.ModuleName,
      Incharge: ele?.InchargeID,
      IsActive: ele?.IsActive,
      ModuleID: ele?.ID,
      ProductVersion: ele?.ProductID,
    });
    setEditMode(true);
  };
  const getReporter = () => {
    axiosInstances
      .post(apiUrls.Reporter_Select, {
        IsIncharge: Number(1),
      })
      .then((res) => {
        const assigntos = res?.data?.data?.map((item) => {
          return { label: item?.Name, value: item?.ID };
        });
        setReporter(assigntos);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getProduct = (value) => {
    axiosInstances
      .post(apiUrls.GetProductVersion, {})
      .then((res) => {
        const states = res?.data.data.map((item) => {
          return { label: item?.NAME, value: item?.id };
        });
        setProductVersion(states);
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
  useEffect(() => {
    getModuleSearch();
    getReporter();
    getProduct();
  }, []);
  return (
    <>
      <Heading title={t("Module Master")} isBreadcrumb={true} />
      <div className="card">
        <div className="row p-2">
          <ReactSelect
            name="ProductVersion"
            respclass="col-xl-2 col-md-4 col-sm-4 col-12"
            placeholderName="Product"
            dynamicOptions={productversion}
            value={formData?.ProductVersion}
            handleChange={handleDeliveryChange}
          />
          <Input
            type="text"
            className="form-control required-fields"
            id="ModuleName"
            name="ModuleName"
            lable={t("ModuleName")}
            placeholder=" "
            onChange={handleSelectChange}
            value={formData?.ModuleName}
            respclass="col-xl-2 col-md-4 col-sm-4 col-12"
          />
          <ReactSelect
            name="Incharge"
            respclass="col-xl-2 col-md-4 col-sm-4 col-12"
            placeholderName="Incharge"
            dynamicOptions={reporter}
            value={formData?.Incharge}
            handleChange={handleDeliveryChange}
          />
          <div className="search-col" style={{ marginLeft: "8px" }}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <label className="switch" style={{ marginTop: "7px" }}>
                <input
                  type="checkbox"
                  name="IsActive"
                  checked={formData?.IsActive ? 1 : 0}
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
                {formData?.IsActive == "1" ? t("Active") : t("DeActive")}
              </span>
            </div>
          </div>

          {loading ? (
            <Loading />
          ) : (
            <div className="col-2">
              {editMode ? (
                <button
                  className="btn btn-sm btn-info ml-2"
                  onClick={handleUpdate}
                >
                  {t("Update")}
                </button>
              ) : (
                <button
                  className="btn btn-sm btn-info ml-2"
                  onClick={handleSave}
                >
                  {t("Create")}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
      {tableData?.length > 0 && (
        <>
          <div className="card mt-2">
            <Heading
              title={t("Search Details")}
              secondTitle={
                <div style={{ fontWeight: "bold", display: "flex" }}>
                  <div
                    style={{ padding: "0px !important", marginLeft: "10px" }}
                  >
                    <Input
                      type="text"
                      className="form-control"
                      id="Title"
                      name="Title"
                      lable="Search"
                      placeholder=" "
                      onChange={handleSearchTable}
                      value={searchQuery}
                      respclass="col-xl-12 col-md-4 col-sm-6 col-12"
                    />
                  </div>
                  <span className="mt-1">
                    Total Record : &nbsp; {tableData?.length}
                  </span>
                </div>
              }
            />
            <Tables
              thead={moduleTHEAD}
              tbody={currentData?.map((ele, index) => ({
                "S.No.": (currentPage - 1) * rowsPerPage + index + 1,
                "Product Name": ele?.ProductName,
                "Module Name": ele?.ModuleName,
                Incharge: ele?.Incharge,
                "Created By": ele?.CreatedBy,
                "Created Date": ele?.dtEntry,
                Status: ele.IsActive == "1" ? "Active" : "DeActive",
                Edit: (
                  <i
                    className="fa fa-edit"
                    style={{ cursor: "pointer" }}
                    onClick={() => handleEditModule(ele)}
                  ></i>
                ),
              }))}
              // tableHeight={"tableHeight"}
            />
            <div className="pagination ml-auto">
              <div>
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  {t("Previous")}
                </button>
                <span>
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  {t("Next")}
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ModuleMaster;
