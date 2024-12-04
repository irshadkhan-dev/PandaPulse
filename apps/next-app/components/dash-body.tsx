"use client";
import React from "react";
import { Rocket, Loader2 } from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { GetAllCategory } from "lib/actions/user.actions";

import DashEvents from "./dash-events";
import DashHome from "./dash-home";

const DashboardBody = () => {
  const {
    isPending,
    isError,
    data: categoryData,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => await GetAllCategory(),
    select: (data: any) => data?.categoryTable || [],
  });

  if (isPending || !categoryData)
    return (
      <div className="w-full bg-white/5 backdrop-blur-lg transition-all z-[100] h-[70vh] flex items-center justify-center border border-gray-200 rounded-lg">
        <Loader2 className="animate-spin w-10 h-10 text-brand-700" />
      </div>
    );
  if (isError) return <div>Error fetching data</div>;
  console.log(categoryData);
  return (
    <div className="w-full h-[70vh] md:py-10 overflow-x-scroll">
      {categoryData && categoryData.length > 0 ? (
        <DashEvents data={categoryData} />
      ) : (
        <DashHome />
      )}
    </div>
  );
};

export default DashboardBody;
