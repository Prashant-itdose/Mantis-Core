import React, { useEffect, useState } from "react";
import Loading from "../../components/loader/Loading";
import Input from "../../components/formComponent/Input";
import Heading from "../../components/UI/Heading";
import Tables from "../../components/UI/customTable";


const NewTypeFile = () => {
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tableData, setTableData] = useState([{
    TypeName:"Check"
  }]);
  const [menuMaster, setMenuMaster] = useState([]);
  const [formData, setFormData] = useState({
    TypeName: "",
    IsActive: "",
  });
  const handleSelectChange = (e) => {
    const { name, value, checked, type } = e?.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? (checked ? "1" : "0") : value,
    });
  };
  const handleDeliveryChange = (name, e) => {
    const { value } = e;
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  

  const newFileTHEAD = ["S.No.", "Type Name", "Status", "Edit"];


 
  const handleBillingEdit = (ele) => {
    setFormData({
      ...formData,
      TypeName: ele?.TypeName,
      IsActive: ele?.Active,
    });
    setEditMode(true);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;
  const totalPages = Math.ceil(tableData?.length / rowsPerPage);
  const currentData = tableData?.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );
  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };
//   useEffect(() => {
//     bindMenu();
//   }, []);
  return (
    <>
      <div className="row m-2">
      <Input
          type="text"
          className="form-control"
          id="TypeName"
          name="TypeName"
          lable="Type Name"
          onChange={handleSelectChange}
          value={formData?.TypeName}
          respclass="col-xl-4 col-md-4 col-12 col-sm-12"
        />
        {editMode && (
          <div className="search-col" style={{ marginLeft: "8px" }}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <label className="switch" style={{ marginTop: "7px" }}>
                <input
                  type="checkbox"
                  name="IsActive"
                  checked={formData?.IsActive == "1" ? true : false}
                  onChange={handleSelectChange}
                />
                <span className="slider"></span>
              </label>
              <span
                style={{
                  marginLeft: "3px",
                  marginRight: "5px",
                  fontSize: "12px",
                }}
              >
                Active
              </span>
            </div>
          </div>
        )}
        {loading ? (
          <Loading />
        ) : (
          <div className="">
            {editMode ? (
              <button
                className="btn btn-sm btn-info ml-2"
                // onClick={handleUpdate}
              >
                Update
              </button>
            ) : (
              <button className="btn btn-sm btn-info ml-2" 
            //   onClick={handleSave}
              >
                Create
              </button>
            )}
          </div>
        )}
      </div>
      {currentData?.length > 0 && (
        <>
          <div className="card">
            <Heading title={"Search Details"} />
            <Tables
              thead={newFileTHEAD}
              tbody={currentData?.map((ele, index) => ({
                "S.No.": (currentPage - 1) * rowsPerPage + index + 1,
                "Type Name": ele?.TypeName,
                Status: ele?.Active ? "Active" : "DeActive",
                Edit: (
                  <i
                    className="fa fa-edit"
                    style={{ cursor: "pointer" }}
                    onClick={() => handleBillingEdit(ele)}
                  ></i>
                ),
              }))}
              tableHeight={"tableHeight"}
            />
            <div className="pagination ml-auto">
              <div>
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
          </div>
        </>
      )}
    </>
  );
};

export default NewTypeFile;
