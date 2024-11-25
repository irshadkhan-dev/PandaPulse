"use client";
import { Button } from "@/components/ui/button";
import { cn, GetDate } from "@/lib/utils";
import { DeleteCategory } from "lib/actions/user.actions";
import { ArrowRight, BarChart2, Clock, Trash2 } from "lucide-react";
import React from "react";

const DashEvents = ({ data }: { data: CategoryTableProps[] }) => {
  const { fullDate } = GetDate();
  return (
    <div className="bg-[#fafafa] flex w-full">
      <div className="flex gap-14 w-full">
        {data.map((c: CategoryTableProps) => (
          <div
            className="bg-white border border-gray-200 rounded-lg p-8 w-full"
            key={c.categoryId}
          >
            <div className="flex flex-col gap-6">
              <div className="flex gap-2 items-center">
                <div
                  className={cn(" w-10 h-10 rounded-full", {
                    "bg-amber-600": c.categoryName === "sale",
                    "bg-violet-600": c.categoryName === "signup",
                  })}
                ></div>

                <div className="flex flex-col text-sm">
                  <div className="flex">
                    <div>{c.categoryName === "sale" ? "💰" : "🙋‍♂️"}</div>
                    <div>{c.categoryName}</div>
                  </div>

                  <div className="text-gray-500">{fullDate}</div>
                </div>
              </div>

              <div className="flex flex-col gap-4 text-sm text-gray-600">
                <div className="flex gap-1">
                  <Clock className="h-5 w-5 text-brand-400" />
                  Last Ping: <span className="text-gray-500">{c.lastPing}</span>
                </div>
                <div className="flex gap-0.5">
                  <BarChart2 className="h-5 w-5 text-brand-400" />
                  Event this month: <span>{c.events}</span>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <Button
                  className="bg-white flex items-center gap-1 text-sm text-black border border-gray-200 rounded-lg"
                  variant={"gooeyLeft"}
                >
                  View all
                  <ArrowRight className="h-5 w-5" />
                </Button>

                <Button
                  className="bg-white"
                  variant={"gooeyLeft"}
                  size={"sm"}
                  onClick={async () => await DeleteCategory(c.categoryId!)}
                >
                  <Trash2 className="h-5 w-5 text-gray-500" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashEvents;
