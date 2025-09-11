import React, { useEffect, useRef, useState } from "react";
import Heading from "../components/UI/Heading";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { apiUrls } from "../networkServices/apiEndpoints";
import { headers } from "../utils/apitools";
import { useCryptoLocalStorage } from "../utils/hooks/useCryptoLocalStorage";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
const ViewIssuePage = () => {
    const { VITE_DATE_FORMAT } = import.meta.env;
    const [t] = useTranslation();
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
    const [tableData, setTableData] = useState([]);
    const location = useLocation();
    const states = location.state; // Access the state passed from the Link
    const datePickerRefs = useRef({});
    const [vertical, setVertical] = useState([]);
    const [team, setTeam] = useState([]);
    const [project, setProject] = useState([]);
    const [wing, setWing] = useState([]);
    const [moduleName, setModuleName] = useState([]);
    const [pageName, setPageName] = useState([]);
    const [poc1, setPoc1] = useState([]);
    const [poc2, setPoc2] = useState([]);
    const [poc3, setPoc3] = useState([]);
    const [selectedRowIndex, setSelectedRowIndex] = useState(-1);
    const [reopen, setReOpen] = useState([]);
    const [status, setStatus] = useState([]);
    const [hidestatus, setHideStatus] = useState([]);
    const [category, setCategory] = useState([]);
    const [updatecategory, setUpdateCategory] = useState([]);
    const [reporter, setReporter] = useState([]);
    const [assignto, setAssignedto] = useState([]);
    const [priority, setPriority] = useState([]);
    const [assigntoValue, setAssignedtoValue] = useState([]);
    const [assigntoValueProjectId, setAssignedtoValueProjectId] = useState([]);
    const [shownodata, setShownodata] = useState(false);
    const { clientId } = useSelector((state) => state?.loadingSlice);
      const [formData, setFormData] = useState({
        PageNo: "",
        PageSize: 50,
        SubmitDate: "",
        // DeliveryDate:
        //   data?.fiveDate || data?.DelayDate || data?.PlannedDate
        //     ? data?.fiveDate || data?.DelayDate || data?.PlannedDate
        //     : "",
        DeliveryDate: "",
        ClientDeliveryDate: "",
        ClientManHour: "",
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
      });
    const handleViewSearch = async (
        code,
        page,
        StatusID = formData?.Status,
        CategoryID = formData?.Category,
        ProjectID = formData?.ProjectID,
        Priority = formData?.Priority,
        AssignedTo = formData?.AssignedTo,
        Reporter = formData?.Reporter,
        HideStatusId = formData?.HideStatus,
        deliveryDate = ""
      ) => {
        if (formData?.HideStatus == "") {
          toast.error("Please Select HideStatus.");
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
            form.append("ProjectID", ProjectID),
            form.append("PageSize", formData?.PageSize),
            form.append("Ticket", formData?.Ticket ?? ""),
            form.append("VerticalID", formData?.VerticalID),
            form.append("TeamID", formData?.TeamID),
            form.append("IsExcel", formData?.SearhType),
            form.append("WingID", formData?.WingID),
            form.append("POC1", formData?.POC1),
            form.append("POC2", formData?.POC2),
            form.append("POC3", formData?.POC3),
            form.append("ReporterId", Reporter),
            form.append("ModuleID", formData?.ModuleName),
            form.append("PagesID", formData?.PagesName),
            form.append("AssignToID", AssignedTo),
            form.append("PriorityId", Priority),
            form.append("CategoryID", CategoryID),
            form.append("OnlyReOpen", formData?.OnlyReOpen),
            form.append("OnlyDeliveryDateChange", formData?.OnlyDeliveryDateChange),
            form.append("HideStatusId", HideStatusId),
            form.append("StatusId", StatusID),
            form.append("SubmittedDateStatus", formData?.SubmitDate),
            form.append(
              "DateFromSubmitted",
              formatDate(formData?.SubmitDateBefore)
                ? formatDate(formData?.SubmitDateBefore)
                : ""
            );
          form.append(
            "DateToSubmitted",
            formatDate(formData?.SubmitDateAfter)
              ? formatDate(formData?.SubmitDateAfter)
              : ""
          ),
            form.append("DeliveryDateStatus", formData?.DeliveryDate),
            
            form.append("ClientDeliveryDateStatus", formData?.ClientDeliveryDate),
            form.append("AssignedDateStatus", formData?.AssignedDate),
            form.append("ManHourStatus", formData?.ManHourDropdown),
            form.append("ClientManHourStatus", formData?.ClientManHourDropdown),
            form.append(
              "DeliveryFromDate",
              formatDate(deliveryDate || formData?.DeliveryDateBefore)
            ),
            form.append(
              "ClientDeliveryFromDate",
              formatDate(deliveryDate || formData?.ClientDeliveryDateBefore)
            ),
            form.append(
              "AssignedFromDate",
              formatDate(deliveryDate || formData?.AssignedDateBefore)
            ),
            form.append("FromManHour", formData?.ManHourBefore),
            form.append("ClientFromManHour", formData?.ClientManHourBefore),
            form.append(
              "Deliverytodate",
              formatDate(formData?.DeliveryDateAfter)
                ? formatDate(formData?.DeliveryDateAfter)
                : ""
            ),
            form.append(
              "Assignedtodate",
              formatDate(formData?.AssignedDateAfter)
                ? formatDate(formData?.AssignedDateAfter)
                : ""
            ),
            form.append(
              "ClientDeliverytodate",
              formatDate(formData?.ClientDeliveryDateAfter)
                ? formatDate(formData?.ClientDeliveryDateAfter)
                : ""
            ),
            form.append("ToManHour", formData?.ManHourAfter),
            form.append("ClientToManHour", formData?.ClientManHourAfter),
            form.append("ClosedDateStatus", formData?.CloseDate),
            form.append(
              "ClosedFromDate",
              formatDate(formData?.CloseDateBefore)
                ? formatDate(formData?.CloseDateBefore)
                : ""
            ),
            form.append(
              "Closedtodate",
              formatDate(formData?.CloseDateAfter)
                ? formatDate(formData?.CloseDateAfter)
                : ""
            ),
            form.append("LastUpdateDateStatus", formData?.UpadteDate),
            form.append(
              "LastUpdatedFromDate",
              formatDate(formData?.UpadteDateBefore)
                ? formatDate(formData?.UpadteDateBefore)
                : ""
            ),
            form.append(
              "LastUpdatedToDate",
              formatDate(formData?.UpadteDateAfter)
                ? formatDate(formData?.UpadteDateAfter)
                : ""
            ),
            form.append("ResolveDateStatus", formData?.ResolveDate),
            form.append(
              "ResolveDateFromDate",
              formatDate(formData?.ResolveDateBefore)
                ? formatDate(formData?.ResolveDateBefore)
                : ""
            ),
            form.append(
              "ResolveDateToDate",
              formatDate(formData?.ResolveDateAfter)
                ? formatDate(formData?.ResolveDateAfter)
                : ""
            ),
            form.append("rowColor", code ? code : ""),
            form.append("PageNo", page ?? currentPage - 1);
          setLoading(true);
          await axios
            .post(apiUrls?.ViewIssueSearch, form, { headers })
            .then((res) => {
              const data = res?.data?.data;
    
              if (formData?.SearhType == 0) {
                if (data?.length == 0) {
                  setShownodata(true);
                }
    
                const updatedData = data?.map((ele, index) => ({
                  ...ele,
                  IsActive: false,
                  MoveDropDown: "",
                  MoveResolve: false,
                  MoveDropDownValue: "",
                  AssignDropDown: "",
                  AssignResolve: false,
                  AssignDropDownValue: "",
                  UpdateStatusDropdown: "",
                  UpdateStatusResolve: false,
                  UpdateStatusValue: "",
                  ReOpenValue: "",
                  UpdateCategoryDropdown: "",
                  UpdateCategoryResolve: false,
                  UpdateCategoryValue: "",
                  UpdatedeliverydateDropdown: "",
                  UpdatedeliverydateResolve: false,
                  UpdatedeliverydateValue: "",
                  CloseDropdown: "",
                  CloseResolve: "",
                  index: index,
                  isDate: false,
                  isClientDate: false,
                  isManHour: false,
                  isClientManHour: false,
                  isCategory: false,
                  isAssignTo: false,
                  isStatus: false,
                  isProject: false,
                  isSummary: false,
                }));
                setTableData(updatedData);
              } else if (formData?.SearhType == 1) {
                if (!data || data.length === 0) {
                  console.error("No data available for download.");
                  alert("No data available for download.");
                  return;
                }
    
                setLoading(false);
                const username =
                  useCryptoLocalStorage("user_Data", "get", "realname") || "User";
                const now = new Date();
                const currentDate = now.toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                });
                const currentTime = now.toLocaleTimeString("en-GB", {
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                });
                const titleRow = [[`${username} - ${currentDate} ${currentTime}`]];
                const ws = XLSX.utils.json_to_sheet(data, { origin: "A2" });
                XLSX.utils.sheet_add_aoa(ws, titleRow, { origin: "A1" });
                const wb = XLSX.utils.book_new();
                XLSX.utils.book_append_sheet(wb, ws, "Data");
                const excelBuffer = XLSX.write(wb, {
                  bookType: "xlsx",
                  type: "array",
                });
                const fileData = new Blob([excelBuffer], {
                  type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
                });
    
                FileSaver.saveAs(
                  fileData,
                  `${username}_${currentDate}_${currentTime}.xlsx`
                );
              } else if (formData?.SearhType == 2) {
                if (!data || data.length === 0) {
                  console.error("No data available for download.");
                  alert("No data available for download.");
                  return;
                }
                setLoading(false);
    
                const username =
                  useCryptoLocalStorage("user_Data", "get", "realname") || "User";
                const now = new Date();
                const currentDate = now.toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                });
                const currentTime = now.toLocaleTimeString("en-GB", {
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                });
                const titleRow = [[`${username} - ${currentDate} ${currentTime}`]];
                const ws = XLSX.utils.json_to_sheet(data, { origin: "A2" });
                XLSX.utils.sheet_add_aoa(ws, titleRow, { origin: "A1" });
                const wb = XLSX.utils.book_new();
                XLSX.utils.book_append_sheet(wb, ws, "Data");
                const excelBuffer = XLSX.write(wb, {
                  bookType: "xlsx",
                  type: "array",
                });
                const fileData = new Blob([excelBuffer], {
                  type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
                });
    
                FileSaver.saveAs(
                  fileData,
                  `${username}_${currentDate}_${currentTime}.xlsx`
                );
              }
    
              setLoading(false);
            })
            .catch((err) => {
              toast.error(
                err?.response?.data?.message
                  ? err?.response?.data?.message
                  : "Error Occured"
              );
            })
            .finally(() => {
              setLoading(false);
            });
        }
      };

        const fetchAllData = async () => {
          try {
            await Promise.all([
              getVertical(),
              getAssignTo(),
              getStatus(),
              getHideStatus(),
              getCategory(),
              getPriority(),
              getTeam(),
              getReporter(),
              getWing(),
              getUpdateCategory(),
              getPOC1(),
              getPOC2(),
              getPOC3(),
              getProjectvalue(),
              getProject(),
              getAssignToValue(),
              getModule(),
              getPage(),
              getReopen(),
            ]);
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        };
      
        useEffect(() => {
          fetchAllData();
         
        }, []);
  return (
    <>
      <div className="card">
        <Heading
          title={"View Issues"}
        //   isBreadcrumb={true}
          secondTitle={
            <div
              className="d-flex flex-wrap align-items-center"
              style={{ marginRight: "10px" }}
            >
            <div
                  className="d-flex "
                  style={{
                    justifyContent: "flex-start",
                    alignItems: "center",
                  }}
                >
                  <div
                    className="legend-circle"
                    style={{
                      backgroundColor: "#FFC0CB",
                      borderColor: "#FFC0CB",
                      cursor: "pointer",
                      height: "11px",
                      width: "15px",
                      borderRadius: "50%",
                      marginLeft: "4px",
                    }}
                    onClick={() => handleViewSearch("10", "0")}
                  ></div>
                  <span
                    className="legend-label"
                    style={{ width: "100%", textAlign: "left" }}
                  >
                    {t("New")}
                  </span>
                </div>
            </div>
          }

        />
        <div className="row p-2">

        </div>
      </div>
    </>
  );
};
export default ViewIssuePage;
