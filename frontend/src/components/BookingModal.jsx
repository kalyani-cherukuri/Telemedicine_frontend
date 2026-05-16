import { useState } from "react";

import { useAuth } from "../context/AuthContext";

import { bookConsultation } from "../services/consultationService";

const BookingModal = ({
  doctor,
  closeModal,
}) => {
  const { user } = useAuth();

  const [formData, setFormData] =
    useState({
      patientId: user?.id,
      doctorId: doctor.userId,
      type: "VIDEO",
      symptoms: "",
      diagnosis: "",
      notes: "",
      followUpRequired: false,
    });

  const [loading, setLoading] =
    useState(false);

  // HANDLE CHANGE
  const handleChange = (e) => {
    const { name, value, type,
      checked } = e.target;

    setFormData({
      ...formData,

      [name]:
        type === "checkbox"
          ? checked
          : value,
    });
  };

  // SUBMIT
  const handleSubmit =
    async (e) => {
      e.preventDefault();

      try {
        setLoading(true);

        const response =
          await bookConsultation(
            formData
          );

        console.log(
          response.data
        );

        alert(
          "Consultation Booked Successfully"
        );

        closeModal();
      } catch (error) {
        console.log(error);

        alert(
          "Booking Failed"
        );
      } finally {
        setLoading(false);
      }
    };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center px-4 z-50">
      <div className="bg-white w-full max-w-xl rounded-2xl p-6 md:p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
        {/* Top */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-blue-700">
            Book Consultation
          </h2>

          <button
            onClick={closeModal}
            className="text-3xl"
          >
            ×
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={
            handleSubmit
          }
          className="space-y-5"
        >
          {/* Doctor */}
          <input
            type="text"
            value={
              doctor.specialization
            }
            readOnly
            className="w-full border p-3 rounded-xl bg-gray-100"
          />

          {/* Consultation Type */}
          <select
            name="type"
            value={formData.type}
            onChange={
              handleChange
            }
            className="w-full border p-3 rounded-xl"
          >
            <option value="VIDEO">
              Video Consultation
            </option>

            <option value="AUDIO">
              Audio Consultation
            </option>

            <option value="CHAT">
              Chat Consultation
            </option>
          </select>

          {/* Symptoms */}
          <textarea
            rows="4"
            name="symptoms"
            placeholder="Enter Symptoms"
            value={
              formData.symptoms
            }
            onChange={
              handleChange
            }
            className="w-full border p-3 rounded-xl"
          />

          {/* Notes */}
          <textarea
            rows="3"
            name="notes"
            placeholder="Additional Notes"
            value={formData.notes}
            onChange={
              handleChange
            }
            className="w-full border p-3 rounded-xl"
          />

          {/* Follow Up */}
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              name="followUpRequired"
              checked={
                formData.followUpRequired
              }
              onChange={
                handleChange
              }
            />

            Follow Up Required
          </label>

          {/* Button */}
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl transition">
            {loading
              ? "Booking..."
              : "Confirm Booking"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookingModal;