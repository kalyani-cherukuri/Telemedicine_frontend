import { useEffect, useState } from "react";

import DashboardLayout from "../../layout/DashboardLayout";

import {
  dispensePrescription,
} from "../../services/prescriptionService";

import API from "../../api/axios";

function Prescriptions() {

  const [prescriptions,
    setPrescriptions] =
    useState([]);

  const fetchPrescriptions =
    async () => {

      try {

        const response =
          await API.get("/prescriptions");

        setPrescriptions(
          response.data
        );

      } catch (error) {

        console.log(error);
      }
    };

  useEffect(() => {

    fetchPrescriptions();

  }, []);

  const handleDispense =
    async (id) => {

      try {

        await dispensePrescription(id);

        alert(
          "Prescription Dispensed"
        );

        fetchPrescriptions();

      } catch (error) {

        console.log(error);
      }
    };

  return (
    <DashboardLayout>

      <h1 className="text-3xl font-bold mb-6">
        Verify Prescriptions
      </h1>

      <div className="grid gap-5">

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

              <span
                className={`font-bold

                ${prescription.status ===
                  "ACTIVE"
                  ? "text-green-500"
                  : prescription.status ===
                    "DISPENSED"
                  ? "text-blue-500"
                  : "text-red-500"
                }`}
              >

                {prescription.status}

              </span>

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

      </div>

    </DashboardLayout>
  );
}

export default Prescriptions;