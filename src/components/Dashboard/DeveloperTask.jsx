import React, { useEffect, useState } from "react";
import Tables from "../UI/customTable";
import Heading from "../UI/Heading";
import AmountSubmissionSeeMoreList from "../../networkServices/AmountSubmissionSeeMoreList";
import { useSelector } from "react-redux";
import SlideScreen from "../../pages/SlideScreen";
import SeeMoreSlideScreen from "../SearchableTable/SeeMoreSlideScreen";
import { useTranslation } from "react-i18next";
import { apiUrls } from "../../networkServices/apiEndpoints";
import { headers } from "../../utils/apitools";
import axios from "axios";
import { useCryptoLocalStorage } from "../../utils/hooks/useCryptoLocalStorage";
const DeveloperTask = () => {
  const [t] = useTranslation();
  const [listVisible, setListVisible] = useState(false);
  const [tableData, setTableData] = useState([]);
  const { memberID, developerSearchType } = useSelector(
    (state) => state?.loadingSlice
  );
  const [renderComponent, setRenderComponent] = useState({
    name: "",
    component: null,
  });
  const ModalComponent = (name, component) => {
    setListVisible(true);
    setRenderComponent({
      name: name,
      component: component,
    });
  };
  const [seeMore, setSeeMore] = useState([]);

  const handleChangeComponent = (e) => {
    ModalComponent(e?.label, e?.component);
  };
  const newFileTHEAD = [
    t("S.No."),
    t("Developer Name"),
    t("Date"),
    t("Total Time"),
  ];
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;
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

  const handleFirstDashboardCount = (developerId, searchType) => {
    let form = new FormData();
    form.append("ID", useCryptoLocalStorage("user_Data", "get", "ID"));
    form.append("DeveloperID", developerId);
    form.append("SearchType", searchType == "" ? "0" : searchType);
    axios
      .post(apiUrls?.CoorDashboard_Developer_Availability, form, { headers })
      .then((res) => {
        setTableData(res?.data?.data);
      })
      .catch((err) => {
        console.error("API error:", err);
      });
  };

  useEffect(() => {
    handleFirstDashboardCount(memberID, developerSearchType);
  }, [memberID, developerSearchType]);

  return (
    <>
      {tableData?.length > 0 ? (
        <div className="card">
          <Heading
            title={t("Developer Avaibility Next 10 Days Planning")}
            // secondTitle={
            //   <>
            //     <span style={{ height: "20px" }}>
            //       <AmountSubmissionSeeMoreList
            //         ModalComponent={ModalComponent}
            //         isShowDropDown={false}
            //         setSeeMore={setSeeMore}
            //         data={{
            //           ...tableData,
            //           type: "Reopen",
            //           LotusAssign: memberID,
            //         }}
            //         setVisible={() => {
            //           setListVisible(false);
            //         }}
            //         handleBindFrameMenu={[
            //           {
            //             FileName: "View Issues",
            //             URL: "ViewIssues",
            //             FrameName: "ViewIssues",
            //             Description: "ViewIssues",
            //           },
            //         ]}
            //         isShowPatient={true}
            //       />
            //     </span>
            //   </>
            // }
          />
          <Tables
            thead={newFileTHEAD}
            tbody={currentData?.map((ele, index) => ({
              "S.No.": index + 1,
              "Developer Name": ele?.Name,
              Date: ele?.Date,
              "Total Time": ele?.Time_Left,
            }))}
            tableHeight={"tableHeight"}
          />
          <div className="pagination ml-auto">
            <div>
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <span>
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          </div>
          <SlideScreen
            visible={listVisible}
            setVisible={() => {
              setListVisible(false);
              setRenderComponent({
                name: null,
                component: null,
              });
            }}
            Header={
              <SeeMoreSlideScreen
                name={renderComponent?.name}
                seeMore={seeMore}
                handleChangeComponent={handleChangeComponent}
              />
            }
          >
            {renderComponent?.component}
          </SlideScreen>
        </div>
      ) : (
        <span
          style={{
            fontWeight: "bold",
            textAlign: "center",
            marginLeft: "10px",
          }}
        >
          {" "}
          No Data Found
        </span>
      )}
    </>
  );
};
export default DeveloperTask;
