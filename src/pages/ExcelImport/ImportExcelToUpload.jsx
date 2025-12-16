import { Dialog } from "primereact/dialog";
import React, { useState } from "react";
import { Button } from "react-bootstrap";
import ExcelUploadModal from "./ExcelUploadModal";
import { useCryptoLocalStorage } from "../../utils/hooks/useCryptoLocalStorage";

const ImportExcelToUpload = () => {
  const theme = useCryptoLocalStorage(
      "user_Data",
      "get",
      "theme"
    );

  const [openExcelUploadModal, setOpenExcelUploadModal] = useState(false);

  const handleOpenImportModal = (visible) => {
    setOpenExcelUploadModal(visible);
  };

  const onHideModal = () => {
    setOpenExcelUploadModal(false);
  };

  return (
    <>
      <div className="d-flex justify-content-end">
        <Button
          onClick={() => handleOpenImportModal(true)}
          className="mx-2 rounded px-4"
        >
          <i class="bi bi-file-earmark-excel-fill mb-0 text-green"></i>
          Import File
        </Button>
      </div>
      <Dialog
        header={`Import Excel to Upload`}
        visible={openExcelUploadModal}
        onHide={onHideModal}
        className={`${theme}`}
        style={{ width: "60vw" }}
        breakpoints={{ "98%": "59vw" }}
      >
        <ExcelUploadModal onClose={handleOpenImportModal} />
      </Dialog>
    </>
  );
};

export default ImportExcelToUpload;
