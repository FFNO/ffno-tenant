import { useList } from '@/api';
import { channelRecordAtom, contactRecordAtom, memberAtom } from '@/app';
import { IChannelDto, IMemberResDto } from '@/libs';
import {
  Accordion,
  AccordionItem,
  Avatar,
  Badge,
  Button,
} from '@nextui-org/react';
import { useNavigate } from '@tanstack/react-router';
import { AddSquareIcon, FilterIcon } from 'hugeicons-react';
import { useAtom, useAtomValue } from 'jotai';
import { useEffect } from 'react';

export const ChatSidebar = () => {
  const navigate = useNavigate();
  const currentMember = useAtomValue(memberAtom);
  const { data: channels } = useList<IChannelDto>({
    resource: 'chat/channels',
  });
  const { data: contacts } = useList<IMemberResDto>({
    resource: 'members/contacts',
  });
  const [contactRecord, setContactRecord] = useAtom(contactRecordAtom);
  const [channelRecord, setChannelRecord] = useAtom(channelRecordAtom);

  useEffect(() => {
    if (
      channels &&
      contacts &&
      (!Object.keys(channelRecord).length || !Object.keys(contactRecord).length)
    ) {
      const tempChannel: Record<string, IChannelDto> = {};
      const tempContact: Record<string, IMemberResDto> = {};

      tempContact[currentMember.id] = currentMember;

      channels.data.forEach((channel) => {
        if (channel.id.length === 73) {
          const contactId = channel.id
            .replace(currentMember.id, '')
            .replace('_', '');
          tempContact[contactId] = {
            id: contactId,
            name: channel.name,
            imgUrl: channel.imgUrl,
          } as IMemberResDto;
        }
        tempChannel[channel.id] = channel;
      });
      contacts.data.forEach((contact) => (tempContact[contact.id] = contact));

      setContactRecord(tempContact);
      setChannelRecord(tempChannel);
    }
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [channels, contacts]);

  return (
    <div className="w-80 h-full border-r overflow-scroll">
      <div className="flex items-center px-4 py-3 border-b">
        <span className="text-xl font-bold">Chat</span>
        <span className="flex-1" />
        <Button isIconOnly variant="light" size="sm">
          <FilterIcon size={16} />
        </Button>
        <Button isIconOnly variant="light" size="sm">
          <AddSquareIcon size={16} />
        </Button>
      </div>
      <div className="flex flex-col py-2">
        <Accordion
          isCompact
          selectionMode="multiple"
          defaultExpandedKeys={['recently']}
        >
          <AccordionItem key={'recently'} title={'Recently'}>
            {channels?.data.map((channel) => (
              <Button
                key={channel.id}
                fullWidth
                variant={'light'}
                size="lg"
                className="px-3 justify-start"
                onClick={() =>
                  navigate({
                    to: '/chat/$channelId',
                    params: {
                      channelId: channel.id,
                    },
                  })
                }
              >
                <Badge
                  content=""
                  color="success"
                  shape="circle"
                  placement="bottom-right"
                >
                  <Avatar size="sm" src={channel.imgUrl} />
                </Badge>
                <span className="text-sm flex-1 max-w-[160px] overflow-hidden">
                  <p className="text-start text-ellipsis">{channel.name}</p>
                </span>
              </Button>
            ))}
          </AccordionItem>
          <AccordionItem key={'contacts'} title={'Contacts'}>
            {contacts?.data.map((contact) => (
              <Button
                key={contact.id}
                fullWidth
                variant={'light'}
                size="lg"
                className="px-3 justify-start"
                onClick={() =>
                  navigate({
                    to: '/chat/$channelId',
                    params: {
                      channelId: [contact.id, currentMember.id]
                        .sort()
                        .join('_'),
                    },
                  })
                }
              >
                <Badge
                  content=""
                  color="success"
                  shape="circle"
                  placement="bottom-right"
                >
                  <Avatar size="sm" src={contact.imgUrl} />
                </Badge>
                <span className="text-sm flex-1 max-w-[160px] overflow-hidden">
                  <p className="text-start text-ellipsis">{contact.name}</p>
                </span>
              </Button>
            ))}
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};
