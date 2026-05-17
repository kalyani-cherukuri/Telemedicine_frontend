import DashboardLayout from "../../layout/DashboardLayout";
import { useCallback } from "react";

import {
  getPatientConsultations,
  cancelConsultation,
} from "../../services/consultationService";
import { EmptyState, ErrorState, LoadingState } from "../../components/PageState";
import StatusBadge from "../../components/StatusBadge";
import useAsyncResource from "../../hooks/useAsyncResource";

function Consultations() {

  const patientId = localStorage.getItem("userId");
  const loadConsultations = useCallback(
    () => getPatientConsultations(patientId),
    [patientId]
  );
  const {
    data: consultations,
    loading,
    error,
    reload,
  } = useAsyncResource(loadConsultations);

  const handleCancel = async (id) => {

    try {

      await cancelConsultation(id);
      reload();

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <DashboardLayout>

      <h1 className="text-3xl font-bold mb-6">
        My Consultations
      </h1>

      {loading && <LoadingState label="Loading consultations..." />}
      {error && <ErrorState message={error} />}
      {!loading && !error && consultations.length === 0 && (
        <EmptyState message="No consultations found." />
      )}

      {!loading && !error && consultations.length > 0 && <div className="overflow-x-auto rounded bg-white shadow">

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
                  <StatusBadge status={consultation.status} />
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

      </div>}

    </DashboardLayout>
  );
}

export default Consultations;
