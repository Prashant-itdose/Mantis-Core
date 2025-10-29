import React, { useEffect, useState } from "react";
import { apiUrls } from "../../../networkServices/apiEndpoints";
import Input from "../../formComponent/Input";
import TextEditor from "../../formComponent/TextEditor";
import { useTranslation } from "react-i18next";
import { axiosInstances } from "../../../networkServices/axiosInstance";
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
            respclass="col-md-4 col-12 col-sm-12 mt-2"
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
            respclass="col-md-4 col-12 col-sm-12 mt-2"
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
            respclass="col-md-4 col-12 col-sm-12 mt-2"
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
            respclass="col-md-4 col-12 col-sm-12 mt-2"
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
            respclass="col-md-4 col-12 col-sm-12 mt-2"
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
            respclass="col-md-4 col-12 col-sm-12 mt-2"
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
            respclass="col-md-4 col-12 col-sm-12 mt-2"
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
            respclass="col-md-8 col-12 col-sm-12 mt-2"
            onChange={handleChange}
            disabled={true}
          />
          <div className="col-12 mt-1">
            <TextEditor
              value={formData?.Description ? formData?.Description : ""}
            />
          </div>
        </div>
      </div>
    </>
  );
};
export default KanbanNewTicketModal;
