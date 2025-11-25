import React, { useEffect, useState } from "react";
import NoRecordFound from "../components/formComponent/NoRecordFound";
import Tooltip from "./Tooltip";
import Tables from "../components/UI/customTable";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { apiUrls } from "../networkServices/apiEndpoints";
import { toast } from "react-toastify";
import Heading from "../components/UI/Heading";
import { headers } from "../utils/apitools";
import { Link } from "react-router-dom";
import ReactSelect from "../components/formComponent/ReactSelect";
import Loading from "../components/loader/Loading";
import { useCryptoLocalStorage } from "../utils/hooks/useCryptoLocalStorage";
import MorningWishContentModal from "./MorningWishContentModal";
import Modal from "../components/modalComponent/Modal";
import Input from "../components/formComponent/Input";
import DatePicker from "../components/formComponent/DatePicker";

const FestivalWishSearch = () => {
  const { VITE_DATE_FORMAT } = import.meta.env;
  const [t] = useTranslation();
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [assignto, setAssignedto] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [formData, setFormData] = useState({
    SelectDate: "0",
    FestivalDate: "",
    FestivalName: "",
  });

  const morningThead = [
    "S.No.",
    "Festival Name",
    "Festival Date",
    { name: "Content", width: "21%" },
    "Image",
    // "Upload By",
    // "Upload Date",
    "Edit",
    "Remove",
  ];

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
  const IsEmployee = useCryptoLocalStorage("user_Data", "get", "realname");
  const CRMID = useCryptoLocalStorage("user_Data", "get", "CrmEmployeeID");
  const ReportingManager = useCryptoLocalStorage(
    "user_Data",
    "get",
    "IsReportingManager"
  );
  const handleSearch = () => {
    setLoading(true);
  
    axiosInstances
      .post(apiUrls.FestivalWishSearch, {
        FestivalName: formData?.FestivalName,
        FestivalDate: formData?.FestivalDate,
      })
      .then((res) => {
        if (res?.data?.success === true) {
          setTableData(res?.data?.data);
          setLoading(false);
        } else {
          toast.error(res?.data?.message);
          setTableData([]);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleRemove = (ele) => {
    setLoading(true);
    axiosInstances
      .post(apiUrls.RemoveFestivalWish, {
        WishID: Number(ele?.ID),
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
      });
  };
  const shortenName = (name) => {
    return name?.length > 55 ? name?.substring(0, 65) + "..." : name;
  };

  const searchHandleChange = (e) => {
    const { name, value, checked, type } = e?.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? (checked ? "1" : "0") : value,
    });
  };

  const [selectedImageUrl, setSelectedImageUrl] = useState(null);

  const [visible, setVisible] = useState({
    showVisible: false,
  });
  return (
    <>
      {visible?.showVisible && (
        <Modal
          modalWidth={"600px"}
          visible={visible}
          setVisible={setVisible}
          Header="Content Details"
        >
          <MorningWishContentModal visible={visible} setVisible={setVisible} />
        </Modal>
      )}
      <div className="card">
        <Heading
          title={
            <span style={{ fontWeight: "bold" }}>Wishes Search Details</span>
          }
          secondTitle={
            <div style={{ fontWeight: "bold" }}>
              <Link to="/FestivalWish" className="ml-3">
                Create Festival Wish
              </Link>
            </div>
          }
        />
        <div className="row p-2">
          <Input
            type="text"
            className="form-control"
            id="FestivalName"
            name="FestivalName"
            lable="Festival Name"
            onChange={searchHandleChange}
            value={formData?.FestivalName}
            respclass="col-xl-2 col-md-4 col-12 col-sm-12"
          />

          <DatePicker
            className="custom-calendar"
            id="FestivalDate"
            name="FestivalDate"
            lable={t("Festival Date")}
            placeholder={VITE_DATE_FORMAT}
            value={formData?.FestivalDate}
            respclass="col-xl-2 col-md-4 col-sm-6 col-12"
            handleChange={searchHandleChange}
          />
          {loading ? (
            <Loading />
          ) : (
            <button
              className="btn btn-sm btn-success ml-2"
              onClick={handleSearch}
            >
              Search
            </button>
          )}
        </div>
      </div>
      {tableData?.length > 0 ? (
        <div className="card mt-2">
          <Heading
            title={<span style={{ fontWeight: "bold" }}>Search Details</span>}
          />
          <Tables
            thead={morningThead}
            tbody={currentData?.map((ele, index) => ({
              "S.No.": (currentPage - 1) * rowsPerPage + index + 1,
              "Festival Name": ele?.FestivalName,
              "Festival Date": ele?.FestivalDate,
              Content: (
                <>
                  {ele?.Content != 0 ? (
                    ""
                  ) : (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <Tooltip>
                        <span
                          id={`Content-${index}`}
                          targrt={`Content-${index}`}
                          style={{ textAlign: "center" }}
                        >
                          {shortenName(ele?.Content)}
                        </span>
                      </Tooltip>

                      <i
                        className="fa fa-eye"
                        onClick={() => {
                          setVisible({
                            showVisible: true,
                            showData: ele,
                            ele,
                          });
                        }}
                      ></i>
                    </div>
                  )}
                </>
              ),
              Image: (
                <>
                  {ele?.DocumentUrl && (
                    <i
                      className="fa fa-eye"
                      style={{
                        marginLeft: "5px",
                        cursor: "pointer",
                        color: "white",
                        border: "1px solid grey",
                        padding: "2px",
                        background: "black",
                        borderRadius: "3px",
                      }}
                      onClick={() => {
                        setSelectedImageUrl(ele?.DocumentUrl);
                        setIsModalOpen(true);
                      }}
                    ></i>
                  )}

                  {/* Modal */}
                  {isModalOpen && selectedImageUrl && (
                    <div
                      style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        width: "100vw",
                        height: "100vh",
                        backgroundColor: "rgba(0,0,0,0.6)",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        zIndex: 1000,
                        overflowY: "auto",
                      }}
                    >
                      <div
                        style={{
                          background: "white",
                          width: "500px",
                          height: "auto",
                          position: "relative",
                          padding: "10px",
                          borderRadius: "8px",
                          border: "2px solid grey",
                          maxHeight: "90vh",
                          overflow: "auto",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                        }}
                      >
                        {/* Close button */}
                        <div
                          style={{
                            width: "100%",
                            display: "flex",
                            justifyContent: "flex-end",
                          }}
                        >
                          <button
                            onClick={() => {
                              setIsModalOpen(false);
                              setSelectedImageUrl(null);
                            }}
                            style={{
                              padding: "5px 10px",
                              backgroundColor: "#dc3545",
                              color: "#fff",
                              border: "none",
                              borderRadius: "4px",
                              cursor: "pointer",
                              marginBottom: "10px",
                            }}
                          >
                            X
                          </button>
                        </div>

                        <img
                          src={selectedImageUrl}
                          alt="Document"
                          style={{
                            width: "100%",
                            height: "auto",
                            borderRadius: "5px",
                          }}
                        />
                      </div>
                    </div>
                  )}
                </>
              ),
              // "Upload By": ele?.UploadBy,
              // "Upload Date":
              //   ele.UpdatedDate == null
              //     ? ""
              //     : new Date(ele.UpdatedDate).toLocaleDateString("en-GB", {
              //         day: "2-digit",
              //         month: "short",
              //         year: "numeric",
              //       }),

              Edit: (
                <Link
                  to="/FestivalWish"
                  state={{ data: ele?.ID, edit: true, givenData: ele }}
                  style={{ cursor: "pointer" }}
                >
                  Edit
                </Link>
              ),
              Remove: (
                <i
                  className="fa fa-times"
                  style={{ color: "red", cursor: "pointer" }}
                  onClick={() => handleRemove(ele)}
                  title="Click to Remove"
                ></i>
              ),
              colorcode: ele?.RowColor,
            }))}
            tableHeight={"tableHeight"}
          />
          <div className="pagination ml-auto ">
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
      ) : (
        <NoRecordFound />
      )}
    </>
  );
};

export default FestivalWishSearch;
