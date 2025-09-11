import React, { useRef, useState } from "react";
import Table from "react-bootstrap/Table";

function Tables({
  thead,
  tbody,
  fs,
  getRowClass,
  style,
  tableHeight,
  secondHead,
  TotalRecords,
  totalLabel,
}) {
  const isMobile = window.innerWidth <= 768;
  const activeRowRef = useRef(null);
  const handleRowClick = (rowRef, rowColor) => {
    if (activeRowRef.current) {
      activeRowRef.current.style.backgroundColor =
        activeRowRef.current.dataset.originalColor || "";
    }
    if (rowRef) {
      rowRef.dataset.originalColor = rowColor;
      rowRef.style.backgroundColor = "#f0e9e9";
      activeRowRef.current = rowRef;
    }
  };

  return (
    tbody?.length > 0 && (
      <div
        id="no-more-tables"
        style={style}
        className={`${tableHeight} custom-scrollbar TabScroll`}
      >
        <div className="row">
          <div className="col-12">
            <Table className="mainTable pt-2 pl-2 pr-2" bordered>
              <thead style={{ zIndex: 1 }}>
                <tr>
                  {secondHead?.filter((val)=>val?.visible)?.map((headData, index) => (
                      <th
                      key={index}
                      style={{ width: headData?.width ? headData?.width : "" }}
                    > 
                      {String(headData?.name) } &nbsp;
                    </th>
                  ))}
                </tr>

                <tr>
                  {thead?.map((headData, index) => (
                    <th
                      key={index}
                      style={{ width: headData?.width ? headData?.width : "" }}
                    >
                      {headData?.name ? headData?.name : headData} &nbsp;
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tbody?.map((ele, index) => {
                  const keys = Object.keys(ele).filter(
                    (key) => key !== "colorcode"
                  );
                  const rowColor = ele.colorcode || "";
                  return (
                    <>
                      <tr
                        key={index}
                        className={getRowClass ? getRowClass(ele) : ""}
                        style={{ backgroundColor: rowColor }}
                        onClick={(e) =>
                          handleRowClick(e.currentTarget, rowColor)
                        }
                        ref={(el) => {
                          if (el) {
                            ele.ref = el;
                          }
                        }}
                      >
                        {keys?.map((bodyData, inx) => (
                          <td
                            key={inx}
                            data-title={
                              thead[inx]?.name ? thead[inx]?.name : thead[inx]
                            }
                          >
                            {ele[bodyData]?.label
                              ? ele[bodyData]?.label
                              : ele[bodyData]}
                            {isMobile && <>&nbsp;</>}
                          </td>
                        ))}
                      </tr>
                    </>
                  );
                })}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    )
  );
}

export default Tables;
