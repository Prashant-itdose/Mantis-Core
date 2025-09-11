import axios from "axios";
import React, { useEffect, useState } from "react";
import { apiUrls } from "../networkServices/apiEndpoints";
import { headers } from "../utils/apitools";
import Heading from "../components/UI/Heading";
import ReactSelect from "../components/formComponent/ReactSelect";
import DatePicker from "../components/formComponent/DatePicker";
import Tables from "../components/UI/customTable";
import { circularThead } from "../components/modalComponent/Utils/HealperThead";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import Loading from "../components/loader/Loading";
import NoRecordFound from "../components/formComponent/NoRecordFound";
import Modal from "../components/modalComponent/Modal";
import ViewMessageCircular from "./ViewMessageCircular";
import { useCryptoLocalStorage } from "../utils/hooks/useCryptoLocalStorage";
import CircularCountModal from "./CircularCountModal";
import CircularUNCountModal from "./CircularUNCountModal";
const CircularSearch = () => {
  const { VITE_DATE_FORMAT } = import.meta.env;
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [circular, setCircular] = useState([]);
  const [circularto, setCircularTo] = useState([]);
  const [formData, setFormData] = useState({
    CircularSentBy: "",
    Subject: "",
    DocumentNo: "",
    FromDate: new Date(),
    FromTime: new Date(),
    ToDate: new Date(),
    ToTime: new Date(),
    Description: "",
    DateType: "EntryDate",
    Status: "",
  });
  const getCircular = () => {
    let form = new FormData();
    form.append("ID", useCryptoLocalStorage("user_Data", "get", "ID")),
      form.append("Type", "To"),
      axios
        .post(apiUrls?.Circular_UserList, form, { headers })
        .then((res) => {
          const poc3s = res?.data.data.map((item) => {
            return { label: item?.RealName, value: item?.Id };
          });
          setCircular(poc3s);
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
  const handleSelectChange = (e) => {
    const { name, value, checked, type } = e?.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? (checked ? "1" : "0") : value,
    });
  };

  const searchHandleChange = (e) => {
    const { name, value } = e?.target;
    setFormData({ ...formData, [name]: value });
  };
  useEffect(() => {
    getCircular();
  }, []);
  function formatDate(dateString) {
    let date = new Date(dateString);
    let year = date.getFullYear();
    let month = (date.getMonth() + 1).toString().padStart(2, "0");
    let day = date.getDate().toString().padStart(2, "0");
    return `${year}/${month}/${day}`;
  }
  const handleCircularSearch = () => {
    if (formData?.DateType == "") {
      toast.error("Please Select DateType.");
    } else {
      setLoading(true);
      let form = new FormData();
      form.append("ID", useCryptoLocalStorage("user_Data", "get", "ID")),
        form.append("DateType", formData?.DateType),
        form.append("dtFrom", formatDate(formData?.FromDate)),
        form.append("dtTo", formatDate(formData?.ToDate)),
        form.append("CircularSentByID", formData?.CircularSentBy),
        form.append("Status", formData?.Status),
        axios
          .post(apiUrls?.Circular_Search, form, { headers })
          .then((res) => {
            setTableData(res?.data?.data);
            setLoading(false);
          })
          .catch((err) => {
            console.log(err);
            setLoading(false);
          });
    }
  };
  const shortenName = (name) => {
    return name.length > 90 ? name.substring(0, 95) + "..." : name;
  };

  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;
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
  const [visible, setVisible] = useState({
    showVisible: false,
    showCount: false,
    showUnCount: false,
    showData: {},
  });
  return (
    <>
      {visible?.showVisible && (
        <Modal
          modalWidth={"600px"}
          visible={visible}
          setVisible={setVisible}
          Header="View Message"
          showData={visible?.showData}
        >
          <ViewMessageCircular
            visible={visible}
            setVisible={setVisible}
            showData={visible?.showData}
          />
        </Modal>
      )}
      {visible?.showCount && (
        <Modal
          modalWidth={"350px"}
          visible={visible}
          setVisible={setVisible}
          Header="ReadByCount Details"
          showData={visible?.showData}
        >
          <CircularCountModal
            visible={visible}
            setVisible={setVisible}
            showData={visible?.showData}
          />
        </Modal>
      )}
      {visible?.showUnCount && (
        <Modal
          modalWidth={"350px"}
          visible={visible}
          setVisible={setVisible}
          Header="UnReadByCount Details"
          showData={visible?.showData}
        >
          <CircularUNCountModal
            visible={visible}
            setVisible={setVisible}
            showData={visible?.showData}
          />
        </Modal>
      )}
      <div className="card">
        <Heading
          title={"Circular Search"}
          secondTitle={
            <div style={{ fontWeight: "bold" }}>
              <Link to="/Circular">
                Create Circular
              </Link>
            </div>
          }
        />
        <div className="row m-2">
          <ReactSelect
            respclass="col-xl-2 col-md-4 col-sm-6 col-12"
            name="DateType"
            placeholderName="Date Type"
            dynamicOptions={[
              { label: "EntryDate", value: "EntryDate" },
              { label: "ValidDate", value: "ValidDate" },
            ]}
            handleChange={handleDeliveryChange}
            value={formData.DateType}
            requiredClassName={"required-fields"}
          />
          <DatePicker
            className="custom-calendar"
            id="FromDate"
            name="FromDate"
            lable="From Date"
            placeholder={VITE_DATE_FORMAT}
            value={formData?.FromDate}
            respclass="col-xl-2 col-md-4 col-sm-6 col-12"
            handleChange={searchHandleChange}
          />
          <DatePicker
            className="custom-calendar"
            id="ToDate"
            name="ToDate"
            lable="To Date"
            placeholder={VITE_DATE_FORMAT}
            value={formData?.ToDate}
            respclass="col-xl-2 col-md-4 col-sm-6 col-12"
            handleChange={searchHandleChange}
          />
          <ReactSelect
            respclass="col-xl-2 col-md-4 col-sm-6 col-12"
            name="CircularSentBy"
            placeholderName="Circular SentBy"
            dynamicOptions={circular}
            handleChange={handleDeliveryChange}
            value={formData.CircularSentBy}
            // requiredClassName={"required-fields"}
          />
          <ReactSelect
            respclass="col-xl-2 col-md-4 col-sm-6 col-12"
            name="Status"
            placeholderName="Status"
            dynamicOptions={[
              { label: "All", value: "All" },
              { label: "Active", value: "Active" },
              { label: "InActive", value: "InActive" },
            ]}
            handleChange={handleDeliveryChange}
            value={formData.Status}
            // requiredClassName={"required-fields"}
          />
          {loading ? (
            <Loading />
          ) : (
            <button
              className="btn btn-sm btn-primary"
              onClick={handleCircularSearch}
            >
              Search
            </button>
          )}
        </div>
      </div>

      {tableData?.length > 0 ? (
        <div className="card mt-2">
          <Heading title={"Search Details"} />
          <>
            <Tables
              thead={circularThead}
              tbody={currentData?.map((ele, index) => ({
                "S.No.": (currentPage - 1) * rowsPerPage + index + 1,
                CicualarSentBy: ele?.CreatedBy,
                DocumentNo: ele?.DocumentNo,
                Subject: ele?.Subject,
                Message: (
                  <button
                    className="btn btn-sm btn-primary"
                    // onClick={() => handleDisplayMessage(ele)}
                    onClick={() => {
                      setVisible({ showVisible: true, showData: ele?.Message });
                    }}
                  >
                    Message
                  </button>
                ),
                // Message: (
                //   <span
                //     id={`Message-${index}`}
                //     targrt={`Message-${index}`}
                //     title={ele?.Message}
                //   >
                //     {shortenName(ele?.Message)}
                //   </span>
                // ),
                "Entry Date": ele?.dtEntry,
                "Valid From": ele?.dtFrom,
                "Valid To": ele?.dtTo,
                TotalUserCount: ele?.TotalUserCount,
                ReadByCount: (
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <div>{ele?.ReadByCount}</div>
                    <div>
                      {
                        <i
                          className="fa fa-eye"
                          onClick={() => {
                            setVisible({ showCount: true, showData: ele });
                          }}
                        >
                          {" "}
                        </i>
                      }
                    </div>
                  </div>
                ),
                UnReadByCount: (
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <div>{ele?.UnReadByCount}</div>
                    <div>
                      {
                        <i
                          className="fa fa-eye"
                          onClick={() => {
                            setVisible({ showUnCount: true, showData: ele });
                          }}
                        >
                          {" "}
                        </i>
                      }
                    </div>
                  </div>
                ),
                Attachment: ele?.IsAttachment,
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
          </>
        </div>
      ) : (
        <NoRecordFound />
      )}
    </>
  );
};

export default CircularSearch;
