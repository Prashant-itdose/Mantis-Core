import { Tooltip } from "primereact/tooltip";
import React, { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

import { useState } from "react";
import { notify } from "../utils/utils";
// import { updateFontSize } from "../../../networkServices/HeaderApi";
// import { useLocalStorage } from "../../../utils/hooks/useLocalStorage";

export default function HandleFontSize() {
  const [t] = useTranslation();
  //   const font = useLocalStorage("appFontSize", "get");
  const [fontSize, setFontSize] = useState(12);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  // const useData = useLocalStorage("userData", "get");

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleRangeChange = (e) => {
    const newSize = parseInt(e?.target?.value, 10);
    setFontSize(newSize);
    // setCurrentFontSize(newSize);
  };

  const activeClassName = (fs) => {
    if (fs === fontSize)
      return "small text-muted pointer-cursor activeFont background-theme-color";
    else return "small text-muted pointer-cursor";
  };

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--app-font-size",
      `${fontSize}px`
    );

    const height = Math.max(28, fontSize * 2);
    document.documentElement.style.setProperty(
      "--control-height",
      height + "px"
    );

    async function handleResize() {
      let apiResp = await updateFontSize({
        applicationFont: String(fontSize),
        employeeID: String(useData?.employeeID),
      });
      if (apiResp?.success) {
        notify(apiResp?.message, "success");
        // useLocalStorage("appFontSize", "set", fontSize);
      } else {
        notify(apiResp?.message, "error");
      }
    }
    // debugger
    // if (String(useData?.applicationFont) !== String(fontSize)) {

    //   handleResize();
    // }
    // handleResize()
  }, [fontSize]);

  return (
    <>
      <div className="font-size-picker-wrapper" ref={dropdownRef}>
        <Tooltip
          target={`#fontSize`}
          position="top"
          content={t("Select Font Size")}
          event="hover"
          className="ToolTipCustom"
        />
        <button
          id="fontSize"
          type="button"
          className="nav-link text-white"
          onClick={() => setIsOpen(!isOpen)}
          style={{
            cursor: "pointer",
            padding: "0",
          }}
        >
          <i class="fa fa-search-plus"></i>
        </button>

        {isOpen && (
          <div className="font-size-dropdown">
            <div className="dropdown-header background-theme-color">
              <strong className="text-muted small text-white">Font Size</strong>
              <strong className=" text-white px-3">{fontSize}px</strong>
            </div>

            <div className="range-container">
              <div className="range-labels">
                <span
                  className={`${activeClassName(9)}`}
                  onClick={() => {
                    setFontSize(9);
                  }}
                >
                  9px
                </span>
                <span
                  className={`${activeClassName(10)}`}
                  onClick={() => {
                    setFontSize(10);
                  }}
                >
                  10px
                </span>
                <span
                  className={`${activeClassName(11)}`}
                  onClick={() => {
                    setFontSize(11);
                  }}
                >
                  11px
                </span>
                <span
                  className={`${activeClassName(12)}`}
                  onClick={() => {
                    setFontSize(12);
                  }}
                >
                  12px
                </span>
                <span
                  className={`${activeClassName(13)}`}
                  onClick={() => {
                    setFontSize(13);
                  }}
                >
                  13px
                </span>
                <span
                  className={`${activeClassName(14)}`}
                  onClick={() => {
                    setFontSize(14);
                  }}
                >
                  14px
                </span>
                <span
                  className={`${activeClassName(15)}`}
                  onClick={() => {
                    setFontSize(15);
                  }}
                >
                  15px
                </span>
                <span
                  className={`${activeClassName(16)}`}
                  onClick={() => {
                    setFontSize(16);
                  }}
                >
                  16px
                </span>
                <span
                  className={`${activeClassName(17)}`}
                  onClick={() => {
                    setFontSize(17);
                  }}
                >
                  17px
                </span>
                {/* <span
                  className={`${activeClassName(18)}`}
                  onClick={() => {
                    setFontSize(18);
                  }}
                >
                  18px
                </span>
                <span
                  className={`${activeClassName(19)}`}
                  onClick={() => {
                    setFontSize(19);
                  }}
                >
                  19px
                </span>
                <span
                  className={`${activeClassName(20)}`}
                  onClick={() => {
                    setFontSize(20);
                  }}
                >
                  20px
                </span> */}
              </div>

              <input
                type="range"
                className="form-range custom-range my-2"
                min="9"
                max="17"
                value={fontSize}
                onChange={handleRangeChange}
              />

              <div
                className="preview-text"
                style={{ fontSize: `${fontSize}px` }}
              >
                Sample Text
              </div>
            </div>
          </div>
        )}

        <style jsx>{`
          .font-size-picker-wrapper {
            position: relative;
            display: inline-block;
            font-size: 12px !important;
          }

          .font-size-trigger {
            display: flex;
            align-items: center;
            padding: 0.5rem 1rem;
            border-radius: 0.375rem;
            transition: all 0.2s ease;
          }

          .font-size-trigger:hover {
            background-color: #f8f9fa;
            border-color: #6c757d;
          }

          .font-size-dropdown {
            position: absolute;
            top: calc(100% + 0.5rem);
            left: -170px;
            background: white;
            border: 1px solid #dee2e6;
            border-radius: 0.5rem;
            box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
            padding: 2px 5px 0px 4px;
            border-radius: 4px;
            min-width: 380px;
            z-index: 1000;
            animation: slideDown 0.2s ease;
          }

          .activeFont {
            font-weight: 900;
            border-radius: 4px;
            padding: 0px 3px 0px 2px;
          }

          @keyframes slideDown {
            from {
              opacity: 0;
              transform: translateY(-10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .dropdown-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 1rem;
            padding-bottom: 0.75rem;
            border-bottom: 1px solid #e9ecef;
            border-radius: 0.375rem 0.375rem 0 0;
          }

          .range-container {
            padding: 0.5rem 0.5rem;
          }

          .range-labels {
            display: flex;
            justify-content: space-between;
            margin-bottom: 0.5rem;
          }

          .custom-range {
            width: 100%;
            margin-bottom: 1rem;
          }
          .custom-range:focus {
            outline: none;
            box-shadow: none;
          }

          .preview-text {
            text-align: center;
            padding: 0.75rem;
            background: #f8f9fa;
            border-radius: 0.375rem;
            color: #212529;
            font-weight: 500;
            transition: font-size 0.15s ease;
          }
        `}</style>
      </div>
    </>
  );
}
