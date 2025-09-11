import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import { setWindowClass } from "@app/utils/helpers";
import { signInAction } from "../../store/reducers/loginSlice/loginSlice";
import LoginComponent from "./LoginComponent";
import LanguagesDropdown from "../../layouts/header/languages-dropdown/LanguagesDropdown";
const Login = () => {
  const dispatch = useDispatch();

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
      <div className="container-fluid outer-Container ">
        <div className="row datastyle">
          <div className="col-sm-8 d-none d-lg-block">
            {/* <div style={{ display: "flex", justifyContent: "center" , marginLeft: "130px" }}>
          <LanguagesDropdown />
        </div> */}
            <div className="">
              <div className="">
                <div className="col-sm-12 col-md-6 ">
                  <div className="cardBox">
                    <LoginComponent />
                  </div>
                  {/* <div className="PoweredBybox">
                    <h1
                      className="PoweredBy"
                      style={{ color: "", marginLeft: "40px" }}
                    >
                      POWERED BY :
                    </h1>
                    <h1 className="PoweredByLinkw" style={{ color: "#b55604" }}>
                      <a
                        href="https://www.itdoseinfo.com/"
                        style={{
                          color: "#b55604",
                          marginLeft: "10px",
                          fontWeight: "bold",
                        }}
                      >
                        ITDOSE INFOSYSTEMS PVT LTD.
                      </a>
                    </h1>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
          <div className="d-lg-none mx-5">
            <LoginComponent />
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
