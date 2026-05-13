import { type RouteObject } from "react-router-dom"
import Login from "../Auth/Login"

const AuthRoute: RouteObject = {
  path: '/',
  element: <Login />,
}

export default AuthRoute