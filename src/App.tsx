import { RouterProvider } from "react-router-dom"
import { router } from "./Pages/Routes"
import { Toaster } from "./components/ui/sonner"
import { ThemeProvider } from "./components/theme-provider"

const App = () => {
  return (
    <ThemeProvider defaultTheme="light" storageKey="erp-ui-theme">
      <RouterProvider router={router} />
      <Toaster
        position="top-center"
        richColors
        closeButton
      />
    </ThemeProvider>
  )
}

export default App