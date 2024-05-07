import { Sidebar } from '@/components/chat/Sidebar';
import { Outlet, createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/chat')({
  component: () => (
    <div className="flex flex-row h-[calc(100vh-121px)]">
      <Sidebar />
      <Outlet />
    </div>
  ),
});
