import { CHAT_PATTERNS, IMessageResDto } from '@/libs';
import { socketService } from '@/services/socket';
import { useRouter } from '@tanstack/react-router';
import { useEffect, useRef } from 'react';
import { Message } from './Message';

interface Props {
  channelId: string;
  items: IMessageResDto[];
}

export const Messages = ({ channelId, items }: Props) => {
  const router = useRouter();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [items]);

  useEffect(() => {
    socketService.socket.on(
      `${CHAT_PATTERNS.RECEIVE_MESSAGE}${channelId}`,
      () => {
        router.invalidate();
      },
    );

    return () => {
      console.log(channelId);

      socketService.socket.off(`${CHAT_PATTERNS.RECEIVE_MESSAGE}${channelId}`);
    };
  }, [channelId]);

  return (
    <div className="flex flex-col-reverse gap-2">
      <div ref={messagesEndRef} />
      {items.map((message) => (
        <Message key={message.id} {...message} />
      ))}
    </div>
  );
};
