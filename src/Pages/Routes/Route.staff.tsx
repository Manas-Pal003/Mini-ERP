import DashboardLayout from "@/Layouts/DashboardLayout";
import ProtectedRoute from "@/Pages/Routes/ProtectedRoute";

import StaffDashboard from "@/Pages/Staff/StaffDashboard";
import StaffInvoices from "@/Pages/Staff/StaffInvoices";
import StaffExpenses from "../Staff/StaffExpenses";
export const staffRoutes = {
  path: "/staff",
  element: <ProtectedRoute role="Staff" />,
  children: [
    {
        
      element: <DashboardLayout />,
      children: [
        {
          path: "dashboard",
          element: <StaffDashboard />,
        },
        {
          path: "invoices",
          element: <StaffInvoices />,
        },
        {
          path: "expenses",
          element: <StaffExpenses />,
        },
      ],
    },
  ],
};