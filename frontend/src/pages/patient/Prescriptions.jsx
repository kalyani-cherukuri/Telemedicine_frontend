import DashboardLayout
from "../../layout/DashboardLayout";
import { useCallback } from "react";

import {
  getPatientPrescriptions,
  downloadPrescription,
} from "../../services/prescriptionService";
import { EmptyState, ErrorState, LoadingState } from "../../components/PageState";
import StatusBadge from "../../components/StatusBadge";
import useAsyncResource from "../../hooks/useAsyncResource";

function Prescriptions() {

  const patientId = localStorage.getItem("userId");
  const loadPrescriptions = useCallback(
    () => getPatientPrescriptions(patientId),
    [patientId]
  );
  const {
    data: prescriptions,
    loading,
    error,
  } = useAsyncResource(loadPrescriptions);

  return (
    <DashboardLayout>

      <h1 className="text-3xl font-bold mb-6">
        My Prescriptions
      </h1>

      {loading && <LoadingState label="Loading prescriptions..." />}
      {error && <ErrorState message={error} />}
      {!loading && !error && prescriptions.length === 0 && (
        <EmptyState message="No prescriptions found." />
      )}

      {!loading && !error && prescriptions.length > 0 && <div className="grid gap-5">

        {prescriptions.map((prescription) => (

          <div
            key={prescription.id}
            className="bg-white p-5 rounded shadow"
          >

            <h2 className="text-xl font-bold">
              Prescription #{prescription.id}
            </h2>

            <p className="mt-2">
              Status:
              {" "}
              <StatusBadge status={prescription.status} />
            </p>

            <p className="mt-2">
              Valid Until:
              {" "}
              {prescription.validUntil}
            </p>

            <button
              onClick={() =>
                downloadPrescription(
                  prescription.id
                )
              }
              className="mt-4 bg-black text-white px-4 py-2 rounded"
            >
              Download
            </button>

          </div>
        ))}

      </div>}

    </DashboardLayout>
  );
}

export default Prescriptions;
