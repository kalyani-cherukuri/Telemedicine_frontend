import { useState } from "react";

import DashboardLayout from "../layout/DashboardLayout";

const CreatePrescription = () => {
  const [medicines, setMedicines] =
    useState([
      {
        medicineName: "",
        dosage: "",
        frequency: "",
        duration: "",
        instructions: "",
      },
    ]);

  // ADD MEDICINE
  const addMedicine = () => {
    setMedicines([
      ...medicines,

      {
        medicineName: "",
        dosage: "",
        frequency: "",
        duration: "",
        instructions: "",
      },
    ]);
  };

  // HANDLE CHANGE
  const handleChange = (
    index,
    field,
    value
  ) => {
    const updatedMedicines = [
      ...medicines,
    ];

    updatedMedicines[index][field] =
      value;

    setMedicines(updatedMedicines);
  };

  return (
    <DashboardLayout>
      {/* Heading */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-blue-700">
          Create Prescription
        </h1>

        <p className="text-gray-500 mt-2">
          Add medicines and issue
          prescription
        </p>
      </div>

      {/* Form */}
      <div className="bg-white rounded-2xl shadow-md p-8">
        {/* Patient */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <input
            type="text"
            placeholder="Patient Name"
            className="border p-3 rounded-xl"
          />

          <input
            type="date"
            className="border p-3 rounded-xl"
          />
        </div>

        {/* Medicines */}
        <div className="space-y-8">
          {medicines.map(
            (medicine, index) => (
              <div
                key={index}
                className="border rounded-2xl p-6"
              >
                <h2 className="text-2xl font-bold mb-6">
                  Medicine
                  {" "}
                  {index + 1}
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <input
                    type="text"
                    placeholder="Medicine Name"
                    value={
                      medicine.medicineName
                    }
                    onChange={(e) =>
                      handleChange(
                        index,
                        "medicineName",
                        e.target.value
                      )
                    }
                    className="border p-3 rounded-xl"
                  />

                  <input
                    type="text"
                    placeholder="Dosage"
                    value={
                      medicine.dosage
                    }
                    onChange={(e) =>
                      handleChange(
                        index,
                        "dosage",
                        e.target.value
                      )
                    }
                    className="border p-3 rounded-xl"
                  />

                  <input
                    type="text"
                    placeholder="Frequency"
                    value={
                      medicine.frequency
                    }
                    onChange={(e) =>
                      handleChange(
                        index,
                        "frequency",
                        e.target.value
                      )
                    }
                    className="border p-3 rounded-xl"
                  />

                  <input
                    type="text"
                    placeholder="Duration"
                    value={
                      medicine.duration
                    }
                    onChange={(e) =>
                      handleChange(
                        index,
                        "duration",
                        e.target.value
                      )
                    }
                    className="border p-3 rounded-xl"
                  />

                  <textarea
                    rows="3"
                    placeholder="Instructions"
                    value={
                      medicine.instructions
                    }
                    onChange={(e) =>
                      handleChange(
                        index,
                        "instructions",
                        e.target.value
                      )
                    }
                    className="border p-3 rounded-xl md:col-span-2"
                  />
                </div>
              </div>
            )
          )}
        </div>

        {/* Buttons */}
        <div className="flex flex-col md:flex-row gap-4 mt-8">
          <button
            onClick={addMedicine}
            className="bg-gray-200 hover:bg-gray-300 px-6 py-3 rounded-xl transition"
          >
            Add Medicine
          </button>

          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl transition">
            Digitally Sign &
            Create Prescription
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CreatePrescription;