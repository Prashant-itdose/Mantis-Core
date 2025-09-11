import React, { useEffect, useState } from "react";
import { headers } from "../utils/apitools";
import axios from "axios";
import { apiUrls } from "../networkServices/apiEndpoints";
import { toast } from "react-toastify";
import Input from "../components/formComponent/Input";
import { useCryptoLocalStorage } from "../utils/hooks/useCryptoLocalStorage";
const ProjectRateCardModal = ({ data }) => {
  const [project, setProject] = useState([]);
  const [formData, setFormData] = useState({
    ProjectID: "",
    Mandays: "",
    Onsitecharges: "",
    MachineChargesUNI: "",
    MachineChargesBI: "",
    ProjectName: "",
  });
  const handleSaveDesignation = () => {
    let form = new FormData();
    form.append("ID", useCryptoLocalStorage("user_Data", "get", "ID")),
      form.append("LoginName", useCryptoLocalStorage("user_Data", "get", "realname") ),
      form.append("ProjectID", formData?.ProjectID || data?.ProjectID),
      form.append("Mandays", formData?.Mandays),
      form.append("Onsitecharges", formData?.Onsitecharges),
      form.append("MachineChargesUNI", formData?.MachineChargesUNI),
      form.append("MachineChargesBI", formData?.MachineChargesBI),
      // form.append("ProjectName",formData?.ProjectName)

      axios
        .post(apiUrls?.UpdateProjectRateCard, form, { headers })
        .then((res) => {
          toast.success(`RateCard for ${formData?.ProjectName} Updated`);
          showData?.setVisible();
        })
        .catch((err) => {
          console.log(err);
        });
  };
  function getlabel(id, dropdownData) {
    const ele = dropdownData.filter((item) => item.value === id);
    return ele.length > 0 ? ele[0].label : "";
  }

  const handleSelectChange = (e) => {
    const { name, value, checked, type } = e?.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? (checked ? "1" : "0") : value,
    });
  };
  const filldetails = () => {
    setFormData({
      ...formData,
      ProjectID: data?.Id || data?.ProjectID,
      Mandays: data?.Mandays,
      Onsitecharges: data?.Onsitecharges,
      MachineChargesUNI: data?.MachineChargesUNI,
      MachineChargesBI: data?.MachineChargesBI,
      ProjectName: data?.NAME || data?.ProjectName,
    });
  };
  useEffect(() => {
    filldetails();
  }, []);
  const shortenName = (name) => {
    return name.length > 10 ? name.substring(0, 25) + "..." : name;
  };
  return (
    <>
      <div className="card p-2">
        <span style={{ fontWeight: "bold" }}>Project Name : {data?.NAME || data?.ProjectName}</span>
      </div>
      <div className="card ProjectRateCard border p-2">
        <div className="row ">
          <Input
            type="text"
            className="form-control"
            id="ProjectName"
            name="ProjectName"
            lable="Project Name"
            placeholder=" "
            max={20}
            onChange={handleSelectChange}
            value={formData?.ProjectName}
            disabled={true}
            respclass="col-xl-2 col-md-4 col-sm-6 col-12"
          />
          <Input
            type="text"
            className="form-control"
            id="Mandays"
            name="Mandays"
            lable="ManDays"
            placeholder=" "
            max={20}
            onChange={handleSelectChange}
            value={formData?.Mandays}
            respclass="col-xl-2 col-md-4 col-sm-6 col-12"
          />
          <Input
            type="text"
            className="form-control"
            id="Onsitecharges"
            name="Onsitecharges"
            lable="OnSiteCharges"
            placeholder=" "
            max={20}
            onChange={handleSelectChange}
            value={formData?.Onsitecharges}
            respclass="col-xl-2 col-md-4 col-sm-6 col-12"
          />
          <Input
            type="text"
            className="form-control"
            id="MachineChargesUNI"
            name="MachineChargesUNI"
            lable="Machine Uni"
            placeholder=" "
            max={20}
            onChange={handleSelectChange}
            value={formData?.MachineChargesUNI}
            respclass="col-xl-2 col-md-4 col-sm-6 col-12"
          />
          <Input
            type="text"
            className="form-control"
            id="MachineChargesBI"
            name="MachineChargesBI"
            lable="Machine Bi"
            placeholder=" "
            max={20}
            onChange={handleSelectChange}
            value={formData?.MachineChargesBI}
            respclass="col-xl-2 col-md-4 col-sm-6 col-12"
          />
          <div className="col-sm-2">
            <button
              className="btn btn-sm btn-info ml-2"
              onClick={handleSaveDesignation}
            >
              Update
            </button>
          </div>
        </div>
        {/* {tableData?.length > 0 &&
                    <div className=" mt-3 my-2">
                        <Heading title="Search Details" />
                        <Tables
                            thead={projectModalTHEAD}
                            tbody={currentData?.map((ele, index) => ({
                                "S.No.": (currentPage - 1) * rowsPerPage + index + 1,
                                "Project Name":
                                    (
                                        <span
                                            id={`projectName-${index}`}
                                            targrt={`projectName-${index}`}
                                            title={ele?.NAME}
                                        >
                                            {shortenName(ele?.NAME)}
                                        </span>
                                    ),
                                "Mandays": ele?.maindayscharges,
                                "Onsitecharges": ele?.Onsitecharges,
                                "MachineChargesUNI": ele?.MachineChargesUNI,
                                "MachineChargesBI": ele?.MachineChargesBI
                            }))}
                            tableHeight={"tableHeight"}
                        />
                        <div className="pagination" style={{ marginLeft: "auto", }}>
                            <div >
                                <button
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    disabled={currentPage === 1}
                                >
                                    Previous
                                </button>
                                <span>
                                    Page {currentPage} of {totalPages}
                                </span>
                                <button
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    </div>} */}
      </div>
    </>
  );
};
export default ProjectRateCardModal;
