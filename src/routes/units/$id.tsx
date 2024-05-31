import { dataProvider, useCreate } from '@/api';
import { currentMemberAtom } from '@/app';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import {
  IEquipmentResDto,
  IUnitResDto,
  RequestCategory,
  unitStatusRecord,
} from '@/libs';
import { calculatePage, formatDate } from '@/libs/helpers';
import { vndFormatter } from '@/utils';
import {
  Button,
  Chip,
  Image,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@nextui-org/react';
import { createFileRoute, useRouter } from '@tanstack/react-router';
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

  const handleReportEquipment = (data: IEquipmentResDto) => {
    mutateRequest.mutate({
      name: `Report equipment issue`,
      description: `Issue with equipment ${data.name} -> Unit ${data.unit.name} - property ${data.property.name}`,
      equipmentId: data.id,
      category: RequestCategory.REPORT_ISSUE,
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
            {!data.selfOccupied && (
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
        {/* Equipments */}
        <div>
          <p className="text-3xl font-semibold mb-1">Equipments</p>

          <Table
            bottomContent={
              data.equipments.length ? (
                <div className="flex w-full justify-center">
                  <Pagination
                    isCompact
                    showControls
                    showShadow
                    color="primary"
                    // page={search.page ?? 1}
                    total={calculatePage(data.equipments.length)}
                    // onChange={(page) => setSearch({ page })}
                  />
                </div>
              ) : null
            }
          >
            <TableHeader>
              <TableColumn>Name</TableColumn>
              <TableColumn>Brand</TableColumn>
              <TableColumn>Model</TableColumn>
              <TableColumn>Serial</TableColumn>
              <TableColumn>Install at</TableColumn>
              <TableColumn>Description</TableColumn>
              <TableColumn>Property</TableColumn>
              <TableColumn>Unit</TableColumn>
              <TableColumn>Price</TableColumn>
              <TableColumn align={'center'}>Status</TableColumn>
              <TableColumn align={'center'}>Actions</TableColumn>
            </TableHeader>
            <TableBody>
              {(data.equipments ?? []).map((equipment) => (
                <TableRow key={equipment.id}>
                  <TableCell>{equipment.name}</TableCell>
                  <TableCell>{equipment.brand}</TableCell>
                  <TableCell>{equipment.model}</TableCell>
                  <TableCell>{equipment.serial}</TableCell>
                  <TableCell>
                    {equipment.dateOfInstallation
                      ? formatDate(equipment.dateOfInstallation)
                      : '-'}
                  </TableCell>
                  <TableCell>{equipment.description}</TableCell>
                  <TableCell>{equipment.unit.name}</TableCell>
                  <TableCell>{equipment.property.name}</TableCell>
                  <TableCell>{vndFormatter.format(equipment.price)}</TableCell>
                  <TableCell align={'center'}>
                    <Chip>{unitStatusRecord[equipment.maintainStatus]}</Chip>
                  </TableCell>
                  <TableCell>
                    <div className="inline-flex justify-center gap-4">
                      <Button
                        variant="flat"
                        color="primary"
                        onClick={() => handleReportEquipment(equipment)}
                      >
                        Report issue
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
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
      </div>
    </div>
  );
}
