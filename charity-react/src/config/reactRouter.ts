import { createBrowserRouter } from 'react-router'
import Login from '../components/Auth/Login'
import Register from '../components/Auth/Register'
import Home from '../components/Home'
import ClientLayout from '../layouts/Client'

const router = createBrowserRouter([
  {
    Component: ClientLayout,
    children: [
      { path: '/', Component: Home },
      {
        path: 'login',
        Component: Login,
      },
      {
        path: 'register',
        Component: Register,
      },
    ],
  },
])
export default router
