// import React, { useRef, useState } from "react";
// import * as XLSX from "xlsx";

// import ExcelPreviewModal from "./ExcelPreviewModal";
// import { useTranslation } from "react-i18next";
// import { Button } from "react-bootstrap";
// import { CiImport } from "react-icons/ci";
// import { useDispatch } from "react-redux";

// const ExcelPreviewHandler = ({ buttonText = "Import File" , setCallBackState}) => {
//   const [t] = useTranslation();
//   const dispatch = useDispatch();
//   const uploadRef = useRef(null);
//   const [previewData, setPreviewData] = useState([]);
//   const [campPayload, setCampPayload] = useState({ uploadFile: {} });

//   const handleUploadButtonClick = () => {
//     uploadRef?.current?.click();
//   };

//   const processFile = (file) => {
//     const reader = new FileReader();

//     reader.onload = (e) => {
//       const data = e.target.result;
//       const workbook = XLSX.read(new Uint8Array(data), { type: "array" });
//       const worksheet = workbook.Sheets[workbook.SheetNames[0]];

//       const jsonData = XLSX.utils.sheet_to_json(worksheet, {
//         header: 1,
//         defval: ""
//         // defval: (
//         //   <div
//         //     style={{ border: "1px solid red", padding: "2px" }}
//         //     className="emptyBox"
//         //   >
//         //     null
//         //   </div>
//         // ),
//       });

//       const [headers, ...rows] = jsonData;

//       // Step 2: Convert to JSON array
//       const jsonArrayNew = rows.map((row) => {
//         return headers.reduce((obj, header, index) => {
//           obj[header] = row[index];
//           return obj;
//         }, {});
//       });

//       const fixNumber = jsonData.map((ele, idx)=>{
//         return ele.map((ele)=>{
//           if(typeof ele == 'number'){
//             return ele.toFixed(2);
//           }
//           return ele;
//         })
//       })

//       setPreviewData(jsonData);
//       setCallBackState(jsonArrayNew)
//       console.log("jsonArrayNew", jsonArrayNew);
//       // dispatch(setImportExcelData(jsonArrayNew));
//     };

//     reader.readAsArrayBuffer(file);
//   };

//   const handleUploadFile = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     setCampPayload((prev) => ({ ...prev, uploadFile: file }));
//     processFile(file);
//   };

//   const handleDrop = (event) => {
//     event.preventDefault();
//     const file = event.dataTransfer.files[0];

//     if (
//       file &&
//       (file.type ===
//         "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
//         file.type === "application/vnd.ms-excel")
//     ) {
//       setCampPayload((prev) => ({ ...prev, uploadFile: file }));
//       processFile(file);
//     } else {
//       notify(t("Only Excel files are allowed."), "error");
//     }
//   };

//   const handleDragOver = (event) => {
//     event.preventDefault();
//   };

//   const handleRemoveFile = () => {
//     setCampPayload((prev) => ({ ...prev, uploadFile: {} }));
//   };

//   return (
//     <div
//       className="generate_excel"
//       onDragOver={handleDragOver}
//       onDrop={handleDrop}
//       onClick={handleUploadButtonClick}
//     >
//       {!campPayload?.uploadFile?.name ? (
//         <span
//           style={{ gap: "6px" }}
//           className="w-100 d-flex align-content-center ml-2"
//         >
//           <Button style={{ gap: "3px" }} className="rounded">
//             <CiImport />
//             {t(`${buttonText}`)}
//           </Button>
//           <input
//             ref={uploadRef}
//             onChange={handleUploadFile}
//             type="file"
//             accept=".xlsx, .xls"
//             className="d-none"
//           />
//         </span>
//       ) : (
//         <Button className="d-flex rounded justify-content-between w-100 align-items-center pl-2">
//           {campPayload?.uploadFile?.name?.length > 15
//             ? campPayload?.uploadFile?.name?.slice(0, 15) + "..."
//             : campPayload?.uploadFile?.name}
//           <div className="d-flex align-items-center gap-2">
//             <i
//               onClick={handleRemoveFile}
//               className="bi bi-trash3 p-0 mb-0 my-1 mx-1 text-danger"
//             ></i>
//             <ExcelPreviewModal
//               excelJsonData={previewData}
//               fileName={campPayload?.uploadFile?.name}
//             />
//           </div>
//         </Button>
//       )}
//     </div>
//   );
// };

// export default ExcelPreviewHandler;

// ExcelPreviewHandler.jsx

import React, { useRef, useState } from "react";
import * as XLSX from "xlsx";
import ExcelPreviewModal from "./ExcelPreviewModal";
import { useTranslation } from "react-i18next";
import { Button } from "react-bootstrap";
import { CiImport } from "react-icons/ci";
import PropTypes from "prop-types";

const ExcelPreviewHandler = ({
  buttonText = "Import Excel Sheet",
  setCallBackState,
}) => {
  const [t] = useTranslation();
  const uploadRef = useRef(null);
  const [previewData, setPreviewData] = useState([]);
  const [campPayload, setCampPayload] = useState({ uploadFile: {} });

  const handleUploadButtonClick = () => uploadRef.current?.click();

  /** Convert Excel serial number → DD-MM-YYYY */
  const convertExcelDate = (serial) => {
    if (typeof serial !== "number") return serial;

    const date = XLSX.SSF.parse_date_code(serial);
    if (!date) return serial;

    return `${String(date.d).padStart(2, "0")}-${String(date.m).padStart(
      2,
      "0"
    )}-20${String(date.y).slice(-2)}`;
  };

  /** Process selected Excel file */
  const processFile = (file) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      const workbook = XLSX.read(new Uint8Array(e.target.result), {
        type: "array",
      });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];

      const jsonData = XLSX.utils.sheet_to_json(worksheet, {
        header: 1,
        defval: "",
      });

      const [headers, ...rows] = jsonData;

      /** Create JSON array (array of objects) */
      const jsonArrayNew = rows.map((row) => {
        return headers.reduce((obj, header, index) => {
          let cell = row[index];

          // Fix Excel date serial numbers
          if (typeof cell === "number" && cell > 40000 && cell < 60000) {
            cell = convertExcelDate(cell);
          }

          obj[header] = cell;
          return obj;
        }, {});
      });

      /** Preview fix (convert date serials in table view) */
      const previewFixed = jsonData.map((row) =>
        row.map((cell) => {
          if (typeof cell === "number" && cell > 40000 && cell < 60000)
            return convertExcelDate(cell);

          return cell;
        })
      );

      setPreviewData(previewFixed);
      setCallBackState(jsonArrayNew);
      setCampPayload({ uploadFile: file });

      console.log("Final JSON:", jsonArrayNew);
    };

    reader.readAsArrayBuffer(file);
  };

  /** File selection handler */
  const handleUploadFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const ext = file.name.split(".").pop().toLowerCase();
    if (!["xlsx", "xls"].includes(ext)) {
      alert(t("Only Excel files are allowed."));
      return;
    }

    processFile(file);
  };

  /** Drag & Drop handler */
  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer?.files?.[0];
    if (!file) return;

    const ext = file.name.split(".").pop().toLowerCase();
    if (!["xlsx", "xls"].includes(ext)) {
      alert(t("Only Excel files are allowed."));
      return;
    }

    processFile(file);
  };

  /** Reset handler */
  const handleRemoveFile = () => {
    setCampPayload({ uploadFile: {} });
    setPreviewData([]);
    setCallBackState([]);
    if (uploadRef.current) uploadRef.current.value = "";
  };

  return (
    <div
      className="generate_excel"
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
    >
      {!campPayload?.uploadFile?.name ? (
        <span
          style={{ gap: "6px" }}
          className="w-100 d-flex align-content-center ml-2"
        >
          <Button
            className="rounded"
            style={{ gap: "3px" }}
            onClick={handleUploadButtonClick}
          >
            <CiImport /> {t(buttonText)}
          </Button>

          <input
            ref={uploadRef}
            type="file"
            accept=".xlsx,.xls"
            onChange={handleUploadFile}
            className="d-none"
          />
        </span>
      ) : (
        <Button className="d-flex rounded justify-content-between w-100 align-items-center pl-2">
          {campPayload.uploadFile.name.length > 30
            ? campPayload.uploadFile.name.slice(0, 30) + "..."
            : campPayload.uploadFile.name}

          <div className="d-flex align-items-center gap-2">
            <i
              onClick={handleRemoveFile}
              className="bi bi-trash3 p-0 mb-0 my-1 mx-1 text-danger"
              role="button"
            ></i>

            <ExcelPreviewModal
              excelJsonData={previewData}
              fileName={campPayload.uploadFile.name}
            />
          </div>
        </Button>
      )}
    </div>
  );
};

ExcelPreviewHandler.propTypes = {
  buttonText: PropTypes.string,
  setCallBackState: PropTypes.func.isRequired,
};

export default ExcelPreviewHandler;
