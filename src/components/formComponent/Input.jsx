import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Tooltip } from "primereact/tooltip";

function Input({
  type,
  name,
  className,
  respclass,
  id,
  placeholder,
  isTooltip = true,
  lable,
  value,
  onKeyDown,
  required,
  display,
  onChange,
  disabled,
  readOnly,
  defaultValue,
  onBlur,
  inputRef,
  removeFormGroupClass,
  onInput,
  max,
  min,
  key,
  showTooltipCount,
  maxLength,
  tabIndex,
  placeholderLabel,
  checked,
  autoComplete,
}) {
  const [t] = useTranslation();

  return (
    <>
      {isTooltip && (
        <Tooltip
          target={`#${id}`}
          position="top"
          content={
            t(lable) +
            ` ${showTooltipCount ? "Count : " + (value?.length ? value?.length : "0") : ""}`
          }
          event="focus"
          className="ToolTipCustom"
        />
      )}

      <div className={`${respclass}  custominputbox`}>
        {/* <div className={!isFromGroup ? "" : "form-group"}> */}
        <div className={removeFormGroupClass ? "" : "form-group"}>
          <input
            type={type}
            className={className}
            id={id}
            name={name}
            placeholder={placeholder}
            value={value}
            onKeyDown={onKeyDown}
            key={key}
            onChange={onChange}
            autoComplete={autoComplete}
            step={type === "number" ? "0.01" : ""}
            required={required}
            ref={inputRef}
            onBlur={onBlur}
            max={max}
            min={min}
            style={{ textAlign: display ?? "left" }}
            onInput={onInput}
            disabled={disabled ? disabled : false}
            // tabIndex={tabIndex ? tabIndex : "-1"}
            readOnly={readOnly}
            maxLength={maxLength}
            checked={checked}
          />
          {lable && (
            <label htmlFor={id} className="lable truncate">
              {lable}
            </label>
          )}
          <span className="placeholderLabel"> {placeholderLabel} </span>
        </div>
      </div>
    </>
  );
}

export default Input;
