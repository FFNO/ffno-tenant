import { axiosInstance } from '@/api/utils';
import { memberAtom } from '@/app';
import { IMemberResDto } from '@/libs';
import {
  Avatar,
  Button,
  Navbar,
  NavbarBrand,
  NavbarContent,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Tooltip,
} from '@nextui-org/react';
import { useNavigate } from '@tanstack/react-router';
import { InboxIcon, Message01Icon, Notification01Icon } from 'hugeicons-react';
import { useAtom } from 'jotai';
import { useTranslation } from 'react-i18next';

function AppNavbar() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [member, setMember] = useAtom(memberAtom);

  const handleSignOut = async () => {
    setMember({} as IMemberResDto);
    await axiosInstance.delete('/auth/sign-out');
    navigate({ to: '/auth/sign-in' });
  };
  return (
    <Navbar className="uppercase bg-primary-50">
      <NavbarBrand
        className="cursor-pointer"
        onClick={() => navigate({ to: '/' })}
      >
        <p className="font-bold text-inherit mr-8">FFNO</p>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="start">
        {/* <NavbarItem>Properties</NavbarItem>
          <NavbarItem>Units</NavbarItem> */}
      </NavbarContent>
      <NavbarContent justify="end">
        {member.id ? (
          <div className="flex flex-row gap-4">
            <Tooltip content="Chat">
              <Button
                isIconOnly
                variant="light"
                onClick={() => navigate({ to: '/chat' })}
              >
                <Message01Icon />
              </Button>
            </Tooltip>
            <Tooltip content="Requests">
              <Button
                isIconOnly
                variant="light"
                onClick={() => navigate({ to: '/requests' })}
              >
                <InboxIcon />
              </Button>
            </Tooltip>
            <Tooltip content="Notifications">
              <Button isIconOnly variant="light">
                <Notification01Icon />
              </Button>
            </Tooltip>
            <Popover showArrow placement="bottom">
              <PopoverTrigger>
                <Avatar src={member.imgUrl} className="transition-transform" />
              </PopoverTrigger>
              <PopoverContent className="p-1">
                <Button onClick={() => handleSignOut()}>Sign Out</Button>
              </PopoverContent>
            </Popover>
          </div>
        ) : (
          <>
            <Button
              color="primary"
              variant="bordered"
              className="font-semibold"
              onClick={() => navigate({ to: '/auth/sign-in' })}
            >
              {t('button.sign-in')}
            </Button>
            <Button
              color="primary"
              variant="solid"
              className="font-semibold"
              onClick={() => navigate({ to: '/auth/sign-up' })}
            >
              {t('button.sign-up')}
            </Button>
          </>
        )}
      </NavbarContent>
    </Navbar>
  );
}

export default AppNavbar;
