import { socketService } from '@/services/socket';
import { Button, Input } from '@nextui-org/react';
import {
  Image01Icon,
  MailSend01Icon,
  Mic01Icon,
  SentIcon,
} from 'hugeicons-react';
import { useState } from 'react';

interface Props {
  channelId: string;
}

export const ChatInput = ({ channelId }: Props) => {
  const [message, setMessage] = useState('');

  const handleSendMessage = async () => {
    if (message !== '') {
      socketService.sendMessage({
        channelId,
        content: message,
      });
      setMessage('');
    }
  };
  return (
    <div className="px-4 py-3 flex flex-row items-center gap-1 border-t">
      <Button isIconOnly variant="bordered" onPress={handleSendMessage}>
        <Image01Icon size={16} />
      </Button>
      <Button isIconOnly variant="bordered" onPress={handleSendMessage}>
        <Mic01Icon size={16} />
      </Button>
      <Input
        value={message}
        onValueChange={(msg) => setMessage(msg)}
        onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
        fullWidth
        variant="bordered"
      />
      <Button
        isIconOnly
        color="primary"
        variant="solid"
        onPress={handleSendMessage}
      >
        <SentIcon size={16} />
      </Button>
    </div>
  );
};
