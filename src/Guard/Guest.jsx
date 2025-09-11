
import { Navigate } from "react-router-dom";
import { useCryptoLocalStorage } from "../utils/hooks/useCryptoLocalStorage";

const Guest = ({ children }) => {
  const token = useCryptoLocalStorage("user_Data", "get", "token");
  return token ? <Navigate to="/dashboard" replace /> : children;
};
export default Guest;
