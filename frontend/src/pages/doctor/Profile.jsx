import { useState } from "react";

import DashboardLayout from "../../layout/DashboardLayout";

import {
  createDoctorProfile,
} from "../../services/ProfileService";

function Profile() {

  const [formData,
    setFormData] =
    useState({

      userId:
        localStorage.getItem(
          "userId"
        ),

      specialization:
        "GENERAL",

      qualification: "",

      licenseNumber: "",

      consultationFee: "",

      yearsOfExperience: "",
    });
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange =
    (e) => {

      setFormData({
        ...formData,

        [e.target.name]:
          e.target.value,
      });
    };

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {
        setSubmitting(true);
        setMessage("");
        await createDoctorProfile(
          formData
        );
        setMessage("Profile created successfully.");

      } catch (error) {
        setMessage(error.response?.data?.message || "Failed to create profile.");
      } finally {
        setSubmitting(false);
      }
    };

  return (
    <DashboardLayout>

      <h1 className="text-3xl font-bold mb-6">
        Doctor Profile
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow"
      >

        <select
          name="specialization"
          className="border p-3 w-full mb-4 rounded"
          onChange={handleChange}
        >

          <option value="GENERAL">
            GENERAL
          </option>

          <option value="CARDIOLOGY">
            CARDIOLOGY
          </option>

          <option value="DERMATOLOGY">
            DERMATOLOGY
          </option>

          <option value="PEDIATRICS">
            PEDIATRICS
          </option>

          <option value="GYNECOLOGY">
            GYNECOLOGY
          </option>

          <option value="ORTHOPEDICS">
            ORTHOPEDICS
          </option>

        </select>

        <input
          type="text"
          name="qualification"
          placeholder="Qualification"
          className="border p-3 w-full mb-4 rounded"
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="licenseNumber"
          placeholder="License Number"
          className="border p-3 w-full mb-4 rounded"
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="consultationFee"
          placeholder="Consultation Fee"
          className="border p-3 w-full mb-4 rounded"
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="yearsOfExperience"
          placeholder="Years Of Experience"
          className="border p-3 w-full mb-4 rounded"
          onChange={handleChange}
          required
        />

        {message && <p className="mb-4 text-sm text-gray-700">{message}</p>}

        <button
          type="submit"
          disabled={submitting}
          className="rounded bg-black px-6 py-3 text-white disabled:opacity-60"
        >
          {submitting ? "Saving..." : "Save Profile"}
        </button>

      </form>

    </DashboardLayout>
  );
}

export default Profile;
