import { useCallback } from "react";

import DashboardLayout from "../../layout/DashboardLayout";

import {
  getPatientConsultations,
} from "../../services/consultationService";

import {
  getPatientPrescriptions,
} from "../../services/prescriptionService";

import {
  getPatientRecords,
} from "../../services/medicalRecordService";
import useAsyncResource from "../../hooks/useAsyncResource";

function PatientDashboard() {

  const patientId =
    localStorage.getItem("userId");
  const loadDashboard = useCallback(async () => {
    const [consultations, prescriptions, records] = await Promise.all([
      getPatientConsultations(patientId),
      getPatientPrescriptions(patientId),
      getPatientRecords(patientId),
    ]);
    return { consultations, prescriptions, records };
  }, [patientId]);
  const { data } = useAsyncResource(loadDashboard);
  const consultations = data.consultations || [];
  const prescriptions = data.prescriptions || [];
  const records = data.records || [];

  return (
    <DashboardLayout>

      <h1 className="text-3xl font-bold mb-6">
        Patient Dashboard
      </h1>

      <div className="grid grid-cols-3 gap-5">

        <div className="bg-white p-6 rounded shadow">

          <h2 className="text-xl font-bold">
            Total Consultations
          </h2>

          <p className="text-4xl mt-4">
            {consultations.length}
          </p>

        </div>

        <div className="bg-white p-6 rounded shadow">

          <h2 className="text-xl font-bold">
            Prescriptions
          </h2>

          <p className="text-4xl mt-4">
            {prescriptions.length}
          </p>

        </div>

        <div className="bg-white p-6 rounded shadow">

          <h2 className="text-xl font-bold">
            Medical Records
          </h2>

          <p className="text-4xl mt-4">
            {records.length}
          </p>

        </div>

      </div>

      <div className="grid grid-cols-2 gap-5 mt-8">

        <div className="bg-white p-6 rounded shadow">

          <h2 className="text-2xl font-bold mb-5">
            Recent Consultations
          </h2>

          {consultations.length === 0 ? (

            <p>No consultations found</p>

          ) : (

            <div className="space-y-4">

              {consultations
                .slice(0, 5)
                .map((consultation) => (

                <div
                  key={consultation.id}
                  className="border p-4 rounded"
                >

                  <p>
                    <span className="font-bold">
                      Doctor:
                    </span>
                    {" "}
                
                   Doctor #{consultation.doctorId}
                  </p>

                  <p>
                    <span className="font-bold">
                      Status:
                    </span>
                    {" "}
                    {consultation.status}
                  </p>

                  <p>
                    <span className="font-bold">
                      Date:
                    </span>
                    {" "}
                    {
                      consultation.startedAt
                    }
                  </p>

                </div>
              ))}

            </div>
          )}

        </div>

        <div className="bg-white p-6 rounded shadow">

          <h2 className="text-2xl font-bold mb-5">
            Recent Prescriptions
          </h2>

          {prescriptions.length === 0 ? (

            <p>No prescriptions found</p>

          ) : (

            <div className="space-y-4">

              {prescriptions
                .slice(0, 5)
                .map((prescription) => (

                <div
                  key={prescription.id}
                  className="border p-4 rounded"
                >

                  <p>
                    <span className="font-bold">
                      Prescription ID:
                    </span>
                    {" "}
                    {prescription.id}
                  </p>

                  <p>
                    <span className="font-bold">
                      Status:
                    </span>
                    {" "}
                    {prescription.status}
                  </p>

                  <p>
                    <span className="font-bold">
                      Valid Until:
                    </span>
                    {" "}
                    {
                      prescription.validUntil
                    }
                  </p>

                </div>
              ))}

            </div>
          )}

        </div>

      </div>

    </DashboardLayout>
  );
}

export default PatientDashboard;
