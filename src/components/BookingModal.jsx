const BookingModal = ({
  doctor,
  closeModal,
}) => {
  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center px-4 z-50">
      <div className="bg-white w-full max-w-lg rounded-2xl p-6 md:p-8 shadow-2xl">
        {/* Top */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-blue-700">
            Book Consultation
          </h2>

          <button
            onClick={closeModal}
            className="text-2xl"
          >
            ×
          </button>
        </div>

        {/* Form */}
        <form className="space-y-5">
          {/* Doctor */}
          <input
            type="text"
            value={doctor.name}
            readOnly
            className="w-full border p-3 rounded-xl bg-gray-100"
          />

          {/* Date */}
          <input
            type="date"
            className="w-full border p-3 rounded-xl"
          />

          {/* Time */}
          <input
            type="time"
            className="w-full border p-3 rounded-xl"
          />

          {/* Consultation Type */}
          <select className="w-full border p-3 rounded-xl">
            <option>
              Video Consultation
            </option>

            <option>
              Audio Consultation
            </option>

            <option>
              Chat Consultation
            </option>
          </select>

          {/* Symptoms */}
          <textarea
            rows="4"
            placeholder="Enter Symptoms"
            className="w-full border p-3 rounded-xl"
          />

          {/* Button */}
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl transition">
            Confirm Booking
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookingModal;