import { NavLink } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const { user, logout } =useAuth();
  const navigate = useNavigate();

const handleLogout = () => {
  logout();

  navigate("/login");
};

  const style =
    "block p-3 rounded-xl hover:bg-white hover:text-blue-700 transition";

  return (
    <div className="w-64 bg-blue-700 text-white min-h-screen p-5 hidden md:block">
      <h2 className="text-3xl font-bold mb-10">
        Telemedicine
      </h2>

      <div className="space-y-4">
        {/* Dashboard */}
        <NavLink
          to="/dashboard"
          className={style}
        >
          Dashboard
        </NavLink>

        {/* Profile */}
        <NavLink
          to="/profile"
          className={style}
        >
          Profile
        </NavLink>

        {/* Doctors */}
        {(user?.role === "PATIENT" ||
          user?.role === "ADMIN") && (
          <NavLink
            to="/doctors"
            className={style}
          >
            Doctors
          </NavLink>
        )}

        {/* Appointments */}
        {(user?.role === "PATIENT" ||
          user?.role === "DOCTOR" ||
          user?.role === "ADMIN") && (
          <NavLink
            to="/appointments"
            className={style}
          >
            Appointments
          </NavLink>
        )}
        <NavLink
  to="/consultations"
  className={style}
>
  Consultations
</NavLink>

        {/* Prescriptions */}
        <NavLink
          to="/prescriptions"
          className={style}
        >
          Prescriptions
        </NavLink>
        {user?.role ===
  "PHARMACIST" && (
  <NavLink
    to="/pharmacist-verification"
    className={style}
  >
    Verify Prescriptions
  </NavLink>
)}
        {user?.role === "DOCTOR" && (
  <NavLink
    to="/create-prescription"
    className={style}
  >
    Create Prescription
  </NavLink>
)}


        {/* Medical Records */}
        <NavLink
          to="/medical-records"
          className={style}
        >
          Medical Records
        </NavLink>
        {user?.role === "ADMIN" && (
  <NavLink
    to="/audit-logs"
    className={style}
  >
    Audit Logs
  </NavLink>
  
)}
<button
  onClick={handleLogout}
  className="w-full mt-10 bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl transition"
>
  Logout
</button>
      </div>
    </div>
  );
};

export default Sidebar;