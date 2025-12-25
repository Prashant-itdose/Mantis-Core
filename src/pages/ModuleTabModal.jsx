import axios from "axios";
import React, { useEffect, useState } from "react";
import { apiUrls } from "../networkServices/apiEndpoints";
import { headers } from "../utils/apitools";
import { toast } from "react-toastify";
import ReactSelect from "../components/formComponent/ReactSelect";
import DatePicker from "../components/formComponent/DatePicker";
import Loading from "../components/loader/Loading";
import Tables from "../components/UI/customTable";
// import { moduleTHEAD } from "../components/modalComponent/Utils/HealperThead";
import Input from "../components/formComponent/Input";
import { useTranslation } from "react-i18next";
import Heading from "../components/UI/Heading";
import Modal from "../components/modalComponent/Modal";
import ModuleDeleteModal from "./ModuleDeleteModal";
import ProjectCreateModule from "./ProjectCreateModule";
import { useCryptoLocalStorage } from "../utils/hooks/useCryptoLocalStorage";
import { axiosInstances } from "../networkServices/axiosInstance";

const ModuleTabModal = ({ data }) => {
  const { VITE_DATE_FORMAT } = import.meta.env;
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [phase, setPhase] = useState([
    { label: "Select", value: "0" },
    { label: "PH1", value: "1" },
    { label: "PH2", value: "2" },
    { label: "PH3", value: "3" },
  ]);

  const handleCheckBox = (e, index) => {
    const { name, checked } = e?.target;

    if (name === "selectAll") {
      // Handle Select All for CURRENT page
      const updatedData = tableData.map((item, idx) => {
        const isOnCurrentPage =
          idx >= (currentPage - 1) * rowsPerPage &&
          idx < currentPage * rowsPerPage;

        return isOnCurrentPage ? { ...item, remove: checked } : item;
      });

      setTableData(updatedData);
      setSelectAll(checked);
    } else if (name === "remove") {
      // Get actual index in full tableData
      const globalIndex = (currentPage - 1) * rowsPerPage + index;
      const data = [...tableData];

      data[globalIndex][name] = checked;
      setTableData(data);

      // Check if all rows in current page are selected
      const currentPageData = data.slice(
        (currentPage - 1) * rowsPerPage,
        currentPage * rowsPerPage
      );

      const allChecked = currentPageData.every((item) => item.remove);
      setSelectAll(allChecked);
    }
  };

  const [module, setModule] = useState([]);
  const [tableData, setTableData] = useState([]);

  const [formData, setFormData] = useState({
    Modules: "",
    ModuleName: "",
    LiveDate: "",
    Phase: "",
    DeliveryStatus: "",
    LiveStatus: "",
    AfterLiveStatus: "",
    DocumentType: "",
    SelectFile: "",
    Document_Base64: "",
    FileExtension: "",
    ModulePrimaryID: "",
    PhaseDays: "",
    ModuleID: "",
    PhaseID: "",
    Pic_Details: "",
  });
  const [t] = useTranslation();
  const handleDeliveryChange = (name, e) => {
    const { value } = e;
    setFormData({
      ...formData,
      [name]: value,
    });
    // getPhase(value);
  };
  const handleSelectChange = (e) => {
    const { name, value, checked, type } = e?.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? (checked ? 1 : 0) : value,
    });
  };
  const [visibles, setVisibles] = useState({
    showVisible: false,
  });

  const getModuleList = () => {
    axiosInstances
      .post(apiUrls?.Module_Select, {
        RoleID: Number(useCryptoLocalStorage("user_Data", "get", "RoleID")),
        ProjectID: Number("0"),
        IsActive: Number("1"),
        IsMaster: Number("2"),
      })
      .then((res) => {
        const poc3s = res?.data.data.map((item) => {
          return { label: item?.ModuleName, value: item?.ModuleID };
        });
        setModule(poc3s);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function getlabel(id, dropdownData) {
    const ele = dropdownData.filter((item) => item.value === id);
    return ele.length > 0 ? ele[0].label : "";
  }
  function formatDate(dateString) {
    let date = new Date(dateString);
    let year = date.getFullYear();
    let month = (date.getMonth() + 1).toString().padStart(2, "0");
    let day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  }
  const handleCreateModule = () => {
    if (formData?.Modules == "") {
      toast.error("Please Select Module.");
    } else {
      const payload = {
        ActionType: "InsertModule",
        ProjectModule: [
          {
            ModulePrimaryID: 0,
            ProjectID: data?.Id
              ? Number(data.Id)
              : Number(data?.ProjectID) || 0,
            ModuleID: formData?.Modules ? Number(formData.Modules) : 0,
            ModuleName: getlabel(formData?.Modules, module) || "",
            AfterLiveStatus: formData?.AfterLiveStatus
              ? String(formData.AfterLiveStatus)
              : "0",
            DeliveryStatus: formData?.DeliveryStatus
              ? String(formData.DeliveryStatus)
              : "0",
            LiveStatus: formData?.LiveStatus
              ? String(formData.LiveStatus)
              : "0",
            IsSale: false,
            PhaseID: formData?.Phase ? Number(formData.Phase) : 0,
            PhaseDays: getlabel(formData?.Phase, phase) || "",
            Pic_Details: "",
            LiveDate: formData?.LiveDate
              ? formatDate(formData.LiveDate)
              : "1970-01-01",
          },
        ],
      };

      axiosInstances
        .post(apiUrls?.ProjectMasterUpdate, payload)
        .then((res) => {
          if (res?.data?.success == true) {
            toast.success(res?.data?.message);
            handleSearch();
            setFormData({
              ...formData,
              MachineName: "",
              Modules: "",
              ModuleName: "",
              LiveDate: "",
              Phase: "",
              DeliveryStatus: "",
              LiveStatus: "",
              AfterLiveStatus: "",
              DocumentType: "",
              SelectFile: "",
              Document_Base64: "",
              FileExtension: "",
              ModulePrimaryID: "",
              PhaseDays: "",
              ModuleID: "",
              PhaseID: "",
              Pic_Details: "",
            });
          } else {
            toast.error(res?.data?.message);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleUpdateModule = () => {
    axiosInstances
      .post(apiUrls?.ProjectMasterUpdate, {
        ActionType: "UpdateModule",
        ProjectModule: [
          {
            ModulePrimaryID: 0,
            ProjectID: data?.Id
              ? Number(data.Id)
              : Number(data?.ProjectID) || 0,
            ModuleID: formData?.Modules ? Number(formData.Modules) : 0,
            ModuleName: getlabel(formData?.Modules, module) || "",
            AfterLiveStatus: formData?.AfterLiveStatus
              ? String(formData.AfterLiveStatus)
              : "0",
            DeliveryStatus: formData?.DeliveryStatus
              ? String(formData.DeliveryStatus)
              : "0",
            LiveStatus: formData?.LiveStatus
              ? String(formData.LiveStatus)
              : "0",
            IsSale: false,
            PhaseID: formData?.Phase ? Number(formData.Phase) : 0,
            PhaseDays: getlabel(formData?.Phase, phase) || "",
            Pic_Details: "",
            LiveDate: formData?.LiveDate
              ? formatDate(formData.LiveDate)
              : "1970-01-01",
          },
        ],
      })
      .then((res) => {
        if (res?.data?.success == true) {
          toast.success(res?.data?.message);
          handleSearch();
          setEditMode(false);
          setFormData({
            ...formData,
            MachineName: "",
            Modules: "",
            ModuleName: "",
            LiveDate: "",
            Phase: "",
            DeliveryStatus: "",
            LiveStatus: "",
            AfterLiveStatus: "",
            DocumentType: "",
            SelectFile: "",
            Document_Base64: "",
            FileExtension: "",
            ModulePrimaryID: "",
            PhaseDays: "",
            ModuleID: "",
            PhaseID: "",
            Pic_Details: "",
          });
        } else {
          toast.error(res?.data?.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // useEffect(() => {
  //   setTableData([...tableData, ...visible?.showData?.showData]);
  // }, []);

  const handleSearch = () => {
    axiosInstances
      .post(apiUrls?.getViewProject, {
        RoleID: 0,
        ProjectID: Number(data?.Id || data?.ProjectID),
        Title: "Module",
      })
      .then((res) => {
        setTableData(res?.data?.data);
        setFilteredData(res?.data?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 15;
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
  const searchHandleChange = (e) => {
    const { name, value } = e?.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleBillingEdit = (ele) => {
    // console.log("editdetails", ele);
    setFormData({
      ...formData,
      ModulePrimaryID: ele?.ID,
      Modules: ele?.ModuleID,
      ModuleName: ele?.ModuleName,
      AfterLiveStatus: ele?.AfterLiveStatus,
      DeliveryStatus: ele?.DeliveryStatus,
      LiveStatus: ele?.LiveStatus,
      IsSale: ele?.IsSale,
      Phase: ele?.PhaseID,
      PhaseDays: ele?.PhaseDays,
      LiveDate: ele?.LiveDate == "01-Jan-1970" ? "" : new Date(ele?.LiveDate),
      Pic_Details: ele?.Pic_Details,
    });
    setEditMode(true);
  };

  const handleFileChange = (e) => {
    const file = e?.target?.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader?.result.split(",")[1];
        const fileExtension = file?.name.split(".").pop();
        setFormData({
          ...formData,
          SelectFile: file,
          Document_Base64: base64String,
          FileExtension: fileExtension,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const [visible, setVisible] = useState({
    deleteVisible: false,
    moduleVisisble: false,
    showData: {},
  });

  const handleDeleteSelected = () => {
    setLoading(true);
    const selectedIds = tableData
      .filter((row) => row.remove)
      .map((row) => row.ID);

    if (selectedIds.length === 0) {
      toast.error("Please select at least one row to delete.");
      setLoading(false);
      return;
    }

    axiosInstances
      .post(apiUrls?.ProjectMasterUpdate, {
        ActionType: "DeleteModule",
        ProjectID: Number(data?.Id),
        ProjectModule: [
          {
            ModulePrimaryID: String(selectedIds.join(",")),
          },
        ],
      })
      .then((res) => {
        if (res?.data?.success === true) {
          toast.success(res?.data?.message);
          setLoading(false);
          handleSearch();
        } else {
          toast.error(res?.data?.message);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };
  const moduleTHEAD = [
    "S.No.",
    "Module Name",
    "LiveStatus",
    "DeliveryStatus",
    "AfterLiveStatus",
    "LiveDate",
    "Phase",
    <label style={{ alignItems: "center" }}>
      <input
        type="checkbox"
        name="selectAll"
        checked={selectAll}
        onChange={handleCheckBox}
      />{" "}
      &nbsp;All
    </label>,
    "Action",
  ];

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
  useEffect(() => {
    handleSearch();
    getModuleList();
  }, []);
  return (
    <>
      {visible?.deleteVisible && (
        <Modal
          modalWidth={"400px"}
          visible={visible}
          setVisible={setVisible}
          Header="Delete ModuleList"
        >
          <ModuleDeleteModal visible={visible} setVisible={setVisible} />
        </Modal>
      )}
      {visible?.moduleVisisble && (
        <Modal
          modalWidth={"600px"}
          visible={visible}
          setVisible={setVisible}
          tableDatas={tableData}
          Header="Create New Module"
        >
          <ProjectCreateModule
            visible={visible}
            setVisible={setVisible}
            tableDatas={tableData}
          />
        </Modal>
      )}

      <div className="card p-2">
        <div className="d-flex justify-content-between align-items-center">
          <span style={{ fontWeight: "bold" }}>
            Project Name : {data?.NAME || data?.ProjectName}
          </span>
          {/* <button
            className="btn btn-sm btn-primary ml-4"
            onClick={() => {
              setVisible({
                moduleVisisble: true,
                showData: tableData,
              });
            }}
          >
            Create New Module
          </button> */}
        </div>
      </div>
      <div className="card LocalityCard border p-2">
        <div className="row">
          <ReactSelect
            respclass="col-xl-2 col-md-4 col-sm-6 col-12"
            name="Modules"
            placeholderName="Module"
            dynamicOptions={module}
            optionLabel="Modules"
            className="Modules"
            handleChange={handleDeliveryChange}
            value={formData.Modules}
          />
          <div className="search-col" style={{ marginLeft: "8px" }}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <label className="switch" style={{ marginTop: "7px" }}>
                <input
                  type="checkbox"
                  name="LiveStatus"
                  checked={formData?.LiveStatus ? 1 : 0}
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
                {t("LiveStatus")}
              </span>
            </div>
          </div>
          {formData?.LiveStatus ? (
            <DatePicker
              className="custom-calendar"
              id="LiveDate"
              name="LiveDate"
              lable="LiveDate"
              placeholder={VITE_DATE_FORMAT}
              value={formData?.LiveDate}
              respclass="col-xl-2 col-md-4 col-sm-6 col-12"
              handleChange={searchHandleChange}
            />
          ) : (
            ""
          )}
          <ReactSelect
            style={{ marginLeft: "20px" }}
            name="Phase"
            respclass="col-xl-2 col-md-4 col-sm-6 col-12"
            placeholderName="Phase"
            dynamicOptions={phase}
            value={formData?.Phase}
            handleChange={handleDeliveryChange}
          />
          <div className="search-col" style={{ marginLeft: "8px" }}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <label className="switch" style={{ marginTop: "7px" }}>
                <input
                  type="checkbox"
                  name="AfterLiveStatus"
                  checked={formData?.AfterLiveStatus ? 1 : 0}
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
                {t("AfterLiveStatus")}
              </span>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <label
              className="switch"
              style={{ marginTop: "7px", marginLeft: "10px" }}
            >
              <input
                type="checkbox"
                name="DeliveryStatus"
                checked={formData?.DeliveryStatus == "1" ? true : false}
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
              DeliveryStatus
            </span>
          </div>
          {/* <Input
            type="file"
            id="SelectFile"
            name="SelectFile"
            respclass="col-sm-2 col-md-2 col-12 col-sm-12"
            style={{ width: "100%", marginLeft: "5px" }}
            onChange={handleFileChange}
          /> */}
          {loading ? (
            <Loading />
          ) : (
            <div className="ml-3">
              {editMode ? (
                <button
                  className="btn btn-sm btn-info"
                  onClick={handleUpdateModule}
                >
                  Update
                </button>
              ) : (
                <button
                  className="btn btn-sm btn-info"
                  onClick={handleCreateModule}
                >
                  Create
                </button>
              )}
            </div>
          )}
          {/* <div className="ml-5">
            <button
              className="btn btn-sm btn-success"
              onClick={() => {
                setVisibles({ showVisible: !visibles?.showVisible });
              }}
            >
              Create New Module
            </button>
          </div> */}

          {visibles?.showVisible && (
            <>
              <Input
                type="text"
                className="form-control"
                id="ModuleName"
                name="ModuleName"
                lable="Module Name"
                max={20}
                onChange={handleSelectChange}
                value={formData?.ModuleName}
                respclass="col-xl-2 col-md-4 col-sm-6 col-12"
              />

              <button
                className="btn btn-sm btn-success"
                onClick={handleModulesave}
              >
                Save
              </button>
            </>
          )}
        </div>
        {tableData?.length > 0 && (
          <div className="patient_registration_card mt-2 my-1">
            <Heading
              title="Module Status"
              secondTitle={
                <div className="row ">
                  <div className="d-flex">
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
                    <span style={{ fontWeight: "bold", marginRight: "5px" }}>
                      Total Record :&nbsp;{tableData?.length}
                    </span>
                  </div>
                  <div
                    className="d-flex flex-wrap align-items-center"
                    style={{ marginRight: "0px" }}
                  >
                    <div
                      className="d-flex "
                      style={{
                        justifyContent: "flex-start",
                        alignItems: "center",
                      }}
                    >
                      {/* <div className="mr-5">
                        <button
                          className="btn btn-xs btn-danger"
                          style={{
                            color: "white",
                            backgroundColor: "red !important",
                            borderColor: "red !important",
                            border: "none",
                          }}
                          onClick={() => {
                            setVisible({
                              deleteVisible: true,
                              showData: tableData,
                            });
                          }}
                        >
                          {" "}
                          Delete All
                        </button>
                      </div> */}
                    </div>
                  </div>
                </div>
              }
            />
            <Tables
              thead={moduleTHEAD}
              tbody={currentData?.map((ele, index) => ({
                "S.No.": (currentPage - 1) * rowsPerPage + index + 1,
                "Module Name": ele?.ModuleName,
                LiveStatus: ele?.LiveStatus === 0 ? "No" : "Yes",
                DeliveryStatus: ele?.DeliveryStatus === 0 ? "No" : "Yes",
                AfterLiveStatus: ele?.AfterLiveStatus === 0 ? "No" : "Yes",
                LiveDate: ele?.LiveDate == "01-Jan-1970" ? "" : ele?.LiveDate,
                Phase: ele?.PhaseDays,
                Remove: (
                  // <i
                  //   className="fa fa-times"
                  //   style={{ color: "red" }}
                  //   onClick={() => handleRemove(ele)}
                  // ></i>
                  <input
                    type="checkbox"
                    name="remove"
                    checked={ele?.remove || false}
                    onChange={(e) => handleCheckBox(e, index)}
                  />
                ),
                Action: (
                  <i
                    style={{ cursor: "pointer" }}
                    className="fa fa-edit"
                    onClick={() => handleBillingEdit(ele)}
                  ></i>
                ),
              }))}
              tableHeight={"tableHeight"}
            />
            <div className="pagination ml-auto" style={{ float: "right" }}>
              <button
                className="btn btn-sm btn-primary"
                style={{ marginRight: "33px" }}
                onClick={handleDeleteSelected}
              >
                Delete
              </button>
              <div>
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
                <span>
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        )}
        {/* <div className="mt-1 ml-auto">
          <button className="btn btn-sm btn-success">Update</button>
        </div> */}
      </div>
    </>
  );
};
export default ModuleTabModal;
