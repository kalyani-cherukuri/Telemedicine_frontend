import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../../services/authService";

function Register() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "PATIENT",
  });
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {
      setSubmitting(true);
      setMessage("");
      await registerUser(formData);
      setMessage("Registration successful.");

      navigate("/login");

    } catch (error) {
      setMessage(error.response?.data?.message || "Registration failed.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">

      <form
        onSubmit={handleSubmit}
        className="bg-white w-[450px] p-8 rounded-2xl shadow-lg"
      >

        <h1 className="text-3xl font-bold text-center mb-6">
          Register
        </h1>

        <input
          type="text"
          name="name"
          placeholder="Enter Name"
          className="w-full border p-3 rounded-lg mb-4"
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          className="w-full border p-3 rounded-lg mb-4"
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          className="w-full border p-3 rounded-lg mb-4"
          onChange={handleChange}
          required
        />

        <select
          name="role"
          value={formData.role}
          className="w-full border p-3 rounded-lg mb-5"
          onChange={handleChange}
        >
          <option value="ADMIN">
            Admin
          </option>
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

        {message && <p className="mb-4 text-sm text-gray-700">{message}</p>}

        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-lg bg-black py-3 text-white disabled:opacity-60"
        >
          {submitting ? "Registering..." : "Register"}
        </button>

        <p className="text-center mt-5">

          Already have an account?

          <Link
            to="/login"
            className="text-blue-500 ml-2"
          >
            Login
          </Link>

        </p>

      </form>

    </div>
  );
}

export default Register;
