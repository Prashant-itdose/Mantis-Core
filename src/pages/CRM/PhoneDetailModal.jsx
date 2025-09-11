import React from "react";

const PhoneDetailModal = ({ visible, setVisible }) => {
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
              <td>Phone Amount:</td>
              <td>{visible?.showData?.phone_Expense}</td>
            </tr>
            <tr>
              <td>Phone Description:</td>
              <td>{visible?.showData?.PhoneDescription}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};
export default PhoneDetailModal;
