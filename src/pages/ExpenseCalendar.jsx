import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { FaClock, FaRupeeSign, FaReceipt } from "react-icons/fa";
import { axiosInstances } from "../networkServices/axiosInstance";
import { apiUrls } from "../networkServices/apiEndpoints";
import ManagerExpenseTotalDetails from "./CRM/ManagerExpenseTotalDetails";
import Modal from "../components/modalComponent/Modal";
import Loading from "../components/loader/Loading";

const ExpenseCalendar = ({ data }) => {
  console.log("ExpenseCalendar", data);

  const [loading, setLoading] = useState(false);
  const [expenseData, setExpenseData] = useState([]);
  const [daysInMonth, setDaysInMonth] = useState([]);
  const [startDayOfWeek, setStartDayOfWeek] = useState(0);

  useEffect(() => {
    const getDaysInMonth = (year, month) => {
      return new Array(new Date(year, month, 0).getDate())
        .fill(null)
        .map((_, index) => ({
          date: `${month}/${index + 1}`,
          dayOfMonth: index + 1,
        }));
    };

    const getStartDayOfWeek = (year, month) =>
      new Date(year, month - 1, 1).getDay();

    const updatedDays = getDaysInMonth(
      data?.expense_Year,
      data?.expense_month + 1
    );
    const startDay = getStartDayOfWeek(
      data?.expense_Year,
      data?.expense_month + 1
    );
    setDaysInMonth(updatedDays);
    setStartDayOfWeek(startDay);
  }, []);

  const handleSearch = () => {
    setLoading(true);
    axiosInstances
      .post(apiUrls.GetEmployeeExpenseCalendar, {
        EmployeeID: Number(data?.EmpID),
        Month: Number(data?.expense_month),
        Year: Number(data?.expense_Year),
      })
      .then((res) => {
        if (res.data.success === true) {
          setExpenseData(res.data.data);
          setLoading(false);
        } else {
          toast.error("No record found.");
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error fetching expense data");
        setLoading(false);
      });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Approved":
        return "#4CAF50"; // Green
      case "Submitted":
        return "#2196F3"; // Blue
      case "Rejected":
        return "#F44336"; // Red
      case "Active":
        return "#f1e131ff"; // Gray
      case "No Expense":
        return "#9E9E9E"; // Gray
      default:
        return "#757575"; // Default gray
    }
  };

  const RenderDay = ({ day, index }) => {
    const { date, dayOfMonth } = day;

    // Find expense data for this specific day
    const expenseForDay = expenseData?.find(
      (item) => item.DAYOFMONTH === dayOfMonth
    );

    const hasExpense = expenseForDay && expenseForDay.ExpenseCount > 0;
    const dailyTotal = expenseForDay?.DailyTotal || 0;
    const expenseCount = expenseForDay?.ExpenseCount || 0;
    const status = expenseForDay?.STATUS || "No Expense";
    const expenseReportIds = expenseForDay?.expense_report_IDs;

    // Format amount with commas
    const formattedAmount = new Intl.NumberFormat("en-IN").format(dailyTotal);

    const styles = {
      container: {
        cursor: hasExpense ? "pointer" : "default",
        width: "100px",
        height: "120px",
        padding: "5px",
        position: "relative",
        border: "1px solid #e0e0e0",
        textAlign: "center",
        background: "#fff",
        transition: "all 0.3s ease",
        borderRadius: "4px",
      },
      dateText: {
        fontWeight: "bold",
        fontSize: "12px",
        marginBottom: "5px",
        color: "#333",
      },
      amountContainer: {
        backgroundColor: hasExpense ? "#f5f5f5" : "#fafafa",
        borderRadius: "4px",
        padding: "4px",
        marginBottom: "4px",
        minHeight: "30px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      },
      amountText: {
        fontWeight: "600",
        fontSize: "10px",
        color: hasExpense ? "#2196F3" : "#999",
        display: "flex",
        alignItems: "center",
        gap: "3px",
      },
      badge: (bgColor, textColor) => ({
        backgroundColor: bgColor,
        color: textColor,
        fontWeight: "500",
        fontSize: "9px",
        borderRadius: "10px",
        padding: "3px 6px",
        display: "inline-block",
        textAlign: "center",
        marginTop: "3px",
        width: "100%",
      }),
      statusIndicator: {
        position: "absolute",
        top: "2px",
        right: "2px",
        width: "8px",
        height: "8px",
        borderRadius: "50%",
        backgroundColor: getStatusColor(status),
      },
      expenseCountBadge: {
        position: "absolute",
        top: "2px",
        left: "2px",
        backgroundColor: "white",
        // backgroundColor: "#FF9800",
        color: "white",
        fontSize: "8px",
        borderRadius: "50%",
        width: "16px",
        height: "16px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: "bold",
      },
    };

    const handleDayClick = () => {
      if (hasExpense) {
        console.log("Expense details for day:", dayOfMonth, expenseForDay);
      }
    };
    const [visible, setVisible] = useState({
      clickSearch: false,
      showData: {},
    });
    return (
      <>
        {visible?.clickSearch && (
          <Modal
            modalWidth={"700px"}
            visible={visible}
            setVisible={setVisible}
            Header="Expense Details"
          >
            <ManagerExpenseTotalDetails
              visible={visible}
              setVisible={setVisible}
            />
          </Modal>
        )}

        <td
          key={index}
          className="expense-day"
          style={styles.container}
          //   onClick={handleDayClick}
          onClick={() => {
            if (hasExpense) {
              setVisible({
                clickSearch: true,
                showData: expenseReportIds,
              });
            } else {
              setVisible({
                clickSearch: false,
              });
            }
          }}
          aria-disabled={!hasExpense}
        >
          {/* Status indicator dot */}
          {hasExpense && (
            <div style={styles.statusIndicator} title={status}></div>
          )}

          {/* Expense count badge */}
          {hasExpense && expenseCount > 0 && (
            <div
              style={styles.expenseCountBadge}
              title={`${expenseCount} expense${expenseCount > 1 ? "s" : ""}`}
            >
              {expenseCount}
            </div>
          )}

          {/* Date */}
          <div style={styles.dateText}>{dayOfMonth}</div>

          {/* Amount */}
          <div style={styles.amountContainer}>
            <div style={styles.amountText}>
              <FaRupeeSign size={8} />{" "}
              {hasExpense ? formattedAmount : "No Expense"}
            </div>
          </div>

          {/* Status badge */}
          <div
            style={styles.badge(
              hasExpense ? getStatusColor(status) : "#e0e0e0",
              hasExpense ? "#fff" : "#666"
            )}
            title={`Status: ${status}`}
          >
            {status}
          </div>

          {/* Report IDs (hidden by default, show on hover if needed) */}
          {hasExpense && expenseReportIds !== "0" && (
            <div
              style={{
                fontSize: "7px",
                color: "#666",
                marginTop: "2px",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
              title={`Report IDs: ${expenseReportIds}`}
            >
              ID: {expenseReportIds}
            </div>
          )}
        </td>
      </>
    );
  };

  useEffect(() => {
    handleSearch();
  }, []);

  const renderCalendarRows = () => {
    const weeks = [];
    let currentWeek = new Array(startDayOfWeek).fill(null);

    daysInMonth.forEach((day) => {
      if (currentWeek.length === 7) {
        weeks.push(currentWeek);
        currentWeek = [];
      }
      currentWeek.push(day);
    });

    if (currentWeek.length > 0) {
      weeks.push([
        ...currentWeek,
        ...new Array(7 - currentWeek.length).fill(null),
      ]);
    }

    return weeks.map((week, index) => (
      <tr key={index}>
        {week.map((day, i) =>
          day ? (
            <RenderDay day={day} key={i} index={i} />
          ) : (
            <td
              key={i}
              className="empty-day"
              style={{
                width: "100px",
                height: "120px",
                border: "1px solid #f0f0f0",
                background: "#f9f9f9",
              }}
            ></td>
          )
        )}
      </tr>
    ));
  };
  const dateString = expenseData?.[0]?.CalendarDate;
  const date = new Date(dateString);
  const month = date?.toLocaleString("default", { month: "long" });
  const year = date?.getFullYear();
  const displayDate = `${month} ${year}`;

  return (
    <>
      <div className="card">
        <div className="card-header">
          <h5 className="m-1 font-weight-bold">
            Expense Calendar - {data?.EmployeeName || ""} &nbsp; ({displayDate})
          </h5>
        </div>
        <div className="card-body" style={{ background: "#dbd7e2" }}>
          <div className="row">
            <div className="col-sm-4"></div>
            <div className="col-sm-6">
              <div className="d-flex  gap-3 mb-3" style={{ fontSize: "12px" }}>
                <div className="d-flex align-items-center">
                  <div
                    style={{
                      width: "12px",
                      height: "12px",
                      borderRadius: "50%",
                      backgroundColor: getStatusColor("Active"),
                      marginRight: "5px",
                    }}
                  ></div>
                  <span className="ml-1 font-weight-bold">Active</span>
                </div>
                <div className="d-flex align-items-center">
                  <div
                    style={{
                      width: "12px",
                      height: "12px",
                      borderRadius: "50%",
                      backgroundColor: getStatusColor("Submitted"),
                      marginRight: "5px",
                      marginLeft: "10px",
                    }}
                  ></div>
                  <span className="ml-1 font-weight-bold">Submitted</span>
                </div>
                <div className="d-flex align-items-center">
                  <div
                    style={{
                      width: "12px",
                      height: "12px",
                      borderRadius: "50%",
                      backgroundColor: getStatusColor("Approved"),
                      marginRight: "5px",
                      marginLeft: "10px",
                    }}
                  ></div>
                  <span className="ml-1 font-weight-bold">Approved</span>
                </div>
                <div className="d-flex align-items-center">
                  <div
                    style={{
                      width: "12px",
                      height: "12px",
                      borderRadius: "50%",
                      backgroundColor: getStatusColor("Rejected"),
                      marginRight: "5px",
                      marginLeft: "10px",
                    }}
                  ></div>
                  <span className="ml-1 font-weight-bold">Rejected</span>
                </div>

                <div className="d-flex align-items-center">
                  <div
                    style={{
                      width: "12px",
                      height: "12px",
                      borderRadius: "50%",
                      backgroundColor: getStatusColor("No Expense"),
                      marginRight: "5px",
                      marginLeft: "10px",
                    }}
                  ></div>
                  <span className="ml-1 font-weight-bold">No Expense</span>
                </div>
              </div>
            </div>
            <div className="col-sm-3"></div>
          </div>
          {loading ? (
            <Loading />
          ) : (
            <div className="col-sm-12 calendar-container-wrapper ml-5">
              <table className="calendar">
                <thead
                  style={{
                    color: "#2196F3",
                    backgroundColor: "#f8f9fa",
                    borderBottom: "2px solid #dee2e6",
                  }}
                >
                  <tr>
                    <th className="managerexpensecss">Sunday</th>
                    <th className="managerexpensecss">Monday</th>
                    <th className="managerexpensecss">Tuesday</th>
                    <th className="managerexpensecss">Wednesday</th>
                    <th className="managerexpensecss">Thursday</th>
                    <th className="managerexpensecss">Friday</th>
                    <th className="managerexpensecss">Saturday</th>
                  </tr>
                </thead>
                <tbody>{renderCalendarRows()}</tbody>
              </table>

              {/* Month Total Summary */}
              {expenseData.length > 0 && (
                <div
                  className="mt-4 p-2 bg-light rounded"
                  style={{ width: "1120px" }}
                >
                  <div className="row">
                    <div className="col-md-5">
                      <h6 className="mb-2 font-weight-bold">Month Summary</h6>
                      <div className="d-flex align-items-center">
                        <FaReceipt className="text-primary me-2" />
                        <span className="fw-bold">
                          Total Expenses: ₹
                          {new Intl.NumberFormat("en-IN").format(
                            expenseData[0]?.MonthTotal || 0
                          )}
                        </span>
                      </div>
                    </div>
                    <div className="col-md-5">
                      <div className="text-muted small">
                        <div>
                          Days with expenses:{" "}
                          {
                            expenseData.filter((item) => item.ExpenseCount > 0)
                              .length
                          }
                        </div>
                        <div>
                          Total expense reports:{" "}
                          {expenseData.reduce(
                            (sum, item) => sum + item.ExpenseCount,
                            0
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ExpenseCalendar;
