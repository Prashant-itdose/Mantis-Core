import { setLoading } from "../store/reducers/loadingSlice/loadingSlice";
import store from "../store/store";
import { apiUrls } from "./apiEndpoints";
import makeApiRequest from "./axiosInstance";
import * as XLSX from "xlsx"; // Import the xlsx library
import * as FileSaver from "file-saver";
import jsPDF from "jspdf";
import "jspdf-autotable";
import html2pdf from "html2pdf.js";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import { useCryptoLocalStorage } from "../utils/hooks/useCryptoLocalStorage";
export const SearchPatient = async (params) => {
  store.dispatch(setLoading(true));
  try {
    const options = {
      method: "POST",
      data: params,
    };
    const data = await makeApiRequest(`${apiUrls.SearchPatient}`, options);
    store.dispatch(setLoading(false));
    return data;
  } catch (error) {
    store.dispatch(setLoading(false));
    console.error("Error Found", error);
  }
};

export const GetDepartmentWiseDetails = async (
  transactionID,
  Type,
  LedgertransactionNo
) => {
  try {
    const url = `${apiUrls.GetDepartmentWiseDetails}?transactionID=${transactionID}&Type=${Type}&LedgertransactionNo=${LedgertransactionNo}`;
    const data = await makeApiRequest(url, {
      method: "GET",
    });
    return data;
  } catch (error) {
    throw error;
  }
};

export const GetDepartmentItemDetails = async (params) => {
  store.dispatch(setLoading(true));
  try {
    const options = {
      method: "POST",
      data: params,
    };
    const data = await makeApiRequest(
      `${apiUrls.GetDepartmentItemDetails}`,
      options
    );
    store.dispatch(setLoading(false));
    return data;
  } catch (error) {
    store.dispatch(setLoading(false));
    console.error("Error Found", error);
  }
};

export const GetPanelList = async (
  TransactionID,
  Type,
  LedgerTransactionNo
) => {
  try {
    const url = `${apiUrls.GetPanelList}?TransactionID=${TransactionID}&Type=${Type}&LedgerTransactionNo=${LedgerTransactionNo}`;
    const data = await makeApiRequest(url, {
      method: "GET",
    });
    return data;
  } catch (error) {
    throw error;
  }
};

export const ExportToExcel = async (dataExcel) => {
  const username =
    useCryptoLocalStorage("user_Data", "get", "realname") || "User";
  const currentDate = new Date().toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  const currentTime = new Date()
    .toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    })
    .replace(/:/g, "-");

  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";
  const ws = XLSX.utils.json_to_sheet(dataExcel, { skipHeader: false });
  const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
  const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
  const data = new Blob([excelBuffer], { type: fileType });
  FileSaver.saveAs(
    data,
    `${username}_${currentDate}_${currentTime}${fileExtension}`
  );
};

export const ExportToPDF = async (dataPDF) => {
  const username =
    useCryptoLocalStorage("user_Data", "get", "realname") || "User";
  const currentDate = new Date().toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  const currentTime = new Date()
    .toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    })
    .replace(/:/g, "-");

  const doc = new jsPDF();

  // Set title font size to 10px and make it bold
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");

  // Title text
  // const title = `Report by ${username} - ${currentDate}`;
  // doc.text(title, 10, 10); // Adjust the position of the title as needed

  // Set font size for table content to 7px
  doc.setFontSize(9);

  const tableColumn = Object.keys(dataPDF[0] || {});
  const tableRows = dataPDF.map(Object.values);

  doc.autoTable({
    head: [tableColumn],
    body: tableRows,
    startY: 10,
    styles: {
      fontSize: 6, // Keep the font size to 8, but scale the table
      cellPadding: 1,
      minCellWidth: 10,
    },
    headStyles: {
      fontSize: 8, // Font size for the header
      fontStyle: "bold", // Optional: Makes the header bold
    },
    theme: "grid",
  });

  // Save the PDF
  doc.save(`${username}_${currentDate}_${currentTime}.pdf`);
};

export const exportHtmlToPDF = async (elementId, fileName) => {
  store.dispatch(setLoading(true));
  const hiddenTemplate = window.document.getElementById(elementId).innerHTML;
  const options = {
    margin: 0.5,
    filename: `${fileName}.pdf`,
    image: { type: "jpeg", quality: 0.98 }, // Adjust quality if needed
    html2canvas: { scale: 2 }, // Adjust settings for performance
    jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    pagebreak: { after: "section", mode: ["avoid-all", "css", "legacy"] }, // Handling page breaks
  };

  try {
    // Convert the temporary container to PDF and save
    // Adding a footer with page numbers
    await html2pdf()
      .from(hiddenTemplate)
      .set(options)
      .toContainer()
      .toCanvas()
      .toPdf()
      .get("pdf")
      .then((pdf) => {
        const totalPages = pdf.internal.getNumberOfPages();
        console.log("getHeight:" + pdf.internal.pageSize.getHeight());
        console.log("getWidth:" + pdf.internal.pageSize.getWidth());
        // const headerContent = document.querySelector('.main-template-Container').outerHTML;

        for (let i = 1; i <= totalPages; i++) {
          pdf.setPage(i);

          pdf.setFontSize(8);
          pdf.setTextColor(64, 64, 64);
          pdf.text(
            "Page " + i + " of " + totalPages,
            pdf.internal.pageSize.getWidth() / 2,
            pdf.internal.pageSize.getHeight() - 0.2
          );
        }
      })
      .save();
  } catch (error) {
    console.error("Error generating PDF:", error);
  } finally {
    store.dispatch(setLoading(false));
  }
};

const getAttendanceColor = (value) => {
  if (value === "S") return "#ebdd44";
  else if (value === "Y" || value === "HLComp OffY") return "#ffffff";
  else if (value === "") return "#f76459";
  else if (value === "LWP") return "#f74f4f";
  else if (value === "WO") return "#FFA500";
  else if (value === "HL") return "#FAE03C";
  else if (value === "OL") return "#de8a49";
  else if (value === "Comp Off" || value === "SL" || value === "CL")
    return "#ffc0cb";
};

///////////////////////////////////////////////////////////////////////////////

export const exportToExcel = async (
  data,
  header1,
  header2,
  condition = false,
  fileName
) => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Sheet1");

  // Determine the number of columns dynamically
  const numColumns = Object.keys(data[0] || {}).length;
  let rowNumber = 1; // Track row numbers dynamically

  // ✅ Conditional Heading 1 (Title)
  if (header1) {
    const titleRow = worksheet.addRow([header1]);
    titleRow.font = {
      bold: true,
      size: 16,
      color: { argb: condition ? "FF0000" : "000000" },
    }; // Red if condition is true
    titleRow.alignment = { horizontal: "center", vertical: "middle" };
    titleRow.height = 25;
    worksheet.mergeCells(rowNumber, 1, rowNumber, numColumns);
    rowNumber++; // Move to the next row
  }

  // ✅ Conditional Heading 2 (Subtitle)
  if (header2) {
    const subtitleRow = worksheet.addRow([header2]);
    subtitleRow.font = { bold: true, size: 14 };
    subtitleRow.alignment = { horizontal: "center", vertical: "middle" };
    subtitleRow.height = 25;

    // 🔹 Change background color based on condition
    if (header2.includes("Summary")) {
      subtitleRow.eachCell((cell) => {
        cell.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "FFFF00" },
        }; // Yellow
      });
    }

    worksheet.mergeCells(rowNumber, 1, rowNumber, numColumns);
    rowNumber++;
  }

  // ✅ Column Headers (Row 3)
  const columnHeaders = Object.keys(data[0]);
  const headerRow = worksheet.addRow(columnHeaders);
  headerRow.font = { bold: true, size: 12 };
  headerRow.alignment = { horizontal: "center", vertical: "middle" };
  headerRow.height = 25;
  headerRow.eachCell((cell) => {
    cell.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "4F81BD" },
    };
    cell.font = { color: { argb: "FFFFFF" }, bold: true };
    cell.border = {
      top: { style: "thin" },
      bottom: { style: "thin" },
      left: { style: "thin" },
      right: { style: "thin" },
    };
  });

  // ✅ Apply Filter on Row
  worksheet.autoFilter = {
    from: { row: rowNumber, column: 1 },
    to: { row: rowNumber, column: numColumns },
  };

  // ✅ Add Data (from next row onwards)
  data.forEach((rowData) => {
    const row = worksheet.addRow(Object.values(rowData));
    row.height = 15;

    row.eachCell((cell, colNumber) => {
      const headerKey = Object.keys(rowData)[colNumber];
      const cellValue = rowData[headerKey];

      const headerKeyCOLOR = getAttendanceColor(
        Object.values(rowData)[colNumber - 1]
      );

      //  if (headerKey === "Status") {
      if (headerKeyCOLOR) {
        
        const hexToArgb = (hex) => {
          const cleanHex = hex.replace("#", "");
          return `FF${cleanHex.toUpperCase()}`;
        };

        cell.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: hexToArgb(headerKeyCOLOR) },
        };
        cell.font = {
          color: { argb: "#000000" }, // text color
          bold: true,
        };
      }
      // }

      cell.alignment = { vertical: "middle", horizontal: "left" };
      cell.border = {
        top: { style: "thin" },
        bottom: { style: "thin" },
        left: { style: "thin" },
        right: { style: "thin" },
      };
    });
  });

  // ✅ Add Thick Border Around Data
  const lastRow = worksheet.rowCount;
  const lastColumn = worksheet.columnCount;
  for (let i = 1; i <= lastRow; i++) {
    for (let j = 1; j <= lastColumn; j++) {
      const cell = worksheet.getCell(i, j);
      // cell.border = {
      //   top: { style: i === 1 ? "thick" : "thin" },
      //   bottom: { style: i === lastRow ? "thick" : "thin" },
      //   left: { style: j === 1 ? "thick" : "thin" },
      //   right: { style: j === lastColumn ? "thick" : "thin" },
      // };
    }
  }

  // ✅ Auto-adjust column width
  worksheet.columns.forEach((column) => {
    column.width = 20;
  });

  // ✅ Create & Download Excel File
  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });
  saveAs(blob, `${fileName ? fileName : header1}.xlsx`);
};

/////////////////////////////////////

export const ExportToExcelColor = async (dataExcel) => {
  const username =
    useCryptoLocalStorage("user_Data", "get", "realname") || "User";

  const currentDate = new Date().toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  const currentTime = new Date()
    .toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    })
    .replace(/:/g, "-");

  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("data", {
    views: [{ state: "frozen", ySplit: 1 }], // Freeze first row
  });

  // Extract headers
  const headers = Object.keys(dataExcel[0] || {});
  worksheet.addRow(headers);

  // 👉 Add AutoFilter to header row
  worksheet.autoFilter = {
    from: {
      row: 1,
      column: 1,
    },
    to: {
      row: 1,
      column: headers.length,
    },
  };

  // Add data rows
  dataExcel.forEach((item) => {
    const rowData = headers.map((header) => item[header]);
    worksheet.addRow(rowData);
  });

  // Style header row
  const headerRow = worksheet.getRow(1);
  headerRow.eachCell((cell) => {
    cell.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "825426" }, // Blue
    };
    cell.font = {
      color: { argb: "FFFFFFFF" }, // White
      bold: true,
    };
    cell.alignment = { horizontal: "center", vertical: "middle" };
    cell.border = {
      top: { style: "thin" },
      left: { style: "thin" },
      bottom: { style: "thin" },
      right: { style: "thin" },
    };
  });

  // Auto-width for columns
  worksheet.columns.forEach((column, i) => {
    let maxLength = headers[i].length;
    dataExcel.forEach((row) => {
      const val = row[headers[i]];
      const len = val ? val.toString().length : 10;
      if (len > maxLength) maxLength = len;
    });
    column.width = maxLength + 2;
  });

  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], {
    type:
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
  });

  saveAs(blob, `${username}_${currentDate}_${currentTime}.xlsx`);
};
