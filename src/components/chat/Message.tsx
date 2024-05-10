import { contactRecordAtom, memberAtom } from '@/app';
import { IMessageResDto } from '@/libs';
import { cn } from '@/utils';
import { Avatar, Tooltip } from '@nextui-org/react';
import dayjs from 'dayjs';
import { useAtomValue } from 'jotai';
import { useMemo } from 'react';

interface Props extends IMessageResDto {}

export const Message = (props: Props) => {
  const currentMember = useAtomValue(memberAtom);
  const contactRecord = useAtomValue(contactRecordAtom);

  const isMyself = useMemo(
    () => currentMember.id === props.senderId,
    [currentMember.id, props.senderId],
  );
  return (
    <div className={cn('px-2 flex flex-col', isMyself && 'items-end')}>
      <div className="flex gap-2 items-center">
        {!isMyself && (
          <Tooltip content={contactRecord[props.senderId]?.name}>
            <Avatar src={contactRecord[props.senderId]?.imgUrl} />
          </Tooltip>
        )}
        <Tooltip
          placement="bottom"
          content={dayjs(props.createdAt).from(Date.now())}
        >
          <div
            className={cn(
              'px-3 py-2 rounded-lg ',
              isMyself
                ? 'bg-primary text-primary-foreground'
                : 'bg-primary-100',
            )}
          >
            {props.content}
          </div>
        </Tooltip>
      </div>
    </div>
  );
};
