import { dataProvider, useCreate } from '@/api';
import { currentMemberAtom } from '@/app';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { IUnitResDto, RequestCategory, unitStatusRecord } from '@/libs';
import { displayDate } from '@/libs/helpers';
import { vndFormatter } from '@/utils';
import {
  Button,
  Chip,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
  useDisclosure,
} from '@nextui-org/react';
import { createFileRoute, useRouter } from '@tanstack/react-router';
import { Alert01Icon } from 'hugeicons-react';
import { useAtomValue } from 'jotai';
import { toast } from 'react-toastify';

export const Route = createFileRoute('/units/$id')({
  component: Page,
  loader: ({ params: { id } }) =>
    dataProvider.getOne<IUnitResDto>({ resource: 'units', id }),
});

function renderRentalStatus(unit: IUnitResDto) {
  const {
    tenants: { length },
  } = unit;

  if (length) {
    return 'Occupied';
  }
  return 'Vacant';
}

function Page() {
  const data = Route.useLoaderData();
  const router = useRouter();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const member = useAtomValue(currentMemberAtom);
  const mutateRequest = useCreate({
    resource: 'requests',
    onSuccess() {
      toast.success('Send request successfully');
      router.invalidate();
    },
  });

  const handleRequest = () => {
    if (!member.id) {
      return;
    }
    mutateRequest.mutate({
      name: `Lease request`,
      description: `Lease request for ${data.name} - ${data.property.name}`,
      unitId: data.id,
      propertyId: data.propertyId,
      category: RequestCategory.UNIT_LEASE,
    });
  };

  return (
    <div className="flex justify-center">
      <div className="flex flex-col gap-8 max-w-screen-lg px-6 py-12">
        {/* Name and request button */}
        <div>
          <div className="flex flex-row justify-between mb-1">
            <span className="inline-flex items-center gap-2">
              <p className="text-3xl font-bold">
                {data.property.name} - {data.name}
              </p>
              <Chip
                size="lg"
                color={data.tenants.length ? 'warning' : 'success'}
                variant="flat"
                classNames={{ content: 'font-bold uppercase' }}
              >
                {renderRentalStatus(data)}
              </Chip>
            </span>
            {!data.isLiving && (
              <Button
                color="primary"
                className="uppercase font-bold"
                onClick={() => handleRequest()}
                isDisabled={data.requested}
              >
                {data.requested ? 'Request sent' : 'Request to apply'}
              </Button>
            )}
          </div>
          {/* Brief */}
          <p className="text-lg">
            {data.property.address} - {data.property.ward},{' '}
            {data.property.district}, {data.property.province}
          </p>
        </div>

        {/* Prices */}
        <div>
          <p className="text-3xl font-semibold mb-1">Prices</p>
          <div className="flex flex-col gap-1">
            <span className="inline-flex text-lg">
              Monthly cost:&nbsp;
              <p className="text-xl text-primary">
                {vndFormatter.format(+data.price)}
              </p>
            </span>
            <span className="inline-flex text-lg">
              Move-in cost:&nbsp;
              <p className="text-xl text-primary">
                {vndFormatter.format(+data.deposit)}
              </p>
            </span>
          </div>
        </div>
        {/* Overview */}
        <div>
          <p className="text-3xl font-semibold mb-1">Overview</p>
          <p>{data.description}</p>
        </div>
        {/* Amenities */}
        <div>
          <p className="text-3xl font-semibold mb-1">Amenities</p>
          <div className="flex flex-row flex-wrap gap-3">
            {data.unitFeatures.map((item) => (
              <Chip key={item} size="lg" color="primary" variant="flat">
                {item}
              </Chip>
            ))}
          </div>
        </div>
        {/* Images */}
        <div>
          <p className="text-3xl font-semibold mb-1">Images</p>
          <Carousel
            opts={{
              loop: true,
              dragFree: true,
            }}
          >
            <CarouselContent>
              {data.imgUrls.map((img, index) => (
                <CarouselItem key={index} className="basis-auto">
                  <Image
                    radius="none"
                    src={img}
                    className="cursor-pointer h-96 mb-2"
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
        {/* Equipment */}
        {data.isLiving && (
          <Table>
            <TableHeader>
              <TableColumn>Name</TableColumn>
              <TableColumn>Brand</TableColumn>
              <TableColumn>Model</TableColumn>
              <TableColumn>Serial</TableColumn>
              <TableColumn>Install at</TableColumn>
              <TableColumn>Description</TableColumn>
              <TableColumn>Price</TableColumn>
              <TableColumn align={'center'}>Status</TableColumn>
              <TableColumn align={'center'}>Actions</TableColumn>
            </TableHeader>
            <TableBody items={data.equipments ?? []}>
              {(item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.brand}</TableCell>
                  <TableCell>{item.model}</TableCell>
                  <TableCell>{item.serial}</TableCell>
                  <TableCell>{displayDate(item.dateOfInstallation)}</TableCell>
                  <TableCell>{item.description}</TableCell>
                  <TableCell>{vndFormatter.format(item.price)}</TableCell>
                  <TableCell align={'center'}>
                    {unitStatusRecord[item.maintainStatus]}
                  </TableCell>
                  <TableCell>
                    {/* <Link to="/equipments/$id" params={{ id: item.id }}>
                      <Tooltip content={'View equipment detail'}>
                        <Button isIconOnly variant="light">
                          <ViewIcon size={16} />
                        </Button>
                      </Tooltip>
                    </Link> */}
                    <Tooltip content="Report issue">
                      <Button
                        isIconOnly
                        color="danger"
                        variant="light"
                        onPress={onOpen}
                      >
                        <Alert01Icon />
                      </Button>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
        <Modal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          placement="top-center"
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Report issue
                </ModalHeader>
                <ModalBody>
                  <Input
                    autoFocus
                    label="Description"
                    placeholder="Describe the issue"
                    variant="bordered"
                  />
                </ModalBody>
                <ModalFooter>
                  <Button color="primary" onPress={onClose}>
                    Submit
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>
    </div>
  );
}
