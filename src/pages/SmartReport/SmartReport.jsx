// import React, { useEffect, useState } from "react";
// import { axiosInstances } from "../../networkServices/axiosInstance";
// import { apiUrls } from "../../networkServices/apiEndpoints";
// import { toast } from "react-toastify";
// import Heading from "../../components/UI/Heading";

// const SmartReport = ({ data, handleViewProject }) => {
//   const [formData, setFormData] = useState({
//     CentreMaster: "0",
//     Investigation: "0",
//     Description: "0",
//     RiskFactor: "0",
//     QRCode: "0",
//     DoctorSignature: "0",
//     ReportHeader: "0",
//   });

//   const handleSelectChange = (e) => {
//     const { name, checked } = e.target;
//     const value = checked ? "1" : "0";

//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   return (
//     <>
//       <div className="card">
//         <Heading isBreadcrumb={true} />
//         <div className="row m-2">
//           <div
//             className="search-col"
//             style={{
//               marginLeft: "9px",
//               display: "flex",
//               marginRight: "auto",
//               justifyContent: "space-between",
//               width: "100%",
//             }}
//           >
//             {[0, 1, 2, 3, 4, 5].map((col) => (
//               <div
//                 key={col}
//                 style={{ display: "flex", flexDirection: "row", flex: 1 }}
//               >
//                 {[
//                   { name: "CentreMaster", label: "CentreMaster" },
//                   { name: "Investigation", label: "Investigation" },
//                   { name: "Description", label: "Description" },
//                   {
//                     name: "RiskFactor",
//                     label: "RiskFactor",
//                   },
//                   {
//                     name: "QRCode",
//                     label: "QRCode",
//                   },
//                   {
//                     name: "DoctorSignature",
//                     label: "DoctorSignature",
//                   },
//                   {
//                     name: "ReportHeader",
//                     label: "ReportHeader",
//                   },
//                 ]
//                   .slice(col * Math.ceil(11 / 2), (col + 1) * Math.ceil(11 / 2))
//                   .map((item, idx) => (
//                     <div
//                       key={idx}
//                       style={{
//                         display: "flex",
//                         alignItems: "center",
//                         marginBottom: "10px",
//                       }}
//                     >
//                       <label className="switch" style={{ marginTop: "7px" }}>
//                         <input
//                           type="checkbox"
//                           name={item.name}
//                           checked={formData[item.name] == "1"}
//                           onChange={handleSelectChange}
//                         />
//                         <span className="slider"></span>
//                       </label>
//                       <span
//                         style={{
//                           marginLeft: "7px",
//                           marginRight: "10px",
//                           fontSize: "12px",
//                         }}
//                       >
//                         {item.label}
//                       </span>
//                     </div>
//                   ))}
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default SmartReport;

import React, { useState } from "react";
import Heading from "../../components/UI/Heading";
import CentreMasterPage from "./CentreMasterPage";
import InvestigationPage from "./InvestigationPage";
import "./SmartReport.css";
import DescriptionPage from "./DescriptionPage";
import RiskFactorPage from "./RiskFactorPage";
import QRCode from "./QRCode";
import DoctorSignaturePage from "./DoctorSignaturePage";
import ReportHeaderPage from "./ReportHeaderPage";

const SmartReport = ({ data, handleViewProject }) => {
  const [formData, setFormData] = useState({
    CentreMaster: "0",
    Investigation: "0",
    Description: "0",
    RiskFactor: "0",
    QRCode: "0",
    DoctorSignature: "0",
    ReportHeader: "0",
  });

  // State to track which pages are open
  const [openPages, setOpenPages] = useState({});

  // Configuration for all toggleable pages
  const pageConfig = [
    {
      name: "ProjectMapping",
      label: "ProjectMapping",
      component: CentreMasterPage,
    },
    {
      name: "Investigation",
      label: "Investigation",
      component: InvestigationPage,
    },
    {
      name: "Description",
      label: "Description",
      component: DescriptionPage,
    },
    {
      name: "RiskFactor",
      label: "RiskFactor",
      component: RiskFactorPage,
    },
    {
      name: "QRCode",
      label: "QRCode",
      component: QRCode,
    },
    {
      name: "DoctorSignature",
      label: "DoctorSignature",
      component: DoctorSignaturePage,
    },
    {
      name: "ReportHeader",
      label: "ReportHeader",
      component: ReportHeaderPage,
    },
  ];

  const handleSelectChange = (e) => {
    const { name, checked } = e.target;
    const value = checked ? "1" : "0";

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Open/close the corresponding page
    setOpenPages((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  // Render the active pages
  const renderActivePages = () => {
    return pageConfig
      .map((page) => {
        if (openPages[page.name]) {
          const PageComponent = page.component;
          return (
            <div key={page.name} className="">
              <div className="">
                <div className="card-header d-flex justify-content-between align-items-center">
                  <h5 className="mb-0 font-weight-bold">{page.label}</h5>
                  <button
                    className="btn btn-sm btn-danger ml-auto"
                    onClick={() => {
                      setFormData((prev) => ({ ...prev, [page.name]: "0" }));
                      setOpenPages((prev) => ({ ...prev, [page.name]: false }));
                    }}
                  >
                    Close
                  </button>
                </div>
                <div className="">
                  <PageComponent data={data} />
                </div>
              </div>
            </div>
          );
        }
        return null;
      })
      .filter(Boolean);
  };

  return (
    <>
      <div className="card">
        <Heading isBreadcrumb={true} />
        <div className="row m-0">
          <div
            className="search-col"
            style={{
              marginLeft: "9px",
              display: "flex",
              marginRight: "auto",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            {[0, 1, 2, 3, 4, 5].map((col) => (
              <div
                key={col}
                style={{ display: "flex", flexDirection: "row", flex: 1 }}
              >
                {pageConfig
                  .slice(col * Math.ceil(11 / 2), (col + 1) * Math.ceil(11 / 2))
                  .map((item, idx) => (
                    <div
                      key={idx}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginBottom: "0px",
                      }}
                    >
                      <label className="switch" style={{ marginTop: "7px" }}>
                        <input
                          type="checkbox"
                          name={item.name}
                          checked={formData[item.name] === "1"}
                          onChange={handleSelectChange}
                        />
                        <span className="slider"></span>
                      </label>
                      <span
                        style={{
                          marginLeft: "7px",
                          marginRight: "10px",
                          fontSize: "12px",
                        }}
                      >
                        {item.label}
                      </span>
                    </div>
                  ))}
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Render active pages below the toggles */}
      <div className="card mt-1">{renderActivePages()}</div>
    </>
  );
};

export default SmartReport;
