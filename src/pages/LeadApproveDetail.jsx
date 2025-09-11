import React from "react";
import NoRecordFound from "../components/formComponent/NoRecordFound";
import Tables from "../components/UI/customTable";
import Heading from "../components/UI/Heading";

const LeadApproveDetail=(showData)=>{
    console.log("showData", showData);
const tableData=[showData?.visible?.showData]
console.log("tableData", tableData);
const logTHEAD=["S.No.","Created By","Created Date","Base Amount","Tax Amount","Net Amount",]

    return(
        <>
         <div className="card  p-2">
        <span style={{ fontWeight: "bold" }}>
          Organization Name : {showData?.visible?.showData?.OrganizationName} &nbsp; &nbsp;
          &nbsp; &nbsp; &nbsp; Created By : {showData?.visible?.showData?.CreatedBy} &nbsp; &nbsp;
          &nbsp; &nbsp; &nbsp; Created Date : {new Date(showData?.visible?.showData?.dtEntry).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
        </span>
      </div>
        <div className="card">
        {tableData?.length > 0 ? (
        <div className="">
          <Heading title={"Search Details"}/>
          <Tables
            thead={logTHEAD}
            tbody={tableData?.map((ele, index) => ({
              "S.No.": index + 1,
              "Created By": ele?.CreatedBy,
              "Created Date": new Date(ele.dtEntry).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                }),

                "Base Amount": ele?.BaseAmount,
                "Tax Amount": ele?.TaxAmount,
                "Net Amount": ele?.NetAmount,
               

            }))}
            tableHeight={"tableHeight"}
          />
        </div>
      ):<NoRecordFound />}
        </div>
        </>
    )
}
export default LeadApproveDetail;