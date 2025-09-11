import React, { useState } from "react";
import Input from "../../components/formComponent/Input";
import BrowseButton from "../../components/formComponent/BrowseButton";

const UploadTaxInvoiceModal = () => {
  const [formData, setFormData] = useState({
    Name: "",
    Document_Base64: "",
    FileExtension: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e?.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? (checked ? "1" : "0") : value,
    });
  };
  const handleImageChange = (e) => {
    const file = e?.target?.files[0];

    if (file) {
      // Check if file size exceeds 5MB (5 * 1024 * 1024 bytes)
      const maxSize = 5 * 1024 * 1024;
      if (file.size > maxSize) {
        alert("File size exceeds 5MB. Please choose a smaller file.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader?.result.split(",")[1];
        const fileExtension = file?.name.split(".").pop();
        setFormData({
          ...formData,
          SelectFile: file,
          Document_Base64: base64String,
          FileExtension: fileExtension,
        });
      };
      reader.readAsDataURL(file); // Convert file to base64
    }
  };
  return (
    <>
      <div className="row m-2">
        <span className="ml-2" style={{ fontWeight: "bold" }}>
          Project Name :&nbsp; {"AAAAAAA"}
        </span>
      </div>
      <div className="row m-2">
        <Input
          type="text"
          respclass="col-xl-5 col-md-4 col-sm-6 col-12"
          className="form-control"
          id="Name"
          name="Name"
          lable="Name"
          placeholder=""
          onChange={handleChange}
          value={formData?.Name}
        />
        <BrowseButton handleImageChange={handleImageChange} accept="image/*" />
        <div className="col-2">
          <button className="btn btn-sm btn-success">Save</button>
        </div>
      </div>
    </>
  );
};
export default UploadTaxInvoiceModal;
