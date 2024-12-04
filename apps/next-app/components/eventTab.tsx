import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";
import { ChartNoAxesColumnIncreasing } from "lucide-react";
import { EventInfoType } from "./eventDataTable";
import {
  calculateTotalAmount,
  calculateTotalRevenue,
  isThisMonth,
  isThisWeek,
  isToday,
} from "lib/utils";

const EventTab = ({ eventsData }: { eventsData: EventInfoType[] }) => {
  const todayEvents = eventsData.filter((event) => isToday(event.createdAt));
  const thisWeekEvents = eventsData.filter((event) =>
    isThisWeek(event.createdAt)
  );
  const thisMonthEvents = eventsData.filter((event) =>
    isThisMonth(event.createdAt)
  );

  const todayTotal = calculateTotalAmount(todayEvents);
  const thisWeekTotal = calculateTotalAmount(thisWeekEvents);
  const thisMonthTotal = calculateTotalAmount(thisMonthEvents);

  const todayRevenue = calculateTotalRevenue(todayEvents);
  const thisWeekRevenue = calculateTotalRevenue(thisWeekEvents);
  const thisMonthRevenue = calculateTotalRevenue(thisMonthEvents);

  return (
    <Tabs defaultValue="today" className="">
      <TabsList className="grid grid-cols-3 w-full max-w-sm">
        <TabsTrigger value="today">Today</TabsTrigger>
        <TabsTrigger value="week">This Week</TabsTrigger>
        <TabsTrigger value="month">This Month</TabsTrigger>
      </TabsList>

      <TabsContent value="today" className="max-w-xl">
        <div className="flex gap-5 w-full">
          <Card
            title="Total Events"
            date="Events Today"
            dynamicNumber={todayEvents.length}
          />
          <Card
            title={todayEvents[0]?.name}
            date="Today"
            dynamicNumber={todayTotal}
          />
        </div>
      </TabsContent>

      <TabsContent value="week" className="max-w-xl">
        <div className="flex gap-5 w-full">
          <Card
            title="Total Events"
            date="Events this week"
            dynamicNumber={thisWeekEvents.length}
          />
          <Card title="Amount" date="this week" dynamicNumber={thisWeekTotal} />
        </div>
      </TabsContent>

      <TabsContent value="month" className="max-w-xl">
        <div className="flex gap-5 w-full">
          <Card
            title="Total Events"
            date="Events this month"
            dynamicNumber={thisMonthEvents.length}
          />
          <Card
            title="Amount"
            date="this month"
            dynamicNumber={thisMonthTotal}
          />
        </div>
      </TabsContent>
    </Tabs>
  );
};

const Card = ({
  title,
  date,
  dynamicNumber,
}: {
  title?: string;
  date?: string;
  dynamicNumber?: number;
}) => {
  return (
    <div className="border border-gray-200 rounded-md bg-white px-4 py-4 w-full hover:border-brand-700">
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <span className="text-sm font-semibold">{title}</span>
          <ChartNoAxesColumnIncreasing />
        </div>

        <span className="text-2xl font-semibold">{dynamicNumber}</span>

        <span className="text-sm text-gray-400">{date}</span>
      </div>
    </div>
  );
};

export default EventTab;
