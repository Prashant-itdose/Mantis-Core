import React, { useState } from "react";
import Input from "../../components/formComponent/Input";
import DatePicker from "../../components/formComponent/DatePicker";
import ReactSelect from "../../components/formComponent/ReactSelect";
import Heading from "../../components/UI/Heading";

const FeedBackLotus = () => {
  const { VITE_DATE_FORMAT } = import.meta.env;
  const [formData, setFormData] = useState({
    Email: "",
    EmailID: "",
    EmailStatus: "",
    EmployeeName: "",
    EmployeeDesignation: "",
    Team: "",
    TeamHead: "",
    FeebackDate: new Date(),
    Section: "",
    EmployeeStrength: "",
    // Excellent: "",
    // Good: "",
    // Average: "",
    // BelowAverage: "",
    // ExceedExpectations: "",
    // MeetExpectations: "",
    // BelowExpectations: "",
  });
  /////////////  JOB PREFENCE ////////////////////////

  const ratingOptions = ["Excellent", "Good", "Average", "BelowAverage"];
  const ratingOptions1 = [
    "ExceedExpectations",
    "MeetExpectations",
    "BelowExpectations",
  ];
  const ratingOptions2 = ["Excellent", "Good", "Fair", "NeedsImprovement"];
  const ratingOptions3 = ["Excellent", "Good", "Fair", "NeedsImprovement"];
  const ratingOptions4 = ["Always", "Mostly", "Occasionally", "Rarely"];

  ////////////////////END /////////////////////////////////

  ////////////////////Skills and Competencies//////////////
  const ratingOptions5 = ["Excellent", "Good", "Fair", "NeedsImprovement"];
  const ratingOptions7 = ["Excellent", "Good", "Fair", "NeedsImprovement"];
  const ratingOptions8 = [
    "Excellent",
    "Good",
    "Fair",
    "NeedsImprovement",
    "Not Applicable",
  ];
  const ratingOptions6 = ["VeryWell", "Well", "Adequately", "Poorly"];
  /////////////////////////////////////////////////////////
  const items = ["Item1", "Item2", "Item3", "Item4", "Item5"];
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNext = () => {
    if (currentIndex < items.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const goToPrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const searchHandleChange1 = (e) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: checked ? 1 : 0,
    }));
  };

  const handleDeliveryChange = (name, e) => {
    const { value } = e;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const searchHandleChange = (e, key) => {
    setFormData({ ...formData, [key]: e.target.value });
  };
  const handleClearSection = (key) => {
    setFormData((prevData) => ({
      ...prevData,
      [key]: "",
    }));
  };

  return (
    <>
      <div className="card">
        <span
          style={{
            fontWeight: "bold",
            textAlign: "left",
            color: "white",
            background: "rgb(103, 58, 183)",
            padding: "6px",
          }}
        >
          Employer Feedback form
        </span>
      </div>
      <div className="card">
        <div className="row m-2">
          <span
            style={{
              textAlign: "center",
              fontWeight: "bold",
              marginRight: "20px",
            }}
          >
            Please fill up all the details in the form given below:
          </span>
          <div className="search-col" style={{ marginLeft: "4px" }}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <label className="switch" style={{ marginTop: "5px" }}>
                <input
                  type="checkbox"
                  name="EmailStatus"
                  checked={formData?.EmailStatus ? 1 : 0}
                  onChange={searchHandleChange1}
                />
                <span className="slider"></span>
              </label>
              <span
                style={{
                  fontSize: "12px",
                }}
              ></span>
            </div>
          </div>
          <Input
            type="text"
            className="form-control"
            id="Email"
            name="Email"
            lable="Email"
            placeholder=" "
            onChange={searchHandleChange}
            value={formData?.Email}
            respclass="col-xl-2 col-md-4 col-sm-6 col-12"
          />
        </div>
      </div>
      <div className="card">
        <div className="row m-2">
          <Input
            type="text"
            className="form-control"
            id="EmployeeName"
            name="EmployeeName"
            lable="Employee Name"
            placeholder=" "
            onChange={searchHandleChange}
            value={formData?.EmployeeName}
            respclass="col-xl-2 col-md-4 col-sm-6 col-12 mt-2"
          />
          <Input
            type="text"
            className="form-control"
            id="EmployeeDesignation"
            name="EmployeeDesignation"
            lable="Employee Designation"
            placeholder=" "
            onChange={searchHandleChange}
            value={formData?.EmployeeDesignation}
            respclass="col-xl-2 col-md-4 col-sm-6 col-12 mt-2"
          />
          <Input
            type="text"
            className="form-control"
            id="Team"
            name="Team"
            lable="Department/Team"
            placeholder=" "
            onChange={searchHandleChange}
            value={formData?.Team}
            respclass="col-xl-2 col-md-4 col-sm-6 col-12 mt-2"
          />
          <Input
            type="text"
            className="form-control"
            id="TeamHead"
            name="TeamHead"
            lable="Team Head"
            placeholder=" "
            onChange={searchHandleChange}
            value={formData?.TeamHead}
            respclass="col-xl-2 col-md-4 col-sm-6 col-12 mt-2"
          />
          <DatePicker
            className="custom-calendar"
            id="FeebackDate"
            name="FeebackDate"
            placeholder={VITE_DATE_FORMAT}
            value={formData?.FeebackDate}
            handleChange={searchHandleChange}
            respclass="col-xl-2 col-md-4 col-sm-6 col-12 mt-2"
          />
          {/* <ReactSelect
            respclass="col-xl-2 col-md-4 col-sm-6 col-12 mt-2"
            name="Section"
            placeholderName="Section"
            dynamicOptions={[
              { label: "Select", value: "0" },
              { label: "Job Performance", value: "1" },
              { label: "Skills and Competencies", value: "2" },
              { label: "Strengths and Areas for Improvement", value: "3" },
            ]}
            value={formData?.Section}
            handleChange={handleDeliveryChange}
            // requiredClassName={"required-fields"}
          /> */}
        </div>
      </div>

      {/* ////////////////////JOB PREFENCE/////////////////////////// */}
      <div className="card JobPrefence">
        <span
          style={{
            fontWeight: "bold",
            textAlign: "left",
            color: "white",
            background: "rgb(103, 58, 183)",
            padding: "6px",
          }}
        >
          Job Performance
        </span>
      </div>
      <div className="card">
        <div className="row m-2">
          {/* <div style={{ display: "flex", justifyContent: "space-between" }}> */}
          <div className="col-sm-6">
            <span
              style={{
                fontWeight: "bold",
                flexGrow: "1",
                display: "inline-block",
              }}
            >
              1.How would you rate the overall performance of the employee?
            </span>
          </div>
          {/* {ratingOptions.map((option) => (
            <div
              className="search-col"
              style={{ marginLeft: "20px" }}
              key={option}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <label className="switch" style={{ marginTop: "5px" }}>
                  <input
                    type="checkbox"
                    name={option}
                    checked={!!formData?.[option]}
                    onChange={searchHandleChange}
                  />
                  <span className="slider"></span>
                </label>
                <span
                  style={{
                    fontSize: "12px",
                    marginLeft: "5px",
                  }}
                >
                  {option.replace(/([A-Z])/g, " $1").trim()}
                </span>
              </div>
            </div>
          ))} */}
          <div className="col-sm-6 " style={{ display: "flex", flexGrow: "1" }}>
            {ratingOptions.map((option) => (
              <div
                className="search-col"
                style={{ marginLeft: "20px", width: "50%" }}
                key={option}
              >
                <div style={{ display: "flex", alignItems: "center" }}>
                  <label className="switch" style={{ marginTop: "5px" }}>
                    <input
                      type="radio"
                      name="ratingGroup1" // Unique name for this group
                      value={option}
                      checked={formData?.rating1 === option} // Use separate state key
                      onChange={(e) => searchHandleChange(e, "rating1")} // Pass key to handler
                    />
                    <span className="slider"></span>
                  </label>
                  <span style={{ fontSize: "14px", marginLeft: "8px" }}>
                    {option.replace(/([A-Z])/g, " $1").trim()}
                  </span>
                </div>
              </div>
            ))}

            <button
              className="btn btn-sm btn-primary ml-5 "
              onClick={() => handleClearSection("rating1")}
              style={{ background: "red", border: "red" }}
            >
              Clear
            </button>
          </div>
        </div>
      </div>
      {/* </div> */}

      <div className="card">
        <div className="row m-2">
          <div className="col-sm-6">
            <span style={{ fontWeight: "bold" }}>
              2.Employee meet the expectations for his role?
              <span style={{ color: "red" }}>*</span>
            </span>
          </div>

          <div className="col-sm-6" style={{ display: "flex", flexGrow: "1" }}>
            {ratingOptions1.map((option) => (
              <div
                className="search-col"
                style={{ marginLeft: "20px", width: "50%" }}
                key={option}
              >
                <div style={{ display: "flex", alignItems: "center" }}>
                  <label className="switch" style={{ marginTop: "5px" }}>
                    <input
                      type="radio"
                      name="ratingGroup2"
                      value={option}
                      checked={formData?.rating2 === option}
                      onChange={(e) => searchHandleChange(e, "rating2")}
                    />
                    <span className="slider"></span>
                  </label>
                  <span style={{ fontSize: "14px", marginLeft: "8px" }}>
                    {option.replace(/([A-Z])/g, " $1").trim()}
                  </span>
                </div>
              </div>
            ))}

            <button
            className="btn btn-sm btn-primary ml-5 "
            onClick={() => handleClearSection("rating2")}
            style={{ background: "red", border: "red" }}
          >
            Clear
          </button>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="row m-2">
          <div className="col-sm-6">
            <span style={{ fontWeight: "bold" }}>
              3.How would you rate the quality of the work completed?
              <span style={{ color: "red" }}>*</span>
            </span>
          </div>
          <div className="col-sm-6" style={{ display: "flex", flexGrow: "1" }}>
            {ratingOptions2.map((option) => (
              <div
                className="search-col"
                style={{ marginLeft: "20px", width: "50%" }}
                key={option}
              >
                <div style={{ display: "flex", alignItems: "center" }}>
                  <label className="switch" style={{ marginTop: "5px" }}>
                    <input
                      type="radio"
                      name="ratingGroup3"
                      value={option}
                      checked={formData?.rating3 === option}
                      onChange={(e) => searchHandleChange(e, "rating3")}
                    />
                    <span className="slider"></span>
                  </label>
                  <span style={{ fontSize: "14px", marginLeft: "8px" }}>
                    {option.replace(/([A-Z])/g, " $1").trim()}
                  </span>
                </div>
              </div>
            ))}

            <button
            className="btn btn-sm btn-primary ml-5 "
            onClick={() => handleClearSection("rating3")}
            style={{ background: "red", border: "red" }}
          >
            Clear
          </button>
          </div>
        </div>
      </div>
      <div className="card">
        <div className="row m-2">
          <div className="col-sm-6">
            <span style={{ fontWeight: "bold" }}>
              4.How would you rate the employee’s time management skills?
              <span style={{ color: "red" }}>*</span>
            </span>
          </div>
          <div className="col-sm-6" style={{ display: "flex", flexGrow: "1" }}>
            {ratingOptions3.map((option) => (
              <div
                className="search-col"
                style={{ marginLeft: "20px", width: "50%" }}
                key={option}
              >
                <div style={{ display: "flex", alignItems: "center" }}>
                  <label className="switch" style={{ marginTop: "5px" }}>
                    <input
                      type="radio"
                      name="ratingGroup4"
                      value={option}
                      checked={formData?.rating4 === option}
                      onChange={(e) => searchHandleChange(e, "rating4")}
                    />
                    <span className="slider"></span>
                  </label>
                  <span style={{ fontSize: "14px", marginLeft: "8px" }}>
                    {option.replace(/([A-Z])/g, " $1").trim()}
                  </span>
                </div>
              </div>
            ))}

            <button
            className="btn btn-sm btn-primary ml-5 "
            onClick={() => handleClearSection("rating4")}
            style={{ background: "red", border: "red" }}
          >
            Clear
          </button>
          </div>
        </div>
      </div>
      <div className="card">
        <div className="row m-2">
          <div className="col-sm-6">
            <span style={{ fontWeight: "bold" }}>
              5.Employee reliable and punctual?
              <span style={{ color: "red" }}>*</span>
            </span>
          </div>
          <div className="col-sm-6" style={{ display: "flex", flexGrow: "1" }}>
            {ratingOptions4.map((option) => (
              <div
                className="search-col"
                style={{ marginLeft: "20px", width: "50%" }}
                key={option}
              >
                <div style={{ display: "flex", alignItems: "center" }}>
                  <label className="switch" style={{ marginTop: "5px" }}>
                    <input
                      type="radio"
                      name="ratingGroup5"
                      value={option}
                      checked={formData?.rating5 === option}
                      onChange={(e) => searchHandleChange(e, "rating5")}
                    />
                    <span className="slider"></span>
                  </label>
                  <span style={{ fontSize: "14px", marginLeft: "8px" }}>
                    {option.replace(/([A-Z])/g, " $1").trim()}
                  </span>
                </div>
              </div>
            ))}

            <button
            className="btn btn-sm btn-primary ml-5 "
            onClick={() => handleClearSection("rating5")}
            style={{ background: "red", border: "red" }}
          >
            Clear
          </button>
          </div>
        </div>
      </div>
      {/* ////////////////////// Skills and Competencies ///////////////////////// */}
      <div className="card Skills&Competencies">
        <span
          style={{
            fontWeight: "bold",
            textAlign: "left",
            color: "white",
            background: "rgb(103, 58, 183)",
            padding: "6px",
          }}
        >
          Skills and Competencies
        </span>
      </div>
      <div className="card">
        <div className="row m-2">
          <div className="col-sm-6">
            <span style={{ fontWeight: "bold" }}>
              1.Please rate the employee’s communication skills.
              <span style={{ color: "red" }}>*</span>
            </span>
          </div>
          <div className="col-sm-6" style={{ display: "flex", flexGrow: "1" }}>
            {ratingOptions5.map((option) => (
              <div
                className="search-col"
                style={{ marginLeft: "20px" }}
                key={option}
              >
                <div style={{ display: "flex", alignItems: "center" }}>
                  <label className="switch" style={{ marginTop: "5px" }}>
                    <input
                      type="radio"
                      name="ratingGroup6"
                      value={option}
                      checked={formData?.rating6 === option}
                      onChange={(e) => searchHandleChange(e, "rating6")}
                    />
                    <span className="slider"></span>
                  </label>
                  <span style={{ fontSize: "14px", marginLeft: "8px" }}>
                    {option.replace(/([A-Z])/g, " $1").trim()}
                  </span>
                </div>
              </div>
            ))}

            <button
              className="btn btn-sm btn-primary ml-5 "
              onClick={() => handleClearSection("rating6")}
              style={{ background: "red", border: "red" }}
            >
              Clear
            </button>
          </div>
        </div>
      </div>
      <div className="card">
        <div className="row m-2">
          <div className="col-sm-6">
            <span style={{ fontWeight: "bold" }}>
              2.How well did the employee work with colleagues and team members?
              <span style={{ color: "red" }}>*</span>
            </span>
          </div>
          <div className="col-sm-6" style={{ display: "flex", flexGrow: "1" }}>
            {ratingOptions6.map((option) => (
              <div
                className="search-col"
                style={{ marginLeft: "20px" }}
                key={option}
              >
                <div style={{ display: "flex", alignItems: "center" }}>
                  <label className="switch" style={{ marginTop: "5px" }}>
                    <input
                      type="radio"
                      name="ratingGroup2"
                      value={option}
                      checked={formData?.rating7 === option}
                      onChange={(e) => searchHandleChange(e, "rating7")}
                    />
                    <span className="slider"></span>
                  </label>
                  <span style={{ fontSize: "14px", marginLeft: "8px" }}>
                    {option.replace(/([A-Z])/g, " $1").trim()}
                  </span>
                </div>
              </div>
            ))}

            <button
            className="btn btn-sm btn-primary ml-5 "
            onClick={() => handleClearSection("rating7")}
            style={{ background: "red", border: "red" }}
          >
            Clear
          </button>
          </div>
        </div>
      </div>
      <div className="card">
        <div className="row m-2">
          <div className="col-sm-6">
            <span style={{ fontWeight: "bold" }}>
              3.How would you rate the employee’s problem-solving abilities?
              <span style={{ color: "red" }}>*</span>
            </span>
          </div>
          <div className="col-sm-6" style={{ display: "flex", flexGrow: "1" }}>
            {ratingOptions7.map((option) => (
              <div
                className="search-col"
                style={{ marginLeft: "20px" }}
                key={option}
              >
                <div style={{ display: "flex", alignItems: "center" }}>
                  <label className="switch" style={{ marginTop: "5px" }}>
                    <input
                      type="radio"
                      name="ratingGroup3"
                      value={option}
                      checked={formData?.rating8 === option}
                      onChange={(e) => searchHandleChange(e, "rating8")}
                    />
                    <span className="slider"></span>
                  </label>
                  <span style={{ fontSize: "14px", marginLeft: "8px" }}>
                    {option.replace(/([A-Z])/g, " $1").trim()}
                  </span>
                </div>
              </div>
            ))}

            <button
            className="btn btn-sm btn-primary ml-5 "
            onClick={() => handleClearSection("rating8")}
            style={{ background: "red", border: "red" }}
          >
            Clear
          </button>
          </div>
        </div>
      </div>
      <div className="card">
        <div className="row m-2">
          <div className="col-sm-6">
            <span style={{ fontWeight: "bold" }}>
              4. How would you rate the employee’s leadership and mentoring
              abilities (if applicable)?
              <span style={{ color: "red" }}>*</span>
            </span>
          </div>
          <div className="col-sm-6" style={{ display: "flex", flexGrow: "1" }}>
            {ratingOptions8.map((option) => (
              <div
                className="search-col"
                style={{ marginLeft: "20px" }}
                key={option}
              >
                <div style={{ display: "flex", alignItems: "center" }}>
                  <label className="switch" style={{ marginTop: "5px" }}>
                    <input
                      type="radio"
                      name="ratingGroup4"
                      value={option}
                      checked={formData?.rating9 === option}
                      onChange={(e) => searchHandleChange(e, "rating9")}
                    />
                    <span className="slider"></span>
                  </label>
                  <span style={{ fontSize: "14px", marginLeft: "8px" }}>
                    {option.replace(/([A-Z])/g, " $1").trim()}
                  </span>
                </div>
              </div>
            ))}

            <button
            className="btn btn-sm btn-primary ml-5 "
            onClick={() => handleClearSection("rating9")}
            style={{ background: "red", border: "red" }}
          >
            Clear
          </button>
          </div>
        </div>
      </div>

      {/* ////////////////////////// Strength and Areas for Improvement////////////////////////////////// */}
      <div className="card StrengthandAreasforImprovement">
        <span
          style={{
            fontWeight: "bold",
            textAlign: "left",
            color: "white",
            background: "rgb(103, 58, 183)",
            padding: "6px",
          }}
        >
          Strength and Areas for Improvement
        </span>
      </div>
      <div className="card">
        <div className="row m-2">
          <span style={{ fontWeight: "bold" }}>
            1.What are the key strengths of employee?
            <span style={{ color: "red" }}>*</span> (Provide specific examples
            if possible)
          </span>
          <textarea
            type="text"
            className="summaryheightRemark mt-2"
            placeholder=" "
            id={"EmployeeStrength"}
            name="EmployeeStrength"
            value={formData?.EmployeeStrength}
            onChange={searchHandleChange}
            //  respclass="col-xl-10 col-md-4 col-sm-6 col-12"
            style={{ width: "100%", marginLeft: "7.5px" }}
          ></textarea>
          <span style={{ fontWeight: "bold" }}>
            1.What areas could this employee improve on?
            <span style={{ color: "red" }}>*</span> (Provide specific examples
            if possible)
          </span>
          <textarea
            type="text"
            className="summaryheightRemark mt-2"
            placeholder=" "
            id={"EmployeeStrength"}
            name="EmployeeStrength"
            value={formData?.EmployeeStrength}
            onChange={searchHandleChange}
            //  respclass="col-xl-10 col-md-4 col-sm-6 col-12"
            style={{ width: "100%", marginLeft: "7.5px" }}
          ></textarea>
        </div>
      </div>

      {/* /////////////////////////// Prev and Next /////////////////////////// */}
      <div
        className="card"
        style={{
          fontWeight: "bold",
          textAlign: "left",
          color: "white",
          background: "rgb(103, 58, 183)",
          padding: "6px",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          {/* <h3>Current Item: {items[currentIndex]}</h3> */}
          <button
            className="btn btn-sm btn-primary"
            onClick={goToPrev}
            disabled={currentIndex === 0}
            style={{ textAlign: "left" }}
          >
            Previous
          </button>
          <button
            className="btn btn-sm btn-primary"
            onClick={goToNext}
            disabled={currentIndex === items.length - 1}
            style={{ textAlign: "right" }}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};
export default FeedBackLotus;
