import { useState } from "react";

import { useParams } from "react-router-dom";

import DashboardLayout from "../../layout/DashboardLayout";

import API from "../../api/axios";

function CreatePrescription() {

  const { consultationId } =
    useParams();

  const [items, setItems] =
    useState([
      {
        medicineName: "",
        dosage: "",
        frequency: "",
        duration: "",
        instructions: "",
      },
    ]);

  const handleChange = (
    index,
    field,
    value
  ) => {

    const updatedItems =
      [...items];

    updatedItems[index][field] =
      value;

    setItems(updatedItems);
  };

  const addMedicine = () => {

    setItems([
      ...items,

      {
        medicineName: "",
        dosage: "",
        frequency: "",
        duration: "",
        instructions: "",
      },
    ]);
  };

  const handleSubmit =
    async () => {

      try {

        const prescriptionData = {

          consultationId:
            Number(
              consultationId
            ),

          items,
        };

        console.log(
          prescriptionData
        );

        await API.post(
          "/prescriptions",
          prescriptionData
        );

        alert(
          "Prescription Created"
        );

        setItems([
          {
            medicineName: "",
            dosage: "",
            frequency: "",
            duration: "",
            instructions: "",
          },
        ]);

      } catch (error) {

        console.log(
          error.response?.data
        );

        alert(
          error.response?.data
            ?.message ||
          "Failed to create prescription"
        );
      }
    };

  return (
    <DashboardLayout>

      <h1 className="text-4xl font-bold mb-8">
        Create Prescription
      </h1>

      <div className="bg-white p-8 rounded shadow">

        <div className="mb-6">

          <p className="text-xl font-bold">

            Consultation ID:
            {" "}
            {consultationId}

          </p>

        </div>

        <h2 className="text-2xl font-bold mb-5">
          Medicines
        </h2>

        {items.map((item, index) => (

          <div
            key={index}
            className="border p-5 rounded mb-5"
          >

            <input
              type="text"
              placeholder="Medicine Name"
              value={item.medicineName}
              onChange={(e) =>
                handleChange(
                  index,
                  "medicineName",
                  e.target.value
                )
              }
              className="border p-3 w-full mb-4 rounded"
            />

            <input
              type="text"
              placeholder="Dosage"
              value={item.dosage}
              onChange={(e) =>
                handleChange(
                  index,
                  "dosage",
                  e.target.value
                )
              }
              className="border p-3 w-full mb-4 rounded"
            />

            <input
              type="text"
              placeholder="Frequency"
              value={item.frequency}
              onChange={(e) =>
                handleChange(
                  index,
                  "frequency",
                  e.target.value
                )
              }
              className="border p-3 w-full mb-4 rounded"
            />

            <input
              type="text"
              placeholder="Duration"
              value={item.duration}
              onChange={(e) =>
                handleChange(
                  index,
                  "duration",
                  e.target.value
                )
              }
              className="border p-3 w-full mb-4 rounded"
            />

            <input
              type="text"
              placeholder="Instructions"
              value={item.instructions}
              onChange={(e) =>
                handleChange(
                  index,
                  "instructions",
                  e.target.value
                )
              }
              className="border p-3 w-full rounded"
            />

          </div>
        ))}

        <div className="flex gap-4">

          <button
            onClick={addMedicine}
            className="bg-blue-500 text-white px-6 py-3 rounded"
          >
            Add Medicine
          </button>

          <button
            onClick={handleSubmit}
            className="bg-black text-white px-6 py-3 rounded"
          >
            Create Prescription
          </button>

        </div>

      </div>

    </DashboardLayout>
  );
}

export default CreatePrescription;