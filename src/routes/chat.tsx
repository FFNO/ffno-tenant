import { currentMemberAtom } from '@/app';
import { ChatSidebar } from '@/components/chat/ChatSidebar';
import { socketService } from '@/services/socket';
import { Outlet, createFileRoute } from '@tanstack/react-router';
import { useAtomValue } from 'jotai';
import { useEffect } from 'react';

export const Route = createFileRoute('/chat')({
  component: ChatLayout,
});

function ChatLayout() {
  const member = useAtomValue(currentMemberAtom);

  useEffect(() => {
    socketService.connect();
    return () => socketService.disconnect();
  }, [member.id]);

  useEffect(() => {
    const i = setInterval(() => {
      socketService.ping();
    }, 5000);

    return () => clearInterval(i);
  }, []);

  return (
    <div className="flex flex-row h-[calc(100vh-121px)]">
      <ChatSidebar />
      <Outlet />
    </div>
  );
}
