import { Navigate, type RouteObject } from "react-router-dom"

const AuthRoute: RouteObject = {
  path: '/',
  element: <Navigate to='/login' />,
}

export default AuthRoute