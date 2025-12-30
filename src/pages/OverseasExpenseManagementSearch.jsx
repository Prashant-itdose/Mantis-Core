import React, { useEffect, useState } from "react";
import Heading from "../components/UI/Heading";
import DatePicker from "../components/formComponent/DatePicker";
import { axiosInstances } from "../networkServices/axiosInstance";
import { apiUrls } from "../networkServices/apiEndpoints";
import MultiSelectComp from "../components/formComponent/MultiSelectComp";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import Tables from "../components/UI/customTable";
import Input from "../components/formComponent/Input";
import { useCryptoLocalStorage } from "../utils/hooks/useCryptoLocalStorage";
import { toast } from "react-toastify";
import moment from "moment";
import NoRecordFound from "../components/formComponent/NoRecordFound";
import Tooltip from "./Tooltip";
import Modal from "../components/modalComponent/Modal";
import OverseasExpenseModal from "./OverseasExpenseModal";
import Loading from "../components/loader/Loading";
import ReactSelect from "../components/formComponent/ReactSelect";

const OverseasExpenseManagementSearch = () => {
  const [loading, setLoading] = useState(false);
  const [t] = useTranslation();
  const { VITE_DATE_FORMAT } = import.meta.env;
  const [assignto, setAssignedto] = useState([]);
  const [formData, setFormData] = useState({
    FromDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
    ToDate: new Date(),
    Employee: [],
    InvoiceNo: "",
  });
  const [tableData, setTableData] = useState([]);
  const searchHandleChange = (e, index) => {
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
          return { label: item?.EmployeeName, value: item?.EmployeeCode };
        });
        setAssignedto(wings);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleMultiSelectChange = (name, selectedOptions) => {
    const selectedValues = selectedOptions.map((option) => option.code);
    setFormData((prev) => ({
      ...prev,
      [`${name}`]: selectedValues,
    }));
  };
  const handleSelectChange = (e) => {
    const { name, value, checked, type } = e?.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? (checked ? 1 : 0) : value,
    });
  };
  const shortenNamesummary = (name) => {
    return name?.length > 40 ? name?.substring(0, 35) + "..." : name;
  };
  const overseasThead = [
    "S.No.",
    "Month",
    "Date/Period",
    "Invoice No.",
    "Vendor Name",
    "Employee Code",
    "Employee Name",
    "Category",
    "Description",
    "Local Currency Symbol",

    "DR Local Currency Payment",
    // "DR Conversion Rate",
    // "DR Converted in Dollar ($)",
    // "DR Conversion Rate in INR (₹)",
    // "DR Converted in INR (₹)",

    "CR Dollar Currency Received",
    "CR Converted in Local Currency",
    "CR Local Currency Conversion Rate",
    "CR Conversion Rate in INR (₹)",
    "CR Converted in INR (₹)",

    "Local Currency Closing Balance",
    "Bill Amount Taxable Value INR (₹)",
    "Excel Print",
    "Invoice Print",
  ];

  const handleViewSearch = () => {
    setLoading(true);
    axiosInstances
      .post(apiUrls.SearchDollarExpense, {
        EmployeeCode: String(formData?.AssignedTo || ""),
        InvoiceNo: String(formData?.InvoiceNo || ""),
        FromDate: String(moment(formData?.FromDate).format("YYYY/MM/DD")),
        ToDate: String(moment(formData?.ToDate).format("YYYY/MM/DD")),
      })

      .then((res) => {
        if (res?.data?.success === true) {
          setTableData(res?.data?.data);
          setLoading(false);
        } else {
          toast.error("No Record Found.");
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const [visible, setVisible] = useState({
    attachVisible: false,
    showData: {},
  });

  useEffect(() => {
    getAssignTo();
  }, []);

  function downloadExcel() {
    const base64Data = tableData?.[0]?.File_Base64;
    const byteCharacters = atob(base64Data);
    const byteNumbers = Array.from(byteCharacters, (c) => c.charCodeAt(0));
    const blob = new Blob([new Uint8Array(byteNumbers)], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    const today = new Date().toLocaleDateString("en-GB").replace(/\//g, "-");
    a.download = `Dollar_Expense_${today}.xlsx`;

    a.click();
    window.URL.revokeObjectURL(url);
  }
  const ReportingManager = useCryptoLocalStorage(
    "user_Data",
    "get",
    "IsReportingManager"
  );

  const handleDeliveryChange = (name, e) => {
    const { value } = e;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const IsEmployee = useCryptoLocalStorage("user_Data", "get", "realname");
  const RoleID = Number(useCryptoLocalStorage("user_Data", "get", "RoleID"));
  return (
    <>
      {visible?.attachVisible && (
        <Modal
          modalWidth={"700px"}
          visible={visible}
          setVisible={setVisible}
          Header="Upload Invoice"
        >
          <OverseasExpenseModal
            visible={visible}
            setVisible={setVisible}
            handleViewSearch={handleViewSearch}
          />
        </Modal>
      )}
      <div className="card">
        <Heading
          isBreadcrumb={true}
          title={
            <span className="font-weight-bold">
              Overseas Expense Management Search
            </span>
          }
          secondTitle={
            <div className="font-weight-bold">
              <Link to="/OverseasExpenseManagement" className="ml-3">
                Overseas Expense Management
              </Link>
            </div>
          }
        />
        <div className="row m-2">
          {ReportingManager == 1 || RoleID === 4 ? (
            // <MultiSelectComp
            //   respclass="col-xl-2 col-md-4 col-sm-6 col-12"
            //   name="AssignedTo"
            //   placeholderName={t("Employee")}
            //   dynamicOptions={assignto}
            //   handleChange={handleMultiSelectChange}
            //   value={
            //     Array.isArray(formData?.AssignedTo)
            //       ? formData.AssignedTo.map((code) => ({
            //           code,
            //           name: assignto.find((item) => item.code === code)?.name,
            //         }))
            //       : []
            //   }
            // />
            <ReactSelect
              name="AssignedTo"
              respclass="col-xl-2 col-md-4 col-sm-6 col-12"
              placeholderName="Employee"
              dynamicOptions={assignto}
              value={formData?.AssignedTo}
              handleChange={handleDeliveryChange}
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
              // onChange={handleChange}
              disabled={true}
            />
          )}
          <Input
            type="text"
            className="form-control"
            id="InvoiceNo"
            name="InvoiceNo"
            lable="Invoice No."
            placeholder=" "
            onChange={handleSelectChange}
            value={formData?.InvoiceNo}
            respclass="col-xl-2 col-md-4 col-sm-4 col-12"
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
          {loading ? (
            <Loading />
          ) : (
            <button
              className="btn btn-sm btn-primary ml-2 mt-0"
              onClick={handleViewSearch}
            >
              <i className="fa fa-search mr-1" aria-hidden="true"></i> Search
            </button>
          )}
        </div>
      </div>
      {tableData?.length > 0 ? (
        <div className="card mt-2">
          <Heading
            title={<span className="font-weight-bold">Search Details</span>}
          />
          {tableData?.length > 0 ? (
            <div className="table-responsive">
              <Tables
                thead={overseasThead}
                tbody={tableData?.map((ele, index) => ({
                  "S.No.": index + 1,
                  Month:
                    [
                      "Jan",
                      "Feb",
                      "Mar",
                      "Apr",
                      "May",
                      "Jun",
                      "Jul",
                      "Aug",
                      "Sep",
                      "Oct",
                      "Nov",
                      "Dec",
                    ][ele?.MONTH.split("-")[1] - 1] +
                    "-" +
                    ele?.MONTH.split("-")[2].slice(-2),
                  "Date/Period": ele?.PERIOD,
                  "Invoice No.": ele?.Invoice_No,
                  "Vendor Name": ele?.Vendor_Name,
                  "Employee Code": ele?.Employee_Code,
                  "Employee Name": ele?.Employee_Name,
                  Category: ele?.Category,
                  Description: (
                    <Tooltip label={ele?.DESCRIPTION}>
                      <span
                        id={`DESCRIPTION-${index}`}
                        targrt={`DESCRIPTION-${index}`}
                        style={{ textAlign: "center" }}
                      >
                        {shortenNamesummary(ele?.DESCRIPTION)}
                      </span>
                    </Tooltip>
                  ),
                  "Local Currency Symbol": ele?.Local_Currency_Symbol,

                  "DR Local Currency Payment": ele?.Local_Currency_Payment,
                  // "DR Conversion Rate": ele?.Conversion_rate_Dollar,
                  // "DR Converted in Dollar ($)": ele?.Converted_in_Dollar,
                  // "DR Conversion Rate in INR (₹)": ele?.Conversion_rate_in_INR,
                  // "DR Converted in INR (₹)": ele?.Converted_in_INR,

                  "CR Dollar Currency Received": ele?.Local_Currency_Received,
                  "CR Converted in Local Currency":
                    ele?.Conversion_rate_Dollar_CR,
                  "CR Local Currency Conversion Rate":
                    ele?.Converted_in_Dollar_Dollar_CR,
                  "CR Conversion Rate in INR (₹)":
                    ele?.Conversion_rate_in_INR_CR,
                  "CR Converted in INR (₹)": ele?.Converted_in_INR_CR,

                  "Local Currency Closing Balance": ele?.Closing_Balance,
                  "Bill Amount Taxable Value INR (₹)": ele?.Bill_Amount_Value,
                  "Excel Print": ele?.File_Url !== null && (
                    <i
                      className="fa fa-print"
                      style={{
                        marginLeft: "5px",
                        cursor: "pointer",
                        color: "black",
                        padding: "2px",
                        borderRadius: "3px",
                      }}
                      title="Click here to Print."
                      onClick={() => downloadExcel()}
                    />
                  ),
                  "View & Upload": index === 0 && (
                    <>
                      <i
                        className="fa fa-eye ml-4"
                        onClick={() => {
                          setVisible({
                            attachVisible: true,
                            showData: ele,
                          });
                        }}
                        style={{
                          cursor: "pointer",
                          color: "black",
                          marginLeft: "2px",
                          color: "black",
                        }}
                        title="View & Upload Invoice"
                      ></i>
                    </>
                  ),
                }))}
                tableHeight={"tableHeight"}
              />
            </div>
          ) : (
            <span className="text-align-center text-black ">No Data Found</span>
          )}
        </div>
      ) : (
        <NoRecordFound />
      )}
    </>
  );
};
export default OverseasExpenseManagementSearch;
