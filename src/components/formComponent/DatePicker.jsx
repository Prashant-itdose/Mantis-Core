import React from "react";
import { Calendar } from "primereact/calendar";

function DatePicker({
  type,
  name,
  className,
  respclass,
  id,
  placeholder,
  lable,
  value,
  onKeyDown,
  required,
  handleChange,
  tabIndex,
  maxDate,
  minDate,
  disabled,
  timeOnly,
  onlyMonth,
}) {
  return (
    <>
      <div className={respclass} style={{ position: "relative" }}>
        {/* <FloatLabel>  */}
        <div className="form-group ">
          <Calendar
            inputId={id}
            id={id}
            showIcon
            placeholder={placeholder}
            className={className}
            dateFormat={"dd-M-yy"}
            value={value}
            maxDate={maxDate}
            minDate={minDate}
            disabled={disabled ? disabled : false}
            name={name}
            onChange={handleChange}
            // onChange={(e) => handleChange(name, e.target.value)}
            wrapperClassName="datepicker"
            tabIndex={tabIndex ? tabIndex : "-1"}
          />
          {/* <label htmlFor="birth_date">Birt h Date</label> */}
          <label
            htmlFor={id}
            className="label lable truncate "
            style={{ fontSize: "5px !important" }}
          >
            {lable}
          </label>
        </div>
        {/* </FloatLabel> */}
      </div>
    </>
  );
}

export default DatePicker;
