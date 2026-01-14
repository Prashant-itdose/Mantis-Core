import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import { setWindowClass } from "@app/utils/helpers";
import { signInAction } from "../../store/reducers/loginSlice/loginSlice";
import LoginComponent from "./LoginComponent";

import { useEffect, useState } from "react";
import { getTodayColor } from "../../utils/utils";
import CrmLogin from "./CrmLogin/CrmLogin";
const Login = () => {
  const dispatch = useDispatch();
  const [days, setDays] = useState([]);
  const checkDay = getTodayColor();
  console.log("cjekday", checkDay);
  const navigate = useNavigate();
  const [t] = useTranslation();

  const { handleChange, values, handleSubmit, touched, errors } = useFormik({
    initialValues: {
      userName: "",
      password: "",
    },

    onSubmit: (values) => {
      dispatch(signInAction(values));
      navigate("/dashboard");
    },
  });

  setWindowClass("hold-transition login-page");

  return (
    <>
      <div className="container-fluid outer-Container m-0 p-0">
      <CrmLogin />

        {/* <div className="row datastyle">
          <div className="col-sm-8 d-none d-lg-block">
            <div className="col-sm-12 col-md-6 ">
              <div className="cardBox">
                <LoginComponent />
              </div>
            </div>
          </div>
          <div className="d-lg-none mx-5">
            <LoginComponent />
          </div>
        </div> */}
      </div>
    </>
  );
};

export default Login;
