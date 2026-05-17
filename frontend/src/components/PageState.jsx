export function LoadingState({ label = "Loading..." }) {
  return (
    <div className="rounded-lg bg-white p-6 text-gray-600 shadow">
      {label}
    </div>
  );
}

export function ErrorState({ message = "Something went wrong." }) {
  return (
    <div className="rounded-lg border border-red-200 bg-red-50 p-6 text-red-700">
      {message}
    </div>
  );
}

export function EmptyState({ message = "Nothing to show yet." }) {
  return (
    <div className="rounded-lg bg-white p-6 text-gray-600 shadow">
      {message}
    </div>
  );
}
