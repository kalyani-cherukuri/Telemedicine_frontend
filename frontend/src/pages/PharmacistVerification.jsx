import DashboardLayout from "../layout/DashboardLayout";

const PharmacistVerification = () => {
  const prescriptions = [
    {
      id: 1,
      patient: "Keerthi",
      doctor: "Dr. John",
      issuedDate: "15 May 2026",
      status: "ACTIVE",

      medicines: [
        {
          name: "Paracetamol",
          dosage: "500mg",
        },

        {
          name: "Vitamin C",
          dosage: "1 Tablet",
        },
      ],
    },

    {
      id: 2,
      patient: "Kiran",
      doctor: "Dr. Priya",
      issuedDate: "12 May 2026",
      status: "DISPENSED",

      medicines: [
        {
          name: "Skin Cream",
          dosage: "Apply",
        },
      ],
    },
  ];

  return (
    <DashboardLayout>
      {/* Heading */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-blue-700">
          Prescription Verification
        </h1>

        <p className="text-gray-500 mt-2">
          Verify and dispense
          prescriptions
        </p>
      </div>

      {/* Cards */}
      <div className="space-y-8">
        {prescriptions.map(
          (prescription) => (
            <div
              key={prescription.id}
              className="bg-white rounded-2xl shadow-md p-6"
            >
              {/* Top */}
              <div className="flex flex-col lg:flex-row justify-between gap-6">
                <div>
                  <h2 className="text-2xl font-bold text-blue-700">
                    {prescription.patient}
                  </h2>

                  <p className="mt-2">
                    Doctor:
                    {" "}
                    {prescription.doctor}
                  </p>

                  <p className="mt-2">
                    Issued:
                    {" "}
                    {
                      prescription.issuedDate
                    }
                  </p>
                </div>

                <div className="flex flex-col gap-4 lg:items-end">
                  <span
                    className={`px-5 py-2 rounded-xl text-white ${
                      prescription.status ===
                      "ACTIVE"
                        ? "bg-blue-600"
                        : "bg-green-600"
                    }`}
                  >
                    {prescription.status}
                  </span>

                  {prescription.status ===
                    "ACTIVE" && (
                    <>
                      <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl transition">
                        Verify
                      </button>

                      <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl transition">
                        Mark DISPENSED
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* Medicines */}
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
                            {
                              medicine.dosage
                            }
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

export default PharmacistVerification;