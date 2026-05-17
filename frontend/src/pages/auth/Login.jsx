import { useState } from "react";
import { loginUser } from "../../services/authService";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/useAuth";

function Login() {

  const navigate = useNavigate();
  const { login } = useAuth();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

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
      setError("");
      const response = await loginUser(formData);
      login(response);

      if (response.role === "ROLE_PATIENT") {
        navigate("/patient/dashboard");
      }

      else if (response.role === "ROLE_DOCTOR") {
        navigate("/doctor/dashboard");
      }

      else if (response.role === "ROLE_ADMIN") {
        navigate("/admin/dashboard");
      }

      else if (response.role === "ROLE_PHARMACIST") {
        navigate("/pharmacist/dashboard");
      }

    } catch (error) {
      setError(error.response?.data?.message || "Invalid credentials.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">

      <form
        onSubmit={handleSubmit}
        className="border p-8 rounded w-[400px]"
      >

        <h1 className="text-2xl font-bold mb-5">
          Login
        </h1>

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="border p-2 w-full mb-4"
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="border p-2 w-full mb-4"
          onChange={handleChange}
          required
        />

        {error && <p className="mb-4 text-sm text-red-600">{error}</p>}

        <button disabled={submitting} className="w-full bg-black px-4 py-2 text-white disabled:opacity-60">
          {submitting ? "Logging in..." : "Login"}
        </button>

      </form>
    </div>
  );
}

export default Login;
