import React, { useEffect, useState } from "react";
import Heading from "../components/UI/Heading";
import { useCryptoLocalStorage } from "../utils/hooks/useCryptoLocalStorage";
import { apiUrls } from "../networkServices/apiEndpoints";
import { headers } from "../utils/apitools";
import ReactSelect from "../components/formComponent/ReactSelect";
import axios from "axios";

const AddDashboardModal = ({ visible, setVisible }) => {
  const [dashboard, setDashboard] = useState([]);

  const [formData, setFormData] = useState({
    Dashboard: "",
  });

  const getDashboard = () => {
    let form = new FormData();
    form.append("ID", useCryptoLocalStorage("user_Data", "get", "ID")),
      axios
        .post(apiUrls?.kk, form, { headers })
        .then((res) => {
          const teams = res?.data.data.map((item) => {
            return { label: item?.Team, value: item?.TeamID };
          });
          setTeam(teams);
        })
        .catch((err) => {
          console.log(err);
        });
  };
  const handleDeliveryChange = (name, e) => {
    const { value } = e;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  useEffect(() => {
    getDashboard();
  });
  return (
    <>
      <div className="card p-2">
        <span style={{ fontWeight: "bold" }}>
          Employee Name: &nbsp; {visible?.showData?.realname}
        </span>
      </div>
      <div className="card">
        <div className="row p-2">
          <ReactSelect
            respclass="col-xl-4 col-md-4 col-sm-6 col-12"
            name="Dashboard"
            placeholderName="Dashboard"
            dynamicOptions={dashboard}
            handleChange={handleDeliveryChange}
            value={formData.Dashboard}
          />

          <button className="btn btn-sm btn-primary">Add </button>
        </div>
      </div>
    </>
  );
};
export default AddDashboardModal;
