import { useState } from "react";

import DashboardLayout from "../../layout/DashboardLayout";

import { createPatientProfile } from "../../services/ProfileService";

function Profile() {

  const [dateOfBirth,
    setDateOfBirth] =
    useState("");

  const [gender,
    setGender] =
    useState("");

  const [bloodGroup,
    setBloodGroup] =
    useState("");

  const [emergencyContact,
    setEmergencyContact] =
    useState("");

  const [allergies,
    setAllergies] =
    useState("");

  const [chronicConditions,
    setChronicConditions] =
    useState("");
  const [savedProfile, setSavedProfile] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {
        const profileData = {
          dateOfBirth,

          gender,

          bloodGroup,

          emergencyContact,

          allergies,

          chronicConditions,
        };

        setSubmitting(true);
        setMessage("");
        const createdProfile = await createPatientProfile(profileData);
        setSavedProfile(createdProfile);
        setMessage("Profile saved.");

      } catch (error) {
        setMessage(error.response?.data?.message || "Failed to save profile.");
      } finally {
        setSubmitting(false);
      }
    };

  return (
    <DashboardLayout>

      <h1 className="text-4xl font-bold mb-8">
        Patient Profile
      </h1>

      {savedProfile ? (

        <div className="bg-white p-8 rounded shadow">

          <div className="mb-5">

            <strong>
              Date Of Birth:
            </strong>

            {" "}

            {savedProfile.dateOfBirth}

          </div>

          <div className="mb-5">

            <strong>
              Gender:
            </strong>

            {" "}

            {savedProfile.gender}

          </div>

          <div className="mb-5">

            <strong>
              Blood Group:
            </strong>

            {" "}

            {savedProfile.bloodGroup}

          </div>

          <div className="mb-5">

            <strong>
              Emergency Contact:
            </strong>

            {" "}

            {savedProfile.emergencyContact}

          </div>

          <div className="mb-5">

            <strong>
              Allergies:
            </strong>

            {" "}

            {savedProfile.allergies}

          </div>

          <div className="mb-5">

            <strong>
              Chronic Conditions:
            </strong>

            {" "}

            {savedProfile.chronicConditions}

          </div>

        </div>

      ) : (

        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded shadow"
        >

          <input
            type="date"
            value={dateOfBirth}
            onChange={(e) =>
              setDateOfBirth(
                e.target.value
              )
            }
            className="border p-4 w-full mb-5 rounded"
            required
          />

          <select
            value={gender}
            onChange={(e) =>
              setGender(
                e.target.value
              )
            }
            className="border p-4 w-full mb-5 rounded"
            required
          >

            <option value="">
              Select Gender
            </option>

            <option value="MALE">
              MALE
            </option>

            <option value="FEMALE">
              FEMALE
            </option>

            <option value="OTHER">
              OTHER
            </option>

          </select>

          <input
            type="text"
            placeholder="Blood Group"
            value={bloodGroup}
            onChange={(e) =>
              setBloodGroup(
                e.target.value
              )
            }
            className="border p-4 w-full mb-5 rounded"
            required
          />

          <input
            type="text"
            placeholder="Emergency Contact"
            value={emergencyContact}
            onChange={(e) =>
              setEmergencyContact(
                e.target.value
              )
            }
            className="border p-4 w-full mb-5 rounded"
            required
          />

          <textarea
            placeholder="Allergies"
            value={allergies}
            onChange={(e) =>
              setAllergies(
                e.target.value
              )
            }
            className="border p-4 w-full mb-5 rounded"
          />

          <textarea
            placeholder="Chronic Conditions"
            value={chronicConditions}
            onChange={(e) =>
              setChronicConditions(
                e.target.value
              )
            }
            className="border p-4 w-full mb-5 rounded"
          />

          {message && <p className="mb-5 text-sm text-gray-700">{message}</p>}

          <button
            type="submit"
            disabled={submitting}
            className="rounded bg-black px-8 py-4 text-white disabled:opacity-60"
          >
            {submitting ? "Saving..." : "Save Profile"}
          </button>

        </form>
      )}

    </DashboardLayout>
  );
}

export default Profile;
