import React, { useState } from "react";
import Heading from "../components/UI/Heading";
import MasterType from "./MasterType";
import Master from "./Master";

const GlobalMaster = () => {
  const [activeTab, setActiveTab] = useState("MasterType"); // Default to MasterType

  return (
    <>
      <div className="">
        <Heading 
          title="Global Master" 
          isBreadcrumb={true}  
          secondTitle={
            <div style={{ display: "flex" }}>
              <button 
                className={`btn btn-sm ${activeTab === "MasterType" ? "btn-success" : "btn-secondary"}`} 
                onClick={() => setActiveTab("MasterType")}
              >
                Master Type
              </button>
              <button 
                className={`btn btn-sm ml-2 ${activeTab === "Master" ? "btn-success" : "btn-secondary"}`} 
                onClick={() => setActiveTab("Master")}
              >
                Master
              </button>
            </div>
          }
        />
        {activeTab === "MasterType" ? <MasterType /> : <Master />}
      </div>
    </>
  );
};

export default GlobalMaster;
