// import React, { useState } from "react";
// // import Modal from "../../components/ModalComonent/Modal";
// import Tables from "./ExcelViewTable";
// import { Button } from "react-bootstrap";
// import { Dialog } from "primereact/dialog";
// import "./ExcelImport.css";
// import { useCryptoLocalStorage } from "../../utils/hooks/useCryptoLocalStorage";

// const ExcelPreviewModal = ({ excelJsonData, fileName = "" }) => {
//   const theme = useCryptoLocalStorage(
//       "user_Data",
//       "get",
//       "theme"
//     );

//   // Function to check if cell is empty
//   const isEmptyCell = (cell) => {
//     return cell === null && cell === undefined && cell === "";
//   };

//   console.log("excelJsonData", excelJsonData);

//   const handleModalState = () => {
//     setShowModal(true);
//   };

//   const [showModal, setShowModal] = useState(false);
//   const onHideModal = () => {
//     setShowModal(false);
//   };

//   return (
//     <>
//       <Dialog
//         header={`${fileName} - Preview`}
//         visible={showModal}
//         onHide={onHideModal}
//         className={`${theme}`}
//         style={{ width: "60vw" }}
//         breakpoints={{ "98%": "59vw" }}
//         footer={
//           <div className="flex justify-end p-2 border-t bg-white sticky bottom-0">
//             <Button variant="secondary" className="px-4" onClick={onHideModal}>
//               Close
//             </Button>
//           </div>
//         }
//       >
//         <Tables
//           thead={excelJsonData?.[0]?.map((header) => String(header))}
//           tbody={excelJsonData?.slice(1)?.map((row) =>
//             row.map((cell) => {
//               if (isEmptyCell(cell)) {
//                 return (
//                   <span
//                     style={{
//                       border: "1px solid red",
//                       display: "inline-block",
//                       padding: "2px",
//                     }}
//                   >
//                     {cell || ""}
//                   </span>
//                 );
//               }
//               return String(cell);
//             }),
//           )}
//         />
//       </Dialog>
//       <button onClick={handleModalState} className="btn p-0 btn_border_right">
//         <i className="fa fa-eye text-white" aria-hidden="true"></i>
//       </button>
//     </>
//   );
// };

// export default ExcelPreviewModal;

import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { Dialog } from "primereact/dialog";
import Tables from "./ExcelViewTable";
import PropTypes from "prop-types";
import { useCryptoLocalStorage } from "../../utils/hooks/useCryptoLocalStorage";

const ExcelPreviewModal = ({ excelJsonData = [], fileName = "" }) => {
  const [showModal, setShowModal] = useState(false);
  const theme = useCryptoLocalStorage("user_Data", "get", "theme");
  const headers = excelJsonData?.[0] || [];
  const bodyRows = excelJsonData?.slice(1) || [];

  const isEmptyCell = (cell) =>
    cell === null || cell === undefined || String(cell).trim() === "";

  return (
    <>
      <Dialog
        header={`${fileName} - Preview`}
        visible={showModal}
        className={`${theme}`}
        onHide={() => setShowModal(false)}
        style={{ width: "80vw" }}
        breakpoints={{ "98%": "95vw" }}
        footer={
          <div className="flex justify-end p-2 border-t bg-white">
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Close
            </Button>
          </div>
        }
      >
        <div style={{ overflowX: "auto" }}>
          <Tables
            thead={headers.map((h) => String(h || ""))}
            tbody={bodyRows.map((row) =>
              row.map((cell) =>
                isEmptyCell(cell) ? (
                  <span
                    style={{
                      border: "1px solid white",
                      display: "inline-block",
                      padding: "2px",
                      minWidth: "40px",
                    }}
                  ></span>
                ) : (
                  String(cell)
                )
              )
            )}
          />
        </div>
      </Dialog>

      <button
        className="btn p-0 btn_border_right"
        onClick={() => setShowModal(true)}
      >
        <i className="fa fa-eye text-white"></i>
      </button>
    </>
  );
};

ExcelPreviewModal.propTypes = {
  excelJsonData: PropTypes.array,
  fileName: PropTypes.string,
};

export default ExcelPreviewModal;
