// RegistrationPage.jsx
import React, { useState, useContext } from "react";
import UserContext from "../context/userContext";
import useToast from "../hooks/useToast";

import { useNavigate } from "react-router-dom";

import Error from "./Error";

const RegistrationPage = () => {
  const { signUp } = useContext(UserContext);
  const navigate = useNavigate();

  const showToast = useToast();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    signUp(name, password, email)
      .then((res) => {
        showToast({ message: res, type: "success" });
        navigate("/login");
      })
      .catch((err) => {
        showToast({ message: err.message, type: "error" });
      });
  };

  return (
    <div className="bg-slate-800   mx-auto min-h-screen flex items-center justify-center">
      <div className="bg-white  w-1/3 p-6 rounded shadow-md ">
        {password && cpassword && password != cpassword && (
          <Error>Password Does Not match</Error>
        )}

        <h2 className="text-4xl text-center text-gray-700 font-semibold mb-4">
          Register
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700 text-2xl ">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={name}
              onChange={(e) => setName(e.target.value)}
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
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 p-2 w-full border rounded"
              placeholder="Enter your password"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="confirmPassword"
              className="block text-gray-700 text-2xl"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={cpassword}
              onChange={(e) => setCpassword(e.target.value)}
              className="mt-1 p-2 w-full border rounded"
              placeholder="Confirm your password"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 text-2xl">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 p-2 w-full border rounded"
              placeholder="Enter your email"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegistrationPage;
