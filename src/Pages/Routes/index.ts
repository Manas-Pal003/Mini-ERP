import { createBrowserRouter } from "react-router-dom";
import AuthRoute from "./Route.auth";
import { adminRoutes } from "./Route.admin";

const managerRoutes = {
  ...adminRoutes,
  path: "/manager",
};

const staffRoutes = {
  ...adminRoutes,
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
  staffRoutes,
  accountantRoutes,
]);
