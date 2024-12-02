"use client";
import { Button } from "@/components/ui/button";
import { cn, GetDate } from "@/lib/utils";
import { DeleteCategory } from "lib/actions/user.actions";
import { ArrowRight, BarChart2, Clock, Trash2 } from "lucide-react";
import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";

type ContextType = {
  previousData: unknown;
};

const DashEvents = ({ data }: { data: CategoryTableProps[] }) => {
  const queryClient = useQueryClient();
  const { fullDate } = GetDate();
  const { mutate, isError, err } = useMutation({
    mutationFn: async (categoryId: string) => await DeleteCategory(categoryId),
    onMutate: async (categoryId: string) => {
      await queryClient.cancelQueries({ queryKey: ["categories"] });

      //this gets the query data which is cached
      const previousData = await queryClient.getQueryData({
        queryKey: ["categories"],
      });

      // this function will filter out the categories which should not be deleted and set it to queries removing the category which should be deleted
      queryClient.setQueryData(
        ["categories"],
        (old: { categoryTable: CategoryTableProps[] } | undefined) => {
          if (!old) return old;
          return {
            ...old,
            categoryTable: old?.categoryTable.filter(
              (category) => category.id !== categoryId
            ),
          };
        }
      );

      return { previousData };
    },

    onError: (err: any, categoryId: string, context: ContextType) => {
      queryClient.setQueryData(["categories"], context?.previousData);
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });

  if (isError) return <div>{err}</div>;
  return (
    <div className="bg-[#fafafa] w-full">
      <div className="flex max-md:flex-col gap-8 md:gap-14 flex-wrap items-center">
        {data.map((c: CategoryTableProps) => (
          <div
            className="bg-white border border-gray-200 rounded-lg p-8 md:px-14 w-80 md:w-96"
            key={c.id}
          >
            <div className="flex flex-col gap-6">
              <div className="flex gap-2 items-center">
                <div
                  className={cn(" w-10 h-10 rounded-full", {
                    "bg-amber-600": c.name === "sale",
                    "bg-violet-600": c.name === "signup",
                    "bg-cyan-600": c.name === "revenue",
                  })}
                ></div>

                <div className="flex flex-col text-sm">
                  <div className="flex">
                    <div>
                      {c.name === "sale"
                        ? "💰"
                        : c.name === "signup"
                          ? "🙋‍♂️"
                          : c.name === "revenue"
                            ? "🚀"
                            : ""}
                    </div>
                    <div>{c.name}</div>
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
                <Link
                  href={`/dashboard/category/${c.name}`}
                  className="bg-white flex items-center gap-1 text-sm text-black border border-gray-200 rounded-lg p-2"
                >
                  View all
                  <ArrowRight className="h-5 w-5" />
                </Link>

                <Button
                  className="bg-white"
                  variant={"gooeyLeft"}
                  size={"sm"}
                  onClick={() => mutate(c.id!)}
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
