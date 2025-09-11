import React, { useEffect, useState } from "react";
import ReactSelect from "../components/formComponent/ReactSelect";
import axios from "axios";
import { apiUrls } from "../networkServices/apiEndpoints";
import { headers } from "../utils/apitools";
import Input from "../components/formComponent/Input";
import { toast } from "react-toastify";
import Heading from "../components/UI/Heading";
import Tables from "../components/UI/customTable";
import { inputBoxValidation } from "../utils/utils";
import { MOBILE_NUMBER_VALIDATION_REGX } from "../utils/constant";
import { useCryptoLocalStorage } from "../utils/hooks/useCryptoLocalStorage";
import DatePicker from "../components/formComponent/DatePicker";
import moment from "moment";
import { useTranslation } from "react-i18next";
const ClientToShift = ({ data }) => {
 
  const { VITE_DATE_FORMAT } = import.meta.env;
  const [t] = useTranslation();
  const [loading, setLoading] = useState(false);
  const [vertical, setVertical] = useState([]);
  const [team, setTeam] = useState([]);
  const [user, setUser] = useState([]);
  const [wing, setWing] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [docData, setDocData] = useState([]);
  const [levelList, setLevelList] = useState({
    leve1: {},
    level2: {},
    level3: {},
  });

  const [formData, setFormData] = useState({
    VerticalID: "",
    TeamID: "",
    WingID: "",
    Engineer1: "",
    Engineer1Mobile: "",
    Engineer1Email: "",
    Engineer2: "",
    Engineer2Mobile: "",
    Engineer2Email: "",
    Engineer3: "",
    Engineer3Mobile: "",
    Engineer3Email: "",
    isDue: "",
    FromDate: "",
  });

  const searchHandleChange = (e, index) => {
    const { name, value } = e?.target;
    setFormData({ ...formData, [name]: value });
  };
  const getVertical = () => {
    let form = new FormData();
    form.append("Id", useCryptoLocalStorage("user_Data", "get", "ID")),
      axios
        .post(apiUrls?.Vertical_Select, form, { headers })
        .then((res) => {
          const verticals = res?.data.data.map((item) => {
            return { label: item?.Vertical, value: item?.VerticalID };
          });
          setVertical(verticals);
        })
        .catch((err) => {
          console.log(err);
        });
  };
  const getTeam = () => {
    let form = new FormData();
    form.append("ID", useCryptoLocalStorage("user_Data", "get", "ID")),
      axios
        .post(apiUrls?.Team_Select, form, { headers })
        .then((res) => {
          const teams = res?.data.data.map((item) => {
            return { label: item?.Team, value: item?.TeamID };
          });
          setTeam(teams);
        })
        .catch((err) => {
          console.log(err);
        });
  };
  const documentTHEAD = [
    "S.No.",
    "Vertical",
    "Team",
    "Wing",
    "Project Name",
    "Type",
    "Print",
    // "Upload",
    "Uploaded By",
    "Uploaded Date",
    { name: "Remove", width: "5%" },
  ];

  const handleSearchDocs = () => {
    let form = new FormData();
    form.append("ID", useCryptoLocalStorage("user_Data", "get", "ID")),
      form.append(
        "RoleID",
        useCryptoLocalStorage("user_Data", "get", "RoleID")
      ),
      form.append(
        "LoginName",
        useCryptoLocalStorage("user_Data", "get", "realname")
      ),
      form.append("VerticalID", ""),
      form.append("TeamID", ""),
      form.append("WingID", ""),
      form.append("POC1", ""),
      form.append("POC2", ""),
      form.append("POC3", ""),
      form.append("Status", ""),
      form.append("ProjectID", data?.Id || data?.ProjectID),
      axios
        .post(apiUrls?.UploadDocument_Search, form, { headers })
        .then((res) => {
          setDocData(res?.data?.data);
        })
        .catch((err) => {
          console.log(err);
        });
  };
  const getWing = () => {
    let form = new FormData();
    form.append("ID", useCryptoLocalStorage("user_Data", "get", "ID")),
      axios
        .post(apiUrls?.Wing_Select, form, { headers })
        .then((res) => {
          const wings = res?.data.data.map((item) => {
            return { label: item?.Wing, value: item?.WingID };
          });
          setWing(wings);
        })
        .catch((err) => {
          console.log(err);
        });
  };
  const getReporter = () => {
    let form = new FormData();
    form.append("ID", useCryptoLocalStorage("user_Data", "get", "ID")),
      form.append(
        "RoleID",
        useCryptoLocalStorage("user_Data", "get", "RoleID")
      ),
      form.append("OnlyItdose", "1"),
      axios
        .post(apiUrls?.Reporter_Select, form, { headers })
        .then((res) => {
          const reporters = res?.data.data.map((item) => {
            return { label: item?.NAME, value: item?.ID };
          });
          setUser(reporters);
        })
        .catch((err) => {
          console.log(err);
        });
  };
  function getlabel(id, dropdownData) {
    const ele = dropdownData.filter((item) => item.value === id);
    return ele.length > 0 ? ele[0].label : "";
  }
  const handleSearch = () => {
    let form = new FormData();
    form.append("ID", useCryptoLocalStorage("user_Data", "get", "ID")),
      form.append(
        "RoleID",
        useCryptoLocalStorage("user_Data", "get", "RoleID")
      ),
      form.append(
        "LoginName",
        useCryptoLocalStorage("user_Data", "get", "realname")
      ),
      form.append("ProjectID", data?.Id || data?.ProjectID),
      form.append("Title", "ClickToShift"),
      axios
        .post(apiUrls?.getViewProject, form, { headers })
        .then((res) => {
          console.log(res);
          setTableData(res?.data?.data);
        })
        .catch((err) => {
          console.log(err);
        });
  };
  const handleSave = () => {
    const formDataJson = JSON.stringify([
      {
        SPOC_Level_1_ID: formData?.Engineer1,
        SPOC_Level_1_Name: getlabel(formData?.Engineer1, user),
        SPOC_Level_1_Mobile: formData?.Engineer1Mobile,
        SPOC_Level_1_Email: formData?.Engineer1Email,
        SPOC_Level_2_ID: formData?.Engineer2,
        SPOC_Level_2_Name: getlabel(formData?.Engineer2, user),
        SPOC_Level_2_Mobile: formData?.Engineer2Mobile,
        SPOC_Level_2_Email: formData?.Engineer2Email,
        SPOC_Level_3_ID: formData?.Engineer3,
        SPOC_Level_3_Name: getlabel(formData?.Engineer3, user),
        SPOC_Level_3_Mobile: formData?.Engineer3Mobile,
        SPOC_Level_3_Email: formData?.Engineer3Email,
        ProjectID: data?.Id || data?.ProjectID,
        ProjectName: data?.NAME || data?.ProjectName,
        ToVerticalID: formData?.VerticalID,
        ToVertical: getlabel(formData?.VerticalID, vertical),
        ToWingID: formData?.WingID,
        ToWing: getlabel(formData?.WingID, wing),
        ToTeamID: formData?.TeamID,
        ToTeam: getlabel(formData?.TeamID, team),
      },
    ]);
    if (formData?.VerticalID == "") {
      toast.error("Please select Vertical");
    } else if (formData?.TeamID == "") {
      toast.error("Please select Team");
    } else if (formData?.WingID == "") {
      toast.error("Please select Wing");
    } else if (formData?.Engineer1 == "") {
      toast.error("Please select Level1");
    } else if (formData?.Engineer2 == "") {
      toast.error("Please select Level2");
    } else if (formData?.Engineer3 == "") {
      toast.error("Please select Level3");
    } else if (formData?.FromDate == "") {
      toast.error("Please select Shifted Date");
    } else {
      let form = new FormData();
      form.append("ID", useCryptoLocalStorage("user_Data", "get", "ID")),
        form.append(
          "RoleID",
          useCryptoLocalStorage("user_Data", "get", "RoleID")
        ),
        form.append(
          "LoginName",
          useCryptoLocalStorage("user_Data", "get", "realname")
        ),
        form.append("ActionType", "ClickToShift"),
        form.append("ProjectID", data?.Id || data?.ProjectID),
        form.append(
          "dtShift",
          moment(formData?.FromDate).isValid()
            ? moment(formData?.FromDate).format("YYYY-MM-DD")
            : ""
        ),
        form.append("ProjectData", formDataJson),
        axios
          .post(apiUrls?.ProjectMasterUpdate, form, { headers })
          .then((res) => {
            if (res?.data?.status === true) {
              toast.success(res?.data?.message);
              handleSearch();
              setFormData({
                ...formData,
                VerticalID: "",
                TeamID: "",
                WingID: "",
                Engineer1: "",
                Engineer1Mobile: "",
                Engineer1Email: "",
                Engineer2: "",
                Engineer2Mobile: "",
                Engineer2Email: "",
                Engineer3: "",
                Engineer3Mobile: "",
                Engineer3Email: "",
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
  // const handleSave = () => {
  //   let form = new FormData();
  //   let newlevelPayload = [
  //     {
  //       // ...levelList?.leve1,
  //       SPOC_Level_1_ID:levelList?.leve1?.value,
  //       SPOC_Level_1_Name:levelList?.leve1?.label,
  //       SPOC_Level_1_Mobile: formData?.Engineer1Mobile,
  //       SPOC_Level_1_Email: formData?.Engineer1Email,
  //       ProjectID: data?.ProjectID,
  //       ProjectName: data?.ProjectName,
  //       VerticalID: formData?.VerticalID,
  //       FromVertical: getlabel(formData?.VerticalID, vertical),
  //       WingID: formData?.WingID,
  //       FromWing: getlabel(formData?.WingID, wing),
  //       TeamID: formData?.TeamID,
  //       FromTeam: getlabel(formData?.TeamID, team),
  //     },
  //     {
  //       // ...levelList?.level2,
  //       SPOC_Level_2_ID:levelList?.level2?.value,
  //       SPOC_Level_2_Name:levelList?.level2?.label,
  //       SPOC_Level_2_Mobile: formData?.Engineer2Mobile,
  //       SPOC_Level_2_Email: formData?.Engineer2Email,
  //       ProjectID: data?.ProjectID,
  //       ProjectName: data?.ProjectName,
  //       VerticalID: formData?.VerticalID,
  //       FromVertical: getlabel(formData?.VerticalID, vertical),
  //       WingID: formData?.WingID,
  //       FromWing: getlabel(formData?.WingID, wing),
  //       TeamID: formData?.TeamID,
  //       FromTeam: getlabel(formData?.TeamID, team),
  //     },
  //     {
  //       // ...levelList?.level3,
  //       SPOC_Level_3_ID:levelList?.level3?.value,
  //       SPOC_Level_3_Name:levelList?.level3?.label,
  //       SPOC_Level_3_Mobile: formData?.Engineer3Mobile,
  //       SPOC_Level_3_Email: formData?.Engineer3Email,
  //       ProjectID: data?.ProjectID,
  //       ProjectName: data?.ProjectName,
  //       VerticalID: formData?.VerticalID,
  //       FromVertical: getlabel(formData?.VerticalID, vertical),
  //       WingID: formData?.WingID,
  //       FromWing: getlabel(formData?.WingID, wing),
  //       TeamID: formData?.TeamID,
  //       FromTeam: getlabel(formData?.TeamID, team),
  //     },
  //   ];
  //   form.append("ID", useCryptoLocalStorage("user_Data", "get", "ID")),
  //     form.append("RoleID", useCryptoLocalStorage("user_Data", "get", "RoleID")),
  //     form.append("LoginName", useCryptoLocalStorage("user_Data", "get", "realname") ),
  //     form.append("ActionType", "ClickToShift"),
  //     form.append("ProjectData", JSON.stringify(newlevelPayload)),
  //     axios
  //       .post(apiUrls?.ProjectMasterUpdate, form, { headers })
  //       .then((res) => {
  //         if (res?.data?.status === true) {
  //           toast.success(res?.data?.message);
  //           handleSearch();
  //         } else {
  //           toast.error(res?.data?.message);
  //         }
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  // };
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

  // console.log('formData:::::', formData);
  useEffect(() => {
    getVertical();
    getTeam();
    getWing();
    getReporter();
    handleSearch();
    handleSearchDocs();
  }, []);
  const ownerTHEAD = ["Level", "Mobile", "Email"];
  const [ownerTbody, setOwnerTbody] = useState([
    { Level: "", Mobile: "", Email: "" },
    { Level: "", Mobile: "", Email: "" },
    { Level: "", Mobile: "", Email: "" },
  ]);
  const handleDeliveryChangeTab = (name, e) => {
    setLevelList((prev) => ({ ...prev, [name]: e }));
  };

  const clientshiftTHEAD = [
    "S.No.",
    "Team",
    "Level1",
    "Level2",
    "Level3",
    "ShiftedBy",
    "Shifted Date",
    "Print",
  ];
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;
  const totalPages = Math?.ceil(tableData?.length / rowsPerPage);
  const currentData = tableData?.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );
  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const [currentPagedoc, setCurrentPagedoc] = useState(1);
  const rowsPerPagedoc = 10;
  const totalPagesdoc = Math?.ceil(docData?.length / rowsPerPagedoc);
  const currentDatadoc = docData?.slice(
    (currentPagedoc - 1) * rowsPerPagedoc,
    currentPagedoc * rowsPerPagedoc
  );
  const handlePageChangedoc = (newPageDOC) => {
    if (newPageDOC > 0 && newPageDOC <= totalPagesdoc) {
      setCurrentPagedoc(newPageDOC);
    }
  };
  const handleCheckBox = (e) => {
    const { name, value, checked, type } = e?.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? (checked ? 1 : 0) : value,
    });
  };
  const handleDocRemove = (ele) => {
    setLoading(true);
    let form = new FormData();
    form.append("ID", useCryptoLocalStorage("user_Data", "get", "ID")),
      form.append(
        "LoginName",
        useCryptoLocalStorage("user_Data", "get", "realname")
      ),
      form.append("ProjectID", ele?.ProjectID),
      form.append("ActionType", "DeleteDocument"),
      form.append("DocumentPrimaryID", ele?.UniqueID),
      axios
        .post(apiUrls?.ProjectMasterUpdate, form, { headers })
        .then((res) => {
          if (res?.data?.status === true) {
            toast.success(res?.data?.message);
            handleSearchDocs();
            setLoading(false);
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
  return (
    <>
      <div className="card  p-2 ">
        <div className="row d-flex">
          <span style={{ fontWeight: "bold", marginLeft: "6px" }}>
            Project Name : {data?.NAME || data?.ProjectName}
          </span>
          <div className="search-col" style={{ marginLeft: "20px" }}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <label className="switch" style={{ marginTop: "7px" }}>
                <input
                  type="checkbox"
                  name="isDue"
                  checked={formData?.isDue ? 1 : 0}
                  onChange={handleCheckBox}
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
                Show Document Details
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="card">
        <div className="row p-2">
          {/* <div className="col-sm-6 d-flex"> */}
          <ReactSelect
            respclass="col-xl-2 col-md-4 col-sm-6 col-12"
            name="VerticalID"
            placeholderName="Vertical"
            dynamicOptions={vertical}
            handleChange={handleDeliveryChange}
            value={formData.VerticalID}
          />

          <ReactSelect
            respclass="col-xl-2 col-md-4 col-sm-6 col-12"
            name="TeamID"
            placeholderName="Team"
            dynamicOptions={team}
            handleChange={handleDeliveryChange}
            value={formData.TeamID}
          />

          <ReactSelect
            respclass="col-xl-2 col-md-4 col-sm-6 col-12"
            name="WingID"
            placeholderName="Wing"
            dynamicOptions={wing}
            handleChange={handleDeliveryChange}
            value={formData.WingID}
          />
          <ReactSelect
            name="Engineer1"
            respclass="col-xl-2 col-md-4 col-sm-6 col-12"
            placeholderName="Level 1"
            dynamicOptions={user}
            value={formData?.Engineer1}
            handleChange={handleDeliveryChange}
          />
          {formData?.Engineer1 && (
            <>
              <Input
                type="Engineer1Mobile"
                className="form-control"
                id="Engineer1Mobile"
                name="Engineer1Mobile"
                lable="Mobile"
                placeholder=" "
                onChange={(e) => {
                  inputBoxValidation(
                    MOBILE_NUMBER_VALIDATION_REGX,
                    e,
                    handleSelectChange
                  );
                }}
                value={formData?.Engineer1Mobile}
                respclass="col-xl-2 col-md-4 col-sm-4 col-12"
              />
              <Input
                type="text"
                className="form-control"
                id="Engineer1Email"
                name="Engineer1Email"
                lable="Email"
                placeholder=" "
                onChange={handleSelectChange}
                value={formData?.Engineer1Email}
                respclass="col-xl-2 col-md-4 col-sm-4 col-12"
              />
            </>
          )}
          <ReactSelect
            name="Engineer2"
            respclass="col-xl-2 col-md-4 col-sm-6 col-12 mt-1"
            placeholderName="Level 2"
            dynamicOptions={user}
            value={formData?.Engineer2}
            handleChange={handleDeliveryChange}
          />
          {formData?.Engineer2 && (
            <>
              <Input
                type="number"
                className="form-control mt-1"
                id="Engineer2Mobile"
                name="Engineer2Mobile"
                lable="Mobile"
                placeholder=" "
                onChange={(e) => {
                  inputBoxValidation(
                    MOBILE_NUMBER_VALIDATION_REGX,
                    e,
                    handleSelectChange
                  );
                }}
                value={formData?.Engineer2Mobile}
                respclass="col-xl-2 col-md-4 col-sm-4 col-12"
              />
              <Input
                type="text"
                className="form-control mt-1"
                id="Engineer2Email"
                name="Engineer2Email"
                lable="Email"
                placeholder=" "
                onChange={handleSelectChange}
                value={formData?.Engineer2Email}
                respclass="col-xl-2 col-md-4 col-sm-4 col-12"
              />
            </>
          )}
          <ReactSelect
            name="Engineer3"
            respclass="col-xl-2 col-md-4 col-sm-6 col-12 mt-1"
            placeholderName="Level 3"
            dynamicOptions={user}
            value={formData?.Engineer3}
            handleChange={handleDeliveryChange}
          />
          {formData?.Engineer3 && (
            <>
              <Input
                type="number"
                className="form-control mt-1"
                id="Engineer3Mobile"
                name="Engineer3Mobile"
                lable="Mobile"
                placeholder=" "
                onChange={(e) => {
                  inputBoxValidation(
                    MOBILE_NUMBER_VALIDATION_REGX,
                    e,
                    handleSelectChange
                  );
                }}
                value={formData?.Engineer3Mobile}
                respclass="col-xl-2 col-md-4 col-sm-4 col-12"
              />
              <Input
                type="text"
                className="form-control mt-1"
                id="Engineer3Email"
                name="Engineer3Email"
                lable="Email"
                placeholder=" "
                onChange={handleSelectChange}
                value={formData?.Engineer3Email}
                respclass="col-xl-2 col-md-4 col-sm-4 col-12"
              />
            </>
          )}

          <DatePicker
            className="custom-calendar"
            id="FromDate"
            name="FromDate"
            lable={t("Shifted Date")}
            placeholder={VITE_DATE_FORMAT}
            value={formData?.FromDate}
            respclass="col-xl-2 col-md-4 col-sm-6 col-12 mt-1"
            handleChange={searchHandleChange}
          />
          <button
            className="btn btn-sm btn-primary ml-2 mt-1"
            onClick={handleSave}
          >
            Save
          </button>
          {/* </div> */}

          {/* <div className="col-sm-6">
            <Heading title={"Details"} />
            <Tables
              thead={ownerTHEAD}
              tbody={ownerTbody?.map((ele, index) => ({
                Level: (
                  <ReactSelect
                    name={`level${index + 1}`}
                    respclass="col-xl-12 col-md-4 col-sm-6 col-12 mt-1"
                    placeholderName={`Level${index + 1}`}
                    dynamicOptions={user}
                    value={levelList[`level${index + 1}`]}
                    handleChange={handleDeliveryChangeTab}
                  />
                ),
                Mobile: (
                  <Input
                    type="number"
                    className="form-control mt-1"
                    id="Engineer1Mobile"
                    name={`Engineer${index + 1}Mobile`}
                    lable="Mobile"
                    placeholder=" "
                    onChange={(e) => {
                      inputBoxValidation(
                        MOBILE_NUMBER_VALIDATION_REGX,
                        e,
                        handleSelectChange
                      );
                    }}
                    value={formData[`Engineer${index + 1}Mobile`]}
                    respclass="col-xl-12 col-md-4 col-sm-4 col-12"
                  />
                ),
                Email: (
                  <Input
                    type="text"
                    className="form-control mt-1"
                    id="Engineer1Email"
                    name={`Engineer${index + 1}Email`}
                    lable="Email"
                    placeholder=" "
                    onChange={handleSelectChange}
                    value={formData[`Engineer${index + 1}Email`]}
                    respclass="col-xl-12 col-md-4 col-sm-4 col-12"
                  />
                ),
              }))}
              tableHeight={"tableHeight"}
            />
          </div> */}

          {/* <span style={{ fontWeight: "bold" }}>
            Are you sure you want to shift to support?{" "}
          </span> */}
        </div>
      </div>
      {formData?.isDue > 0 && (
        <div className="card mt-3 my-2">
          <Heading title="Document Upload Details" />
          <Tables
            thead={documentTHEAD}
            tbody={currentDatadoc?.map((ele, index) => ({
              "S.No.": (currentPagedoc - 1) * rowsPerPagedoc + index + 1,
              Vertical: ele?.Vertical,
              Team: ele?.Team,
              Wing: ele?.Wing,
              ProjectName: ele?.ProjectName,
              Type: ele?.DocumentName,
              Print: ele?.DocumentUrl ? (
                <i
                  className="fa fa-print"
                  style={{
                    marginLeft: "5px",
                    cursor: "pointer",
                    color: "white",
                    border: "1px solid green",
                    padding: "2px",
                    background: "black",
                    borderRadius: "3px",
                  }}
                  onClick={() => window.open(ele?.DocumentUrl, "_blank")}
                ></i>
              ) : null,

              UploadedBy: ele?.UploadedBy,
              UploadedDate: ele?.dtUpload,
              Remove: (
                <i
                  className="fa fa-times"
                  style={{ color: "red", marginLeft: "20px" }}
                  onClick={() => {
                    handleDocRemove(ele);
                  }}
                ></i>
              ),
              colorcode: ele?.colorcode,
            }))}
            tableHeight={"tableHeight"}
          />

          <div
            className="pagination"
            style={{ marginLeft: "auto", marginBottom: "9px" }}
          >
            <button
              onClick={() => handlePageChangedoc(currentPagedoc - 1)}
              disabled={currentPagedoc === 1}
            >
              Previous
            </button>
            <span>
              Page {currentPagedoc} of {totalPagesdoc}
            </span>
            <button
              onClick={() => handlePageChangedoc(currentPagedoc + 1)}
              disabled={currentPagedoc === totalPagesdoc}
            >
              Next
            </button>
          </div>
        </div>
      )}
      {tableData?.length > 0 && (
        <div className="card mt-3">
          <Heading title={"Clik To Shift Details"} />
          <Tables
            thead={clientshiftTHEAD}
            tbody={currentData?.map((ele, index) => ({
              "S.No.": (currentPage - 1) * rowsPerPage + index + 1,
              Team: (
                <div dangerouslySetInnerHTML={{ __html: ele?.TeamDisplay }} />
              ),

              Level1: (
                <div
                  dangerouslySetInnerHTML={{
                    __html: ele?.SPOC_Level_1_Display,
                  }}
                />
              ),
              Level2: (
                <div
                  dangerouslySetInnerHTML={{
                    __html: ele?.SPOC_Level_2_Display,
                  }}
                />
              ),
              Level3: (
                <div
                  dangerouslySetInnerHTML={{
                    __html: ele?.SPOC_Level_3_Display,
                  }}
                />
              ),
              ShiftedBy: ele?.ShiftedBy,
              "Shifted Date": ele?.dtShift,
              Print: (
                <i
                  className="fa fa-print"
                  style={{
                    marginLeft: "5px",
                    cursor: "pointer",
                    color: "black",
                    padding: "2px",
                    borderRadius: "3px",
                  }}
                  onClick={() => window.open(ele?.PDFURL, "_blank")}
                ></i>
              ),
            }))}
            tableHeight={"tableHeight"}
          />
          <div className="pagination ml-auto">
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
    </>
  );
};

export default ClientToShift;
