import React, { useState } from "react";
import Input from "../../components/formComponent/Input";
import TextAreaInput from "../../components/formComponent/TextAreaInput";

const EmailTaxInvoiceModal = () => {
  const [formData, setFormData] = useState({
    EmailTo: "",
    EmailCc: "",
    Subject: "",
    Remark: "",
  });
  const handleChange = (e) => {
    const { name, value, type, checked } = e?.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? (checked ? "1" : "0") : value,
    });
  };
  return (
    <>
      <div className="row m-2">
        <span className="ml-2" style={{ fontWeight: "bold" }}>
          Project Name &nbsp;: {"AAAAAAA"}
        </span>
      </div>
      <div className="row m-2">
        <Input
          type="text"
          respclass="col-xl-12 col-md-4 col-sm-6 col-12"
          className="form-control"
          id="EmailTo"
          name="EmailTo"
          lable="To"
          placeholder=""
          onChange={handleChange}
          value={formData?.EmailTo}
        />
        <Input
          type="text"
          respclass="col-xl-12 col-md-4 col-sm-6 col-12"
          className="form-control mt-1"
          id="EmailCc"
          name="EmailCc"
          lable="Cc"
          placeholder=""
          onChange={handleChange}
          value={formData?.EmailCc}
        />
        <Input
          type="text"
          respclass="col-xl-12 col-md-4 col-sm-6 col-12"
          className="form-control mt-1"
          id="Subject"
          name="Subject"
          lable="Subject"
          placeholder=""
          onChange={handleChange}
          value={formData?.Subject}
        />
        <TextAreaInput
          lable="Remark"
          placeholder="Remark"
           respclass="col-xl-12 col-md-4 col-sm-6 col-12"
          className="w-100 mt-1"
          id="Remark"
          name="Remark"
          value={formData?.Remark}
          maxLength={200}
          onChange={handleChange}
        />
        <div className="col-2">
          <button className="btn btn-sm btn-success">Send</button>
        </div>
      </div>
    </>
  );
};

export default EmailTaxInvoiceModal;
