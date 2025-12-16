import React from "react";

const MealDetailModal = ({ visible, setVisible }) => {
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
              <td>Breakfast Amount:</td>
              <td>{visible?.showData?.BreakfastAmounnt}</td>
            </tr>
            <tr>
              <td>Lunch Amount:</td>
              <td>{visible?.showData?.LunchAmounnt}</td>
            </tr>
            <tr>
              <td>Dinner Amount:</td>
              <td>{visible?.showData?.DinnerAmounnt}</td>
            </tr>
            <tr>
              <td>Description:</td>
              <td>{visible?.showData?.MealsDescription}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};
export default MealDetailModal;
