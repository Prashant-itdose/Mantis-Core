import React, { useRef, useState } from "react";
import Select from "react-select";

const ReactSelectIcon = ({
  placeholderName,
  searchable,
  defaultValue,
  respclass,
  id,
  handleChange,
  value,
  requiredClassName,
  dynamicOptions,
  name,
  inputId,
  isDisabled,
  tabIndex,
  handleFormatlabel,
}) => {
  const selectRef = useRef(null);
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  const customStyles = {
    control: (base) => ({
      ...base,
      minHeight: "0px",
      height: "0px",
      padding: "0px",
      border: "none",
      boxShadow: "none",
      backgroundColor: "transparent",
      visibility: "hidden", // hide main input
      position: "absolute",
    }),
    menu: (styles) => ({
      ...styles,
      zIndex: 9999,
      fontSize: 12,
      position: "absolute",
    }),
    valueContainer: () => ({
      display: "none",
    }),
  };

  const handleSelectChange = (selectedOption) => {
    handleChange?.(name, selectedOption);
    setMenuIsOpen(false); // close menu after selecting
  };

  return (
    <div className={respclass} style={{ position: "relative", display: "inline-block" }}>
      {/* FontAwesome Icon trigger */}
      <div
        onClick={() => setMenuIsOpen((prev) => !prev)}
        style={{
          cursor: "pointer",
          // padding: "4px",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          marginLeft:"7px"
          // border: "1px solid #ccc",
          // borderRadius: "4px",
          // background: "#fff",
        }}
      >
        <i className="fa fa-eye" style={{ fontSize: "16px" }}></i>
      </div>

      {/* Hidden select - only menu shows */}
      <div style={{ position: "relative" ,width:"70px"}}>
        <Select
          options={dynamicOptions || []}
          isSearchable={searchable}
          defaultValue={defaultValue}
          formatOptionLabel={({ label, ...rest }) =>
            handleFormatlabel ? handleFormatlabel(name, label, rest) : <div>{label}</div>
          }
          id={id}
          ref={selectRef}
          inputId={inputId}
          value={
            value
              ? dynamicOptions?.find((option) => String(option?.value) === String(value))
              : null
          }
          styles={customStyles}
          placeholder={placeholderName}
          onChange={handleSelectChange}
          isDisabled={isDisabled}
          className={requiredClassName}
          tabIndex={tabIndex ?? "-1"}
          menuIsOpen={menuIsOpen}
        />
      </div>
    </div>
  );
};

export default ReactSelectIcon;
