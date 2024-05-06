import { PropertyType } from './enums';

export enum MemberRole {
  ADMIN,
  LANDLORD,
  TENANT,
  SERVICE_WORKER,
}

export interface MemberResDto {
  id: string;
  name: string;
  email: string;
  phone: string;
  unit: string;
  imgUrl: string;
  role: MemberRole;
}

export interface UnitResDto {
  id: string;
  name: string;
  area: string;
  price: string;
  deposit: string;
  details: string;
  status: number;
  imgUrls: string[];
  unitFeatures: string[];
  tenants: MemberResDto[];
  payer: MemberResDto;
  property: PropertyResDto;
  isListing: boolean;
  propertyId: string;
  requested: boolean;
}

export interface PropertyResDto {
  id: string;
  name: string;
  type: PropertyType;
  address: string;
  ward: string;
  district: string;
  province: string;
  imgUrls: string[];
  details: string;
  ownerId: string;
  owner: MemberResDto;
  amenities: string[];
  units: UnitResDto[];
  occupiedCount: number;
  vacantCount: number;
}
