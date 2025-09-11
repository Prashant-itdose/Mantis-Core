import React from "react";
import { Calendar } from "primereact/calendar";

function DatePickerMonth({
  type,
  name,
  className,
  respclass,
  id,
  placeholder,
  label,
  value,
  onKeyDown,
  required,
  handleChange,
  tabIndex,
  maxDate,
  minDate,
  timeOnly,
}) {
  return (
    <>
      <div className={respclass} style={{ position: "relative" }}>
        <div className="form-groupa">
          <Calendar
            inputId={id}
            id={id}
            showIcon
            placeholder={placeholder}
            className={className}
            dateFormat="M-yy" 
            value={value}
            maxDate={maxDate}
            minDate={minDate}
            name={name}
            onChange={handleChange}
            view="month"
            tabIndex={tabIndex ? tabIndex : "-1"}
          />
          <label
            htmlFor={id}
            className="label truncate"
            style={{ fontSize: "5px !important" }}
          >
            {label}
          </label>
        </div>
      </div>
    </>
  );
}

export default DatePickerMonth;
