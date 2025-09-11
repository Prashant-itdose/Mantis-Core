import React from "react";
import ReactSelect from "../../formComponent/ReactSelect";
import Tables from ".";
import Heading from "../Heading";

const QuotationTable = (props) => {
  const {
    THEAD,
    tbody,
    handleCustomSelect,
    handleEditInfo,
    handleSettlement,
    handleCashReceipt,
  } = props;

  const options = [
    { label: "Edit Info", value: "edit" },
    { label: "Settle", value: "settle" },
    { label: "Print Receipt", value: "print" },
    { label: "Fully Paid", value: "fullyPaid" },
  ];

  const handleReactSelect = (name, value, index) => {
    switch (value.value) {
      case "edit":
        handleEditInfo(index);
        break;
      case "settle":
        handleSettlement(index);
        break;
      case "print":
        handleCashReceipt(index);
        break;
      case "fullyPaid":
        handleCustomSelect(index, "isFullyPaid", !tbody[index].IsDead);
        break;
      default:
        break;
    }
  };

  // Transform TBODY data for the table
  const formattedTBody = tbody.map((ele, index) => ({
    "Sr. No.": index + 1,
    "Quotation No.": ele.Qutationno,
    "Item Name": ele.itemname,
    "Total Amount": ele.totalamount,
    Remark: ele.remark,
    "Vendor Name": ele.VendorName,
    "Entry Date From": ele.EntryDateFrom,
    "Entry Date To": ele.EntryDateTo,
    "Approval Status": ele.ApprovalStatus,
    "Is Dead": ele.IsDead,
    Action: (
      <ReactSelect
        value={null}
        dynamicOptions={options}
        handleChange={(name, value) => handleReactSelect(name, value, index)} // Passing the index here
        placeholder="Select Action"
        className="p-column-dropdown"
      />
    ),
    colorcode: ele.rowcolor, // Apply color from TBODY
  }));
  const statusLabels = [
    { status: "1", label: "Created", colorClass: "bisque" },
    { status: "2", label: "Checked", colorClass: "pink" },
    { status: "3", label: "Approved", colorClass: "lightgreen" },
    { status: "4", label: "ConverToSales", colorClass: "yellow" },
    { status: "6", label: "Dead", colorClass: "#E2680A" },
    { status: "7", label: "RequestSend", colorClass: "#00cc99" },
    { status: "8", label: "Failes", colorClass: "orange" },
    { status: "9", label: "MailSend", colorClass: "green" },
  ];
  return (
    <>
      <div className="card">
        <Heading
          title="Search Details"
          secondTitle={
            <div className="d-flex justify-content-center">
              {statusLabels.map(({ status, label, colorClass }) => (
                <div
                  key={status}
                  className="d-flex align-items-center"
                  onClick={() => SearchBillPrintAPI(status, 0)}
                  style={{ cursor: "pointer" }}
                >
                  <div
                    className="rounded-circle"
                    style={{
                      width: "12px",
                      height: "12px",
                      marginRight: "4px",
                      backgroundColor: colorClass, // Set background color
                      border: "0.5px solid #000", // Slight border with a neutral color (black or grey)
                    }}
                  ></div>
                  <span className="btn-sm">{label}</span>
                </div>
              ))}
            </div>
          }
        />
        <Tables
          thead={THEAD}
          tbody={formattedTBody}
          tableHeight={"tableHeight"}
          rowStyle={(row) => ({
            backgroundColor: row.colorcode || "transparent", // Apply background color based on colorcode
          })}
        />
      </div>
    </>
  );
};

export default QuotationTable;
