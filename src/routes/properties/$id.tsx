import { dataProvider } from '@/api';
import MemberCard from '@/components/MemberCard';
import { IPropertyResDto, IUnitResDto, propertyTypeRecord } from '@/libs';
import { vndFormatter } from '@/utils';
import { Button, Chip, Image } from '@nextui-org/react';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { PhotoProvider, PhotoView } from 'react-photo-view';

export const Route = createFileRoute('/properties/$id')({
  component: Page,
  loader: ({ params: { id } }) =>
    dataProvider.getOne<IPropertyResDto>({ resource: 'properties', id }),
});

function Page() {
  const data = Route.useLoaderData();

  return (
    <PhotoProvider>
      <div className="grid grid-cols-5 px-40 py-12">
        <div className="col-span-3 flex flex-col px-16 gap-4">
          {/* Brief */}
          <div className="flex flex-row justify-between">
            <p className="text-3xl font-bold">{data.name}</p>
            <Chip size="lg" color="primary">
              {propertyTypeRecord[data.type]}
            </Chip>
          </div>
          <p className="text-lg font-medium">
            {data.address} - {data.ward}, {data.district}, {data.province}
          </p>
          {/* Units */}
          <p className="text-xl font-semibold">Units</p>
          {data.units.map((unit) => (
            <UnitCard key={unit.id} {...unit} />
          ))}
          {/* Overview */}
          <p className="text-xl font-semibold">Overview</p>
          <p>{data.details}</p>
          {/* Amenities */}
          <p className="text-xl font-semibold">Amenities</p>
          <div className="flex flex-row flex-wrap gap-3">
            {data.amenities.map((item) => (
              <Chip key={item} size="lg" color="primary" variant="flat">
                {item}
              </Chip>
            ))}
          </div>
          {/* Contacts */}
          <p className="text-xl font-semibold">Contacts</p>
          <div className="flex flex-row flex-wrap gap-3">
            <MemberCard {...data.owner} />
          </div>
        </div>
        <div className="col-span-2">
          {data.imgUrls.map((img, index) => (
            <PhotoView src={img} key={index}>
              <Image
                radius="none"
                src={img}
                width="100%"
                className="cursor-pointer mb-2"
              />
            </PhotoView>
          ))}
        </div>
      </div>
    </PhotoProvider>
  );
}

function UnitCard(props: IUnitResDto) {
  const navigate = useNavigate();
  return (
    <div className="flex flex-row border rounded-lg p-4 h-40">
      <PhotoView src={props.imgUrls[0]}>
        <Image
          src={props.imgUrls[0]}
          radius="none"
          className="h-full object-cover w-48"
        />
      </PhotoView>
      <div className="flex-1 flex flex-col justify-between ml-4">
        <p className="text-lg font-bold">{props.name}</p>
        <p className="text-2xl font-extrabold">
          {vndFormatter.format(+props.price)}/month
        </p>
        <p className="text-sm text-default-500">{props.details}</p>
        <p className="font-medium">{props.area} m2</p>
      </div>
      <div className="flex items-center">
        <Button
          color="primary"
          size="lg"
          variant="light"
          onClick={() =>
            navigate({ to: '/units/$id', params: { id: props.id } })
          }
        >
          View details
        </Button>
      </div>
    </div>
  );
}
