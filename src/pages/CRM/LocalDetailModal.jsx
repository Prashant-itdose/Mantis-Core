import React, { useEffect, useState } from "react";
import Tables from "../../components/UI/customTable";
import axios from "axios";
import { apiUrls } from "../../networkServices/apiEndpoints";
import { headers } from "../../utils/apitools";
const LocalDetailModal = ({ visible, setVisible }) => {
  console.log(visible);
  // const localData = localTabelData?.filter(
  //   (item) => item?.expense_report_master_Id === expense_report_ID
  // );

  const [tableData, setTableData] = useState([]);
  const handleSearch = () => {
    axiosInstances
      .post(apiUrls.ExpenceDetails,{
  "ExpenseReportID": Number(visible?.showData?.expense_report_ID),
  "ActionType": "Local"
})
    // let form = new FormData();
    // form.append("ExpenseReportID", visible?.showData?.expense_report_ID),
    //   form.append("ActionType", "Local"),
    //   axios
    //     .post(apiUrls?.ExpenceDetails, form, { headers })
        .then((res) => {
          // setTableData(res?.data?.dtDetailLocal);
          const data = res?.data?.dtDetailLocal;
          if (Array.isArray(data)) {
            setTableData(data);
          } else {
            setTableData([]); // fall back to empty array
          }
        })
        .catch((err) => {
          console.log(err);
        });
  };
  const localTHEAD = [
    "S.No.",
    "TravelBy",
    "From",
    "To",
    "Amount",
    "Description",
  ];
  useEffect(() => {
    handleSearch();
  }, []);
  return (
    <>
      {tableData?.length > 0 ? (
        <div className="card">
          <Tables
            thead={localTHEAD}
            tbody={tableData?.map((ele, index) => ({
              "S.No.": index + 1,
              TravelBy: ele?.traveling_by,
              From: ele?.tavling_from,
              To: ele?.tavling_to,
              Amount: ele?.traveling_amount,
              Description: ele?.traveling_description,
            }))}
            tableHeight={"tableHeight"}
          />
        </div>
      ) : (
        <span className="text-align-center text-black ">No Data Found</span>
      )}
    </>
  );
};
export default LocalDetailModal;
