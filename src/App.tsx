import { RouterProvider } from "react-router-dom"
import { router } from "./Pages/Routes"
import { Toaster } from "./components/ui/sonner"

const App = () => {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster
        position="top-center"
        richColors
        closeButton
      />
    </>
  )
}

export default App