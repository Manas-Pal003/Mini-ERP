import { type RouteObject } from "react-router-dom"
import Dashboardlayout from "@/Layouts/DashboardLayout"

const ManagerRoute: RouteObject[] =[{
  
  path: '/dashboard',
  element: <Dashboardlayout />, 

  children: [
    
  ]
}    
] 


export default ManagerRoute