import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/chat/')({
  component: Page,
});

function Page() {
  return <>{/* <Sidebar /> */}</>;
}
