import { CHAT_PATTERNS, IMessageResDto } from '@/libs';
import { socketService } from '@/services/socket';
import { useRouter } from '@tanstack/react-router';
import { useEffect, useRef } from 'react';
import { ChatMessage } from './ChatMessage';

interface Props {
  channelId: string;
  items: IMessageResDto[];
}

export const ChatMessages = ({ channelId, items }: Props) => {
  const router = useRouter();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [items]);

  useEffect(() => {
    socketService.subscribeTo(
      `${CHAT_PATTERNS.RECEIVE_MESSAGE}${channelId}`,
      () => router.invalidate(),
    );

    return () => {
      socketService.unsubscribeTo(
        `${CHAT_PATTERNS.RECEIVE_MESSAGE}${channelId}`,
      );
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [channelId]);

  return (
    <div className="flex flex-col-reverse gap-2 py-2">
      <div ref={messagesEndRef} />
      {items.map((message) => (
        <ChatMessage key={message.id} {...message} />
      ))}
    </div>
  );
};
