const AppointmentDetailsModal = ({
  appointment,
  closeModal,
}) => {
  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center px-4 z-50">
      <div className="bg-white rounded-2xl p-8 w-full max-w-lg shadow-2xl">
        {/* Top */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-blue-700">
            Appointment Details
          </h1>

          <button
            onClick={closeModal}
            className="text-3xl"
          >
            ×
          </button>
        </div>

        {/* Details */}
        <div className="space-y-4">
          <p>
            <span className="font-bold">
              Doctor:
            </span>{" "}
            {appointment.doctor}
          </p>

          <p>
            <span className="font-bold">
              Consultation Type:
            </span>{" "}
            {appointment.type}
          </p>

          <p>
            <span className="font-bold">
              Date:
            </span>{" "}
            {appointment.date}
          </p>

          <p>
            <span className="font-bold">
              Time:
            </span>{" "}
            {appointment.time}
          </p>

          <p>
            <span className="font-bold">
              Status:
            </span>{" "}
            {appointment.status}
          </p>

          <div>
            <span className="font-bold">
              Symptoms:
            </span>

            <p className="mt-2 text-gray-600">
              Fever, headache, body pain
            </p>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <button className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl transition">
            Join Consultation
          </button>

          <button className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl transition">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AppointmentDetailsModal;