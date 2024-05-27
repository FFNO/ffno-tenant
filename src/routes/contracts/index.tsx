import { useList } from '@/api';
import { contractSearchAtom } from '@/app';
import { IContractResDto, contractStatusRecord } from '@/libs';
import { calculatePage, formatDate } from '@/libs/helpers';
import {
  Avatar,
  Button,
  Chip,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
} from '@nextui-org/react';
import { Link, createFileRoute } from '@tanstack/react-router';
import { PencilEdit02Icon, ViewIcon } from 'hugeicons-react';
import { useAtom } from 'jotai';

export const Route = createFileRoute('/contracts/')({
  component: Page,
});

function Page() {
  const [search, setSearch] = useAtom(contractSearchAtom);

  const { data } = useList<IContractResDto>({
    resource: 'contracts',
    params: search,
  });

  return (
    <div className="flex flex-col px-32 py-10 gap-4">
      <div className="flex flex-row justify-between">
        <h3 className="text-lg font-semibold">Contracts</h3>
        <span className="flex-1"></span>
      </div>
      <Table
        bottomContent={
          data?.total ? (
            <div className="flex w-full justify-center">
              <Pagination
                isCompact
                showControls
                showShadow
                color="primary"
                page={search.page ?? 1}
                total={calculatePage(data.total)}
                onChange={(page) => setSearch({ page })}
              />
            </div>
          ) : null
        }
      >
        <TableHeader>
          <TableColumn>ID</TableColumn>
          <TableColumn>Tenant</TableColumn>
          <TableColumn>Unit</TableColumn>
          <TableColumn>Property</TableColumn>
          <TableColumn align="center">Start date</TableColumn>
          <TableColumn align="center">End date</TableColumn>
          <TableColumn align="center">Termination date</TableColumn>
          <TableColumn align="center">Status</TableColumn>
          <TableColumn align="center">Actions</TableColumn>
        </TableHeader>
        <TableBody>
          {(data?.data ?? []).map((contract) => (
            <TableRow key={contract.id}>
              <TableCell>#{contract.id}</TableCell>
              <TableCell>
                <div className="inline-flex items-center gap-4">
                  <Avatar size={'sm'} src={contract.tenant.imgUrl} />
                  <p>{contract.tenant.name}</p>
                </div>
              </TableCell>
              <TableCell>{contract.unit.name}</TableCell>
              <TableCell>{contract.unit.property.name}</TableCell>
              <TableCell>{formatDate(contract.startDate)}</TableCell>
              <TableCell>{formatDate(contract.endDate)}</TableCell>
              <TableCell>
                {contract.terminationDate
                  ? formatDate(contract.terminationDate)
                  : '-'}
              </TableCell>
              <TableCell>
                <Chip>{contractStatusRecord[contract.status]}</Chip>
              </TableCell>
              <TableCell>
                <div className="inline-flex justify-center gap-4">
                  <Link
                    to="/contracts/$id"
                    params={{ id: contract.id.toString() }}
                  >
                    <Tooltip content={'View contract detail'}>
                      <Button isIconOnly variant="flat" color="warning">
                        <ViewIcon size={16} />
                      </Button>
                    </Tooltip>
                  </Link>
                  <Link
                    to="/properties/$id"
                    params={{ id: contract.unit.propertyId }}
                  >
                    <Tooltip content={'View property detail'}>
                      <Button isIconOnly variant="flat" color="primary">
                        <PencilEdit02Icon size={16} />
                      </Button>
                    </Tooltip>
                  </Link>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
