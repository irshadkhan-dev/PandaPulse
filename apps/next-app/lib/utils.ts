import { EventInfoType } from "components/eventDataTable";
import crypto from "crypto";
export const hashApiKey = (apiKey: string) => {
  return crypto.createHash("sha256").update(apiKey).digest("hex");
};

import {
  startOfDay,
  endOfDay,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
} from "date-fns";

const now = new Date();

export const isToday = (date: any) =>
  date >= startOfDay(now) && date <= endOfDay(now);
export const isThisWeek = (date: any) =>
  date >= startOfWeek(now) && date <= endOfWeek(now);
export const isThisMonth = (date: any) =>
  date >= startOfMonth(now) && date <= endOfMonth(now);

export const calculateTotalAmount = (events: EventInfoType[]) =>
  events.reduce((total, event) => total + (event.fields.amount || 0), 0);

export const calculateTotalRevenue = (events: EventInfoType[]) =>
  events.reduce((total, event) => total + (event.fields.revenue || 0), 0);
