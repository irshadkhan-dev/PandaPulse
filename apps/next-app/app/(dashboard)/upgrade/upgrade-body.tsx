"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  GetAllCategory,
  GetEvents,
  getUserData,
} from "lib/actions/user.actions";
import { ChartNoAxesColumnIncreasing, Divide, ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";

const UpgradeBody = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["userData"],
    queryFn: async () => await getUserData(),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  if (isError) return <div>Error loading data</div>;
  if (isLoading) return <div>loading...</div>;

  const startDate = data[0].createdAt;
  const oneMonthLater = new Date(startDate);
  oneMonthLater.setMonth(startDate.getMonth() + 1);
  const date = oneMonthLater.toDateString();

  return (
    <div>
      {data[0].plan === "free" ? (
        <>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-1">
              <span className="text-gray-500 text-sm md:text-xl">
                Plan: {data[0].plan}
              </span>
              <span className="text-gray-500 text-sm">
                Get accessto more events, categories and premium support.
              </span>
            </div>

            <div className="flex gap-6 max-w-xl max-md:flex-col">
              <Card
                title="Total Events"
                max={100}
                occured={data[0].events.length}
                footerMsg="Events this period"
              />

              <Card
                title="Events Categories"
                max={3}
                occured={data[0].categories.length}
                footerMsg="Active Categories"
              />
            </div>

            <div className="text-sm text-gray-500 flex">
              Usage will reset {date},{" "}
              <Link href={"/pricing"}>
                <span className="text-brand-500 flex items-center">
                  or upgrade now to increase your limmit
                  <ArrowRight className="h-3 w-3" />
                </span>
              </Link>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-1">
              <span className="text-gray-500 text-sm md:text-xl">
                Plan: {data[0].plan}
              </span>
              <span className="text-gray-500 text-sm">
                Get accessto more events, categories and premium support.
              </span>
            </div>

            <div className="flex gap-6 max-w-xl max-md:flex-col">
              <Card
                title="Total Events"
                max={1000}
                occured={data[0].events.length}
                footerMsg="Events this period"
              />

              <Card
                title="Events Categories"
                max={3}
                occured={data[0].categories.length}
                footerMsg="Active Categories"
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

const Card = ({
  title,
  max,
  occured,
  footerMsg,
}: {
  title: string;
  max: number;
  occured: number;
  footerMsg: string;
}) => {
  return (
    <div className="border border-gray-200 rounded-md w-full bg-white px-4 py-4 hover:border-brand-700">
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <span className="text-sm font-semibold">{title}</span>
          <ChartNoAxesColumnIncreasing />
        </div>

        <div className="">
          {occured} of {max}
        </div>

        <span className="text-sm text-gray-400">{footerMsg}</span>
      </div>
    </div>
  );
};

export default UpgradeBody;
