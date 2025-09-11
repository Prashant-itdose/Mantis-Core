import React, { useEffect, useState } from "react";
import ReactSelect from "../components/formComponent/ReactSelect";
import axios from "axios";
import { apiUrls } from "../networkServices/apiEndpoints";
import { headers } from "../utils/apitools";
import Heading from "../components/UI/Heading";
import Tables from "../components/UI/customTable";
import Loading from "../components/loader/Loading";
import { useCryptoLocalStorage } from "../utils/hooks/useCryptoLocalStorage";
const AddTeamModal = (ele) => {
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [team, setTeam] = useState([]);
  const [formData, setFormData] = useState({
    Team: "",
  });
  const handleDeliveryChange = (name, e) => {
    const { value } = e;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const newRoleTHEAD = ["S.No.", "Team Name", "Remove"];

  const getTeam = () => {
    let form = new FormData();
    form.append("ID",  useCryptoLocalStorage("user_Data", "get", "ID")),
      axios
        .post(apiUrls?.Team_Select, form, { headers })
        .then((res) => {
          const teams = res?.data.data.map((item) => {
            return { label: item?.Team, value: item?.TeamID };
          });
          setTeam(teams);
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
        .post(apiUrls?.UserVsTeam_Select, form, { headers })
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
      form.append("TeamID", formData?.Team),
      axios
        .post(apiUrls?.UserVsTeamMapping, form, { headers })
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
      form.append("TeamID", item?.TeamID),
      axios
        .post(apiUrls?.UserVsTeamMapping, form, { headers })
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
    getTeam();
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
          name="Team"
          placeholderName="Team"
          dynamicOptions={team}
          handleChange={handleDeliveryChange}
          value={formData.Team}
        />
        <div className="col-2">
          {loading ? (
            <Loading />
          ) : (
            <button className="btn btn-sm btn-success" onClick={handleADD}>
              Add Team
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
            "Team Name": ele?.Team,
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
export default AddTeamModal;
