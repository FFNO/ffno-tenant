import { dataProvider, useCreate, useUpdate } from '@/api';
import { currentMemberAtom } from '@/app';
import {
  ContractStatus,
  DATE_FORMAT,
  IContractResDto,
  IMemberResDto,
  RequestCategory,
  RequestStatus,
  contractStatusColorRecord,
  contractStatusRecord,
  requestStatusColorRecord,
  requestStatusRecord,
} from '@/libs';
import { vndFormatter } from '@/libs/helpers';
import { Button, Chip } from '@nextui-org/react';
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
    imgUrls,
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
    <Paper px={120} py={'lg'}>
      <Stack gap={'md'}>
        <Group>
          <Title order={3}>Unit lease contract</Title>
          <Group gap={4}>
            <Badge color={contractStatusColorRecord[status]}>
              {contractStatusRecord[status]}
            </Badge>
          </Group>
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
        </Group>
        <Fieldset legend={'Information'}>
          <Stack>
            <Group justify="space-between">
              <Group>
                <p className="font-semibold">Start date:</p>
                <p>{dayjs(startDate).format(DATE_FORMAT)}</p>
              </Group>
              <Group>
                <p className="font-semibold">End date:</p>
                <p>{dayjs(endDate).format(DATE_FORMAT)}</p>
              </Group>
              <Group>
                <p className="font-semibold">Termination date:</p>
                <p>
                  {terminationDate
                    ? dayjs(terminationDate).format(DATE_FORMAT)
                    : '-'}
                </p>
              </Group>
            </Group>
            <Group justify="space-between">
              <Group>
                <p>Price:</p>
                <p>{vndFormatter.format(price)}/month</p>
              </Group>
              <Group>
                <p>Deposit:</p>
                <p>{vndFormatter.format(deposit)}/month</p>
              </Group>
            </Group>
            <Group>
              <Group>
                <p>Unit: </p>
                <p>
                  {unit.name} - {unit.property.name}
                </p>
                <Link to="/units/$id" params={{ id: unit.id }}>
                  <ActionIcon variant="subtle">
                    <Link02Icon size={16} />
                  </ActionIcon>
                </Link>
              </Group>
            </Group>
          </Stack>
        </Fieldset>
        <SimpleGrid cols={2}>
          <Fieldset legend={'Landlord'}>
            <MemberCard {...landlord} status={landlordStatus} />
          </Fieldset>
          <Fieldset legend={'Tenant'}>
            <MemberCard {...tenant} status={tenantStatus} />
          </Fieldset>
        </SimpleGrid>
        <Fieldset legend={'Images'}>
          <Carousel
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
          </Carousel>
        </Fieldset>
      </Stack>
    </Paper>
  );

  function MemberCard(props: IMemberResDto & { status: RequestStatus }) {
    return (
      <Stack>
        <Card withBorder>
          <Group>
            <Avatar src={props.imgUrl} />
            <Text>{props.name}</Text>
            <Box flex={1} />
            {props.id === currentMember.id &&
            props.status === RequestStatus.PENDING ? (
              <>
                <Button
                  color={'green'}
                  leftSection={<Tick01Icon size={20} />}
                  onClick={() => confirmApprove()}
                >
                  Approve
                </Button>
                <Button
                  color={'danger'}
                  prefix={<Cancel01Icon size={20} />}
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
          </Group>
        </Card>
      </Stack>
    );
  }
}
