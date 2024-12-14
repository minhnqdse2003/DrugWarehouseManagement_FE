import React from 'react'
import { publicRoutes } from './public-routes'
import { privateRoutes } from './private-routes'
import { RouteObject, useRoutes } from 'react-router'

export const AppRoutes: React.FC = () => {
  const routes: RouteObject[] = [...publicRoutes, ...privateRoutes]
  return useRoutes(routes)
}
