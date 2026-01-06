import React, { useEffect, useState } from "react";
import { axiosInstances } from "../networkServices/axiosInstance";
import { apiUrls } from "../networkServices/apiEndpoints";
import DatePickerMonth from "../components/formComponent/DatePickerMonth";
import Loading from "../components/loader/Loading";
import Heading from "../components/UI/Heading";
import Tables from "../components/UI/customTable";
import NoRecordFound from "../components/formComponent/NoRecordFound";
import Input from "../components/formComponent/Input";
import TablesUpDown from "../components/UI/customTable/TablesUpDown";

const currentDate = new Date();
const currentMonth = currentDate.getMonth() + 1;
const currentYear = currentDate.getFullYear();
const ManagerExpenseModal = () => {
  const [formData, setFormData] = useState({
    Month: new Date(),
    currentMonth: currentMonth,
    currentYear: currentYear,
  });
  const normalizeString = (str) => str.toLowerCase().replace(/\s+/g, "").trim();
  const [loading, setLoading] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const searchTHEAD = [
    "S.No.",
    "Reporting Manager",
    "Month/Year",
    "Active Amount",
    "Submitted Amount",
    "Rejected Amount",
    "Approved Amount",
    "Total Monthly Expense",
  ];
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 20;
  const totalPages = Math?.ceil(tableData?.length / rowsPerPage);
  const currentData = tableData?.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );
  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleSearch = () => {
    setLoading(true);
    axiosInstances
      .post(apiUrls.GetManagerMonthlyExpenseSummary, {
        Month: Number(formData?.currentMonth),
        Year: Number(formData?.currentYear),
      })

      .then((res) => {
        if (res.data.success === true) {
          setTableData(res.data.data);
          setFilteredData(res.data.data);
          setLoading(false);
        } else {
          toast.error("No record found.");
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };
  const handleMonthYearChange = (name, e) => {
    const { value } = e.target;
    const date = new Date(value);
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      currentMonth: date.getMonth() + 1,
      currentYear: date.getFullYear(),
    }));
    setTableData([]);
  };

  const handleSearchTable = (event) => {
    const rawQuery = event.target.value;
    const query = normalizeString(rawQuery);
    setSearchQuery(rawQuery);
    if (query === "") {
      setTableData(filteredData);
      setCurrentPage(1);
      return;
    }
    const filtered = filteredData?.filter((item) =>
      Object.keys(item).some(
        (key) => item[key] && normalizeString(String(item[key])).includes(query)
      )
    );
    if (filtered.length === 0) {
      setSearchQuery("");
      setTableData(filteredData);
    } else {
      setTableData(filtered);
    }
    setCurrentPage(1);
  };

  useEffect(() => {
    handleSearch();
  }, []);
  const monthNames = [
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
  ];
  return (
    <>
      <div className="card">
        <div className="row p-2">
          <span className="font-weight-bold ml-2">
            Manager Wise Expense Details
          </span>
        </div>
      </div>
      <div className="card">
        <div className="row p-2">
          <DatePickerMonth
            id="Month"
            name="Month"
            lable="Month/Year"
            placeholder={"MM/YY"}
            respclass="col-xl-2 col-md-4 col-sm-6 col-12"
            value={formData?.Month}
            handleChange={(e) => handleMonthYearChange("Month", e)}
          />
          {loading ? (
            <Loading />
          ) : (
            <button className="btn btn-sm btn-info" onClick={handleSearch}>
              Search
            </button>
          )}
        </div>
      </div>
      {tableData?.length > 0 ? (
        <div className="card">
          <Heading
            title={<span className="font-weight-bold">Search Details</span>}
            secondTitle={
              <div className="d-flex">
                <div style={{ padding: "0px !important", marginLeft: "10px" }}>
                  <Input
                    type="text"
                    className="form-control"
                    id="Title"
                    name="Title"
                    lable="Search"
                    placeholder=" "
                    onChange={handleSearchTable}
                    value={searchQuery}
                    respclass="col-xl-12 col-md-4 col-sm-6 col-12"
                  />
                </div>

                <span className="font-weight-bold mr-4">
                  Total Record :&nbsp; {tableData?.length}
                </span>
                <span className="font-weight-bold mr-3">
                  Total Amount :&nbsp;{" "}
                  {Number(
                    tableData?.reduce(
                      (sum, item) =>
                        sum + Number(item.ManagerTotalMonthlyExpense ?? 0),
                      0
                    ) ?? 0
                  ).toLocaleString("en-IN", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </span>
              </div>
            }
          />
          <TablesUpDown
            thead={searchTHEAD}
            tbody={currentData?.map((ele, index) => ({
              "S.No.": (currentPage - 1) * rowsPerPage + index + 1,
              "Reporting Manager": ele?.ManagerName,
              "Month/Year": `${monthNames[ele.expense_month - 1]} - ${ele.expense_Year}`,
              "Active Amount": Number(
                ele?.ManagerTotalActiveAmount || 0
              ).toLocaleString("en-IN", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }),
              "Submitted Amount": Number(
                ele?.ManagerTotalSubmittedAmount || 0
              ).toLocaleString("en-IN", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }),
              "Rejected Amount": Number(
                ele?.ManagerTotalRejectedAmount || 0
              ).toLocaleString("en-IN", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }),
              "Approved Amount": Number(
                ele?.ManagerTotalApprovedAmount || 0
              ).toLocaleString("en-IN", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }),
              "Total Monthly Expense": Number(
                ele?.ManagerTotalMonthlyExpense || 0
              ).toLocaleString("en-IN", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }),
            }))}
            tableHeight={"tableHeight"}
          />
          <div
            className="pagination"
            style={{ marginLeft: "auto", marginBottom: "9px" }}
          >
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
      ) : (
        <NoRecordFound />
      )}
    </>
  );
};
export default ManagerExpenseModal;
