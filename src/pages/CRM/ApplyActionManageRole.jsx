import React, { useEffect, useState } from "react";
import ReactSelect from "../../components/formComponent/ReactSelect";
import { apiUrls } from "../../networkServices/apiEndpoints";
import { headers } from "../../utils/apitools";
import axios from "axios";
import Heading from "../../components/UI/Heading";
import Tables from "../../components/UI/customTable";
import { toast } from "react-toastify";
import { useCryptoLocalStorage } from "../../utils/hooks/useCryptoLocalStorage";

const ApplyActionManageRole = (ele) => {
  const [tableData, setTableData] = useState([]);
  const [category, setCategory] = useState([]);
  const [formData, setFormData] = useState({
    Category: "",
  });
  const handleDeliveryChange = (name, e) => {
    const { value } = e;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const getCategory = () => {
    let form = new FormData();
    form.append("ID",  useCryptoLocalStorage("user_Data", "get", "ID")),
      form.append("RoleID",  useCryptoLocalStorage("user_Data", "get", "RoleID")),
      axios
        .post(apiUrls?.Category_Select, form, { headers })
        .then((res) => {
          const poc3s = res?.data.data.map((item) => {
            return { label: item?.NAME, value: item?.NAME };
          });
          setCategory(poc3s);
        })
        .catch((err) => {
          console.log(err);
        });
  };
  const CategoryAdd = () => {
    let form = new FormData();
    form.append("ID",  useCryptoLocalStorage("user_Data", "get", "ID")),
      form.append("LoginName", useCryptoLocalStorage("user_Data", "get", "realname")),
      form.append("UserID", ele?.visible?.showData?.id),
      form.append("Status", "Add"),
      form.append("TargetUserID", ""),
      form.append("Category", formData?.Category),
      axios
        .post(apiUrls?.UserVsCategoryMapping, form, { headers })
        .then((res) => {
          toast.success(res?.data?.message);
          handleSearch();
        })
        .catch((err) => {
          console.log(err);
        });
  };
  const CategoryRemove = (item) => {
    console.log("yyyy", item);
    let form = new FormData();
    form.append("ID",  useCryptoLocalStorage("user_Data", "get", "ID")),
      form.append("LoginName", useCryptoLocalStorage("user_Data", "get", "realname")),
      form.append("UserID", ele?.visible?.showData?.id),
      form.append("Status", "Remove"),
      form.append("TargetUserID", ""),
      form.append("Category", item?.Category),
      axios
        .post(apiUrls?.UserVsCategoryMapping, form, { headers })
        .then((res) => {
          toast.success(res?.data?.message);
          handleSearch();
        })
        .catch((err) => {
          console.log(err);
        });
  };
  const CategoryTransfer = () => {
    let form = new FormData();
    form.append("ID",  useCryptoLocalStorage("user_Data", "get", "ID")),
      form.append("LoginName", useCryptoLocalStorage("user_Data", "get", "realname")),
      form.append("UserID", ele?.visible?.showData?.id),
      form.append("Status", "Transfer"),
      form.append("TargetUserID", ""),
      form.append("Category", formData?.Category),
      axios
        .post(apiUrls?.UserVsCategoryMapping, form, { headers })
        .then((res) => {
          toast.success(res?.data?.message);
          handleSearch();
        })
        .catch((err) => {
          console.log(err);
        });
  };
  const handleSearch = () => {
    let form = new FormData();
    form.append("ID",  useCryptoLocalStorage("user_Data", "get", "ID"));
    form.append("LoginName", useCryptoLocalStorage("user_Data", "get", "realname"));
    form.append("UserID", ele?.visible?.showData?.id);
    axios
      .post(apiUrls?.UserVsCategory_Select, form, {
        headers,
      })
      .then((res) => {
        const data = res?.data?.data;
        setTableData(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const newRoleTHEAD = ["S.No.", "Category Name", "Remove"];
  useEffect(() => {
    getCategory();
    handleSearch();
  }, []);

  return (
    <>
      <div className="row m-2">
      <span style={{ fontWeight: "bold" }}>
          Employee Name: &nbsp; {ele?.visible?.showData?.realname}
        </span>
      </div>
      <div className="row m-2">
        <ReactSelect
          respclass="col-xl-4 col-md-4 col-sm-6 col-12"
          name="Category"
          placeholderName="Category"
          dynamicOptions={category}
          value={formData?.Category}
          handleChange={handleDeliveryChange}
        />
        <div className="col-4 d-flex">
          <button className="btn btn-sm btn-success" onClick={CategoryAdd}>
            Add Category
          </button>
          {/* <button
            className="btn btn-sm btn-success ml-3"
            onClick={CategoryTransfer}
          >
            Transfer Category
          </button> */}
        </div>
      </div>
      {tableData?.length > 0 && (
        <div className="card">
          <Heading title={"Search Details"} />
          <Tables
            thead={newRoleTHEAD}
            tbody={tableData?.map((ele, index) => ({
              "S.No.": index + 1,
              "Category Name": ele?.Category,
              Remove: (
                <i
                  className="fa fa-remove"
                  style={{ color: "red" }}
                  onClick={() => {
                    CategoryRemove(ele);
                  }}
                >
                  X
                </i>
              ),
            }))}
            tableHeight={"tableHeight"}
          />
          {/* <div className="col-2">
          <button className="btn btn-sm btn-success m-1">Save</button>
        </div> */}
        </div>
      )}
    </>
  );
};

export default ApplyActionManageRole;
