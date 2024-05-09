import { useList } from '@/api';
import { contactAtom, memberAtom } from '@/app';
import { IMemberResDto } from '@/libs';
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

export const Sidebar = () => {
  const navigate = useNavigate();
  const currentMember = useAtomValue(memberAtom);
  const { data } = useList<IMemberResDto>({
    resource: 'members/contacts',
  });
  const [contact, setContact] = useAtom(contactAtom);

  useEffect(() => {
    if (data && !Object.keys(contact).length) {
      const record: Record<string, IMemberResDto> = {};
      record[currentMember.id] = currentMember;

      data.data.forEach((member) => {
        record[member.id] = member;
      });

      setContact(record);
    }
    return () => {};
  }, [data]);

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
          defaultExpandedKeys={['pinned']}
        >
          <AccordionItem key={'pinned'} title={'Pinned'}>
            {data?.data.map((member) => (
              <Button
                key={member.id}
                fullWidth
                variant={'light'}
                size="lg"
                className="px-3 justify-start"
                onClick={() =>
                  navigate({
                    to: '/chat/$channelId',
                    params: {
                      channelId: [member.id, currentMember.id].sort().join('_'),
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
                  <Avatar size="sm" src={member.imgUrl} />
                </Badge>
                <span className="text-sm flex-1 max-w-[160px] overflow-hidden">
                  <p className="text-start text-ellipsis">{member.name}</p>
                </span>
              </Button>
            ))}
          </AccordionItem>
          <AccordionItem title={'Recent'}>
            {data?.data.map((member) => (
              <Button
                key={member.id}
                fullWidth
                variant={'light'}
                size="lg"
                className="px-3 justify-start"
              >
                <Badge
                  content=""
                  color="success"
                  shape="circle"
                  placement="bottom-right"
                >
                  <Avatar size="sm" src={member.imgUrl} />
                </Badge>
                <span className="text-sm flex-1 max-w-[160px] overflow-hidden">
                  <p className="text-start text-ellipsis">{member.name}</p>
                </span>
              </Button>
            ))}
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};
