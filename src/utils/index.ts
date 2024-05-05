import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const vndFormatter = Intl.NumberFormat("vi-VN", {
  currency: "VND",
  style: "currency",
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
