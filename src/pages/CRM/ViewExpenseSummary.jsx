import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Heading from "../../components/UI/Heading";
import DatePickerMonth from "../../components/formComponent/DatePickerMonth";
import ReactSelect from "../../components/formComponent/ReactSelect";
import { useCryptoLocalStorage } from "../../utils/hooks/useCryptoLocalStorage";
import { axiosInstances } from "../../networkServices/axiosInstance";
import { apiUrls } from "../../networkServices/apiEndpoints";
import Loading from "../../components/loader/Loading";
import MultiSelectComp from "../../components/formComponent/MultiSelectComp";
import Tables from "../../components/UI/customTable";
import NoRecordFound from "../../components/formComponent/NoRecordFound";
import Input from "../../components/formComponent/Input";
import { toast } from "react-toastify";
import AmountSubmissionSeeMoreList from "../../networkServices/AmountSubmissionSeeMoreList";
import SlideScreen from "../SlideScreen";
import SeeMoreSlideScreen from "../../components/SearchableTable/SeeMoreSlideScreen";
import FirstMoreList from "../../networkServices/FirstMoreList";
import FirstSlideScreen from "../FirstSlideScreen";
import SeeMoreSlideScreenEye from "../../components/SearchableTable/SeeMoreSlideScreenEye";
const currentDate = new Date();
const currentMonth = currentDate.getMonth() + 1;
const currentYear = currentDate.getFullYear();
const ViewExpenseSummary = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [employee, setEmployee] = useState([]);
  const [reporter, setReporter] = useState([]);
  const [listVisible, setListVisible] = useState(false);
  const [formData, setFormData] = useState({
    Month: new Date(),
    Employee: [],
    ReportingTo: [],
    Year: "",
    currentMonth: currentMonth,
    currentYear: currentYear,
  });
  const [selected, setSelected] = React.useState("no");

  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 20;
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

  const handleRadioChange = (value) => {
    setSelected(value);
    if (value === "yes") {
      navigate("/ViewExpense");
    } else if (value === "no") {
      navigate("/ViewExpenseSummary");
    }
  };
  const ReportingManager = useCryptoLocalStorage(
    "user_Data",
    "get",
    "IsReportingManager"
  );

  const [renderComponent, setRenderComponent] = useState({
    name: "",
    component: null,
  });
  const ModalComponent = (name, component) => {
    setListVisible(true);
    setRenderComponent({
      name: String(name),
      component: component,
    });
  };
  const [seeMore, setSeeMore] = useState([]);
  const handleChangeComponent = (e) => {
    ModalComponent(e?.label, e?.component);
  };

  const normalizeString = (str) => str.toLowerCase().replace(/\s+/g, "").trim();
  const getReporter = () => {
    axiosInstances
      .post(apiUrls.GetReportingTo_Employee, {})

      .then((res) => {
        const reporters = res?.data.data.map((item) => {
          return { name: item?.NAME, code: item?.Employee_ID };
        });
        setReporter(reporters);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getEmployee = () => {
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
        setEmployee(wings);
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

  const handleSearch = () => {
    setLoading(true);
    axiosInstances
      .post(apiUrls.ExpenseSummary, {
        Month: Number(formData?.currentMonth),
        Year: Number(formData?.currentYear),
        ManagerIDs: String(formData?.ReportingTo || ""),
        EmployeeIDs: String(formData?.Employee || ""),
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
  useEffect(() => {
    getEmployee();
    getReporter();
  }, []);
  const searchTHEAD = [
    "S.No.",
    "Reporting Manager",
    "Employee Name",
    "Month/Year",
    "Active Amount",
    "Submitted Amount",
    "Rejected Amount",
    "Approved Amount",
    "Total Monthly Expense",
    "View",
  ];
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

  const [visible, setVisible] = useState({
    clickSearch: false,
    employeeSearch: false,
    showData: {},
  });

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
      {/* {visible?.clickSearch && (
        <Modal
          modalWidth={"1000px"}
          visible={visible}
          setVisible={setVisible}
          Header="Manager Team Expense Summary"
        >
          <ManagerExpenseModal visible={visible} setVisible={setVisible} />
        </Modal>
      )} */}
      {/* {visible?.employeeSearch && (
        <Modal
          modalWidth={"1200px"}
          visible={visible}
          setVisible={setVisible}
          Header="Expense Details Summary"
        >
          <ExpenseCalendar
            visible={visible}
            setVisible={setVisible}
          />
        </Modal>
      )} */}
      <div className="card">
        <Heading
          isBreadcrumb={true}
          title={<span className="font-weight-bold">View Expense Summary</span>}
          secondTitle={
            <>
              {ReportingManager == 1 && (
                <div
                  className="d-flex"
                  style={{ justifyContent: "space-between" }}
                >
                  <label>
                    <input
                      className="ml-1"
                      type="radio"
                      name="option"
                      value="yes"
                      checked={selected === "yes"}
                      onChange={() => handleRadioChange("yes")}
                      style={{ cursor: "pointer" }}
                    />
                    <span className="mb-2 ml-1">View Expense</span>
                  </label>

                  <label className="ml-4">
                    <input
                      className="ml-1"
                      type="radio"
                      name="option"
                      value="no"
                      checked={selected === "no"}
                      style={{ cursor: "pointer" }}
                      onChange={() => handleRadioChange("no")}
                    />
                    <span className="mb-2 ml-1">View Expense Summary</span>
                  </label>
                </div>
              )}
            </>
          }
        />
        <div className="row p-2">
          <MultiSelectComp
            respclass="col-xl-2 col-md-4 col-sm-6 col-12"
            name="ReportingTo"
            placeholderName="Reorting Manager"
            dynamicOptions={reporter}
            handleChange={handleMultiSelectChange}
            value={formData.ReportingTo.map((code) => ({
              code,
              name: reporter?.find((item) => item.code === code)?.name,
            }))}
          />
          <MultiSelectComp
            respclass="col-xl-2 col-md-4 col-sm-6 col-12"
            name="Employee"
            placeholderName="Employee"
            dynamicOptions={employee}
            handleChange={handleMultiSelectChange}
            value={formData.Employee.map((code) => ({
              code,
              name: employee?.find((item) => item.code === code)?.name,
            }))}
          />

          <DatePickerMonth
            // className="custom-calendar"
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

          {/* <i
            className="fa fa-eye mt-2 ml-4"
            title="Click to Manager Team Expense Summary."
            style={{ cursor: "pointer" }}
            onClick={() => {
              setVisible({
                clickSearch: true,
              });
            }}
          ></i> */}
          <span className="ml-4" title="Manager Wise Expense Details">
            <FirstMoreList
              ModalComponent={ModalComponent}
              isShowDropDown={false}
              setSeeMore={setSeeMore}
              data={""}
              setVisible={() => {
                setListVisible(false);
              }}
              handleBindFrameMenu={[
                {
                  FileName: "ManagerWise Total Expense Details",
                  URL: "ManagerExpenseModal",
                  FrameName: "ManagerExpenseModal",
                  Description: "ManagerExpenseModal",
                },
              ]}
              isShowPatient={true}
            />
          </span>
          <FirstSlideScreen
            visible={listVisible}
            setVisible={() => {
              setListVisible(false);
              setRenderComponent({
                name: null,
                component: null,
              });
            }}
            Header={
              <SeeMoreSlideScreenEye
                name={renderComponent?.name}
                seeMore={seeMore}
                handleChangeComponent={handleChangeComponent}
              />
            }
          >
            {renderComponent?.component}
          </FirstSlideScreen>
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
                        sum + Number(item.TotalMonthlyExpense ?? 0),
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
          <Tables
            thead={searchTHEAD}
            tbody={currentData?.map((ele, index) => ({
              "S.No.": (currentPage - 1) * rowsPerPage + index + 1,
              "Reporting Manager": ele?.ManagerName,
              "Employee Name": ele?.EmployeeName,
              "Month/Year": `${monthNames[ele.expense_month - 1]} - ${ele.expense_Year}`,
              "Active Amount": Number(
                ele?.TotalActiveAmount || 0
              ).toLocaleString("en-IN", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }),
              "Submitted Amount": Number(
                ele?.TotalSubmittedAmount || 0
              ).toLocaleString("en-IN", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }),
              "Rejected Amount": Number(
                ele?.TotalRejectedAmount || 0
              ).toLocaleString("en-IN", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }),
              "Approved Amount": Number(
                ele?.TotalApprovedAmount || 0
              ).toLocaleString("en-IN", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }),
              "Total Monthly Expense": Number(
                ele?.TotalMonthlyExpense || 0
              ).toLocaleString("en-IN", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }),
              View: (
                // <i
                //   className="fa fa-eye"
                //   onClick={() => {
                //     setVisible({
                //       employeeSearch: true,
                //      showData : ele,
                //     });
                //   }}
                // ></i>
                <AmountSubmissionSeeMoreList
                  ModalComponent={ModalComponent}
                  setSeeMore={setSeeMore}
                  isShowDropDown={false}
                  data={ele}
                  setVisible={() => {
                    setListVisible(false);
                  }}
                  handleBindFrameMenu={[
                    {
                      FileName: "ExpenseCalendar",
                      URL: "ExpenseCalendar",
                      FrameName: "ExpenseCalendar",
                      Description: "ExpenseCalendar",
                    },
                  ]}
                  isShowPatient={true}
                />
              ),
            }))}
            tableHeight={"tableHeight"}
          />
          <SlideScreen
            visible={listVisible}
            setVisible={() => {
              setListVisible(false);
              setRenderComponent({
                name: null,
                component: null,
              });
            }}
            Header={
              <SeeMoreSlideScreen
                name={renderComponent?.name}
                seeMore={seeMore}
                handleChangeComponent={handleChangeComponent}
              />
            }
          >
            {renderComponent?.component}
          </SlideScreen>
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
export default ViewExpenseSummary;
