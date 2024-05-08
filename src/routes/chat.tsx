import { memberAtom } from '@/app';
import { Sidebar } from '@/components/chat/Sidebar';
import { socketService } from '@/services/socket';
import { Outlet, createFileRoute } from '@tanstack/react-router';
import { useAtomValue } from 'jotai';
import { useEffect } from 'react';

export const Route = createFileRoute('/chat')({
  component: ChatLayout,
});

function ChatLayout() {
  const member = useAtomValue(memberAtom);

  useEffect(() => {
    socketService.connect();
    return () => socketService.disconnect();
  }, [member.id]);

  return (
    <div className="flex flex-row h-[calc(100vh-121px)]">
      <Sidebar />
      <Outlet />
    </div>
  );
}
