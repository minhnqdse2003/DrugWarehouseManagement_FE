import { SignUpForm } from '@/features/auth'
import { RouteObject } from 'react-router'
import ProtectedRoutesWrapper from './protected-routes-wrapper'

export const privateRoutes: RouteObject[] = [
  {
    element: <ProtectedRoutesWrapper allowedRole={['Admin', 'User']} />,
    children: [
      {
        path: '/sign-up',
        element: <SignUpForm />,
      },
    ],
  },
]
