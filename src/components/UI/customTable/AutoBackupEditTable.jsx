import React from "react";

import { Tooltip } from "primereact/tooltip";
// import { BillPRINTTYPE, ReceiptPRINTTYPE } from "../../../../utils/constant";
import Tables from ".";
import { useTranslation } from "react-i18next";
const AutoBackupEditTable = (props) => {
    const [t] = useTranslation();
    const {  tbody = [...tbody], values, handleCustomSelect } = props;



    const THEAD = [
        t("S.No."),
        t("Project Name"),
        t("O_Email"),
        t("SPOC_Email"),
        t("Subject"),
        t("Description"),
        t("Autobackup Date")
    ];


    return (
        <>
            {tbody?.map((item, index) => (
                <Tooltip
                    key={index}
                    target={`#doctorName-${index}, #visitType-${index}`}
                    position="top"
                />
            ))}
            {console.log(THEAD)}
            <Tables
                thead={THEAD}
                tbody={tbody?.map((ele, index) => ({
                    "S.No.": index + 1,
                    "Project Name": ele?.ProjectName,
                    "O_Email": ele?.Owner_Email,
                    "SPOC_Email":ele.SPOC_EmailID,
                    "Subject": ele?.ProjectName,
                    "Description": ele?.remark,
                    "Autobackup Date": ele?.lastdate,
                }))}

                tableHeight={"tableHeight"}
            />
        </>
    );
};

export default AutoBackupEditTable;
