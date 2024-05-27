import { useList } from '@/api';
import { invoiceSearchAtom } from '@/app';
import {
  IInvoiceResDto,
  invoiceCategoryRecord,
  invoiceStatusRecord,
} from '@/libs';
import { calculatePage, formatDate, vndFormatter } from '@/libs/helpers';
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
import { Building02Icon, ViewIcon } from 'hugeicons-react';
import { useAtom } from 'jotai';

export const Route = createFileRoute('/invoices/')({
  component: Page,
});

function Page() {
  const [search, setSearch] = useAtom(invoiceSearchAtom);

  const { data } = useList<IInvoiceResDto>({
    resource: 'invoices',
    params: search,
  });

  return (
    <div className="flex flex-col px-32 py-10 gap-4">
      <div className="flex flex-row justify-between">
        <h3 className="text-lg font-semibold">Invoices</h3>
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
          <TableColumn>Category</TableColumn>
          <TableColumn>Description</TableColumn>
          <TableColumn>Tenant</TableColumn>
          <TableColumn>Unit</TableColumn>
          <TableColumn>Property</TableColumn>
          <TableColumn align="center">Total</TableColumn>
          <TableColumn align="center">Due date</TableColumn>
          <TableColumn align="center">Paid at</TableColumn>
          <TableColumn align="center">Status</TableColumn>
          <TableColumn align="center">Actions</TableColumn>
        </TableHeader>
        <TableBody>
          {(data?.data ?? []).map((invoice) => (
            <TableRow key={invoice.id}>
              <TableCell>#{invoice.id}</TableCell>
              <TableCell>{invoiceCategoryRecord[invoice.category]}</TableCell>
              <TableCell>{invoice.description ?? '-'}</TableCell>
              <TableCell>
                <div className="inline-flex items-center gap-4">
                  <Avatar size={'sm'} src={invoice.member.imgUrl} />
                  <p>{invoice.member.name}</p>
                </div>
              </TableCell>
              <TableCell>{invoice.unit.name}</TableCell>
              <TableCell>{invoice.unit.property.name}</TableCell>
              <TableCell>{vndFormatter.format(invoice.total)}</TableCell>
              <TableCell>{formatDate(invoice.dueDate)}</TableCell>
              <TableCell>
                {invoice.paidAt ? formatDate(invoice.paidAt) : '-'}
              </TableCell>
              <TableCell>
                <Chip>{invoiceStatusRecord[invoice.status]}</Chip>
              </TableCell>
              <TableCell>
                <div className="inline-flex justify-center gap-4">
                  <Link
                    to="/invoices/$id"
                    params={{ id: invoice.id.toString() }}
                  >
                    <Tooltip content={'View invoice detail'}>
                      <Button isIconOnly variant="flat" color="warning">
                        <ViewIcon size={16} />
                      </Button>
                    </Tooltip>
                  </Link>
                  <Link to="/units/$id" params={{ id: invoice.unitId }}>
                    <Tooltip content={'View unit detail'}>
                      <Button isIconOnly variant="flat" color="primary">
                        <Building02Icon size={16} />
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
