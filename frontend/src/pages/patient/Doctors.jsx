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

  const fetchDoctors = async () => {

    try {

      const data =
        await getDoctorsBySpecialization(specialization);

      setDoctors(data);

    } catch (error) {
      console.log(error);
    }
  };

  const handleBook = async () => {

    try {

      const consultationData = {
        patientId:Number(localStorage.getItem("userId")),
        doctorId: Number(selectedDoctor.id),
        type: "VIDEO",
        scheduledAt,
        symptoms,
      };
      console.log(consultationData);

      await bookConsultation(consultationData);

      alert("Consultation Booked");

      setSelectedDoctor(null);

    } catch (error) {
      console.log(error);
      alert("Booking Failed");
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

      <div className="grid grid-cols-3 gap-5">

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
            />

            <textarea
              placeholder="Symptoms"
              className="border p-3 w-full mb-4"
              onChange={(e) =>
                setSymptoms(e.target.value)
              }
            />

            <button
              onClick={handleBook}
              className="bg-black text-white px-5 py-2 rounded w-full"
            >
              Confirm Booking
            </button>

          </div>

        </div>
      )}

    </DashboardLayout>
  );
}

export default Doctors;