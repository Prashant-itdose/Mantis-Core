import React, { useEffect, useState } from "react";
import { apiUrls } from "../../../networkServices/apiEndpoints";
import Input from "../../formComponent/Input";
import TextEditor from "../../formComponent/TextEditor";
import { useTranslation } from "react-i18next";
import { axiosInstances } from "../../../networkServices/axiosInstance";
import Tables from ".";
import {
  activityTHEAD,
  issueHistoryTHEAD,
} from "../../modalComponent/Utils/HealperThead";
import { useCryptoLocalStorage } from "../../../utils/hooks/useCryptoLocalStorage";
import DatePicker from "../../formComponent/DatePicker";
import Heading from "../Heading";
import Tooltip from "../../../pages/Tooltip";
import { toast } from "react-toastify";
const KanbanNewTicketModal = ({ visible, setVisible }) => {
  const [t] = useTranslation();
  const { VITE_DATE_FORMAT } = import.meta.env;
  const [tableData2, setTableData2] = useState([]);
  const [tableData1, setTableData1] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    TicketID: "",
    Project: "",
    Category: "",
    ViewStatus: "",
    DateSubmitted: "",
    LastUpdate: "",
    Reporter: "",
    AssignedTo: "",
    Priority: "",
    Status: "",
    ReportedByMobile: "",
    ReportedByName: "",
    Summary: "",
    Description: "",
    DeliveryDate: "",
    ManHours: "",
    ReferenceCode: "",
    Note: "",
    ManHour: "",
    ClientManHour: "",
    ClientDeliveryDate: "",
    ReferenceCode: "",
    ModuleName: "",
    PageName: "",
    Incharge: "",
  });
  const [formDataUpdate, setFormDataUpdate] = useState({
    TicketID: "",
    Project: "",
    Category: "",
    ProjectID: "",
    ViewStatus: "",
    DateSubmitted: "",
    LastUpdate: "",
    Reporter: "",
    AssignedTo: "",
    Priority: "",
    Status: "",
    ReportedByMobile: "",
    ReportedByName: "",
    Summary: "",
    Description: "",
    DeliveryDate: "",
    ClientDeliveryDate: "",
    ClientManHour: "",
    ManHour: "",
    ReferenceCode: "",
    Note: "",
    HoldReason: "",
    Reason: "",
    ReOpen: "",
    OtherReferenceNo: "",
    ModuleName: "",
    PageName: "",
  });
  function removeHtmlTags(text) {
    return text.replace(/<[^>]*>?/gm, "");
  }
  const [rowHandler, setRowHandler] = useState({
    show: true,
    show1: true,
  });
  const handlerow = (row) => {
    let obj;
    if (!rowHandler[row]) {
      obj = { ...rowHandler, [row]: true };
    } else {
      obj = { ...rowHandler, [row]: false };
    }
    setRowHandler(obj);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name == "ReferenceCode") {
      if (value.length == 4) return;
    }
    setFormData({ ...formData, [name]: value });
  };
  const RoleID = useCryptoLocalStorage("user_Data", "get", "RoleID");
  const handleSearchNote = () => {
    setLoading(true);
    axiosInstances
      .post(apiUrls.ViewTicket, {
        TicketID: visible.showData.originalData.TicketID,
      })
      .then((res) => {
        const data = res?.data?.data;
        const updateddata = data?.map((ele, index) => {
          return {
            ...ele,
            IsUpdate: false,
          };
        });
        setTableData2(updateddata);
        setLoading(false);
      })
      .catch((err) => {
        toast.error(
          err?.response?.data?.message
            ? err?.response?.data?.message
            : "Error Occured"
        );
        setLoading(false);
      });
  };
  const shortenNamesummary = (name) => {
    return name?.length > 20 ? name?.substring(0, 15) + "..." : name;
  };
  const handleSearchHistory = () => {
    axiosInstances
      .post(apiUrls.ViewHistory, {
        TicketID: visible.showData.originalData.TicketID,
      })
      .then((res) => {
        setTableData1(res?.data?.data);
        setLoading(false);
      })
      .catch((err) => {
        toast.error(
          err?.response?.data?.message
            ? err?.response?.data?.message
            : "Error Occured"
        );
        setLoading(false);
      });
  };

  const handleIssueSearch = () => {
    axiosInstances
      .post(apiUrls.ViewTicket, {
        TicketID: visible.showData.originalData.TicketID,
      })
      .then((res) => {
        if (res?.data?.success === true) {
          setFormData({
            TicketID: res?.data.data[0].Id,
            Project: res?.data.data[0].ProjectName,
            ProjectID: res?.data.data[0].Project_ID,
            Category: res?.data.data[0].CategoryName,
            ViewStatus: res?.data.data[0]?.Status,
            DateSubmitted: res?.data.data[0]?.SubmittedDate,
            LastUpdate: res?.data.data[0]?.Updatedate,
            Reporter: res?.data.data[0]?.ReporterName,
            AssignedTo: res?.data.data[0]?.AssignedTo,
            Priority: res?.data.data[0]?.priority,
            Status: res?.data.data[0]?.Status,
            ReportedByMobile: res?.data.data[0]?.RepoterMobileNo,
            ReportedByName: res?.data.data[0]?.RepoterName,
            Summary: res?.data.data[0]?.summary,
            Description: removeHtmlTags(res?.data.data[0]?.description),
            // DeliveryDate:
            //   res?.data?.data[0]?.DeliveryDate !== null
            //     ? res?.data?.data[0]?.DeliveryDate
            //     : "",
            DeliveryDate: res?.data?.data[0]?.DeliveryDate,
            ClientDeliveryDate: res?.data?.data[0]?.DeliveryDateClient,
            ManHour: res?.data.data[0]?.ManHour,
            ClientManHour: res?.data.data[0]?.ManHoursClient,
            Note: res?.data.data[0]?.Note,
            ReferenceCode: res?.data.data[0]?.ReferenceCode,
            HoldReason: res?.data.data[0]?.HoldReason,
            ModuleName: res?.data.data[0]?.ModuleName,
            PageName: res?.data.data[0]?.PagesName,
            ModuleID: res?.data.data[0]?.ModuleID,
            PagesID: res?.data.data[0]?.PagesID,
            OtherReferenceNo: res?.data.data[0]?.OtherReferenceNo,
          });
          setFormDataUpdate({
            TicketID: res?.data.data[0].Id,
            Project: res?.data.data[0].Project_ID,
            ClientDeliveryDate:
              res?.data?.data[0]?.DeliveryDateClient !== null
                ? new Date(res?.data?.data[0]?.DeliveryDateClient)
                : "",
            ClientManHour: res?.data.data[0]?.ManHoursClient,
            Category: res?.data.data[0]?.category_id,
            DateSubmitted: res?.data.data[0]?.SubmittedDate,
            LastUpdate: res?.data.data[0]?.Updatedate,
            Reporter: res?.data.data[0]?.RepoterName,
            AssignedTo: res?.data.data[0]?.handler_id,
            Priority: res?.data.data[0]?.priority,
            Status: res?.data.data[0]?.StatusId,
            ReportedByMobile: res?.data.data[0]?.RepoterMobileNo,
            ReportedByName: res?.data.data[0]?.RepoterName,
            Summary: res?.data.data[0]?.summary,
            Description: res?.data.data[0]?.description,
            // Description: removeHtmlTags(res?.data.data[0]?.description),
            // DeliveryDate:
            //   res?.data.data[0]?.DeliveryDate != ""
            //     ? new Date(res?.data.data[0]?.DeliveryDate)
            //     : "",
            // DeliveryDate: new Date(res?.data?.data[0]?.DeliveryDate),
            DeliveryDate:
              res?.data?.data[0]?.DeliveryDate !== null
                ? new Date(res?.data?.data[0]?.DeliveryDate)
                : "",
            ManHour: res?.data.data[0]?.ManHour,
            ReferenceCode: res?.data.data[0]?.ReferenceCode,
            Note: res?.data.data[0]?.Note,
            HoldReason: res?.data.data[0]?.HoldReason,
            ModuleName: res?.data.data[0]?.ModuleID,
            PageName: res?.data.data[0]?.PagesID,
            OtherReferenceNo: res?.data.data[0]?.OtherReferenceNo,
          });
        } else {
          toast.error("You are not authorised to view this ticket");
          setVisible(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleDeliveryChange = (name, e) => {
    const { value } = e;
    setFormDataUpdate({
      ...formDataUpdate,
      [name]: value,
    });
  };

  const [edit, setEdit] = useState(false);
  const handleEditUpdate = (ele) => {
    // if (!IsUpdate) {
    //   const data = tableData2;
    //   data[index]["IsUpdate"] = true;
    //   setTableData2(data);
    // } else {

    axiosInstances
      .post(apiUrls.UpdateNote, {
        TicketID: formDataUpdate?.TicketID,
        NoteID: ele?.NoteId,
        NoteText: ele.note,
      })
      .then((res) => {
        if (res?.data?.success === true) {
          toast.success(res?.data?.message);
          handleSearchNote();
        } else {
          toast.error(res?.data?.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDeleteNote = (id) => {
    axiosInstances
      .post(apiUrls.DeleteNote, {
        TicketID: formDataUpdate?.TicketID,
        NoteID: id,
      })
      .then((res) => {
        if (res?.data?.success === true) {
          toast.success(res?.data?.message);
          handleSearchNote();
        } else {
          toast.error(res?.data?.message);
        }
      })
      .catch((err) => {
        toast.error(
          err?.response?.data?.message
            ? err?.response?.data?.message
            : "Error Occurred"
        );
      });
  };
  const searchHandleChange = (e) => {
    const { name, value } = e?.target;
    setFormData({ ...formData, [name]: value });
  };
  useEffect(() => {
    handleSearchNote();
    handleSearchHistory();
    handleIssueSearch();
  }, []);
  return (
    <>
      <div className="card">
        {/* <Heading
          title={"Ticket Generated"}
          secondTitle={<div className="col-sm-12 col-xs-12"></div>}
        /> */}
        <div className="row m-2">
          <Input
            type="text"
            className="form-control"
            id="TickeID"
            name="TickeID"
            lable="TickeID"
            value={formData?.TicketID}
            placeholder=" "
            respclass="col-sm-3 col-md-3 col-12 col-sm-12"
            onChange={handleChange}
            disabled={true}
          />

          <Input
            type="text"
            className="form-control"
            id="Project"
            name="Project"
            lable="Project"
            value={formData?.Project}
            placeholder=" "
            respclass="col-sm-3 col-md-3 col-12 col-sm-12"
            onChange={handleChange}
            disabled={true}
          />

          <Input
            type="text"
            className="form-control"
            id="Category"
            name="Category"
            lable="Category"
            value={formData?.Category}
            placeholder=" "
            respclass="col-sm-3 col-md-3 col-12 col-sm-12"
            onChange={handleChange}
            disabled={true}
          />

          <Input
            type="text"
            className="form-control"
            id="DateSubmitted"
            name="DateSubmitted"
            lable="DateSubmitted"
            value={formData?.DateSubmitted}
            placeholder=" "
            respclass="col-sm-3 col-md-3 col-12 col-sm-12 mt-2"
            onChange={handleChange}
            disabled={edit == true || true}
          />

          <Input
            type="text"
            className="form-control"
            id="Reporter"
            name="Reporter"
            lable="Reporter"
            value={formData?.Reporter}
            placeholder=" "
            respclass="col-sm-3 col-md-3 col-12 col-sm-12 mt-2"
            onChange={handleChange}
            disabled={true}
          />

          <Input
            type="text"
            className="form-control"
            id="AssignedTo"
            name="AssignedTo"
            lable="AssignedTo"
            value={formData?.AssignedTo}
            placeholder=" "
            respclass="col-sm-3 col-md-3 col-12 col-sm-12 mt-2"
            onChange={handleChange}
            disabled={true}
          />

          <Input
            type="text"
            className="form-control"
            id="Priority"
            name="Priority"
            lable="Priority"
            value={formData?.Priority}
            placeholder=" "
            respclass="col-sm-3 col-md-3 col-12 col-sm-12 mt-2"
            onChange={handleChange}
            disabled={true}
          />
          <Input
            type="text"
            className="form-control"
            id="Status"
            name="Status"
            lable="Status"
            value={formData?.Status}
            placeholder=" "
            respclass="col-sm-3 col-md-3 col-12 col-sm-12 mt-2"
            onChange={handleChange}
            disabled={true}
          />

          <Input
            type="text"
            className="form-control"
            id="ReportedByMobile"
            name="ReportedByMobile"
            lable="ReportedByMobile"
            value={formData?.ReportedByMobile}
            placeholder=" "
            respclass="col-sm-3 col-md-3 col-12 col-sm-12 mt-2"
            onChange={handleChange}
            disabled={true}
          />
          <Input
            type="text"
            className="form-control"
            id="ReportedByName"
            name="ReportedByName"
            lable="ReportedByName"
            value={formData?.ReportedByName}
            placeholder=" "
            respclass="col-sm-3 col-md-3 col-12 col-sm-12 mt-2"
            onChange={handleChange}
            disabled={true}
          />
          {RoleID != 7 && (
            <Input
              type="number"
              className="form-control"
              id="ManHour"
              name="ManHour"
              lable="ManHour"
              value={formData?.ManHour}
              placeholder=""
              respclass="col-sm-3 col-md-3 col-12 col-sm-12 mt-2"
              onChange={handleChange}
              disabled={edit == false}
            />
          )}
          {RoleID != 7 && (
            <Input
              type="number"
              className="form-control"
              id="ClientManHour"
              name="ClientManHour"
              lable="ClientManHour"
              value={formData?.ClientManHour}
              placeholder=""
              respclass="col-sm-3 col-md-3 col-12 col-sm-12 mt-2"
              onChange={handleChange}
              disabled={edit == false}
            />
          )}

          {RoleID != 7 && (
            <DatePicker
              className="custom-calendar"
              id="DeliveryDate"
              name="DeliveryDate"
              placeholder={VITE_DATE_FORMAT}
              respclass="col-sm-3 col-md-3 col-12 col-sm-12 mt-2"
              value={formData?.DeliveryDate}
              handleChange={searchHandleChange}
              disabled={edit == false}
            />
          )}
          {RoleID != 7 && (
            <Input
              type="text"
              className="form-control"
              id="ClientDeliveryDate"
              name="ClientDeliveryDate"
              lable="ClientDeliveryDate"
              value={formData?.ClientDeliveryDate}
              placeholder=" "
              respclass="col-sm-3 col-md-3 col-12 col-sm-12 mt-2"
              onChange={handleChange}
              disabled={edit == false}
            />
          )}
          {RoleID != 7 && (
            <Input
              type="text"
              className="form-control"
              id="ReferenceCode"
              name="ReferenceCode"
              lable="Dev. ManMinutes"
              value={formData?.ReferenceCode}
              placeholder=""
              respclass="col-sm-3 col-md-3 col-12 col-sm-12 mt-2"
              onChange={handleChange}
              disabled={edit == false}
            />
          )}
          <Input
            type="text"
            className="form-control"
            id="ModuleName"
            name="ModuleName"
            lable="ModuleName"
            value={formData?.ModuleName}
            placeholder=" "
            respclass="col-sm-3 col-md-3 col-12 col-sm-12 mt-2"
            onChange={handleChange}
            disabled={edit == false}
          />
          <Input
            type="text"
            className="form-control"
            id="Incharge"
            name="Incharge"
            lable="Incharge"
            value={formData?.Incharge}
            placeholder=" "
            respclass="col-sm-3 col-md-3 col-12 col-sm-12 mt-2"
            onChange={handleChange}
            disabled={edit == false}
          />
          <Input
            type="text"
            className="form-control"
            id="PageName"
            name="PageName"
            lable="PageName"
            value={formData?.PageName}
            placeholder=" "
            respclass="col-sm-3 col-md-3 col-12 col-sm-12 mt-2"
            onChange={handleChange}
            disabled={edit == false}
          />
          <textarea
            type="text"
            className="form-control textraeaheight"
            id="Summary"
            name="Summary"
            lable="Summary"
            value={formData?.Summary}
            placeholder=" "
            respclass="col-12 mt-2"
            onChange={handleChange}
            disabled={true}
          />
          <textarea
            type="text"
            className="form-control textraeaheight"
            id="Description"
            name="Description"
            lable="Description"
            value={formData?.Description}
            placeholder=" "
            respclass="col-12 mt-2 mb-2"
            onChange={handleChange}
            disabled={true}
          />
          {/* <div className="col-12 mt-1">
            <TextEditor
              value={formData?.Description ? formData?.Description : ""}
            />
          </div> */}
          <textarea
            type="text"
            className="form-control textraeaheight"
            id="Note"
            name="Note"
            lable="Note"
            value={formData?.Note}
            placeholder="Note "
            onChange={handleChange}
            disabled={edit == false}
          ></textarea>
        </div>
      </div>
      <div className="card patient_registration_card mt-3">
        <Heading
          title={"Notes Details"}
          secondTitle={
            <div style={{ marginRight: "0px" }}>
              <button
                className={`fa ${rowHandler.show1 ? "fa-arrow-up" : "fa-arrow-down"}`}
                onClick={() => {
                  handlerow("show1");
                }}
                style={{
                  cursor: "pointer",
                  border: "none",
                  color: "black",
                  borderRadius: "2px",
                  background: "none",
                }}
              ></button>
            </div>
          }
        />
        {/* {rowHandler.show1 && (
          <> */}
        {tableData2?.length > 0 ? (
          <Tables
            style={{ margin: "1px" }}
            thead={activityTHEAD}
            tbody={tableData2?.map((ele, index) => ({
              Update: (
                <>
                  <button
                    className="btn btn-lg btn-info ml-2"
                    onClick={() => {
                      const updatedData = [...tableData2]; // Create a copy of the state
                      updatedData[index]["IsUpdate"] = !ele?.IsUpdate; // Modify the copy
                      setTableData2(updatedData); // Set the state with the new array
                      if (!ele?.IsUpdate) handleEditUpdate(ele);
                    }}
                  >
                    {ele?.IsUpdate ? "Update" : "Edit"}
                  </button>
                  <button
                    className="btn btn-lg btn-info ml-2"
                    onClick={() => handleDeleteNote(ele?.NoteId)}
                  >
                    Delete
                  </button>
                </>
              ),
              NoteId: ele?.NoteId,
              //  (
              //   <Input
              //     value={ele?.NoteId}
              //     className="form-control"
              //     disabled={true}
              //   />
              // ),
              Notes:
                ele?.IsUpdate === false ? (
                  // <Input
                  //   value={ele?.note}
                  //   className="form-control"
                  //   disabled={ele?.IsUpdate == false}
                  // />
                  <textarea
                    type="text"
                    className="summaryheightTicket"
                    id="Note"
                    name="Note"
                    disabled={ele?.IsUpdate == false}
                    // lable="Note"
                    value={ele?.note}
                    onChange={(e) => {
                      const updatedData = [...tableData2];
                      updatedData[index]["note"] = e?.target.value;
                      setTableData2(updatedData);
                    }}
                  ></textarea>
                ) : (
                  // <Input
                  //   name="Note"
                  //   className="form-control"
                  //   value={ele?.note}
                  //   onChange={(e) => {
                  //     const updatedData = [...tableData2];
                  //     updatedData[index]["note"] = e?.target.value;
                  //     setTableData2(updatedData);
                  //   }}
                  // />
                  <textarea
                    type="text"
                    className="summaryheightTicket"
                    id="Note"
                    name="Note"
                    // lable="Note"
                    value={ele?.note}
                    onChange={(e) => {
                      const updatedData = [...tableData2];
                      updatedData[index]["note"] = e?.target.value;
                      setTableData2(updatedData);
                    }}
                  ></textarea>
                ),
              "User Name": (
                <Tooltip label={ele?.RealName}>
                  <span
                    id={`projectName-${index}`}
                    targrt={`projectName-${index}`}
                    style={{ textAlign: "center" }}
                  >
                    {shortenNamesummary(ele?.RealName)}
                  </span>
                </Tooltip>
              ),
              //  (
              //   <Input
              //     value={ele?.RealName}
              //     className="form-control"
              //     disabled={true}
              //   />
              // ),
              DateSubmitted: ele?.dtEntry,
              //  (
              //   <Input
              //     value={ele?.dtEntry}
              //     disabled={true}
              //     className="form-control"
              //   />
              // ),
            }))}
            tableHeight={"tableHeight"}
          />
        ) : (
          <span style={{ textAlign: "center" }}>
            There are no notes attached to this issue.
          </span>
        )}{" "}
        {/* </>
        )} */}
      </div>

      <div className="card patient_registration_card mt-3">
        <Heading
          title={t("View History Details")}
          secondTitle={
            <div style={{ marginRight: "0px" }}>
              <button
                className={`fa ${rowHandler.show ? "fa-arrow-up" : "fa-arrow-down"}`}
                onClick={() => {
                  handlerow("show");
                }}
                style={{
                  cursor: "pointer",
                  border: "none",
                  color: "black",
                  borderRadius: "2px",
                  background: "none",
                }}
              ></button>
            </div>
          }
        />
        {rowHandler.show && (
          <>
            {tableData1?.length > 0 ? (
              <Tables
                thead={issueHistoryTHEAD}
                tbody={tableData1?.map((ele, index) => ({
                  DateModified: ele?.Updatedate,
                  "User Name": ele?.username,
                  Field: ele?.field_name,
                  "Old Value": ele?.leble1 == "01-01-1970" ? "" : ele.leble1,
                  "New Value": ele?.leble2 == "01-01-1970" ? "" : ele.leble2,
                }))}
                tableHeight={"tableHeight"}
              />
            ) : (
              <span style={{ textAlign: "center" }}>
                There are no notes history of this issue.
              </span>
            )}
          </>
        )}
      </div>
    </>
  );
};
export default KanbanNewTicketModal;
