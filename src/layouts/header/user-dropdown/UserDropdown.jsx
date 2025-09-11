import { Fragment, useEffect, useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useLocalStorage } from "../../../utils/hooks/useLocalStorage";
import Modal from "../../../components/modalComponent/Modal";
// import ChangePasswordModel from '../../../components/modalComponent/Utils/ChangePasswordModel';
// import { updatePassword, updateUserDetail } from '../../../networkServices/HeaderApi';
import { inputBoxValidation, notify } from "../../../utils/utils";
import { MOBILE_NUMBER_VALIDATION_REGX } from "../../../utils/constant";
import defaultimage from "../../../assets/image/default-profile.jpeg";
import { apiUrls } from "../../../networkServices/apiEndpoints";
import { headers } from "../../../utils/apitools";
import axios from "axios";
import { toast } from "react-toastify";
import Loading from "../../../components/loader/Loading";
import { useCryptoLocalStorage } from "../../../utils/hooks/useCryptoLocalStorage";

// declare const FB;

const UserDropdown = ({
  dropdownOpen,
  setDropdownOpen,
  isMobile,
  setLocalImage,
}) => {
  const localData = useLocalStorage("userData", "get"); // get Data from localStorage

  const navigate = useNavigate();
  const [t] = useTranslation();
  const dispatch = useDispatch();
  // const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isuploadOpen, setIsuploadOpen] = useState(false);
  const [cameraStream, setCameraStream] = useState(null);
  const videoRef = useRef();
  const canvasRef = useRef();
  const GetGmail = useCryptoLocalStorage("user_Data", "get", "EmailId");
  const GetMobile = useCryptoLocalStorage("user_Data", "get", "MobileNo");
  const ProfileImage = useCryptoLocalStorage(
    "user_Data",
    "get",
    "ProfileImage"
  );
  // console.log("ProfileImage", ProfileImage, GetGmail, GetMobile);

  const [preview, setPreview] = useState(ProfileImage);
  const [loading, setLoading] = useState(false);
  const dropdownRef = useRef(null);

  //  const [isOpen,setIsOpen] = useState(false)
  const [handleModelData, setHandleModelData] = useState({});
  const [modalData, setModalData] = useState({});

  const [inputs, setInputs] = useState({
    MobileNo: GetMobile,
    EmailId: GetGmail,
    showDropdown: false,
    buttonName: "edit",
    preview: "",
    doctype: "",
  });

  // console.log("testing", inputs);

  const setIsOpen = () => {
    setHandleModelData((val) => ({ ...val, isOpen: false }));
  };

  // useEffect(() => {
  //   if (!dropdownOpen) {
  //     setInputs((val) => ({ ...val, preview: ProfileImage }));
  //   }
  // }, [dropdownOpen]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false); // Close dropdown
      }
    };
    // Add event listener to the document
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup the event listener when component unmounts
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const updatePasswordApi = async (password) => {
    const apiResponse = await updatePassword(password);
    if (apiResponse?.success) {
      notify(apiResponse?.message, "success");
      setDropdownOpen(false);
      setIsOpen();
    } else {
      notify(apiResponse?.message, "error");
    }
    if (
      apiResponse?.status === 400 &&
      Object.keys(apiResponse?.data?.errors)?.length > 0
    ) {
      let errormessage =
        apiResponse?.data?.errors?.ConfirmPassword?.length > 0 &&
        apiResponse?.data?.errors?.ConfirmPassword[0];
      apiResponse?.data?.errors?.Password?.length > 0
        ? (errormessage = apiResponse?.data?.errors?.Password[0])
        : "";
      apiResponse?.data?.errors?.OldPassword?.length > 0
        ? (errormessage = apiResponse?.data?.errors?.OldPassword[0])
        : "";
      notify(errormessage, "error");
    }
  };
  const updateUserApi = async (userData) => {
    const apiResponse = await updateUserDetail(userData, localData?.employeeID);

    if (apiResponse?.success) {
      useLocalStorage("userData", "set", apiResponse?.data?.loginResponse);
      if (isMobile) {
        setLocalImage(apiResponse?.data?.loginResponse?.employeePhoto);
      }
      notify(apiResponse?.message, "success");
      setDropdownOpen(false);
      setIsOpen();
    } else {
      notify(apiResponse?.message, "error");
      // setInputs((val)=>({...val,preview: localData?.employeePhoto}))
    }

    if (apiResponse?.status === 400) {
      notify(apiResponse?.data?.message, "error");
      // setInputs((val)=>({...val,preview: localData?.employeePhoto}))
    }
  };
  const handleChangeModel = (data) => {
    setModalData(data);
  };
  const handleModelOpen = (type) => {
    if (type === "editDetail") {
      setInputs((val) => ({ ...val, buttonName: "edit" }));

      updateUserApi(inputs);
    }
    // else if (type === "changePassword")

    //   setHandleModelData({
    //     label: t('header.user.change_password'),
    //     width: "60vw",
    //     isOpen: true,
    //     Component: <ChangePasswordModel
    //       handleChangeModel={handleChangeModel}
    //       inputData={{

    //       }} />,
    //     handleInsertAPI: updatePasswordApi,
    //     buttonName: "Update Password"
    //   });
  };

  const handlechange = (e) => {
    setIsDropdownOpen(true);
    setInputs((val) => ({ ...val, [e.target.name]: e.target.value }));
  };

  // const handleImageChange = (e) => {
  //   e.preventDefault();
  //   let reader = new FileReader();
  //   let file = e.target.files[0];

  //   closeCameraStream();
  //   reader.onloadend = () => {
  //     setInputs((val) => ({
  //       ...val,
  //       showDropdown: !inputs?.showDropdown,
  //       preview: reader.result.split(",")[1],
  //       doctype: file?.name.split(".").pop(),
  //     }));
  //   };
  //   if (file) {
  //     reader.readAsDataURL(file);
  //   }
  // };
  const handleImageChange = (e) => {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];

    // Prevent Excel or PDF files
    const disallowedTypes = [
      "application/pdf",
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ];
    if (!file || disallowedTypes.includes(file.type)) {
      toast.error("Please Select only image files (not Excel or PDF).");
      return;
    }

    closeCameraStream();

    reader.onloadend = () => {
      setInputs((val) => ({
        ...val,
        showDropdown: !inputs?.showDropdown,
        preview: reader.result.split(",")[1],
        doctype: file?.name.split(".").pop(),
      }));
    };

    reader.readAsDataURL(file);
  };

  const startCamera = async () => {
    try {
      setCameraStream({ active: true });
    } catch (err) {
      console.error("Error accessing camera:", err);
    }
  };
  const closeCameraStream = () => {
    setCameraStream({ active: false });
  };
  const takePhoto = (photo) => {
    setPreview(photo);
    setInputs((val) => ({ ...val, preview: photo }));
  };

  const uploadImageFun = () => {
    setInputs((val) => ({ ...val, showDropdown: !inputs?.showDropdown }));
  };

  const handleUpdateProfile = () => {
    if (!inputs?.EmailId) {
      toast.error("Please Enter Valid EmailID.");
      return;
    }
    if (!inputs?.MobileNo) {
      toast.error("Please Enter valid MobileNo.");
      return;
    }
    if (!inputs?.preview) {
      toast.error("Please Select Anathor Image.");
      return;
    }
    setLoading(true);
    let form = new FormData();
    form.append("ID", useCryptoLocalStorage("user_Data", "get", "ID")),
      form.append(
        "LoginName",
        useCryptoLocalStorage("user_Data", "get", "realname")
      ),
      form.append("EmailID", inputs?.EmailId),
      form.append("MobileNo", inputs?.MobileNo),
      form.append("Image_Base64", inputs?.preview),
      form.append("FileFormat_Base64", inputs?.doctype),
      axios
        .post(apiUrls?.UpdateProfile, form, { headers })
        .then((res) => {
          if (res?.data?.status == true) {
            toast.success(res?.data?.message);
            localStorage.setItem("MobileNo", inputs?.MobileNo);
            localStorage.setItem("EmailId", inputs?.EmailId);
            localStorage.setItem("ProfileImage", inputs?.preview);
            setLoading(false);
          } else {
            toast.error(res?.data?.message);
            setLoading(false);
          }
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
  };
  // useEffect(()=>{
  //   handleUpdateProfile()
  // },[])

  const [patientImg, setPatientImg] = useState({
    img: "",
    show: false,
  });

  // console.log("testing".inputs);
  return (
    <>
      {!isMobile ? (
        <div>
          <img
            src={ProfileImage ? ProfileImage : `${defaultimage}`}
            // src={`${defaultimage}`}
            alt=""
            width={20}
            height={20}
            className="rounded-circle"
            onClick={() => {
              setDropdownOpen(!dropdownOpen);
            }}
          />
        </div>
      ) : (
        <img
          src={ProfileImage ? ProfileImage : `${defaultimage}`}
          width={20}
          height={20}
        ></img>
      )}
      {/* {console.log(inputs)} */}
      {dropdownOpen ? (
        <div className="manage_usermodel bg-color-container" ref={dropdownRef}>
          <div className="">
            <img
              dynamic
              image
              src={
                inputs?.preview
                  ? `data:image/${inputs?.doctype};base64,${inputs?.preview}`
                  : ProfileImage // fallback to stored image
              }
              // src={
              //   inputs?.preview
              //     ? inputs?.preview
              //     : ProfileImage // fallback to stored image
              // }
              alt=""
              style={{
                borderRadius: "50%",
                height: "100px",
                width: "100px",
                marginBottom: "2px",
              }}
              onClick={uploadImageFun}
              title="Click to Upload Image."
            />

            {inputs?.showDropdown ? (
              <div className="profile-upload-btn" title="Click to Upload File">
                <input
                  type="file"
                  id="fileInput"
                  onChange={handleImageChange}
                  style={{ display: "none" }}
                />
                <label
                  htmlFor="fileInput"
                  className="text-white profile-upload-file"
                >
                  <p
                    className="buttonclasss m-0 p-1"
                    style={{ cursor: "pointer" }}
                  >
                    Upload Image
                  </p>
                </label>
                {/* <p className="m-0 p-1" onClick={takePhoto}>
                  Capture Image
                </p> */}
              </div>
            ) : (
              ""
            )}

            <div className="headerUserDropdownField ">
              <div className="d-flex mb-3 ml-1 mr-1 mt-4">
                <span className="headerUserDropdownLabel">
                  {/* {t("FrontOffice.OPD.patientRegistration.email")} */}
                  Email
                </span>
                <input
                  className="form-control headerUserDropdowninput"
                  placeholder="Enter Email Address"
                  type="text"
                  name="EmailId"
                  id="EmailId"
                  value={inputs?.EmailId ? inputs?.EmailId : GetGmail}
                  onChange={handlechange}
                  // readOnly={inputs?.buttonName === "edit" ? true : false}
                />
              </div>
              <div className="d-flex pb-1 ml-1 mr-1 mt-2">
                <span className="headerUserDropdownLabel">
                  {/* {t("FrontOffice.OPD.patientRegistration.Mobile_No")} */}
                  Mobile
                </span>
                <input
                  className="form-control headerUserDropdowninput"
                  type="text"
                  name="MobileNo"
                  id="MobileNo"
                  value={inputs?.MobileNo ? inputs?.MobileNo : GetMobile}
                  placeholder="Enter Mobile No."
                  onChange={(e) => {
                    inputBoxValidation(
                      MOBILE_NUMBER_VALIDATION_REGX,
                      e,
                      handlechange
                    );
                  }}
                  // readOnly={inputs?.buttonName === "edit" ? true : false}
                />
              </div>
            </div>
          </div>

          <div style={{ marginLeft: "auto" }}>
            {loading ? (
              <Loading />
            ) : (
              <button
                type="button"
                className="text-black rounded Edit_detail ml-0"
                // className="btn btn-sm btn-success"
                onClick={handleUpdateProfile}
              >
                {t("Update Details")}
              </button>
            )}
          </div>
        </div>
      ) : (
        ""
      )}

      {/* {handleModelData?.isOpen && (
        <Modal
          visible={handleModelData?.isOpen}
          setVisible={setIsOpen}
          modalWidth={handleModelData?.width}
          Header={t(handleModelData?.label)}
          buttonType={"button"}
          buttonName={handleModelData?.buttonName}
          // buttons={handleModelData?.extrabutton}
          modalData={modalData}
          setModalData={setModalData}
          handleAPI={handleModelData?.handleInsertAPI}
        >
          {handleModelData?.Component}
        </Modal>
      )} */}

      {/* {isuploadOpen && (
        <UploadImageModal
          isuploadOpen={isuploadOpen}
          closeCameraStream={closeCameraStream}
          setIsuploadOpen={setIsuploadOpen}
          // preview={preview}
          modalData={{ preview: preview }}
          setModalData={setPreview}
          handleImageChange={handleImageChange}
          startCamera={startCamera}
          videoRef={videoRef}
          cameraStream={cameraStream}
          takePhoto={takePhoto}
          // canvasRef={canvasRef}
          handleAPI={(data) => { setIsDropdownOpen(true); setInputs((val) => ({ ...val, preview: data?.preview })); setIsuploadOpen(false); closeCameraStream() }}
        />
      )} */}
    </>
  );
};

export default UserDropdown;
