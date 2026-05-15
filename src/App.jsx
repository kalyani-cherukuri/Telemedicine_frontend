import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Doctors from "./pages/Doctors";
import Appointments from "./pages/Appointments";
import Consultations from "./pages/Consultations";
import Prescriptions from "./pages/Prescriptions";
import CreatePrescription from "./pages/CreatePrescription";
import PharmacistVerification from "./pages/PharmacistVerification";
import MedicalRecords from "./pages/MedicalRecords";
import AuditLogs from "./pages/AuditLogs";

import ProtectedRoute from "./routes/ProtectedRoute";
import RoleProtectedRoute from "./routes/RoleProtectedRoute";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* PUBLIC ROUTES */}
        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/login"
          element={<Login />}
        />
        <Route
  path="/register"
  element={<Register />}
/>
        {/* DASHBOARD */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* PROFILE */}
        <Route
          path="/profile"
          element={
            <RoleProtectedRoute
              allowedRoles={[
                "PATIENT",
                "DOCTOR",
                "PHARMACIST",
                "ADMIN",
              ]}
            >
              <Profile />
            </RoleProtectedRoute>
          }
        />

        {/* DOCTORS */}
        <Route
          path="/doctors"
          element={
            <RoleProtectedRoute
              allowedRoles={[
                "PATIENT",
                "ADMIN",
              ]}
            >
              <Doctors />
            </RoleProtectedRoute>
          }
        />

        {/* APPOINTMENTS */}
        <Route
          path="/appointments"
          element={
            <RoleProtectedRoute
              allowedRoles={[
                "PATIENT",
                "DOCTOR",
                "ADMIN",
              ]}
            >
              <Appointments />
            </RoleProtectedRoute>
          }
        />

        {/* CONSULTATIONS */}
        <Route
          path="/consultations"
          element={
            <RoleProtectedRoute
              allowedRoles={[
                "PATIENT",
                "DOCTOR",
                "ADMIN",
              ]}
            >
              <Consultations />
            </RoleProtectedRoute>
          }
        />

        {/* PRESCRIPTIONS */}
        <Route
          path="/prescriptions"
          element={
            <ProtectedRoute>
              <Prescriptions />
            </ProtectedRoute>
          }
        />

        {/* CREATE PRESCRIPTION */}
        <Route
          path="/create-prescription"
          element={
            <RoleProtectedRoute
              allowedRoles={[
                "DOCTOR",
              ]}
            >
              <CreatePrescription />
            </RoleProtectedRoute>
          }
        />

        {/* PHARMACIST */}
        <Route
          path="/pharmacist-verification"
          element={
            <RoleProtectedRoute
              allowedRoles={[
                "PHARMACIST",
              ]}
            >
              <PharmacistVerification />
            </RoleProtectedRoute>
          }
        />

        {/* MEDICAL RECORDS */}
        <Route
          path="/medical-records"
          element={
            <RoleProtectedRoute
              allowedRoles={[
                "PATIENT",
                "DOCTOR",
              ]}
            >
              <MedicalRecords />
            </RoleProtectedRoute>
          }
        />

        {/* AUDIT LOGS */}
        <Route
          path="/audit-logs"
          element={
            <RoleProtectedRoute
              allowedRoles={[
                "ADMIN",
              ]}
            >
              <AuditLogs />
            </RoleProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;