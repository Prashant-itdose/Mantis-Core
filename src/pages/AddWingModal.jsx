import React, { useEffect, useState } from "react";
import ReactSelect from "../components/formComponent/ReactSelect";
import axios from "axios";
import { apiUrls } from "../networkServices/apiEndpoints";
import { headers } from "../utils/apitools";
import Heading from "../components/UI/Heading";
import Tables from "../components/UI/customTable";
import Loading from "../components/loader/Loading";
import { useCryptoLocalStorage } from "../utils/hooks/useCryptoLocalStorage";
const AddWingModal = (ele) => {
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [wing, setWing] = useState([]);
  const [formData, setFormData] = useState({
    Wing: "",
  });
  const handleDeliveryChange = (name, e) => {
    const { value } = e;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const newRoleTHEAD = ["S.No.", "Wing Name", "Remove"];

  const getWing = () => {
    let form = new FormData();
    form.append("ID",  useCryptoLocalStorage("user_Data", "get", "ID")),
      axios
        .post(apiUrls?.Wing_Select, form, { headers })
        .then((res) => {
          const wings = res?.data.data.map((item) => {
            return { label: item?.Wing, value: item?.WingID };
          });
          setWing(wings);
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
        .post(apiUrls?.UserVsWing_Select, form, { headers })
        .then((res) => {
          setTableData(res?.data?.data);
        })
        .catch((err) => {
          console.log(err);
        });
  };

  const handleADD = () => {
    setLoading(true);
    let form = new FormData();
    form.append("Id",  useCryptoLocalStorage("user_Data", "get", "ID")),
      form.append("LoginName", useCryptoLocalStorage("user_Data", "get", "realname")),
      form.append("UserID", ele?.visible?.showData?.id),
      form.append("Status", "Add"),
      form.append("WingID", formData?.Wing),
      axios
        .post(apiUrls?.UserVsWingMapping, form, { headers })
        .then((res) => {
          toast.success(res?.data?.message);
          handleSearch();
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
  };
  const handleRemove = (item) => {
    console.log("item", item);
    setLoading(true);
    let form = new FormData();
    form.append("Id",  useCryptoLocalStorage("user_Data", "get", "ID")),
      form.append("LoginName", useCryptoLocalStorage("user_Data", "get", "realname")),
      form.append("UserID", ele?.visible?.showData?.id),
      form.append("Status", "Remove"),
      form.append("WingID", item?.WingID),
      axios
        .post(apiUrls?.UserVsWingMapping, form, { headers })
        .then((res) => {
          toast.success(res?.data?.message);
          handleSearch();
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
  };

  useEffect(() => {
    getWing();
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
          name="Wing"
          placeholderName="Wing"
          dynamicOptions={wing}
          handleChange={handleDeliveryChange}
          value={formData.Wing}
        />
        <div className="col-2">
          {loading ? (
            <Loading />
          ) : (
            <button className="btn btn-sm btn-success" onClick={handleADD}>
              Add Wing
            </button>
          )}
        </div>
      </div>
      <div className="card">
        <Heading title={"Search Details"} />
        <Tables
          thead={newRoleTHEAD}
          tbody={tableData?.map((ele, index) => ({
            "S.No.": index + 1,
            "Wing Name": ele?.Wing,
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
export default AddWingModal;
