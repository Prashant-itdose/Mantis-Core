import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const OrganizationalChart1 = () => {
  const [orgData] = useState({
    ceo: {
      name: "Prashant Singhal",
      position: "DGM(Support & Services)",
      image: "https://i.pravatar.cc/150?img=12",
      color: "danger",
    },
    managers: [
      {
        id: 1,
        name: "Mukesh Kumar",
        position: "Asst. Manager",
        image: "https://i.pravatar.cc/150?img=12",
        color: "warning",
        team: [
          {
            name: "Jai Prakash",
            position: "Functional Consultant",
            image: "https://i.pravatar.cc/150?img=12",
          },
          {
            name: "Amit Dubey",
            position: "Software Developer",
            image: "https://i.pravatar.cc/150?img=12",
          },
          //   { name: "Pulkit Mittal", position: "Software Developer", image: "https://i.pravatar.cc/150?img=15" }
        ],
      },
      {
        id: 2,
        name: "Aman Srivstav",
        position: "Asst. Manager",
        image: "https://i.pravatar.cc/150?img=12",
        color: "info",
        team: [
          {
            name: "Ravi Mishra",
            position: "Functional Consultant",
            image: "https://i.pravatar.cc/150?img=12",
          },
          {
            name: "Ajay Mishra",
            position: "Software Developer",
            image: "https://i.pravatar.cc/150?img=12",
          },
        ],
      },
      {
        id: 3,
        name: "Sandeep Maurya",
        position: "Asst. Manager",
        image: "https://i.pravatar.cc/150?img=12",
        color: "primary",
        team: [
          {
            name: "Diwakar Bhadola",
            position: "Functional Consultant",
            image: "https://i.pravatar.cc/150?img=12",
          },
        ],
      },
      {
        id: 4,
        name: "Pankaj Patahak",
        position: "Asst. Manager",
        image: "https://i.pravatar.cc/150?img=12",
        color: "purple",
        team: [
          {
            name: "Sachin Shukla",
            position: "Machine FC",
            image: "https://i.pravatar.cc/150?img=12",
          },
        ],
      },
    ],
  });

  const EmployeeCard = ({ employee, color, isTeamMember = false }) => (
    <div
      className="d-flex flex-column align-items-center position-relative"
      style={{ margin: "0 10px" }}
    >
      <div className="position-relative mb-0 mt-2">
        <div
          className={`rounded-circle overflow-hidden ${isTeamMember ? "border-secondary" : `border-${color}`}`}
          style={{
            width: isTeamMember ? "80px" : "100px",
            height: isTeamMember ? "80px" : "100px",
            border: "3px solid",
            backgroundColor: "#fff",
          }}
        >
          <img
            src={employee.image}
            alt={employee.name}
            className="w-100 h-100 object-fit-cover"
          />
        </div>
        <span
          className={`position-absolute ${isTeamMember ? "bg-secondary" : `bg-${color}`} text-white rounded-circle d-flex align-items-center justify-content-center`}
          style={{
            width: "25px",
            height: "25px",
            top: "-5px",
            right: "-5px",
            fontSize: "14px",
            fontWeight: "bold",
          }}
        >
          +{/* {employee?.name?.charAt?.(0)} */}
        </span>
      </div>
      <div
        className="text-center bg-white border rounded"
        style={{ minWidth: isTeamMember ? "120px" : "140px" }}
      >
        <p
          className="mb-0 p-2 fw-semibold"
          style={{ fontSize: isTeamMember ? "12px" : "14px" }}
        >
          {employee.name}
        </p>
        <div
          className={`${isTeamMember ? "bg-secondary" : `bg-${color}`} text-white py-1`}
          style={{ fontSize: isTeamMember ? "10px" : "11px" }}
        >
          {employee.position}
        </div>
      </div>
    </div>
  );

  return (
    <div
      className="container-fluid py-0"
      style={{ backgroundColor: "#f8f9fa" }}
    >
      {/* <div className="row mb-4">
        <div className="col-12">
          <h2 className="fw-bold mb-0">ORGANIZATIONAL</h2>
          <h2 className="fw-bold">CHART</h2>
          <p className="text-muted">INFOGRAPHIC</p>
        </div>
      </div> */}

      {/* CEO Level */}
      <div className="d-flex justify-content-center mb-1">
        <EmployeeCard employee={orgData.ceo} color={orgData.ceo.color} />
      </div>

      {/* Connection Line to Managers */}
      <div className="d-flex justify-content-center mb-1">
        <div
          style={{
            width: "2px",
            height: "40px",
            backgroundColor: "#dee2e6",
          }}
        ></div>
      </div>

      {/* Horizontal Line for Managers */}
      <div className="d-flex justify-content-center mb-1">
        <div
          className="position-relative"
          style={{ width: "80%", maxWidth: "900px" }}
        >
          <div
            style={{
              height: "2px",
              backgroundColor: "#dee2e6",
              width: "100%",
            }}
          ></div>
          <div
            className="d-flex justify-content-between position-absolute w-100"
            style={{ top: "-1px" }}
          >
            {orgData.managers.map((_, index) => (
              <div
                key={index}
                style={{
                  width: "2px",
                  height: "40px",
                  backgroundColor: "#dee2e6",
                }}
              ></div>
            ))}
          </div>
        </div>
      </div>

      {/* Managers Level */}
      <div className="d-flex justify-content-center mb-1">
        <div
          className="d-flex justify-content-between"
          style={{ width: "80%", maxWidth: "900px" }}
        >
          {orgData.managers.map((manager) => (
            <EmployeeCard
              key={manager.id}
              employee={manager}
              color={manager.color}
            />
          ))}
        </div>
      </div>

      {/* Connection Lines to Team Members */}
      <div className="d-flex justify-content-center mb-4">
        <div
          className="d-flex justify-content-between"
          style={{ width: "80%", maxWidth: "900px" }}
        >
          {orgData.managers.map((manager) => (
            <div
              key={manager.id}
              className="d-flex flex-column align-items-center"
              style={{ flex: 1 }}
            >
              <div
                style={{
                  width: "2px",
                  height: "40px",
                  backgroundColor: "#dee2e6",
                }}
              ></div>
              {manager.team.length > 1 && (
                <div className="position-relative" style={{ width: "150px" }}>
                  <div
                    style={{
                      height: "2px",
                      backgroundColor: "#dee2e6",
                      width: "100%",
                    }}
                  ></div>
                  <div
                    className="d-flex justify-content-between position-absolute w-100"
                    style={{ top: "-1px" }}
                  >
                    {manager.team.map((_, idx) => (
                      <div
                        key={idx}
                        style={{
                          width: "2px",
                          height: "20px",
                          backgroundColor: "#dee2e6",
                        }}
                      ></div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Team Members Level */}
      <div className="d-flex justify-content-center">
        <div
          className="d-flex justify-content-between"
          style={{ width: "80%", maxWidth: "900px" }}
        >
          {orgData.managers.map((manager) => (
            <div
              key={manager.id}
              className="d-flex justify-content-center"
              style={{ flex: 1, gap: "10px" }}
            >
              {manager.team.map((member, idx) => (
                <EmployeeCard
                  key={idx}
                  employee={member}
                  color="secondary"
                  isTeamMember={true}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Instructions */}
      {/* <div className="row mt-5">
        <div className="col-12">
          <div className="alert alert-info">
            <h5>How to customize:</h5>
            <ul>
              <li>Edit the <code>orgData</code> state to add/modify employees</li>
              <li>Change colors using Bootstrap color classes: primary, secondary, success, danger, warning, info, dark</li>
              <li>Add more team members to the <code>team</code> array</li>
              <li>Replace image URLs with your actual employee photos</li>
            </ul>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default OrganizationalChart1;
