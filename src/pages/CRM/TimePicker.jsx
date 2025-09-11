import React from "react";
import { Calendar } from "primereact/calendar";

const TimePicker = (props) => {
  const {
    respclass,
    placeholderName,
    value,
    handleChange,
    name,
    lable,
    id,
    className,
    disable,
    removeFormControl,
  } = props;
  // value={value ? new Date(`1970-01-01T${value}`) : new Date(`1970-01-01T00:00:00`)}
  return (
    <>
      <div
        className={respclass}
        style={{
          position: "relative",
          marginBottom: removeFormControl ? "" : "4px",
        }}
      >
        <Calendar
          id="calendar-timeonly"
          style={{ width: "100%" }}
          wrapperClassName="datepicker"
          className={className}
          value={value}
          onChange={handleChange}
          timeOnly
          showTime
          inputMode="text"
          hourFormat="12"
          placeholder={placeholderName}
          disabled={disable}
          name={name}
          // disabled
        />
        {lable && (
          <label
            htmlFor={id}
            className="label lable truncate time_Lable"
            style={{ fontSize: "5px !important" }}
          >
            {lable}
          </label>
        )}
      </div>
    </>
  );
};

export default TimePicker;
