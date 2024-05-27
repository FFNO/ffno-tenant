import { dataProvider, useCreate, useUpdate } from '@/api';
import { currentMemberAtom } from '@/app';
import {
  ContractStatus,
  DATE_FORMAT,
  IContractResDto,
  IMemberResDto,
  RequestCategory,
  RequestStatus,
  contractStatusRecord,
  requestStatusRecord,
} from '@/libs';
import { vndFormatter } from '@/libs/helpers';
import {
  Avatar,
  BreadcrumbItem,
  Breadcrumbs,
  Button,
  Card,
  Chip,
} from '@nextui-org/react';
import {
  Link,
  createFileRoute,
  useLoaderData,
  useRouter,
} from '@tanstack/react-router';
import dayjs from 'dayjs';
import { Cancel01Icon, Link02Icon, Tick01Icon } from 'hugeicons-react';
import { useAtomValue } from 'jotai';

export const Route = createFileRoute('/contracts/$id')({
  component: Page,
  loader: ({ params: { id } }) =>
    dataProvider.getOne<IContractResDto>({ id, resource: 'contracts' }),
});

function Page() {
  const router = useRouter();

  const currentMember = useAtomValue(currentMemberAtom);
  const {
    id,
    price,
    deposit,
    status,
    startDate,
    endDate,
    // imgUrls,
    terminationDate,
    landlord,
    landlordStatus,
    tenant,
    tenantStatus,
    unit,
    requests,
  } = useLoaderData({ from: '/contracts/$id' });
  const mutateContract = useUpdate({
    resource: `contracts/${id}`,
    onSuccess: () => router.invalidate(),
  });

  const mutateRequest = useCreate({
    resource: `requests`,
    onSuccess: () => {
      router.invalidate();
    },
  });

  const confirmApprove = () => {
    mutateContract.mutate({ status: RequestStatus.ACCEPTED });
  };

  const rejectApprove = () => {
    mutateContract.mutate({ status: RequestStatus.REJECTED });
  };

  const terminateContract = () => {
    mutateRequest.mutate({
      name: `Terminate contract #${id}`,
      description: `${currentMember.name} requested to terminate contract #${id}`,
      contractId: id,
      category: RequestCategory.TERMINATE_CONTRACT,
    });
  };

  return (
    <div className="px-40 py-10">
      <div className="flex flex-col gap-4">
        <Breadcrumbs>
          <BreadcrumbItem>
            <Link to="/">Home</Link>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <Link to="/contracts">Contracts</Link>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <Link to="/contracts/$id" params={{ id: id.toString() }}>
              #{id}
            </Link>
          </BreadcrumbItem>
        </Breadcrumbs>
        <div className="inline-flex items-center gap-4">
          <h3 className="text-lg font-semibold">Unit lease contract</h3>
          <div className="inline-flex items-center gap-2">
            <Chip>{contractStatusRecord[status]}</Chip>
          </div>
          <span className="flex-1" />
          {status === ContractStatus.ACTIVE && (
            <Button
              disabled={!!requests.length}
              color="danger"
              onClick={() => terminateContract()}
            >
              Terminate contract
            </Button>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <div className="inline-flex items-center gap-2">
            <p className="font-semibold">Start date:</p>
            <p>{dayjs(startDate).format(DATE_FORMAT)}</p>
          </div>
          <div className="inline-flex items-center gap-2">
            <p className="font-semibold">End date:</p>
            <p>{dayjs(endDate).format(DATE_FORMAT)}</p>
          </div>
          <div className="inline-flex items-center gap-2">
            <p className="font-semibold">Termination date:</p>
            <p>
              {terminationDate
                ? dayjs(terminationDate).format(DATE_FORMAT)
                : '-'}
            </p>
          </div>
          <div className="inline-flex items-center gap-2">
            <p className="font-semibold">Price:</p>
            <p>{vndFormatter.format(price)}/month</p>
          </div>
          <div className="inline-flex items-center gap-2">
            <p className="font-semibold">Deposit:</p>
            <p>{vndFormatter.format(deposit)}/month</p>
          </div>
          <div>
            <div className="inline-flex items-center gap-2">
              <p className="font-semibold">Unit: </p>
              <p>
                {unit.name} - {unit.property.name}
              </p>
              <Link to="/units/$id" params={{ id: unit.id }}>
                <Button isIconOnly variant="light">
                  <Link02Icon size={16} />
                </Button>
              </Link>
            </div>
          </div>
        </div>
        {/*  */}
        <div className="grid grid-cols-2 gap-4">
          <MemberCard {...landlord} status={landlordStatus} />
          <MemberCard {...tenant} status={tenantStatus} />
        </div>
        {/* <Carousel
            slideSize="70%"
            height={200}
            slideGap="md"
            loop
            dragFree
            withIndicators
          >
            {imgUrls.map((imgUrl) => (
              <Carousel.Slide key={imgUrl}>
                <Image src={imgUrl} />
              </Carousel.Slide>
            ))}
          </Carousel> */}
      </div>
    </div>
  );

  function MemberCard(props: IMemberResDto & { status: RequestStatus }) {
    return (
      <div>
        <Card>
          <div className="p-4 inline-flex items-center gap-2">
            <Avatar src={props.imgUrl} />
            <div>{props.name}</div>
            <div className="flex-1" />
            {props.id === currentMember.id &&
            props.status === RequestStatus.PENDING ? (
              <>
                <Button
                  color={'success'}
                  startContent={<Tick01Icon size={20} />}
                  onClick={() => confirmApprove()}
                >
                  Approve
                </Button>
                <Button
                  color={'danger'}
                  startContent={<Cancel01Icon size={20} />}
                  onClick={() => rejectApprove()}
                >
                  Reject
                </Button>
              </>
            ) : (
              <>
                <Chip>{requestStatusRecord[props.status]}</Chip>
              </>
            )}
          </div>
        </Card>
      </div>
    );
  }
}
