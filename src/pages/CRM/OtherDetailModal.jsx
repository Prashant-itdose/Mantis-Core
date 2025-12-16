import React from "react";

const OtherDetailModal = ({ visible, setVisible }) => {
  // console.log("visible", visible);
  return (
    <>
      {/* <div className="card p-2">
        <span style={{ fontWeight: "bold" }}>
            Employee Name : {visible?.showData?.EmpName} &nbsp; &nbsp; &nbsp;
            &nbsp; &nbsp; &nbsp;Date :{" "}
            {new Date(visible?.showData?.DATE)
            .toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric",
            })
            .replace(/ /g, " ")}
            &nbsp;
        </span>
        </div> */}
      <div className="card">
        <table
          className="table table-bordered table-sm "
          style={{ fontWeight: "bold", width: "" }}
        >
          <tbody>
            <tr>
              <td>Other Amount:</td>
              <td>{visible?.showData?.misc_Expense}</td>
            </tr>

            <tr>
              <td>Other Description:</td>
              <td>{visible?.showData?.Description}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};
export default OtherDetailModal;
