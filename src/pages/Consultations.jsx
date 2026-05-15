import DashboardLayout from "../layout/DashboardLayout";

import { useAuth } from "../context/AuthContext";

const Consultations = () => {
  const { user } = useAuth();

  const consultations = [
    {
      id: 1,
      patient: "Rahul",
      doctor: "Dr. John",
      type: "Video",
      date: "20 May 2026",
      time: "10:00 AM",
      status: "SCHEDULED",
    },

    {
      id: 2,
      patient: "Kiran",
      doctor: "Dr. Priya",
      type: "Audio",
      date: "18 May 2026",
      time: "03:00 PM",
      status: "COMPLETED",
    },
  ];

  return (
    <DashboardLayout>
      {/* Heading */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-blue-700">
          Consultations
        </h1>

        <p className="text-gray-500 mt-2">
          Manage consultation workflow
        </p>
      </div>

      {/* Cards */}
      <div className="space-y-6">
        {consultations.map(
          (consultation) => (
            <div
              key={consultation.id}
              className="bg-white rounded-2xl shadow-md p-6"
            >
              <div className="flex flex-col lg:flex-row justify-between gap-6">
                {/* Left */}
                <div>
                  <h2 className="text-2xl font-bold text-blue-700">
                    {consultation.doctor}
                  </h2>

                  <p className="mt-2">
                    Patient:
                    {" "}
                    {consultation.patient}
                  </p>

                  <p className="mt-2">
                    Type:
                    {" "}
                    {consultation.type}
                  </p>

                  <p className="mt-2">
                    Date:
                    {" "}
                    {consultation.date}
                  </p>

                  <p className="mt-2">
                    Time:
                    {" "}
                    {consultation.time}
                  </p>
                </div>

                {/* Right */}
                <div className="flex flex-col gap-4 lg:items-end">
                  <span
                    className={`px-5 py-2 rounded-xl text-white ${
                      consultation.status ===
                      "SCHEDULED"
                        ? "bg-blue-600"
                        : "bg-green-600"
                    }`}
                  >
                    {consultation.status}
                  </span>

                  {/* PATIENT */}
                  {user?.role ===
                    "PATIENT" && (
                    <>
                      <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl transition">
                        Join Consultation
                      </button>

                      <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl transition">
                        Cancel
                      </button>
                    </>
                  )}

                  {/* DOCTOR */}
                  {user?.role ===
                    "DOCTOR" && (
                    <>
                      <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl transition">
                        Start Consultation
                      </button>

                      <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl transition">
                        Complete
                      </button>

                      <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl transition">
                        NO_SHOW
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </DashboardLayout>
  );
};

export default Consultations;