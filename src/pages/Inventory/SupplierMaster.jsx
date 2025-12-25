import React, { useEffect, useState } from "react";
import Heading from "../../components/UI/Heading";
import { useTranslation } from "react-i18next";
import Input from "../../components/formComponent/Input";
import ReactSelect from "../../components/formComponent/ReactSelect";
import { axiosInstances } from "../../networkServices/axiosInstance";
import { apiUrls } from "../../networkServices/apiEndpoints";
import { Contact, Pin } from "lucide-react";
import Tables from "../../components/UI/customTable";

const SupplierMaster = () => {
  const [t] = useTranslation();
  const [tableData, setTableData] = useState([
    {
      SupplierType: "Local",
    },
  ]);
  const [formData, setFormData] = useState({
    SupplierType: "",
    Category: "",
    SupplierCode: "",
    SupplierName: "",
    Address1: "",
    Address2: "",
    Address3: "",
    PostalCode: "",
    Country: "",
    State: "",
    District: "",
    City: "",
    CreditDays: "",
    ContactPerson: "",
    MobileNumber: "",
    Email: "",
    BankName: "",
    AccountNo: "",
    PaymentType: "",
    ShipmentDetail: "",
    TinNo: "",
    GstNo: "",
    PinCode: "",
    SupplierCurrency: "",
    TermsCondition: "",
    IsAsset: "",
    IsInsuranceProvider: "",
  });
  const supplierTHEAD = [
    "S.No.",
    "Supplier Type",
    "Category",

    "Supplier Name",
    "GstNo",
    "Address1",

    "Address2",
    "Address3",
    "Country",

    "City",
    "Mobile Number",
    "Email",
    "Edit",
  ];

  const handleCheckBox = (e) => {
    const { name, value, checked, type } = e?.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? (checked ? 1 : 0) : value,
    });
  };
  const [terms, setTerms] = useState([
    { value: "Net 30", label: "Testt 1" },
    { value: "Net 60", label: "3o days terms" },
    { value: "Net 90", label: "Net 90" },
  ]);
  const [city, setCity] = useState([]);
  const [district, setDistrict] = useState([]);
  const [states, setState] = useState([]);
  const [country, setCountry] = useState([]);
  const [suppliertype, setSupplierType] = useState([
    { value: "Local", label: "Local" },
    { value: "International", label: "International" },
  ]);
  const [category, setCategory] = useState([
    { value: "1", label: "Medical Item" },
    { value: "2", label: "General Item" },
  ]);
  const getCountry = () => {
    axiosInstances
      .post(apiUrls?.GetCountry, {})
      .then((res) => {
        const countrys = res?.data.data.map((item) => {
          return { label: item?.NAME, value: item?.CountryID };
        });
        setCountry(countrys);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getState = (value) => {
    axiosInstances
      .post(apiUrls?.GetState, { CountryID: String(value) })
      .then((res) => {
        const states = res?.data.data.map((item) => {
          return { label: item?.StateName, value: item?.StateID };
        });
        setState(states);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getDistrict = (country, state) => {
    axiosInstances
      .post(apiUrls?.GetDistrict, {
        CountryID: String(formData?.Country ? formData?.Country : country),
        StateID: String(state),
      })
      .then((res) => {
        const states = res?.data.data.map((item) => {
          return { label: item?.District, value: item?.DistrictID };
        });
        setDistrict(states);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getCity = (country, state, district) => {
    axiosInstances
      .post(apiUrls?.GetCity, {
        CountryID: String(formData?.Country ? formData?.Country : country),
        StateID: String(formData?.State ? formData?.State : state),
        DistrictID: String(district),
      })
      .then((res) => {
        const states = res?.data.data.map((item) => {
          return { label: item?.City, value: item?.CityID };
        });
        setCity(states);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleDeliveryChange = (name, e) => {
    const { value } = e;
    if (name == "Country") {
      setFormData({
        ...formData,
        [name]: value,
        State: "",
        District: "",
        City: "",
      });
      setState([]);
      setDistrict([]);
      setCity([]);
      getState(value);
    } else if (name == "State") {
      setFormData({ ...formData, [name]: value, District: "", City: "" });
      setDistrict([]);
      setCity([]);
      getDistrict(formData?.Country, value);
    } else if (name == "District") {
      setFormData({ ...formData, [name]: value, City: "" });
      getCity(formData?.Country, formData?.State, value);
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };
  const handleSelectChange = (e) => {
    const { name, value, checked, type } = e?.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? (checked ? 1 : 0) : value,
    });
  };

  const handleEdit = () => {};

  useEffect(() => {
    getCountry();
  }, []);
  return (
    <>
      <div className="card">
        <Heading isBreadcrumb={true} />
        <div className="row p-2">
          <ReactSelect
            name="SupplierType"
            respclass="col-xl-2 col-md-4 col-sm-6 col-12"
            placeholderName="Supplier Type"
            dynamicOptions={suppliertype}
            value={formData?.SupplierType}
            handleChange={handleDeliveryChange}
          />
          <ReactSelect
            name="Category"
            respclass="col-xl-2 col-md-4 col-sm-6 col-12"
            placeholderName="Category"
            dynamicOptions={category}
            value={formData?.Category}
            handleChange={handleDeliveryChange}
          />
          <Input
            type="text"
            className="form-control"
            id="SupplierCode"
            name="SupplierCode"
            lable="Supplier Code"
            placeholder=" "
            onChange={handleSelectChange}
            value={formData?.SupplierCode}
            respclass="col-xl-2 col-md-4 col-sm-4 col-12"
          />
          <Input
            type="text"
            className="form-control"
            id="SupplierName"
            name="SupplierName"
            lable="Name"
            placeholder=" "
            onChange={handleSelectChange}
            value={formData?.SupplierName}
            respclass="col-xl-2 col-md-4 col-sm-4 col-12"
          />
          <Input
            type="text"
            className="form-control"
            id="Address1"
            name="Address1"
            lable="Address 1"
            placeholder=" "
            onChange={handleSelectChange}
            value={formData?.Address1}
            respclass="col-xl-2 col-md-4 col-sm-4 col-12"
          />
          <Input
            type="text"
            className="form-control"
            id="Address2"
            name="Address2"
            lable="Address 2"
            placeholder=" "
            onChange={handleSelectChange}
            value={formData?.Address2}
            respclass="col-xl-2 col-md-4 col-sm-4 col-12"
          />
          <Input
            type="text"
            className="form-control"
            id="Address3"
            name="Address3"
            lable="Address 3"
            placeholder=" "
            onChange={handleSelectChange}
            value={formData?.Address3}
            respclass="col-xl-2 col-md-4 col-sm-4 col-12 mt-2"
          />
          <Input
            type="number"
            className="form-control"
            id="PostalCode"
            name="PostalCode"
            lable="Postal Code"
            placeholder=" "
            onChange={handleSelectChange}
            value={formData?.PostalCode}
            respclass="col-xl-2 col-md-4 col-sm-4 col-12 mt-2"
          />
          <ReactSelect
            name="Country"
            respclass="col-xl-2 col-md-4 col-sm-6 col-12 mt-2"
            placeholderName="Country"
            dynamicOptions={country}
            value={formData?.Country}
            handleChange={handleDeliveryChange}
          />
          <ReactSelect
            respclass="col-xl-2 col-md-4 col-sm-4 col-12 mt-2"
            name="State"
            placeholderName="State"
            dynamicOptions={states}
            handleChange={handleDeliveryChange}
            value={formData.State}
          />
          <ReactSelect
            respclass="col-xl-2 col-md-4 col-sm-4 col-12 mt-2"
            name="District"
            placeholderName="District"
            dynamicOptions={district}
            handleChange={handleDeliveryChange}
            value={formData.District}
          />
          <ReactSelect
            respclass="col-xl-2 col-md-4 col-sm-4 col-12 mt-2"
            name="City"
            placeholderName="City"
            dynamicOptions={city}
            handleChange={handleDeliveryChange}
            value={formData.City}
          />
          <Input
            type="number"
            className="form-control"
            id="CreditDays"
            name="CreditDays"
            lable="Credit Days"
            placeholder=" "
            onChange={handleSelectChange}
            value={formData?.CreditDays}
            respclass="col-xl-2 col-md-4 col-sm-4 col-12 mt-2"
          />
          <Input
            type="text"
            className="form-control"
            id="ContactPerson"
            name="ContactPerson"
            lable="Contact Person"
            placeholder=" "
            onChange={handleSelectChange}
            value={formData?.ContactPerson}
            respclass="col-xl-2 col-md-4 col-sm-4 col-12 mt-2"
          />
          <Input
            type="number"
            className="form-control"
            id="MobileNumber"
            name="MobileNumber"
            lable="Mobile No."
            placeholder=" "
            onChange={handleSelectChange}
            value={formData?.MobileNumber}
            respclass="col-xl-2 col-md-4 col-sm-4 col-12 mt-2"
          />
          <Input
            type="text"
            className="form-control"
            id="Email"
            name="Email"
            lable="Email"
            placeholder=" "
            onChange={handleSelectChange}
            value={formData?.Email}
            respclass="col-xl-2 col-md-4 col-sm-4 col-12 mt-2"
          />
          <Input
            type="text"
            className="form-control"
            id="BankName"
            name="BankName"
            lable="Bank Name"
            placeholder=" "
            onChange={handleSelectChange}
            value={formData?.BankName}
            respclass="col-xl-2 col-md-4 col-sm-4 col-12 mt-2"
          />
          <Input
            type="number"
            className="form-control"
            id="AccountNo"
            name="AccountNo"
            lable="Account No."
            placeholder=" "
            onChange={handleSelectChange}
            value={formData?.AccountNo}
            respclass="col-xl-2 col-md-4 col-sm-4 col-12 mt-2"
          />
          <ReactSelect
            respclass="col-xl-2 col-md-4 col-sm-4 col-12 mt-2"
            name="PaymentType"
            placeholderName="PaymentType"
            dynamicOptions={[
              { value: "Delta", label: "Cash" },
              { value: "Credit", label: "Credit" },
            ]}
            handleChange={handleDeliveryChange}
            value={formData.PaymentType}
          />
          <Input
            type="text"
            className="form-control"
            id="ShipmentDetail"
            name="ShipmentDetail"
            lable="Shipment Detail"
            placeholder=" "
            onChange={handleSelectChange}
            value={formData?.ShipmentDetail}
            respclass="col-xl-2 col-md-4 col-sm-4 col-12 mt-2"
          />
          <Input
            type="text"
            className="form-control"
            id="TinNo"
            name="TinNo"
            lable="Tin No."
            placeholder=" "
            onChange={handleSelectChange}
            value={formData?.TinNo}
            respclass="col-xl-2 col-md-4 col-sm-4 col-12 mt-2"
          />
          <Input
            type="text"
            className="form-control"
            id="GstNo"
            name="GstNo"
            lable="GstNo."
            placeholder=" "
            onChange={handleSelectChange}
            value={formData?.GstNo}
            respclass="col-xl-2 col-md-4 col-sm-4 col-12 mt-2"
          />
          <Input
            type="text"
            className="form-control"
            id="PinCode"
            name="PinCode"
            lable="PinCode."
            placeholder=" "
            onChange={handleSelectChange}
            value={formData?.PinCode}
            respclass="col-xl-2 col-md-4 col-sm-4 col-12 mt-2"
          />
          <ReactSelect
            respclass="col-xl-2 col-md-4 col-sm-4 col-12 mt-2"
            name="SupplierCurrency"
            placeholderName="Supplier Currency"
            dynamicOptions={[
              { value: "INR", label: "INR" },
              { value: "USD", label: "USD" },
            ]}
            handleChange={handleDeliveryChange}
            value={formData.SupplierCurrency}
          />
          <ReactSelect
            respclass="col-xl-2 col-md-4 col-sm-4 col-12 mt-2"
            name="TermsCondition"
            placeholderName="Terms & Condition"
            dynamicOptions={terms}
            handleChange={handleDeliveryChange}
            value={formData.TermsCondition}
          />
          <div className="search-col" style={{ marginLeft: "8px" }}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <label className="switch" style={{ marginTop: "7px" }}>
                <input
                  type="checkbox"
                  name="IsAsset"
                  checked={formData?.IsAsset ? 1 : 0}
                  onChange={handleCheckBox}
                />
                <span className="slider"></span>
              </label>
              <span
                style={{
                  marginLeft: "3px",
                  marginRight: "5px",
                  fontSize: "12px",
                }}
              >
                {t("IsAsset")}
              </span>
            </div>
          </div>
          <div className="search-col" style={{ marginLeft: "8px" }}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <label className="switch" style={{ marginTop: "7px" }}>
                <input
                  type="checkbox"
                  name="IsInsuranceProvider"
                  checked={formData?.IsInsuranceProvider ? 1 : 0}
                  onChange={handleCheckBox}
                />
                <span className="slider"></span>
              </label>
              <span
                style={{
                  marginLeft: "3px",
                  marginRight: "5px",
                  fontSize: "12px",
                }}
              >
                {t("IsInsuranceProvider")}
              </span>
            </div>
          </div>
          <button className="btn btn-sm btn-success ml-3 mt-2">Save</button>
        </div>
      </div>
      <div className="card mt-2">
        <Heading
          title={<span className="font-weight-bold">Supplier Details</span>}
        />
        <Tables
          thead={supplierTHEAD}
          tbody={tableData?.map((ele, index) => ({
            "S.No.": index + 1,
            "Supplier Type": ele?.SupplierType,
            Category: ele?.Category,

            "Supplier Name": ele?.SupplierName,
            GSTNO: ele?.GSTNO,
            Address1: ele?.Address1,

            Address2: ele?.Address2,
            Address3: ele?.Address3,
            Country: ele?.Country,

            City: ele?.City,
            "Mobile Number": ele?.MobileNumber,
            Email: ele?.Email,
            Edit: <i className="fa fa-edit" onClick={handleEdit}></i>,
          }))}
          tableHeight={"tableHeight"}
        />
      </div>
    </>
  );
};
export default SupplierMaster;
