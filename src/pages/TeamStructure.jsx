import React, { useEffect, useState } from "react";
import ReactSelect from "../components/formComponent/ReactSelect";
import { useTranslation } from "react-i18next";
import { axiosInstances } from "../networkServices/axiosInstance";
import { apiUrls } from "../networkServices/apiEndpoints";
import Heading from "../components/UI/Heading";
import OrganizationalChart from "./OrganizationalChart/OrganizationalChart";
import OrganizationalChart1 from "./OrganizationalChart1/OrganizationalChart1";

const TeamStructure = () => {
  const [t] = useTranslation();
  const [formData, setFormData] = useState({
    VerticalID: "",
    TeamID: "",
    WingID: "",
    POC1: "",
    POC2: "",
    POC3: "",
  });
  const [vertical, setVertical] = useState([]);
  const [team, setTeam] = useState([]);
  const [wing, setWing] = useState([]);
  const [poc1, setPoc1] = useState([]);
  const [poc2, setPoc2] = useState([]);
  const [poc3, setPoc3] = useState([]);

  const getVertical = () => {
    axiosInstances
      .post(apiUrls?.Vertical_Select, {})
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
    axiosInstances
      .post(apiUrls?.Team_Select, {})
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
    axiosInstances
      .post(apiUrls?.Wing_Select, {})
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
    axiosInstances
      .post(apiUrls?.POC_1_Select, {})
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

  const getPOC2 = () => {
    axiosInstances
      .post(apiUrls?.POC_2_Select, {})
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
    axiosInstances
      .post(apiUrls?.POC_3_Select, {})
      .then((res) => {
        const poc3s = res?.data?.data.map((item) => {
          return { label: item?.POC_3_Name, value: item?.POC_3_ID };
        });
        setPoc3(poc3s);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDeliveryChange = (name, e) => {
    setFormData({
      ...formData,
      [name]: e?.value || e,
    });
  };
  useEffect(() => {
    getTeam();
    getWing();
    getVertical();
    getPOC1();
    getPOC2();
    getPOC3();
  }, []);

  /////////////////////////////////////////////////////////////
  return (
    <>
      <div className="card">
        <Heading
          title={<span className="font-weight-bold m-1">Team Structure</span>}
        />
        <div className="row m-2">
          <ReactSelect
            respclass="col-xl-2 col-md-4 col-sm-6 col-12"
            name="VerticalID"
            placeholderName={t("Vertical")}
            dynamicOptions={vertical}
            value={formData?.VerticalID}
            handleChange={handleDeliveryChange}
          />
          <ReactSelect
            respclass="col-xl-2 col-md-4 col-sm-6 col-12"
            name="TeamID"
            placeholderName={t("Team")}
            dynamicOptions={team}
            value={formData?.TeamID}
            handleChange={handleDeliveryChange}
          />
          <ReactSelect
            respclass="col-xl-2 col-md-4 col-sm-6 col-12"
            name="WingID"
            placeholderName={t("Wing")}
            dynamicOptions={wing}
            value={formData?.WingID}
            handleChange={handleDeliveryChange}
          />
          {/* <ReactSelect
            respclass="col-xl-2 col-md-4 col-sm-6 col-12"
            name="POC1"
            placeholderName={t("POC1")}
            dynamicOptions={poc1}
            value={formData?.POC1}
            handleChange={handleDeliveryChange}
          />
          <ReactSelect
            respclass="col-xl-2 col-md-4 col-sm-6 col-12"
            name="POC2"
            placeholderName={t("POCII")}
            dynamicOptions={poc2}
            value={formData?.POC2}
            handleChange={handleDeliveryChange}
          />
          <ReactSelect
            respclass="col-xl-2 col-md-4 col-sm-6 col-12"
            name="POC3"
            placeholderName={t("POCIII")}
            dynamicOptions={poc3}
            value={formData?.POC3}
            handleChange={handleDeliveryChange}
          /> */}
          <div className="col-sm-2">
            <button
              className="btn btn-sm btn-primary ml-2 mt-0"
              // onClick={ handleViewSearch}
            >
              <i className="fa fa-search mr-1" aria-hidden="true"></i> Search
            </button>
          </div>
        </div>
      </div>
      <div className="card">
        <div className="row">
          {" "}
          <OrganizationalChart1 />
          {/* <OrganizationalChart /> */}
        </div>
      </div>
    </>
  );
};
export default TeamStructure;
