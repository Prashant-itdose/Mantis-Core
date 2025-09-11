import React, { useEffect, useState } from "react";
import Input from "../../components/formComponent/Input";
import { Link } from "react-router-dom";
import ReactSelect from "../../components/formComponent/ReactSelect";
import { Tabfunctionality } from "../../utils/helpers";
import {
  MOBILE_NUMBER_VALIDATION_REGX,
  PINCODE_VALIDATION_REGX,
} from "../../utils/constant";
import { inputBoxValidation } from "../../utils/utils";

const CreatePartyModal = () => {
  const [formData, setFormData] = useState({
    PartyName: "",
    MobileNo: "",
    BillingAddress: "",
    BillingState: "",
    BillingCity: "",
    BillingPincode: "",
    IsActive: "false",
    ShippingAddress: "",
    ShippingState: "",
    ShippingCity: "",
    ShippingPincode: "",
    GSTNO: "",
  });
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
  const rowConst = {
    show: false,
    show1: false,
    show2: false,
    show3: false,
    show4: false,
    show5: false,
    show6: false,
    show7: false,
  };
  const [rowHandler, setRowHandler] = useState(rowConst);
  const handlerow = (row) => {
    let obj;
    if (!rowHandler[row]) {
      obj = { ...rowHandler, [row]: true };
    } else {
      obj = { ...rowHandler, [row]: false };
    }
    setRowHandler(obj);
  };
  return (
    <>
      <div className="row m-2" style={{ padding: "0px !important" }}>
        <Input
          type="text"
          className="form-control"
          id="PartyName"
          name="PartyName"
          lable="Party Name"
          onChange={handleSelectChange}
          value={formData?.PartyName}
          respclass="col-md-12 col-12 col-sm-12"
        />
        <Input
          type="number"
          className="form-control mt-2"
          id="MobileNo"
          name="MobileNo"
          lable="Mobile Number"
          onChange={(e) => {
            inputBoxValidation(
              MOBILE_NUMBER_VALIDATION_REGX,
              e,
              handleSelectChange
            );
          }}
          value={formData?.MobileNo}
          respclass="col-md-12 col-12 col-sm-12 "
        />
        <div
          className="col-md-12 col-12 col-sm-12"
          style={{ marginTop: "3px" }}
        >
          <Link
            className="fa fa-plus"
            onClick={() => {
              handlerow("show");
            }}
            style={{
              cursor: "pointer",
            }}
          >
             &nbsp;Add Address (Optional)
          </Link>
        </div>
        {rowHandler.show && (
          <>
            <Input
              type="text"
              className="form-control mt-2"
              id="BillingAddress"
              name="BillingAddress"
              lable="Billing Address"
              onChange={handleSelectChange}
              value={formData?.BillingAddress}
              respclass="col-md-12 col-12 col-sm-12"
            />
            <ReactSelect
              respclass="col-md-12 col-12 col-sm-12 mt-1"
              name="BillingState"
              placeholderName="State"
              dynamicOptions={[
                { label: "Delhi", value: "1" },
                { label: "UttarPradesh", value: "2" },
                { label: "Bihar", value: "3" },
              ]}
              handleChange={handleDeliveryChange}
              value={formData.BillingState}
              onKeyDown={Tabfunctionality}
              tabIndex="1"
            />
            <Input
              type="text"
              className="form-control mt-2"
              id="BillingCity"
              name="BillingCity"
              lable="City Name"
              onChange={handleSelectChange}
              value={formData?.BillingCity}
              respclass="col-md-12 col-12 col-sm-12"
            />
            <Input
              type="number"
              className="form-control mt-2"
              id="BillingPincode"
              name="BillingPincode"
              lable="Pincode"
              onChange={(e) => {
                inputBoxValidation(
                  PINCODE_VALIDATION_REGX,
                  e,
                  handleSelectChange
                );
              }}
              value={formData?.BillingPincode}
              respclass="col-md-12 col-12 col-sm-12"
            />
            <div className="search-col" style={{ marginLeft: "8px" }}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <label className="switch" style={{ marginTop: "7px" }}>
                  <input
                    type="checkbox"
                    name="IsActive"
                    checked={formData?.IsActive == "1" ? true : false}
                    onChange={handleSelectChange}
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
                  Shipping address same as billing address
                </span>
              </div>
            </div>
          </>
        )}

        {formData?.IsActive == true && (
          <>
            <Input
              type="text"
              className="form-control mt-2"
              id="ShippingAddress"
              name="ShippingAddress"
              lable="Shipping Address"
              onChange={handleSelectChange}
              value={formData?.ShippingAddress}
              respclass="col-md-12 col-12 col-sm-12"
            />
            <ReactSelect
              respclass="col-md-12 col-12 col-sm-12 mt-1"
              name="ShippingState"
              placeholderName="State"
              dynamicOptions={[
                { label: "Delhi", value: "1" },
                { label: "UttarPradesh", value: "2" },
                { label: "Bihar", value: "3" },
              ]}
              handleChange={handleDeliveryChange}
              value={formData.ShippingState}
              onKeyDown={Tabfunctionality}
              tabIndex="1"
            />
            <Input
              type="text"
              className="form-control mt-2"
              id="ShippingCity"
              name="ShippingCity"
              lable="City Name"
              onChange={handleSelectChange}
              value={formData?.ShippingCity}
              respclass="col-md-12 col-12 col-sm-12"
            />
            <Input
              type="number"
              className="form-control mt-2"
              id="ShippingPincode"
              name="ShippingPincode"
              lable="Pincode"
              onChange={(e) => {
                inputBoxValidation(
                  PINCODE_VALIDATION_REGX,
                  e,
                  handleSelectChange
                );
              }}
              value={formData?.ShippingPincode}
              respclass="col-md-12 col-12 col-sm-12"
            />
          </>
        )}
        <div
          className="col-md-12 col-12 col-sm-12"
          style={{ marginTop: "3px" }}
        >
          <Link
            className="fa fa-plus ml-0"
            onClick={() => {
              handlerow("show1");
            }}
            style={{
              cursor: "pointer",
            }}
          >
            {" "}
            Add GSTIN (Optional)
          </Link>
        </div>
        {rowHandler?.show1 && (
          <Input
            type="text"
            className="form-control mt-2"
            id="GSTNO"
            name="GSTNO"
            lable="GST Number"
            onChange={handleSelectChange}
            value={formData?.GSTNO}
            respclass="col-md-12 col-12 col-sm-12"
          />
        )}
        <div className="col-2 mt-2 ml-auto">
          <button className="btn btn-sm btn-info">Save</button>
        </div>
      </div>
    </>
  );
};

export default CreatePartyModal;
