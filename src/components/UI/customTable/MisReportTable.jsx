import React, { useEffect, useState } from "react";

import { Tooltip } from "primereact/tooltip";
// import { BillPRINTTYPE, ReceiptPRINTTYPE } from "../../../../utils/constant";
import Tables from ".";
import { useTranslation } from "react-i18next";
import AutoBackupEditModal from "../../modalComponent/Utils/AutoBackupEditModal";
import Modal from "../../modalComponent/Modal";
import AutoBackupEditTable from "./AutoBackupEditTable";
import AutoBackupShowLogModal from "../../modalComponent/Utils/AutoBackupShowLogModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const MisReportTable = (props) => {
  const [t] = useTranslation();
  const { tbody = [...tbody], values, handleCustomSelect, THEAD } = props;

  const [visible, setVisible] = useState({
    showVisible: false,
    showData: {},
  });
  const [showLogVisisble, setShowLogVisisble] = useState({
    showLog: false,
    showLogData: {},
  });

  const shortenName = (name) => {
    return name.length > 15 ? name.substring(0, 25) + "..." : name;
  };
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 18;
  const totalPages = Math.ceil(tbody?.length / rowsPerPage);
  const currentData = tbody.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );
  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };
  return (
    <>
      {visible?.showVisible && (
        <Modal modalWidth={"1000px"} visible={visible} setVisible={setVisible} Header="Update Detail">
          <AutoBackupEditModal visible={visible} setVisible={setVisible} />
        </Modal>
      )}
      {showLogVisisble?.showLog && (
        <Modal
          modalWidth={"1000px"}
          visible={showLogVisisble}
          setVisible={setShowLogVisisble}
          Header="ShowLog Update Detail"
        >
          <AutoBackupShowLogModal
            visible={showLogVisisble}
            setVisible={setShowLogVisisble}
          />
        </Modal>
      )}

      {tbody?.map((item, index) => (
        <Tooltip
          key={index}
          target={`#doctorName-${index}, #visitType-${index}`}
          position="top"
        />
      ))}
    
      <Tables
        thead={THEAD}
        tbody={currentData?.map((ele, index) => ({
          "S.No.": (currentPage - 1) * rowsPerPage + index + 1,
          Vertical: ele?.Vertical,
          Team: ele?.Team,
          Wing: ele.Wing,
          "Project Name": (
            <span
              id={`projectName-${index}`}
              targrt={`projectName-${index}`}
              title={ele?.ProjectName}
            >
              {shortenName(ele?.ProjectName)}
            </span>
          ),
          "Last AB Date": ele?.lastdate,
          "Last AB Done By": ele?.username,
          SPOC_Name: ele?.spoc_name,
          SPOC_Email: ele?.SPOC_EmailID,
          SPOC_Mobile: ele?.spoc_mobile,

          Edit: (
            <i className="fa fa-edit" onClick={() => {
              setVisible({ showVisible: true, showData: ele });
            }} style={{ marginLeft: "10px", color: "#3d3c3a" }}></i>

          ),
          "Show Log": (
            <i
              className="fa fa-book"
              onClick={() => {
                setShowLogVisisble({ showLog: true, showLogData: ele });
              }}
              style={{ marginLeft: "10px", color: "#3d3c3a" }}
            ></i>
          ),
          colorcode: ele?.colorcode,
        }))}
        // getRowClass={}
        tableHeight={"tableHeight"}
        style={{ height: "auto" }}
      />
      <div className="pagination" style={{ marginLeft: "auto", float: "right" }}>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </>
  );
};

export default MisReportTable;
