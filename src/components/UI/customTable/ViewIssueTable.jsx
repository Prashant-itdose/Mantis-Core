import React, { useEffect, useState } from "react";
import NoRecordFound from "../../formComponent/NoRecordFound";
import Tables from ".";
import Heading from "../Heading";
import Input from "../../formComponent/Input";
import { Link } from "react-router-dom";
import Tooltip from "../../../pages/Tooltip";
import ReactSelect from "../../formComponent/ReactSelect";
import DatePicker from "../../formComponent/DatePicker";
import Modal from "../../modalComponent/Modal";
import ViewIssueDetailsTableModal from "./ViewIssueDetailsTableModal";
import ViewIssueDocModal from "./ViewIssueDocModal";
import ViewIssueNotesModal from "./ViewIssueNotesModal";
import ViewIssueDocTable from "./ViewIssueDocTable";
import SummaryStatusModal from "./SummaryStatusModal";
import { useCryptoLocalStorage } from "../../../utils/hooks/useCryptoLocalStorage";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import CustomPagination from "../../../utils/CustomPagination"
const ViewIssueTable = (props) => {
  const {
    // tbody = [...tbody],
    values,
    handleCustomSelect,
    viewissuesTHEAD,
    tableData,
    setTableData,
    formData,
  } = props;
   const [t] = useTranslation();
  const { clientId } = useSelector((state) => state?.loadingSlice);
  const AllowDeleteTicket = useCryptoLocalStorage(
    "user_Data",
    "get",
    "AllowDeleteTicket"
  );
  const AllowDeliveryDateEdit = useCryptoLocalStorage(
    "user_Data",
    "get",
    "AllowDeliveryDateEdit"
  );
  const AllowManHourEdit = useCryptoLocalStorage(
    "user_Data",
    "get",
    "AllowManHourEdit"
  );
 const ShowClientDeliveryDate = useCryptoLocalStorage(
    "user_Data",
    "get",
    "ShowClientDeliveryDate"
  );
  const ShowClientManHour = useCryptoLocalStorage(
    "user_Data",
    "get",
    "ShowClientManHour"
  );
    const handlePageReset = () => {
      setFormData((val) => ({
        ...val,
        PageNo: "",
        PageSize: 50,
        SubmitDate: "",
        DeliveryDate:
          data?.fiveDate || data?.DelayDate || data?.PlannedDate
            ? data?.fiveDate || data?.DelayDate || data?.PlannedDate
            : "",
        ClientDeliveryDate: "",
        AssignedDate: "",
        ResolveDate: "",
        CloseDate: "",
        UpadteDate: "",
        ManHourDropdown: "",
        ClientManHourDropdown: "",
        OnlyReOpen: "",
        OnlyDeliveryDateChange: "",
        SubmitDateBefore: new Date(),
        SubmitDateAfter: new Date(),
        SubmitDateCurrent: new Date(),
  
        DeliveryDateBefore: new Date(),
        DeliveryDateAfter: new Date(),
        DeliveryDateCurrent: new Date(),
  
        AssignedDateBefore: new Date(),
        AssignedDateAfter: new Date(),
        AssignedDateCurrent: new Date(),
  
        ClientDeliveryDateBefore: new Date(),
        ClientDeliveryDateAfter: new Date(),
        ClientDeliveryDateCurrent: new Date(),
  
        ManHourBefore: "",
        ManHourAfter: "",
        ManHourCurrent: "",
  
        ClientManHourBefore: "",
        ClientManHourAfter: "",
        ClientManHourCurrent: "",
  
        ResolveDateBefore: new Date(),
        ResolveDateAfter: new Date(),
        ResolveDateCurrent: new Date(),
  
        CloseDateBefore: new Date(),
        CloseDateAfter: new Date(),
        CloseDateCurrent: new Date(),
  
        UpadteDateBefore: new Date(),
        UpadteDateAfter: new Date(),
        UpadteDateCurrent: new Date(),
  
        ProjectID: [],
        VerticalID: [],
        TeamID: [],
        WingID: [],
        POC1: [],
        POC2: [],
        POC3: [],
        Reporter: [],
        AssignedTo: [],
        AssignedToStatus: "",
        MoveStatus: "",
        UpdateToStatus: "",
        UpdateToCategory: "",
        DeliveryToStatus: "",
        RemoveDeliveryToStatus: "",
        Priority: "",
        Category: [],
        HideStatus: "80" ? "80" : "1",
        // Status: "1" ? "1" : "70",
        Status: [1] ? [1] : [70],
        TableStatus: "",
        IsActive: "",
        RefereRCA: "",
        RefereCode: "",
        ManHours: "",
        ManHour: "",
        Hold: "",
        Ticket: "",
        summary: "",
        ModuleName: [],
        PagesName: "",
        SearhType: "0",
      }));
    };
  const dynamicOptionStatus = [
    { label: "Close", value: "Close" },
    { label: "Resolve", value: "Resolve" },
    { label: "Status", value: "UpdateStatus" },
    {
      label: "Hold",
      value: "Hold",
    },
    {
      label: "ReOpen",
      value: "ReOpen",
    },
  ];
  const tabledynamicOptions = [
    { label: "Move", value: "Move" },
    { label: "Assign", value: "Assign" },
    { label: "Close", value: "Close" },
    { label: "Resolve", value: "Resolve" },
    { label: "Status", value: "UpdateStatus" },
    {
      label: "Category",
      value: "UpdateCategory",
    },
    {
      label: "DeliveryDate",
      value: "UpdateDeliveryDate",
    },
    {
      label: "ManMinutes",
      value: "ManHours",
    },
    {
      label: "Hold",
      value: "Hold",
    },
    {
      label: "RemoveDeliveryDate",
      value: "RemoveDeliveryDate",
    },
  ];
   const handleDelete = () => {
      const filterdata = tableData?.filter((item) => item.IsActive == true);
      const ticketIDs = filterdata.map((item) => item.TicketID).join(",");
      let form = new FormData();
      form.append("Id", useCryptoLocalStorage("user_Data", "get", "ID")),
        form.append(
          "LoginName",
          useCryptoLocalStorage("user_Data", "get", "realname")
        ),
        form.append("TicketIDs", ticketIDs),
        axios
          .post(apiUrls?.DeleteTicket, form, { headers })
          .then((res) => {
            toast.success(res?.data?.message);
            handleViewSearch();
          })
          .catch((err) => {
            console.log(err);
          });
    };
  const filteredOptions =
    clientId === 7
      ? dynamicOptionStatus.filter((option) => option.value === "Close")
      : dynamicOptionStatus;
  const filteredOptionsTable =
    clientId === 7
      ? tabledynamicOptions.filter((option) => option.value === "Close")
      : tabledynamicOptions;
  const [viewIssueDetail, setViewIssueDetail] = useState({});
  const [visible, setVisible] = useState({
    showVisible: false,
    docVisible: false,
    noteVisible: false,
    docViewVisible: false,
    summaryVisible: false,
    showData: {},
  });

  const handleDeliveryChangeCheckbox = (e, index) => {
    const { checked } = e.target;
    const data = [...tableData];
    data[index]["IsActive"] = checked;
    setTableData(data);
  };

  const shortenNamesummary = (name) => {
    return name?.length > 20 ? name?.substring(0, 15) + "..." : name;
  };

  const handleIconClickdate = (value, index) => {
    let data = [...tableData];
    data[index]["isDate"] = !data[index]["isDate"];
    setTableData(data);

    // Delay to allow re-render of the DatePicker component
    setTimeout(() => {
      const ref = datePickerRefs.current[index];
      if (ref?.setOpen) {
        ref.setOpen(true); // react-datepicker style
      } else if (ref?.input) {
        ref.input.click(); // fallback for input-based calendars
      }
    }, 100);
  };

  const handleIconClientClickdate = (value, index) => {
    let data = [...tableData];
    data[index]["isClientDate"] = !data[index]["isClientDate"];
    setTableData(data);
  };
  const handleIconClickCategory = (value, index) => {
    let data = [...tableData];
    data[index]["isCategory"] = !data[index]["isCategory"];
    setTableData(data);
  };
  const handleIconClickProject = (value, index) => {
    let data = [...tableData];
    data[index]["isProject"] = !data[index]["isProject"];
    setTableData(data);
  };
  const handleIconClickStatus = (value, index) => {
    let data = [...tableData];
    data[index]["isStatus"] = !data[index]["isStatus"];
    setTableData(data);
  };
  const handleIconClickAssignTo = (value, index) => {
    console.log(value);
    let data = [...tableData];
    data[index]["isAssignTo"] = !data[index]["isAssignTo"];
    setTableData(data);
    getAssignToValueProjectID(value?.ProjectID);
  };

  const searchHandleChangeTable = (name, value, index, ele) => {
    const details = tableData[index];
    let updatedData = [...tableData];
    updatedData[index][name] = value;
    setTableData(updatedData);

    updateReceivedDate(details, value, index, name);

    // console.log("raj check", details);
  };
  const searchHandleChangeTableClient = (name, value, index, ele) => {
    const details = tableData[index];
    let updatedData = [...tableData];
    updatedData[index][name] = value;
    setTableData(updatedData);

    ClientupdateReceivedDate(details, value, index, name);
    // console.log("raj check", details);
  };

  const updateReceivedDate = (details, item, value, name) => {
    // console.log("master check", details);
    let form = new FormData();
    form.append("ID", useCryptoLocalStorage("user_Data", "get", "ID")),
      form.append(
        "LoginName",
        useCryptoLocalStorage("user_Data", "get", "realname")
      ),
      form.append("TicketIDs", details?.TicketID),
      form.append("ActionText", name),
      form.append("ActionId", formatDate(details?.DeliveryDate)),
      axios
        .post(apiUrls?.ApplyAction, form, { headers })
        .then((res) => {
          if (res?.data?.status === true) {
            toast.success(res?.data?.message);
            handleViewSearch();
          } else {
            toast.error(res?.data?.message);
          }
        })
        .catch((err) => {
          console.log(err);
        });
  };
  const ClientupdateReceivedDate = (details, item, value, name) => {
    console.log("master check", details, name);
    let form = new FormData();
    form.append("ID", useCryptoLocalStorage("user_Data", "get", "ID")),
      form.append(
        "LoginName",
        useCryptoLocalStorage("user_Data", "get", "realname")
      ),
      form.append("TicketIDs", details?.TicketID),
      form.append("ActionText", "DeliveryDateClient"),
      form.append(
        "ActionId",
        formatDate(details?.DeliveryDateClient) ||
          formatDate(formData?.ClientDeliveryDate)
      ),
      axios
        .post(apiUrls?.ApplyAction, form, { headers })
        .then((res) => {
          if (res?.data?.status === true) {
            toast.success(res?.data?.message);
            handleViewSearch();
          } else {
            toast.error(res?.data?.message);
          }
        })
        .catch((err) => {
          console.log(err);
        });
  };
  const handleIconClick = (value, index) => {
    let data = [...tableData];
    data[index]["isManHour"] = !data[index]["isManHour"];
    setTableData(data);
  };
  const handleClientIconClick = (value, index) => {
    let data = [...tableData];
    data[index]["isClientManHour"] = !data[index]["isClientManHour"];
    setTableData(data);
  };
  const handleIconClickSummary = (value, index) => {
    let data = [...tableData];
    data[index]["isSummary"] = !data[index]["isSummary"];
    setTableData(data);
  };

  const handleManHourTable = (details) => {
    let form = new FormData();
    form.append("ID", useCryptoLocalStorage("user_Data", "get", "ID")),
      form.append(
        "LoginName",
        useCryptoLocalStorage("user_Data", "get", "realname")
      ),
      form.append("TicketIDs", details?.TicketID),
      form.append("ActionText", "ManHours"),
      form.append("ActionId", details?.ManHour),
      axios
        .post(apiUrls?.ApplyAction, form, { headers })
        .then((res) => {
          toast.success(res?.data?.message);
          handleViewSearch();
        })
        .catch((err) => {
          console.log(err);
        });
  };
  const handleClientManHourTable = (details) => {
    let form = new FormData();
    form.append("ID", useCryptoLocalStorage("user_Data", "get", "ID")),
      form.append(
        "LoginName",
        useCryptoLocalStorage("user_Data", "get", "realname")
      ),
      form.append("TicketIDs", details?.TicketID),
      form.append("ActionText", "ManHoursClient"),
      form.append("ActionId", details?.ManHoursClient),
      axios
        .post(apiUrls?.ApplyAction, form, { headers })
        .then((res) => {
          toast.success(res?.data?.message);
          handleViewSearch();
        })
        .catch((err) => {
          console.log(err);
        });
  };
  const handleSummaryTable = (details) => {
    // console.log("SummaryTable", details);
    let form = new FormData();
    form.append("ID", useCryptoLocalStorage("user_Data", "get", "ID")),
      form.append(
        "LoginName",
        useCryptoLocalStorage("user_Data", "get", "realname")
      ),
      form.append("TicketIDs", details?.TicketID),
      form.append("ActionText", "Summary"),
      form.append("Summary", details?.summary),
      axios
        .post(apiUrls?.ApplyAction, form, { headers })
        .then((res) => {
          toast.success(res?.data?.message);
          handleViewSearch();
        })
        .catch((err) => {
          console.log(err);
        });
  };

  const handleSelectChange = (e, index) => {
    const { name, value } = e.target;
    const data = JSON.parse(JSON.stringify(tableData));
    // data[index][name] = value;
    data[index][name] = value;
    setTableData(data);
    setViewIssueDetail(data[index]);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const totalRecords =
    tableData?.length > 0 ? parseInt(tableData[0]?.TotalRecord) : 0;
  const totalPages = Math.ceil(totalRecords / (formData?.PageSize || 10));
  const currentData = tableData;
  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(1);
    }
  }, [totalPages]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    handleViewSearch(undefined, newPage - 1);
  };

  const handleDeliveryChangeValue = (name, value, ind, page, ele) => {
    let index = 0;
    tableData.map((val, ind) => {
      if (val?.TicketID !== ele?.TicketID) {
        val["TableStatus"] = null;
      } else {
        index = ind;
      }
      return val;
    });
    // console.log("valuevaluevalue",index)

    if (name == "Move") {
      const data = [...tableData];
      data[index]["TableStatus"] = value;
      data[index]["MoveResolve"] = true;
      setTableData(data);
    } else if (name == "Assign") {
      const data = [...tableData];
      data[index]["TableStatus"] = value;
      // console.log("projectid",value)
      data[index]["AssignResolve"] = true;
      setTableData(data);
    } else if (name == "AssignDropDownValue") {
      const data = [...tableData];
      data[index][name] = value;
      setTableData(data);
    } else if (name == "UpdateStatus") {
      const data = [...tableData];
      data[index]["TableStatus"] = value;
      data[index]["UpdateStatusResolve"] = true;
      setTableData(data);
    } else if (name == "UpdateStatusValue") {
      const data = [...tableData];
      data[index][name] = value;
      setTableData(data);
    } else if (name == "ReOpenValue") {
      const data = [...tableData];
      data[index][name] = value;
      setTableData(data);
    } else if (name == "UpdateCategory") {
      const data = [...tableData];
      data[index]["TableStatus"] = value;
      data[index]["UpdateCategoryResolve"] = true;
      setTableData(data);
    } else if (name == "UpdateCategoryValue") {
      const data = [...tableData];
      data[index][name] = value;
      setTableData(data);
    } else if (name == "UpdateDeliveryDate") {
      const data = [...tableData];
      data[index]["TableStatus"] = value;
      data[index]["UpdatedeliverydateResolve"] = true;
      setTableData(data);
    } else if (name == "UpdatedeliverydateValue") {
      const data = [...tableData];
      data[index][name] = value;
      // data[index]["TableStatus"] = value;
      setTableData(data);
    } else if (name == "TableStatus") {
      const data = [...tableData];
      data[index][name] = value;
      data[index]["TableStatus"] = value;

      setTableData(data);
      value == "Assign" && getAssignToValueProjectID(ele?.ProjectID);
    } else {
      const data = [...tableData];
      // data[index]["TableStatus"] = value;
      data[index][name] = value;
      setTableData(data);
    }
  };
  const handleAgainChange = (name, value, index, ele) => {
    // console.log("ttttttttttttt",name, value, index);

    let updatedData = [...tableData];
    updatedData[index][name] = value;
    setTableData(updatedData);

    if (name === "UpdatedeliverydateValue")
      getApplyAction(
        {
          label: "DeliveryDate",
          value: moment(value).format("YYYY-MM-DD"),
        },
        index
      );
    else if (name === "UpdateCategoryValue") {
      getApplyAction(
        {
          label: "Category",
          value: value.value,
        },
        index
      );
    } else if (name === "UpdateStatusValue") {
      getApplyAction(
        {
          label: "Status",
          value: value.value,
        },
        index
      );
    } else if (name === "ReOpenValue") {
      getApplyActionReason(
        {
          label: value?.label,
          value: value.value,
        },
        index
      );
    } else if (name === "AssignDropDownValue") {
      getApplyActionAssign(
        {
          label: "Assign",
          value: value.value,
        },
        index,
        ele
      );
    } else if (name === "MoveDropDownValue") {
      getApplyAction(
        {
          label: "Move",
          value: value.value,
        },
        index
      );
    } else getApplyAction(value, index);
  };
  const handleDeliveryChangeValueStatus = (name, value) => {
    setFormData({ ...formData, [name]: value });
    const filterdata = tableData?.filter((item) => item.IsActive === true);
    const ticketIDs = filterdata.map((item) => item.TicketID).join(",");
    const formattedTicketIDs = Array.isArray(ticketIDs)
      ? ticketIDs
      : [ticketIDs];
    if (name === "DeliveryToStatus") {
      getmultiApplyAction(formattedTicketIDs, {
        label: "DeliveryDate",
        value: moment(value).format("YYYY-MM-DD"),
      });
    } else if (name === "RemoveDeliveryToStatus") {
      getmultiApplyAction(formattedTicketIDs, {
        label: "RemoveDeliveryDate",
        value: moment(value).format("YYYY-MM-DD"),
      });
    } else if (name === "UpdateToCategory") {
      getmultiApplyAction(formattedTicketIDs, {
        label: "Category",
        value: value.value,
      });
    } else if (name === "UpdateToStatus") {
      getmultiApplyAction(formattedTicketIDs, {
        label: "Status",
        value: value.value,
      });
    } else if (name === "AssignedToStatus") {
      getmultiApplyAction(formattedTicketIDs, {
        label: "Assign",
        value: value.value,
      });
    } else if (name === "MoveStatus") {
      getmultiApplyAction(formattedTicketIDs, {
        label: "Move",
        value: value.value,
      });
    } else if (name !== "TableStatus") {
      getmultiApplyAction(formattedTicketIDs, value);
    }
  };

  const handleDeliveryRemove = () => {
    const filterdata = tableData?.filter((item) => item.IsActive == true);
    const ticketIDs = filterdata.map((item) => item.TicketID).join(",");
    if (ticketIDs == "") {
      toast.error("Please Select atleast one Ticket.");
    } else {
      let form = new FormData();
      form.append("ID", useCryptoLocalStorage("user_Data", "get", "ID")),
        form.append(
          "LoginName",
          useCryptoLocalStorage("user_Data", "get", "realname")
        ),
        form.append("TicketIDs", ticketIDs),
        form.append("ActionText", "DeliveryDate"),
        form.append("ActionId", ""),
        axios
          .post(apiUrls?.ApplyAction, form, { headers })
          .then((res) => {
            toast.success(res?.data?.message);
            setFormData({
              ...formData,
              RemoveDeliveryToStatus: "",
            });
            handleViewSearch();
          })
          .catch((err) => {
            console.log(err);
          });
    }
  };

  const handleResolveElementClose = (item) => {
    if (formData?.RefereRCA == "") {
      toast.error("Please Enter Reference RCA Name.");
    } else if (formData?.RefereCode == "") {
      toast.error("Please Enter Reference RCA Code.");
      // } else if (formData?.ManHours == "") {
      //   toast.error("Please Enter ManMinutes.");
    } else {
      let form = new FormData();
      form.append("ID", useCryptoLocalStorage("user_Data", "get", "ID")),
        form.append(
          "LoginName",
          useCryptoLocalStorage("user_Data", "get", "realname")
        ),
        form.append("TicketIDs", item?.TicketID),
        form.append("ActionText", "Close"),
        form.append("ReferenceCode", formData?.RefereCode),
        form.append("RCA", formData?.RefereRCA),
        form.append("ManHour", formData?.ManHours),
        axios
          .post(apiUrls?.ApplyAction, form, { headers })
          .then((res) => {
            toast.success(res?.data?.message);
            setFormData({
              ...formData,
              RefereRCA: "",
              RefereCode: "",
              ManHours: "",
            });
            handleViewSearch();
          })
          .catch((err) => {
            console.log(err);
          });
    }
  };

  const handleHold = (item) => {
    let form = new FormData();
    form.append("ID", useCryptoLocalStorage("user_Data", "get", "ID")),
      form.append(
        "LoginName",
        useCryptoLocalStorage("user_Data", "get", "realname")
      ),
      form.append("TicketIDs", item?.TicketID),
      form.append("ActionText", "Hold"),
      form.append("ActionId", formData?.Hold),
      // form.append("HoldReason", formData?.Hold),
      axios
        .post(apiUrls?.ApplyAction, form, { headers })
        .then((res) => {
          toast.success(res?.data?.message);
          setFormData({
            ...formData,
            Hold: "",
          });
          handleViewSearch();
        })
        .catch((err) => {
          console.log(err);
        });
  };

  const handleHoldTable = () => {
    const filterdata = tableData?.filter((item) => item.IsActive == true);
    const ticketIDs = filterdata.map((item) => item.TicketID).join(",");
    if (ticketIDs == "") {
      toast.error("Please Select atleast one Ticket.");
    } else {
      // const filterdata = tableData?.filter((item) => item.IsActive == true);
      // const ticketIDs = filterdata.map((item) => item.TicketID).join(",");
      let form = new FormData();
      form.append("ID", useCryptoLocalStorage("user_Data", "get", "ID")),
        form.append(
          "LoginName",
          useCryptoLocalStorage("user_Data", "get", "realname")
        ),
        form.append("TicketIDs", ticketIDs),
        form.append("ActionText", "Hold"),
        form.append("ActionId", formData?.Hold),
        // form.append("HoldReason", formData?.Hold),
        axios
          .post(apiUrls?.ApplyAction, form, { headers })
          .then((res) => {
            toast.success(res?.data?.message);
            setFormData({
              ...formData,
              Hold: "",
            });
            handleViewSearch();
          })
          .catch((err) => {
            console.log(err);
          });
    }
  };

  const handleResolveElement = (item) => {
    if (formData?.RefereRCA == "") {
      toast.error("Please Enter Reference RCA Name.");
    } else if (formData?.RefereCode == "") {
      toast.error("Please Enter Reference RCA Code.");
      // } else if (formData?.ManHours == "") {
      //   toast.error("Please Enter ManMinutes.");
    } else {
      let form = new FormData();
      form.append("ID", useCryptoLocalStorage("user_Data", "get", "ID")),
        form.append(
          "LoginName",
          useCryptoLocalStorage("user_Data", "get", "realname")
        ),
        form.append("TicketIDs", item?.TicketID),
        form.append("ActionText", "Resolve"),
        form.append("ReferenceCode", formData?.RefereCode),
        form.append("RCA", formData?.RefereRCA),
        form.append("ManHour", formData?.ManHours),
        axios
          .post(apiUrls?.ApplyAction, form, { headers })
          .then((res) => {
            toast.success(res?.data?.message);
            setFormData({
              ...formData,
              RefereRCA: "",
              RefereCode: "",
              ManHours: "",
            });
            handleViewSearch();
          })
          .catch((err) => {
            console.log(err);
          });
    }
  };

  const getmultiApplyAction = (ids, data) => {
    if (ids == "") {
      toast.error("Please Select atleast one Ticket.");
    } else {
      let form = new FormData();
      form.append("ID", useCryptoLocalStorage("user_Data", "get", "ID")),
        form.append(
          "LoginName",
          useCryptoLocalStorage("user_Data", "get", "realname")
        ),
        form.append("TicketIDs", ids),
        form.append("ActionText", data?.label),
        form.append("ActionId", data?.value),
        axios
          .post(apiUrls?.ApplyAction, form, { headers })
          .then((res) => {
            toast.success(res?.data?.message);
            handleViewSearch();
            setFormData((val) => ({ ...val, TableStatus: {} }));
          })
          .catch((err) => {
            console.log(err);
          });
    }
  };
  const handleSelectAll = (values) => {
    const data = tableData.map((ele) => {
      return {
        ...ele,
        IsActive: values,
      };
    });
    setTableData(data);
  };
  const handleManhour = () => {
    const filterdata = tableData?.filter((item) => item.IsActive == true);
    const ticketIDs = filterdata.map((item) => item.TicketID).join(",");
    // console.log("edit dtaa", ticketIDs);
    if (ticketIDs == "") {
      toast.error("Please Select atleast one Ticket.");
    } else {
      // const filterdata = tableData?.filter((item) => item.IsActive == true);
      // const ticketIDs = filterdata.map((item) => item.TicketID).join(",");
      let form = new FormData();
      form.append("ID", useCryptoLocalStorage("user_Data", "get", "ID")),
        form.append(
          "LoginName",
          useCryptoLocalStorage("user_Data", "get", "realname")
        ),
        form.append("TicketIDs", ticketIDs),
        form.append("ActionText", "ManHours"),
        form.append("ActionId", formData?.ManHours),
        axios
          .post(apiUrls?.ApplyAction, form, { headers })
          .then((res) => {
            toast.success(res?.data?.message);
            setFormData({
              ...formData,
              ManHours: "",
            });
            handleViewSearch();
          })
          .catch((err) => {
            console.log(err);
          });
    }
  };

  const handleResolve = () => {
    const filterdata = tableData?.filter((item) => item.IsActive == true);
    const ticketIDs = filterdata.map((item) => item.TicketID).join(",");
    if (ticketIDs == "") {
      toast.error("Please Select atleast one Ticket.");
    } else {
      // const filterdata = tableData?.filter((item) => item.IsActive == true);
      // const ticketIDs = filterdata.map((item) => item.TicketID).join(",");
      let form = new FormData();
      form.append("ID", useCryptoLocalStorage("user_Data", "get", "ID")),
        form.append(
          "LoginName",
          useCryptoLocalStorage("user_Data", "get", "realname")
        ),
        form.append("TicketIDs", ticketIDs),
        form.append("ActionText", "Resolve"),
        form.append("ReferenceCode", formData?.RefereCode),
        form.append("RCA", formData?.RefereRCA),
        form.append("ManHour", formData?.ManHours),
        axios
          .post(apiUrls?.ApplyAction, form, { headers })
          .then((res) => {
            toast.success(res?.data?.message);
            setFormData({
              ...formData,
              RefereRCA: "",
              RefereCode: "",
              ManHours: "",
            });
            handleViewSearch();
          })
          .catch((err) => {
            console.log(err);
          });
    }
  };

  const handleResolveClose = () => {
    const filterdata = tableData?.filter((item) => item.IsActive == true);
    const ticketIDs = filterdata.map((item) => item.TicketID).join(",");
    if (ticketIDs == "") {
      toast.error("Please Select atleast one Ticket.");
    } else {
      // const filterdata = tableData?.filter((item) => item.IsActive == true);
      // const ticketIDs = filterdata.map((item) => item.TicketID).join(",");
      let form = new FormData();
      form.append("ID", useCryptoLocalStorage("user_Data", "get", "ID")),
        form.append(
          "LoginName",
          useCryptoLocalStorage("user_Data", "get", "realname")
        ),
        form.append("TicketIDs", ticketIDs),
        form.append("ActionText", "Close"),
        form.append("ReferenceCode", formData?.RefereCode),
        form.append("RCA", formData?.RefereRCA),
        form.append("ManHour", formData?.ManHours),
        axios
          .post(apiUrls?.ApplyAction, form, { headers })
          .then((res) => {
            toast.success(res?.data?.message);
            setFormData({
              ...formData,
              RefereRCA: "",
              RefereCode: "",
              ManHours: "",
            });
            handleViewSearch();
          })
          .catch((err) => {
            console.log(err);
          });
    }
  };
// console.log(tbody)
  return (
    <>

      {visible?.showVisible && (
        <Modal
          modalWidth={"1100px"}
          visible={visible}
          setVisible={setVisible}
          Header={t("View Issues Detail")}
          tableData={currentData}
          setTableData={setTableData}
        >
          <ViewIssueDetailsTableModal
            visible={visible}
            setVisible={setVisible}
            tableData={currentData}
            setTableData={setTableData}
          />
        </Modal>
      )}

      {visible?.docVisible && (
        <Modal
          modalWidth={"800px"}
          visible={visible}
          setVisible={setVisible}
          Header="Upload Documents"
        >
          <ViewIssueDocModal visible={visible} setVisible={setVisible} />
        </Modal>
      )}
      {visible?.noteVisible && (
        <Modal
          modalWidth={"800px"}
          visible={visible}
          setVisible={setVisible}
          Header="Notes Details"
        >
          <ViewIssueNotesModal visible={visible} setVisible={setVisible} />
        </Modal>
      )}
      {visible?.docViewVisible && (
        <Modal
          modalWidth={"800px"}
          visible={visible}
          setVisible={setVisible}
          Header="View Documents"
        >
          <ViewIssueDocTable visible={visible} setVisible={setVisible} />
        </Modal>
      )}
      {visible?.summaryVisible && (
        <Modal
          modalWidth={"600px"}
          visible={visible}
          setVisible={setVisible}
          Header="Summary Status"
        >
          <SummaryStatusModal visible={visible} setVisible={setVisible} />
        </Modal>
      )}
      {tableData?.length > 0 ? (
        <>
          <div className="card mt-2" style={{ marginTop: "10px" }}>
            <Heading
              title={
                <span style={{ fontWeight: "bold" }}>{t("Issue Details")}</span>
              }
              secondTitle={
                <div>
                  <span style={{ fontWeight: "bold" }}>
                    {t("Total ManMinutes")} : &nbsp;{" "}
                    {tableData[0]?.SumOfManMinute}
                  </span>
                  <span style={{ fontWeight: "bold", marginLeft: "10px" }}>
                    {t("Total Records")} : &nbsp; {tableData[0]?.TotalRecord}
                  </span>
                </div>
              }
            />

            <Tables
              style={{ width: "100%", height: "100%" }}
              thead={viewissuesTHEAD}
              // ref={(el) => (tdRefs.current[index] = el)}
              tbody={currentData?.map((ele, index) => ({
                "S.No.": (currentPage - 1) * formData?.PageSize + index + 1,
                Notes:
                  ele?.NoteCount === 0 ? (
                    <i
                      className="fa fa-file"
                      onClick={() => {
                        setVisible({
                          noteVisible: true,
                          showData: ele,
                          ele,
                        });
                      }}
                      style={{
                        cursor: "pointer",
                        color: "black",
                        marginLeft: "10px",
                      }}
                      // title="Upload Document."
                    ></i>
                  ) : (
                    <i
                      className="fa fa-file"
                      onClick={() => {
                        setVisible({
                          noteVisible: true,
                          showData: ele,
                          ele,
                        });
                      }}
                      style={{
                        cursor: "pointer",
                        color: "green",
                        marginLeft: "10px",
                      }}
                      // title="View Documents"
                    ></i>
                  ),
                Attach:
                  ele?.AttachmentCount === 0 ? (
                    <i
                      className="fa fa-upload"
                      onClick={() => {
                        setVisible({
                          docVisible: true,
                          showData: ele,
                          ele,
                        });
                      }}
                      style={{
                        cursor: "pointer",
                        color: "black",
                        marginLeft: "10px",
                      }}
                      title="Upload Document."
                    ></i>
                  ) : (
                    <i
                      className="fa fa-upload"
                      onClick={() => {
                        setVisible({
                          docViewVisible: true,
                          showData: ele,
                          ele,
                        });
                      }}
                      style={{
                        cursor: "pointer",
                        color: "green",
                        marginLeft: "10px",
                      }}
                      title="View Documents"
                    ></i>
                  ),

                Select: (
                  <>
                    <Input
                      disabled={ele?.Status == "closed"}
                      type="checkbox"
                      name="IsActive"
                      checked={ele?.IsActive}
                      onChange={(e) => handleDeliveryChangeCheckbox(e, index)}
                    />
                  </>
                ),
                "Ticket ID": (
                  <div
                    style={{
                      // border: "1px solid black",
                      padding: "0px",
                      background: ele?.IsReOpen == 1 && "#c6fcff",
                      border: "none",
                      textAlign: "center",
                      height: "25px",
                    }}
                  >
                    {ele?.Status == "closed" ? (
                      ele?.TicketID
                    ) : (
                      <Link
                        onClick={() => {
                          setVisible({ showVisible: true, showData: ele });
                        }}
                        title="Click to Show"
                      >
                        {ele?.TicketID}
                      </Link>
                    )}
                  </div>
                ),

                "Project Name": (
                  <div className="d-flex align-items-center justify-content-between">
                    {!ele?.isProject && (
                      <div style={{ width: "100%" }}>
                        {" "}
                        <Tooltip label={ele?.ProjectName}>
                          <span
                            id={`projectName-${index}`}
                            targrt={`projectName-${index}`}
                            style={{ textAlign: "center" }}
                          >
                            {shortenNamesummary(ele?.ProjectName)}
                          </span>
                        </Tooltip>
                      </div>
                    )}

                    <div className="d-flex align-items-center justify-content-between">
                      {clientId === 7 ? (
                        ""
                      ) : (
                        <i
                          className="fa fa-eye ml-2 mr-2"
                          onClick={() =>
                            ele?.Status !== "closed" &&
                            handleIconClickProject(ele, index)
                          }
                          style={{
                            cursor:
                              ele?.Status === "closed"
                                ? "not-allowed"
                                : "pointer",
                            pointerEvents:
                              ele?.Status === "closed" ? "none" : "auto",
                          }}
                        ></i>
                      )}

                      {ele?.isProject && (
                        <ReactSelect
                          style={{ width: "100%" }}
                          height={"6px"}
                          name="MoveDropDownValue"
                          id="MoveDropDownValue"
                          respclass="width100px"
                          placeholderName="Move"
                          dynamicOptions={updateProject}
                          value={ele?.MoveDropDownValue}
                          handleChange={(name, value) => {
                            handleAgainChange(name, value, index);
                          }}
                        />
                      )}
                    </div>
                  </div>
                ),
                "Module Name": ele?.ModuleName,
                "Category Name": (
                  <div className="d-flex align-items-center justify-content-between">
                    {!ele?.isCategory && (
                      <div>
                        {
                          <Tooltip label={ele?.Category}>
                            <span
                              id={`projectName-${index}`}
                              targrt={`projectName-${index}`}
                              style={{ textAlign: "center" }}
                            >
                              {shortenNamesummary(ele?.Category)}
                            </span>
                          </Tooltip>
                        }
                      </div>
                    )}

                    <div className="d-flex align-items-center justify-content-between ">
                      {clientId === 7 ? (
                        ""
                      ) : (
                        <i
                          className="fa fa-eye ml-2 mr-2"
                          onClick={() =>
                            ele?.Status !== "closed" &&
                            handleIconClickCategory(ele, index)
                          }
                          style={{
                            cursor:
                              ele?.Status === "closed"
                                ? "not-allowed"
                                : "pointer",
                            pointerEvents:
                              ele?.Status === "closed" ? "none" : "auto",
                          }}
                        ></i>
                      )}

                      {ele?.isCategory && (
                        <ReactSelect
                          style={{ width: "100%", marginLeft: "3px" }}
                          height={"6px"}
                          name="UpdateCategoryValue"
                          respclass="width80px"
                          id="UpdateCategoryValue"
                          placeholderName="Category"
                          dynamicOptions={updatecategory}
                          value={ele?.UpdateCategoryValue}
                          handleChange={(name, value) => {
                            handleAgainChange(name, value, index);
                          }}
                        />
                      )}
                    </div>
                  </div>
                ),
                "Reporter Name": (
                  <Tooltip label={ele?.ReporterName}>
                    <span
                      id={`projectName-${index}`}
                      targrt={`projectName-${index}`}
                      style={{ textAlign: "center" }}
                    >
                      {shortenNamesummary(ele?.ReporterName)}
                    </span>
                  </Tooltip>
                ),
                // "Assign To": ele?.AssignTo,
                "Assign To": (
                  <div className="d-flex align-items-center justify-content-between">
                    {!ele?.isAssignTo && (
                      <div>
                        {
                          <Tooltip label={ele?.AssignTo}>
                            <span
                              id={`projectName-${index}`}
                              targrt={`projectName-${index}`}
                              style={{ textAlign: "center" }}
                            >
                              {shortenNamesummary(ele?.AssignTo)}
                            </span>
                          </Tooltip>
                        }
                      </div>
                    )}

                    <div className="d-flex align-items-center justify-content-between ">
                      {clientId === 7 ? (
                        ""
                      ) : (
                        <i
                          className="fa fa-eye ml-2 mr-2"
                          onClick={() => handleIconClickAssignTo(ele, index)}
                          style={{
                            cursor:
                              ele?.Status === "closed"
                                ? "not-allowed"
                                : "pointer",
                            pointerEvents:
                              ele?.Status === "closed" ? "none" : "auto",
                          }}
                        ></i>
                      )}

                      {ele?.isAssignTo && (
                        <>
                          {AllowManHourEdit == 1 ? (
                            <Input
                              type="text"
                              className="form-control mt-1 required-fields"
                              id="AssignToManHour"
                              name="AssignToManHour"
                              lable="Minutes"
                              value={
                                ele?.ManHour
                                  ? ele?.ManHour
                                  : ele?.AssignToManHour
                              }
                              respclass="width801px"
                              // disabled={ele?.ManHour > 0}
                              style={{ width: "50%" }}
                              onChange={(e) => handleSelectChange(e, index)}
                            />
                          ) : (
                            <Input
                              type="text"
                              className="form-control mt-1 required-fields"
                              id="AssignToManHour"
                              name="AssignToManHour"
                              lable="Minutes"
                              value={
                                ele?.ManHour
                                  ? ele?.ManHour
                                  : ele?.AssignToManHour
                              }
                              respclass="width801px"
                              disabled={ele?.ManHour > 0}
                              style={{ width: "50%" }}
                              onChange={(e) => handleSelectChange(e, index)}
                            />
                          )}
                          <ReactSelect
                            style={{ width: "100%", marginLeft: "3px" }}
                            height={"6px"}
                            name="AssignDropDownValue"
                            respclass="width110px"
                            id="AssignDropDownValue"
                            placeholderName="Assign"
                            dynamicOptions={assigntoValueProjectId}
                            value={ele?.AssignDropDownValue}
                            handleChange={(name, value) => {
                              handleAgainChange(name, value, index, ele);
                            }}
                          />
                        </>
                      )}
                    </div>
                  </div>
                ),
                Summary: (
                  <>
                    <div className="d-flex align-items-center justify-content-between">
                      {!ele?.isSummary && (
                        <div style={{ width: "178px" }}>
                          <span
                            style={{
                              whiteSpace: "normal",
                              cursor:
                                ele?.Status === "closed"
                                  ? "not-allowed"
                                  : "pointer",
                              pointerEvents:
                                ele?.Status === "closed" ? "none" : "auto",
                            }}
                            id={`summary-${index}`}
                            targrt={`summary-${index}`}
                            title={ele?.summary}
                          >
                            {ele?.summary}
                          </span>
                        </div>
                        // <Tooltip label={ele?.summary}>
                        //   <span
                        //     id={`projectName-${index}`}
                        //     targrt={`projectName-${index}`}
                        //     // style={{ textAlign: "center" }}
                        //     style={{
                        //       whiteSpace: "normal",
                        //       cursor:
                        //         ele?.Status === "closed"
                        //           ? "not-allowed"
                        //           : "pointer",
                        //       pointerEvents:
                        //         ele?.Status === "closed" ? "none" : "auto",
                        //     }}
                        //   >
                        //     {shortenName(ele?.summary)}
                        //   </span>
                        // </Tooltip>
                      )}

                      <div className="d-flex align-items-center justify-content-between">
                        {clientId === 7 ? (
                          ""
                        ) : (
                          <>
                            <i
                              className="fa fa-edit mr-1"
                              aria-hidden="true"
                              onClick={() => handleIconClickSummary(ele, index)}
                              style={{
                                cursor:
                                  ele?.Status === "closed"
                                    ? "not-allowed"
                                    : "pointer",
                                pointerEvents:
                                  ele?.Status === "closed" ? "none" : "auto",
                              }}
                            ></i>
                            <i
                              className="fa fa-eye"
                              onClick={() => {
                                setVisible({
                                  summaryVisible: true,
                                  showData: ele,
                                  ele,
                                });
                              }}
                              style={{
                                cursor: "pointer",
                                color: "black",
                                marginLeft: "2px",
                              }}
                              title="View Summary"
                            ></i>
                          </>
                        )}

                        {ele?.isSummary && (
                          <>
                            <textarea
                              type="text"
                              className="summaryheight"
                              id="summary"
                              name="summary"
                              disabled={ele?.Status === "closed"}
                              lable="summary"
                              onChange={(e) => handleSelectChange(e, index)}
                              value={ele?.summary}
                            ></textarea>
                            <button
                              className="btn btn-xs btn-success ml-2"
                              onClick={() => {
                                handleSummaryTable(ele);
                              }}
                              disabled={ele?.Status === "closed"}
                            >
                              Save
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </>
                ),
                Status: ele?.Status,
                "Date Submitted": ele?.TicketRaisedDate,
                "Delivery Date": (
                  // clientId === 7 ? (
                  //   ""
                  // ) : (

                  <div className="d-flex align-items-center justify-content-between">
                    {/* {AllowDeliveryDateEdit == 1 ? (
                  <div>{ele?.CurrentDeliveryDate}</div>
                ) : (
                  ""
                )} */}

                    {ele?.isDate ? (
                      <>
                        <DatePicker
                          className="custom-calendar"
                          ref={(ref) => (datePickerRefs.current[index] = ref)}
                          id="DeliveryDate"
                          name="DeliveryDate"
                          lable="Delivery Date"
                          placeholder={VITE_DATE_FORMAT}
                          value={
                            ele?.CurrentDeliveryDate == "01-Jan-0001"
                              ? ""
                              : ele?.CurrentDeliveryDate
                          }
                          respclass="width110px mt-3"
                          handleChange={(e) => {
                            const { name, value } = e.target;
                            searchHandleChangeTable(name, value, index, ele);
                          }}
                          onFocus={() => ref?.setOpen?.(true)}
                        />
                      </>
                    ) : (
                      <>
                        <div>
                          <span
                            style={{
                              backgroundColor:
                                ele?.DeliveryDateChangeCount > 0
                                  ? "#f06f48"
                                  : "",
                              padding:
                                ele?.DeliveryDateChangeCount > 0 ? "5px" : "",
                            }}
                          >
                            {ele?.CurrentDeliveryDate === "01-Jan-0001"
                              ? ""
                              : ele?.CurrentDeliveryDate}
                          </span>
                        </div>
                      </>
                    )}
                    <div className="">
                      {AllowDeliveryDateEdit == 1 ||
                      [
                        // "Modification",
                        // "Bug",
                        // "New Requirment",
                        // "Paid Request",
                        "Application Not Working",
                        "Application Slow",
                        "Auto - Archive",
                        "Autobackup",
                        "Emailing",
                        "Mobile App",
                        "New Machine",
                        "OLD Machine Interfacing",
                        "Server Management",
                        "SMS",
                        "SRS",
                        "Support",
                        "Support CheckList",
                        "Training",
                      ].includes(ele.Category) ? (
                        <>
                          <i
                            className="fa fa-calendar ml-2 mr-2"
                            onClick={() => handleIconClickdate(ele, index)}
                            style={{
                              cursor:
                                ele?.Status === "closed"
                                  ? "not-allowed"
                                  : "pointer",
                              pointerEvents:
                                ele?.Status === "closed" ? "none" : "auto",
                            }}
                          ></i>
                        </>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                ),
                // ),
                ManMinutes: (
                  // clientId === 7 ? (
                  //   ""
                  // ) : (
                  //   <>
                  <div className="d-flex align-items-center justify-content-between">
                    {!ele?.isManHour && <div>{ele?.ManHour}</div>}

                    <div className="d-flex align-items-center justify-content-between">
                      {AllowManHourEdit == 1 ||
                      [
                        // "Modification",
                        // "Bug",
                        // "New Requirment",
                        // "Paid Request",
                        "Application Not Working",
                        "Application Slow",
                        "Auto - Archive",
                        "Autobackup",
                        "Emailing",
                        "Mobile App",
                        "New Machine",
                        "OLD Machine Interfacing",
                        "Server Management",
                        "SMS",
                        "SRS",
                        "Support",
                        "Support CheckList",
                        "Training",
                      ].includes(ele.Category) ? (
                        <label htmlFor="ManHour">
                          <i
                            className="fa fa-clock mr-2"
                            onClick={() => handleIconClick(ele, index)}
                            style={{
                              cursor:
                                ele?.Status === "closed"
                                  ? "not-allowed"
                                  : "pointer",
                              pointerEvents:
                                ele?.Status === "closed" ? "none" : "auto",
                            }}
                          ></i>
                        </label>
                      ) : (
                        ""
                      )}

                      {ele?.isManHour && (
                        <>
                          <Input
                            type="text"
                            className="form-control"
                            id="ManHour"
                            name="ManHour"
                            lable=""
                            onChange={(e) => handleSelectChange(e, index)}
                            value={ele?.ManHour}
                            respclass="width50px"
                          />
                          <button
                            className="btn btn-xs btn-success ml-2"
                            onClick={() => {
                              handleManHourTable(ele);
                            }}
                          >
                            Save
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                ),
                //   </>
                // ),
                "Change Action":
                  clientId === 7 ? (
                    ""
                  ) : (
                    <>
                      <ReactSelect
                        style={{ width: "100%", marginLeft: "10px" }}
                        height={"6px"}
                        name="TableStatus"
                        id="TableStatus"
                        respclass="width110px"
                        placeholderName="Action"
                        dynamicOptions={filteredOptions}
                        isDisabled={ele?.Status == "closed"}
                        value={ele?.TableStatus}
                        handleChange={(name, value) => {
                          const ind =
                            (currentPage - 1) * formData?.PageSize + index;
                          handleDeliveryChangeValue(
                            name,
                            value?.value,
                            ind,
                            index,
                            ele
                          );
                        }}
                      />

                      <div
                        style={{
                          display: "flex",
                          marginRight: "3px",
                          width: "350px !important",
                          marginTop: "8px",
                          marginBottom: "5px",
                        }}
                      >
                        <div style={{}} className="">
                          {ele?.TableStatus == "Hold" && (
                            <>
                              <Input
                                type="text"
                                className="form-control mt-1"
                                id="Hold"
                                name="Hold"
                                lable="Enter Hold Reason"
                                value={ele?.Hold}
                                respclass="width110px"
                                style={{ width: "50%" }}
                                onChange={handleChange}
                              />
                              <button
                                className="btn btn-sm btn-success ml-1 mb-1 mt-1"
                                style={{
                                  marginRight: "1px",
                                  marginLeft: "1px",
                                }}
                                onClick={() => handleHold(ele)}
                              >
                                Save
                              </button>
                            </>
                          )}
                          {ele?.TableStatus == "Close" && (
                            <>
                              <Input
                                type="text"
                                className="form-control mt-1"
                                id="RefereRCA"
                                name="RefereRCA"
                                lable="Enter Refere RCA"
                                value={ele?.RefereRCA}
                                respclass="width110px"
                                style={{ width: "50%" }}
                                onChange={handleChange}
                              />
                              <Input
                                type="number"
                                className="form-control mt-3"
                                id="RefereCode"
                                name="RefereCode"
                                lable="Enter Refere Code"
                                value={ele?.RefereCode}
                                respclass="width110px"
                                style={{ width: "50%" }}
                                onChange={handleChange}
                              />
                              <button
                                className="btn btn-sm btn-success ml-1 mb-1 mt-1"
                                style={{
                                  marginRight: "1px",
                                  marginLeft: "1px",
                                }}
                                onClick={() => handleResolveElementClose(ele)}
                              >
                                Close
                              </button>
                            </>
                          )}
                          {ele?.TableStatus == "Resolve" && (
                            <>
                              <Input
                                type="text"
                                className="form-control mt-1"
                                id="RefereRCA"
                                name="RefereRCA"
                                lable="Enter Refere RCA"
                                value={ele?.RefereRCA}
                                respclass="width110px"
                                onChange={handleChange}
                              />
                              <Input
                                type="number"
                                className="form-control ml-0 mt-3"
                                id="RefereCode"
                                name="RefereCode"
                                lable="Dev. ManMinutes"
                                value={ele?.RefereCode}
                                respclass="width110px"
                                style={{ width: "100%" }}
                                onChange={handleChange}
                              />
                              {/* {ele?.ManHour && (
                            <Input
                              type="number"
                              className="form-control mt-3"
                              id="ManHours"
                              name="ManHours"
                              lable="Enter ManMinutes"
                              value={ele?.ManHours}
                              respclass="width110px"
                              style={{ width: "50%" }}
                              onChange={handleChange}
                            />
                          )} */}
                              <button
                                className="btn btn-sm btn-success ml-1 mb-1 mt-1"
                                style={{
                                  marginRight: "1px",
                                  marginLeft: "1px",
                                }}
                                onClick={() => handleResolveElement(ele)}
                              >
                                Resolve
                              </button>
                            </>
                          )}
                          {ele?.TableStatus == "UpdateStatus" && (
                            <>
                              <ReactSelect
                                style={{ width: "100%", marginLeft: "3px" }}
                                height={"6px"}
                                name="UpdateStatusValue"
                                respclass="width110px"
                                id="UpdateStatusValue"
                                placeholderName="Status"
                                dynamicOptions={hidestatus}
                                value={ele?.UpdateStatusValue}
                                handleChange={(name, value) => {
                                  handleAgainChange(name, value, index);
                                }}
                              />
                            </>
                          )}
                          {ele?.TableStatus == "ReOpen" && (
                            <>
                              <ReactSelect
                                style={{ width: "100%", marginLeft: "3px" }}
                                height={"6px"}
                                name="ReOpenValue"
                                respclass="width110px"
                                id="ReOpenValue"
                                placeholderName="Reopen"
                                dynamicOptions={reopen}
                                value={ele?.ReOpenValue}
                                handleChange={(name, value) => {
                                  handleAgainChange(name, value, index);
                                }}
                              />
                            </>
                          )}
                        </div>
                      </div>
                    </>
                  ),
                "Client DeliveryDate":
                  clientId === 7 ? (
                    ""
                  ) : (
                    <div className="d-flex align-items-center justify-content-between">
                      {clientId == 7 && ShowClientDeliveryDate == 1 ? (
                        <div>{ele?.DeliveryDateClient}</div>
                      ) : (
                        ""
                      )}
                      {ele?.isClientDate ? (
                        <>
                          <DatePicker
                            className="custom-calendar"
                            id="DeliveryDate"
                            name="ClientDeliveryDate"
                            lable="ClientDeliveryDate"
                            placeholder={VITE_DATE_FORMAT}
                            value={ele?.DeliveryDateClient}
                            respclass="width110px mt-3"
                            handleChange={(e) => {
                              const { name, value } = e.target;
                              searchHandleChangeTableClient(
                                name,
                                value,
                                index,
                                ele
                              );
                            }}
                          />
                        </>
                      ) : (
                        <div>{ele?.DeliveryDateClient}</div>
                      )}
                      <div className="">
                        {clientId !== 7 && ShowClientDeliveryDate == 1 && (
                          <i
                            className="fa fa-calendar ml-2 mr-2"
                            onClick={() =>
                              handleIconClientClickdate(ele, index)
                            }
                            style={{
                              cursor:
                                ele?.Status === "closed"
                                  ? "not-allowed"
                                  : "pointer",
                              pointerEvents:
                                ele?.Status === "closed" ? "none" : "auto",
                            }}
                          ></i>
                        )}
                      </div>
                    </div>
                  ),
                "Client ManMinutes":
                  clientId === 7 ? (
                    ""
                  ) : (
                    <>
                      <div className="d-flex align-items-center justify-content-between">
                        {!ele?.isClientManHour && (
                          <div>{ele?.ManHoursClient}</div>
                        )}

                        <div className="d-flex align-items-center justify-content-between">
                          {ShowClientManHour == 1 && (
                            <i
                              className="fa fa-clock mr-2"
                              onClick={() => handleClientIconClick(ele, index)}
                              style={{
                                cursor:
                                  ele?.Status === "closed"
                                    ? "not-allowed"
                                    : "pointer",
                                pointerEvents:
                                  ele?.Status === "closed" ? "none" : "auto",
                              }}
                            ></i>
                          )}

                          {ele?.isClientManHour && (
                            <>
                              <Input
                                type="text"
                                className="form-control"
                                id="ManHour"
                                name="ManHour"
                                lable=""
                                onChange={(e) => handleSelectChange(e, index)}
                                value={ele?.ManHoursClient}
                                respclass="width50px"
                              />
                              <button
                                className="btn btn-xs btn-success ml-2"
                                onClick={() => {
                                  handleClientManHourTable(ele);
                                }}
                              >
                                Save
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    </>
                  ),
                colorcode: ele?.rowColor,
              }))}
              tableHeight={"tableHeight"}
            />
            <div className="row m-2  justify-content">
              <div style={{ display: "flex" }}>
                <Input
                  type="checkbox"
                  onChange={(e) => handleSelectAll(e.target.checked)}
                />
                <span style={{ marginRight: "7px", marginLeft: "7px" }}>
                  Select All
                </span>
              </div>

              <div className="d-flex">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-evenly",
                    marginRight: "3px",
                  }}
                >
                  <div style={{ width: "53%" }}>
                    <ReactSelect
                      name="TableStatus"
                      id="TableStatus"
                      respclass="width100px"
                      placeholderName="Change Action"
                      dynamicOptions={filteredOptionsTable}
                      value={formData?.TableStatus}
                      handleChange={(name, value) =>
                        handleDeliveryChangeValueStatus(name, value)
                      }
                    />
                  </div>
                  {formData?.TableStatus?.value == "Move" && (
                    <>
                      <ReactSelect
                        style={{ width: "100%", marginLeft: "5px" }}
                        height={"6px"}
                        name="MoveStatus"
                        respclass="width100px"
                        id="MoveStatus"
                        placeholderName="MoveStatus"
                        dynamicOptions={updateProject}
                        value={formData?.MoveStatus}
                        handleChange={(name, value) =>
                          handleDeliveryChangeValueStatus(name, value)
                        }
                      />
                    </>
                  )}
                  {formData?.TableStatus?.value == "Resolve" && (
                    <>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-evenly",
                        }}
                      >
                        <Input
                          type="text"
                          className="form-control ml-1"
                          id="RefereRCA"
                          name="RefereRCA"
                          lable="Enter Refere RCA"
                          value={formData?.RefereRCA}
                          respclass="width100px"
                          onChange={handleChange}
                        />
                        <Input
                          type="number"
                          className="form-control ml-3"
                          id="RefereCode"
                          name="RefereCode"
                          lable="Dev. ManMinutes"
                          value={formData?.RefereCode}
                          respclass="width100px"
                          onChange={handleChange}
                        />
                        {/* <Input
                      type="number"
                      className="form-control ml-4"
                      id="ManHours"
                      name="ManHours"
                      lable="Enter ManMinutes"
                      value={formData?.ManHours}
                      respclass="width100px"
                      onChange={handleChange}
                    /> */}
                        <button
                          className="btn btn-sm btn-info ml-5"
                          onClick={handleResolve}
                        >
                          Resolve
                        </button>
                      </div>
                    </>
                  )}
                  {formData?.TableStatus?.value == "ManHours" && (
                    <>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-evenly",
                        }}
                      >
                        <Input
                          type="number"
                          id="ManHours"
                          name="ManHours"
                          className="form-control ml-2"
                          lable="Enter ManMinutes"
                          value={formData?.ManHours}
                          respclass="width100px"
                          style={{ width: "100%", marginLeft: "2px" }}
                          onChange={handleChange}
                        />

                        <button
                          className="btn btn-sm btn-info ml-4"
                          onClick={handleManhour}
                        >
                          Save
                        </button>
                      </div>
                    </>
                  )}
                  {formData?.TableStatus?.value == "Hold" && (
                    <>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-evenly",
                        }}
                      >
                        <Input
                          type="text"
                          id="Hold"
                          name="Hold"
                          className="form-control ml-2"
                          lable="Enter Hold Reason"
                          value={formData?.Hold}
                          respclass="width100px"
                          style={{ width: "100%", marginLeft: "2px" }}
                          onChange={handleChange}
                        />

                        <button
                          className="btn btn-sm btn-info ml-4"
                          onClick={handleHoldTable}
                        >
                          Save
                        </button>
                      </div>
                    </>
                  )}
                  {formData?.TableStatus?.value == "Close" && (
                    <>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-evenly",
                        }}
                      >
                        <Input
                          type="text"
                          id="RefereRCA"
                          name="RefereRCA"
                          className="form-control ml-2"
                          lable="Enter Refere RCA"
                          value={formData?.RefereRCA}
                          respclass="width100px"
                          style={{ width: "100%", marginLeft: "2px" }}
                          onChange={handleChange}
                        />
                        <Input
                          type="number"
                          id="RefereCode"
                          name="RefereCode"
                          className="form-control ml-3"
                          lable="Enter Refere Code"
                          value={formData?.RefereCode}
                          respclass="width100px"
                          style={{ width: "100%", marginLeft: "2px" }}
                          onChange={handleChange}
                        />
                        <Input
                          type="number"
                          id="ManHours"
                          name="ManHours"
                          className="form-control ml-4"
                          lable="Enter ManMinutes"
                          value={formData?.ManHours}
                          respclass="width100px"
                          style={{ width: "100%", marginLeft: "2px" }}
                          onChange={handleChange}
                        />

                        <button
                          className="btn btn-sm btn-info ml-5"
                          onClick={handleResolveClose}
                        >
                          Close
                        </button>
                      </div>
                    </>
                  )}
                  {formData?.TableStatus?.value == "Assign" && (
                    <>
                      <ReactSelect
                        style={{ width: "100%", marginLeft: "5px" }}
                        height={"6px"}
                        name="AssignedToStatus"
                        respclass="width100px"
                        id="AssignedToStatus"
                        placeholderName="AssignedToStatus"
                        dynamicOptions={assigntoValue}
                        value={formData?.AssignedToStatus}
                        handleChange={(name, value) =>
                          handleDeliveryChangeValueStatus(name, value)
                        }
                      />
                    </>
                  )}
                  {formData?.TableStatus?.value == "UpdateStatus" && (
                    <>
                      <ReactSelect
                        style={{ width: "100%", marginLeft: "3px" }}
                        height={"6px"}
                        name="UpdateToStatus"
                        respclass="width100px"
                        id="UpdateToStatus"
                        placeholderName="UpdateToStatus"
                        dynamicOptions={hidestatus}
                        value={formData?.UpdateToStatus}
                        handleChange={(name, value) =>
                          handleDeliveryChangeValueStatus(name, value)
                        }
                      />
                    </>
                  )}
                  {formData?.TableStatus?.value == "UpdateCategory" && (
                    <>
                      <ReactSelect
                        style={{ width: "100%", marginLeft: "3px" }}
                        height={"6px"}
                        name="UpdateToCategory"
                        respclass="width100px"
                        id="UpdateToCategory"
                        placeholderName="UpdateToCategory"
                        dynamicOptions={updatecategory}
                        value={formData?.UpdateToCategory}
                        handleChange={(name, value) =>
                          handleDeliveryChangeValueStatus(name, value)
                        }
                      />
                    </>
                  )}
                  {formData?.TableStatus?.value == "UpdateDeliveryDate" && (
                    <>
                      <DatePicker
                        placeholder={VITE_DATE_FORMAT}
                        className="custom-calendar"
                        id="DeliveryToStatus"
                        name="DeliveryToStatus"
                        lable={"Delivery Date"}
                        value={formData?.DeliveryToStatus}
                        handleChange={(e) => {
                          const { name, value } = e.target;
                          handleDeliveryChangeValueStatus(name, value);
                        }}
                      />
                    </>
                  )}
                  {formData?.TableStatus?.value == "RemoveDeliveryDate" && (
                    <>
                      {/* <DatePicker
                    placeholder={VITE_DATE_FORMAT}
                    className="custom-calendar"
                    id="RemoveDeliveryToStatus"
                    name="RemoveDeliveryToStatus"
                    lable={"RemoveDeliveryDate"}
                    value={formData?.RemoveDeliveryToStatus}
                    handleChange={(e) => {
                      const { name, value } = e.target;
                      handleDeliveryChangeValueStatus(name, value);
                    }}
                  /> */}
                      <button
                        className="btn btn-sm btn-primary ml-5"
                        onClick={handleDeliveryRemove}
                      >
                        Remove
                      </button>
                    </>
                  )}
                </div>

                {clientId === 7 ? (
                  ""
                ) : (
                  <div style={{ marginLeft: "10px" }}>
                    <button
                      className="btn btn-sm btn-danger ml-5"
                      onClick={handlePageReset}
                    >
                      Reset
                    </button>
                    {AllowDeleteTicket == "1" && (
                      <button
                        className="btn btn-sm btn-danger ml-2"
                        onClick={handleDelete}
                      >
                        Delete Ticket
                      </button>
                    )}
                  </div>
                )}
              </div>
              <div className="ml-auto">
                <CustomPagination
                  totalPages={totalPages}
                  currentPage={currentPage}
                  onPageChange={handlePageChange}
                />
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <NoRecordFound />
        </>
      )}
    </>
  );
};
export default ViewIssueTable;
