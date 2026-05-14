import DashboardLayout from "@/Layouts/DashboardLayout";

import Dashboard from "@/Pages/Dashboard";
import Users from "@/Pages/Users/Users";
import Products from "@/Pages/Products/Products";
import Invoices from "@/Pages/Invoices/Invoices";
import Expenses from "@/Pages/Expenses/Expenses";
import Settings from "@/Pages/Settings/Settings";

export const adminRoutes = {
  path: "/admin",
  element: <DashboardLayout />,
  children: [
    {
      path: "dashboard",
      element: <Dashboard />,
    },
    {
      path: "users",
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
  ],
};