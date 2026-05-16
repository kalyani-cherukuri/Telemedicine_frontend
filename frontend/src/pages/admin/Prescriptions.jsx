import { useEffect, useState } from "react";

import DashboardLayout from "../../layout/DashboardLayout";

import API from "../../api/axios";

function Prescriptions() {

  const [prescriptions,
    setPrescriptions] =
    useState([]);

  const fetchPrescriptions =
    async () => {

      try {

        const response =
          await API.get("/prescriptions");

        setPrescriptions(
          response.data
        );

      } catch (error) {

        console.log(error);
      }
    };

  useEffect(() => {

    fetchPrescriptions();

  }, []);

  return (
    <DashboardLayout>

      <h1 className="text-3xl font-bold mb-6">
        Prescription Monitoring
      </h1>

      <div className="bg-white rounded shadow overflow-x-auto">

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

              <th className="p-4 text-left">
                Issued At
              </th>

              <th className="p-4 text-left">
                Valid Until
              </th>

              <th className="p-4 text-left">
                Signature
              </th>

            </tr>

          </thead>

          <tbody>

            {prescriptions.map((prescription) => (

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
                      : prescription.status ===
                        "CANCELLED"
                      ? "bg-red-500"
                      : "bg-gray-500"
                    }`}
                  >

                    {prescription.status}

                  </span>

                </td>

                <td className="p-4">
                  {
                    prescription.issuedAt
                  }
                </td>

                <td className="p-4">
                  {
                    prescription.validUntil
                  }
                </td>

                <td className="p-4">
                  {
                    prescription.digitalSignature
                  }
                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </DashboardLayout>
  );
}

export default Prescriptions;