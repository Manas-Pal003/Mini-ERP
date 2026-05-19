import { type RouteObject } from "react-router-dom"
import Login from "../Auth/Login"
import Register from "../Auth/Register"
import NotFound from "../Auth/Notfoundpage"
import Unauthorized from "../Auth/Unauthorized"
const AuthRoute: RouteObject[] =[{
  
  path: '/',
  element: <Login />,
},
{
  
  path: '/login',
  element: <Login />,
},
{
  
  path: '/register',
  element: <Register />,
},

{
  
  path: '/unauthorized',
  element: <Unauthorized />,
},
{
    path: "*",
    element: <NotFound />,
  },   
] 

export default AuthRoute