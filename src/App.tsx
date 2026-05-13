import { RouterProvider } from "react-router-dom"
import { router } from "./Pages/Routes"

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App