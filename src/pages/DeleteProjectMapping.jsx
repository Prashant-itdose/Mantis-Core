import React, { useState } from "react";
import Heading from "../components/UI/Heading";
import ReactSelect from "../components/formComponent/ReactSelect";

const DeleteProjectMapping = () => {
    const [formData, setFormData] = useState({
        UserWise: "",
        EmployeeWise: ""
    })
    const handleSelectChange = (name, e) => {
        const { value } = e;
        setFormData({
            ...formData,
            [name]: value,
        });
    };
    return (
        <>
            <div className="card ViewIssues border">
                <Heading
                    title="User & Employee Wise Project Delete Mapping"
                />
                <div className="row g-4 m-2">
                    <ReactSelect
                        name="UserWise"
                        respclass="col-xl-2 col-md-4 col-sm-6 col-12"
                        placeholderName="UserWise Delete Mapping"
                        dynamicOptions={[
                            {
                                label: "UserWise1",
                                value: "1",
                            },
                            { label: "UserWise2", value: "2" },
                            { label: "UserWise3", value: "3" },
                        ]}
                        value={formData?.UserWise}
                        handleChange={handleSelectChange}
                    />

                    <div className="col-2 mb-3">
                        <button
                            className="btn btn-sm btn-success ml-2"
                        // onClick={handleSave}
                        >
                            Delete Mapping
                        </button>
                    </div>
                    <ReactSelect
                        name="EmployeeWise"
                        respclass="col-xl-2 col-md-4 col-sm-6 col-12"
                        placeholderName="EmployeeWise Delete Mapping"
                        dynamicOptions={[
                            {
                                label: "EmployeeWise1",
                                value: "1",
                            },
                            { label: "EmployeeWise2", value: "2" },
                            { label: "EmployeeWise3", value: "3" },
                        ]}
                        value={formData?.EmployeeWise}
                        handleChange={handleSelectChange}
                    />
                    <div className="col-2">
                        <button
                            className="btn btn-sm btn-success ml-2"
                        // onClick={handleSave}
                        >
                            Delete Mapping
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}
export default DeleteProjectMapping;