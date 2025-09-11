import { useCryptoLocalStorage } from "./hooks/useCryptoLocalStorage";

// let token=localStorage.getItem('token')
let token = useCryptoLocalStorage("user_Data", "get", "token");
export const headers = {
  "Content-Type": "multipart/form-data",
  Authorization: `Bearer ${token}`,
};
