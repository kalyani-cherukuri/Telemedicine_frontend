import { useState } from "react";

import DashboardLayout from "../../layout/DashboardLayout";

import {
  createDoctorProfile,
} from "../../services/profileService";

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

        await createDoctorProfile(
          formData
        );

        alert(
          "Profile Created Successfully"
        );

      } catch (error) {

        console.log(error);

        alert(
          "Failed to Create Profile"
        );
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
        />

        <input
          type="text"
          name="licenseNumber"
          placeholder="License Number"
          className="border p-3 w-full mb-4 rounded"
          onChange={handleChange}
        />

        <input
          type="number"
          name="consultationFee"
          placeholder="Consultation Fee"
          className="border p-3 w-full mb-4 rounded"
          onChange={handleChange}
        />

        <input
          type="number"
          name="yearsOfExperience"
          placeholder="Years Of Experience"
          className="border p-3 w-full mb-4 rounded"
          onChange={handleChange}
        />

        <button
          type="submit"
          className="bg-black text-white px-6 py-3 rounded"
        >
          Save Profile
        </button>

      </form>

    </DashboardLayout>
  );
}

export default Profile;