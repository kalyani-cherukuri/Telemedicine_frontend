import { useState } from "react";

import DashboardLayout from "../layout/DashboardLayout";

import BookingModal from "../components/BookingModal";

const Doctors = () => {
  const [selectedDoctor, setSelectedDoctor] =
    useState(null);

  const doctors = [
    {
      id: 1,
      name: "Dr. John",
      specialization: "Cardiology",
      experience: "10 Years",
      fee: 500,
    },

    {
      id: 2,
      name: "Dr. Priya",
      specialization: "Dermatology",
      experience: "7 Years",
      fee: 700,
    },

    {
      id: 3,
      name: "Dr. David",
      specialization: "Orthopedics",
      experience: "12 Years",
      fee: 900,
    },
  ];

  return (
    <DashboardLayout>
      {/* Heading */}
      <div className="flex flex-col md:flex-row justify-between gap-4 md:items-center mb-10">
        <h1 className="text-4xl font-bold text-blue-700">
          Doctors
        </h1>

        <input
          type="text"
          placeholder="Search Doctor"
          className="border p-3 rounded-xl w-full md:w-80"
        />
      </div>

      {/* Filter */}
      <div className="mb-8">
        <select className="border p-3 rounded-xl w-full md:w-72">
          <option>
            All Specializations
          </option>

          <option>Cardiology</option>

          <option>Dermatology</option>

          <option>Orthopedics</option>
        </select>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {doctors.map((doctor) => (
          <div
            key={doctor.id}
            className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition"
          >
            <h2 className="text-2xl font-bold text-blue-700">
              {doctor.name}
            </h2>

            <p className="text-gray-500 mt-2">
              {doctor.specialization}
            </p>

            <p className="mt-3">
              Experience:
              {" "}
              {doctor.experience}
            </p>

            <p className="mt-2">
              Consultation Fee:
              {" "}
              ₹{doctor.fee}
            </p>

            <button
              onClick={() =>
                setSelectedDoctor(doctor)
              }
              className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl transition"
            >
              Book Consultation
            </button>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedDoctor && (
        <BookingModal
          doctor={selectedDoctor}
          closeModal={() =>
            setSelectedDoctor(null)
          }
        />
      )}
    </DashboardLayout>
  );
};

export default Doctors;