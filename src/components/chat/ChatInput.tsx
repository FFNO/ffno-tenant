import { memberAtom } from '@/app';
import { Button, Input } from '@nextui-org/react';
import { Image01Icon, MailSend01Icon, Mic01Icon } from 'hugeicons-react';
import { useAtomValue } from 'jotai';
import { useState } from 'react';

export const ChatInput = () => {
  const member = useAtomValue(memberAtom);
  const [message, setMessage] = useState('');

  const handleSendMessage = async () => {
    if (message !== '') {
      //   socket?.send(
      //     JSON.stringify({
      //       user: {
      //         id: member?.id,
      //       },
      //       text: message,
      //       date: Date.now(),
      //     })
      //   );
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
        <MailSend01Icon size={16} />
      </Button>
    </div>
  );
};
