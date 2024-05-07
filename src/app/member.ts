import { MemberResDto } from '@/types';
import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

export const memberAtom = atomWithStorage(
  'member',
  JSON.parse(localStorage.getItem('member') || '{}') as MemberResDto,
);

export const contactAtom = atom<Record<string, MemberResDto>>({});
