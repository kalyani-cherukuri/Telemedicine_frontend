import DashboardLayout from "../layout/DashboardLayout";
import { useState } from "react";

import AppointmentDetailsModal from "../components/AppointmentDetailsModal";
const Appointments = () => {
    const [selectedAppointment,
  setSelectedAppointment] =
  useState(null);
  const appointments = [
    {
      id: 1,
      doctor: "Dr. John",
      type: "Video Consultation",
      date: "20 May 2026",
      time: "10:00 AM",
      status: "Scheduled",
    },

    {
      id: 2,
      doctor: "Dr. Priya",
      type: "Audio Consultation",
      date: "18 May 2026",
      time: "03:30 PM",
      status: "Completed",
    },

    {
      id: 3,
      doctor: "Dr. David",
      type: "Chat Consultation",
      date: "22 May 2026",
      time: "01:00 PM",
      status: "Cancelled",
    },
  ];

  return (
    <DashboardLayout>
      {/* Heading */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-blue-700">
          Appointments
        </h1>

        <p className="text-gray-500 mt-2">
          Manage your consultations
        </p>
      </div>

      {/* Appointment Cards */}
      <div className="space-y-6">
        {appointments.map((appointment) => (
          <div
            key={appointment.id}
            className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition"
          >
            <div className="flex flex-col lg:flex-row justify-between gap-6">
              {/* Left */}
              <div>
                <h2 className="text-2xl font-bold text-blue-700">
                  {appointment.doctor}
                </h2>

                <p className="text-gray-500 mt-2">
                  {appointment.type}
                </p>

                <p className="mt-4">
                  Date:
                  {" "}
                  {appointment.date}
                </p>

                <p className="mt-2">
                  Time:
                  {" "}
                  {appointment.time}
                </p>
              </div>

              {/* Right */}
              <div className="flex flex-col gap-4 lg:items-end">
                <span
                  className={`px-5 py-2 rounded-xl text-white text-center ${
                    appointment.status ===
                    "Scheduled"
                      ? "bg-blue-600"
                      : appointment.status ===
                        "Completed"
                      ? "bg-green-600"
                      : "bg-red-600"
                  }`}
                >
                  {appointment.status}
                </span>

                <button
  onClick={() =>
    setSelectedAppointment(
      appointment
    )
  }
  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl transition"
>
  View Details
</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {selectedAppointment && (
        <AppointmentDetailsModal
          appointment={selectedAppointment}
          closeModal={() =>
            setSelectedAppointment(null)
          }
        />
      )}
    </DashboardLayout>
  );
};

export default Appointments;