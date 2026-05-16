import { type RouteObject } from "react-router-dom"
import Login from "../Auth/Login"
import Register from "../Auth/Register"

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
}    
] 

export default AuthRoute