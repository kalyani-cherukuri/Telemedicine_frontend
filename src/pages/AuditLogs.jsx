import DashboardLayout from "../layout/DashboardLayout";

const AuditLogs = () => {
  const logs = [
    {
      id: 1,
      user: "Dr. John",
      action:
        "Completed Consultation",
      target: "Patient Rahul",
      timestamp:
        "20 May 2026 - 10:30 AM",
      status: "SUCCESS",
    },

    {
      id: 2,
      user: "Pharmacist Meena",
      action:
        "Dispensed Prescription",
      target: "Prescription #102",
      timestamp:
        "19 May 2026 - 04:00 PM",
      status: "SUCCESS",
    },

    {
      id: 3,
      user: "Patient Kiran",
      action:
        "Accessed Medical Record",
      target: "Blood Test Report",
      timestamp:
        "18 May 2026 - 09:15 AM",
      status: "VIEWED",
    },

    {
      id: 4,
      user: "Admin",
      action:
        "Updated Doctor Profile",
      target: "Dr. Priya",
      timestamp:
        "17 May 2026 - 02:45 PM",
      status: "UPDATED",
    },
  ];

  return (
    <DashboardLayout>
      {/* Heading */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-blue-700">
          Audit Logs
        </h1>

        <p className="text-gray-500 mt-2">
          Track system activities and
          status changes
        </p>
      </div>

      {/* Logs */}
      <div className="space-y-6">
        {logs.map((log) => (
          <div
            key={log.id}
            className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition"
          >
            <div className="flex flex-col lg:flex-row justify-between gap-6">
              {/* Left */}
              <div>
                <h2 className="text-2xl font-bold text-blue-700">
                  {log.user}
                </h2>

                <p className="mt-3">
                  Action:
                  {" "}
                  {log.action}
                </p>

                <p className="mt-2">
                  Target:
                  {" "}
                  {log.target}
                </p>

                <p className="mt-2 text-gray-500">
                  {log.timestamp}
                </p>
              </div>

              {/* Right */}
              <div className="flex items-start lg:items-center">
                <span
                  className={`px-5 py-2 rounded-xl text-white ${
                    log.status ===
                    "SUCCESS"
                      ? "bg-green-600"
                      : log.status ===
                        "VIEWED"
                      ? "bg-blue-600"
                      : "bg-yellow-600"
                  }`}
                >
                  {log.status}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
};

export default AuditLogs;