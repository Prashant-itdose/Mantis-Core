import React, { useState } from "react";
import Heading from "../../components/UI/Heading";
import Input from "../../components/formComponent/Input";

const BaseClassRegister = () => {
  const [formData, setFormData] = useState({
    BaseClassName: "",
    ConnectionString: "",
    ConnectionStringlocal: "",
    Mode: "",
    BaudRate: "",
    Parity: "",
    DataBit: "",
    StopBit: "",
    Machine: "",
    BaseClass: "",
    Suffix: "",
    CreateLog: "",
    IPAddress: "",
    PortNo: "",
    BookingService: "",
    OutboundIP: "",
    OutboundPort: "",
    SyncInterval: "",
    ClientSettingsProvider: "",
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
      [name]: type === "checkbox" ? (checked ? 1 : 0) : value,
    });
  };
  const searchHandleChange = (e) => {
    const { name, value } = e?.target;
    setFormData({ ...formData, [name]: value });
  };
  return (
    <>
      <div className="card">
        <Heading
          title={
            <span className="font-weight-old">Base Class Registration</span>
          }
        />
        <div className="row p-2">
          <Input
            type="text"
            respclass="col-xl-2 col-md-4 col-sm-6 col-12"
            className="form-control"
            placeholder=" "
            lable="Base Class"
            id="BaseClassName"
            name="BaseClassName"
            value={formData?.BaseClassName}
            onChange={handleSelectChange}
          />
          <Input
            type="text"
            respclass="col-xl-2 col-md-4 col-sm-6 col-12"
            className="form-control"
            placeholder=" "
            lable="Connection String"
            id="ConnectionString"
            name="ConnectionString"
            value={formData?.ConnectionString}
            onChange={handleSelectChange}
          />
          <Input
            type="text"
            respclass="col-xl-2 col-md-4 col-sm-6 col-12"
            className="form-control"
            placeholder=" "
            lable="Connection String local"
            id="ConnectionStringlocal"
            name="ConnectionStringlocal"
            value={formData?.ConnectionStringlocal}
            onChange={handleSelectChange}
          />
          <Input
            type="text"
            respclass="col-xl-2 col-md-4 col-sm-6 col-12"
            className="form-control"
            placeholder=" "
            lable="Mode"
            id="Mode"
            name="Mode"
            value={formData?.Mode}
            onChange={handleSelectChange}
          />
          <Input
            type="text"
            respclass="col-xl-2 col-md-4 col-sm-6 col-12"
            className="form-control"
            placeholder=" "
            lable="Port Name"
            id="PortName"
            name="PortName"
            value={formData?.PortName}
            onChange={handleSelectChange}
          />
          <Input
            type="text"
            respclass="col-xl-2 col-md-4 col-sm-6 col-12"
            className="form-control"
            placeholder=" "
            lable="Baud Rate"
            id="BaudRate"
            name="BaudRate"
            value={formData?.BaudRate}
            onChange={handleSelectChange}
          />
          <Input
            type="text"
            respclass="col-xl-2 col-md-4 col-sm-6 col-12 mt-2"
            className="form-control"
            placeholder=" "
            lable="Parity"
            id="Parity"
            name="Parity"
            value={formData?.Parity}
            onChange={handleSelectChange}
          />
          <Input
            type="text"
            respclass="col-xl-2 col-md-4 col-sm-6 col-12 mt-2"
            className="form-control"
            placeholder=" "
            lable="DataBit"
            id="DataBit"
            name="DataBit"
            value={formData?.DataBit}
            onChange={handleSelectChange}
          />
          <Input
            type="text"
            respclass="col-xl-2 col-md-4 col-sm-6 col-12 mt-2"
            className="form-control"
            placeholder=" "
            lable="StopBit"
            id="StopBit"
            name="StopBit"
            value={formData?.StopBit}
            onChange={handleSelectChange}
          />
          <Input
            type="text"
            respclass="col-xl-2 col-md-4 col-sm-6 col-12 mt-2"
            className="form-control"
            placeholder=" "
            lable="Machine"
            id="Machine"
            name="Machine"
            value={formData?.Machine}
            onChange={handleSelectChange}
          />
          {/* <Input
            type="text"
            respclass="col-xl-2 col-md-4 col-sm-6 col-12 mt-2"
            className="form-control"
            placeholder=" "
            lable="BaseClass"
            id="BaseClass"
            name="BaseClass"
            value={formData?.BaseClass}
            onChange={handleSelectChange}
          /> */}
          <Input
            type="text"
            respclass="col-xl-2 col-md-4 col-sm-6 col-12 mt-2"
            className="form-control"
            placeholder=" "
            lable="Suffix"
            id="Suffix"
            name="Suffix"
            value={formData?.Suffix}
            onChange={handleSelectChange}
          />
          <Input
            type="text"
            respclass="col-xl-2 col-md-4 col-sm-6 col-12 mt-2"
            className="form-control"
            placeholder=" "
            lable="CreateLog"
            id="CreateLog"
            name="CreateLog"
            value={formData?.CreateLog}
            onChange={handleSelectChange}
          />
          <Input
            type="text"
            respclass="col-xl-2 col-md-4 col-sm-6 col-12 mt-2"
            className="form-control"
            placeholder=" "
            lable="IPAddress"
            id="IPAddress"
            name="IPAddress"
            value={formData?.IPAddress}
            onChange={handleSelectChange}
          />
          <Input
            type="text"
            respclass="col-xl-2 col-md-4 col-sm-6 col-12 mt-2"
            className="form-control"
            placeholder=" "
            lable="Port No."
            id="PortNo"
            name="PortNo"
            value={formData?.PortNo}
            onChange={handleSelectChange}
          />
          <Input
            type="text"
            respclass="col-xl-2 col-md-4 col-sm-6 col-12 mt-2"
            className="form-control"
            placeholder=" "
            lable="Booking Service"
            id="BookingService"
            name="BookingService"
            value={formData?.BookingService}
            onChange={handleSelectChange}
          />
          <Input
            type="text"
            respclass="col-xl-2 col-md-4 col-sm-6 col-12 mt-2"
            className="form-control"
            placeholder=" "
            lable="Outbound IP"
            id="OutboundIP"
            name="OutboundIP"
            value={formData?.OutboundIP}
            onChange={handleSelectChange}
          />
          <Input
            type="text"
            respclass="col-xl-2 col-md-4 col-sm-6 col-12 mt-2"
            className="form-control"
            placeholder=" "
            lable="Outbound Port"
            id="OutboundPort"
            name="OutboundPort"
            value={formData?.OutboundPort}
            onChange={handleSelectChange}
          />
          <Input
            type="text"
            respclass="col-xl-2 col-md-4 col-sm-6 col-12 mt-2"
            className="form-control"
            placeholder=" "
            lable="Sync Interval"
            id="SyncInterval"
            name="SyncInterval"
            value={formData?.SyncInterval}
            onChange={handleSelectChange}
          />
          <Input
            type="text"
            respclass="col-xl-2 col-md-4 col-sm-6 col-12 mt-2"
            className="form-control"
            placeholder=" "
            lable="Client Settings Provider"
            id="ClientSettingsProvider"
            name="ClientSettingsProvider"
            value={formData?.ClientSettingsProvider}
            onChange={handleSelectChange}
          />

          <button className="btn btn-sm btn-success ml-3 mt-2">Save</button>
        </div>
      </div>
    </>
  );
};

export default BaseClassRegister;
