import React from "react";

const DescriptionTemplateModal = ({ visible, setVisible }) => {
  console.log("visible", visible);
  return (
    <>
      <div className="card  p-2 d-flex">
        <span style={{ fontWeight: "bold" }}> {visible?.ele?.Desription}</span>
      </div>
    </>
  );
};

export default DescriptionTemplateModal;
