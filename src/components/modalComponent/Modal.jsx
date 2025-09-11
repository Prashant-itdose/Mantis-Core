import React from "react";
import { Dialog } from "primereact/dialog";
import { Divider } from "primereact/divider";
import SaveButton from "@components/UI/SaveButton";
import CancelButton from "../UI/CancelButton";
import { useCryptoLocalStorage } from "../../utils/hooks/useCryptoLocalStorage";

const Modal = ({
  setVisible,
  visible,
  children,
  Header,
  buttons,
  modalWidth,
  setModalData,
  modalData,
  handleAPI,
  buttonName,
  footer,
  closable = true,
}) => {
  const isMobile = window.innerWidth <= 768;
  // const theme = useLocalStorage("theme", 'get')
  const theme = useCryptoLocalStorage("user_Data", "get", "theme");

  const handleSubmit = () => {
    // console.log("modalDatamodalData",modalData)
    handleAPI(modalData);
  };

  const footerContent = (
    <div>
      <div className="ftr_btn">
        {buttons}
        <SaveButton
          btnName={buttonName ? buttonName : "Save"}
          handleSubmit={handleSubmit}
        />
        <CancelButton
          cancleBtnName={"Cancel"}
          onClick={() => setVisible(false)}
        />
      </div>
    </div>
  );
  return (
    <>
      <Dialog
        header={Header}
        visible={visible}
        style={{ width: isMobile ? "90vw" : modalWidth }}
        onHide={() => {
          setVisible(false);
        }}
        draggable={false}
        className={theme}
        // footer={footer ? footer : footerContent}
        closable={closable}
      >
        <Divider className={`custom-divider-header ${theme}`} />

        <p className={`mt-0 ${theme}`}>{children}</p>
      </Dialog>
    </>
  );
};

export default Modal;
