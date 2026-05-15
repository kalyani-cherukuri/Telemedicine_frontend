import DashboardLayout from "../layout/DashboardLayout";

import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <DashboardLayout>
      <h1 className="text-4xl font-bold text-blue-700">
        {user?.role} Dashboard
      </h1>

      <p className="text-gray-500 mt-2">
        Welcome {user?.name}
      </p>

      {/* PATIENT */}
      {user?.role === "PATIENT" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
          <div className="bg-white p-6 rounded-2xl shadow-md">
            <h2 className="text-xl font-bold">
              Appointments
            </h2>

            <p className="text-4xl text-blue-600 mt-4">
              12
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md">
            <h2 className="text-xl font-bold">
              Prescriptions
            </h2>

            <p className="text-4xl text-green-600 mt-4">
              8
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md">
            <h2 className="text-xl font-bold">
              Medical Records
            </h2>

            <p className="text-4xl text-red-600 mt-4">
              4
            </p>
          </div>
        </div>
      )}

      {/* DOCTOR */}
      {user?.role === "DOCTOR" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
          <div className="bg-white p-6 rounded-2xl shadow-md">
            <h2 className="text-xl font-bold">
              Patients
            </h2>

            <p className="text-4xl text-blue-600 mt-4">
              25
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md">
            <h2 className="text-xl font-bold">
              Consultations
            </h2>

            <p className="text-4xl text-green-600 mt-4">
              18
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md">
            <h2 className="text-xl font-bold">
              Prescriptions
            </h2>

            <p className="text-4xl text-red-600 mt-4">
              10
            </p>
          </div>
        </div>
      )}

      {/* PHARMACIST */}
      {user?.role ===
        "PHARMACIST" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
          <div className="bg-white p-6 rounded-2xl shadow-md">
            <h2 className="text-xl font-bold">
              Pending
            </h2>

            <p className="text-4xl text-yellow-600 mt-4">
              6
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md">
            <h2 className="text-xl font-bold">
              Dispensed
            </h2>

            <p className="text-4xl text-green-600 mt-4">
              30
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md">
            <h2 className="text-xl font-bold">
              Medicines
            </h2>

            <p className="text-4xl text-blue-600 mt-4">
              120
            </p>
          </div>
        </div>
      )}

      {/* ADMIN */}
      {user?.role === "ADMIN" && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-10">
          <div className="bg-white p-6 rounded-2xl shadow-md">
            <h2 className="text-xl font-bold">
              Users
            </h2>

            <p className="text-4xl text-blue-600 mt-4">
              220
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md">
            <h2 className="text-xl font-bold">
              Doctors
            </h2>

            <p className="text-4xl text-green-600 mt-4">
              30
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md">
            <h2 className="text-xl font-bold">
              Consultations
            </h2>

            <p className="text-4xl text-red-600 mt-4">
              180
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md">
            <h2 className="text-xl font-bold">
              Revenue
            </h2>

            <p className="text-4xl text-purple-600 mt-4">
              ₹50K
            </p>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default Dashboard;