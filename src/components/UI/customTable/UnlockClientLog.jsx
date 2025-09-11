import axios from "axios";
import React, { useEffect, useState } from "react";
import { apiUrls } from "../../../networkServices/apiEndpoints";
import { headers } from "../../../utils/apitools";
import { toast } from "react-toastify";
import Heading from "../Heading";
import Tables from ".";
import { useTranslation } from "react-i18next";
import { useCryptoLocalStorage } from "../../../utils/hooks/useCryptoLocalStorage";
const UnlockClientLog = ({ visible }) => {
  const [tableData, setTableData] = useState([]);
const [t]=useTranslation()
  const handleget = () => {
    let form = new FormData();
    form.append("ID", useCryptoLocalStorage("user_Data", "get", "ID")),
      form.append("LoginName", useCryptoLocalStorage("user_Data", "get", "realname")),
      form.append("ProjectID", visible?.showData?.ProjectID),
      axios
        .post(apiUrls?.LedgerStatus_LockUnLock_Log, form, { headers })
        .then((res) => {
          setTableData(res?.data?.Data);
          // setVisible((val) => ({ ...val, showLog: false }));
        })
        .catch((err) => {
          console.log(err);
        });
  };
  const logTHEAD = [
    t("S.No."),
    t("CreatedBy"),
    t("Created Date"),
    t("LockUnLockReason"),
    t("MaxExpiry Date"),
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;
  const totalPages = Math.ceil(tableData?.length / rowsPerPage);
  const currentData = tableData?.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );
  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };
  useEffect(() => {
    handleget();
  }, []);
  return (
    <>
      <div className="row m-2">
        <span style={{ fontWeight: "bold", marginLeft: "0px" }}>
          {t("Project Name")} : &nbsp; {visible?.showData?.ProjectName}
        </span>
      </div>
      <div className="card mt-4">
        <Heading title={t("Log Details")} />
        <Tables
          thead={logTHEAD}
          tbody={currentData?.map((ele, index) => ({
            "S.No.": (currentPage - 1) * rowsPerPage + index + 1,
            CreatedBy: ele?.CreatedBy,
            "Created Date": ele?.CreatedDate
              ? new Date(ele.CreatedDate)
                  .toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })
                  .replace(" ", "-")
                  .replace(" ", "-")
              : "",
            LockUnLockReason: ele?.LockUnLockReason,
            "MaxExpiry Date": ele?.MaxExpiry
              ? new Date(ele.MaxExpiry)
                  .toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })
                  .replace(" ", "-")
                  .replace(" ", "-")
              : "",
          }))}
          tableHeight={"tableHeight"}
        />
        <div className="pagination ml-auto">
          <div>
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              {t("Previous")}
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              {t("Next")}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UnlockClientLog;
