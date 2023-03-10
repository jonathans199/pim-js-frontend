import { Navigate, useRoutes } from 'react-router-dom'

import AuthGuard from '../auth/AuthGuard'
import GuestGuard from '../auth/GuestGuard'

import CompactLayout from '../layouts/compact'
import DashboardLayout from '../layouts/dashboard'

import { PATH_AFTER_LOGIN } from '../config-global'

import { Page404, PageOne, PageTwo, AllUsers, AddUser, EditUser,  LoginPage, PageThree } from './elements'

export default function Router() {
  return useRoutes([
    {
      path: '/',
      children: [
        { element: <Navigate to={PATH_AFTER_LOGIN} replace />, index: true },
        {
          path: 'login',
          element: (
            <GuestGuard>
              <LoginPage />
            </GuestGuard>
          ),
        },
      ],
    },
    {
      path: '/dashboard',
      element: (
        <AuthGuard>
          <DashboardLayout />
        </AuthGuard>
      ),
      children: [
        { element: <Navigate to={PATH_AFTER_LOGIN} replace />, index: true },
        { path: 'one', element: <PageOne /> },
        { path: 'two', element: <PageTwo /> },
        { path: 'three', element: <PageThree /> },
        {
          path: 'user',
          children: [
            { element: <Navigate to="/dashboard/user/add" replace />, index: true },
            { path: 'all', element: <AllUsers /> },
            { path: 'add', element: <AddUser /> },
            { path: 'edit', element: <EditUser /> },
          ],
        },
      ],
    },
    {
      element: <CompactLayout />,
      children: [{ path: '404', element: <Page404 /> }],
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ])
}
