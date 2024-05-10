import { dataProvider } from '@/api';
import { channelRecordAtom, contactRecordAtom, memberAtom } from '@/app';
import { ChatInput } from '@/components/chat/ChatInput';
import { Messages } from '@/components/chat/Messages';
import { IGetListMessageResDto } from '@/libs';
import { Avatar, Button, ButtonGroup } from '@nextui-org/react';
import { createFileRoute } from '@tanstack/react-router';
import { AiPhone01Icon, UserIcon, Video01Icon } from 'hugeicons-react';
import { useAtomValue } from 'jotai';
import { useMemo } from 'react';

export const Route = createFileRoute('/chat/$channelId')({
  component: Page,
  loader: ({ params: { channelId } }) =>
    dataProvider.getOne<IGetListMessageResDto>({
      resource: 'chat/channels',
      id: channelId,
    }),
});

function Page() {
  const data = Route.useLoaderData();
  const currentMember = useAtomValue(memberAtom);
  const contactRecord = useAtomValue(contactRecordAtom);
  const channelRecord = useAtomValue(channelRecordAtom);

  const member = useMemo(() => {
    if (!data.channelId) {
      return null;
    }

    const memberId = data.channelId
      .replace(currentMember.id, '')
      .replace('_', '');

    console.log(memberId);
    console.log(contactRecord);

    return contactRecord[memberId] ?? channelRecord[data.channelId] ?? null;
  }, [data.channelId, currentMember.id, contactRecord, channelRecord]);

  return (
    <div className="flex flex-col w-full">
      <div className="flex items-center gap-2 px-4 py-2 border-b">
        <Avatar src={member?.imgUrl} />
        <p className="font-bold text-lg">{member?.name}</p>
        <span className="flex-1" />
        <ButtonGroup variant="light" radius="sm">
          <Button isIconOnly>
            <Video01Icon size={20} strokeWidth={1.75} />
          </Button>
          <Button isIconOnly>
            <AiPhone01Icon size={20} strokeWidth={1.75} />
          </Button>
          <Button isIconOnly>
            <UserIcon size={20} strokeWidth={1.75} />
          </Button>
        </ButtonGroup>
      </div>
      <div className="h-full flex flex-col overflow-auto">
        {data.messages && (
          <Messages channelId={data.channelId} items={data.messages} />
        )}
      </div>
      <ChatInput channelId={data.channelId} />
    </div>
  );
}
