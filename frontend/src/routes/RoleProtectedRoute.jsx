import { Navigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

const RoleProtectedRoute = ({
  children,
  allowedRoles,
}) => {
  const { user } = useAuth();

  // NOT LOGGED IN
  if (!user) {
    return <Navigate to="/login" />;
  }

  // ROLE NOT ALLOWED
  if (
    !allowedRoles.includes(user.role)
  ) {
    return (
      <Navigate to="/dashboard" />
    );
  }

  // ACCESS ALLOWED
  return children;
};

export default RoleProtectedRoute;