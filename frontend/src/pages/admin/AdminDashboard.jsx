import { useEffect, useState } from "react";

import DashboardLayout from "../../layout/DashboardLayout";

import API from "../../api/axios";

function AdminDashboard() {

  const [users, setUsers] =
    useState([]);

  const [consultations,
    setConsultations] =
    useState([]);

  const [prescriptions,
    setPrescriptions] =
    useState([]);

  const fetchDashboardData =
    async () => {

      try {

        const usersResponse =
          await API.get("/users");

        setUsers(
          usersResponse.data
        );

        const consultationsResponse =
          await API.get("/consultations");

        setConsultations(
          consultationsResponse.data
        );

        try {

          const prescriptionsResponse =
            await API.get(
              "/prescriptions"
            );

          setPrescriptions(
            prescriptionsResponse.data
          );

        } catch {

          setPrescriptions([]);
        }

      } catch (error) {

        console.log(error);
      }
    };

  useEffect(() => {

    fetchDashboardData();

  }, []);

  const totalPatients =
    users.filter(
      (user) =>
        user.role ===
        "PATIENT"
    ).length;

  const totalDoctors =
    users.filter(
      (user) =>
        user.role ===
        "DOCTOR"
    ).length;

  return (
    <DashboardLayout>

      <h1 className="text-4xl font-bold mb-8">
        Admin Dashboard
      </h1>

      <div className="grid grid-cols-4 gap-6 mb-10">

        <div className="bg-white p-8 rounded shadow">

          <h2 className="text-2xl font-bold">
            Total Patients
          </h2>

          <p className="text-5xl mt-6">
            {totalPatients}
          </p>

        </div>

        <div className="bg-white p-8 rounded shadow">

          <h2 className="text-2xl font-bold">
            Total Doctors
          </h2>

          <p className="text-5xl mt-6">
            {totalDoctors}
          </p>

        </div>

        <div className="bg-white p-8 rounded shadow">

          <h2 className="text-2xl font-bold">
            Consultations
          </h2>

          <p className="text-5xl mt-6">
            {consultations.length}
          </p>

        </div>

        <div className="bg-white p-8 rounded shadow">

          <h2 className="text-2xl font-bold">
            Active Prescriptions
          </h2>

          <p className="text-5xl mt-6">
            {prescriptions.length}
          </p>

        </div>

      </div>

      <div className="grid grid-cols-2 gap-8">

        <div className="bg-white p-8 rounded shadow">

          <h2 className="text-3xl font-bold mb-8">
            Recent Consultations
          </h2>

          <table className="w-full">

            <thead>

              <tr className="border-b">

                <th className="text-left p-3">
                  Patient
                </th>

                <th className="text-left p-3">
                  Doctor
                </th>

                <th className="text-left p-3">
                  Status
                </th>

              </tr>

            </thead>

            <tbody>

              {consultations
                .slice(0, 5)
                .map((consultation) => (

                <tr
                  key={consultation.id}
                  className="border-b"
                >

                  <td className="p-3">
                    Patient #
                    {consultation.patientId}
                  </td>

                  <td className="p-3">
                    Doctor #
                    {consultation.doctorId}
                  </td>

                  <td className="p-3">
                    {consultation.status}
                  </td>

                </tr>
              ))}

            </tbody>

          </table>

        </div>

        <div className="bg-white p-8 rounded shadow">

          <h2 className="text-3xl font-bold mb-8">
            Recent Users
          </h2>

          <div className="space-y-5">

            {users
              .slice(0, 5)
              .map((user) => (

              <div
                key={user.id}
                className="border p-5 rounded"
              >

                <h3 className="text-xl font-bold">
                  {user.name}
                </h3>

                <p className="mt-2">
                  {user.email}
                </p>

                <p className="mt-2">
                  {user.role.replace(
                    "ROLE_",
                    ""
                  )}
                </p>

              </div>
            ))}

          </div>

        </div>

      </div>

    </DashboardLayout>
  );
}

export default AdminDashboard;