import React from "react";
import DatePicker from "../../components/formComponent/DatePicker";


const ReportDatePicker = ({
  className,
  respclass,
  name,
  id,
  values,
  setValues,
  lable,
}) => {
  const { VITE_DATE_FORMAT } = import.meta.env;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  return (
    <DatePicker
      className={className}
      respclass={respclass}
      name={name}
      id={id}
      lable={lable}
      placeholder={VITE_DATE_FORMAT}
      showTime
      hourFormat="12"
      value={values[name]}
      handleChange={handleChange}
    />
  );
};

export default ReportDatePicker;
