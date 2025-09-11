import React from "react";
import Welcome from "../components/WelComeCard/Welcome";

const ClientDashboard = () => {
  return (
    <>
        <div className="card">
        <div className="row">
          <div className="col-12">
            <Welcome />
          </div>
        </div>
        </div>
    </>
  );
}
export default ClientDashboard;