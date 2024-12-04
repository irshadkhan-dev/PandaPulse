"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { GetAllEvents, getCategoryByName } from "lib/actions/user.actions";
import React, { useState } from "react";
import EmptyEventPage from "./emptyEventPage";
import LoadedEventPage from "./loadedEventPage";

const EventPage = ({ eventName }: { eventName: string }) => {
  const { data, isPending, isError, err } = useQuery({
    queryKey: ["category"],
    queryFn: async () => await GetAllEvents(eventName),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  if (isError) return <div>{err}</div>;

  if (isPending) return <div>hii</div>;

  return (
    <div className="w-full md:px-5 pb-32">
      {data.length === 0 ? (
        <>
          <EmptyEventPage />
        </>
      ) : (
        <LoadedEventPage tableData={data} />
      )}
    </div>
  );
};

export default EventPage;
