import React, { useState } from "react";
import Heading from "../components/UI/Heading";
import ReactSelect from "../components/formComponent/ReactSelect";
import Tables from "../components/UI/customTable";
import NewTypeFile from "./CRM/NewTypeFile";
import Modal from "../components/modalComponent/Modal";
import Input from "../components/formComponent/Input";

const EmployeeFeedbackMaster = () => {
  const [tableData, setTableData] = useState([
    {
      Type: "",
      Question: "2",
      AnswerType: "aaaaa",
      Options: "A",
    },
  ]);
  const [formData, setFormData] = useState({
    Type: "",
    Question: "",
    QuestionHead: "",
    AnswerType: "",
    Options: "",
    ToWhom: "",
    Radio: "",
  });
  const handleSelectChange = (e) => {
    const { name, value, checked, type } = e?.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? (checked ? 1 : 0) : value,
    });
  };
  const handleDeliveryChange = (name, e) => {
    const { value } = e;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const newFileTHEAD = ["S.No.", "Type", "Question", "Answer Type", "Options"];
  const [visible, setVisible] = useState({
    showType: false,
    showData: {},
  });
  const [options, setOptions] = useState([]);

  const handleAdd = () => {
    setOptions([...options, { id: options.length + 1, value: "" }]);
  };

  const handleRemove = () => {
    setOptions(options.slice(0, -1));
  };

  const handleInputChange = (id, newValue) => {
    setOptions(
      options.map((option) =>
        option.id === id ? { ...option, value: newValue } : option
      )
    );
  };
  return (
    <>
      {visible?.showType && (
        <Modal
          modalWidth={"800px"}
          visible={visible}
          setVisible={setVisible}
          Header="New Type Name"
        >
          <NewTypeFile visible={visible} setVisible={setVisible} />
        </Modal>
      )}
      <div className="card ">
        <Heading title={"EmployeeFeedbackMaster"} isBreadcrumb={true} />
        <div className="row m-2">
          {/* <ReactSelect
            respclass="col-xl-2 col-md-4 col-sm-6 col-12"
            name="Type"
            placeholderName="Type"
            dynamicOptions={[{ label: "Type-I", value: "0" }]}
            value={formData?.Type}
            handleChange={handleDeliveryChange}
          />
          <i
            className="fa fa-plus-circle fa-sm new_record_pluse mt-2"
            style={{ cursor: "pointer" }}
            title="Click to Create"
            onClick={() => {
              setVisible({ showType: true, showData: "" });
            }}
          ></i> */}
          <Input
            type="text"
            className="form-control mt-1"
            id="ToWhom"
            name="ToWhom"
            lable="To Whom"
            placeholder=""
            onChange={handleSelectChange}
            value={formData?.ToWhom}
            respclass="col-xl-2 col-md-4 col-sm-6 col-12"
          />
          <Input
            type="text"
            className="form-control mt-1"
            id="QuestionHead"
            name="QuestionHead"
            lable="Question Head"
            placeholder=""
            onChange={handleSelectChange}
            value={formData?.QuestionHead}
            respclass="col-xl-2 col-md-4 col-sm-6 col-12"
          />
          <Input
            type="text"
            className="form-control mt-1"
            id="Question"
            name="Question"
            lable="Question"
            placeholder=""
            onChange={handleSelectChange}
            value={formData?.Question}
            respclass="col-xl-2 col-md-4 col-sm-6 col-12"
          />
          <div className="col-sm-2">
            <ReactSelect
              respclass="col-xl-12 col-md-4 col-sm-6 col-12"
              name="AnswerType"
              placeholderName="Answer Type"
              dynamicOptions={[
                { label: "CheckBox", value: "1" },
                { label: "Radio", value: "2" },
                { label: "Short Answer", value: "3" },
                { label: "Long Text", value: "4" },
              ]}
              value={formData?.AnswerType}
              handleChange={handleDeliveryChange}
            />

            {formData?.AnswerType == "1" && (
              <>
                {options.map((option) => (
                  <input
                    key={option.id}
                    type="text"
                    value={option.value}
                    onChange={(e) =>
                      handleInputChange(option.id, e.target.value)
                    }
                    placeholder={`Option ${option.id}`}
                    style={{ display: "block", margin: "5px 0" }}
                  />
                ))}
                  <i className="fa fa-plus ml-3" onClick={handleAdd}>
                  
                  </i>
                  <i className="fa fa-trash ml-3" onClick={handleRemove}>
                   
                  </i>
              </>
            )}
          </div>
          <button className="btn btn-sm btn-primary ml-3">Save</button>
        </div>
      </div>

      <div className="card">
        <Heading title={"Search Details"} />
        <Tables
          thead={newFileTHEAD}
          tbody={tableData?.map((ele, index) => ({
            "S.No.": index + 1,
            Type: ele?.Type,
            Question: ele?.Question,
            "Answer Type": ele?.AnswerType,
            Options: ele?.Options,
          }))}
          tableHeight={"tableHeight"}
        />
      </div>
    </>
  );
};
export default EmployeeFeedbackMaster;
