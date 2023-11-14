// LoginPage.jsx
import React, { useState, useContext } from "react";

import { useNavigate, Link } from "react-router-dom";
import UserContext from "../context/userContext";
import useToast from "../hooks/useToast";

const LoginPage = () => {
  const navigate = useNavigate();

  const showToast = useToast();
  const { authenticate, session } = useContext(UserContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    authenticate(username, password)
      .then((res) => {
        showToast({ message: "Log in Successful", type: "success" });
        navigate("/");
      })
      .catch((err) => {
        showToast({ message: err.message, type: "error" });
      });
  };

  return (
    <div className="bg-slate-800 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md w-1/3">
        <h2 className="text-4xl font-semibold mb-4 text-center">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700 text-2xl">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="off"
              name="username"
              className="mt-1 p-2 w-full border rounded"
              placeholder="Enter your username"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 text-2xl">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="off"
              name="password"
              className="mt-1 p-2 w-full border rounded"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
          >
            Login
          </button>
        </form>
        <p className="text-blue-500 mt-5 mb-3">
          <Link to={"/registration"}>Don't have an account? Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
