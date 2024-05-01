import { memberAtom } from "@/app";
import {
  Avatar,
  Button,
  Navbar,
  NavbarBrand,
  NavbarContent,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react";
import { useNavigate } from "@tanstack/react-router";
import { Notification01Icon } from "hugeicons-react";
import { useAtomValue } from "jotai";
import { useTranslation } from "react-i18next";

function AppNavbar() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const member = useAtomValue(memberAtom);
  return (
    <Navbar className="uppercase bg-primary-50">
      <NavbarBrand
        className="cursor-pointer"
        onClick={() => navigate({ to: "/" })}
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
            <Button isIconOnly variant="light">
              <Notification01Icon />
            </Button>
            <Popover showArrow placement="bottom">
              <PopoverTrigger>
                <Avatar src={member.imgUrl} className="transition-transform" />
              </PopoverTrigger>
              <PopoverContent className="p-1">
                <Button>Sign Out</Button>
              </PopoverContent>
            </Popover>
          </div>
        ) : (
          <>
            <Button
              color="primary"
              variant="bordered"
              className="font-semibold"
              onClick={() => navigate({ to: "/auth/sign-in" })}
            >
              {t("button.sign-in")}
            </Button>
            <Button
              color="primary"
              variant="solid"
              className="font-semibold"
              onClick={() => navigate({ to: "/auth/sign-up" })}
            >
              {t("button.sign-up")}
            </Button>
          </>
        )}
      </NavbarContent>
    </Navbar>
  );
}

export default AppNavbar;
