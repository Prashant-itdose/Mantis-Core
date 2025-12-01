import React from "react";

const TripDetailModal = ({ visible, setVisible }) => {
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
      <table className="table table-bordered table-sm " style={{ fontWeight: "bold", width: "" }}>
  <tbody>
    <tr>
      <td>State:</td>
      <td>{visible?.showData?.StateName}</td>
    </tr>
    <tr>
      <td>City:</td>
      <td>{visible?.showData?.City}</td>
    </tr>
    <tr>
      <td>Locality:</td>
      <td>{visible?.showData?.Locality}</td>
    </tr>
    <tr>
      <td>Trip:</td>
      <td>{visible?.showData?.tripname}</td>
    </tr>
    <tr>
      <td>Clients:</td>
      <td>{visible?.showData?.Client_name}</td>
    </tr>
    <tr>
      <td>Teammates:</td>
      <td>{visible?.showData?.OtherEmployees}</td>
    </tr>
  </tbody>
</table>

      </div>
    </>
  );
};
export default TripDetailModal;
