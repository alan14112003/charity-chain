import { createBrowserRouter } from 'react-router'
import Login from '../components/Auth/Login'
import Register from '../components/Auth/Register'
import Home from '../components/Home'
import ClientLayout from '../layouts/Client'
import ProgramDetail from '@/components/ProgramDetail'
import Charity from '@/components/Charity'
import CharityDetail from '@/components/CharityDetail'
import ManagementLayout from '@/layouts/Management'
import CharityManagement from '@/components/Management/components/Charity'
import CreateCharity from '@/components/Management/components/CreateCharity'
import UpdateCharity from '@/components/Management/components/UpdateCharity'
import ProgramManagement from '@/components/Management/components/Program'
import CreateProgram from '@/components/Management/components/CreateProgram'
import UpdateProgram from '@/components/Management/components/UpdateProgram'
import AboutUs from '@/components/AboutUs'

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
        path: 'about-us',
        Component: AboutUs, // Placeholder for About Us page
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
  {
    Component: ManagementLayout,
    path: 'management',
    children: [
      {
        path: 'charities',
        children: [
          {
            index: true,
            Component: CharityManagement,
          },
          {
            path: 'create',
            Component: CreateCharity,
          },
          {
            path: ':charityId',
            Component: UpdateCharity,
          },
        ],
      },
      {
        path: 'programs',
        children: [
          {
            index: true,
            Component: ProgramManagement,
          },
          {
            path: 'create',
            Component: CreateProgram,
          },
          {
            path: ':programId',
            Component: UpdateProgram,
          },
        ],
      },
    ],
  },
])
export default router
