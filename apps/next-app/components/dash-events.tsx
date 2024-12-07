"use client";
import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn, GetDate } from "@/lib/utils";
import { DeleteCategory } from "lib/actions/user.actions";
import { ArrowRight, BarChart2, Clock, Trash2 } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";

// Type definitions
type CategoryTableProps = {
  id?: string;
  name: string;
  lastPing: string;
};

type ContextType = {
  previousData: unknown;
};

const DashEvents = ({ data }: { data: CategoryTableProps[] }) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { fullDate } = GetDate();

  const { mutate, isError, error } = useMutation({
    // Category deletion mutation
    mutationFn: async (categoryId: string) => await DeleteCategory(categoryId),

    // Optimistic update
    onMutate: async (categoryId: string) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: ["categories"] });

      // Snapshot the previous data
      const previousData = queryClient.getQueryData(["categories"]);

      // Optimistically update the cache
      queryClient.setQueryData(
        ["categories"],
        (old: { categoryTable: CategoryTableProps[] } | undefined) => {
          if (!old) return old;
          return {
            ...old,
            categoryTable: old.categoryTable.filter(
              (category) => category.id !== categoryId
            ),
          };
        }
      );

      return { previousData };
    },

    // Error handling
    onError: (err: any, categoryId: string, context: ContextType) => {
      // Rollback to previous data on error
      queryClient.setQueryData(["categories"], context?.previousData);

      // Show error toast
      toast({
        title: "Failed to Delete Category",
        description:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred",
        variant: "destructive",
      });
    },

    // Always invalidate queries to ensure fresh data
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });

  // Category color mapping
  const getCategoryColor = (name: string) => {
    switch (name) {
      case "sale":
        return "bg-amber-600";
      case "signup":
        return "bg-violet-600";
      case "revenue":
        return "bg-cyan-600";
      default:
        return "bg-gray-600";
    }
  };

  // Category emoji mapping
  const getCategoryEmoji = (name: string) => {
    switch (name) {
      case "sale":
        return "💰";
      case "signup":
        return "🙋‍♂️";
      case "revenue":
        return "🚀";
      default:
        return "📊";
    }
  };

  return (
    <div className="bg-[#fafafa] w-full">
      <div className="flex max-md:flex-col gap-8 md:gap-14 flex-wrap items-center">
        {data.map((category: CategoryTableProps) => (
          <div
            className="bg-white border border-gray-200 rounded-lg p-8 md:px-14 w-80 md:w-96"
            key={category.id}
          >
            <div className="flex flex-col gap-6">
              {/* Category Header */}
              <div className="flex gap-2 items-center">
                <div
                  className={cn(
                    "w-10 h-10 rounded-full",
                    getCategoryColor(category.name)
                  )}
                ></div>

                <div className="flex flex-col text-sm">
                  <div className="flex items-center gap-1">
                    <span>{getCategoryEmoji(category.name)}</span>
                    <span>{category.name}</span>
                  </div>

                  <div className="text-gray-500">{fullDate}</div>
                </div>
              </div>

              {/* Category Details */}
              <div className="flex flex-col gap-4 text-sm text-gray-600">
                <div className="flex gap-1 items-center">
                  <Clock className="h-5 w-5 text-brand-400" />
                  Last Ping:{" "}
                  <span className="text-gray-500">{category.lastPing}</span>
                </div>
                <div className="flex gap-1 items-center">
                  <BarChart2 className="h-5 w-5 text-brand-400" />
                  Events this month: <span>10</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-between items-center">
                <Link
                  href={`/dashboard/category/${category.name}`}
                  className="bg-white flex items-center gap-1 text-sm text-black border hover:border-brand-700 border-gray-200 rounded-lg p-2"
                >
                  View all
                  <ArrowRight className="h-5 w-5" />
                </Link>

                <Button
                  className="bg-white"
                  variant="gooeyLeft"
                  size="sm"
                  onClick={() => category.id && mutate(category.id)}
                >
                  <Trash2 className="h-5 w-5 text-gray-500 hover:text-red-500" />
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
