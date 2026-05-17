import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

function Navbar() {

  const navigate = useNavigate();
  const { logout: clearSession } = useAuth();

  const logout = () => {
    clearSession();
    navigate("/login");
  };

  return (
    <div className="flex justify-between bg-white p-4 shadow">

      <h1 className="font-bold text-xl">
        Dashboard
      </h1>

      <button
        onClick={logout}
        className="bg-red-500 text-white px-4 py-2 rounded"
      >
        Logout
      </button>

    </div>
  );
}

export default Navbar;
