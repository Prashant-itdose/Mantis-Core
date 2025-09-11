import React from "react";
import "./Tooltip.css";

const Tooltip = ({ label, children, className, position = "top" }) => {
  return (
    <div
      className={`tooltip-container ${className}`}
      // style={{ position: "relative", zIndex: 10000 }}
    >
      {children}
      <div
        className={`tooltip ${
          position === "bottom" ? "tooltip-bottom" : "tooltip-top"
        }`}
      >
        {label}
      </div>
    </div>
  );
};

export default Tooltip;
