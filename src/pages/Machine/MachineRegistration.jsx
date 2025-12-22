import React, { useState } from "react";
import ReactSelect from "../../components/formComponent/ReactSelect";
import Heading from "../../components/UI/Heading";

const MachineRegistration = () => {
  const [formData, setFormData] = useState({
    BaseClass: "",
  });

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
        <Heading title={<span className="font-weight-bold">Machine Registration</span>}/> 
        <div className="row m-2">
          <ReactSelect
            respclass="col-xl-2 col-md-4 col-sm-6 col-12"
            name="BaseClass"
            placeholderName="Base Class"
            dynamicOptions={[
              { label: "BaseClass1", value: "BaseClass1" },
              { label: "BaseClass2", value: "BaseClass2" },
            ]}
            handleChange={handleDeliveryChange}
            value={formData.BaseClass}
          />

          <button className="btn btn-sm btn-success ml-3">Save</button>
        </div>
      </div>
    </>
  );
};

export default MachineRegistration;
