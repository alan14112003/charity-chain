import { createBrowserRouter } from 'react-router'
import Login from '../components/Auth/Login'
import Register from '../components/Auth/Register'
import Home from '../components/Home'
import ClientLayout from '../layouts/Client'
import ProgramDetail from '@/components/ProgramDetail'
import Charity from '@/components/Charity'
import CharityDetail from '@/components/CharityDetail'

const router = createBrowserRouter([
  {
    Component: ClientLayout,
    children: [
      { index: true, Component: Home },
      {
        path: '/programs/:programId',
        Component: ProgramDetail,
      },
      {
        path: '/charities',
        Component: Charity,
      },
      {
        path: '/charities/:charityId',
        Component: CharityDetail,
      },
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
