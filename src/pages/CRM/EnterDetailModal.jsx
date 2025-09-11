import React from "react";

const EnterDetailModal = ({ visible, setVisible }) => {
  console.log("visible", visible);
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
              <td>Entertainment Amount:</td>
              <td>{visible?.showData?.entertainment_Expense}</td>
            </tr>
          
            <tr>
              <td>Entertainment Description:</td>
              <td>{visible?.showData?.EntermentDescription}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};
export default EnterDetailModal;
