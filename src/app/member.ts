import { IMemberResDto } from '@/libs';
import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

export const memberAtom = atomWithStorage(
  'member',
  JSON.parse(localStorage.getItem('member') || '{}') as IMemberResDto,
);

export const contactAtom = atom<Record<string, IMemberResDto>>({});
