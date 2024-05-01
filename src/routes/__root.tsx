import AppNavbar from "@/components/AppNavbar";
import {
  Outlet,
  createRootRoute,
  useRouterState,
} from "@tanstack/react-router";
import {
  Facebook01Icon,
  InstagramIcon,
  Linkedin01Icon,
  TwitterIcon,
} from "hugeicons-react";

export const Route = createRootRoute({
  component: () => <RootRoute />,
});

function RootRoute() {
  const router = useRouterState();

  if (router.location.pathname.startsWith("/auth")) {
    return <Outlet />;
  }

  return (
    <div className="light text-foreground">
      <AppNavbar />
      <Outlet />
      <div className="flex flex-row justify-between border-t text-default-500 bg-primary-50 px-48 py-4">
        <p>©2024 FFNO. All rights reserved</p>
        <div className="flex flex-row gap-4">
          <Facebook01Icon />
          <InstagramIcon />
          <TwitterIcon />
          <Linkedin01Icon />
        </div>
      </div>
    </div>
  );
}
