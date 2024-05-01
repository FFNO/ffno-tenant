import { dataProvider } from "@/api";
import PropertyCard from "@/components/PropertyCard";
import { PropertyResDto } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Slider,
} from "@nextui-org/react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const searchSchema = z.object({
  name: z
    .string()
    .optional()
    .transform((arg) => arg || undefined),
  minPrice: z.coerce.number().optional(),
});

export const Route = createFileRoute("/properties/")({
  component: Page,
  validateSearch: searchSchema.parse,
  loaderDeps: ({ search }) => search,
  loader: ({ deps }) =>
    dataProvider.getList<PropertyResDto>({ resource: "units", params: deps }),
});

function Page() {
  const [priceRange, setPriceRange] = useState<number | number[]>([0, 0]);
  const form = useForm({
    resolver: zodResolver(searchSchema),
  });
  const navigate = useNavigate();

  const { data } = Route.useLoaderData();
  return (
    <div className="flex flex-row gap-16 px-24 py-16">
      <Card>
        <CardHeader>
          <p className="text-xl font-bold px-8">Filter</p>
        </CardHeader>
        <CardBody className="px-10 py-8">
          <form
            className="flex flex-col gap-4 min-w-72"
            onSubmit={form.handleSubmit((values) => {
              const range = priceRange as number[];
              const minPrice = range[0];
              const maxPrice =
                range[0] === 10000000 || range[1] === 0 ? undefined : range[1];
              navigate({ search: { ...values, minPrice, maxPrice } });
            })}
          >
            <Input size="sm" label="Name" {...form.register("name")} />
            <Slider
              label="Price Range"
              step={500000}
              minValue={0}
              maxValue={10000000}
              formatOptions={{ style: "currency", currency: "VND" }}
              value={priceRange}
              onChange={setPriceRange}
            />
            <Button color="primary" type="submit">
              Submit
            </Button>
          </form>
        </CardBody>
      </Card>
      <div className="flex-1 grid grid-cols-3 gap-8">
        {data?.map((item) => <PropertyCard {...item} key={item.id} />)}
      </div>
      {/* <Code>{JSON.stringify(data, null, 2)}</Code> */}
    </div>
  );
}
