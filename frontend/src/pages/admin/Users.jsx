import DashboardLayout from "../../layout/DashboardLayout";
import { useCallback } from "react";

import API from "../../api/axios";
import { EmptyState, ErrorState, LoadingState } from "../../components/PageState";
import useAsyncResource from "../../hooks/useAsyncResource";

function Users() {
  const loadUsers = useCallback(async () => {
    const response = await API.get("/users");
    return response.data;
  }, []);

  const {
    data: users,
    loading,
    error,
  } = useAsyncResource(loadUsers);

  return (
    <DashboardLayout>

      <h1 className="text-3xl font-bold mb-6">
        Users Management
      </h1>

      {loading && <LoadingState label="Loading users..." />}
      {error && <ErrorState message={error} />}
      {!loading && !error && users.length === 0 && <EmptyState message="No users found." />}

      {!loading && !error && users.length > 0 && <div className="overflow-x-auto rounded bg-white shadow">

        <table className="w-full">

          <thead className="bg-gray-200">

            <tr>

              <th className="p-4 text-left">
                ID
              </th>

              <th className="p-4 text-left">
                Name
              </th>

              <th className="p-4 text-left">
                Email
              </th>

              <th className="p-4 text-left">
                Role
              </th>

              <th className="p-4 text-left">
                Created At
              </th>

            </tr>

          </thead>

          <tbody>

            {users.map((user) => (

              <tr
                key={user.id}
                className="border-t"
              >

                <td className="p-4">
                  {user.id}
                </td>

                <td className="p-4">
                  {user.name}
                </td>

                <td className="p-4">
                  {user.email}
                </td>

                <td className="p-4">
                  {user.role}
                </td>

                <td className="p-4">
                  {user.createdAt}
                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>}

    </DashboardLayout>
  );
}

export default Users;
