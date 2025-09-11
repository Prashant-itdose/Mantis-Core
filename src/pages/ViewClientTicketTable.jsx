import React, { useEffect, useRef, useState } from "react";
import CustomPagination from "../utils/CustomPagination";
import DatePicker from "../components/formComponent/DatePicker";
import ReactSelect from "../components/formComponent/ReactSelect";
import Tooltip from "./Tooltip";
import { Link, useLocation } from "react-router-dom";
import Input from "../components/formComponent/Input";
import Tables from "../components/UI/customTable";
import ViewIssueDocTable from "../components/UI/customTable/ViewIssueDocTable";
import Modal from "../components/modalComponent/Modal";
import ViewIssueNotesModal from "../components/UI/customTable/ViewIssueNotesModal";
import ViewIssueDocModal from "../components/UI/customTable/ViewIssueDocModal";
import ClientViewIssueModal from "../components/UI/customTable/ClientViewIssueModal";
import { useCryptoLocalStorage } from "../utils/hooks/useCryptoLocalStorage";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { apiUrls } from "../networkServices/apiEndpoints";
import { headers } from "../utils/apitools";
import { toast } from "react-toastify";
const ViewClientTicketTable = (props) => {
  const [t] = useTranslation();
  const {
    tbody = [...tbody],
    values,
    handleCustomSelect,
    THEAD,
    formData,
    setFormData,
    setTableData,
    handleViewSearch,
    tableData,
    selectedRowIndex,
    setSelectedRowIndex,
  } = props;
  const AllowDeleteTicket = useCryptoLocalStorage(
    "user_Data",
    "get",
    "AllowDeleteTicket"
  );
  //   const [selectedRowIndex, setSelectedRowIndex] = useState(-1);
  const [reopen, setReOpen] = useState([]);
  const { VITE_DATE_FORMAT } = import.meta.env;

  const [currentPage, setCurrentPage] = useState(1);
  const totalRecords = tbody?.length > 0 ? parseInt(tbody[0]?.TotalRecord) : 0;
  const totalPages = Math?.ceil(totalRecords / (formData?.PageSize || 10));
  const currentData = tbody;

  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(1);
    }
  }, [totalPages]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    handleViewSearch(undefined, newPage - 1);
  };

  const getReopen = () => {
    let form = new FormData();
    form.append("ID", useCryptoLocalStorage("user_Data", "get", "ID")),
      form.append("Title", "ReOpenReason"),
      axios
        .post(apiUrls?.Reason_Select, form, { headers })
        .then((res) => {
          const poc3s = res?.data.data.map((item) => {
            return { label: item?.NAME, value: item?.ID };
          });
          setReOpen(poc3s);
        })
        .catch((err) => {
          console.log(err);
        });
  };
  const [visible, setVisible] = useState({
    showVisible: false,
    docVisible: false,
    noteVisible: false,
    docViewVisible: false,
    showData: {},
  });
  const location = useLocation();

  useEffect(() => {
    if (
      Array.isArray(location.state?.data) &&
      location.state?.data.length > 0 &&
      location.state?.data[0]?.Id > 0
    ) {
      setVisible({
        showVisible: true,
        showData: { ...location.state?.data[0], flag: true },
      });
    }
  }, [location.state?.data]);

  const handleResolveElementClose = (item) => {
    let form = new FormData();
    form.append("ID", useCryptoLocalStorage("user_Data", "get", "ID")),
      form.append(
        "LoginName",
        useCryptoLocalStorage("user_Data", "get", "realname")
      ),
      form.append("TicketIDs", item?.TicketID),
      form.append("ActionText", "Close");
    axios
      .post(apiUrls?.ApplyActionClient, form, { headers })
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
  const dynamicOptionStatus = [
    {
      label: "Close",
      value: "Close",
    },
    {
      label: "ReOpen",
      value: "ReOpen",
    },
    {
      label: "Resolve",
      value: "Resolve",
    },
  ];
 
  const handleDeliveryChangeCheckbox = (e, index) => {
    const { checked } = e.target;
    const data = [...tbody];
    data[index]["IsActive"] = checked;
    setTableData(data);
  };
  const shortenNamesummary = (name) => {
    return name?.length > 20 ? name?.substring(0, 15) + "..." : name;
  };
  const handleDeliveryChangeValue = (name, value, ind, page, ele) => {
    let index = 0;

    tbody?.map((val, ind) => {
      console.log("val val", val);
      if (val?.TicketID !== ele?.TicketID) {
        val["TableStatus"] = null;
      } else {
        index = ind;
      }
      return val;
    });
    if (name == "ReOpenValue") {
      const data = [...tbody];
      data[index][name] = value;
      setTableData(data);
    } else {
      const data = [...tbody];
      data[index][name] = value;
      setTableData(data);
    }

    if (name === "TableStatus" && value === "Close") {
      handleResolveElementClose(ele);
    }
    if (name === "TableStatus" && value === "Resolve") {
      updateReceivedDate(ele);
    }
  };
  const handleAgainChange = (name, value, index, ele) => {
    let updatedData = [...tbody];
    updatedData[index][name] = value;
    setTableData(updatedData);

    if (name === "ReOpenValue") {
      getApplyActionReason(
        {
          label: value?.label,
          value: value.value,
        },
        index
      );
    }
  };
  const handleDelete = () => {
    const filterdata = tbody?.filter((item) => item?.IsActive == true);
    const ticketIDs = filterdata?.map((item) => item?.TicketID).join(",");
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
  const getApplyActionReason = (data, index, ele) => {
    let form = new FormData();
    form.append("ID", useCryptoLocalStorage("user_Data", "get", "ID")),
      form.append(
        "LoginName",
        useCryptoLocalStorage("user_Data", "get", "realname")
      ),
      form.append("TicketIDs", tbody[index]?.TicketID),
      form.append("ReOpenReason", data?.label),
      form.append("ReOpenReasonID", data?.value),
      form.append("ActionText", "ReOpen"),
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

  const updateReceivedDate = (details) => {
    let form = new FormData();
    form.append("ID", useCryptoLocalStorage("user_Data", "get", "ID")),
      form.append(
        "LoginName",
        useCryptoLocalStorage("user_Data", "get", "realname")
      ),
      form.append("TicketIDs", details?.TicketID),
      form.append("ActionText", "ResolveDate"),
      form.append("ActionId", new Date().toISOString().split("T")[0]),
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

  useEffect(() => {
    getReopen();
  }, []);
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
          <ClientViewIssueModal
            visible={visible}
            setVisible={setVisible}
            tableData={currentData}
            setTableData={setTableData}
          />
        </Modal>
      )}

      {visible?.docVisible && (
        <Modal
          modalWidth={"400px"}
          visible={visible}
          setVisible={setVisible}
          Header="Upload Documents"
        >
          <ViewIssueDocModal
            visible={visible}
            setVisible={setVisible}
            handleViewSearch={handleViewSearch}
          />
        </Modal>
      )}
      {visible?.noteVisible && (
        <Modal
          modalWidth={"800px"}
          visible={visible}
          setVisible={setVisible}
          Header="Notes Details"
        >
          <ViewIssueNotesModal
            visible={visible}
            setVisible={setVisible}
            handleViewSearch={handleViewSearch}
          />
        </Modal>
      )}
      {visible?.docViewVisible && (
        <Modal
          modalWidth={"800px"}
          visible={visible}
          setVisible={setVisible}
          Header="View Documents"
        >
          <ViewIssueDocTable
            visible={visible}
            setVisible={setVisible}
            handleViewSearch={handleViewSearch}
          />
        </Modal>
      )}
      <div className="card">
        <div className="row p-2">
          <Tables
            style={{ width: "100%", height: "100%" }}
            thead={THEAD}
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
                <Tooltip label={ele?.ProjectName}>
                  <span
                    id={`projectName-${index}`}
                    targrt={`projectName-${index}`}
                    style={{ textAlign: "center" }}
                  >
                    {shortenNamesummary(ele?.ProjectName)}
                  </span>
                </Tooltip>
              ),

              "Category Name": ele?.Category,
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
              "Assign To": ele?.AssignTo,
              Summary: (
                <div style={{ width: "178px" }}>
                  <span
                    style={{
                      whiteSpace: "normal",
                      cursor: "pointer",
                    }}
                    id={`summary-${index}`}
                    targrt={`summary-${index}`}
                    title={ele?.summary}
                  >
                    {ele?.summary}
                  </span>
                </div>
              ),
              Status: ele?.Status,
              "Submit Date": ele?.TicketRaisedDate,
              "Resolve Date": ele?.ResolvedDate,
              // Close:
              //   ele?.Status == "closed" ? (
              //     ""
              //   ) : (
              //     <button
              //       className="btn btn-xs btn-danger"
              //       style={{
              //         color: "white",
              //         backgroundColor: "red",
              //         borderColor: "red !important",
              //         border: "none",
              //       }}
              //       disabled={ele?.Status === "closed"}
              //       onClick={() => handleResolveElementClose(ele)}
              //     >
              //       Close
              //     </button>
              //   ),

              // Action: (
              //   <>
              //     {ele?.DClosedStatus == 1 ? (
              //       <>
              //         <button
              //           className="btn btn-xs btn-danger ml-2 mb-1"
              //           style={{
              //             color: "white",
              //             backgroundColor: "green",
              //             border: "none",
              //           }}
              //           onClick={() => handleClick(index)}
              //         >
              //           ReOpen
              //         </button>
              //       </>
              //     ) : (
              //       ""
              //     )}
              //     {showSelect === index && (
              //       <div
              //         style={{
              //           width: "100%",
              //           marginLeft: "3px",
              //           marginTop: "5px",
              //         }}
              //       >
              //         <ReactSelect
              //           name="ReOpenValue"
              //           id="ReOpenValue"
              //           placeholderName="Reason"
              //           dynamicOptions={reopen}
              //           value={ele?.ReOpenValue}
              //           handleChange={(name, value) => {
              //             handleAgainChange(name, value, index);
              //           }}
              //           respclass="width110px"
              //         />
              //       </div>
              //     )}
              //   </>
              // ),
              Action: (
                <>
                  <ReactSelect
                    style={{ width: "100%", marginLeft: "10px" }}
                    height={"6px"}
                    name="TableStatus"
                    id="TableStatus"
                    respclass="width110px"
                    placeholderName="Select"
                    dynamicOptions={dynamicOptionStatus}
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

                  {ele?.TableStatus == "ReOpen" && (
                    <>
                      {ele?.DClosedStatus == 1 ? (
                        <ReactSelect
                          style={{ width: "100%", marginLeft: "3px" }}
                          height={"6px"}
                          name="ReOpenValue"
                          respclass="width110px"
                          id="ReOpenValue"
                          placeholderName="Reason"
                          dynamicOptions={reopen}
                          value={ele?.ReOpenValue}
                          handleChange={(name, value) => {
                            handleAgainChange(name, value, index);
                          }}
                        />
                      ) : (
                        <span
                          style={{
                            color: "Orange",
                            marginLeft: "5px",
                          }}
                        >
                          Please Close Ticket<br></br>or &nbsp;Reopen Date Over.
                        </span>
                      )}
                    </>
                  )}
                  {/* {ele?.TableStatus == "Close" && (
                    <>
                      <button
                        className="btn btn-xs btn-danger ml-2"
                        style={{
                          color: "white",
                          backgroundColor: "red",
                          borderColor: "red !important",
                          border: "none",
                        }}
                        disabled={ele?.Status === "closed"}
                        onClick={() => handleResolveElementClose(ele)}
                      >
                        Close
                      </button>
                    </>
                  )} */}
                  {/* {ele?.TableStatus == "Resolve" && (
                    <>
                      <div className="mt-2">
                        {" "}
                        <DatePicker
                          placeholder={VITE_DATE_FORMAT}
                          className="custom-calendar"
                          id="ResolveDate"
                          name="ResolveDate"
                          lable={"Resolve Date"}
                          value={formData?.ResolveDate}
                          handleChange={(e) => {
                            const { name, value } = e.target;
                            searchHandleChangeTable(name, value, index, ele);
                          }}
                        />
                      </div> */}
                  {/* <button
                              className="btn btn-sm btn-success ml-1 mb-1 mt-1"
                              style={{
                                marginRight: "1px",
                                marginLeft: "1px",
                              }}
                              onClick={() => handleResolveElement(ele)}
                            >
                              Resolve
                            </button> */}
                  {/* </> */}
                  {/* )} */}
                </>
              ),
              ModuleName: ele?.ModuleName,
              PageName: ele?.PagesName,
              colorcode: ele?.rowColor,
            }))}
            tableHeight={"tableHeight"}
          />
        </div>
        <div className="d-flex justify-content-between align-items-start">
          <div>
            {AllowDeleteTicket === "1" && (
              <button
                className="btn btn-sm btn-danger mt-1 ml-2"
                onClick={handleDelete}
              >
                Delete Ticket
              </button>
            )}
          </div>
          <div>
            <CustomPagination
              totalPages={totalPages}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    </>
  );
};
export default ViewClientTicketTable;
