import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

import PatientDashboard from "./pages/patient/PatientDashboard";
import DoctorDashboard from "./pages/doctor/DoctorDashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";
import PharmacistDashboard from "./pages/pharmacist/PharmacistDashboard";

import Doctors from "./pages/patient/Doctors";

import PatientConsultations from "./pages/patient/Consultations";
import DoctorConsultations from "./pages/doctor/Consultations";

import ProtectedRoute from "./routes/ProtectedRoute";
import DoctorPrescriptions from "./pages/doctor/Prescriptions";
import PatientPrescriptions from "./pages/patient/Prescriptions";
import DoctorMedicalRecords from "./pages/doctor/MedicalRecords";
import PatientMedicalRecords from "./pages/patient/MedicalRecords";
import Users from "./pages/admin/Users";
import AuditLogs from "./pages/admin/AuditLogs";
import AdminConsultations from "./pages/admin/Consultations";
import AdminPrescriptions from "./pages/admin/Prescriptions";
import PharmacistPrescriptions from "./pages/pharmacist/Prescriptions";
import DoctorProfile from "./pages/doctor/Profile";
import PatientProfile from "./pages/patient/Profile";
import Prescription from "./pages/doctor/createPrescription";
function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Navigate to="/login" />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />
        <Route
  path="/admin/consultations"
  element={
    <ProtectedRoute role="ROLE_ADMIN">
      <AdminConsultations />
    </ProtectedRoute>
  }
/>
<Route
  path="/doctor/profile"
  element={
    <ProtectedRoute role="ROLE_DOCTOR">
      <DoctorProfile />
    </ProtectedRoute>
  }
/>
<Route
  path="/admin/prescriptions"
  element={
    <ProtectedRoute role="ROLE_ADMIN">
      <AdminPrescriptions />
    </ProtectedRoute>
  }
/>
<Route
  path="/pharmacist/prescriptions"
  element={
    <ProtectedRoute role="ROLE_PHARMACIST">
      <PharmacistPrescriptions />
    </ProtectedRoute>
  }
/>
<Route
  path="/patient/profile"
  element={
    <ProtectedRoute role="ROLE_PATIENT">
      <PatientProfile />
    </ProtectedRoute>
  }
/>
<Route
  path="/doctor/prescriptions/create/:consultationId"
  element={
    <ProtectedRoute role="ROLE_DOCTOR">
      <Prescription />
    </ProtectedRoute>
  }
/>

        <Route
          path="/patient/dashboard"
          element={
            <ProtectedRoute role="ROLE_PATIENT">
              <PatientDashboard />
            </ProtectedRoute>
          }
        />
        <Route
  path="/admin/users"
  element={
    <ProtectedRoute role="ROLE_ADMIN">
      <Users />
    </ProtectedRoute>
  }
/>
<Route
  path="/admin/logs"
  element={
    <ProtectedRoute role="ROLE_ADMIN">
      <AuditLogs />
    </ProtectedRoute>
  }
/>
        <Route
          path="/doctor/dashboard"
          element={
            <ProtectedRoute role="ROLE_DOCTOR">
              <DoctorDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute role="ROLE_ADMIN">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/pharmacist/dashboard"
          element={
            <ProtectedRoute role="ROLE_PHARMACIST">
              <PharmacistDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/patient/doctors"
          element={
            <ProtectedRoute role="ROLE_PATIENT">
              <Doctors />
            </ProtectedRoute>
          }
        />

        <Route
          path="/patient/consultations"
          element={
            <ProtectedRoute role="ROLE_PATIENT">
              <PatientConsultations />
            </ProtectedRoute>
          }
        />

        <Route
          path="/doctor/consultations"
          element={
            <ProtectedRoute role="ROLE_DOCTOR">
              <DoctorConsultations />
            </ProtectedRoute>
          }
        />
        <Route
  path="/doctor/prescriptions"
  element={
    <ProtectedRoute role="ROLE_DOCTOR">
      <DoctorPrescriptions />
    </ProtectedRoute>
  }
/>

<Route
  path="/patient/prescriptions"
  element={
    <ProtectedRoute role="ROLE_PATIENT">
      <PatientPrescriptions />
    </ProtectedRoute>
  }
/>
<Route
  path="/doctor/records"
  element={
    <ProtectedRoute role="ROLE_DOCTOR">
      <DoctorMedicalRecords />
    </ProtectedRoute>
  }
/>

<Route
  path="/patient/records"
  element={
    <ProtectedRoute role="ROLE_PATIENT">
      <PatientMedicalRecords />
    </ProtectedRoute>
  }
/>

      </Routes>

    </BrowserRouter>
  );
}

export default App;