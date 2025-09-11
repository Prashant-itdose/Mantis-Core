// import React, { useState } from "react";
// import Loading from "../components/loader/Loading";
// import { apiUrls } from "../networkServices/apiEndpoints";
// import { useCryptoLocalStorage } from "../utils/hooks/useCryptoLocalStorage";
// import axios from "axios";
// import { headers } from "../utils/apitools";
// import Input from "../components/formComponent/Input";
// import { useTranslation } from "react-i18next";
// const FeedbackSmsModal = (showData) => {
//   console.log("showdata", showData);
//   const [t]=useTranslation()
//   const [loading, setLoading] = useState(false);
//   const [formData, setFormData] = useState({
//     SMS: showData?.visible?.showData?.FeedbackComment,
//   });
//   const handleConfirm = () => {
//     setLoading(true);
//     let form = new FormData();
//     form.append("ID", useCryptoLocalStorage("user_Data", "get", "ID")),
//       form.append(
//         "LoginName",
//         useCryptoLocalStorage("user_Data", "get", "realname")
//       ),
//       axios
//         .post(apiUrls?.ProjectSelect, form, { headers })
//         .then((res) => {
//           if (res?.data?.status === true) {
//             toast.success(res?.data?.message);
//             showData.setVisisble(false);
//             showData.handleSearchFeedback();
//             setLoading(false);
//           } else {
//             toast.error(res?.data?.message);
//             setLoading(false);
//           }
//         })
//         .catch((err) => {
//           console.log(err);
//         });
//   };
//   const handleChange = (e) => {
//     const { name, value, type, checked } = e?.target;
//     setFormData({
//       ...formData,
//       [name]: type === "checkbox" ? (checked ? "1" : "0") : value,
//     });
//   };
//   return (
//     <>
//       <div className="card p-1">
//         <span style={{ fontWeight: "bold" }}>
//           Project Name : {showData?.visible?.showData?.ProjectName}
//         </span>
//       </div>
//       <div className="card">
//         <div className="row p-2 d-none">
//           <label style={{ fontWeight: "bold", marginLeft: "5px" }}>
//             Can you please confirm if you'd like to send an SMS message?
//           </label>
//         </div>
//         <div className="row p-1">
//           <Input
//             type="text"
//             className="form-control"
//             id="SMS"
//             name="SMS"
//             lable={t("SMS")}
//             placeholder=" "
//             onChange={handleChange}
//             value={formData?.SMS}
//             respclass="col-xl-9 col-md-4 col-sm-4 col-12"
//           />
//           {loading ? (
//             <Loading />
//           ) : (
//             <button
//               className="btn btn-sm btn-danger ml-2"
//               //   onClick={handleConfirm}
//             >
//               Send
//             </button>
//           )}
//         </div>
//       </div>
//     </>
//   );
// };
// export default FeedbackSmsModal;

import React from "react";

const FeedbackSmsModal = (visible, showData) => {
  //  console.log(visible, showData);
  return (
    <>
      <div className="card">
        <div className="row p-2">
          <span style={{ fontWeight: "bold", marginLeft: "5px" }}>
            {visible?.visible?.showData?.FeedbackComment}
          </span>
        </div>
      </div>
    </>
  );
};

export default FeedbackSmsModal;
