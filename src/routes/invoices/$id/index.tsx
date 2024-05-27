import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/invoices/$id/')({
  component: () => <div>Hello /invoices/$id/!</div>,
});
