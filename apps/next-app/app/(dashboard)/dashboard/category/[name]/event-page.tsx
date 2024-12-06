"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { GetAllEvents, getCategoryByName } from "lib/actions/user.actions";
import React, { useState } from "react";
import EmptyEventPage from "./emptyEventPage";
import LoadedEventPage from "./loadedEventPage";
import { Loader2 } from "lucide-react";

const EventPage = ({ eventName }: { eventName: string }) => {
  const { data, isPending, isError, err } = useQuery({
    queryKey: ["category"],
    queryFn: async () => await GetAllEvents(eventName),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  if (isError) return <div>{err}</div>;

  if (isPending)
    return (
      <div className="w-full bg-white/5 backdrop-blur-lg transition-all z-[100] h-full flex items-center justify-center border border-gray-200 rounded-lg">
        <Loader2 className="animate-spin w-10 h-10 text-brand-700" />
      </div>
    );

  return (
    <div className="w-full md:px-5 h-screen overflow-scroll">
      {data.length === 0 ? (
        <>
          <EmptyEventPage />
        </>
      ) : (
        <LoadedEventPage tableData={data} eventName={eventName} />
      )}
    </div>
  );
};

export default EventPage;
