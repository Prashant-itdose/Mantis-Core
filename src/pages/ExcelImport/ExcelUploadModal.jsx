import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { axiosInstances } from "../../networkServices/axiosInstance";
import { apiUrls } from "../../networkServices/apiEndpoints";
import { notify } from "../../utils/utils";
import ExcelPreviewHandler from "./ExcelPreviewHandler";
import { ExportToExcel } from "../../networkServices/Tools";

const ExcelUploadModal = () => {
  const dispatch = useDispatch();
  const { importExcelData } = useSelector((data) => data?.loadingSlice);

  const [t] = useTranslation();
  const initPayload = {
    downlaodOption: "",
    rateList: "",
    Investigation: "",
  };
  const [payload, setPayload] = useState(initPayload);

  const getDownloadExcelData = async () => {
    if (!payload?.downlaodOption) {
      notify("Kinldy Select Download Option", "warn");
      return;
    }
    if (payload?.downlaodOption == "RateTypeWise" && !payload?.rateList) {
      notify("Kinldy Select RateList", "warn");
      return;
    }
    if (payload?.downlaodOption !== "RateTypeWise" && !payload?.Investigation) {
      notify("Kinldy Select Investigation", "warn");
      return;
    }
    const rateListPayload = {
      typeName: "",
      typeID: "",
    };
    dispatch(setLoading(true));
    await axiosInstances
      .post(apiUrls?.GetRateListWithType, rateListPayload)
      .then((res) => {
        if (Array.isArray(res?.data?.message)) {
          ExportToExcel(res?.data?.message);
          notify("Download successfully.", "success");
          return;
        }
        notify(res?.data?.message, "error");
      })
      .catch((err) => console.log(err))
      .finally(() => {
        dispatch(setLoading(true));
      });
  };

  const saveImported = async () => {
    if (importExcelData?.length == 0) {
      notify("Kindly import excel data", "warn");
      return;
    }
    dispatch(setLoading(true));
    await axiosInstances
      .post(apiUrls?.SaveRateList, { data: importExcelData })
      .then((res) => {
        console.log("res");
        notify(res?.data?.message, "success");
        // dispatch(setImportExcelData([]));
        setPayload(initPayload);
      })
      .catch((err) => {
        console.log("err");
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  };

  return (
    <>
      <div className="importInHouseDoctorModal_main row">
        <div
          style={{ gap: "4px" }}
          className="ml-1 mt-1"
        >
          <ExcelPreviewHandler />
        </div>
      </div>
      <div
        style={{ gap: "4px" }}
        className="d-flex border-top py-2 mt-2 justify-content-center align-items-center"
      >
        <Button onClick={saveImported} className="rounded px-4">
          Save
        </Button>
      </div>
    </>
  );
};

export default ExcelUploadModal;
