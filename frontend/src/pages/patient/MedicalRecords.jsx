import {
  useEffect,
  useState,
} from "react";

import DashboardLayout
from "../../layout/DashboardLayout";

import {
  getPatientRecords,
  downloadMedicalRecord,
} from "../../services/medicalRecordService";

function MedicalRecords() {

  const [records,
    setRecords] =
    useState([]);

  const fetchRecords =
    async () => {

      try {

        const patientId =
  localStorage.getItem("userId");

const data=await getPatientRecords(patientId);

        setRecords(data);

      } catch (error) {
        console.log(error);
      }
    };

  useEffect(() => {
    fetchRecords();
  }, []);

  return (
    <DashboardLayout>

      <h1 className="text-3xl font-bold mb-6">
        Medical Records
      </h1>

      <div className="grid gap-5">

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

      </div>

    </DashboardLayout>
  );
}

export default MedicalRecords;