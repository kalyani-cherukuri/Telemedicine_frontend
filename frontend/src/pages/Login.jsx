import { useState } from "react";

import {
  useNavigate,Link,
} from "react-router-dom";

import { useAuth } from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();

  const { login } = useAuth();

  const [role, setRole] =
    useState("PATIENT");

  const handleLogin = (e) => {
    e.preventDefault();

    login(role);

    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex justify-center items-center px-4 bg-gray-100">
      <div className="bg-white shadow-xl rounded-2xl p-10 w-full max-w-md">
        <h2 className="text-3xl font-bold text-blue-700 mb-8 text-center">
          Login
        </h2>

        <form
          onSubmit={handleLogin}
          className="space-y-5"
        >
          <input
            type="email"
            placeholder="Enter Email"
            className="w-full border p-3 rounded-xl"
          />

          <input
            type="password"
            placeholder="Enter Password"
            className="w-full border p-3 rounded-xl"
          />

          <select
            value={role}
            onChange={(e) =>
              setRole(e.target.value)
            }
            className="w-full border p-3 rounded-xl"
          >
            <option value="PATIENT">
              Patient
            </option>

            <option value="DOCTOR">
              Doctor
            </option>

            <option value="PHARMACIST">
              Pharmacist
            </option>

            <option value="ADMIN">
              Admin
            </option>
          </select>

          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl transition">
            Login
          </button>
        </form>
        {/* Footer */}
        <p className="text-center text-gray-500 mt-8">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-blue-600 font-semibold hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;