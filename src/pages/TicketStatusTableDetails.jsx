import React, { useState } from "react";
import Tables from "../components/UI/customTable";
import Loading from "../components/loader/Loading";
import { useTranslation } from "react-i18next";

const TicketStatusTableDetails = ({ visible }) => {
  // console.log("data fata", visible);
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const performanceTHEAD = [t("S.No."), t("Status"), t("Count")];

  return (
    <>
      <div className="card ">
        {loading ? (
          <Loading />
        ) : (
          <Tables
            thead={performanceTHEAD}
            tbody={visible?.showData?.map((ele, index) => ({
              "S.No.": index + 1,
              Status: ele?.StatusNew,
              Count: ele?.Ticket,
            }))}
            tableHeight={"tableHeight"}
          />
        )}
      </div>
    </>
  );
};
export default TicketStatusTableDetails;
