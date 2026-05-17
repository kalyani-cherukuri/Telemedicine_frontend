import DashboardLayout from "../../layout/DashboardLayout";
import { useCallback } from "react";

import {
  dispensePrescription,
} from "../../services/prescriptionService";

import API from "../../api/axios";
import { EmptyState, ErrorState, LoadingState } from "../../components/PageState";
import StatusBadge from "../../components/StatusBadge";
import useAsyncResource from "../../hooks/useAsyncResource";

function Prescriptions() {
  const loadPrescriptions = useCallback(async () => {
    const response = await API.get("/prescriptions");
    return response.data;
  }, []);

  const {
    data: prescriptions,
    loading,
    error,
    reload,
  } = useAsyncResource(loadPrescriptions);

  const handleDispense =
    async (id) => {

      try {

        await dispensePrescription(id);

        reload();

      } catch (error) {

        console.log(error);
      }
    };

  return (
    <DashboardLayout>

      <h1 className="text-3xl font-bold mb-6">
        Verify Prescriptions
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

            <h2 className="text-2xl font-bold">
              Prescription #{prescription.id}
            </h2>

            <p className="mt-2">
              Patient:
              {" "}
              {
                prescription.patient
                  ?.user?.name
              }
            </p>

            <p className="mt-2">
              Doctor:
              {" "}
              {
                prescription.doctor
                  ?.user?.name
              }
            </p>

            <p className="mt-2">
              Status:
              {" "}

              <StatusBadge status={prescription.status} />

            </p>

            <p className="mt-2">
              Signature:
              {" "}
              {
                prescription.digitalSignature
              }
            </p>

            <div className="mt-4">

              {prescription.status ===
                "ACTIVE" && (

                <button
                  onClick={() =>
                    handleDispense(
                      prescription.id
                    )
                  }
                  className="bg-black text-white px-5 py-2 rounded"
                >
                  Mark as Dispensed
                </button>
              )}

            </div>

          </div>
        ))}

      </div>}

    </DashboardLayout>
  );
}

export default Prescriptions;
