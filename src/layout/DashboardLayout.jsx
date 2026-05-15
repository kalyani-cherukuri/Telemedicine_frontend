import Sidebar from "../components/Sidebar";

const DashboardLayout = ({
  children,
}) => {
  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 p-5 md:p-8">
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;