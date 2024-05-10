import { IPropertyResDto } from '@/libs';
import { Card, CardBody, Divider, Image } from '@nextui-org/react';
import { Link } from '@tanstack/react-router';
import { RotateSquareIcon } from 'hugeicons-react';
import { minBy } from 'lodash';

interface Props extends IPropertyResDto {}

function PropertyCard(props: Props) {
  return (
    <Link to="/properties/$id" params={{ id: props.id }} key={props.id}>
      <Card shadow="sm" className="cursor-pointer">
        <CardBody className="overflow-visible p-0">
          <Image
            shadow="sm"
            radius="none"
            width="100%"
            alt={props.name}
            className="w-full object-cover h-[200px]"
            src={props.imgUrls[0]}
          />
          <div className="h-full flex flex-col gap-4 px-8 py-6 bg-background">
            <div className="flex flex-col gap-4 flex-1">
              <span className="flex flex-row items-end">
                <p className="text-2xl text-primary font-extrabold">
                  {minBy(props.units, 'price')?.price}+ ₫
                </p>
                <p className="font-medium text-base text-default-500">/month</p>
              </span>
              <p className="text-lg font-bold">{props.name}</p>
              <p className="text-sm text-default-500">
                {props.address} - {props.ward}, {props.district},{' '}
                {props.province}
              </p>
            </div>

            <Divider />
            <div className="flex flex-col justify-between">
              <span className="flex flex-row items-center gap-2">
                <RotateSquareIcon size={20} className="text-primary" />
                {/* {unit.area} m2 */}
              </span>
            </div>
          </div>
        </CardBody>
      </Card>
    </Link>
  );
}

export default PropertyCard;
