// import React from "react";

// export default function BrowseInvoiceButton({ handleImageChange, accept }) {
//   return (
//     <>
//       <input
//         type="file"
//         id="invoiceFileInput"
//         onChange={handleImageChange}
//         style={{ display: "none", cursor: "pointer" }}
//         accept={accept || ".pdf,.jpg,.jpeg,.png"}
//       />

//       <button className="btn btn-sm">
//         <label
//           htmlFor="invoiceFileInput"
//           className="text-white file-type-browse"
//         >
//           Select Invoice
//         </label>
//       </button>
//     </>
//   );
// }

import React, { useState } from "react";

export default function BrowseInvoiceButton({ handleImageChange }) {
  const [error, setError] = useState("");

  const validateFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Allow only PDF
    if (file.type !== "application/pdf") {
      setError("Please select a PDF file only.");
      e.target.value = ""; // clear wrong file
      return;
    }

    setError("");
    handleImageChange(e); // Pass to parent function
  };

  return (
    <>
      <input
        type="file"
        id="invoiceFileInput"
        onChange={validateFile}
        style={{ display: "none", cursor: "pointer" }}
        accept=".pdf"
      />

      <button className="btn btn-sm">
        <label
          htmlFor="invoiceFileInput"
          className="text-white file-type-browse"
        >
          Select Invoice
        </label>
      </button>

      {error && (
        <p style={{ color: "red", fontSize: "12px", marginTop: "5px" }}>
          {error}
        </p>
      )}
    </>
  );
}
