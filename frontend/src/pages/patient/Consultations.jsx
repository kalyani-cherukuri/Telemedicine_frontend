import { useEffect, useState } from "react";

import DashboardLayout from "../../layout/DashboardLayout";

import {
  getPatientConsultations,
  cancelConsultation,
} from "../../services/consultationService";

function Consultations() {

  const [consultations, setConsultations] = useState([]);

  const fetchConsultations = async () => {

    try {

      const patientId =localStorage.getItem("userId");

      const data=await getPatientConsultations(patientId);
      console.log(data);

      setConsultations(data);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchConsultations();
  }, []);

  const handleCancel = async (id) => {

    try {

      await cancelConsultation(id);

      alert("Consultation Cancelled");

      fetchConsultations();

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <DashboardLayout>

      <h1 className="text-3xl font-bold mb-6">
        My Consultations
      </h1>

      <div className="bg-white rounded shadow overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-200">

            <tr>

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
                Scheduled
              </th>

              <th className="p-4 text-left">
                Actions
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
                  {consultation.doctorId}
                </td>

                <td className="p-4">
                  {consultation.type}
                </td>

                <td className="p-4">
                  {consultation.status}
                </td>

                <td className="p-4">
                  {consultation.scheduledAt}
                </td>

                <td className="p-4">

                  {consultation.status ===
                    "SCHEDULED" && (

                    <button
                      onClick={() =>
                        handleCancel(
                          consultation.id
                        )
                      }
                      className="bg-red-500 text-white px-4 py-2 rounded"
                    >
                      Cancel
                    </button>
                  )}

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