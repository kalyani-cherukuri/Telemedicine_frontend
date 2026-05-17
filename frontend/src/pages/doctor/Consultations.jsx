import { useEffect, useState } from "react";

import DashboardLayout from "../../layout/DashboardLayout";

import { useNavigate } from "react-router-dom";

import {
  getDoctorConsultations,
  startConsultation,
  completeConsultation,
} from "../../services/consultationService";

function Consultations() {

  const navigate = useNavigate();

  const [consultations,
    setConsultations] =
    useState([]);

  const [selectedConsultation,
    setSelectedConsultation] =
    useState(null);

  const [diagnosis,
    setDiagnosis] =
    useState("");

  const [notes,
    setNotes] =
    useState("");

  const fetchConsultations =
    async () => {

      try {

        const doctorId =
          localStorage.getItem(
            "userId"
          );

        const data =
          await getDoctorConsultations(
            doctorId
          );

        setConsultations(data);

      } catch (error) {

        console.log(error);
      }
    };

  useEffect(() => {

    fetchConsultations();

  }, []);

  const handleStart =
    async (id) => {

      try {

        await startConsultation(id);

        fetchConsultations();

      } catch (error) {

        console.log(error);
      }
    };

  const handleComplete =
    async () => {

      try {

        await completeConsultation(
          selectedConsultation.id,
          {
            diagnosis,
            notes,
          }
        );

        alert(
          "Consultation Completed"
        );

        setSelectedConsultation(
          null
        );

        fetchConsultations();

      } catch (error) {

        console.log(error);
      }
    };

  return (
    <DashboardLayout>

      <h1 className="text-3xl font-bold mb-6">
        Doctor Consultations
      </h1>

      <div className="grid gap-5">

        {consultations.map(
          (consultation) => (

          <div
            key={consultation.id}
            className="bg-white p-5 rounded shadow"
          >

            <h2 className="text-xl font-bold">

              Patient #
              {consultation.patientId}

            </h2>

            <p className="mt-2">

              Status:
              {" "}
              {consultation.status}

            </p>

            <p className="mt-2">

              Symptoms:
              {" "}
              {consultation.symptoms}

            </p>

            <div className="flex gap-3 mt-4">

              {consultation.status ===
                "SCHEDULED" && (

                <button
                  onClick={() =>
                    handleStart(
                      consultation.id
                    )
                  }
                  className="bg-green-500 text-white px-4 py-2 rounded"
                >
                  Start
                </button>
              )}

              {consultation.status ===
                "IN_PROGRESS" && (

                <button
                  onClick={() =>
                    setSelectedConsultation(
                      consultation
                    )
                  }
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Complete
                </button>
              )}

              {consultation.status ===
                "COMPLETED" && (

                <button
                  onClick={() =>
                    navigate(
                      `/doctor/prescriptions/create/${consultation.id}`
                    )
                  }
                  className="bg-black text-white px-4 py-2 rounded"
                >
                  Create Prescription
                </button>
              )}

            </div>

          </div>
        ))}

      </div>

      {selectedConsultation && (

        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">

          <div className="bg-white p-6 rounded w-[450px]">

            <h2 className="text-2xl font-bold mb-5">
              Complete Consultation
            </h2>

            <textarea
              placeholder="Diagnosis"
              className="border p-3 w-full mb-4"
              onChange={(e) =>
                setDiagnosis(
                  e.target.value
                )
              }
            />

            <textarea
              placeholder="Notes"
              className="border p-3 w-full mb-4"
              onChange={(e) =>
                setNotes(
                  e.target.value
                )
              }
            />

            <button
              onClick={handleComplete}
              className="bg-black text-white px-5 py-2 rounded w-full"
            >
              Submit
            </button>

          </div>

        </div>
      )}

    </DashboardLayout>
  );
}

export default Consultations;