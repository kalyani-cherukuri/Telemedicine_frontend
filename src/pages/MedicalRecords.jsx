import DashboardLayout from "../layout/DashboardLayout";

const MedicalRecords = () => {
  const records = [
    {
      id: 1,
      title: "Blood Test Report",
      type: "Lab Report",
      doctor: "Dr. John",
      date: "15 May 2026",
      status: "Uploaded",
    },

    {
      id: 2,
      title: "X-Ray Scan",
      type: "Imaging",
      doctor: "Dr. Priya",
      date: "10 May 2026",
      status: "Reviewed",
    },

    {
      id: 3,
      title: "Vaccination Record",
      type: "Vaccination",
      doctor: "Dr. David",
      date: "02 May 2026",
      status: "Uploaded",
    },
  ];

  return (
    <DashboardLayout>
      {/* Heading */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-blue-700">
          Medical Records
        </h1>

        <p className="text-gray-500 mt-2">
          View and manage health records
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {records.map((record) => (
          <div
            key={record.id}
            className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition"
          >
            {/* Top */}
            <div className="flex flex-col sm:flex-row justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-blue-700">
                  {record.title}
                </h2>

                <p className="text-gray-500 mt-2">
                  {record.type}
                </p>

                <p className="mt-4">
                  Doctor:
                  {" "}
                  {record.doctor}
                </p>

                <p className="mt-2">
                  Date:
                  {" "}
                  {record.date}
                </p>
              </div>

              <div className="flex flex-col gap-4 sm:items-end">
                <span
                  className={`px-5 py-2 rounded-xl text-white text-center ${
                    record.status ===
                    "Uploaded"
                      ? "bg-blue-600"
                      : "bg-green-600"
                  }`}
                >
                  {record.status}
                </span>

                <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl transition">
                  Download
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
};

export default MedicalRecords;