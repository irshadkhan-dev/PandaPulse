import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";
import { ChartNoAxesColumnIncreasing } from "lucide-react";

const EventTab = () => {
  return (
    <Tabs defaultValue="today" className="">
      <TabsList className="grid grid-cols-3 w-full max-w-sm">
        <TabsTrigger value="today">Today</TabsTrigger>
        <TabsTrigger value="week">This Week</TabsTrigger>
        <TabsTrigger value="month">This Month</TabsTrigger>
      </TabsList>

      <TabsContent value="today" className="max-w-xl">
        <div className="flex gap-5 w-full">
          <Card title="Total Events" date="Events Today" dynamicNumber={1} />
          <Card title="Amount" date="Today" dynamicNumber={20.0} />
        </div>
      </TabsContent>

      <TabsContent value="week" className="max-w-xl">
        <div className="flex gap-5 w-full">
          <Card
            title="Total Events"
            date="Events this week"
            dynamicNumber={1}
          />
          <Card title="Amount" date="this week" dynamicNumber={20.0} />
        </div>
      </TabsContent>

      <TabsContent value="month" className="max-w-xl">
        <div className="flex gap-5 w-full">
          <Card
            title="Total Events"
            date="Events this month"
            dynamicNumber={1}
          />
          <Card title="Amount" date="this month" dynamicNumber={20.0} />
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
