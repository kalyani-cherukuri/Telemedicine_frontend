import { useEffect, useState } from "react";

import DashboardLayout from "../../layout/DashboardLayout";

import API from "../../api/axios";

function Consultations() {

  const [consultations,
    setConsultations] =
    useState([]);

  const fetchConsultations =
    async () => {

      try {

        const response =
          await API.get("/consultations");

        setConsultations(
          response.data
        );

      } catch (error) {

        console.log(error);
      }
    };

  useEffect(() => {

    fetchConsultations();

  }, []);

  return (
    <DashboardLayout>

      <h1 className="text-3xl font-bold mb-6">
        Consultation Monitoring
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
                Type
              </th>

              <th className="p-4 text-left">
                Status
              </th>

              <th className="p-4 text-left">
                Started At
              </th>

              <th className="p-4 text-left">
                Ended At
              </th>

            </tr>

          </thead>

          <tbody>

            {consultations.map((consultation) => (

              <tr
                key={consultation.id}
                className="border-t"
              >

                <td className="p-4">
                  {consultation.id}
                </td>

                <td className="p-4">
                  Patient #
                  {consultation.patientId}
                </td>

                <td className="p-4">
                  Doctor #
                  {consultation.doctorId}
                </td>

                <td className="p-4">
                  {consultation.type}
                </td>

                <td className="p-4">

                  <span
                    className={`px-3 py-1 rounded text-white

                    ${consultation.status ===
                      "COMPLETED"
                      ? "bg-green-500"
                      : consultation.status ===
                        "CANCELLED"
                      ? "bg-red-500"
                      : consultation.status ===
                        "IN_PROGRESS"
                      ? "bg-blue-500"
                      : consultation.status ===
                        "NO_SHOW"
                      ? "bg-yellow-500"
                      : "bg-gray-500"
                    }`}
                  >

                    {consultation.status}

                  </span>

                </td>

                <td className="p-4">
                  {consultation.startedAt || "-"}
                </td>

                <td className="p-4">
                  {consultation.endedAt || "-"}
                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </DashboardLayout>
  );
}

export default Consultations;