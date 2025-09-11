import React, { Suspense, useCallback } from "react";
import SeeMoreSlideScreen from "../components/SearchableTable/SeeMoreSlideScreen.jsx";
import { useNavigate } from "react-router-dom";


function LeaveRequestList({ ModalComponent, setSeeMore, data, isShowPatient, handleBindFrameMenu,setVisible,isShowDropDown }) {
    const navigate = useNavigate();
  const importComponent = (path) => {
    // console.log("path path",path)
    return React.lazy(() =>
      import(`../pages/LeaveRequest.jsx`)
        .then((module) => ({ default: module.default }))
        .catch(() => ({ default: () => <div>Component not found: {path}</div> }))
    );
  };
  function BillingSeeMoreList(handleBindFrameMenu, data) {
    let patientDetail = {
      ...data,
    //   transactionID: data.TID, patientID: data?.PatientID,
    }

    let seeMore = [];
    for (let i = 0; i < handleBindFrameMenu?.length; i++) {
      const { URL, FileName } = handleBindFrameMenu[i];
      const Component = importComponent(URL);
      const Obj = {
        name: FileName,
        component: (
          <div key={i}>
            <Suspense fallback={<div>Loading...</div>}>
              {/* {isShowPatient && <EMGPersonalDetailsOfPatient data={data} />} */}
              <Component data={patientDetail}  setVisible={setVisible}/>
            </Suspense>
          </div>
        ),
      };
      seeMore.push(Obj);
    }
    return seeMore;
  }
  const handleComponentRender = async (data, items) => {
      const componentData = BillingSeeMoreList([items], data);
      console.log(componentData)
    ModalComponent(componentData[0]?.name, componentData[0]?.component);
    const forsetSeeMore = BillingSeeMoreList(handleBindFrameMenu, data);
    setSeeMore(forsetSeeMore);
  };
// console.log(data)
  const handleBindFrameMenuByRoleIDS = useCallback(
    (dataBind) => {
      return dataBind?.map((items, _) => {
        return {
          ...items,
          name: items?.FileName,
        };
      });
    },
    [handleBindFrameMenu]
  );

  return (
    <>
      <div style={{ position: "relative" }}>
        <SeeMoreSlideScreen
          seeMore={handleBindFrameMenuByRoleIDS(handleBindFrameMenu)}
          handleChangeComponent={(item) => handleComponentRender(data, item)}
          data={data}
          isShowDropDown={isShowDropDown}
        />
      </div>
    </>
  );
}

export default LeaveRequestList;