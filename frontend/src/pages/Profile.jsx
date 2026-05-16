import DashboardLayout from "../layout/DashboardLayout";

import { useAuth } from "../context/AuthContext";

const Profile = () => {
  const { user } = useAuth();

  return (
    <DashboardLayout>
      {/* Heading */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-blue-700">
          Profile
        </h1>

        <p className="text-gray-500 mt-2">
          Manage your profile information
        </p>
      </div>

      {/* PATIENT PROFILE */}
      {user?.role === "PATIENT" && (
        <div className="bg-white rounded-2xl shadow-md p-8">
          <h2 className="text-2xl font-bold mb-8">
            Patient Profile
          </h2>

          <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              type="text"
              placeholder="Full Name"
              className="border p-3 rounded-xl"
            />

            <input
              type="date"
              className="border p-3 rounded-xl"
            />

            <select className="border p-3 rounded-xl">
              <option>Gender</option>

              <option>Male</option>

              <option>Female</option>
            </select>

            <input
              type="text"
              placeholder="Blood Group"
              className="border p-3 rounded-xl"
            />

            <input
              type="text"
              placeholder="Emergency Contact"
              className="border p-3 rounded-xl"
            />

            <input
              type="text"
              placeholder="Allergies"
              className="border p-3 rounded-xl"
            />

            <textarea
              placeholder="Chronic Conditions"
              className="border p-3 rounded-xl md:col-span-2"
              rows="4"
            />

            <button className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl transition md:col-span-2">
              Save Profile
            </button>
          </form>
        </div>
      )}

      {/* DOCTOR PROFILE */}
      {user?.role === "DOCTOR" && (
        <div className="bg-white rounded-2xl shadow-md p-8">
          <h2 className="text-2xl font-bold mb-8">
            Doctor Profile
          </h2>

          <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              type="text"
              placeholder="Full Name"
              className="border p-3 rounded-xl"
            />

            <input
              type="text"
              placeholder="Specialization"
              className="border p-3 rounded-xl"
            />

            <input
              type="text"
              placeholder="Qualification"
              className="border p-3 rounded-xl"
            />

            <input
              type="text"
              placeholder="License Number"
              className="border p-3 rounded-xl"
            />

            <input
              type="number"
              placeholder="Consultation Fee"
              className="border p-3 rounded-xl"
            />

            <input
              type="text"
              placeholder="Experience"
              className="border p-3 rounded-xl"
            />

            <textarea
              placeholder="Availability"
              className="border p-3 rounded-xl md:col-span-2"
              rows="4"
            />

            <button className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl transition md:col-span-2">
              Save Profile
            </button>
          </form>
        </div>
      )}

      {/* PHARMACIST */}
      {user?.role ===
        "PHARMACIST" && (
        <div className="bg-white rounded-2xl shadow-md p-8">
          <h2 className="text-2xl font-bold mb-8">
            Pharmacist Profile
          </h2>

          <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              type="text"
              placeholder="Full Name"
              className="border p-3 rounded-xl"
            />

            <input
              type="text"
              placeholder="Pharmacy Name"
              className="border p-3 rounded-xl"
            />

            <input
              type="text"
              placeholder="License Number"
              className="border p-3 rounded-xl"
            />

            <input
              type="text"
              placeholder="Experience"
              className="border p-3 rounded-xl"
            />

            <button className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl transition md:col-span-2">
              Save Profile
            </button>
          </form>
        </div>
      )}

      {/* ADMIN */}
      {user?.role === "ADMIN" && (
        <div className="bg-white rounded-2xl shadow-md p-8">
          <h2 className="text-2xl font-bold mb-8">
            Admin Profile
          </h2>

          <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              type="text"
              placeholder="Admin Name"
              className="border p-3 rounded-xl"
            />

            <input
              type="email"
              placeholder="Admin Email"
              className="border p-3 rounded-xl"
            />

            <input
              type="text"
              placeholder="Department"
              className="border p-3 rounded-xl"
            />

            <input
              type="text"
              placeholder="Access Level"
              className="border p-3 rounded-xl"
            />

            <button className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl transition md:col-span-2">
              Save Profile
            </button>
          </form>
        </div>
      )}
    </DashboardLayout>
  );
};

export default Profile;