import React, { useEffect, useState } from "react";
import Heading from "../components/UI/Heading";
import ReactSelect from "../components/formComponent/ReactSelect";
import DatePicker from "../components/formComponent/DatePicker";
import { axiosInstances } from "../networkServices/axiosInstance";
import { apiUrls } from "../networkServices/apiEndpoints";
import { useTranslation } from "react-i18next";
import Tables from "../components/UI/customTable";
import { Link } from "react-router-dom";
import { useCryptoLocalStorage } from "../utils/hooks/useCryptoLocalStorage";
import NoRecordFound from "../components/formComponent/NoRecordFound";
import Modal from "../components/modalComponent/Modal";
import OverseasFlyApprove from "./OverseasFlyApprove";
import OverseasFlyReject from "./OverseasFlyReject";
import MultiSelectComp from "../components/formComponent/MultiSelectComp";
import moment from "moment";
import Loading from "../components/loader/Loading";
import Input from "../components/formComponent/Input";

const OverseasFlySearch = () => {
  const [t] = useTranslation();
  const ReportingManager = useCryptoLocalStorage(
    "user_Data",
    "get",
    "IsReportingManager"
  );
  const IsEmployee = useCryptoLocalStorage("user_Data", "get", "realname");
  const [country, setCountry] = useState([]);
  const [loading, setLoading] = useState(false);
  const { VITE_DATE_FORMAT } = import.meta.env;
  const [formData, setFormData] = useState({
    Employee: [],
    FromDate: "",
    ToDate: "",
    Country: [],
    Status: "3",
  });
  const [tableData, setTableData] = useState([]);
  const [assignto, setAssignedto] = useState([]);
  const getAssignTo = () => {
    axiosInstances;
    axiosInstances
      .post(apiUrls.EmployeeBind, {
        CrmEmployeeID: Number(
          useCryptoLocalStorage("user_Data", "get", "CrmEmployeeID")
        ),
        RoleID: Number(useCryptoLocalStorage("user_Data", "get", "RoleID")),
      })

      .then((res) => {
        const wings = res?.data?.data?.map((item) => {
          return { name: item?.EmployeeName, code: item?.Employee_ID };
        });
        setAssignedto(wings);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getCountry = () => {
    axiosInstances
      .post(apiUrls?.GetCountry, {})
      .then((res) => {
        const countrys = res?.data?.data?.map((item) => {
          return { name: item?.NAME, code: item?.CountryID };
        });
        setCountry(countrys);
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
  const searchHandleChange = (e) => {
    const { name, value } = e?.target;
    setFormData({ ...formData, [name]: value });
  };
  const flyTHEAD = [
    "S.No.",
    "Name",
    "Country",
    "From",
    "To",
    "Remark",
    "Status",
    { name: "Action", width: "6%" },
  ];
  const [visible, setVisible] = useState({
    approveVisible: false,
    rejectVisible: false,
    showData: {},
  });
  const handleMultiSelectChange = (name, selectedOptions) => {
    const selectedValues = selectedOptions.map((option) => option.code);
    setFormData((prev) => ({
      ...prev,
      [`${name}`]: selectedValues,
    }));
  };
  const handleSearch = () => {
    setLoading(true);
    axiosInstances
      .post(apiUrls?.SearchOverseasTravel, {
        EmployeeID:
          ReportingManager == 1
            ? String(formData?.Employee)
            : String(
                useCryptoLocalStorage("user_Data", "get", "CrmEmployeeID")
              ),
        CountryID: String(formData?.Country) || "",
        Status: Number(formData?.Status),
        FromDate: String(moment(formData?.FromDate).format("YYYY-MM-DD")),
        ToDate: String(moment(formData?.ToDate).format("YYYY-MM-DD")),
      })
      .then((res) => {
        if (res.data.success === true) {
          setTableData(res.data.data);
          setLoading(false);
        } else {
          toast.error(res.data.message);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getAssignTo();
    getCountry();
    handleSearch();
  }, []);

  return (
    <>
      {visible?.approveVisible && (
        <Modal
          modalWidth={"600px"}
          visible={visible}
          setVisible={setVisible}
          Header="Approve Details"
        >
          <OverseasFlyApprove
            visible={visible}
            setVisible={setVisible}
            edit={true}
            handleSearch={handleSearch}
          />
        </Modal>
      )}
      {visible?.rejectVisible && (
        <Modal
          modalWidth={"600px"}
          visible={visible}
          setVisible={setVisible}
          Header="Reject Details"
        >
          <OverseasFlyReject
            visible={visible}
            setVisible={setVisible}
            edit={true}
            handleSearch={handleSearch}
          />
        </Modal>
      )}
      <div className="card">
        <Heading
          title={
            <span className="font-weight-bold">
              Overseas Travel Approval Search
            </span>
          }
          secondTitle={
            <div style={{ fontWeight: "bold" }}>
              <Link to="/OverseasFly" className="ml-3">
                Overseas Business Travel
              </Link>
            </div>
          }
        />
        <div className="row p-2">
          {ReportingManager == 1 ? (
            <MultiSelectComp
              respclass="col-xl-2 col-md-4 col-sm-6 col-12"
              name="Employee"
              placeholderName={t("Employee")}
              dynamicOptions={assignto}
              optionLabel="Employee"
              className="Employee"
              handleChange={handleMultiSelectChange}
              value={
                Array.isArray(formData?.Employee)
                  ? formData.Employee.map((code) => ({
                      code,
                      name: assignto.find((item) => item.code === code)?.name,
                    }))
                  : []
              }
            />
          ) : (
            <Input
              type="text"
              respclass="col-xl-2 col-md-4 col-sm-6 col-12"
              className="form-control"
              placeholder=" "
              lable="Employee"
              id="Employee"
              name="Employee"
              value={IsEmployee}
              disabled={true}
            />
          )}
          <MultiSelectComp
            respclass="col-xl-2 col-md-4 col-sm-6 col-12"
            name="Country"
            placeholderName={t("Country")}
            dynamicOptions={country}
            optionLabel="Country"
            className="Country"
            handleChange={handleMultiSelectChange}
            value={
              Array.isArray(formData?.Country)
                ? formData.Country.map((code) => ({
                    code,
                    name: country.find((item) => item.code === code)?.name,
                  }))
                : []
            }
          />
          <DatePicker
            className="custom-calendar"
            id="FromDate"
            name="FromDate"
            lable={t("From Date")}
            placeholder={VITE_DATE_FORMAT}
            value={formData?.FromDate}
            respclass="col-xl-2 col-md-4 col-sm-6 col-12"
            handleChange={searchHandleChange}
            requiredClassName={"required-fields"}
          />
          <DatePicker
            className="custom-calendar"
            id="ToDate"
            name="ToDate"
            lable={t("To Date")}
            placeholder={VITE_DATE_FORMAT}
            value={formData?.ToDate}
            respclass="col-xl-2 col-md-4 col-sm-6 col-12"
            handleChange={searchHandleChange}
          />
          <ReactSelect
            name="Status"
            respclass="col-xl-2 col-md-4 col-sm-6 col-12"
            placeholderName="Status"
            dynamicOptions={[
              { label: "All", value: "3" },
              { label: "Approve", value: "1" },
              { label: "Reject", value: "2" },
              { label: "Pending", value: "0" },
            ]}
            value={formData?.Status}
            handleChange={handleDeliveryChange}
          />
          {loading ? (
            <Loading />
          ) : (
            <button
              className="btn btn-sm btn-success ml-3"
              onClick={handleSearch}
            >
              Search
            </button>
          )}
        </div>
      </div>
      <div className="card mt-2">
        <Heading
          title={<span className="font-weight-bold">Search Details</span>}
          secondTitle={
            tableData?.length > 0 && (
              <div className="d-flex">
                <div className="d-flex flex-wrap align-items-center">
                  <div
                    className="d-flex "
                    style={{
                      justifyContent: "flex-start",
                      alignItems: "center",
                    }}
                  >
                    <div
                      className="legendcircleExpense"
                      style={{
                        backgroundColor: "green",
                        // cursor: "pointer",
                        width: "16px",
                        height: "16px",
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "white",
                        fontWeight: "bold",
                        marginLeft: "5px",
                      }}
                    >
                      A
                    </div>
                    <span
                      style={{
                        color: "green",
                        fontWeight: "bold",
                        marginLeft: "4px",
                      }}
                    >
                      Approve
                    </span>
                  </div>

                  <div
                    className="d-flex "
                    style={{
                      justifyContent: "flex-start",
                      alignItems: "center",
                    }}
                  >
                    <div
                      className="legendcircleExpense"
                      style={{
                        backgroundColor: "red",
                        // cursor: "pointer",
                        width: "16px",
                        height: "16px",
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "white",
                        fontWeight: "bold",
                        marginLeft: "5px",
                      }}
                    >
                      R
                    </div>
                    <span
                      style={{
                        color: "red",
                        fontWeight: "bold",
                        marginLeft: "4px",
                      }}
                    >
                      Reject
                    </span>
                  </div>
                </div>

                <span style={{ fontWeight: "bold", marginLeft: "10px" }}>
                  Total Record :&nbsp;{tableData?.length}
                </span>
              </div>
            )
          }
        />
        {tableData?.length > 0 ? (
          <div>
            <Tables
              thead={flyTHEAD}
              tbody={tableData?.map((ele, index) => ({
                "S.No.": index + 1,
                Name: ele?.EmployeeName,
                Country: ele?.CountryName,
                From: ele?.FromDate,
                To: ele?.ToDate,
                Remark: ele?.Remarks,
                Status: ele?.StatusText,
                Action:
                  ele?.STATUS == 0 ? (
                    ele?.EmployeeID ===
                    useCryptoLocalStorage(
                      "user_Data",
                      "get",
                      "CrmEmployeeID"
                    ) ? (
                      ""
                    ) : (
                      <div className="d-flex">
                        <span
                          style={{
                            color: "white",
                            fontWeight: "bold",
                            border: "1px solid green",
                            width: "20px",
                            height: "20px",
                            background: "green",
                            borderRadius: "50%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            textDecoration: "none",
                            cursor: "pointer",
                          }}
                          onClick={() => {
                            setVisible({ approveVisible: true, showData: ele });
                          }}
                          title={"Click to Reject"}
                          className="ml-2"
                        >
                          A
                        </span>
                        <span
                          style={{
                            color: "white",
                            fontWeight: "bold",
                            border: "1px solid red",
                            width: "20px",
                            height: "20px",
                            background: "red",
                            borderRadius: "50%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            textDecoration: "none",
                            cursor: "pointer",
                          }}
                          onClick={() => {
                            setVisible({ rejectVisible: true, showData: ele });
                          }}
                          title={"Click to Reject"}
                          className="ml-3"
                        >
                          R
                        </span>
                      </div>
                    )
                  ) : (
                    ""
                  ),
              }))}
              tableHeight={"tableHeight"}
            />
          </div>
        ) : (
          <NoRecordFound />
        )}
      </div>
    </>
  );
};
export default OverseasFlySearch;
