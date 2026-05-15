import DashboardLayout from "../layout/DashboardLayout";

const Prescriptions = () => {
  const prescriptions = [
    {
      id: 1,
      doctor: "Dr. John",
      date: "15 May 2026",
      status: "Active",

      medicines: [
        {
          name: "Paracetamol",
          dosage: "500mg",
          frequency: "Twice Daily",
        },

        {
          name: "Vitamin C",
          dosage: "1 Tablet",
          frequency: "Once Daily",
        },
      ],
    },

    {
      id: 2,
      doctor: "Dr. Priya",
      date: "10 May 2026",
      status: "Completed",

      medicines: [
        {
          name: "Skin Cream",
          dosage: "Apply",
          frequency: "Night",
        },
      ],
    },
  ];

  return (
    <DashboardLayout>
      {/* Heading */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-blue-700">
          Prescriptions
        </h1>

        <p className="text-gray-500 mt-2">
          View and manage prescriptions
        </p>
      </div>

      {/* Cards */}
      <div className="space-y-8">
        {prescriptions.map(
          (prescription) => (
            <div
              key={prescription.id}
              className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition"
            >
              {/* Top */}
              <div className="flex flex-col lg:flex-row justify-between gap-6">
                <div>
                  <h2 className="text-2xl font-bold text-blue-700">
                    {prescription.doctor}
                  </h2>

                  <p className="text-gray-500 mt-2">
                    {prescription.date}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
                  <span
                    className={`px-5 py-2 rounded-xl text-white text-center ${
                      prescription.status ===
                      "Active"
                        ? "bg-green-600"
                        : "bg-gray-600"
                    }`}
                  >
                    {prescription.status}
                  </span>

                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl transition">
                    Download
                  </button>
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto mt-8">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="text-left p-3">
                        Medicine
                      </th>

                      <th className="text-left p-3">
                        Dosage
                      </th>

                      <th className="text-left p-3">
                        Frequency
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {prescription.medicines.map(
                      (
                        medicine,
                        index
                      ) => (
                        <tr
                          key={index}
                          className="border-b"
                        >
                          <td className="p-3">
                            {medicine.name}
                          </td>

                          <td className="p-3">
                            {medicine.dosage}
                          </td>

                          <td className="p-3">
                            {medicine.frequency}
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )
        )}
      </div>
    </DashboardLayout>
  );
};

export default Prescriptions;