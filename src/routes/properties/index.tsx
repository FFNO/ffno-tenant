import { dataProvider, useSimpleList } from '@/api';
import PropertyCard from '@/components/PropertyCard';
import { IPropertyResDto } from '@/libs';
import { calculatePage } from '@/libs/helpers';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Pagination,
  Select,
  SelectItem,
} from '@nextui-org/react';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useState } from 'react';
import { z } from 'zod';

const searchSchema = z.object({
  name: z
    .string()
    .optional()
    .transform((arg) => arg || undefined),
  minPrice: z.coerce.number().optional(),
  pageSize: z.number().default(12).optional(),
});

export const Route = createFileRoute('/properties/')({
  component: Page,
  validateSearch: searchSchema.parse,
  loaderDeps: ({ search }) => ({ ...search, pageSize: 12 }),
  loader: ({ deps }) =>
    dataProvider.getList<IPropertyResDto>({ resource: 'units', params: deps }),
});

function Page() {
  const { data, total } = Route.useLoaderData();
  const search = Route.useSearch();
  const navigate = useNavigate();

  const [name, setName] = useState<string>();
  const [province, setProvince] = useState<string>();
  const [district, setDistrict] = useState<string>();
  const [ward, setWard] = useState<string>();
  const [minPrice, setMinPrice] = useState<number>();
  const [maxPrice, setMaxPrice] = useState<number>();

  const { data: amenities } = useSimpleList({ resource: 'amenities' });
  const { data: provinces } = useSimpleList({ resource: 'provinces' });
  const { data: districts } = useSimpleList({
    resource: 'districts',
    params: { province },
  });
  const { data: wards } = useSimpleList({
    resource: 'wards',
    params: { district },
  });

  return (
    <div className="flex flex-row gap-16 px-24 py-16">
      <Card>
        <CardHeader>
          <p className="text-xl font-bold px-8">Filter</p>
        </CardHeader>
        <CardBody className="px-10 py-8">
          <form
            className="flex flex-col gap-4 min-w-72"
            onSubmit={(e) => {
              e.preventDefault();
              navigate({
                search: {
                  ...search,
                  name,
                  province,
                  district,
                  ward,
                  minPrice,
                  maxPrice,
                },
              });
            }}
          >
            <Input
              size="sm"
              label="Name"
              value={name}
              onValueChange={setName}
            />
            <Select
              label="Province"
              placeholder="Select province"
              selectionMode="single"
              defaultSelectedKeys={province}
              onChange={(e) => setProvince(e.target.value || undefined)}
            >
              {(provinces ?? []).map((item) => (
                <SelectItem key={item} value={item}>
                  {item}
                </SelectItem>
              ))}
            </Select>
            <Select
              label="District"
              isDisabled={!province}
              placeholder="Select district"
              defaultSelectedKeys={district}
              onChange={(e) => setDistrict(e.target.value || undefined)}
            >
              {(districts ?? []).map((item) => (
                <SelectItem key={item} value={item}>
                  {item}
                </SelectItem>
              ))}
            </Select>
            <Select
              label="Ward"
              isDisabled={!district}
              placeholder="Select ward"
              defaultSelectedKeys={ward}
              onChange={(e) => setWard(e.target.value || undefined)}
            >
              {(wards ?? []).map((item) => (
                <SelectItem key={item} value={item}>
                  {item}
                </SelectItem>
              ))}
            </Select>
            <Input
              label="Min price"
              type="number"
              value={minPrice}
              onValueChange={(e) => setMinPrice(e ? +e : undefined)}
            />
            <Input
              label="Max price"
              type="number"
              value={maxPrice}
              onValueChange={(e) => setMaxPrice(e ? +e : undefined)}
            />
            <div className="inline-flex justify-between gap-2">
              <Button color="primary" type="submit" fullWidth>
                Submit
              </Button>
              <Button color="danger" variant="bordered" fullWidth>
                Clear
              </Button>
            </div>
          </form>
        </CardBody>
      </Card>
      <div className="flex-1 grid grid-cols-3 gap-8">
        {data?.map((item) => <PropertyCard {...item} key={item.id} />)}
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={search.page}
          total={calculatePage(total)}
          className="col-span-3"
          onChange={(page) => navigate({ search: { page } })}
        />
      </div>
    </div>
  );
}
