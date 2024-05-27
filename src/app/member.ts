import { IMemberResDto } from '@/libs';
import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

export const currentMemberAtom = atomWithStorage(
  'member',
  JSON.parse(localStorage.getItem('member') || '{}') as IMemberResDto,
);

export const contactRecordAtom = atom<Record<string, IMemberResDto>>({});
