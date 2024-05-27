import { NullableObject, IGetListContractDto } from '@/libs';
import { atom } from 'jotai';

export const contractSearchAtom = atom<NullableObject<IGetListContractDto>>({});
