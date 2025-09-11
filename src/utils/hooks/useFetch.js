import axios from "axios";
// import Cookies from "js-cookie";
import { headers } from "../apitools";

const methods = ["post", "get", "delete"];

// const token = Cookies.get("authToken");

export const useFetchApi = async (
  method = "post",
  path = "",
  data = {},
  header = ""
) => {
  const requestType = method.toLowerCase();
  //   const header = {
  //     "Content-Type": header || "application/json",
  //    headers,
  //   };

  try {
    if (!methods.includes(requestType)) {
      throw new Error(
        `Invalid method: ${method}. Allowed methods are ${methods.join(", ")}`
      );
    }

    const response = await axios({
      method: requestType,
      url: path,
      data: requestType !== "get" ? data : undefined,
      params: requestType === "get" ? data : undefined,
      headers,
      data: requestType !== "get" ? data : undefined,
      params: requestType === "get" ? data : undefined,
      headers,
    });
    return { response: response?.data, error: null };
  } catch (error) {
    console.error("API Fetch Error:", error);
    return {
      response: null,
      error: error.response.data || "Some technical issue occured",
    };
  }
};
