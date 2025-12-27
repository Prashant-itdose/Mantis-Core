import React, { useEffect, useState } from "react";
import ReactSelect from "../../components/formComponent/ReactSelect";
import { useCryptoLocalStorage } from "../../utils/hooks/useCryptoLocalStorage";
import { axiosInstances } from "../../networkServices/axiosInstance";
import { apiUrls } from "../../networkServices/apiEndpoints";
import Input from "../../components/formComponent/Input";
import DatePicker from "../../components/formComponent/DatePicker";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import Heading from "../../components/UI/Heading";
import Tables from "../../components/UI/customTable";
import moment from "moment";
import Loading from "../../components/loader/Loading";

const EmployeeTransfer = () => {
  const [t] = useTranslation();
  const [loading, setLoading] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [formData, setFormData] = useState({
    Employee: "",
    EmployeeSearch: "",
    TransferDate: new Date(),
    VerticalID: "",
    TeamID: "",
    WingID: "",
    ReportingTo: "",
  });
  const { VITE_DATE_FORMAT } = import.meta.env;
  const [vertical, setVertical] = useState([]);
  const [team, setTeam] = useState([]);
  const [reporter, setReporter] = useState([]);
  const [wing, setWing] = useState([]);
  const [assignto, setAssignedto] = useState([]);
  const searchHandleChange = (e) => {
    const { name, value } = e?.target;
    setFormData({ ...formData, [name]: value });
  };
  const getAssignTo = () => {
    axiosInstances
      .post(apiUrls.EmployeeBind, {
        CrmEmployeeID: Number(
          useCryptoLocalStorage("user_Data", "get", "CrmEmployeeID")
        ),
        RoleID: Number(useCryptoLocalStorage("user_Data", "get", "RoleID")),
      })
      .then((res) => {
        const wings = res?.data?.data?.map((item) => {
          return { label: item?.EmployeeName, value: item?.Employee_ID };
        });
        setAssignedto(wings);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDeliveryChange = (name, e) => {
    const { value } = e;
    if (name == "Employee") {
      setFormData({
        ...formData,
        [name]: value,
      });
      getDetails(value);
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };
  const getVertical = () => {
    axiosInstances
      .post(apiUrls.Vertical_Select, {})
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
    axiosInstances
      .post(apiUrls?.Old_Mantis_Team_Select, {})
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
  const getWing = () => {
    axiosInstances
      .post(apiUrls.Wing_Select, {})
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
    axiosInstances
      .post(apiUrls.GetReportingTo_Employee, {})

      .then((res) => {
        const reporters = res?.data.data.map((item) => {
          return { label: item?.NAME, value: item?.Employee_ID };
        });
        setReporter(reporters);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const [details, setDetails] = useState([]);
  console.log("details", details);
  const getDetails = (value) => {
    console.log("details details", details);
    axiosInstances
      .post(apiUrls.SearchEmployeeTeamData, {
        EmployeeID: Number(value),
      })
      .then((res) => {
        if (res.data.success === true) {
          setDetails(res.data.data);
        } else {
          toast.error("No Record Found..");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleSaerch = () => {
    if (!formData?.EmployeeSearch) {
      toast.error("Please Select Employee.");
      return;
    }
    setLoading(true);
    axiosInstances
      .post(apiUrls.GetEmployeeTransferLogs, {
        EmployeeID: Number(formData?.EmployeeSearch),
      })
      .then((res) => {
        if (res.data.success === true) {
          setTableData(res.data.data);
          setLoading(false);
        } else {
          toast.error("No Record Found..");
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  function getlabel(id, dropdownData) {
    const ele = dropdownData?.filter((item) => item?.value === id);
    return ele?.length > 0 ? ele[0].label : undefined;
  }
  const handleTransfer = () => {
    if (!formData?.ReportingTo) {
      toast.error("Please Select Reporting Manager.");
      return;
    }
    if (!formData?.VerticalID) {
      toast.error("Please Select Vertical.");
      return;
    }
    if (!formData?.TeamID) {
      toast.error("Please Select Team.");
      return;
    }
    if (!formData?.WingID) {
      toast.error("Please Select Wing.");
      return;
    }
    if (!formData?.TransferDate) {
      toast.error("Please Select Transfer Date.");
      return;
    }
    setLoading(true);
    axiosInstances
      .post(apiUrls.CreateEmployeeTransfer, {
        EmployeeID: formData?.Employee,
        EmployeeName: String(getlabel(formData?.Employee, assignto)),
        VerticalID: formData?.VerticalID,
        VerticalName: String(getlabel(formData?.VerticalID, vertical)),
        WingID: formData?.WingID,
        WingName: String(getlabel(formData?.WingID, wing)),
        TeamID: formData?.TeamID,
        TeamName: String(getlabel(formData?.TeamID, team)),
        ManagerID: formData?.ReportingTo,
        ManagerName: String(getlabel(formData?.ReportingTo, reporter)),
        TransferDate: String(
          moment(formData?.TransferDate).format("YYYY-MM-DD")
        ),
      })
      .then((res) => {
        if (res.data.success === true) {
          toast.success(res.data.message);
          setLoading(false);
        } else {
          toast.error("No Record Found..");
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
    getAssignTo();
    getTeam();
    getVertical();
    getWing();
    getReporter();
  }, []);

  const localTHEAD = [
    "S.No.",
    "Employee Name",
    "Reporting Manager",
    "Vertical",
    "Team",
    "Wing",
    "Transfer Date",
    "Trasnfer By",
    // "DurationInPreviousRole",
  ];
  return (
    <>
      <div className="card">
        <div className="row p-1 mt-2">
          <label className="font-weight-bold ml-2">From : </label>
          <ReactSelect
            name="Employee"
            respclass="col-xl-2 col-md-4 col-sm-6 col-12"
            placeholderName="Employee"
            dynamicOptions={assignto}
            value={formData?.Employee}
            handleChange={handleDeliveryChange}
            requiredClassName={"required-fields"}
          />

          <Input
            type="text"
            className="form-control"
            id="ReportingManager"
            name="ReportingManager"
            lable="Reporting Manager"
            placeholder=" "
            onChange={handleSelectChange}
            value={details?.[0]?.ManagerName}
            respclass="col-xl-2 col-md-4 col-sm-4 col-12"
            disabled
          />
          <Input
            type="text"
            className="form-control"
            id="Vertical"
            name="Vertical"
            lable="Vertical"
            placeholder=" "
            onChange={handleSelectChange}
            value={details?.[0]?.VerticalName}
            respclass="col-xl-2 col-md-4 col-sm-4 col-12"
            disabled
          />
          <Input
            type="text"
            className="form-control"
            id="Team"
            name="Team"
            lable="Team"
            placeholder=" "
            onChange={handleSelectChange}
            value={details?.[0]?.TeamName}
            respclass="col-xl-2 col-md-4 col-sm-4 col-12"
            disabled
          />
          <Input
            type="text"
            className="form-control"
            id="Wing"
            name="Wing"
            lable="Wing"
            placeholder=" "
            onChange={handleSelectChange}
            value={details?.[0]?.WingName}
            respclass="col-xl-2 col-md-4 col-sm-4 col-12"
            disabled
          />
        </div>
        <div className="row p-1 mt-3">
          <label className="font-weight-bold ml-2">To : </label>

          <ReactSelect
            name="ReportingTo"
            respclass="col-xl-2 col-md-4 col-sm-6 col-12 ml-3"
            placeholderName="Reporting Manager"
            dynamicOptions={reporter}
            value={formData?.ReportingTo}
            handleChange={handleDeliveryChange}
            requiredClassName={"required-fields"}
          />
          <ReactSelect
            name="VerticalID"
            respclass="col-xl-2 col-md-4 col-sm-6 col-12"
            placeholderName="Vertical"
            dynamicOptions={vertical}
            value={formData?.VerticalID}
            handleChange={handleDeliveryChange}
            requiredClassName={"required-fields"}
          />
          <ReactSelect
            name="TeamID"
            respclass="col-xl-2 col-md-4 col-sm-6 col-12"
            placeholderName="Team"
            dynamicOptions={team}
            value={formData?.TeamID}
            handleChange={handleDeliveryChange}
            requiredClassName={"required-fields"}
          />
          <ReactSelect
            name="WingID"
            respclass="col-xl-2 col-md-4 col-sm-6 col-12"
            placeholderName="Wing"
            dynamicOptions={wing}
            value={formData?.WingID}
            handleChange={handleDeliveryChange}
            requiredClassName={"required-fields"}
          />
          <DatePicker
            className="custom-calendar"
            id="TransferDate"
            name="TransferDate"
            lable={t("Transfer Date")}
            placeholder={VITE_DATE_FORMAT}
            value={formData?.TransferDate}
            respclass="col-xl-2 col-md-4 col-sm-6 col-12"
            handleChange={searchHandleChange}
            requiredClassName={"required-fields"}
          />
          {loading ? (
            <Loading />
          ) : (
            <button
              className="btn btn-sm btn-success ml-4"
              onClick={handleTransfer}
            >
              Transfer
            </button>
          )}
        </div>
        {/* <div className="row p-1 mt-3">
          <div className="col d-flex justify-content-center">
            <button className="btn btn-sm btn-success">Transfer</button>
          </div>
        </div> */}
      </div>
      <div className="card mt-3">
        <Heading
          title={<span className="font-weight-bold"> Transfer Details</span>}
        />
        <div className="row p-2">
          <ReactSelect
            name="EmployeeSearch"
            respclass="col-xl-2 col-md-4 col-sm-6 col-12 ml-3"
            placeholderName="Employee"
            dynamicOptions={assignto}
            value={formData?.EmployeeSearch}
            handleChange={handleDeliveryChange}
            requiredClassName={"required-fields"}
          />

          {loading ? (
            <Loading />
          ) : (
            <button className="btn btn-sm btn-info ml-3" onClick={handleSaerch}>
              Search
            </button>
          )}
        </div>
        <div>
          <Tables
            thead={localTHEAD}
            tbody={tableData?.map((ele, index) => ({
              "S.No.": index + 1,
              "Employee Name": ele?.EmployeeName,
              "Reporting Manager": ele?.ManagerName,
              Vertical: ele?.VerticalName,
              Team: ele?.TeamName,
              Wing: ele?.WingName,
              "Transfer Date": ele?.TransferDate,
              "Trasnfer By": ele?.TransferByName,
              // DurationInPreviousRole: ele?.DurationInPreviousRole,
            }))}
            tableHeight={"tableHeight"}
          />
        </div>
      </div>
    </>
  );
};
export default EmployeeTransfer;
