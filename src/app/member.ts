import { MemberResDto } from "@/types";
import { atomWithStorage } from "jotai/utils";

export const memberAtom = atomWithStorage(
  "member",
  JSON.parse(localStorage.getItem("member") || "{}") as MemberResDto
);
