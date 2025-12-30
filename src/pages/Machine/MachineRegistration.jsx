import React, { useEffect, useState } from "react";
import ReactSelect from "../../components/formComponent/ReactSelect";
import Heading from "../../components/UI/Heading";
import { axiosInstances } from "../../networkServices/axiosInstance";
import { apiUrls } from "../../networkServices/apiEndpoints";
import { useTranslation } from "react-i18next";

const MachineRegistration = () => {
  const [t] = useTranslation();
  const [project, setProject] = useState([]);
  const [formData, setFormData] = useState({
    BaseClass: "",
    ProjectID: "",
  });

  const handleDeliveryChange = (name, e) => {
    const { value } = e;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const getProject = () => {
    axiosInstances
      .post(apiUrls.ProjectSelect, {
        ProjectID: 0,
        IsMaster: "0",
        VerticalID: 0,
        TeamID: 0,
        WingID: 0,
      })
      .then((res) => {
        const datas = res?.data?.data;
        const poc3s = datas?.map((item) => {
          return { label: item?.Project, value: item?.ProjectId };
        });
        setProject(poc3s);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getProject();
  }, []);
  return (
    <>
      <div className="card">
        <Heading
          title={<span className="font-weight-bold">Machine Registration</span>}
        />
        <div className="row m-2">
          <ReactSelect
            respclass="col-xl-2 col-md-4 col-sm-6 col-12"
            name="ProjectID"
            placeholderName={t("Client")}
            dynamicOptions={project}
            value={formData?.ProjectID}
            handleChange={handleDeliveryChange}
          />
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
