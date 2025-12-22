import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "animate.css";
import { axiosInstances } from "../../networkServices/axiosInstance";
import { apiUrls } from "../../networkServices/apiEndpoints";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Input from "../../components/formComponent/Input";
import {
  MOBILE_NUMBER_VALIDATION_REGX,
  OTP_VALIDATION_REGX,
} from "../../utils/constant";
import { Tabfunctionality } from "../../utils/helpers";
import "/src/index.css";

const Amiation1LoginPage = () => {
  const [t] = useTranslation();
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  const [values, setValues] = useState({
    username: "",
    password: "",
    email: "",
    mobile: "",
    otp: "",
    newPassword: "",
    confirmPassword: "",
  });
  const handleIndicator = (state) => {
    return (
      <div className="text" style={{ justifyContent: "space-between" }}>
        {/* <span className="text-dark">Max </span>{" "} */}({" "}
        <span className="text-black"> {Number(0 + String(state)?.length)}</span>
        )
      </div>
    );
  };
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    async function getLoginDetails() {
      const loginRes = await dispatch(
        signInAction({
          userName: values.username,
          password: values.password,
          client: "b2b",
        })
      );
      const responseData = loginRes?.payload?.data;

      if (loginRes?.payload?.success) {
        const userDetails = {
          token: responseData?.token,
          ID: responseData.User?.ID,
          AllowQuotaionCreate: responseData.User?.AllowQuotaionCreate,
          AllowQuotationUpdate: responseData.User?.AllowQuotationUpdate,
          AllowQuotationApproved: responseData.User?.AllowQuotationApproved,
          AllowQuotationReject: responseData.User?.AllowQuotationReject,
          AllowSalesBooking: responseData.User?.AllowSalesBooking,
          AllowSalesUpdate: responseData.User?.AllowSalesUpdate,
          AllowSalesReject: responseData.User?.AllowSalesReject,
          AllowPICreate: responseData.User?.AllowPICreate,
          AllowDeleteTicket: responseData.User?.AllowDeleteTicket,
          AllowTicketAssignTo: responseData.User?.AllowTicketAssignTo,
          username: responseData.User?.username,
          realname: responseData.User?.realname,
          IsFeedbackShow: responseData.User?.IsFeedbackShow,
          MobileNo: responseData.User?.mobileno,
          EmailId: responseData.User?.email,
          AllowLockUnLock: responseData.User?.AllowLockUnLock,
          ProfileImage: responseData.User?.ProfileImage,
          AllowAmountSubmissionCancel:
            responseData.User?.AllowAmountSubmissionCancel,
          AllowManHourEdit: responseData.User?.AllowManHourEdit,
          AllowExpenseApprove: responseData.User?.AllowExpenseApprove,
          AllowAddModule: responseData.User?.AllowAddModule,
          AllowAddPages: responseData.User?.AllowAddPages,
          AllowDeliveryDateEdit: responseData.User?.AllowDeliveryDateEdit,
          RoleID: responseData.Roles[0]?.RoleID,
          CrmEmployeeID: responseData.User?.CrmEmployeeID,
          ShowClientDeliveryDate: responseData.User?.ShowClientDeliveryDate,
          ShowClientManHour: responseData.User?.ShowClientManHour,
          IsReportingManager: responseData.User?.IsReportingManager,
          IsAccountant: responseData.User?.IsAccountant,
          IsCEO: responseData.User?.IsCEO,
          IsLogin: true,
          Role: responseData.Roles,
          theme: responseData?.User?.ThemeColor || "default_theme",
        };

        useCryptoLocalStorage("user_Data", "set", null, userDetails);

        setWindowClass(
          // `hold-transition login-page ${responseData.User?.ThemeColor || "default_theme"}`
          `hold-transition login-page ${useCryptoLocalStorage("user_Data", "get", "theme")}`
        );
        // speakMessage(`Welcome ${responseData.User?.realname}`);
        // useCryptoLocalStorage("user_Data", "get", "RoleID") == 7
        "roleID" == 7 ? navigate("/ClientDashboard") : navigate("/dashboard");
      } else {
        // toast.error(loginRes?.payload?.message);
        toast.error("No Record Found.");
      }
      return responseData;
    }
    getLoginDetails();
  };

  const [showForgotPage, setShowForgotPage] = useState({
    isLogin: true,
    isForgetPassword: false,
    isOTP: false,
    isNewPassword: false,
  });
  const handleForgotPasswordClick = () => {
    setShowForgotPage({
      isLogin: false,
      isForgetPassword: true,
      isOTP: false,
      isNewPassword: false,
    });
    setValues(values);
  };
  const handleForgotPasswordClickForgot = () => {
    setShowForgotPage({
      isLogin: true,
      isForgetPassword: false,
      isOTP: false,
      isNewPassword: false,
    });
    setValues(values);
  };
  const [showotp, setshowotp] = useState([]);

  const handleEmailMobileSubmit = () => {
    if (values?.email == "") {
      toast.error("Please Enter Valid EmailId.");
    } else if (values?.mobile == "") {
      toast.error("Please Enter Mobile No.");
    } else {
      axiosInstances
        .post(apiUrls.ForgetPassword_ValdiateEmailMobile, {
          EmailID: String(values?.email),
          MobileNo: String(values?.mobile),
        })
        .then((res) => {
          if (res?.data?.success == true) {
            toast.success(res?.data?.message);
            setshowotp(res?.data?.data);
            setShowForgotPage({
              isLogin: false,
              isForgetPassword: false,
              isOTP: true,
              isNewPassword: false,
            });
            setValues(values);
          } else {
            toast.error(res?.data?.message);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const [showpassword, setshowpassword] = useState([]);

  const handleVerify = () => {
    if (values?.otp == "") {
      toast.error("Please Enter 6 digit Otp No.");
    } else {
      axiosInstances
        .post(apiUrls.ForgetPassword_ValdiateOTP, {
          EncryptedEmpID: String(showotp?.EmpID),
          OTP: String(values?.otp),
        })
        .then((res) => {
          if (res?.data?.success === true) {
            toast.success(res?.data?.message);
            setshowpassword(res?.data?.data);
            setShowForgotPage({
              isLogin: false,
              isForgetPassword: false,
              isOTP: false,
              isNewPassword: true,
            });
            setValues(values);
          } else {
            toast.error(res?.data?.message);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  const handlenewpassword = () => {
    if (values?.newPassword == "") {
      toast.error("Please Enter New Password.");
    } else if (values?.confirmPassword == "") {
      toast.error("Please Enter Confirm Password.");
    } else {
      axiosInstances
        .post(apiUrls.ForgetPassword_ChangePassword, {
          EncrptedEmployeeId: String(showpassword?.EmpID),
          Password: String(values?.newPassword),
          ConfirmedPassword: String(values?.confirmPassword),
        })
        .then((res) => {
          if (res?.data?.success === true) {
            toast.success(res?.data?.message);
            setShowForgotPage({
              isLogin: true,
              isForgetPassword: false,
              isOTP: false,
              isNewPassword: false,
            });
            setValues(values);
          } else {
            toast.error(res?.data?.message);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleChange = (e) => {
    const { name, value, checked, type } = e?.target;
    setValues({
      ...values,
      [name]: type === "checkbox" ? (checked ? 1 : 0) : value,
    });
  };

  return (
    <div className="container-fluid vh-100 d-flex align-items-center ">
      <div className="container bg-white shadow-lg rounded-4 overflow-hidden">
        <div className="row">
          {/* Left Side: Branding/Image (Hidden on mobile) */}
          <div className="col-md-6 d-none d-md-flex bg-primary align-items-center justify-content-center p-5 text-white animate__animated animate__fadeInLeft">
            <div className="text-center">
              <h1 className="display-4 fw-bold">CRM Plus</h1>
              <p className="lead">
                Manage your pipeline, clients, and revenue in one place.
              </p>
              <div className="mt-4">
                {/* Visual placeholder for a CRM Dashboard graphic */}
                <div className="bg-white bg-opacity-25 rounded-3 p-4 border border-white border-opacity-25">
                  <div className="d-flex gap-2 mb-2">
                    <div
                      className="bg-white rounded-circle"
                      style={{ width: 40, height: 10 }}
                    ></div>
                    <div
                      className="bg-white rounded-circle opacity-50"
                      style={{ width: 60, height: 10 }}
                    ></div>
                  </div>
                  <div
                    className="bg-white opacity-25 w-100 mb-2"
                    style={{ height: 8 }}
                  ></div>
                  <div
                    className="bg-white opacity-25 w-75"
                    style={{ height: 8 }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Login Form */}
          <div className="col-md-6 p-5 animate__animated animate__fadeInRight">
            <div className="px-lg-4">
              <h2 className="fw-bold mb-4">Welcome Back</h2>
              <div>
                {showForgotPage.isLogin && (
                  <>
                    <div className="row">
                      <div className="col-sm-12 d-flex mt-4">
                        <div className="maindiv">
                          <Input
                            type="text"
                            className="form-control lablecontrolcss"
                            id="text"
                            name="username"
                            lable={t("Username")}
                            placeholder=""
                            value={values?.username}
                            onChange={handleChange}
                            onKeyDown={Tabfunctionality}
                            tabIndex="1"
                          />
                        </div>
                        <div className="icondiv">
                          <i
                            className="fas fa-envelope"
                            style={{ background: "", color: "black" }}
                          />
                        </div>
                      </div>
                      <div className="col-sm-12 d-flex mt-4">
                        <div className="maindiv">
                          <Input
                            // type="password"
                            type={showPassword ? "text" : "password"}
                            className="form-control"
                            id="password"
                            name="password"
                            lable={t("Password")}
                            placeholder=""
                            value={values?.password}
                            onChange={handleChange}
                            onKeyDown={Tabfunctionality}
                            tabIndex="1"
                          />
                        </div>
                        <div
                          className="icondiv"
                          onClick={togglePasswordVisibility}
                          style={{ cursor: "pointer", color: "black" }}
                        >
                          <i
                            className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"}`}
                          />
                        </div>
                      </div>
                    </div>
                    <div
                      style={{ display: "flex", justifyContent: "flex-end" }}
                      className="mt-2"
                    >
                      <Link
                        to="#"
                        onClick={handleForgotPasswordClick}
                        style={{ marginRight: "0", color: "black" }}
                      >
                        {t("Forgot Password")}
                      </Link>
                    </div>

                    <div className=" mt-3">
                      <button
                        className="btn btn-sm btn-block bg-success"
                        onClick={handleSubmit}
                        onKeyDown={Tabfunctionality}
                        tabIndex="1"
                        style={{ background: "white", color: "black" }}
                      >
                        {t("Login")}
                        
                      </button>
                    </div>
                  </>
                )}

                <>
                  <div className="row">
                    {showForgotPage?.isForgetPassword && (
                      <>
                        <div className="col-sm-12 mt-3">
                          <Input
                            type="email"
                            id="email"
                            className="form-control"
                            name="email"
                            lable={t("Email")}
                            placeholder=""
                            value={values?.email}
                            onChange={handleChange}
                          />
                        </div>
                        {/* <div className="col-2 d-flex"> */}
                        <div className="col-sm-12 mt-3 d-flex">
                          <div style={{ width: "86%" }}>
                            <Input
                              type="number"
                              id="mobile"
                              className="form-control"
                              name="mobile"
                              lable={t("Mobile")}
                              value={values?.mobile}
                              placeholder=""
                              onChange={(e) => {
                                inputBoxValidation(
                                  MOBILE_NUMBER_VALIDATION_REGX,
                                  e,
                                  handleChange
                                );
                              }}
                            />
                          </div>
                          <span className="ml-1" style={{ color: "white" }}>
                            {handleIndicator(values?.mobile)}
                          </span>
                        </div>

                        {/* </div> */}
                        <div className=" mt-2 ml-auto mr-2">
                          <Link
                            to="/login"
                            onClick={handleForgotPasswordClickForgot}
                            style={{ marginRight: "auto", color: "black" }}
                          >
                            {t("Back to Login")}
                          </Link>
                        </div>
                        <div className="col-sm-12 mt-3">
                          <button
                            className="btn btn-sm btn-block bg-success"
                            onClick={handleEmailMobileSubmit}
                            type="button"
                            style={{ background: "white", color: "black" }}
                          >
                            {t("Submit")}
                          </button>
                        </div>
                      </>
                    )}

                    {showForgotPage.isOTP && (
                      <>
                        <div className="col-sm-12 mt-3">
                          <Input
                            type="number"
                            className="form-control"
                            id="otp"
                            name="otp"
                            lable={t("OTP")}
                            placeholder=""
                            value={values?.otp}
                            onChange={(e) => {
                              inputBoxValidation(
                                OTP_VALIDATION_REGX,
                                e,
                                handleChange
                              );
                            }}
                          />
                        </div>
                        <div className=" mt-2 ml-auto mr-2">
                          <Link
                            to="/login"
                            onClick={handleForgotPasswordClickForgot}
                            style={{ marginRight: "auto", color: "black" }}
                          >
                            {t("Back to Login")}
                          </Link>
                        </div>
                        <div className="col-sm-12 mt-3">
                          <button
                            type="button"
                            className=" btn btn-sm btn-block bg-primary"
                            onClick={handleVerify}
                            style={{ background: "white", color: "black" }}
                          >
                            {t("Verify")}
                          </button>
                        </div>
                      </>
                    )}

                    {showForgotPage.isNewPassword && (
                      <>
                        <div className="col-sm-12 mt-3">
                          <Input
                            type="password"
                            id="newpassword"
                            className="form-control"
                            name="newPassword"
                            lable={t("New Password")}
                            placeholder=""
                            value={values?.newPassword}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="col-sm-12 mt-3">
                          <Input
                            type="password"
                            id="confirmpassword"
                            className="form-control"
                            name="confirmPassword"
                            lable={t("Confirm Password")}
                            placeholder=""
                            value={values?.confirmPassword}
                            onChange={handleChange}
                            onKeyDown={Tabfunctionality}
                            tabIndex="1"
                          />
                        </div>

                        <div className=" mt-2 ml-auto mr-2">
                          <Link
                            to="/login"
                            onClick={handleForgotPasswordClickForgot}
                            style={{ marginRight: "auto", color: "black" }}
                          >
                            {t("Back to Login")}
                          </Link>
                        </div>

                        <div className="col-sm-12 mt-3">
                          <button
                            className="btn btn-sm btn-block bg-success"
                            onClick={handlenewpassword}
                            type="button"
                            style={{ background: "white", color: "black" }}
                          >
                            {t("Submit")}
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Amiation1LoginPage;
