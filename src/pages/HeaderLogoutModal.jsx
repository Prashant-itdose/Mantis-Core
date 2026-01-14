import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// import { speakMessage } from "../utils/utils";
// import { useCryptoLocalStorage } from "../utils/hooks/useCryptoLocalStorage";

const HeaderLogoutModal = ({ setVisible }) => {
  const [routeFlag, setRouteFlag] = useState(false);
  const signout = useSelector((state) => state.logoutSlice);
  // const nameReal = useCryptoLocalStorage("user_Data", "get", "realname");
  useEffect(() => {
    routeFlag && signout?.success && navigate("/login");
  }, [signout?.success]);
  const navigate = useNavigate();

  const handlelogOut = () => {
    // localStorage.clear();
    // localStorage.clear();
    setRouteFlag(true);
    // speakMessage(`Logout Successfully ${nameReal}`);
    navigate("/login");
  };

  const handleNo = () => {
    setVisible(false);
  };

  return (
    <>
      <div className="card">
        <div className="row p-2 d-flex justify-content-space-between align-items-center">
          <div className="col-sm-12">
          <span style={{ fontWeight: "bold", marginLeft: "10px" }}>
            Please confirm, Do you want to logout?
          </span>

          <button className="btn btn-sm btn-danger ml-3" onClick={handlelogOut} style={{cursor:"pointer"}}>
            Yes
          </button>
          <button className="btn btn-sm btn-danger ml-3" onClick={handleNo} style={{cursor:"pointer"}}>
            No
          </button>
        </div></div>
      </div>
    </>
  );
};

export default HeaderLogoutModal;
