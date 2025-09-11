import axios from "axios";
// Response Interceptor
axios.interceptors.response.use(
  (response) => {
    // console.log("Response received:", response);
    return response;
  },
  (error) => {
    console.error("Response error:", error);
    // if (error.response && error.response.status === 401) {
    //   window.location.href = "/login"; // Redirect to login page
    // }
    return Promise.reject(error);
  }
);

export default axios;
