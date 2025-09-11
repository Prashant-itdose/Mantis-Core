import React, { useEffect, useState } from "react";
import ReactSelect from "../components/formComponent/ReactSelect";
import { apiUrls } from "../networkServices/apiEndpoints";
import { headers } from "../utils/apitools";
import axios from "axios";
import Input from "../components/formComponent/Input";
import { useCryptoLocalStorage } from "../utils/hooks/useCryptoLocalStorage";

const AddProjectModal = (ele) => {
  const [tableData, setTableData] = useState([]);
  const [vertical, setVertical] = useState([]);
  const [loading, setLoading] = useState(false);
  const [team, setTeam] = useState([]);
  const [wing, setWing] = useState([]);
  const [poc1, setPoc1] = useState([]);
  const [poc2, setPoc2] = useState([]);
  const [poc3, setPoc3] = useState([]);
  const [project, setProject] = useState([]);
  const [formData, setFormData] = useState({
    ProjectID: "",
    VerticalID: "",
    TeamID: "",
    WingID: "",
    POC1: "",
    FromDate: new Date(),
    ToDate: new Date(),
    POC2: "",
    POC3: "",
    Status: "ALL",
    DateType: "",
    Address: "",
    SalesManager: "",
  });

  const getVertical = () => {
    let form = new FormData();
    form.append("Id", useCryptoLocalStorage("user_Data", "get", "ID")),
      axios
        .post(apiUrls?.Vertical_Select, form, { headers })
        .then((res) => {
          const verticals = res?.data.data.map((item) => {
            return { label: item?.Vertical, value: item?.VerticalID };
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
            return { label: item?.Team, value: item?.TeamID };
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
            return { label: item?.Wing, value: item?.WingID };
          });
          setWing(wings);
        })
        .catch((err) => {
          console.log(err);
        });
  };
  const getPOC1 = () => {
    let form = new FormData();
    form.append("ID", useCryptoLocalStorage("user_Data", "get", "ID")),
      axios
        .post(apiUrls?.POC_1_Select, form, { headers })
        .then((res) => {
          const poc1s = res?.data.data.map((item) => {
            return { label: item?.POC_1_Name, value: item?.POC_1_ID };
          });
          setPoc1(poc1s);
        })
        .catch((err) => {
          console.log(err);
        });
  };
  const handleChange = (e) => {
    const { name, value, type, checked } = e?.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? (checked ? "1" : "0") : value,
    });
  };

  const getPOC2 = () => {
    let form = new FormData();
    form.append("ID", useCryptoLocalStorage("user_Data", "get", "ID")),
      axios
        .post(apiUrls?.POC_2_Select, form, { headers })
        .then((res) => {
          const poc2s = res?.data.data.map((item) => {
            return { label: item?.POC_2_Name, value: item?.POC_2_ID };
          });
          setPoc2(poc2s);
        })
        .catch((err) => {
          console.log(err);
        });
  };
  const getPOC3 = () => {
    let form = new FormData();
    form.append("ID", useCryptoLocalStorage("user_Data", "get", "ID")),
      axios
        .post(apiUrls?.POC_3_Select, form, { headers })
        .then((res) => {
          const poc3s = res?.data.data.map((item) => {
            return { label: item?.POC_3_Name, value: item?.POC_3_ID };
          });
          setPoc3(poc3s);
        })
        .catch((err) => {
          console.log(err);
        });
  };
  const getProject = () => {
    let form = new FormData();
    form.append("ID", useCryptoLocalStorage("user_Data", "get", "ID")),
      form.append("LoginName", useCryptoLocalStorage("user_Data", "get", "realname") ),
      axios
        .post(apiUrls?.ProjectSelect, form, { headers })
        .then((res) => {
          const poc3s = res?.data.data.map((item) => {
            return { label: item?.Project, value: item?.ProjectId };
          });
          setProject(poc3s);
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
  const handleSelectChange = (e) => {
    const { name, value, checked, type } = e?.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? (checked ? "1" : "0") : value,
    });
  };
  useEffect(() => {
    getPOC1();
    getPOC2();
    getPOC3();
    getProject();
    getTeam();
    getVertical();
  }, []);
  return (
    <>
      {/* <div className="row ml-2">
        <span style={{ fontWeight: "bold" }}>
          Employee Name: &nbsp; {ele?.visible?.showData?.realname}
        </span>
      </div> */}
      <div className="row m-2">
        <ReactSelect
          respclass="col-xl-4 col-md-4 col-sm-6 col-12"
          name="ProjectID"
          placeholderName="Project"
          dynamicOptions={project}
          handleChange={handleDeliveryChange}
          value={formData.ProjectID}
        />
        <Input
          type="text"
          className="form-control"
          id="Address"
          name="Address"
          lable="Address"
          placeholder=" "
          max={20}
          onChange={handleSelectChange}
          value={formData?.Address}
          respclass="col-xl-4 col-md-4 col-sm-4 col-12"
        />
        <ReactSelect
          respclass="col-xl-4 col-md-4 col-sm-6 col-12"
          name="VerticalID"
          placeholderName="Vertical"
          dynamicOptions={vertical}
          handleChange={handleDeliveryChange}
          value={formData.VerticalID}
        />
        <ReactSelect
          respclass="col-xl-4 col-md-4 col-sm-6 col-12"
          name="TeamID"
          placeholderName="Team"
          dynamicOptions={team}
          handleChange={handleDeliveryChange}
          value={formData.TeamID}
        />
        <ReactSelect
          respclass="col-xl-4 col-md-4 col-sm-6 col-12"
          name="WingID"
          placeholderName="Wing"
          dynamicOptions={wing}
          handleChange={handleDeliveryChange}
          value={formData.WingID}
        />
        <ReactSelect
          respclass="col-xl-4 col-md-4 col-sm-6 col-12"
          name="POC1"
          placeholderName="POC1"
          dynamicOptions={poc1}
          handleChange={handleDeliveryChange}
          value={formData.POC1}
        />
        <ReactSelect
          respclass="col-xl-4 col-md-4 col-sm-6 col-12"
          name="POC2"
          placeholderName="POC2"
          dynamicOptions={poc2}
          handleChange={handleDeliveryChange}
          value={formData.POC2}
        />
        <ReactSelect
          respclass="col-xl-4 col-md-4 col-sm-6 col-12"
          name="POC3"
          placeholderName="POC3"
          dynamicOptions={poc3}
          handleChange={handleDeliveryChange}
          value={formData.POC3}
        />

        <div className="col-2">
          <button className="btn btn-sm btn-success">Save</button>
        </div>
      </div>
    </>
  );
};

export default AddProjectModal;
