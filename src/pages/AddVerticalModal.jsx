import React, { useEffect, useState } from "react";
import ReactSelect from "../components/formComponent/ReactSelect";
import axios from "axios";
import { apiUrls } from "../networkServices/apiEndpoints";
import { headers } from "../utils/apitools";
import Heading from "../components/UI/Heading";
import Tables from "../components/UI/customTable";
import { toast } from "react-toastify";
import { useCryptoLocalStorage } from "../utils/hooks/useCryptoLocalStorage";
const AddVerticalModal = (ele) => {
  const [tableData, setTableData] = useState([]);
  const [vertical, setVertical] = useState([]);
  const [formData, setFormData] = useState({
    Vertical: "",
  });
  const handleDeliveryChange = (name, e) => {
    const { value } = e;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const newRoleTHEAD = ["S.No.", "Vertical Name", "Remove"];

  const getVertical = () => {
    let form = new FormData();
    form.append("Id",  useCryptoLocalStorage("user_Data", "get", "ID")),
      axios
        .post(apiUrls?.Vertical_Select, form, { headers })
        .then((res) => {
          const verticals = res?.data.data.map((item) => {
            return { label: item?.Vertical, value: item?.VerticalID };
          });
          setVertical(verticals);
        })
        .catch((err) => {
          console.log(err);
        });
  };

  const handleSearch = () => {
    let form = new FormData();
    form.append("Id",  useCryptoLocalStorage("user_Data", "get", "ID")),
      form.append("UserID", ele?.visible?.showData?.id),
      axios
        .post(apiUrls?.UserVsVertical_Select, form, { headers })
        .then((res) => {
          setTableData(res?.data?.data);
        })
        .catch((err) => {
          console.log(err);
        });
  };

  const handleADD = () => {
    let form = new FormData();
    form.append("Id",  useCryptoLocalStorage("user_Data", "get", "ID")),
      form.append("LoginName", useCryptoLocalStorage("user_Data", "get", "realname")),
      form.append("UserID", ele?.visible?.showData?.id),
      form.append("Status", "Add"),
      form.append("VerticalID", formData?.Vertical),
      axios
        .post(apiUrls?.UserVsVerticalMapping, form, { headers })
        .then((res) => {
          toast.success(res?.data?.message);
          handleSearch();
        })
        .catch((err) => {
          console.log(err);
        });
  };
  const handleRemove = (item) => {
    console.log("item", item);
    let form = new FormData();
    form.append("Id",  useCryptoLocalStorage("user_Data", "get", "ID")),
      form.append("LoginName", useCryptoLocalStorage("user_Data", "get", "realname")),
      form.append("UserID", ele?.visible?.showData?.id),
      form.append("Status", "Remove"),
      form.append("VerticalID", item?.VerticalID),
      axios
        .post(apiUrls?.UserVsVerticalMapping, form, { headers })
        .then((res) => {
          toast.success(res?.data?.message);
          handleSearch();
        })
        .catch((err) => {
          console.log(err);
        });
  };

  useEffect(() => {
    getVertical();
    handleSearch();
  }, []);
  return (
    <>
      <div className="row ml-2">
        <span style={{ fontWeight: "bold" }}>
          Employee Name: &nbsp; {ele?.visible?.showData?.realname}
        </span>
      </div>
      <div className="row m-2">
        <ReactSelect
          respclass="col-xl-4 col-md-4 col-sm-6 col-12"
          name="Vertical"
          placeholderName="Vertical"
          dynamicOptions={vertical}
          handleChange={handleDeliveryChange}
          value={formData.Vertical}
        />
        <div className="col-2">
          <button className="btn btn-sm btn-success" onClick={handleADD}>
            Add Vertical
          </button>
        </div>
      </div>
      <div className="card">
        <Heading title={"Search Details"} />
        <Tables
          thead={newRoleTHEAD}
          tbody={tableData?.map((ele, index) => ({
            "S.No.": index + 1,
            "Vertical Name": ele?.Vertical,
            Remove: (
              <i
                className="fa fa-remove"
                style={{ color: "red" }}
                onClick={() => {
                  handleRemove(ele);
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
    </>
  );
};
export default AddVerticalModal;
