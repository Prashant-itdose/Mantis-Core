import React from "react";

const QuotationPopupModal = ({ setVisible, onConfirm, OnNo }) => {
  return (
    <>
      <div className="p-2" style={{ background: "#c2dfff" }}>
        <span className="fa fa-exclamation-triangle blinking-text-popup ml-2"></span>
        <span className="ml-2" style={{ fontWeight: "bold", color: "red" }}>
          We recommend proceeding with a sales booking for the AMC. Would you
          still like to continue with your current option?
        </span>
        <button className="btn btn-sm btn-success ml-2" onClick={onConfirm}>
          Yes
        </button>
        <button
          className="btn btn-sm btn-danger ml-3"
          // onClick={() => setVisible(false)}
          onClick={OnNo}
        >
          No
        </button>
      </div>
    </>
  );
};
export default QuotationPopupModal;
