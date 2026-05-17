import DashboardLayout from "../../layout/DashboardLayout";
import { useCallback } from "react";

import API from "../../api/axios";
import { EmptyState, ErrorState, LoadingState } from "../../components/PageState";
import StatusBadge from "../../components/StatusBadge";
import useAsyncResource from "../../hooks/useAsyncResource";

function Consultations() {
  const loadConsultations = useCallback(async () => {
    const response = await API.get("/consultations");
    return response.data;
  }, []);

  const {
    data: consultations,
    loading,
    error,
  } = useAsyncResource(loadConsultations);

  return (
    <DashboardLayout>

      <h1 className="text-3xl font-bold mb-6">
        Consultation Monitoring
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

                  <StatusBadge status={consultation.status} />

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

      </div>}

    </DashboardLayout>
  );
}

export default Consultations;
