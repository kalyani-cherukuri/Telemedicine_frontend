import { useState } from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [role, setRole] =
    useState("PATIENT");

  const handleRegister = (e) => {
    e.preventDefault();

    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center px-4 py-10">
      <div className="bg-white shadow-2xl rounded-2xl p-8 md:p-10 w-full max-w-2xl">
        {/* Heading */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-blue-700">
            Register
          </h1>

          <p className="text-gray-500 mt-3">
            Create your telemedicine
            account
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleRegister}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Full Name */}
          <input
            type="text"
            placeholder="Full Name"
            className="border p-3 rounded-xl outline-none"
          />

          {/* Email */}
          <input
            type="email"
            placeholder="Email"
            className="border p-3 rounded-xl outline-none"
          />

          {/* Phone */}
          <input
            type="text"
            placeholder="Phone Number"
            className="border p-3 rounded-xl outline-none"
          />

          {/* Password */}
          <input
            type="password"
            placeholder="Password"
            className="border p-3 rounded-xl outline-none"
          />

          {/* Confirm Password */}
          <input
            type="password"
            placeholder="Confirm Password"
            className="border p-3 rounded-xl outline-none"
          />

          {/* Role */}
          <select
            value={role}
            onChange={(e) =>
              setRole(e.target.value)
            }
            className="border p-3 rounded-xl outline-none"
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
          </select>

          {/* Address */}
          <textarea
            rows="4"
            placeholder="Address"
            className="border p-3 rounded-xl outline-none md:col-span-2"
          />

          {/* Button */}
          <button className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl transition md:col-span-2">
            Register
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-gray-500 mt-8">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-600 font-semibold hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;