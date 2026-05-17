import { useEffect, useState } from "react";

import DashboardLayout from "../../layout/DashboardLayout";

import {
  getDoctorConsultations,
} from "../../services/consultationService";

import {
  getDoctorPrescriptions,
} from "../../services/prescriptionService";

function DoctorDashboard() {

  const [consultations,
    setConsultations] =
    useState([]);

  const [prescriptions,
    setPrescriptions] =
    useState([]);

  const fetchDashboardData =
    async () => {

      try {

        const doctorId =
          localStorage.getItem(
            "userId"
          );

        const consultationData =
          await getDoctorConsultations(
            doctorId
          );

        setConsultations(
          consultationData
        );

        const prescriptionData =
          await getDoctorPrescriptions(
            doctorId
          );

        setPrescriptions(
          prescriptionData
        );

      } catch (error) {

        console.log(error);
      }
    };

  useEffect(() => {

    fetchDashboardData();

  }, []);

  const todayConsultations =
    consultations.filter(
      (consultation) => {

        if (
          !consultation.startedAt
        ) {
          return false;
        }

        return (
          new Date(
            consultation.startedAt
          ).toDateString() ===
          new Date()
            .toDateString()
        );
      }
    ).length;

  const completedConsultations =
    consultations.filter(
      (consultation) =>
        consultation.status ===
        "COMPLETED"
    ).length;

  const activePrescriptions =
    prescriptions.filter(
      (prescription) =>
        prescription.status ===
        "ACTIVE"
    ).length;

  const pendingConsultations =
    consultations.filter(
      (consultation) =>
        consultation.status ===
        "SCHEDULED"
    ).length;

  return (
    <DashboardLayout>

      <h1 className="text-5xl font-bold mb-10">
        Doctor Dashboard
      </h1>

      <div className="grid grid-cols-4 gap-6 mb-10">

        <div className="bg-white p-8 rounded shadow">

          <h2 className="text-2xl font-bold mb-5">
            Today's
            Consultations
          </h2>

          <p className="text-6xl">
            {
              todayConsultations
            }
          </p>

        </div>

        <div className="bg-white p-8 rounded shadow">

          <h2 className="text-2xl font-bold mb-5">
            Completed
            Consultations
          </h2>

          <p className="text-6xl">
            {
              completedConsultations
            }
          </p>

        </div>

        <div className="bg-white p-8 rounded shadow">

          <h2 className="text-2xl font-bold mb-5">
            Active
            Prescriptions
          </h2>

          <p className="text-6xl">
            {
              activePrescriptions
            }
          </p>

        </div>

        <div className="bg-white p-8 rounded shadow">

          <h2 className="text-2xl font-bold mb-5">
            Pending
            Consultations
          </h2>

          <p className="text-6xl">
            {
              pendingConsultations
            }
          </p>

        </div>

      </div>

      <div className="grid grid-cols-2 gap-8">

        <div className="bg-white p-8 rounded shadow">

          <h2 className="text-3xl font-bold mb-6">
            Recent Consultations
          </h2>

          <div className="space-y-5">

            {consultations
              .slice(0, 5)
              .map(
                (consultation) => (

                <div
                  key={
                    consultation.id
                  }
                  className="border p-5 rounded"
                >

                  <p className="mb-2">

                    <strong>
                      Patient:
                    </strong>

                    {" "}

                    {
                      consultation.patientId
                    }

                  </p>

                  <p className="mb-2">

                    <strong>
                      Symptoms:
                    </strong>

                    {" "}

                    {
                      consultation.symptoms
                    }

                  </p>

                  <p className="mb-2">

                    <strong>
                      Status:
                    </strong>

                    {" "}

                    {
                      consultation.status
                    }

                  </p>

                </div>
              ))}

          </div>

        </div>

        <div className="bg-white p-8 rounded shadow">

          <h2 className="text-3xl font-bold mb-6">
            Recent Prescriptions
          </h2>

          <div className="space-y-5">

            {prescriptions
              .slice(0, 5)
              .map(
                (prescription) => (

                <div
                  key={
                    prescription.id
                  }
                  className="border p-5 rounded"
                >

                  <p className="mb-2">

                    <strong>
                      Prescription ID:
                    </strong>

                    {" "}

                    {
                      prescription.id
                    }

                  </p>

                  <p className="mb-2">

                    <strong>
                      Status:
                    </strong>

                    {" "}

                    {
                      prescription.status
                    }

                  </p>

                  <p className="mb-2">

                    <strong>
                      Signature:
                    </strong>

                    {" "}

                    {
                      prescription.signature
                    }

                  </p>

                </div>
              ))}

          </div>

        </div>

      </div>

    </DashboardLayout>
  );
}

export default DoctorDashboard;