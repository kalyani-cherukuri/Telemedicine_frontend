import { Link } from "react-router-dom";
import { useAuth } from "../context/useAuth";

function Sidebar() {
  const { user } = useAuth();
  const role = user?.role;

  return (
    <div className="hidden w-[250px] shrink-0 bg-black p-5 text-white md:block">

      <h1 className="text-2xl font-bold mb-10">
        Telemedicine
      </h1>

      <div className="flex flex-col gap-4">

        {role === "ROLE_PATIENT" && (
          <>
            <Link to="/patient/dashboard">Dashboard</Link>
            <Link to="/patient/profile">Profile</Link>
            <Link to="/patient/doctors">Doctors</Link>
            <Link to="/patient/consultations">Consultations</Link>
            <Link to="/patient/prescriptions">Prescriptions</Link>
            <Link to="/patient/records">Medical Records</Link>
          </>
        )}

        {role === "ROLE_DOCTOR" && (
          <>
            <Link to="/doctor/dashboard">Dashboard</Link>
            <Link to="/doctor/profile">Profile</Link>
            <Link to="/doctor/consultations">Consultations</Link>
            <Link to="/doctor/prescriptions">Prescriptions</Link>
            <Link to="/doctor/records">Medical Records</Link>
          </>
        )}

        {role === "ROLE_ADMIN" && (
          <>
            <Link to="/admin/dashboard">Dashboard</Link>
            <Link to="/admin/users">Users</Link>
            <Link to="/admin/consultations">Consultations</Link>
            <Link to="/admin/prescriptions">Prescriptions</Link>
            <Link to="/admin/logs">Audit Logs</Link>
          </>
        )}

        {role === "ROLE_PHARMACIST" && (
          <>
            <Link to="/pharmacist/dashboard">Dashboard</Link>
            <Link to="/pharmacist/prescriptions">
              Verify Prescriptions
            </Link>
          </>
        )}

      </div>

    </div>
  );
}

export default Sidebar;
