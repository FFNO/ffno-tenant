import { dataProvider } from '@/api';
import BuildingImage from '@/assets/building.svg';
import LandingImage from '@/assets/landing.webp';
import PropertyCard from '@/components/PropertyCard';
import { IPropertyResDto } from '@/libs';
import { Avatar, Button, Image, Input } from '@nextui-org/react';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import {
  Building06Icon,
  DollarSquareIcon,
  Home01Icon,
  Home06Icon,
  Invoice02Icon,
  PercentIcon,
  PercentSquareIcon,
  SaleTag01Icon,
  Search01Icon,
  SearchAreaIcon,
  SquareLock02Icon,
  UserGroupIcon,
} from 'hugeicons-react';
import React from 'react';
import { useTranslation } from 'react-i18next';

export const Route = createFileRoute('/')({
  component: LandingPage,
  loader: () =>
    dataProvider.getList<IPropertyResDto>({
      resource: 'units',
      params: { pageSize: 3 },
    }),
});

function LandingPage() {
  const { t } = useTranslation();
  const { data } = Route.useLoaderData();
  const navigate = useNavigate();

  return (
    <>
      <div className="flex flex-col gap-16 bg-gradient-to-b from-primary-100 px-8 py-10 md:px-48 md:py-32">
        {/* Section 1 */}
        <div className="grid md:grid-cols-2">
          <div className="flex flex-col gap-8">
            <p className="text-[40px] text-center md:text-start md:text-6xl font-bold">
              {t('landing.section-1')}
            </p>
            <p className="text-lg text-center md:text-start md:text-xl font-medium">
              {t('landing.section-2')}
            </p>
            <div className="grid grid-cols-2 space-x-4">
              <div className="flex flex-col gap-6">
                <div className="relative w-min">
                  <Avatar
                    isBordered
                    showFallback
                    size="lg"
                    className="bg-primary-200"
                    fallback={<UserGroupIcon strokeWidth={2} color="white" />}
                  />
                  <span className="absolute bg-primary-500 p-1 rounded-xl -bottom-2 -right-2">
                    <SaleTag01Icon size={16} color="white" />
                  </span>
                </div>
                <div className="flex flex-col">
                  <p className="text-primary text-lg md:text-2xl font-semibold">
                    50k+ renters
                  </p>
                  <p className="text-base">believe in our service</p>
                </div>
              </div>
              <div className="flex flex-col gap-6">
                <div className="relative w-min">
                  <Avatar
                    isBordered
                    showFallback
                    size="lg"
                    className="bg-primary-200"
                    fallback={<Building06Icon strokeWidth={2} color="white" />}
                  />
                  <span className="absolute bg-primary-500 p-1 rounded-xl -bottom-2 -right-2">
                    <Search01Icon size={16} color="white" />
                  </span>
                </div>
                <div className="flex flex-col">
                  <p className="text-primary text-lg md:text-2xl font-semibold">
                    10k+ properties
                  </p>
                  <p className="text-base">ready for occupancy</p>
                </div>
              </div>
            </div>
          </div>
          <Image src={LandingImage} className="hidden md:block" />
        </div>
      </div>
      {/* Section 2 */}
      <div className="px-8 md:px-48">
        <div className="flex flex-col md:flex-row gap-16">
          <div className="relative p-10 flex flex-col gap-6 max-w-[416px] min-h-[500px] border rounded-lg bg-primary-50">
            <p className="font-bold text-3xl">
              The new way to find your new home
            </p>
            <p className="text-base font-medium">
              Find your dream place to live in with more than 10k+ properties
              listed.
            </p>
            <span>
              <Button color="primary">Browse properties</Button>
            </span>
            <div className="absolute right-0 bottom-0">
              <Image src={BuildingImage} className=" w-64 h-64" />
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-x-6 gap-y-16">
            <SectionItem
              title="Property Insurance"
              subtitle="We offer our customer property protection of liability coverage and
            insurance for their better life."
              Icon={Home01Icon}
              SubIcon={SquareLock02Icon}
            />
            <SectionItem
              title="Best Price"
              subtitle="Not sure what  you should be charging for your property? No need to worry, let us do the numbers for you."
              Icon={Invoice02Icon}
              SubIcon={PercentIcon}
            />
            <SectionItem
              title="Lowest Commission"
              subtitle="You no longer have to negotiate commissions and haggle with other agents it only cost 2%!"
              Icon={PercentSquareIcon}
              SubIcon={DollarSquareIcon}
            />
            <SectionItem
              title="Overall Control"
              subtitle="Get a virtual tour, and schedule visits before you rent or buy any properties. You get overall control."
              Icon={SearchAreaIcon}
              SubIcon={Home06Icon}
            />
          </div>
        </div>
      </div>
      {/* Section 3 */}
      <div className="flex flex-col items-center px-8 py-10 md:px-48 md:py-32">
        <p className="font-bold text-4xl mb-4 text-center md:text-start">
          Based on your location
        </p>
        <p className="font-medium text-base mb-16 text-center md:text-start">
          Some of our picked properties near you location.
        </p>
        <div className="grid md:grid-cols-3 mb-12 w-full">
          <Input
            startContent={<Search01Icon size={20} className="mx-1" />}
            placeholder="Search..."
            className="col-start-3"
            onKeyDown={(e) => {
              if (e.code === 'Enter') {
                navigate({
                  to: '/properties',
                  search: { name: e.currentTarget.value },
                });
              }
            }}
          />
        </div>
        <div className="grid md:grid-cols-3 w-full mb-8 gap-8">
          {data?.map((item) => <PropertyCard {...item} key={item.id} />)}
        </div>
        <Button
          size="lg"
          color="primary"
          onClick={() => navigate({ to: '/properties' })}
        >
          Browse more properties
        </Button>
      </div>
      {/* Landlord contact */}
      <div className="flex flex-col items-center gap-2 py-16 px-8 bg-foreground text-white">
        <p className="text-2xl text-primary font-bold">No Spam Promise</p>
        <p className="text-4xl font-bold">Are you a landlord?</p>
        <p className="text-base text-default-400 font-medium">
          Discover ways to increase your home's value and get listed. No Spam.
        </p>
        <Input
          size="lg"
          radius="sm"
          placeholder="Enter your email address"
          className="my-4 max-w-[450px]"
          endContent={<Button color="primary">Submit</Button>}
          classNames={{
            input: ['bg-transparent', 'placeholder:text-default-500'],
            innerWrapper: 'bg-transparent',
            inputWrapper: [
              'h-16',
              'bg-white',
              'hover:bg-white',
              'group-data-[focus=true]:bg-white',
              'group-data-[hover=true]:bg-white',
              '!cursor-text',
            ],
          }}
        />
        <span className="flex flex-row text-sm font-medium text-default-400">
          Join <p className="text-white font-semibold">&nbsp;10,000+&nbsp;</p>
          other landlords in our community.
        </span>
      </div>
    </>
  );
}

function SectionItem({
  title,
  subtitle,
  Icon,
  SubIcon,
}: {
  title: string;
  subtitle: string;
  Icon: React.ElementType;
  SubIcon: React.ElementType;
}) {
  return (
    <div className="flex flex-row md:flex-col gap-6">
      <div className="relative w-min h-fit">
        <Avatar
          isBordered
          showFallback
          size="lg"
          className="bg-primary-200"
          fallback={<Icon strokeWidth={2} color="white" />}
        />
        <span className="absolute bg-primary-500 p-1 rounded-xl -bottom-2 -right-2">
          <SubIcon size={16} color="white" />
        </span>
      </div>
      <div className="flex flex-col gap-4">
        <p className="text-2xl font-semibold">{title}</p>
        <p className="text-base text-default-700">{subtitle}</p>
      </div>
    </div>
  );
}
