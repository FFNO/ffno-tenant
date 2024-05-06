import { useMutation, useQuery } from '@tanstack/react-query';
import { axiosInstance, queryClient } from './utils';

interface GetListResDto<T> {
  data: T[];
  total: number;
}

interface Props {
  resource: string;
  enabled?: boolean;
  params?: Record<string, unknown>;
  onSuccess?: () => void;
}

interface PropsWithId extends Props {
  id: string;
}

export const dataProvider = {
  getList: async <T>({ resource, params }: Props) => {
    const urlWithQuery = resource;

    const { data } = await axiosInstance.get<GetListResDto<T>>(urlWithQuery, {
      params,
    });

    return {
      data: data.data ?? [],
      total: data.total ?? 0,
    };
  },

  getSimpleList: async ({ resource, params }: Props) => {
    const { data } = await axiosInstance.get<string[]>(`/common/${resource}`, {
      params,
    });

    return data;
  },

  getOne: async <T>({ resource, id }: PropsWithId) => {
    const { data } = await axiosInstance.get<T>(`${resource}/${id}`);

    return data;
  },

  create: async <T = unknown>(resource: string, payload: T) => {
    const { data } = await axiosInstance.post<string>(resource, payload);

    return data;
  },

  update: async <T = unknown>(resource: string, payload: T) => {
    const { data } = await axiosInstance.patch<string>(resource, payload);

    return data;
  },
};

export const useList = <T>({ resource, params, enabled = true }: Props) => {
  const query = useQuery({
    queryKey: [resource, params],
    queryFn: () => dataProvider.getList<T>({ resource, params }),

    retry: false,
    enabled,
  });

  return { ...query };
};

export const useOne = <T>({ resource, id, enabled = true }: PropsWithId) => {
  const query = useQuery({
    queryKey: [resource, id],
    queryFn: () => dataProvider.getOne<T>({ resource, id }),
    retry: false,
    enabled,
  });

  return { ...query };
};

export const useSimpleList = ({ resource, params, enabled = true }: Props) => {
  const query = useQuery({
    queryKey: [resource, params],
    queryFn: () => dataProvider.getSimpleList({ resource, params }),
    retry: false,
    enabled,
  });

  return { ...query };
};

export const useCreate = ({ resource, onSuccess }: Props) => {
  const mutation = useMutation({
    mutationKey: [resource],
    mutationFn: (data: unknown) => dataProvider.create(resource, data),
    onSuccess,
  });

  return mutation;
};

export const useUpdate = ({ resource, onSuccess }: Props) => {
  const mutation = useMutation({
    mutationKey: [resource],
    mutationFn: (data: unknown) => dataProvider.update(resource, data),
    onSuccess,
  });

  return mutation;
};

export { queryClient };
