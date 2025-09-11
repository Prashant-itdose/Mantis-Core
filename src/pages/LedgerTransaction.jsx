import React, { useState } from "react";
import Heading from "../components/UI/Heading";
import DatePicker from "../components/formComponent/DatePicker";
import ReactSelect from "../components/formComponent/ReactSelect";
import Tables from "../components/UI/customTable";
import { ledgerTransactionThead } from "../components/modalComponent/Utils/HealperThead";

const LedgerTransaction = () => {
  const { VITE_DATE_FORMAT } = import.meta.env;
  const[tableData,setTableData]=useState([
    {
        "S.No.": 1,
        "Client": "ABC Corp",
        "ClosingBalance": 50000.00,
        "SecurityAmount": 10000.00,
        "TestingCharges": 2000.00,
        "NetPayable": 42000.00,
        "BillDate": "2024-10-01",
        "InvoiceNo": "INV-1001",
        "OpeningBalance": 45000.00,
        "DebitAmount": 5000.00,
        "CreditAmount": 0.00,
        "ClosingAmount": 42000.00
      }
      
  ])
  const [client, setClient] = useState([]);
  const [formData, setFormData] = useState({
    FromDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
    ToDate: new Date(),
    Client: "",
  });

  const searchHandleChange = (e, index) => {
    const { name, value } = e?.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDeliveryChange = (name, e) => {
    const { value } = e;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  return (
    <>
      <div className="card">
        <Heading title="Ledger Transaction" isBreadcrumb={true} />
        <div className="row m-2">
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
            name="Client"
            placeholderName="Client"
            dynamicOptions={[{label:"Client1",value:"1"}]}
            handleChange={handleDeliveryChange}
            value={formData.Client}
          />
           <div className="col-2 d-flex">
            <button className="btn btn-sm btn-success">Search</button>
            <button className="btn btn-sm btn-success ml-3">Print</button>
          </div>
        </div>
      </div>

      <div className="card mt-2">
        <Heading title="Search Details" />
        <Tables
          thead={ledgerTransactionThead}
          tbody={tableData?.map((ele, index) => ({
            "S.No.": index + 1,
            Client: ele?.Client,
            "Closing Balance": ele?.ClosingBalance,
            "Security Amount": ele?.SecurityAmount,
            "Testing Charges": ele?.TestingCharges,
            "Net Payable": ele?.NetPayable,
            "Bill Date": ele?.BillDate,
            "Invoice No.": ele?.InvoiceNo,
            "Opening Balance": ele?.OpeningBalance,
            "Debit Amount": ele?.DebitAmount,
            "Credit Amount": ele?.CreditAmount,
            "Closing Amount": ele?.ClosingAmount,
          }))}
          tableHeight={"tableHeight"}
        />
      </div>
    </>
  );
};
export default LedgerTransaction;
