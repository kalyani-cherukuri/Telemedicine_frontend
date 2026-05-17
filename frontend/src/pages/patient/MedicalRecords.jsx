import DashboardLayout
from "../../layout/DashboardLayout";
import { useCallback } from "react";

import {
  getPatientRecords,
  downloadMedicalRecord,
} from "../../services/medicalRecordService";
import { EmptyState, ErrorState, LoadingState } from "../../components/PageState";
import useAsyncResource from "../../hooks/useAsyncResource";

function MedicalRecords() {

  const patientId = localStorage.getItem("userId");
  const loadRecords = useCallback(
    () => getPatientRecords(patientId),
    [patientId]
  );
  const {
    data: records,
    loading,
    error,
  } = useAsyncResource(loadRecords);

  return (
    <DashboardLayout>

      <h1 className="text-3xl font-bold mb-6">
        Medical Records
      </h1>

      {loading && <LoadingState label="Loading medical records..." />}
      {error && <ErrorState message={error} />}
      {!loading && !error && records.length === 0 && (
        <EmptyState message="No medical records found." />
      )}

      {!loading && !error && records.length > 0 && <div className="grid gap-5">

        {records.map((record) => (

          <div
            key={record.id}
            className="bg-white p-5 rounded shadow"
          >

            <h2 className="text-xl font-bold">
              {record.title}
            </h2>

            <p className="mt-2">
              {record.recordType}
            </p>

            <p className="mt-2">
              {record.description}
            </p>

            <button
              onClick={() =>
                downloadMedicalRecord(
                  record.id
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

export default MedicalRecords;
