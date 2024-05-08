import { memberAtom } from '@/app';
import { memberRoleRecord } from '@/libs';
import { MemberResDto } from '@/types';
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
import { useAtomValue } from 'jotai';

interface Props extends MemberResDto {}

function MemberCard(props: Props) {
  const navigate = useNavigate();
  const currentMember = useAtomValue(memberAtom);

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
          onPress={() =>
            navigate({
              to: '/chat/$channelId',
              params: {
                channelId: [props.id, currentMember.id].sort().join('_'),
              },
            })
          }
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
