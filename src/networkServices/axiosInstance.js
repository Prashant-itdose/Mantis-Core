import axios from "axios";
import { notify } from "../utils/utils";
import { headers } from "../utils/apitools";
import { useCryptoLocalStorage } from "../utils/hooks/useCryptoLocalStorage";
const baseurl = import.meta.env.VITE_APP_REACT_APP_BASE_URL;

const axiosInstance = axios.create({
  withCredentials: true,
  headers: {
    headers,
  },
});

export const axiosInstances = axios.create({
  baseURL: "/",
  withCredentials: true,
});


let globalErrorFlag = false;

export const debounce = (func, wait) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
};

const globalErrorNotifier = debounce((message) => {
  notify(message, "error");
  globalErrorFlag = false;
  logOut();
}, 1000);

const logOut = () => {
  // localStorage.clear();
  window.location.href = "/login";
  notify("Please authenticate", "error");
};

const makeApiRequest = async (url, options) => {
  const { method, data } = options;
  const lowerCaseMethod = method?.toLowerCase();
  const finalUrl = url;
  let token = useCryptoLocalStorage("user_Data", "get", "token");;
  headers.Authorization = `Bearer ${token}`;
  try {
    const response = await axiosInstance({
      method: lowerCaseMethod,
      url: finalUrl,
      ...(data && { data }),
      headers,
    });
    return response.data;
  } catch (error) {
    // localStorage.clear();
    return error.response;
  }
};



export default makeApiRequest;
