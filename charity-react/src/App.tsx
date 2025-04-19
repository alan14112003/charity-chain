import { QueryClientProvider } from "@tanstack/react-query"
import queryClient from "./config/reactQuery"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { RouterProvider } from "react-router"
import router from "./config/reactRouter"
import { AuthProvider } from "./providers/AuthProvider"
import { Provider as StoreProvider } from "react-redux"
import { store } from "./store/app"
import { ToastContainer } from "react-toastify"

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <StoreProvider store={store}>
      <AuthProvider>
       <RouterProvider router={router} /> 
        <ToastContainer />
       <ReactQueryDevtools initialIsOpen={false} />
      </AuthProvider>
      </StoreProvider>
    </QueryClientProvider>  
  )
}

export default App
