"use client";
import React from "react";
import { Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { GetAllCategory } from "lib/actions/user.actions";

import DashEvents from "./dash-events";
import DashHome from "./dash-home";
import { useToast } from "@/hooks/use-toast";

const DashboardBody: React.FC = () => {
  const { toast } = useToast();

  const {
    isPending,
    isError,
    error,
    data: categoryData,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => await GetAllCategory(),
    select: (data: any) => data?.categoryTable || [],

    refetchOnWindowFocus: true, // Refetch when window regains focus
  });

  // Loading state component for better reusability
  const LoadingSpinner = () => (
    <div className="w-full bg-white/5 backdrop-blur-lg transition-all z-[100] h-[70vh] flex items-center justify-center border border-gray-200 rounded-lg">
      <Loader2 className="animate-spin w-10 h-10 text-brand-700" />
    </div>
  );

  // Error handling component
  const ErrorDisplay = () => {
    React.useEffect(() => {
      toast({
        title: "Failed to Fetch Categories",
        description:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    }, [error]);

    return (
      <div className="w-full h-[70vh] flex items-center justify-center text-red-500">
        <p>Error loading dashboard. Please refresh or try again later.</p>
      </div>
    );
  };

  // Handle loading state
  if (isPending) return <LoadingSpinner />;

  // Handle error state
  if (isError) return <ErrorDisplay />;

  // Handle empty data scenario
  if (!categoryData || categoryData.length === 0) {
    return <DashHome />;
  }

  // Successful data rendering
  return (
    <div className="w-full h-[70vh] md:py-10 overflow-x-scroll">
      <DashEvents data={categoryData} />
    </div>
  );
};

export default DashboardBody;
