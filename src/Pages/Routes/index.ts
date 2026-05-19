import { createBrowserRouter } from "react-router-dom";
import AuthRoute from "./Route.auth";
import { adminRoutes } from "./Route.admin";
import { staffRoutes } from "./Route.staff";
import { ManagerRoutes } from "./Route.manager";

const managerRoutes = {
  ...ManagerRoutes,
  path: "/manager",
};

const staffRoute = {
  ...staffRoutes,
  path: "/staff",
};

const accountantRoutes = {
  ...adminRoutes,
  path: "/accountant",
};

export const router = createBrowserRouter([
  ...AuthRoute,
  adminRoutes,
  managerRoutes,
  staffRoute,
  accountantRoutes,
]);
