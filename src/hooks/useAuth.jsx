import { useContext } from "react";
import { AuthContext } from "./AuthProvider"; // Adjust the path if necessary

export const useAuth = () => {
  const context = useContext(AuthContext);
 
  return context;
};