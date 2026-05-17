const toneByStatus = {
  ACTIVE: "bg-green-500",
  COMPLETED: "bg-green-500",
  DISPENSED: "bg-blue-500",
  IN_PROGRESS: "bg-blue-500",
  CANCELLED: "bg-red-500",
  NO_SHOW: "bg-yellow-500",
  SCHEDULED: "bg-gray-500",
};

function StatusBadge({ status }) {
  return (
    <span className={`rounded px-3 py-1 text-white ${toneByStatus[status] || "bg-gray-500"}`}>
      {status}
    </span>
  );
}

export default StatusBadge;
