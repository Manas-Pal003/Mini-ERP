import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute({role}: {role: string}) {
  const token = localStorage.getItem("authToken");
  const user:any = localStorage.getItem("currentUser");
  const userRole = JSON.parse(user).role;


  if (!token) {
    localStorage.clear();
    return <Navigate to="/login" replace />;
  }

  if(userRole !== role) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
}