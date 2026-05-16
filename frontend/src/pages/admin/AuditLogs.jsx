import { useState } from "react";

import DashboardLayout from "../../layout/DashboardLayout";

import {
  getConsultationActivity,
  getPatientAccessLogs,
} from "../../services/auditService";

function AuditLogs() {

  const [consultationId,
    setConsultationId] =
    useState("");

  const [patientId,
    setPatientId] =
    useState("");

  const [consultationLogs,
    setConsultationLogs] =
    useState([]);

  const [accessLogs,
    setAccessLogs] =
    useState([]);

  const fetchConsultationLogs =
    async () => {

      try {

        const data =
          await getConsultationActivity(
            consultationId
          );

        setConsultationLogs(data);

      } catch (error) {
        console.log(error);
      }
    };

  const fetchAccessLogs =
    async () => {

      try {

        const data =
          await getPatientAccessLogs(
            patientId
          );

        setAccessLogs(data);

      } catch (error) {
        console.log(error);
      }
    };

  return (
    <DashboardLayout>

      <h1 className="text-3xl font-bold mb-6">
        Audit Logs
      </h1>

      <div className="grid grid-cols-2 gap-6">

        <div className="bg-white p-6 rounded shadow">

          <h2 className="text-2xl font-bold mb-4">
            Consultation Activity Logs
          </h2>

          <div className="flex gap-3 mb-5">

            <input
              type="number"
              placeholder="Consultation ID"
              className="border p-3 flex-1 rounded"
              onChange={(e) =>
                setConsultationId(
                  e.target.value
                )
              }
            />

            <button
              onClick={fetchConsultationLogs}
              className="bg-black text-white px-5 rounded"
            >
              Search
            </button>

          </div>

          <div className="space-y-4">

            {consultationLogs.map((log) => (

              <div
                key={log.id}
                className="border p-4 rounded"
              >

                <p>
                  <span className="font-bold">
                    Action:
                  </span>
                  {" "}
                  {log.action}
                </p>

                <p>
                  <span className="font-bold">
                    Old Status:
                  </span>
                  {" "}
                  {log.oldStatus}
                </p>

                <p>
                  <span className="font-bold">
                    New Status:
                  </span>
                  {" "}
                  {log.newStatus}
                </p>

                <p>
                  <span className="font-bold">
                    Performed By:
                  </span>
                  {" "}
                  {log.performedBy?.name}
                </p>

                <p>
                  <span className="font-bold">
                    Timestamp:
                  </span>
                  {" "}
                  {log.timestamp}
                </p>

              </div>
            ))}

          </div>

        </div>

        <div className="bg-white p-6 rounded shadow">

          <h2 className="text-2xl font-bold mb-4">
            Medical Access Logs
          </h2>

          <div className="flex gap-3 mb-5">

            <input
              type="number"
              placeholder="Patient ID"
              className="border p-3 flex-1 rounded"
              onChange={(e) =>
                setPatientId(
                  e.target.value
                )
              }
            />

            <button
              onClick={fetchAccessLogs}
              className="bg-black text-white px-5 rounded"
            >
              Search
            </button>

          </div>

          <div className="space-y-4">

            {accessLogs.map((log) => (

              <div
                key={log.id}
                className="border p-4 rounded"
              >

                <p>
                  <span className="font-bold">
                    Access Type:
                  </span>
                  {" "}
                  {log.accessType}
                </p>

                <p>
                  <span className="font-bold">
                    Accessed By:
                  </span>
                  {" "}
                  {log.accessedBy?.name}
                </p>

                <p>
                  <span className="font-bold">
                    Accessed At:
                  </span>
                  {" "}
                  {log.accessedAt}
                </p>

                <p>
                  <span className="font-bold">
                    IP Address:
                  </span>
                  {" "}
                  {log.ipAddress}
                </p>

              </div>
            ))}

          </div>

        </div>

      </div>

    </DashboardLayout>
  );
}

export default AuditLogs;