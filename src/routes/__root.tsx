import AppFooter from '@/components/AppFooter';
import AppNavbar from '@/components/AppNavbar';
import {
  Outlet,
  createRootRoute,
  useRouterState,
} from '@tanstack/react-router';

export const Route = createRootRoute({
  component: () => <RootRoute />,
});

function RootRoute() {
  const router = useRouterState();

  if (isAuthRoute(router.location.pathname)) {
    return <Outlet />;
  }

  return (
    <div className="light text-foreground">
      <AppNavbar />
      <div className="flex flex-col w-full min-h-[calc(100vh-121px)]">
        <Outlet />
      </div>
      <AppFooter />
    </div>
  );
}

function isAuthRoute(path: string) {
  return path.startsWith('/auth');
}
