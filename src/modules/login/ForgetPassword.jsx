

import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import { setWindowClass } from "@app/utils/helpers";
import { signInAction } from "../../store/reducers/loginSlice/loginSlice";
import Input from "@app/components/formComponent/Input";
import logoitdose from "@app/assets/image/hrcrmBug.png";
import { useLocalStorage } from "@app/utils/hooks/useLocalStorage";
import axios from "axios";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { apiUrls } from "../../networkServices/apiEndpoints";
import { Tabfunctionality } from "../../utils/helpers";
import { useCryptoLocalStorage } from "../../utils/hooks/useCryptoLocalStorage";

const ForgetPassword = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const [t] = useTranslation();
  const convertToFormData = (obj) => {
    const formData = new FormData();

    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        console.log(`Appending ${key}: ${obj[key]}`);
        formData.append(key, obj[key]);
      }
    }

    // Debug: Log FormData entries
    console.log("FormData entries:");
    for (let pair of formData.entries()) {
      console.log(pair[0] + ": " + pair[1]);
    }

    return formData;
  };
  const { handleChange, values, handleSubmit, touched, errors } = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    // validationSchema: Yup.object({
    //   email: Yup.string().email("Invalid email address").required("Required"),
    //   password: Yup.string()
    //     .min(5, "Must be 5 characters or more")
    //     .max(30, "Must be 30 characters or less")
    //     .required("Required"),
    // }),
    onSubmit: async (values) => {
      try {
        const headers = {
          "Content-Type": "multipart/form-data",
          Authorization: "",
        };
        console.log(values);
        const newdata = { ...values, client: "b2b" };
        const formdata = convertToFormData(newdata);
        axios
          .post(apiUrls?.login, formdata, headers)
          .then((res) => {
            const responseData = res?.data;
            console.log(responseData);

            if (responseData?.status == true) {

               useCryptoLocalStorage("user_Data", "set", "token", userDetails);
              // localStorage.setItem("token", responseData.data[0]?.Token);
              // localStorage.setItem("ID", responseData.data[0]?.ID);
              useCryptoLocalStorage("user_Data", "set", "ID", ID);
              useCryptoLocalStorage("user_Data", "set", "RoleID", RoleID);
              useCryptoLocalStorage("user_Data", "set", "CrmEmployeeID", CrmEmployeeID);
              useCryptoLocalStorage("user_Data", "set", "username", username);
              useCryptoLocalStorage("user_Data", "set", "realname", realname);
              useCryptoLocalStorage("user_Data", "set", "IsLogin", true);
              useCryptoLocalStorage("user_Data", "set", "Role", Role);

              // localStorage.setItem("username", responseData.data[0]?.username);
              // localStorage.setItem("realname", responseData.data[0]?.realname);

              // localStorage.setItem(
              //   "AmountSubmissionIsCancel",
              //   responseData.data[0]?.AmountSubmissionIsCancel
              // );
              useCryptoLocalStorage("user_Data", "set", "AmountSubmissionIsCancel", AmountSubmissionIsCancel);
              // localStorage.setItem("RoleID", responseData.dataLogin[0]?.RoleID);
              // localStorage.setItem(
              //   "CrmEmployeeID",
              //   responseData.data[0]?.CrmEmployeeID
              // );
             
              // localStorage.setItem("IsLogin", true);
              // localStorage.setItem(
              //   "Role",
              //   JSON.stringify(responseData.dataLogin)
              // );
              // useLocalStorage("theme", "set", "sky_blue_theme");
              useCryptoLocalStorage("user_Data", "set", "theme","sky_blue_theme");

              setWindowClass("hold-transition login-page sky_blue_theme");
              navigate("/dashboard");
            } else {
              toast.error(responseData?.message);
            }
          })
          .catch((err) => {
            console.error("Error:", err);
          });
        // await dispatch(signInAction(values));
      } catch (error) {
        console.error("Error occurred:", error);
      }
    },
  });

  return (
    <>
      <div className="card card-outline card-primary border text-center py-3 mediacard">
        <form onSubmit={handleSubmit}>
          <div className="card-body loginmedia">
            <h5 className="cardTitle my-2">Welcome to itDose</h5>
            <Link to="/">
              <img className="logoStyle" src={logoitdose} />
            </Link>
            <h5 className="cardTitle my-1"> Sign in to start your session</h5>
            <div className="row">
              <div className="col-sm-12 d-flex mt-4">
                <div className="maindiv">
                  <Input
                    type="text"
                    className="form-control"
                    id="text"
                    name="username"
                    lable={"Username"}
                    placeholder=""
                    value={values?.username}
                    onChange={handleChange}
                    onKeyDown={Tabfunctionality}
                    tabIndex="1"
                  />
                </div>
                <div className="icondiv">
                  <i className="fas fa-envelope" />
                </div>
              </div>
              <div className="col-sm-12 d-flex mt-4">
                <div className="maindiv">
                  <Input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    lable={"Password"}
                    placeholder=""
                    value={values?.password}
                    onChange={handleChange}
                    onKeyDown={Tabfunctionality}
                    tabIndex="1"
                  />
                </div>
                <div className="icondiv">
                  <i className="fas fa-lock" />
                </div>
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "flex-end"}} className="mt-2">
                <Link to="/login" style={{ marginRight: "0" ,color:"black"}}>
                 Login
                </Link>
              </div>
            <div className="row">
              <div className="col-sm-12 mt-3">
                <button
                  className=" btn btn-sm btn-primary btn-block"
                  onClick={handleSubmit}
                  onKeyDown={Tabfunctionality}
                  tabIndex="1"
                >
                  Login
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default ForgetPassword;
