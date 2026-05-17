import { useCallback } from "react";

import DashboardLayout from "../../layout/DashboardLayout";

import API from "../../api/axios";
import useAsyncResource from "../../hooks/useAsyncResource";

function AdminDashboard() {

  const loadDashboard = useCallback(async () => {
    const [usersResponse, consultationsResponse, prescriptionsResponse] =
      await Promise.all([
        API.get("/users"),
        API.get("/consultations"),
        API.get("/prescriptions").catch(() => ({ data: [] })),
      ]);
    return {
      users: usersResponse.data,
      consultations: consultationsResponse.data,
      prescriptions: prescriptionsResponse.data,
    };
  }, []);

  const { data } = useAsyncResource(loadDashboard);
  const users = data.users || [];
  const consultations = data.consultations || [];
  const prescriptions = data.prescriptions || [];

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
