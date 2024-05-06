import { dataProvider, useUpdate } from '@/api';
import { memberAtom } from '@/app';
import {
  IRequestResDto,
  RequestStatus,
  requestCategoryRecord,
  requestStatusRecord,
} from '@/libs';
import { Avatar, Button } from '@nextui-org/react';
import { createFileRoute, useRouter } from '@tanstack/react-router';
import dayjs from 'dayjs';
import { Cancel01Icon, Tick01Icon } from 'hugeicons-react';
import { useAtomValue } from 'jotai';

export const Route = createFileRoute('/requests/$id')({
  component: Page,
  loader: ({ params: { id } }) =>
    dataProvider.getOne<IRequestResDto>({ resource: 'requests', id }),
});

function Page() {
  const router = useRouter();
  const data = Route.useLoaderData();
  const currentMember = useAtomValue(memberAtom);

  const mutate = useUpdate({
    resource: `requests/${data.id}`,
    onSuccess: () => router.invalidate(),
  });

  const confirmApprove = () => {};

  const confirmReject = () => {};

  return (
    <div className="flex justify-center">
      <div className="max-w-screen-lg px-6 py-8 flex flex-col gap-4">
        <div className="inline-flex gap-2 text-2xl font-bold">
          <p className="uppercase">[{requestCategoryRecord[data.category]}]</p>
          <p>{data.details}</p>
        </div>
        <div className="flex flex-row items-center gap-1">
          {renderStatus(data.status)}
          <Avatar size={'sm'} src={data.sender.imgUrl} />
          <p className="font-bold">{data.sender.name}</p>
          <p>has requested</p>
          <p className="font-bold">{data.name}</p>
        </div>

        <div className="flex flex-col gap-4">
          {data.receivers.map(({ member, status, updatedAt }) => (
            <div className="" key={member.id}>
              <div className="flex flex-row items-center gap-2">
                <Avatar src={member.imgUrl} />
                <p>{member.name}</p>
                <div className="flex-1" />
                {member.id === currentMember.id &&
                status === RequestStatus.PENDING ? (
                  <>
                    {renderStatus(status)}
                    <Button
                      color="success"
                      startContent={<Tick01Icon size={20} />}
                      onClick={() => confirmApprove()}
                    >
                      Đồng ý
                    </Button>
                    <Button
                      color="danger"
                      startContent={<Cancel01Icon size={20} />}
                      onClick={() => confirmReject()}
                    >
                      Từ chối
                    </Button>
                  </>
                ) : (
                  <>
                    {renderStatus(status)}
                    {dayjs(updatedAt).format('HH:mm:ss DD/MM/YYYY')}
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function renderStatus(status: RequestStatus) {
  return (
    <Button
      disabled
      disableRipple
      color={
        status === RequestStatus.PENDING
          ? 'warning'
          : status === RequestStatus.ACCEPTED
            ? 'success'
            : 'danger'
      }
    >
      {requestStatusRecord[status]}
    </Button>
  );
}
