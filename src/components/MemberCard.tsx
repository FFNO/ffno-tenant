import { contactRecordAtom, currentMemberAtom } from '@/app';
import { IMemberResDto, memberRoleRecord } from '@/libs';
import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Snippet,
} from '@nextui-org/react';
import { useNavigate } from '@tanstack/react-router';
import { useAtomValue, useSetAtom } from 'jotai';

interface Props extends IMemberResDto {}

function MemberCard(props: Props) {
  const navigate = useNavigate();
  const currentMember = useAtomValue(currentMemberAtom);
  const setContactRecord = useSetAtom(contactRecordAtom);

  return (
    <Card className="w-[400px]">
      <CardHeader className="justify-between">
        <div className="flex gap-4">
          <Avatar isBordered radius="full" size="md" src={props.imgUrl} />
          <div className="flex flex-col gap-1 items-start justify-center">
            <h4 className="text-small font-semibold leading-none text-default-600">
              {props.name}
            </h4>
            <h5 className="text-small tracking-tight text-default-400">
              {memberRoleRecord[props.role]}
            </h5>
          </div>
        </div>
        <Button
          color="primary"
          onPress={() => {
            setContactRecord((prev) => ({ ...prev, [props.id]: props }));
            const channelId = [props.id, currentMember.id].sort().join('_');
            navigate({ to: '/chat/$channelId', params: { channelId } });
          }}
        >
          Contact
        </Button>
      </CardHeader>
      <CardBody className="px-3 text-foreground">
        <p className="mb-1">Phone number</p>
        <Snippet hideSymbol variant="bordered">
          {props.phone}
        </Snippet>
      </CardBody>
      <CardFooter>
        <div className="flex flex-col w-full">
          <p className="mb-1">Email</p>
          <Snippet hideSymbol variant="bordered">
            {props.email}
          </Snippet>
        </div>
      </CardFooter>
    </Card>
  );
}

export default MemberCard;
