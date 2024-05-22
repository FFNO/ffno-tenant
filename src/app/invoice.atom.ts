import { IGetListInvoiceDto, NullableObject } from '@/libs';
import { atom } from 'jotai';

export const invoiceSearchAtom = atom<NullableObject<IGetListInvoiceDto>>({});
