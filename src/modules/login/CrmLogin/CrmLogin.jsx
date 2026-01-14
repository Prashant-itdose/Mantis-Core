import React, { useState } from "react";
import {
  FiEye,
  FiEyeOff,
  FiUser,
  FiLock,
  FiPhone,
  FiKey,
  FiArrowRight,
  FiArrowLeft,
} from "react-icons/fi";

import loginImage from "../../../assets/image/kamalcrm11.png";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signInAction } from "../../../store/reducers/loginSlice/loginSlice";
import { useCryptoLocalStorage } from "../../../utils/hooks/useCryptoLocalStorage";
import { setWindowClass } from "../../../utils/helpers";
import { axiosInstances } from "../../../networkServices/axiosInstance";
import { apiUrls } from "../../../networkServices/apiEndpoints";
import { toast } from "react-toastify";
import "./CrmLogin.css";
import { getTodayColor } from "../../../utils/utils";
const CrmLogin = () => {
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
        window.location.reload();
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
    <div className={`${getTodayColor()}_theme`}>
      <div className="pacific-login-wrapper">
        <div className="pacific-login-container">
          <div
            className="pacific-image-section"
            //    style={{
            //     backgroundImage: "url(https://img.freepik.com/free-vector/doctors-hospital-illustration_1284-22193.jpg?t=st=1766045380~exp=1766048980~hmac=05aabb26e37f7ef82e7bc2097fe7aba14493391e9b72fa47937e12c16159f49c&w=1060)",
            //     backgroundPosition: "center",
            //     backgroundRepeat: "no-repeat",
            //     backgroundSize: "cover"
            //    }}
            style={{ padding: "0px", margin: "0px" }}
          >
            <div className="pacific-gradient-overlay"></div>
            <div className="pacific-brand-content">
              <img
                src={loginImage}
                alt="Login Visual"
                className="pacific-hero-image"
              />
            </div>
          </div>
          {/* Left Section - Form */}
          <div className="pacific-form-section">
            <div className="pacific-form-content">
              <div className="pacific-logo-section">
                {/* <img
                      src={LoginLogo}
                      alt="Logo"
                      className="pacific-logo-img"
                    /> */}
                <h1 className="pacific-brand-title">Welcome Back!</h1>
                <h5 className="pacific-brand-subtitle">
                  {showForgotPage.isLogin
                    ? t("Sign in to start your session")
                    : t("I forgot my password.")}
                </h5>
              </div>
              {showForgotPage.isLogin && (
                <>
                  <div className="pacific-input-group">
                    <label htmlFor="username" className="pacific-input-label">
                      Username <span className="pacific-required">*</span>
                    </label>
                    <div className="pacific-input-wrapper">
                      <FiUser className="pacific-input-icon" />
                      <input
                        type="text"
                        id="username"
                        name="username"
                        className="pacific-form-input"
                        placeholder="Enter your username"
                        value={values.username}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="pacific-input-group">
                    <label htmlFor="password" className="pacific-input-label">
                      Password <span className="pacific-required">*</span>
                    </label>
                    <div className="pacific-input-wrapper">
                      <FiLock className="pacific-input-icon" />
                      <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        name="password"
                        className="pacific-form-input"
                        placeholder="Enter your password"
                        value={values.password}
                        onChange={handleChange}
                        required
                      />
                      <button
                        type="button"
                        className="pacific-toggle-password"
                        onClick={togglePasswordVisibility}
                      >
                        {showPassword ? <FiEye /> : <FiEyeOff />}
                      </button>
                    </div>
                  </div>
                  <div className="pacific-form-footer">
                    <label className="pacific-checkbox-container">
                      <input type="checkbox" id="rememberMe" />
                      <span className="pacific-checkbox-label">
                        Remember me
                      </span>
                    </label>
                    <Link
                      type="button"
                      className="pacific-forgot-link"
                      onClick={handleForgotPasswordClick}
                    >
                      {t("Forgot Password?")}
                    </Link>
                  </div>
                  <button
                    type="submit"
                    className="pacific-btn-primary"
                    onClick={handleSubmit}
                    style={{ cursor: "pointer" }}
                  >
                    <span style={{ cursor: "pointer" }}>Login</span>
                    {/* <FiArrowRight className="pacific-btn-icon" /> */}
                  </button>
                </>
              )}
              <>
                {showForgotPage?.isForgetPassword && (
                  <>
                    <div className="pacific-input-group">
                      <label htmlFor="Email" className="pacific-input-label">
                        Enter Email <span className="pacific-required">*</span>
                      </label>
                      <div className="pacific-input-wrapper">
                        <FiUser className="pacific-input-icon" />
                        <input
                          type="email"
                          id="email"
                          name="email"
                          className="pacific-form-input"
                          placeholder="Enter your email"
                          value={values.email}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="pacific-input-group">
                      <label htmlFor="mobile" className="pacific-input-label">
                        Enter Mobile <span className="pacific-required">*</span>
                      </label>
                      <div className="pacific-input-wrapper">
                        <FiPhone className="pacific-input-icon" />
                        <input
                          type="mobile"
                          id="mobile"
                          name="mobile"
                          className="pacific-form-input"
                          placeholder="Enter your mobile"
                          value={values.mobile}
                          onChange={(e) => {
                            inputBoxValidation(
                              MOBILE_NUMBER_VALIDATION_REGX,
                              e,
                              handleChange
                            );
                          }}
                          required
                        />
                      </div>
                    </div>

                    <div className="pacific-form-footer">
                      <label className="pacific-checkbox-container">
                        {/* <input type="checkbox" id="rememberMe" />
                          <span className="pacific-checkbox-label">
                            Remember me
                          </span> */}
                      </label>
                      <Link
                        type="button"
                        className="pacific-forgot-link"
                        onClick={handleForgotPasswordClickForgot}
                      >
                        {t("Back to Login")}
                      </Link>
                    </div>
                    <button
                      type="submit"
                      className="pacific-btn-primary"
                      onClick={handleEmailMobileSubmit}
                    >
                      <span>Submit</span>
                      {/* <FiArrowRight className="pacific-btn-icon" /> */}
                    </button>
                  </>
                )}

                {showForgotPage.isOTP && (
                  <>
                    <div className="pacific-input-group">
                      <label htmlFor="mobile" className="pacific-input-label">
                        Enter OTP <span className="pacific-required">*</span>
                      </label>
                      <div className="pacific-input-wrapper">
                        <FiUser className="pacific-input-icon" />
                        <input
                          type="number"
                          id="otp"
                          name="otp"
                          className="pacific-form-input"
                          placeholder="Enter your OTP"
                          value={values.otp}
                          onChange={(e) => {
                            inputBoxValidation(
                              OTP_VALIDATION_REGX,
                              e,
                              handleChange
                            );
                          }}
                          required
                        />
                      </div>
                    </div>
                    <div className="pacific-form-footer">
                      <label className="pacific-checkbox-container">
                        {/* <input type="checkbox" id="rememberMe" />
                          <span className="pacific-checkbox-label">
                            Remember me
                          </span> */}
                      </label>
                      <Link
                        type="button"
                        className="pacific-forgot-link"
                        onClick={handleForgotPasswordClickForgot}
                      >
                        {t("Back to Login")}
                      </Link>
                    </div>
                    <button
                      type="submit"
                      className="pacific-btn-primary"
                      onClick={handleVerify}
                    >
                      <span>Verify</span>
                      {/* <FiArrowRight className="pacific-btn-icon" /> */}
                    </button>
                  </>
                )}

                {showForgotPage.isNewPassword && (
                  <>
                    <div className="pacific-input-group">
                      <label htmlFor="password" className="pacific-input-label">
                        New Password <span className="pacific-required">*</span>
                      </label>
                      <div className="pacific-input-wrapper">
                        <FiLock className="pacific-input-icon" />
                        <input
                          type={showPassword ? "text" : "password"}
                          id="newPassword"
                          name="newPassword"
                          className="pacific-form-input"
                          placeholder="Enter your New Password"
                          value={values.newPassword}
                          onChange={handleChange}
                          required
                        />
                        {/* <button
                            type="button"
                            className="pacific-toggle-password"
                            onClick={togglePasswordVisibility}
                          >
                            {showPassword ? <FiEye /> : <FiEyeOff />}
                          </button> */}
                      </div>
                    </div>
                    <div className="pacific-input-group">
                      <label htmlFor="password" className="pacific-input-label">
                        Confirm Password{" "}
                        <span className="pacific-required">*</span>
                      </label>
                      <div className="pacific-input-wrapper">
                        <FiLock className="pacific-input-icon" />
                        <input
                          type={showPassword ? "text" : "password"}
                          id="confirmpassword"
                          name="confirmPassword"
                          className="pacific-form-input"
                          placeholder="Enter your Confirm Password"
                          value={values.confirmPassword}
                          onChange={handleChange}
                          required
                        />
                        {/* <button
                            type="button"
                            className="pacific-toggle-password"
                            onClick={togglePasswordVisibility}
                          >
                            {showPassword ? <FiEye /> : <FiEyeOff />}
                          </button> */}
                      </div>
                    </div>

                    <div className="pacific-form-footer">
                      <label className="pacific-checkbox-container">
                        {/* <input type="checkbox" id="rememberMe" />
                          <span className="pacific-checkbox-label">
                            Remember me
                          </span> */}
                      </label>
                      <Link
                        type="button"
                        className="pacific-forgot-link"
                        onClick={handleForgotPasswordClickForgot}
                      >
                        {t("Back to Login")}
                      </Link>
                    </div>
                    <button
                      type="submit"
                      className="pacific-btn-primary"
                      onClick={handlenewpassword}
                    >
                      <span>Submit</span>
                      {/* <FiArrowRight className="pacific-btn-icon" /> */}
                    </button>
                  </>
                )}
              </>

              {/* <footer className="pacific-powered-footer">
                <span className="pacific-powered-text">
                  <img
                    src={itDoseLogo}
                    alt="itDose Logo"
                    className="pacific-powered-logo"
                  />
                  Powered by <strong>ITDOSE INFOSYSTEMS PVT. LTD</strong>
                </span>
              </footer> */}
            </div>
          </div>
        </div>

        {/* <Footer /> */}
      </div>
    </div>
  );
};

export default CrmLogin;
