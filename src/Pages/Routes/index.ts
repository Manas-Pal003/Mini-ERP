import { createBrowserRouter } from "react-router-dom";
import AuthRoute from "./Route.auth";
import {adminRoutes}  from "./Route.admin";

export const router = createBrowserRouter([
  ...AuthRoute,
  adminRoutes
]);
