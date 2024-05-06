/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

// Import Routes

import { Route as rootRoute } from './routes/__root';
import { Route as IndexImport } from './routes/index';
import { Route as RequestsIndexImport } from './routes/requests/index';
import { Route as PropertiesIndexImport } from './routes/properties/index';
import { Route as UnitsIdImport } from './routes/units/$id';
import { Route as RequestsIdImport } from './routes/requests/$id';
import { Route as PropertiesIdImport } from './routes/properties/$id';
import { Route as AuthSignUpImport } from './routes/auth/sign-up';
import { Route as AuthSignInImport } from './routes/auth/sign-in';

// Create/Update Routes

const IndexRoute = IndexImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any);

const RequestsIndexRoute = RequestsIndexImport.update({
  path: '/requests/',
  getParentRoute: () => rootRoute,
} as any);

const PropertiesIndexRoute = PropertiesIndexImport.update({
  path: '/properties/',
  getParentRoute: () => rootRoute,
} as any);

const UnitsIdRoute = UnitsIdImport.update({
  path: '/units/$id',
  getParentRoute: () => rootRoute,
} as any);

const RequestsIdRoute = RequestsIdImport.update({
  path: '/requests/$id',
  getParentRoute: () => rootRoute,
} as any);

const PropertiesIdRoute = PropertiesIdImport.update({
  path: '/properties/$id',
  getParentRoute: () => rootRoute,
} as any);

const AuthSignUpRoute = AuthSignUpImport.update({
  path: '/auth/sign-up',
  getParentRoute: () => rootRoute,
} as any);

const AuthSignInRoute = AuthSignInImport.update({
  path: '/auth/sign-in',
  getParentRoute: () => rootRoute,
} as any);

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      preLoaderRoute: typeof IndexImport;
      parentRoute: typeof rootRoute;
    };
    '/auth/sign-in': {
      preLoaderRoute: typeof AuthSignInImport;
      parentRoute: typeof rootRoute;
    };
    '/auth/sign-up': {
      preLoaderRoute: typeof AuthSignUpImport;
      parentRoute: typeof rootRoute;
    };
    '/properties/$id': {
      preLoaderRoute: typeof PropertiesIdImport;
      parentRoute: typeof rootRoute;
    };
    '/requests/$id': {
      preLoaderRoute: typeof RequestsIdImport;
      parentRoute: typeof rootRoute;
    };
    '/units/$id': {
      preLoaderRoute: typeof UnitsIdImport;
      parentRoute: typeof rootRoute;
    };
    '/properties/': {
      preLoaderRoute: typeof PropertiesIndexImport;
      parentRoute: typeof rootRoute;
    };
    '/requests/': {
      preLoaderRoute: typeof RequestsIndexImport;
      parentRoute: typeof rootRoute;
    };
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren([
  IndexRoute,
  AuthSignInRoute,
  AuthSignUpRoute,
  PropertiesIdRoute,
  RequestsIdRoute,
  UnitsIdRoute,
  PropertiesIndexRoute,
  RequestsIndexRoute,
]);

/* prettier-ignore-end */
