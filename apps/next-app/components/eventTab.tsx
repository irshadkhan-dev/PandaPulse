import React, { useMemo } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChartNoAxesColumnIncreasing } from "lucide-react";
import {
  startOfDay,
  endOfDay,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
} from "date-fns";

interface EventInfoType {
  id: string;
  createdAt: Date | string;
  fields: {
    amount?: number;
    revenue?: number;
  };
}

export type EventNameType = {
  eventName: "sale" | "signup" | "revenue";
};

interface CardProps {
  title: string;
  date: string;
  dynamicNumber: number | string;
  icon?: React.ReactNode;
}

const filterEventsByPeriod = (
  events: EventInfoType[],
  periodFilter: (date: Date | string) => boolean
): EventInfoType[] => {
  return events.filter((event) => periodFilter(new Date(event.createdAt)));
};

const calculateMetrics = (
  events: EventInfoType[],
  metricType: "amount" | "count" | "revenue"
): number => {
  console.log(events);
  switch (metricType) {
    case "amount":
      return events.reduce((sum, event) => sum + (event.fields.amount || 0), 0);
    case "revenue":
      return events.reduce(
        (sum, event) => sum + (event.fields.revenue || 0),
        0
      );
    case "count":
      return events.length;
    default:
      return 0;
  }
};

const MetricCard: React.FC<CardProps> = ({
  title,
  date,
  dynamicNumber,
  icon,
}) => {
  return (
    <div className="border border-gray-200 rounded-md bg-white px-4 py-4 w-full hover:border-brand-700 transition-colors duration-200">
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <span className="text-sm font-semibold text-gray-700">{title}</span>
          {icon || <ChartNoAxesColumnIncreasing className="text-gray-500" />}
        </div>

        <span className="text-2xl font-semibold text-gray-900">
          {dynamicNumber}
        </span>

        <span className="text-sm text-gray-400">{date}</span>
      </div>
    </div>
  );
};

// Date filtering utility functions
const now = new Date();
const isToday = (date: Date | string) =>
  new Date(date) >= startOfDay(now) && new Date(date) <= endOfDay(now);

const isThisWeek = (date: Date | string) =>
  new Date(date) >= startOfWeek(now) && new Date(date) <= endOfWeek(now);

const isThisMonth = (date: Date | string) =>
  new Date(date) >= startOfMonth(now) && new Date(date) <= endOfMonth(now);

// Main Event Tab Component with Improved Logic
const EventTab: React.FC<{
  eventsData: EventInfoType[];
  eventName: "sale" | "signup" | "revenue";
}> = ({ eventsData, eventName }) => {
  // Memoized event filtering to prevent unnecessary recalculations
  const eventGroups = useMemo(() => {
    return {
      today: filterEventsByPeriod(eventsData, isToday),
      thisWeek: filterEventsByPeriod(eventsData, isThisWeek),
      thisMonth: filterEventsByPeriod(eventsData, isThisMonth),
    };
  }, [eventsData]);

  // Memoized metric calculations
  const metrics = useMemo(() => {
    const calculateMetricForPeriod = (events: EventInfoType[]) => {
      switch (eventName) {
        case "sale":
          return calculateMetrics(events, "amount");
        case "signup":
          return calculateMetrics(events, "count");
        case "revenue":
          return calculateMetrics(events, "revenue");
        default:
          return 0;
      }
    };

    return {
      today: {
        eventCount: eventGroups.today.length,
        metric: calculateMetricForPeriod(eventGroups.today),
      },
      thisWeek: {
        eventCount: eventGroups.thisWeek.length,
        metric: calculateMetricForPeriod(eventGroups.thisWeek),
      },
      thisMonth: {
        eventCount: eventGroups.thisMonth.length,
        metric: calculateMetricForPeriod(eventGroups.thisMonth),
      },
    };
  }, [eventName, eventGroups]);

  console.log(metrics);

  // Metric title mapping
  const getMetricTitle = () => {
    switch (eventName) {
      case "sale":
        return "Amount";
      case "signup":
        return "Total Signup";
      case "revenue":
        return "Revenue";
      default:
        return "Metric";
    }
  };

  return (
    <Tabs defaultValue="today" className="w-full">
      <TabsList className="grid grid-cols-3 w-full max-w-sm">
        <TabsTrigger value="today">Today</TabsTrigger>
        <TabsTrigger value="week">This Week</TabsTrigger>
        <TabsTrigger value="month">This Month</TabsTrigger>
      </TabsList>

      {(["today", "week", "month"] as const).map((period) => {
        const periodKey =
          period === "today"
            ? "today"
            : period === "week"
              ? "thisWeek"
              : "thisMonth";

        const { eventCount, metric } = metrics[periodKey];
        console.log(eventCount, metric);
        const periodLabel =
          period === "today"
            ? "Today"
            : period === "week"
              ? "This Week"
              : "This Month";

        return (
          <TabsContent key={period} value={period} className="max-w-xl">
            <div className="flex gap-5 w-full">
              <MetricCard
                title="Total Events"
                date={`Events ${periodLabel.toLowerCase()}`}
                dynamicNumber={eventCount}
              />
              <MetricCard
                title={getMetricTitle()}
                date={periodLabel}
                dynamicNumber={metric}
              />
            </div>
          </TabsContent>
        );
      })}
    </Tabs>
  );
};

export default EventTab;
