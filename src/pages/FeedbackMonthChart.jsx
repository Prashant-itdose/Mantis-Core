import React, { useState } from "react";
import Tables from "../components/UI/customTable";

const FeedbackMonthChart = () => {
  const [tableData, setTableData] = useState([
    {
      Company: "Itdose",
      Priority: "Ist",
      Done: "30",
      Pending: "4",
      Total: "2000",
    },
    {
      Company: "Genix",
      Priority: "2nd",
      Done: "60",
      Pending: "2",
      Total: "1000",
    },
    {
      Company: "Mediland",
      Priority: "3rd",
      Done: "20",
      Pending: "3",
      Total: "1600",
    },
  ]);
  const newFileTHEAD = ["Priority", "Total", "Done", "Pending"];
  return (
    <>
      <div className="card">
        <Tables
          thead={newFileTHEAD}
          tbody={[
            ...tableData?.map((ele, index) => ({
              Priority: ele?.Priority,
              Total: ele?.Total,
              Done: ele?.Done,
              Pending: ele?.Pending,
            })),
            {
              Priority: "Grand Total",
              Total: tableData?.reduce(
                (acc, ele) => acc + Number(ele?.Total || 0),
                0
              ),
              Done: tableData?.reduce(
                (acc, ele) => acc + Number(ele?.Done || 0),
                0
              ),
              Pending: tableData?.reduce(
                (acc, ele) => acc + Number(ele?.Pending || 0),
                0
              ),
            },
          ]}
          tableHeight={"tableHeight"}
        />
      </div>
    </>
  );
};
export default FeedbackMonthChart;
