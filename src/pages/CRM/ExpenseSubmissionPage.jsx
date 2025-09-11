import React, { useEffect, useState } from "react";
import Input from "../../components/formComponent/Input";
import MultiSelectComp from "../../components/formComponent/MultiSelectComp";
import { apiUrls } from "../../networkServices/apiEndpoints";
import axios from "axios";
import { headers } from "../../utils/apitools";
import ReactSelect from "../../components/formComponent/ReactSelect";
import { inputBoxValidation } from "../../utils/utils";
import { MOBILE_NUMBER_VALIDATION_REGX } from "../../utils/constant";
import Heading from "../../components/UI/Heading";
import DatePicker from "../../components/formComponent/DatePicker";
import Tables from "../../components/UI/customTable";
import { Tabfunctionality } from "../../utils/helpers";
import { useCryptoLocalStorage } from "../../utils/hooks/useCryptoLocalStorage";
const ExpenseSubmissionPage = () => {
  const { VITE_DATE_FORMAT } = import.meta.env;
  const [vertical, setVertical] = useState([]);
  const [team, setTeam] = useState([]);
  const [wing, setWing] = useState([]);
  const [designation, setDesignation] = useState([]);
  const [formData, setFormData] = useState({
    EmployeeName: "",
    VerticalID: [],
    TeamID: [],
    WingID: [],
    Designation: [],
    ReportingPerson: "",
    Mobile: "",
    Status: "",
    MaximumWeekoffs: "",
    ExpenseCategory: "",
    Amount: "",
    HotelName: "",
    Description: "",
    TravelType: "",
    From: "",
    To: "",
    TravelAmount: "",
    TravelDescription: "",
    MealsDescription: "",
    OthersAmount: "",
    OthersDescription: "",
  });
  const handleDeliveryChange = (name, e) => {
    const { value } = e;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSelectChange = (e) => {
    const { name, value, checked, type } = e?.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? (checked ? "1" : "0") : value,
    });
  };
  const handleMultiSelectChange = (name, selectedOptions) => {
    const selectedValues = selectedOptions.map((option) => option.code);
    setFormData((prev) => ({
      ...prev,
      [`${name}`]: selectedValues,
    }));
  };
  const handleDateChange = (e) => {
    const { name, value, checked, type } = e?.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? (checked ? 1 : 0) : value,
    });
  };
  const getDesignation = () => {
    let form = new FormData();
    form.append("ID", useCryptoLocalStorage("user_Data", "get", "ID")),
      form.append("LoginName", useCryptoLocalStorage("user_Data", "get", "realname") ),
      axios
        .post(apiUrls?.ViewDesignation, form, { headers })
        .then((res) => {
          const reporters = res?.data.data.map((item) => {
            return { name: item?.DesignationName, code: item?.ID };
          });
          setDesignation(reporters);
        })
        .catch((err) => {
          console.log(err);
        });
  };
  const getVertical = () => {
    let form = new FormData();
    form.append("Id", useCryptoLocalStorage("user_Data", "get", "ID")),
      axios
        .post(apiUrls?.Vertical_Select, form, { headers })
        .then((res) => {
          const verticals = res?.data.data.map((item) => {
            return { name: item?.Vertical, code: item?.VerticalID };
          });
          setVertical(verticals);
        })
        .catch((err) => {
          console.log(err);
        });
  };
  const getTeam = () => {
    let form = new FormData();
    form.append("ID", useCryptoLocalStorage("user_Data", "get", "ID")),
      axios
        .post(apiUrls?.Team_Select, form, { headers })
        .then((res) => {
          const teams = res?.data.data.map((item) => {
            return { name: item?.Team, code: item?.TeamID };
          });
          setTeam(teams);
        })
        .catch((err) => {
          console.log(err);
        });
  };
  const getWing = () => {
    let form = new FormData();
    form.append("ID", useCryptoLocalStorage("user_Data", "get", "ID")),
      axios
        .post(apiUrls?.Wing_Select, form, { headers })
        .then((res) => {
          const wings = res?.data.data.map((item) => {
            return { name: item?.Wing, code: item?.WingID };
          });
          setWing(wings);
        })
        .catch((err) => {
          console.log(err);
        });
  };

  useEffect(() => {
    getVertical();
    getTeam();
    getWing();
    getDesignation();
  }, []);
  return (
    <>
      <div className="card">
        <Heading title={""} isBreadcrumb={true} />
        <div className="row g-4 m-2">
          <div className="col-3">
            <label>Name</label> : {"Prashant Singhal"}
          </div>
          <div className="col-3">
            <label>Designation</label> : {"Sr Support & Services Manager"}
          </div>
          <div className="col-2">
            <label>Team</label> : {"LIS"}
          </div>
          <div className="col-2">
            <label>Report To</label> : {"VISHAL NAGPAL"}
          </div>
          {/* <Input
            type="text"
            className="form-control"
            id="EmployeeName"
            name="EmployeeName"
            lable="Employee Name"
            placeholder=""
            onChange={handleSelectChange}
            value={formData?.EmployeeName}
            respclass="col-xl-2 col-md-4 col-sm-4 col-12"
          /> */}
          {/* <MultiSelectComp
            name="Designation"
            respclass="col-xl-2 col-md-4 col-sm-6 col-12"
            defaultValue={formData?.Designation}
            placeholderName="Designation"
            dynamicOptions={designation}
            value={formData.Designation.map((code) => ({
              code,
              name: designation.find((item) => item.code === code)?.name,
            }))}
            handleChange={handleMultiSelectChange}
          /> */}
          {/* <MultiSelectComp
            respclass="col-xl-2 col-md-4 col-sm-6 col-12"
            name="TeamID"
            placeholderName="Team"
            dynamicOptions={team}
            handleChange={handleMultiSelectChange}
            value={formData.TeamID.map((code) => ({
              code,
              name: team.find((item) => item.code === code)?.name,
            }))}
          /> */}

          {/* <Input
            type="text"
            className="form-control"
            id="ReportingPerson"
            name="ReportingPerson"
            lable="ReportTo"
            placeholder=""
            onChange={handleSelectChange}
            value={formData?.ReportingPerson}
            respclass="col-xl-2 col-md-4 col-sm-4 col-12"
          /> */}
        </div>
      </div>

      <div className="card mt-2">
        <Heading title={"General Details"} />
        <div className="row g-4 m-2">
          <DatePicker
            className="custom-calendar"
            id="FromDate"
            name="FromDate"
            lable="Date"
            placeholder={VITE_DATE_FORMAT}
            respclass="col-xl-2 col-md-4 col-sm-6 col-12"
            value={formData?.FromDate}
            handleChange={handleDateChange}
            onKeyDown={Tabfunctionality}
            tabIndex="1"
          />
          <Input
            type="text"
            className="form-control"
            id="TripName"
            name="TripName"
            lable="Trip Name"
            placeholder=""
            onChange={handleSelectChange}
            value={formData?.EmployeeName}
            respclass="col-xl-2 col-md-4 col-sm-4 col-12"
            onKeyDown={Tabfunctionality}
            tabIndex="1"
          />

          <ReactSelect
            className="form-control"
            name="State"
            respclass="col-xl-2 col-md-4 col-sm-6 col-12"
            placeholderName="Location"
            id="State"
            dynamicOptions={[{ label: "delhi", value: "" }]}
            value={formData?.State}
            handleChange={handleDeliveryChange}
            onKeyDown={Tabfunctionality}
            tabIndex="1"
          />
          <Input
            type="text"
            className="form-control"
            id="City"
            name="City"
            lable="City"
            placeholder=""
            onChange={handleSelectChange}
            value={formData?.City}
            respclass="col-xl-2 col-md-4 col-sm-4 col-12"
            onKeyDown={Tabfunctionality}
            tabIndex="1"
          />
          <Input
            type="text"
            className="form-control"
            id="Locality"
            name="Locality"
            lable="Locality"
            placeholder=""
            onChange={handleSelectChange}
            value={formData?.Locality}
            respclass="col-xl-2 col-md-4 col-sm-4 col-12"
            onKeyDown={Tabfunctionality}
            tabIndex="1"
          />
          <Input
            type="text"
            className="form-control"
            id="ClientName"
            name="ClientName"
            lable="ClientName"
            placeholder=""
            onChange={handleSelectChange}
            value={formData?.ClientName}
            respclass="col-xl-2 col-md-4 col-sm-4 col-12"
            onKeyDown={Tabfunctionality}
            tabIndex="1"
          />
          <Input
            type="text"
            className="form-control"
            id="OtherTeammate"
            name="OtherTeammate"
            lable="OtherTeammate"
            placeholder=""
            onChange={handleSelectChange}
            value={formData?.OtherTeammate}
            respclass="col-xl-2 col-md-4 col-sm-4 col-12"
            onKeyDown={Tabfunctionality}
            tabIndex="1"
          />
          <ReactSelect
            className="form-control"
            name="ExpenseType"
            respclass="col-xl-2 col-md-4 col-sm-6 col-12"
            placeholderName="ExpenseType"
            id="ExpenseType"
            dynamicOptions={[
              { label: "India", value: "0" },
              { label: "Overseas", value: "1" },
            ]}
            value={formData?.ExpenseType}
            handleChange={handleDeliveryChange}
            onKeyDown={Tabfunctionality}
            tabIndex="1"
          />
        </div>
      </div>
      <div className="card mt-2">
        <Heading
          title={"Expense Summary"}
          secondTitle={
            <div className="col-auto">
              Grand Total: ₹ 0.00
              {/* {expenseItems.reduce(
                (acc, item) => acc + parseFloat(item.Amount || 0),
                0
              )} */}
            </div>
          }
        />

        <ExpenseForm />
      </div>
    </>
  );
};
export default ExpenseSubmissionPage;

const ExpenseForm = () => {
  const [formData, setFormData] = useState({
    ExpenseCategory: "",
    Amount: "",
    HotelName: "",
    Description: "",
    TravelType: "",
    From: "",
    To: "",
  });
  const [expenseItems, setExpenseItems] = useState([]);
  const handleSelectChange = (e) => {
    const { name, value, checked, type } = e?.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? (checked ? "1" : "0") : value,
    });
  };
  const handleCategoryChange = (name, e) => {
    const { value } = e;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleAddExpense = () => {
    console.log(formData);

    // Find the label for the selected category
    const categoryLabel = categories.find(
      (item) => item.value === formData?.ExpenseCategory
    )?.label;

    // Create a new object with formData and the category name
    const obj = { ...formData, Categoryname: categoryLabel };

    // Add the new expense to the expenseItems array
    setExpenseItems([...expenseItems, obj]);

    // Reset the form
    setFormData({
      ExpenseCategory: "",
      Amount: "",
      HotelName: "",
      Description: "",
      TravelType: "",
      From: "",
      To: "",
    });
  };

  const categories = [
    { label: "Hotel Expense", value: "0" },
    { label: "Meals Expense", value: "1" },
    { label: "Local Travel Expense", value: "2" },
    { label: "Inter City Travel Expense", value: "3" },
    { label: "Phone Expense", value: "4" },
    { label: "Client Entertainment Expense", value: "5" },
    { label: "Other Expense", value: "6" },
  ];
  console.log(expenseItems);
  return (
    <>
      <div className="row g-4 m-2">
        <ReactSelect
          className="form-control"
          name="ExpenseCategory"
          respclass="col-xl-2 col-md-4 col-sm-6 col-12"
          placeholderName="Expense Details"
          id="ExpenseCategory"
          dynamicOptions={categories}
          value={formData?.ExpenseCategory}
          handleChange={handleCategoryChange}
          onKeyDown={Tabfunctionality}
          tabIndex="1"
        />

        {formData.ExpenseCategory === "0" && (
          <>
            <Input
              type="number"
              className="form-control"
              id="HotelAmount"
              name="Amount"
              lable="Hotel Amount"
              placeholder=""
              onChange={handleSelectChange}
              value={formData?.Amount}
              respclass="col-xl-2 col-md-4 col-sm-4 col-12"
              onKeyDown={Tabfunctionality}
              tabIndex="1"
            />
            <Input
              type="text"
              className="form-control"
              id="HotelName"
              name="HotelName"
              lable="Hotel Name"
              placeholder=""
              onChange={handleSelectChange}
              value={formData?.HotelName}
              respclass="col-xl-2 col-md-4 col-sm-4 col-12"
              onKeyDown={Tabfunctionality}
              tabIndex="1"
            />
            <Input
              type="text"
              className="form-control"
              id="Description"
              name="Description"
              lable="Description"
              placeholder=""
              onChange={handleSelectChange}
              value={formData?.Description}
              respclass="col-xl-2 col-md-4 col-sm-4 col-12"
              onKeyDown={Tabfunctionality}
              tabIndex="1"
            />
          </>
        )}

        {formData.ExpenseCategory === "1" && (
          <>
            <Input
              type="number"
              className="form-control"
              id="BreakfastAmount"
              name="BreakfastAmount"
              lable="BreakfastAmount"
              placeholder=""
              onChange={handleSelectChange}
              value={formData?.BreakfastAmount}
              respclass="col-xl-2 col-md-4 col-sm-4 col-12"
              onKeyDown={Tabfunctionality}
              tabIndex="1"
            />
            <Input
              type="number"
              className="form-control"
              id="LunchAmount"
              name="LunchAmount"
              lable="LunchAmount"
              placeholder=""
              onChange={handleSelectChange}
              value={formData?.LunchAmount}
              respclass="col-xl-2 col-md-4 col-sm-4 col-12"
              onKeyDown={Tabfunctionality}
              tabIndex="1"
            />
            <Input
              type="number"
              className="form-control"
              id="DinnerAmount"
              name="DinnerAmount"
              lable="DinnerAmount"
              placeholder=""
              onChange={handleSelectChange}
              value={formData?.DinnerAmount}
              respclass="col-xl-2 col-md-4 col-sm-4 col-12"
              onKeyDown={Tabfunctionality}
              tabIndex="1"
            />
            <Input
              type="text"
              className="form-control"
              id="Description"
              name="Description"
              lable="Description"
              placeholder=""
              onChange={handleSelectChange}
              value={formData?.Description}
              respclass="col-xl-2 col-md-4 col-sm-4 col-12"
              onKeyDown={Tabfunctionality}
              tabIndex="1"
            />
          </>
        )}

        {["2", "3"].includes(formData.ExpenseCategory) && (
          // <>
          //   <ReactSelect
          //     className="form-control"
          //     name="TravelType"
          //     respclass="col-xl-2 col-md-4 col-sm-6 col-12"
          //     placeholderName="Travel Type"
          //     id="TravelType"
          //     dynamicOptions={[
          //       { label: "Taxi", value: "taxi" },
          //       { label: "Bus", value: "bus" },
          //       { label: "Train", value: "train" },
          //       { label: "Flight", value: "flight" }
          //     ]}
          //     value={formData.TravelType}
          //     handleChange={(selectedOption) => setFormData({
          //       ...formData,
          //       TravelType: selectedOption
          //     })}
          //   />
          //   <Input
          //     type="text"
          //     className="form-control"
          //     id="From"
          //     name="From"
          //     lable="From"
          //     placeholder=""
          //     onChange={handleSelectChange}
          //     value={formData?.Description}
          //     respclass="col-xl-2 col-md-4 col-sm-4 col-12"
          //   />
          //   <Input
          //     type="text"
          //     className="form-control"
          //     id="To"
          //     name="To"
          //     lable="To"
          //     placeholder=""
          //     onChange={handleSelectChange}
          //     value={formData?.Description}
          //     respclass="col-xl-2 col-md-4 col-sm-4 col-12"
          //   />
          //   <Input
          //     type="number"
          //     className="form-control"
          //     id="Amount"
          //     name="Amount"
          //     lable="Amount"

          //     placeholder=""
          //     onChange={handleSelectChange}
          //     value={formData?.Amount}
          //     respclass="col-xl-2 col-md-4 col-sm-4 col-12"
          //   />
          //   <Input
          //     type="text"
          //     className="form-control"
          //     id="Description"
          //     name="Description"
          //     lable="Description"
          //     placeholder=""
          //     onChange={handleSelectChange}
          //     value={formData?.Description}
          //     respclass="col-xl-2 col-md-4 col-sm-4 col-12"
          //   />

          // </>
          <TravelExpenseTable />
        )}

        {["4", "5", "6"].includes(formData?.ExpenseCategory) && (
          <>
            <Input
              type="number"
              className="form-control"
              id="Amount"
              name="Amount"
              lable="Amount"
              placeholder=""
              onChange={handleSelectChange}
              value={formData?.Amount}
              respclass="col-xl-2 col-md-4 col-sm-4 col-12"
              onKeyDown={Tabfunctionality}
              tabIndex="1"
            />
            <Input
              type="text"
              className="form-control"
              id="Description"
              name="Description"
              lable="Description"
              placeholder=""
              onChange={handleSelectChange}
              value={formData?.Description}
              respclass="col-xl-2 col-md-4 col-sm-4 col-12"
              onKeyDown={Tabfunctionality}
              tabIndex="1"
            />
          </>
        )}

        <button className="btn btn-sm btn-success" onClick={handleAddExpense}>
          Add
        </button>
      </div>

      <div className="card">
        <ExpenseTable
          expenseItems={expenseItems}
          setExpenseItems={setExpenseItems}
        />

        <div className="row pt-2 m-2 d-flex justify-content-between align-items-center">
          {/* <div className="col-auto">
            <h5>
              Grand Total: ₹{" "}
              {expenseItems.reduce(
                (acc, item) => acc + parseFloat(item.Amount || 0),
                0
              )}
            </h5>
          </div> */}

          {/* Submit Button aligned to the right */}
          <div className="col-auto">
            <button className="btn btn-success">Submit Expense</button>
          </div>
        </div>
      </div>
    </>
  );
};

const TravelExpenseTable = () => {
  // Table rows state
  const [rows, setRows] = useState([
    { TravelType: "", From: "", To: "", Amount: "", Description: "" },
  ]);

  // TravelType dropdown options
  const travelTypeOptions = [
    { label: "Taxi", value: "taxi" },
    { label: "Bus", value: "bus" },
    { label: "Train", value: "train" },
    { label: "Flight", value: "flight" },
  ];

  // Add a new row
  const handleAddRow = () => {
    setRows([
      ...rows,
      { TravelType: "", From: "", To: "", Amount: "", Description: "" },
    ]);
  };

  // Remove a row
  const handleRemoveRow = (index) => {
    const updatedRows = rows.filter((_, rowIndex) => rowIndex !== index);
    setRows(updatedRows);
  };

  // Handle input changes
  const handleInputChange = (e, index, field) => {
    const updatedRows = [...rows];
    updatedRows[index][field] = e.target.value;
    setRows(updatedRows);
  };

  // Handle ReactSelect dropdown change
  const handleSelectChange = (e, index) => {
    const updatedRows = [...rows];
    updatedRows[index].TravelType = e.value;
    setRows(updatedRows);
  };

  // Table header data
  const thead = [
    { name: "Travel Type" },
    { name: "From" },
    { name: "To" },
    { name: "Amount" },
    { name: "Description" },
    { name: "Add/Remove" },
  ];

  // Table body data
  const tbody = rows?.map((row, index) => ({
    "Travel Type": (
      <ReactSelect
        className="form-control"
        dynamicOptions={travelTypeOptions}
        value={travelTypeOptions.find(
          (option) => option.value === row.TravelType
        )}
        handleChange={(e) => handleSelectChange(e, index)}
        placeholder="Select Travel Type"
        onKeyDown={Tabfunctionality}
        tabIndex="1"
      />
    ),
    From: (
      <Input
        type="text"
        value={row.From}
        className="form-control"
        placeholder="From"
        onChange={(e) => handleInputChange(e, index, "From")}
        onKeyDown={Tabfunctionality}
        tabIndex="1"
      />
    ),
    To: (
      <Input
        type="text"
        value={row.To}
        className="form-control"
        placeholder="To"
        onChange={(e) => handleInputChange(e, index, "To")}
        onKeyDown={Tabfunctionality}
        tabIndex="1"
      />
    ),
    Amount: (
      <Input
        type="number"
        value={row.Amount}
        className="form-control"
        placeholder="Amount"
        onChange={(e) => handleInputChange(e, index, "Amount")}
        onKeyDown={Tabfunctionality}
        tabIndex="1"
      />
    ),
    Description: (
      <Input
        type="text"
        value={row.Description}
        className="form-control"
        placeholder="Description"
        onChange={(e) => handleInputChange(e, index, "Description")}
        onKeyDown={Tabfunctionality}
        tabIndex="1"
      />
    ),
    "Add/Remove": (
      <div>
        {index === rows.length - 1 ? (
          <span
            label="Add"
            icon="pi pi-plus"
            className="fa fa-plus"
            onClick={handleAddRow}
            style={{ cursor: "pointer", color: "green" }}
          />
        ) : null}
        <span
          label="Remove"
          icon="pi pi-trash"
          className="fa fa-trash"
          onClick={() => handleRemoveRow(index)}
          style={{ cursor: "pointer", color: "red", marginLeft: "10px" }}
        />
      </div>
    ),
  }));

  return (
    <>
      <Tables thead={thead} tbody={tbody} tableHeight="auto" />
    </>
  );
};

const ExpenseTable = ({ expenseItems, setExpenseItems }) => {
  // Define the table headers (can be dynamic based on category)
  const thead = [
    { name: "Expense Category" },
    { name: "Amount" },
    { name: "Description" },
    { name: "Action" }, // Add action header for remove button
  ];

  // Function to handle row removal
  const handleRemoveRow = (index) => {
    const updatedItems = expenseItems.filter((_, i) => i !== index);
    setExpenseItems(updatedItems);
  };

  // Define the table body
  const tbody = expenseItems.map((item, index) => ({
    "Expense Category": item.Categoryname,
    Amount: item.Amount,
    Description: item.Description,
    Action: (
      <span
        className="fa fa-trash"
        onClick={() => handleRemoveRow(index)} // Call handleRemoveRow with the row index
      />
    ),
  }));

  return (
    <div className="table-container">
      <Tables
        thead={thead}
        tbody={tbody}
        tableHeight="tableHeight" // Adjust if you want a specific height
        responsive // Ensures the table is responsive
      />
    </div>
  );
};
