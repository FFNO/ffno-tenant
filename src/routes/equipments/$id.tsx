import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/equipments/$id')({
  component: () => <div>Hello /equipments/$id!</div>,
});
