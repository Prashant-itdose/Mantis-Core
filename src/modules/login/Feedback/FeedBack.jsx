import React, { useEffect, useRef, useState } from "react";
import { Rating } from "react-simple-star-rating";
import feedbackFormData from "./QuestionStage";
import moment from "moment";
import "./Feedback.css";
// import TextAreaInput from "../components/formComponent/TextAreaInput";
import DatePicker from "../../../components/formComponent/DatePicker";
import Input from "../../../components/formComponent/Input";
import TextAreaInput from "../../../components/formComponent/TextAreaInput";

const FeedBack = () => {
  const sectionArr = [
    "Job Performance",
    "Skills and Competencies",
    "Strength and Areas for Improvement",
  ];
  const [formData, setFormData] = useState({
    email: "",
    employeeName: "",
    designation: "",
    teamOrDepartment: "",
    teamHead: "",
    feedbackDate: new Date(),
    employeeStrength: "",
    employeeImproveArea: "",
  });
  const [sectionName, setSectionName] = useState("Job Performance");
  const [ratingEmtion, setRatingEmotion] = useState({
    0: "Bad",
    1: "Average",
    2: "Good",
    3: "Very Good",
    4: "Excellent",
  });
  const [globalData, setGLobalData] = useState({
    "Employee Information": [
      {
        label: "Employee Name",
        type: "text",
        value: "",
      },
      {
        label: "Employee Designation",
        type: "text",
        value: "",
      },
      {
        label: "Department/Team",
        type: "text",
        value: "",
      },
      {
        label: "Team Head",
        type: "text",
        value: "",
      },
      {
        label: "Date",
        type: "date",
        value: "10-Jan-2025",
      },
    ],
    "Job Performance": [
      {
        id: "0",
        label: "How would you rate the overall performance of the employee?",
        type: "rating",
        options: ["Bad", "Average", "Good", "Very Good", "Excellent"],
        value: "",
      },
      {
        id: "1",
        label: "Employee meet the expectations for his role?",
        type: "rating",
        options: ["Bad", "Average", "Good", "Very Good", "Excellent"],
        value: "",
      },
      {
        id: "2",
        label: "How would you rate the quality of the work completed?",
        type: "rating",
        options: ["Bad", "Average", "Good", "Very Good", "Excellent"],
        value: "",
      },
      {
        id: "3",
        label: "How would you rate the employee's time management skills?",
        type: "rating",
        options: ["Bad", "Average", "Good", "Very Good", "Excellent"],
        value: "",
      },
      {
        id: "4",
        label: "Employee reliable and punctual?",
        type: "rating",
        options: ["Bad", "Average", "Good", "Very Good", "Excellent"],
        value: "",
      },
    ],
    "Skills and Competencies": [
      {
        id: "0",
        label: "Please rate the employee's communication skills.",
        type: "rating",
        options: ["Bad", "Average", "Good", "Very Good", "Excellent"],
        value: "2",
      },
      {
        id: "1",
        label:
          "How well did the employee work with colleagues and team members?",
        type: "rating",
        options: ["Bad", "Average", "Good", "Very Good", "Excellent"],
        value: "5",
      },
      {
        id: "2",
        label: "How would you rate the employee's problem-solving abilities?",
        type: "rating",
        options: ["Bad", "Average", "Good", "Very Good", "Excellent"],
        value: "3",
      },
      {
        id: "3",
        label:
          "How would you rate the employee's leadership and mentoring abilities (if applicable)?",
        type: "rating",
        options: ["Bad", "Average", "Good", "Very Good", "Excellent"],
        value: "6",
      },
    ],
    "Strength and Areas for Improvement": [
      {
        id: "0",
        label:
          "What are the key strengths of employee? (Provide specific examples if possible)",
        type: "textarea",
        name: "employeeStrength",
        value: "1",
      },
      {
        id: "1",
        label:
          "What areas could this employee improve on? (Provide specific examples if possible)",
        type: "textarea",
        name: "employeeImproveArea",
        value: "5",
      },
    ],
  });
  const handleChange = (e) => {
    const { value, name } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRating = (id, newRating) => {
    let text = "";
    if (newRating >= 0 && newRating <= 1) {
      text = "Bad";
    } else if (newRating > 1 && newRating <= 2) {
      text = "Average";
    } else if (newRating > 2 && newRating <= 3) {
      text = "Good";
    } else if (newRating > 3 && newRating <= 4) {
      text = "Very Good";
    } else if (newRating > 4 && newRating <= 5) {
      text = "Excellent";
    }

    let newGlobalData = {
      ...globalData,
      [sectionName]: globalData[sectionName].map((item) =>
        item.id === id ? { ...item, value: newRating } : item
      ),
    };

    setGLobalData(newGlobalData);

    setRatingEmotion((prevEmotions) => ({
      ...prevEmotions,
      [id]: text,
    }));
  };

  const handleNextPage = (type) => {
    localStorage.setItem("formData", JSON.stringify(globalData));

    if (type === "back") {
      setSectionName(
        sectionArr.indexOf(sectionName) &&
          sectionArr[sectionArr.indexOf(sectionName) - 1]
      );
    }
    if (type === "next") {
      setSectionName(sectionArr[sectionArr.indexOf(sectionName) + 1]);
    }
  };

  const handleSubmit = () => {
    // console.log("SubmitForm", globalData, formData);
  };

  const handleClearData = () => {
    let newGlobalData = {
      ...globalData,
      [sectionName]: globalData[sectionName].map((item) => ({
        ...item,
        value: 0,
      })),
    };

    setGLobalData(newGlobalData);
    localStorage.setItem("formData", JSON.stringify(newGlobalData));
  };

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("formData"));
    if (storedData) {
      setGLobalData((prevData) => ({
        ...prevData,
        [sectionName]: storedData[sectionName] || prevData[sectionName],
      }));
    }
  }, [sectionName]);

  return (
    <>
      <div className="feedback_conatiner">
        <div className="header_box px-2 py-3">Employer Feedback form</div>
        <div className="que-para shadow flex-wrap d-flex align-items-center px-2 py-2">
          <h1>Please fill up all the details in the form given below:</h1>
          <Input
            type="email"
            className="form-control"
            id="email "
            name="email"
            onChange={handleChange}
            value={formData?.email}
            lable={"Email"}
            placeholder=""
            respclass="col-xl-2 col-md-3 col-sm-4 col-12"
          />
        </div>
        <div className="row mt-3 mb-2">
          <Input
            type="text"
            className="form-control"
            id="employeeName "
            name="employeeName"
            onChange={handleChange}
            value={formData?.employeeName}
            lable={"Employee Name"}
            placeholder=""
            respclass="col-xl-2 col-md-3 col-sm-4 col-12"
          />
          <Input
            type="text"
            className="form-control"
            id="designation "
            name="designation"
            onChange={handleChange}
            value={formData?.designation}
            lable={"Employee Designation"}
            placeholder="E"
            respclass="col-xl-2 col-md-3 col-sm-4 col-12"
          />
          <Input
            type="text"
            className="form-control"
            id="teamOrDepartment "
            name="teamOrDepartment"
            onChange={handleChange}
            value={formData?.teamOrDepartment}
            lable={"Department/Team"}
            placeholder=""
            respclass="col-xl-2 col-md-3 col-sm-4 col-12"
          />
          <Input
            type="text"
            className="form-control"
            id="teamHead "
            name="teamHead"
            onChange={handleChange}
            value={formData?.teamHead}
            lable={"Team Head"}
            placeholder=""
            respclass="col-xl-2 col-md-3 col-sm-4 col-12"
          />
          <DatePicker
            className="custom-calendar"
            id="toDate"
            name="toDate"
            lable={""}
            placeholder={import.meta.env.VITE_DATE_FORMAT}
            respclass="col-xl-2 col-md-3 col-sm-4 col-12"
            value={
              formData.feedbackDate
                ? moment(formData.feedbackDate, "YYYY-MM-DD").toDate()
                : null
            }
            handleChange={handleChange}
          />
        </div>

        <div className="header_box px-2 py-3 d-flex flex-column gap-2">
          {sectionName}
        </div>
        {globalData[sectionName]?.map((data, idx) => (
          <div
            key={idx}
            className="que-para flex-wrap d-flex align-items-center justify-content-between flex-wrap px-2 py-2 mb-2"
          >
            <h1 className="m-0">{data?.label}</h1>
            <div
              className={`d-flex align-items-center gap-4 ${data?.type === "textarea" && "addChildWidth"}`}
            >
              {data?.type === "textarea" ? (
                <TextAreaInput
                  name={"employeeStrength"}
                  respclass={""}
                  id={"employeeStrength"}
                  value={formData[data?.type]}
                  rows={3}
                  maxLength={50}
                  lable={data?.name}
                  onChange={handleChange}
                />
              ) : (
                <>
                  <Rating
                    size={25}
                    initialValue={data?.value}
                    onClick={(e) => handleRating(data?.id, e)}
                  />
                  {/* {console.log("data?.options", data?.options)} */}
                  <span
                    style={{
                      fontSize: "16px",
                      width: "100px",
                      marginLeft: "1rem",
                    }}
                  >
                    {data?.value > 0 && ratingEmtion[Number(data?.id)]}
                  </span>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="formButton d-flex justify-content-between">
        <div className="d-flex flex-row gap-3 px-2">
          {sectionArr.indexOf(sectionName) > 0 && (
            <button onClick={() => handleNextPage("back")}>Back</button>
          )}

          {sectionArr.indexOf(sectionName) < sectionArr.length - 1 ? (
            <button onClick={() => handleNextPage("next")}>Next</button>
          ) : (
            <button onClick={handleSubmit}>Submit</button>
          )}
        </div>
        <button onClick={handleClearData}>Clear form</button>
      </div>
    </>
  );
};
export default FeedBack;
