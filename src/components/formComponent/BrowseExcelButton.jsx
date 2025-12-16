// import React from "react";

// export default function BrowseExcelButton({ handleImageChange, accept }) {
//   return (
//     <>
//       <input
//         type="file"
//         id="excelFileInput"
//         onChange={handleImageChange}
//         style={{ display: "none", cursor: "pointer" }}
//         accept={accept || ".xlsx,.xls,.csv"}
//       />

//       <button className="btn btn-sm">
//         <label htmlFor="excelFileInput" className="text-white file-type-browse">
//           Select Excel Sheet
//         </label>
//       </button>
//     </>
//   );
// }


import React, { useState } from "react";
import { toast } from "react-toastify";

export default function BrowseExcelButton({ handleImageChange }) {
  const [error, setError] = useState("");

  const validateFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const allowed = ["application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                     "application/vnd.ms-excel"];

    // Validate MIME type
    if (!allowed.includes(file.type)) {
      toast.error("Please select only Excel file (.xlsx or .xls)");
      e.target.value = ""; // Clear wrong file
      return;
    }

    setError("");
    handleImageChange(e); // Pass file to parent
  };

  return (
    <>
      <input
        type="file"
        id="excelFileInput"
        onChange={validateFile}
        style={{ display: "none", cursor: "pointer" }}
        accept=".xlsx,.xls"
      />

      <button className="btn btn-sm">
        <label htmlFor="excelFileInput" className="text-white file-type-browse">
          Select Excel Sheet
        </label>
      </button>

      {error && (
        <p style={{ color: "red", marginTop: "5px", fontSize: "12px" }}>
          {error}
        </p>
      )}
    </>
  );
}

