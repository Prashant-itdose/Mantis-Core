import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { headers } from "../../../utils/apitools";
import { apiUrls } from "../../../networkServices/apiEndpoints";
import { useCryptoLocalStorage } from "../../../utils/hooks/useCryptoLocalStorage";
const UpdateViewIssueTableModal = ({visible}) => {
    const[tableData,setTableData]=useState([])
  const handleUpdateSearch = () => {
    // setLoading(true);
    let form = new FormData();
    form.append("ID", useCryptoLocalStorage("user_Data", "get", "ID")),
      form.append("TicketID", "");
    axios
      .post(apiUrls?.UpdateTicket, form, {
        headers,
      })
      .then((res) => {
        setTableData(res?.data?.data);
        // setLoading(false);
        console.log("manik", res?.data?.data);
      })
      .catch((err) => {
        toast.error(
          err?.response?.data?.message
            ? err?.response?.data?.message
            : "Error Occured"
        );
        // setLoading(false);
      });
  };

  useEffect(() => {
    handleUpdateSearch();
  });

  return <>hjkhj</>;
};
export default UpdateViewIssueTableModal;
