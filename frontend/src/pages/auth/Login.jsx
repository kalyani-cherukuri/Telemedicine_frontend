import { useState } from "react";
import { loginUser } from "../../services/authService";
import { useNavigate } from "react-router-dom";

function Login() {

  const navigate = useNavigate();

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

      const response = await loginUser(formData);

      localStorage.setItem("token", response.token);
      localStorage.setItem("role", response.role);
      localStorage.setItem("userId", response.id);

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
      console.log(error);
      alert("Invalid Credentials");
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
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="border p-2 w-full mb-4"
          onChange={handleChange}
        />

        <button className="bg-black text-white px-4 py-2 w-full">
          Login
        </button>

      </form>
    </div>
  );
}

export default Login;