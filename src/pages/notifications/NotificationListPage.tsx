import { useList } from '@/api';
import { axiosInstance } from '@/api/utils';
import { INotificationResDto } from '@/libs';
import { formatDate } from '@/libs/helpers';
import { Badge, Button, Card } from '@nextui-org/react';
import { useNavigate, useRouter } from '@tanstack/react-router';

export function NotificationListPage() {
  const router = useRouter();
  const navigate = useNavigate();

  const { data } = useList<INotificationResDto>({ resource: 'notifications' });

  const handleNavigate = async (data: INotificationResDto) => {
    await axiosInstance.put(`notification/mark-as-read/${data.id}`);

    if (data.requestId) {
      navigate({ to: '/requests/$id', params: { id: data.requestId } });
    }
    if (data.contractId) {
      navigate({ to: '/contracts/$id', params: { id: data.contractId } });
    }
  };

  const handleReadAll = async () => {
    await axiosInstance.put('notifications/mark-as-read');
    router.invalidate();
  };

  return (
    <div className="px-8 py-4">
      <div className="w-full inline-flex items-center justify-between">
        <p className="text-lg font-semibold">Notifications</p>
        <div className="flex-1" />
        <Button onClick={() => handleReadAll()}>Mark all as read</Button>
      </div>

      <div className="flex flex-col gap-4">
        {data?.data.map((notification) => (
          <Badge key={notification.id}>
            <Card>
              <div className="inline-flex items-center">
                <div className="flex flex-1 flex-col">
                  <p className="text-lg font-semibold">{notification.title}</p>
                  <p>{notification.content}</p>
                </div>
                <p>{formatDate(notification.createdAt)}</p>
                <Button onClick={() => handleNavigate(notification)}>
                  View detail
                </Button>
              </div>
            </Card>
          </Badge>
        ))}
      </div>
    </div>
  );
}
