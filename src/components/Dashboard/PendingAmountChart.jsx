import React, { useState } from "react";
import Tables from "../UI/customTable";
import AmountSubmissionSeeMoreList from "../../networkServices/AmountSubmissionSeeMoreList";
import Heading from "../UI/Heading";
import SlideScreen from "../../pages/SlideScreen";
import SeeMoreSlideScreen from "../SearchableTable/SeeMoreSlideScreen";
import { useSelector } from "react-redux";

const PendingAmountChart = () => {
   const [listVisible, setListVisible] = useState(false);
  const [tableData, setTableData] = useState([
    {
      Priority: "P1",
      Week: "500000",
      MoreWeek: "30000",
      Month: "40000",
      Total: "",
    },
    {
      Priority: "P2",
      Week: "200000",
      MoreWeek: "60000",
      Month: "25000",
      Total: "",
    },
    {
      Priority: "P3",
      Week: "260000",
      MoreWeek: "20000",
      Month: "35000",
      Total: "",
    },
  ]);
  const { memberID } = useSelector((state) => state?.loadingSlice);
  const [renderComponent, setRenderComponent] = useState({
    name: "",
    component: null,
  });
  const ModalComponent = (name, component) => {
    // console.log("name component", name, component);
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
    "Priority",
    "With in Week",
    "More than Week",
    "Month",
    "Total",
  ];
  return (
    <>
      <div className="card">
      <Heading
          title="Recovery"
          secondTitle={
            <>
              {/* <i className="fa fa-eye"></i> */}
              <span className="ledger-span">
                <AmountSubmissionSeeMoreList
                  ModalComponent={ModalComponent}
                  isShowDropDown={false}
                  setSeeMore={setSeeMore}
                  data={{
                    ...tableData,
                    type: "DeveloperTask",
                    assigntovalue: "AssignCheck",
                    LotusAssign: memberID,
                  }}
                  setVisible={() => {
                    setListVisible(false);
                  }}
                  handleBindFrameMenu={[
                    {
                      FileName: "View Issues",
                      URL: "viewissues",
                      FrameName: "viewissues",
                      Description: "viewissues",
                    },
                  ]}
                  isShowPatient={true}
                />
              </span>
            </>
          }
        />
        <Tables
          thead={newFileTHEAD}
          tbody={[
            ...tableData?.map((ele, index) => ({
              Priority: ele?.Priority,
              "With in Week": ele?.Week,
              "More than Week": ele?.MoreWeek,
              Month: ele?.Month,
              Total:
                Number(ele?.Week || 0) +
                Number(ele?.MoreWeek || 0) +
                Number(ele?.Month || 0),
            })),
            {
              Priority: "Grand Total",
              "With in Week": tableData?.reduce(
                (acc, ele) => acc + Number(ele?.Week || 0),
                0
              ),
              "More than Week": tableData?.reduce(
                (acc, ele) => acc + Number(ele?.MoreWeek || 0),
                0
              ),
              Month: tableData?.reduce(
                (acc, ele) => acc + Number(ele?.Month || 0),
                0
              ),
              Total: tableData?.reduce(
                (acc, ele) =>
                  acc +
                  (Number(ele?.Week || 0) +
                    Number(ele?.MoreWeek || 0) +
                    Number(ele?.Month || 0)),
                0
              ),
            },
          ]}
          tableHeight={"tableHeight"}
        />
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
    </>
  );
};
export default PendingAmountChart;
