import React, { useEffect, useState } from "react";
import Heading from "../components/UI/Heading";
import DatePicker from "../components/formComponent/DatePicker";
import { axiosInstances } from "../networkServices/axiosInstance";
import { apiUrls } from "../networkServices/apiEndpoints";
import MultiSelectComp from "../components/formComponent/MultiSelectComp";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import Tables from "../components/UI/customTable";

const OverseasExpenseManagementSearch = () => {
  const [t] = useTranslation();
  const { VITE_DATE_FORMAT } = import.meta.env;
  const [assignto, setAssignedto] = useState([]);
  const [formData, setFormData] = useState({
    FromDate: new Date(),
    ToDate: new Date(),
    Employee: [],
  });
  const [tableData, setTableData] = useState([{ Month: "December" }]);
  const searchHandleChange = (e, index) => {
    const { name, value } = e?.target;
    setFormData({ ...formData, [name]: value });
  };
  const getAssignTo = () => {
    axiosInstances
      .post(apiUrls.AssignTo_Select, {
        ProjectID: 0,
      })
      .then((res) => {
        const assigntos = res?.data?.data?.map((item) => {
          return { name: item?.Name, code: item?.ID };
        });
        setAssignedto(assigntos);
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
  const overseasThead = [
    "S.No.",
    "Month",
    "Period",
    "Employee Name",
    "Employee Code",
    "Invoice No.",
    "Description",
    "Local Currency Symbol",
    "DR Local Currency Payment",
    "DR Local Conversion Rate",
    "DR Local Converted Dollar",
    "DR Local Conversion Rate INR",
    "DR Local Converted INR",
    "CR Local Currency Payment",
    "CR Local Conversion Rate",
    "CR Local Converted Dollar",
    "CR Local Conversion Rate INR",
    "CR Local Converted INR",
    "Closing Balance In Dollar",
    "Closing Balance In INR",
  ];
  useEffect(() => {
    getAssignTo();
  }, []);
  return (
    <>
      <div className="card">
        <Heading
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
          <MultiSelectComp
            respclass="col-xl-2 col-md-4 col-sm-6 col-12"
            name="AssignedTo"
            placeholderName={t("Employee")}
            dynamicOptions={assignto}
            handleChange={handleMultiSelectChange}
            value={
              Array.isArray(formData?.AssignedTo)
                ? formData.AssignedTo.map((code) => ({
                    code,
                    name: assignto.find((item) => item.code === code)?.name,
                  }))
                : []
            }
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
          <button
            className="btn btn-sm btn-primary ml-2 mt-0"
            // onClick={() => handleViewSearch()}
          >
            <i className="fa fa-search mr-1" aria-hidden="true"></i> Search
          </button>
        </div>
      </div>

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
                Month: ele?.Month,
                Period: ele?.tavling_from,
                "Employee Name": ele?.tavling_to,
                "Employee Code": ele?.traveling,
                "Invoice No.": ele?.InvoiceNo,
                Description: ele?.Description,
                "Local Currency Symbol": ele?.LocalCurrencySymbol,
                "DR Local Currency Payment": ele?.DrLocalCurrencyPayment,
                "DR Local Conversion Rate": ele?.DrLocalConversionRate,
                "DR Local Converted Dollar": ele?.DrLocalConvertedDollar,
                "DR Local Conversion Rate INR": ele?.DrLocalConversionRateINR,
                "DR Local Converted INR": ele?.DrLocalConvertedINR,
                "CR Local Currency Payment": ele?.CrLocalCurrencyPayment,
                "CR Local Conversion Rate": ele?.CrLocalConversionRate,
                "CR Local Converted Dollar": ele?.CrLocalConvertedDollar,
                "CR Local Conversion Rate INR": ele?.CrLocalConversionRateINR,
                "CR Local Converted INR": ele?.CrLocalConvertedINR,
                "Closing Balance In Dollar": ele?.ClosingBalanceInDollar,
                "Closing Balance In INR": ele?.ClosingBalanceInINR,
              }))}
              tableHeight={"tableHeight"}
            />
          </div>
        ) : (
          <span className="text-align-center text-black ">No Data Found</span>
        )}
      </div>
    </>
  );
};
export default OverseasExpenseManagementSearch;
