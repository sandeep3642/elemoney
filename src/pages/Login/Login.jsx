import React, { useState } from "react";
import { useAuth } from "../../hooks/useAuth";

const Login = () => {
  const [input, setInput] = useState({ email: "admin@elefinmoney.com", password: "Elefin@2025" });
  const [error, setError] = useState("");
  const { loginAction } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Basic validation
    if (!input.email || !input.email.includes("@")) {
      setError("Please enter a valid email address");
      return;
    }

    if (!input.password || input.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    try {
      await loginAction(input);
    } catch (err) {
      setError(err.message || "Login failed. Please try again.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <img src='./images/elefin-logo.svg' className="m-auto mb-4 w-60"/>
        <h2 className="text-2xl font-bold text-center text-gray-700">Admin Login</h2>
        {error && (
          <div className="p-2 text-center text-red-500 bg-red-100 rounded">
            {error}
          </div>
        )}
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-600" htmlFor="email">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={input.email}
              onChange={handleInputChange}
              className="block w-full px-4 py-2 mt-1 text-gray-700 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              value={input.password}
              onChange={handleInputChange}
              className="block w-full px-4 py-2 mt-1 text-gray-700 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="Enter your password"
              minLength="6"
            />
          </div>
          <button
            type="submit"
            className="w-full btn btn-primary"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;