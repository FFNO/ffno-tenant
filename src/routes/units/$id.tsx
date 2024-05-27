import { dataProvider, useCreate } from '@/api';
import { currentMemberAtom } from '@/app';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { IUnitResDto, RequestCategory } from '@/libs';
import { vndFormatter } from '@/utils';
import { Button, Chip, Image } from '@nextui-org/react';
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
            <Button
              color="primary"
              className="uppercase font-bold"
              onClick={() => handleRequest()}
              isDisabled={data.requested}
            >
              {data.requested ? 'Request sent' : 'Request to apply'}
            </Button>
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
      </div>
    </div>
  );
}
