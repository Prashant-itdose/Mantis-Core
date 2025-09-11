import React, { useState } from "react";
import Tables from "../UI/customTable";
import AmountSubmissionSeeMoreList from "../../networkServices/AmountSubmissionSeeMoreList";
import SlideScreen from "../../pages/SlideScreen";
import SeeMoreSlideScreen from "../SearchableTable/SeeMoreSlideScreen";

const TaskChart = () => {
  const [listVisible, setListVisible] = useState(false);
  const [tableData, setTableData] = useState([
    {
      Priority: "P1",
      Projects: "23",
      Close: "9",
      Tickets: 10,
    },
    {
      Priority: "P2",
      Projects: "34",
      Close: "7",
      Tickets: 5,
    },
    {
      Priority: "P3",
      Projects: "12",
      Close: "10",
      Tickets: 3,
    },
  ]);
  const newFileTHEAD = ["S.No.", "Priority", "Projects", "Close", "Tickets"];
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
  return (
    <div className="card">
      <Tables
        thead={newFileTHEAD}
        tbody={tableData?.map((ele, index) => ({
          "S.No.": (
            <>
              <div
                className="d-flex"
                style={{
                  justifyContent: "space-between",
                  margin: "0px",
                  padding: "0px",
                }}
              >
                <span>{index + 1}</span>
                <span className="ledger-span">
                  <AmountSubmissionSeeMoreList
                    ModalComponent={ModalComponent}
                    isShowDropDown={false}
                    setSeeMore={setSeeMore}
                    data={ele}
                    setVisible={() => {
                      setListVisible(false);
                    }}
                    handleBindFrameMenu={[
                      {
                        FileName: "View Issues",
                        URL: "ViewIssues",
                        FrameName: "ViewIssues",
                        Description: "ViewIssues",
                      },
                    ]}
                    isShowPatient={true}
                  />
                </span>
              </div>
            </>
          ),
          Priority: ele?.Priority,
          Projects: ele?.Projects,
          Close: ele?.Close,
          Tickets: ele?.Tickets,
        }))}
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
  );
};

export default TaskChart;
