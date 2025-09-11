import React, { useEffect } from "react";
import { FaInfoCircle } from "react-icons/fa";
import { useState } from "react";
import Tables from "../components/UI/customTable";
import Heading from "../components/UI/Heading";
import { ImplementationModalInstallmentStatusTHEAD, ImplementationModalMachineStatusTHEAD, ImplementationModalStatusTHEAD } from "../components/modalComponent/Utils/HealperThead";


const ImplementationModuleModal = () => {
  const [tableData, setTableData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;
  const totalPages = Math.ceil(tableData?.length / rowsPerPage);
  const currentData = tableData?.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

    const handlePageChange = (newPage) => {
      if (newPage > 0 && newPage <= totalPages) {
        setCurrentPage(newPage);
      }
    };
  useEffect(() => {
    // Populate tableData with dummy data
    setTableData([
      {
        details: "10",
        D: "Yes",
        L: "Yes",
        AL: "No",
      },
      {
        details: "15",
        D: "Yes",
        L: "No",
        AL: "Yes",
      },
      {
        details: "20",
        D: "No",
        L: "No",
        AL: "Yes",
      },
      // Add more dummy data as needed
    ]);
  }, []);
  return (
    <>
      <div className="card">
        <Heading title={<span style={{fontWeight:"bold"}}>SEARCH DETAILS</span>} />
          <Tables
            thead={ImplementationModalStatusTHEAD}
            tbody={tableData?.map((ele, index) => ({
              "S.No.": (currentPage - 1) * rowsPerPage + index + 1,
              Details: ele?.details,
              D: ele?.D,
              L: ele?.L,
              AL: ele?.AL,
            }))}
          />
          <div className="pagination" style={{ float: "right" , display:"flex", justifyContent:"flex-end" }}>
              <div>
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
            </div>
        </div>

        <div className="card mt-2">
         <Heading title={<span style={{fontWeight:"bold"}}>INSTALLMENT STATUS</span>} />
          <Tables
            thead={ImplementationModalInstallmentStatusTHEAD}
            tbody={tableData?.map((ele, index) => ({
              "S.No.": (currentPage - 1) * rowsPerPage + index + 1,
              "Inst Amt": ele?.details,
              "Inst Date": ele?.D,
              Mode: ele?.D,
              R: ele?.L,
              AL: ele?.AL,
            }))}
          />
          <div className="pagination" style={{ float: "right" , display:"flex", justifyContent:"flex-end"}}>
              <div>
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
            </div>
        </div>

        <div className="card mt-2">
         <Heading title={<span style={{fontWeight:"bold" ,display:"flex", justifyContent:"flex-end"}}>MACHINE STATUS</span>} />
          <Tables
            thead={ImplementationModalMachineStatusTHEAD}
            tbody={tableData?.map((ele, index) => ({
              "S.No.": (currentPage - 1) * rowsPerPage + index + 1,
              "Machine Name": ele?.details,
              "Interface Type": ele?.D,
              L: ele?.L,
              AL: ele?.AL,
            }))}
          />
          <div className="pagination" style={{ float: "right" , display:"flex", justifyContent:"flex-end"}}>
              <div>
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
            </div>
        </div>
    </> 
  );
};

export default ImplementationModuleModal;
