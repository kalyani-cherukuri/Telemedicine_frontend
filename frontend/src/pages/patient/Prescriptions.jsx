import { useEffect, useState }
from "react";

import DashboardLayout
from "../../layout/DashboardLayout";

import {
  getPatientPrescriptions,
  downloadPrescription,
} from "../../services/prescriptionService";

function Prescriptions() {

  const [prescriptions,
    setPrescriptions] =
    useState([]);

  const fetchPrescriptions =
    async () => {

      try {

        const patientId =
  localStorage.getItem("userId");

const data=await getPatientPrescriptions(patientId);
        setPrescriptions(data);

      } catch (error) {
        console.log(error);
      }
    };

  useEffect(() => {
    fetchPrescriptions();
  }, []);

  return (
    <DashboardLayout>

      <h1 className="text-3xl font-bold mb-6">
        My Prescriptions
      </h1>

      <div className="grid gap-5">

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
              {prescription.status}
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

      </div>

    </DashboardLayout>
  );
}

export default Prescriptions;