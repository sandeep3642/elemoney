import React, { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/apiService";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const navigate = useNavigate();

  const loginAction = async (credentials) => {
    try {
      if (!credentials?.email || !credentials?.password) {
        throw new Error("Email and password are required");
      }

      const response = await api.post(`user/login`, {
        email: credentials.email.trim(),
        password: credentials.password
      })


      if (!response || response.status !== 200) {
        const errorMessage = response?.data?.message ||
          response?.data?.status?.message ||
          `Login failed (Status: ${response?.status})`;
        throw new Error(errorMessage);
      }

      const { status, details } = response?.data

      if (!status?.success) {
        throw new Error("Login was not successful");
      }

      if (!details?.token) {
        throw new Error("Authentication token missing");
      }

      // Successful login
      setUser(details.user);
      setToken(details.token);
      localStorage.setItem("token", details.token);
      navigate("/dashboard");

    } catch (error) {
      console.error("Login Error Details:", {
        error: error,
        name: error.name,
        message: error.message,
        stack: error.stack
      });

      let userMessage = "Login failed. Please try again.";
      if (error.message.includes("Network Error")) {
        userMessage = "Network error. Please check your connection.";
      } else if (error.message) {
        userMessage = error.message;
      }

      alert(userMessage);
    }
  };

  const logOut = () => {
    setUser(null);
    setToken("");
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{
      user,
      token,
      loginAction,
      logOut
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;