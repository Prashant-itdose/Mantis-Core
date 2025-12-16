import React from "react";

const HotelDetailModal = ({ visible, setVisible }) => {
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
              <td>HOTEL NAME:</td>
              <td>{visible?.showData?.HotelName}</td>
            </tr>
            <tr>
              <td>HOTEL AMOUNT:</td>
              <td>{visible?.showData?.Hotel_Amount}</td>
            </tr>
            <tr>
              <td>DESCRIPTION:</td>
              <td>{visible?.showData?.Hotel_description}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};
export default HotelDetailModal;
