import { useCallback } from "react";

import DashboardLayout from "../../layout/DashboardLayout";

import API from "../../api/axios";
import useAsyncResource from "../../hooks/useAsyncResource";

function PharmacistDashboard() {

  const loadPrescriptions = useCallback(async () => {
    const response = await API.get("/prescriptions");
    return response.data;
  }, []);
  const { data: prescriptions } = useAsyncResource(loadPrescriptions);

  const activeCount =
    prescriptions.filter(
      (prescription) =>
        prescription.status === "ACTIVE"
    ).length;

  const dispensedCount =
    prescriptions.filter(
      (prescription) =>
        prescription.status === "DISPENSED"
    ).length;

  const cancelledCount =
    prescriptions.filter(
      (prescription) =>
        prescription.status === "CANCELLED"
    ).length;

  return (
    <DashboardLayout>

      <h1 className="text-3xl font-bold mb-6">
        Pharmacist Dashboard
      </h1>

      <div className="grid grid-cols-3 gap-5">

        <div className="bg-white p-6 rounded shadow">

          <h2 className="text-xl font-bold">
            Active Prescriptions
          </h2>

          <p className="text-4xl mt-4">
            {activeCount}
          </p>

        </div>

        <div className="bg-white p-6 rounded shadow">

          <h2 className="text-xl font-bold">
            Dispensed Prescriptions
          </h2>

          <p className="text-4xl mt-4">
            {dispensedCount}
          </p>

        </div>

        <div className="bg-white p-6 rounded shadow">

          <h2 className="text-xl font-bold">
            Cancelled Prescriptions
          </h2>

          <p className="text-4xl mt-4">
            {cancelledCount}
          </p>

        </div>

      </div>

      <div className="bg-white p-6 rounded shadow mt-8">

        <h2 className="text-2xl font-bold mb-5">
          Recent Prescriptions
        </h2>

        <table className="w-full">

          <thead className="bg-gray-200">

            <tr>

              <th className="p-4 text-left">
                ID
              </th>

              <th className="p-4 text-left">
                Patient
              </th>

              <th className="p-4 text-left">
                Doctor
              </th>

              <th className="p-4 text-left">
                Status
              </th>

            </tr>

          </thead>

          <tbody>

            {prescriptions
              .slice(0, 5)
              .map((prescription) => (

              <tr
                key={prescription.id}
                className="border-t"
              >

                <td className="p-4">
                  {prescription.id}
                </td>

                <td className="p-4">
                  {
                    prescription.patientId
                  }
                </td>

                <td className="p-4">
                  {
                    prescription.doctorId
                  }
                </td>

                <td className="p-4">

                  <span
                    className={`px-3 py-1 rounded text-white

                    ${prescription.status ===
                      "ACTIVE"
                      ? "bg-green-500"
                      : prescription.status ===
                        "DISPENSED"
                      ? "bg-blue-500"
                      : "bg-red-500"
                    }`}
                  >

                    {prescription.status}

                  </span>

                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </DashboardLayout>
  );
}

export default PharmacistDashboard;
