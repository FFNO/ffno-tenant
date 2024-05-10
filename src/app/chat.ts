import { IChannelDto } from '@/libs';
import { atom } from 'jotai';

export const channelRecordAtom = atom<Record<string, IChannelDto>>({});
