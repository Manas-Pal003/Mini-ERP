import DashboardLayout from "@/Layouts/DashboardLayout";

import Dashboard from "@/Pages/Admin/AdminDashboard";
import Users from "@/Pages/Users/Users";
import Products from "@/Pages/Products/Products";
import Invoices from "@/Pages/Invoices/Invoices";
import Expenses from "@/Pages/Expenses/Expenses";
import Settings from "@/Pages/Settings/Settings";
import AuditLogs from "@/Pages/AuditLogs/AuditLogs";
import { Navigate } from "react-router-dom";

export const adminRoutes = {
  path: "/admin",
  element: <DashboardLayout />,
  children: [
    {
      index: true,
      element: <Navigate to="dashboard" replace />,
    },
    {
      path: "dashboard",
      element: <Dashboard />,
    },

    {
      path: "users",
      element: <Users />,
    },
    {
      path: "users/admins",
      element: <Users />,
    },
    {
      path: "users/staffs",
      element: <Users />,
    },
    {
      path: "users/accountants",
      element: <Users />,
    },
    {
      path: "users/managers",
      element: <Users />,
    },

    {
      path: "products",
      element: <Products />,
    },
    {
      path: "invoices",
      element: <Invoices />,
    },
    {
      path: "expenses",
      element: <Expenses />,
    },
    {
      path: "settings",
      element: <Settings />,
    },
    {
      path: "audit-logs",
      element: <AuditLogs />,
    },
  ],
};