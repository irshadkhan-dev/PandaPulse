import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export const GetDate = () => {
  const monthName = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const date = new Date();

  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear().toString().slice(2);
  const fullDate = `${monthName[month]} ${day}, ${year}`;
  return { fullDate };
};
