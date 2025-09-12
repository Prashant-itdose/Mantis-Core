import React, { useEffect, useState } from "react";
import Tables from ".";
import axios from "axios";
import { toast } from "react-toastify";
import { headers } from "../../../utils/apitools";
import Heading from "../Heading";
import {
  activityTHEAD,
  issueHistoryTHEAD,
  viewTHEAD,
} from "../../modalComponent/Utils/HealperThead";
import Modal from "../../modalComponent/Modal";
import UpdateViewIssueTableModal from "./UpdateViewIssueTableModal";
import Input from "../../formComponent/Input";
import { useTranslation } from "react-i18next";
import DatePicker from "../../formComponent/DatePicker";
import TextEditor from "../../formComponent/TextEditor";
import ReactSelect from "../../formComponent/ReactSelect";
import { apiUrls } from "../../../networkServices/apiEndpoints";
import { useCryptoLocalStorage } from "../../../utils/hooks/useCryptoLocalStorage";
import { axiosInstances } from "../../../networkServices/axiosInstance";
const NewTicketModal = ({ visible, setVisible, tableData, id }) => {
  // console.log(visible,id)
  const [t] = useTranslation();
  const { VITE_DATE_FORMAT } = import.meta.env;
  const [tableData2, setTableData2] = useState([]);
  const [tableData1, setTableData1] = useState([]);
  const [loading, setLoading] = useState();
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
  });

  function removeHtmlTags(text) {
    return text.replace(/<[^>]*>?/gm, "");
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name == "ReferenceCode") {
      if (value.length == 4) return;
    }
    setFormData({ ...formData, [name]: value });
  };

  const handleTableChange = () => {
    setTableData2({});
  };

  const handleSearchNote = () => {
    setLoading(true);
    axiosInstances
      .post(apiUrls.ViewNote, {
  "TicketID": visible?.showData?.TicketID
})
    // let form = new FormData();
    // form.append("ID", useCryptoLocalStorage("user_Data", "get", "ID")),
    //   form.append("TicketID", visible?.showData?.TicketID);
    // axios
    //   .post(apiUrls?.ViewNote, form, {
    //     headers,
    //   })
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

  const handleSearchHistory = () => {
    setLoading(true);
    axiosInstances
      .post(apiUrls.ViewHistory, {
  "TicketID":  visible?.showData?.TicketID
})
    // let form = new FormData();
    // form.append("ID", useCryptoLocalStorage("user_Data", "get", "ID")),
    //   form.append("TicketID", visible?.showData?.TicketID);
    // axios
    //   .post(apiUrls?.ViewHistory, form, {
    //     headers,
    //   })
      .then((res) => {
        setTableData1(res?.data?.data);
        setLoading(false);
        console.log("manik", res?.data?.data);
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

  const handleIssueSearch = (ticket) => {
    axiosInstances
      .post(apiUrls.Attendence_Search, {
        TicketID: ticket,
      })
      .then((res) => {
        if (res?.data?.status === true) {
          setFormData({
            TicketID: res?.data.data[0].Id,
            Project: res?.data.data[0].ProjectName,
            Category: res?.data.data[0].CategoryName,
            ViewStatus: res?.data.data[0]?.Status,
            DateSubmitted: res?.data.data[0]?.SubmittedDate,
            LastUpdate: res?.data.data[0]?.Updatedate,
            Reporter: res?.data.data[0]?.TicketRaisedBy,
            AssignedTo: res?.data.data[0]?.AssignedTo,
            Priority: res?.data.data[0]?.priority,
            Status: res?.data.data[0]?.Status,
            ReportedByMobile: res?.data.data[0]?.RepoterMobileNo,
            ReportedByName: res?.data.data[0]?.RepoterName,
            Summary: res?.data.data[0]?.summary,
            Description: removeHtmlTags(res?.data.data[0]?.description),
            DeliveryDate:
              res?.data.data[0]?.DeliveryDate != ""
                ? new Date(res?.data.data[0]?.DeliveryDate)
                : "",
            ManHours: res?.data.data[0]?.ManHour,
            Note: "",
            ReferenceCode: res?.data.data[0]?.ReferenceCode,
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

  const [edit, setEdit] = useState(false);
  const [rowHandler, setRowHandler] = useState({
    show: false,
    show1: false,
  });

  const [project, setProject] = useState([]);
  const [category, setCategory] = useState([]);
  const [assignto, setAssignedto] = useState([]);
  const [priority, setPriority] = useState([]);
  const [status, setStatus] = useState([]);
  const getStatus = () => {
    axiosInstances
      .post(apiUrls.Status_Select, {})
    // let form = new FormData();
    // form.append("ID", useCryptoLocalStorage("user_Data", "get", "ID")),
    //   axios
    //     .post(apiUrls?.Status_Select, form, { headers })
        .then((res) => {
          const poc3s = res?.data.data.map((item) => {
            return { label: item?.STATUS, value: item?.id };
          });
          setStatus(poc3s);
        })
        .catch((err) => {
          console.log(err);
        });
  };
  const getProject = () => {
    axiosInstances
      .post(apiUrls.ProjectSelect, {
  "ProjectID": 0,
  "IsMaster": "0",
  "VerticalID": 0,
  "TeamID": 0,
  "WingID": 0
})
    // let form = new FormData();
    // console.log("ram", "1");
    // form.append("ID", useCryptoLocalStorage("user_Data", "get", "ID")),
    //   form.append(
    //     "LoginName",
    //     useCryptoLocalStorage("user_Data", "get", "realname")
    //   ),
    //   axios
    //     .post(apiUrls?.ProjectSelect, form, { headers })
        .then((res) => {
          const poc3s = res?.data.data.map((item) => {
            return { label: item?.Project, value: item?.ProjectId };
          });
          getCategory(poc3s[0]?.value);
          setProject(poc3s);
        })
        .catch((err) => {
          console.log(err);
        });
  };
  const getPriority = () => {
    axiosInstances
      .post(apiUrls.Priority_Select, {})
    // let form = new FormData();
    // form.append("ID", useCryptoLocalStorage("user_Data", "get", "ID")),
    //   axios
    //     .post(apiUrls?.Priority_Select, form, { headers })
        .then((res) => {
          const assigntos = res?.data.data.map((item) => {
            return { label: item?.NAME, value: item?.ID };
          });
          setPriority(assigntos);
        })
        .catch((err) => {
          console.log(err);
        });
  };
  const getCategory = (proj) => {
    axiosInstances
      .post(apiUrls.Category_Select, {
  "RoleID": 0,
  "ProjectID": proj
})
    // let form = new FormData();
    // form.append("ID", useCryptoLocalStorage("user_Data", "get", "ID")),
    //   form.append("ProjectID", proj),
    //   axios
    //     .post(apiUrls?.Category_Select, form, { headers })
        .then((res) => {
          const poc3s = res?.data.data.map((item) => {
            return { label: item?.NAME, value: item?.ID };
          });
          setCategory(poc3s);
        })
        .catch((err) => {
          console.log(err);
        });
  };
  const getAssignTo = () => {
    axiosInstances
      .post(apiUrls.AssignTo_Select, {
  "ProjectID": 0
})
    // let form = new FormData();
    // form.append("ID", useCryptoLocalStorage("user_Data", "get", "ID")),
    //   axios
    //     .post(apiUrls?.AssignTo_Select, form, { headers })
        .then((res) => {
          const assigntos = res?.data.data.map((item) => {
            return { label: item?.NAME, value: item?.ID };
          });
          setAssignedto(assigntos);
        })
        .catch((err) => {
          console.log(err);
        });
  };
  console.log(visible?.showData);
  useEffect(() => {
    getProject();
    getAssignTo();
    getPriority();
    getStatus();
    handleSearchNote();
    handleSearchHistory();
    handleIssueSearch(id);
  }, []);

  return (
    <>
      {/* {updatevisible?.updateShow && (
        <Modal
          visible={updatevisible}
          setVisible={setUpdateVisible}
          Header="Updating Issue Information"
        >
          <UpdateViewIssueTableModal
            visible={updatevisible}
            setVisible={setUpdateVisible}
          />
        </Modal>
      )} */}
      <div className="card">
        <Heading
          title={"Ticket Generated"}
          secondTitle={
            <div className="col-sm-12 col-xs-12">
              {/* <button
              style={{background:"white" ,color:"black" ,border:"none"}}
                className="previous  btn-success mx-2"
                disabled={tableData[0]?.currentIndex === 0 ? true : false}
              >
                ‹
              </button> */}

              {/* <button
                className="next btn-success mx-2"
                disabled={
                  tableData[0]?.currentIndex === tableData.length - 1
                    ? true
                    : false
                }
              >
                ›
              </button> */}
            </div>
          }
        />
        {/* <Tables
          thead={viewTHEAD}
          tbody={daata?.map((ele, index) => ({
            ID: ele?.TicketID,
            Project: ele?.ProjectName,
            Category: ele?.Category,
            "View Status": ele?.Status,
            "Date Submitted": ele?.AssignedDate,
            "Last Update": ele?.ResolvedDate,
            Reporter: ele?.ReporterName,
            AssignedTo: ele?.AssignTo,
            Priority: ele?.Priority,
            Status: ele?.Status,
            "Reported By Mobile No": 9999999999,
            "Reported By Name": ele?.ReporterName,
            Summary: ele?.summary,
            Description: "aaaaaaaaaaaa",
            "Delivery Date": ele?.AssignedDate,
          }))}
          tableHeight={"tableHeight"}
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
            respclass="col-md-4 col-12 col-sm-12"
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
            respclass="col-md-4 col-12 col-sm-12"
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
            respclass="col-md-4 col-12 col-sm-12"
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
            respclass="col-md-4 col-12 col-sm-12"
            onChange={handleChange}
            disabled={edit == true || true}
          />
          {/* <Input
            type="text"
            className="form-control"
            id="LastUpdate"
            name="LastUpdate"
            lable="LastUpdate"
            value={formData?.LastUpdate}
            placeholder=" "
            respclass="col-md-4 col-12 col-sm-12"
            onChange={handleChange}
            disabled={edit == true || true}
          /> */}
          <Input
            type="text"
            className="form-control"
            id="Reporter"
            name="Reporter"
            lable="Reporter"
            value={formData?.Reporter}
            placeholder=" "
            respclass="col-md-4 col-12 col-sm-12"
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
            respclass="col-md-4 col-12 col-sm-12"
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
            respclass="col-md-4 col-12 col-sm-12"
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
            respclass="col-md-4 col-12 col-sm-12"
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
            respclass="col-md-4 col-12 col-sm-12"
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
            respclass="col-md-4 col-12 col-sm-12"
            onChange={handleChange}
            disabled={true}
          />
          <Input
            type="text"
            className="form-control"
            id="Summary"
            name="Summary"
            lable="Summary"
            value={formData?.Summary}
            placeholder=" "
            respclass="col-md-4 col-12 col-sm-12"
            onChange={handleChange}
            disabled={true}
          />
          <div className="col-12">
            <TextEditor
              value={formData?.Description ? formData?.Description : ""}
            />
          </div>

          {/* <Input
              type="text"
              className="form-control"
              id="DeliveryDate"
              name="DeliveryDate"
              lable="DeliveryDate"
              value={formData?.DeliveryDate}
              placeholder=" "
              respclass="col-md-4 col-12 col-sm-12"
              onChange={handleChange}
              disabled={true}
            />
        <textarea
            type="text"
            className="form-control"
            id="Note"
            name="Note"
            lable="Note"
            value={formData?.Note}
            placeholder="Note "
            //  respclass="col-md-4 col-12 col-sm-12"
            onChange={handleChange}
            disabled={true}
            style={{ width: "32%", marginLeft: "7.5px" }}
          ></textarea>
          <Input
            type="text"
            className="form-control"
            id="ManHours"
            name="ManHours"
            lable="ManHours"
            value={formData?.ManHours}
            placeholder=""
            respclass="col-md-4 col-12 col-sm-12"
            onChange={handleChange}
            disabled={true}
          />
          <Input
            type="text"
            className="form-control"
            id="ReferenceCode"
            name="ReferenceCode"
            lable="ReferenceCode"
            value={formData?.ReferenceCode}
            placeholder=""
            respclass="col-md-4 col-12 col-sm-12"
            onChange={handleChange}
            disabled={true}
          /> */}
        </div>
      </div>

      {/* <div className="card patient_registration_card mt-3">
        <Heading
          title={"Actvities"}
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
        {rowHandler.show1 && (
          <>
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
                  "User Name": (
                    <Input
                      value={ele?.RealName}
                      className="form-control"
                      disabled={true}
                    />
                  ),
                  DateSubmitted: (
                    <Input
                      value={ele?.dtEntry}
                      disabled={true}
                      className="form-control"
                    />
                  ),

                  NoteId: (
                    <Input
                      value={ele?.NoteId}
                      className="form-control"
                      disabled={true}
                    />
                  ),

                  Notes:
                    ele?.IsUpdate === false ? (
                      <Input
                        value={ele?.note}
                        className="form-control"
                        disabled={ele?.IsUpdate == false}
                      />
                    ) : (
                      <Input
                        name="Note"
                        className="form-control"
                        value={ele?.note}
                        onChange={(e) => {
                          const updatedData = [...tableData2];
                          updatedData[index]["note"] = e?.target.value;
                          setTableData2(updatedData);
                        }}
                      />
                    ),
                }))}
                tableHeight={"tableHeight"}
              />
            ) : (
              <span style={{ textAlign: "center" }}>
                There are no notes attached to this issue.
              </span>
            )}{" "}
          </>
        )}
      </div>

      <div className="card patient_registration_card mt-3">
        <Heading
          title={t("Search History")}
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
          <Tables
            thead={issueHistoryTHEAD}
            tbody={tableData1?.map((ele, index) => ({
              DateModified: ele?.Updatedate,
              "User Name": ele?.username,
              Field: ele?.field_name,
              Change: ele?.leble1,
            }))}
            tableHeight={"tableHeight"}
          />
        )}
      </div> */}
    </>
  );
};
export default NewTicketModal;
