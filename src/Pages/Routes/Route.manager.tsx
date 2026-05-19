
import ProtectedRoute from "@/Pages/Routes/ProtectedRoute";

import ManagerDashboard from "@/Pages/Manager/ManagerDashboard";
import ManagerInvoices from "@/Pages/Manager/ManagerInvoices";
import ManagerLayout from "@/Layouts/ManagerLayout";
export const ManagerRoutes = {
  path: "/manager",
  element: <ProtectedRoute role="Manager" />,
  children: [
    {
        
      element: <ManagerLayout />,
      children: [
        {
          path: "dashboard",
          element: <ManagerDashboard />,
        },
        {
          path: "invoices",
          element: <ManagerInvoices />,
        },
       
      ],
    },
  ],
};