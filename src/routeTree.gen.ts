/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as ChatImport } from './routes/chat'
import { Route as IndexImport } from './routes/index'
import { Route as RequestsIndexImport } from './routes/requests/index'
import { Route as PropertiesIndexImport } from './routes/properties/index'
import { Route as InvoicesIndexImport } from './routes/invoices/index'
import { Route as ContractsIndexImport } from './routes/contracts/index'
import { Route as ChatIndexImport } from './routes/chat/index'
import { Route as UnitsIdImport } from './routes/units/$id'
import { Route as RequestsIdImport } from './routes/requests/$id'
import { Route as PropertiesIdImport } from './routes/properties/$id'
import { Route as ContractsIdImport } from './routes/contracts/$id'
import { Route as ChatIdImport } from './routes/chat/$id'
import { Route as AuthSignUpImport } from './routes/auth/sign-up'
import { Route as AuthSignInImport } from './routes/auth/sign-in'
import { Route as InvoicesIdIndexImport } from './routes/invoices/$id/index'

// Create/Update Routes

const ChatRoute = ChatImport.update({
  path: '/chat',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const RequestsIndexRoute = RequestsIndexImport.update({
  path: '/requests/',
  getParentRoute: () => rootRoute,
} as any)

const PropertiesIndexRoute = PropertiesIndexImport.update({
  path: '/properties/',
  getParentRoute: () => rootRoute,
} as any)

const InvoicesIndexRoute = InvoicesIndexImport.update({
  path: '/invoices/',
  getParentRoute: () => rootRoute,
} as any)

const ContractsIndexRoute = ContractsIndexImport.update({
  path: '/contracts/',
  getParentRoute: () => rootRoute,
} as any)

const ChatIndexRoute = ChatIndexImport.update({
  path: '/',
  getParentRoute: () => ChatRoute,
} as any)

const UnitsIdRoute = UnitsIdImport.update({
  path: '/units/$id',
  getParentRoute: () => rootRoute,
} as any)

const RequestsIdRoute = RequestsIdImport.update({
  path: '/requests/$id',
  getParentRoute: () => rootRoute,
} as any)

const PropertiesIdRoute = PropertiesIdImport.update({
  path: '/properties/$id',
  getParentRoute: () => rootRoute,
} as any)

const ContractsIdRoute = ContractsIdImport.update({
  path: '/contracts/$id',
  getParentRoute: () => rootRoute,
} as any)

const ChatIdRoute = ChatIdImport.update({
  path: '/$id',
  getParentRoute: () => ChatRoute,
} as any)

const AuthSignUpRoute = AuthSignUpImport.update({
  path: '/auth/sign-up',
  getParentRoute: () => rootRoute,
} as any)

const AuthSignInRoute = AuthSignInImport.update({
  path: '/auth/sign-in',
  getParentRoute: () => rootRoute,
} as any)

const InvoicesIdIndexRoute = InvoicesIdIndexImport.update({
  path: '/invoices/$id/',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/chat': {
      preLoaderRoute: typeof ChatImport
      parentRoute: typeof rootRoute
    }
    '/auth/sign-in': {
      preLoaderRoute: typeof AuthSignInImport
      parentRoute: typeof rootRoute
    }
    '/auth/sign-up': {
      preLoaderRoute: typeof AuthSignUpImport
      parentRoute: typeof rootRoute
    }
    '/chat/$id': {
      preLoaderRoute: typeof ChatIdImport
      parentRoute: typeof ChatImport
    }
    '/contracts/$id': {
      preLoaderRoute: typeof ContractsIdImport
      parentRoute: typeof rootRoute
    }
    '/properties/$id': {
      preLoaderRoute: typeof PropertiesIdImport
      parentRoute: typeof rootRoute
    }
    '/requests/$id': {
      preLoaderRoute: typeof RequestsIdImport
      parentRoute: typeof rootRoute
    }
    '/units/$id': {
      preLoaderRoute: typeof UnitsIdImport
      parentRoute: typeof rootRoute
    }
    '/chat/': {
      preLoaderRoute: typeof ChatIndexImport
      parentRoute: typeof ChatImport
    }
    '/contracts/': {
      preLoaderRoute: typeof ContractsIndexImport
      parentRoute: typeof rootRoute
    }
    '/invoices/': {
      preLoaderRoute: typeof InvoicesIndexImport
      parentRoute: typeof rootRoute
    }
    '/properties/': {
      preLoaderRoute: typeof PropertiesIndexImport
      parentRoute: typeof rootRoute
    }
    '/requests/': {
      preLoaderRoute: typeof RequestsIndexImport
      parentRoute: typeof rootRoute
    }
    '/invoices/$id/': {
      preLoaderRoute: typeof InvoicesIdIndexImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren([
  IndexRoute,
  ChatRoute.addChildren([ChatIdRoute, ChatIndexRoute]),
  AuthSignInRoute,
  AuthSignUpRoute,
  ContractsIdRoute,
  PropertiesIdRoute,
  RequestsIdRoute,
  UnitsIdRoute,
  ContractsIndexRoute,
  InvoicesIndexRoute,
  PropertiesIndexRoute,
  RequestsIndexRoute,
  InvoicesIdIndexRoute,
])

/* prettier-ignore-end */
