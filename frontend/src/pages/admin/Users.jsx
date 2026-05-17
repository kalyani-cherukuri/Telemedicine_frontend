import { useEffect, useState } from "react";

import DashboardLayout from "../../layout/DashboardLayout";

import API from "../../api/axios";

function Users() {

  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {

    try {

      const response =
        await API.get("/users");

      setUsers(response.data);

    } catch (error) {

      console.log(error);
    }
  };

  useEffect(() => {

    fetchUsers();

  }, []);

  return (
    <DashboardLayout>

      <h1 className="text-3xl font-bold mb-6">
        Users Management
      </h1>

      <div className="bg-white rounded shadow overflow-hidden">

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

      </div>

    </DashboardLayout>
  );
}

export default Users;