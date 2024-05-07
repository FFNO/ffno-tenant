import { IMessageResDto } from '@/libs';
import { useEffect, useRef } from 'react';
import { Message } from './Message';

interface Props {
  items: IMessageResDto[];
}

export const Messages = ({ items }: Props) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [items]);

  return (
    <div>
      {items.map((message) => (
        <Message key={message.id} {...message} />
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};
