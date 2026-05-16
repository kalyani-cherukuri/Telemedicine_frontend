import { useState } from "react";
import BookingModal from "./BookingModal";

const DoctorCard = ({ doctor }) => {
  const [showModal, setShowModal] =
    useState(false);

  return (
    <>
      <div className="bg-white p-5 rounded-2xl shadow-md hover:shadow-xl transition">
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <img
            src={doctor.image}
            alt={doctor.name}
            className="w-20 h-20 rounded-full object-cover"
          />

          <div className="text-center sm:text-left">
            <h2 className="text-xl md:text-2xl font-bold text-blue-700">
              {doctor.name}
            </h2>

            <p className="text-gray-600">
              {doctor.specialization}
            </p>

            <p className="text-yellow-500 mt-1">
              ⭐ {doctor.rating}
            </p>
          </div>
        </div>

        <div className="mt-5 text-center sm:text-left">
          <p>
            Experience: {doctor.experience}
          </p>

          <p className="mt-1">
            Fee: ₹{doctor.fee}
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="mt-6 w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700"
        >
          Book Consultation
        </button>
      </div>

      {showModal && (
        <BookingModal
          doctor={doctor}
          closeModal={() =>
            setShowModal(false)
          }
        />
      )}
    </>
  );
};

export default DoctorCard;