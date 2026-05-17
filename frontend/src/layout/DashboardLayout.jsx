import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function DashboardLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-gray-100">

      <Sidebar />

      <div className="min-w-0 flex-1">

        <Navbar />

        <div className="p-4 md:p-6">
          {children}
        </div>

      </div>

    </div>
  );
}

export default DashboardLayout;
