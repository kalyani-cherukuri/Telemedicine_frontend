import { useState } from "react";

import DashboardLayout
from "../../layout/DashboardLayout";

import { uploadMedicalRecord }
from "../../services/medicalRecordService";

function MedicalRecords() {

  const [patientId,
    setPatientId] =
    useState("");

  const [recordType,
    setRecordType] =
    useState("LAB_REPORT");

  const [title,
    setTitle] =
    useState("");

  const [description,
    setDescription] =
    useState("");

  const [file,
    setFile] =
    useState(null);

  const handleSubmit =
    async () => {

      try {

        const formData =
          new FormData();

        formData.append(
          "patientId",
          patientId
        );

        formData.append(
          "recordType",
          recordType
        );

        formData.append(
          "title",
          title
        );

        formData.append(
          "description",
          description
        );

        formData.append(
          "file",
          file
        );

        await uploadMedicalRecord(
          formData
        );

        alert("Record Uploaded");

      } catch (error) {
        console.log(error);
        alert("Upload Failed");
      }
    };

  return (
    <DashboardLayout>

      <h1 className="text-3xl font-bold mb-6">
        Upload Medical Record
      </h1>

      <div className="bg-white p-6 rounded shadow">

        <input
          type="number"
          placeholder="Patient ID"
          className="border p-3 w-full mb-4"
          onChange={(e) =>
            setPatientId(e.target.value)
          }
        />

        <select
          className="border p-3 w-full mb-4"
          onChange={(e) =>
            setRecordType(e.target.value)
          }
        >
          <option value="LAB_REPORT">
            LAB_REPORT
          </option>

          <option value="IMAGING">
            IMAGING
          </option>

          <option value="DISCHARGE_SUMMARY">
            DISCHARGE_SUMMARY
          </option>

          <option value="VACCINATION">
            VACCINATION
          </option>

          <option value="ALLERGY">
            ALLERGY
          </option>
        </select>

        <input
          type="text"
          placeholder="Title"
          className="border p-3 w-full mb-4"
          onChange={(e) =>
            setTitle(e.target.value)
          }
        />

        <textarea
          placeholder="Description"
          className="border p-3 w-full mb-4"
          onChange={(e) =>
            setDescription(e.target.value)
          }
        />

        <input
          type="file"
          className="border p-3 w-full mb-4"
          onChange={(e) =>
            setFile(e.target.files[0])
          }
        />

        <button
          onClick={handleSubmit}
          className="bg-black text-white px-5 py-2 rounded"
        >
          Upload Record
        </button>

      </div>

    </DashboardLayout>
  );
}

export default MedicalRecords;