import { QueryClientProvider } from "@tanstack/react-query"
import queryClient from "./config/reactQuery"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { RouterProvider } from "react-router"
import router from "./config/reactRouter"

function App() {
  return (
    <QueryClientProvider client={queryClient}>
       <RouterProvider router={router} /> 
       <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>  
  )
}

export default App
