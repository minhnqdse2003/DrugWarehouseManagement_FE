import Layout from "@/layout";
import React from "react";
import { Navigate, Outlet } from "react-router";

interface ProtectedRouteProps {
  allowedRole: string[];
}

const ProtectedRoutesWrapper: React.FC<ProtectedRouteProps> = ({
  allowedRole = [],
}) => {
  const userRole = "Organizer";

  if (!allowedRole.includes(userRole)) {
    return <Navigate to="/" replace />;
  }

  return (
    <Layout>
      <Outlet />
    </Layout>
  );
};

export default ProtectedRoutesWrapper;
