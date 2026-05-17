import DashboardLayout from "../../layout/DashboardLayout";
import { useCallback } from "react";
import { getDoctorPrescriptions } from "../../services/prescriptionService";
import { EmptyState, ErrorState, LoadingState } from "../../components/PageState";
import StatusBadge from "../../components/StatusBadge";
import useAsyncResource from "../../hooks/useAsyncResource";

function Prescriptions() {

  const doctorId = localStorage.getItem("userId");
  const loadPrescriptions = useCallback(
    () => getDoctorPrescriptions(doctorId),
    [doctorId]
  );
  const {
    data: prescriptions,
    loading,
    error,
  } = useAsyncResource(loadPrescriptions);

  return (
    <DashboardLayout>

      <h1 className="text-3xl font-bold mb-6">
        Doctor Prescriptions
      </h1>

      {loading && <LoadingState label="Loading prescriptions..." />}
      {error && <ErrorState message={error} />}
      {!loading && !error && prescriptions.length === 0 && (
        <EmptyState message="No prescriptions found." />
      )}

      {!loading && !error && prescriptions.length > 0 && <div className="overflow-x-auto rounded bg-white shadow">

        <table className="w-full">

          <thead className="bg-gray-200">

            <tr>

              <th className="p-4 text-left">
                ID
              </th>

              <th className="p-4 text-left">
                Consultation
              </th>

              <th className="p-4 text-left">
                Status
              </th>

              <th className="p-4 text-left">
                Issued At
              </th>

            </tr>

          </thead>

          <tbody>

            {prescriptions.map(
              (prescription) => (

              <tr
                key={prescription.id}
                className="border-t"
              >

                <td className="p-4">
                  {prescription.id}
                </td>

                <td className="p-4">
                  #
                  {
                    prescription
                      .consultationId
                  }
                </td>

                <td className="p-4">

                  <StatusBadge status={prescription.status} />

                </td>

                <td className="p-4">
                  {
                    prescription.issuedAt
                  }
                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>}

    </DashboardLayout>
  );
}

export default Prescriptions;
