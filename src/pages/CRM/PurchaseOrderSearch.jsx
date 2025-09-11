import React, { useState } from "react";
import Heading from "../../components/UI/Heading";
import { Link } from "react-router-dom";
import PurchaseOrder from "./PurchaseOrder";
import Input from "../../components/formComponent/Input";
import { Tabfunctionality } from "../../utils/helpers";
import ReactSelect from "../../components/formComponent/ReactSelect";
import Tables from "../../components/UI/customTable";
import { purchaseOrderTHEAD } from "../../components/modalComponent/Utils/HealperThead";

const PurchaseOrderSearch = () => {
  const [collect, setCollect] = useState([]);
  const [formData, setFormData] = useState({
    PurchaseOrder: "",
    Collect: "",
    ShowOpenOrders: "",
  });
  const [tableData, setTableData] = useState([
    {
      date: "2024-09-21",
      purchaseOrderNumber: "PO123456",
      partyName: "ABC Traders",
      validTill: "2024-10-31",
      amount: 5000.0,
      status: "Pending",
    },
    {
      date: "2024-09-21",
      purchaseOrderNumber: "PO123456",
      partyName: "ABC Traders",
      validTill: "2024-10-31",
      amount: 5000.0,
      status: "Pending",
    },
  ]);
  const handleSelectChange = (e) => {
    const { name, value, checked, type } = e?.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? (checked ? "1" : "0") : value,
    });
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
        <Heading
          title="Purchase Order Search"
          secondTitle={
            <div>
              <Link to="/PurchaseOrder" className="ml-3" title="Click to View">
                Create Purchase Order
              </Link>
            </div>
          }
        />
        <div className="row m-2">
          <Input
            type="text"
            className="form-control"
            id="PurchaseOrder"
            name="PurchaseOrder"
            lable="Search Purchase Order"
            placeholder=""
            onChange={handleSelectChange}
            value={formData?.PurchaseOrder}
            respclass="col-xl-2 col-md-4 col-sm-4 col-12"
            onKeyDown={Tabfunctionality}
            tabIndex="1"
          />
          <ReactSelect
            respclass="col-xl-2 col-md-4 col-sm-4 col-12"
            name="Collect"
            placeholderName="Collect"
            dynamicOptions={[
              { label: "Today", value: "1" },
              { label: "Yesterday", value: "2" },
              { label: "This Week", value: "3" },
              { label: "Last Week", value: "4" },
              { label: "This Month", value: "5" },
              { label: "Last 7 Days", value: "6" },
            ]}
            handleChange={handleDeliveryChange}
            value={formData.Collect}
            onKeyDown={Tabfunctionality}
            tabIndex="1"
          />
          <ReactSelect
            respclass="col-xl-2 col-md-4 col-sm-4 col-12"
            name="ShowOpenOrders"
            placeholderName="ShowOpenOrders"
            dynamicOptions={[
              { label: "Show All Orders", value: "1" },
              { label: "Show Open Orders", value: "2" },
              { label: "Show Closed Orders", value: "3" },
            ]}
            handleChange={handleDeliveryChange}
            value={formData.ShowOpenOrders}
            onKeyDown={Tabfunctionality}
            tabIndex="1"
          />
        </div>
      </div>
      <div className="card mt-2">
        <Heading title={"Search Details"}/>
        <Tables
          thead={purchaseOrderTHEAD}
          tbody={tableData?.map((ele, index) => ({
            Date: ele?.date,
            "Purchase Order Number": ele?.purchaseOrderNumber,
            "Party Name": ele?.partyName,
            "Valid Till": ele?.validTill,
            Amount: ele?.amount,
            Status: ele?.status,
          }))}
          tableHeight={"tableHeight"}
        />
      </div>
    </>
  );
};
export default PurchaseOrderSearch;
