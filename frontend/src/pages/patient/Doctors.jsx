import { useState } from "react";
import DashboardLayout from "../../layout/DashboardLayout";
import { getDoctorsBySpecialization } from "../../services/doctorService";
import { bookConsultation } from "../../services/consultationService";

function Doctors() {

  const [specialization, setSpecialization] = useState("GENERAL");

  const [doctors, setDoctors] = useState([]);

  const [selectedDoctor, setSelectedDoctor] = useState(null);

  const [scheduledAt, setScheduledAt] = useState("");

  const [symptoms, setSymptoms] = useState("");
  const [loading, setLoading] = useState(false);
  const [booking, setBooking] = useState(false);
  const [message, setMessage] = useState("");

  const fetchDoctors = async () => {

    try {
      setLoading(true);
      setMessage("");
      const data =
        await getDoctorsBySpecialization(specialization);

      setDoctors(data);

    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to load doctors.");
    } finally {
      setLoading(false);
    }
  };

  const handleBook = async () => {

    try {
      setBooking(true);
      setMessage("");
      const consultationData = {
        patientId:Number(localStorage.getItem("userId")),
        doctorId: Number(selectedDoctor.id),
        type: "VIDEO",
        scheduledAt,
        symptoms,
      };
      await bookConsultation(consultationData);
      setMessage("Consultation booked.");

      setSelectedDoctor(null);

    } catch (error) {
      setMessage(error.response?.data?.message || "Booking failed.");
    } finally {
      setBooking(false);
    }
  };

  return (
    <DashboardLayout>

      <h1 className="text-3xl font-bold mb-6">
        Search Doctors
      </h1>

      <div className="flex gap-4 mb-6">

        <select
          value={specialization}
          onChange={(e) =>
            setSpecialization(e.target.value)
          }
          className="border p-3 rounded"
        >
          <option value="GENERAL">GENERAL</option>
          <option value="CARDIOLOGY">CARDIOLOGY</option>
          <option value="DERMATOLOGY">DERMATOLOGY</option>
          <option value="PEDIATRICS">PEDIATRICS</option>
          <option value="GYNECOLOGY">GYNECOLOGY</option>
          <option value="ORTHOPEDICS">ORTHOPEDICS</option>
        </select>

        <button
          onClick={fetchDoctors}
          className="bg-black text-white px-5 rounded"
        >
          Search
        </button>

      </div>

      {message && <p className="mb-4 text-sm text-gray-700">{message}</p>}

      {loading ? (
        <p>Loading doctors...</p>
      ) : (
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">

        {doctors.map((doctor) => (

          <div
            key={doctor.id}
            className="bg-white p-5 rounded shadow"
          >

            <h2 className="text-xl font-bold">
              {doctor.user?.name}
            </h2>

            <p className="mt-2">
              {doctor.specialization}
            </p>

            <p className="mt-2">
              Experience:
              {" "}
              {doctor.yearsOfExperience}
              {" "}
              years
            </p>

            <p className="mt-2">
              Fee:
              {" "}
              ₹{doctor.consultationFee}
            </p>

            <button
              onClick={() => setSelectedDoctor(doctor)}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
            >
              Book Consultation
            </button>

          </div>
        ))}

      </div>
      )}

      {selectedDoctor && (

        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">

          <div className="bg-white p-6 rounded w-[400px]">

            <h2 className="text-2xl font-bold mb-5">
              Book Consultation
            </h2>

            <input
              type="datetime-local"
              className="border p-3 w-full mb-4"
              onChange={(e) =>
                setScheduledAt(e.target.value)
              }
              required
            />

            <textarea
              placeholder="Symptoms"
              className="border p-3 w-full mb-4"
              onChange={(e) =>
                setSymptoms(e.target.value)
              }
              required
            />

            <button
              onClick={handleBook}
              disabled={booking || !scheduledAt || !symptoms}
              className="w-full rounded bg-black px-5 py-2 text-white disabled:opacity-60"
            >
              {booking ? "Booking..." : "Confirm Booking"}
            </button>

          </div>

        </div>
      )}

    </DashboardLayout>
  );
}

export default Doctors;
