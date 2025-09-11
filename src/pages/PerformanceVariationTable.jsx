import React, { useEffect, useState } from "react";
import Tables from "../components/UI/customTable";
import { apiUrls } from "../networkServices/apiEndpoints";
import { headers } from "../utils/apitools";
import axios from "axios";
import Loading from "../components/loader/Loading";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useCryptoLocalStorage } from "../utils/hooks/useCryptoLocalStorage";

const PerformanceVariationTable = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [tableData, setTableData] = useState([]);
  console.log("lotus", tableData);
  const performanceTHEAD = [t("S.No."), t("Month"), t("Values")];
  const { memberID } = useSelector((state) => state?.loadingSlice);
  const handleFirstDashboardCount = () => {
    setLoading(true);
    let form = new FormData();
    form.append("ID", useCryptoLocalStorage("user_Data", "get", "ID")),
      form.append("Title", "MonthlyDeveloperPerformance");
    form.append("DeveloperID", memberID || 0),
      axios
        .post(apiUrls?.DevDashboard_Summary, form, { headers })
        .then((res) => {
          setTableData(res?.data?.dtOverAllMonthlyPerformance);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
  };
  useEffect(() => {
    handleFirstDashboardCount();
  }, []);
  useEffect(() => {
    handleFirstDashboardCount(memberID);
  }, [memberID]);

  return (
    <>
      <div className="card ">
        {loading ? (
          <Loading />
        ) : (
          <Tables
            thead={performanceTHEAD}
            tbody={tableData?.map((ele, index) => ({
              "S.No.": index + 1,
              Month: ele?.Month,
              values: ele?.Values,
              //  values: ele?.Values.toFixed(2)
            }))}
            tableHeight={"tableHeight"}
          />
        )}
      </div>
    </>
  );
};
export default PerformanceVariationTable;
