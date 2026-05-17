import { useEffect, useState } from "react";

import DashboardLayout from "../../layout/DashboardLayout";

import API from "../../api/axios";

function Profile() {

  const [profile, setProfile] =
    useState(null);

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

  const fetchProfile =
    async () => {

      try {

        const patientId =
          localStorage.getItem(
            "userId"
          );

        const response =
          await API.get(
            `/patient-profiles/${patientId}`
          );

        const fetchedProfile =
          response.data;

        setProfile(
          fetchedProfile
        );

      } catch (error) {

        console.log(error);

        setProfile(null);
      }
    };

  useEffect(() => {

    fetchProfile();

  }, []);

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        const patientId =
          localStorage.getItem(
            "userId"
          );

        const profileData = {

          patientId,

          dateOfBirth,

          gender,

          bloodGroup,

          emergencyContact,

          allergies,

          chronicConditions,
        };

        await API.post(
          "/patient-profiles",
          profileData
        );

        alert(
          "Profile Saved"
        );

        fetchProfile();

      } catch (error) {

        console.log(error);

        alert(
          error.response?.data
            ?.message ||
          "Failed to save profile"
        );
      }
    };

  return (
    <DashboardLayout>

      <h1 className="text-4xl font-bold mb-8">
        Patient Profile
      </h1>

      {profile ? (

        <div className="bg-white p-8 rounded shadow">

          <div className="mb-5">

            <strong>
              Date Of Birth:
            </strong>

            {" "}

            {profile.dateOfBirth}

          </div>

          <div className="mb-5">

            <strong>
              Gender:
            </strong>

            {" "}

            {profile.gender}

          </div>

          <div className="mb-5">

            <strong>
              Blood Group:
            </strong>

            {" "}

            {profile.bloodGroup}

          </div>

          <div className="mb-5">

            <strong>
              Emergency Contact:
            </strong>

            {" "}

            {profile.emergencyContact}

          </div>

          <div className="mb-5">

            <strong>
              Allergies:
            </strong>

            {" "}

            {profile.allergies}

          </div>

          <div className="mb-5">

            <strong>
              Chronic Conditions:
            </strong>

            {" "}

            {profile.chronicConditions}

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
          />

          <select
            value={gender}
            onChange={(e) =>
              setGender(
                e.target.value
              )
            }
            className="border p-4 w-full mb-5 rounded"
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

          <button
            type="submit"
            className="bg-black text-white px-8 py-4 rounded"
          >
            Save Profile
          </button>

        </form>
      )}

    </DashboardLayout>
  );
}

export default Profile;