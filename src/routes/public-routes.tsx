import React from 'react'
import { RouteObject } from 'react-router'
import PublicRoutesWrapper from './public-routes-wrapper'

const Login = React.lazy(() =>
  import('@features/auth/components/login-form.component').then(module => ({
    default: module.LoginForm,
  })),
)

export const publicRoutes: RouteObject[] = [
  {
    element: <PublicRoutesWrapper />,
    children: [{ path: '/', element: <Login /> }],
  },
]
