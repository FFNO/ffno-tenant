import { dataProvider } from '@/api';
import {
  IRequestResDto,
  RequestCategory,
  RequestStatus,
  requestCategoryRecord,
  requestStatusRecord,
} from '@/libs';
import { calculatePage } from '@/libs/helpers';
import {
  Button,
  Pagination,
  Spinner,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tabs,
  User,
  getKeyValue,
} from '@nextui-org/react';
import { createFileRoute } from '@tanstack/react-router';
import dayjs from 'dayjs';
import { z } from 'zod';

const searchSchema = z.object({
  page: z.coerce.number().default(1),
  type: z.enum(['sent', 'received']).optional(),
});

export const Route = createFileRoute('/requests/')({
  component: Page,
  validateSearch: searchSchema.parse,
  loaderDeps: ({ search }) => search,
  loader: ({ deps }) =>
    dataProvider.getList<IRequestResDto>({
      resource: 'requests',
      params: deps,
    }),
});

function Page() {
  const navigate = Route.useNavigate();
  const search = Route.useSearch();

  const { data, total } = Route.useLoaderData();

  return (
    <div className="flex flex-col px-10 py-8 gap-4">
      <Tabs
        aria-label="Options"
        selectedKey={search.type ?? 'received'}
        onSelectionChange={(key) => navigate({ search: { type: key } })}
      >
        <Tab key="received" title="Received requests"></Tab>
        <Tab key="sent" title="Sent requests"></Tab>
      </Tabs>
      <Table
        bottomContent={
          total > 0 ? (
            <div className="flex w-full justify-center">
              <Pagination
                isCompact
                showControls
                showShadow
                color="primary"
                page={search.page}
                total={calculatePage(total)}
                onChange={(page) => navigate({ search: { page } })}
              />
            </div>
          ) : null
        }
      >
        {search.type === 'sent' ? (
          <TableHeader>
            <TableColumn key="name">Name</TableColumn>
            <TableColumn align="center" key="category">
              Category
            </TableColumn>
            <TableColumn align="center" key="status">
              Status
            </TableColumn>
            <TableColumn align="center" key="createdAt">
              <p className="text-center">Created At</p>
            </TableColumn>
            <TableColumn align="center" key="actions">
              <p className="text-center">Actions</p>
            </TableColumn>
          </TableHeader>
        ) : (
          <TableHeader>
            <TableColumn key="sender">Sender</TableColumn>
            <TableColumn key="name">Name</TableColumn>
            <TableColumn align="center" key="category">
              Category
            </TableColumn>
            <TableColumn align="center" key="status">
              Status
            </TableColumn>
            <TableColumn align="center" key="createdAt">
              <p className="text-center">Created At</p>
            </TableColumn>
            <TableColumn align="center" key="actions">
              <p className="text-center">Actions</p>
            </TableColumn>
          </TableHeader>
        )}
        <TableBody
          items={data ?? []}
          loadingContent={<Spinner />}
          emptyContent={'No rows to display.'}
          // loadingState={loadingState}
        >
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>
                  {columnKey === 'sender' ? (
                    <User
                      name={item.sender.name}
                      avatarProps={{ src: item.sender.imgUrl }}
                    />
                  ) : columnKey === 'name' ? (
                    <div className="flex flex-col w-fit">
                      <p className="font-bold">
                        {getKeyValue(item, columnKey)}
                      </p>
                      <p className="text-sm">
                        {getKeyValue(item, 'description')}
                      </p>
                    </div>
                  ) : columnKey === 'category' ? (
                    requestCategoryRecord[
                      getKeyValue(item, columnKey) as RequestCategory
                    ]
                  ) : columnKey === 'status' ? (
                    requestStatusRecord[
                      getKeyValue(item, columnKey) as RequestStatus
                    ]
                  ) : columnKey === 'createdAt' ? (
                    <span>
                      <p className="text-center">
                        {dayjs(getKeyValue(item, columnKey)).format('LTS')}
                      </p>
                      <p className="text-center">
                        {dayjs(getKeyValue(item, columnKey)).format(
                          'DD/MM/YYYY',
                        )}
                      </p>
                    </span>
                  ) : columnKey === 'actions' ? (
                    <Button
                      fullWidth
                      color="primary"
                      onClick={() =>
                        navigate({
                          to: '/requests/$id',
                          params: { id: item.id },
                        })
                      }
                    >
                      View detail
                    </Button>
                  ) : (
                    getKeyValue(item, columnKey)
                  )}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
