"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getCategoryByName } from "lib/actions/user.actions";
import React, { useState } from "react";
import EmptyEventPage from "./emptyEventPage";
import LoadedEventPage from "./loadedEventPage";

const EventPage = ({ categoryName }: { categoryName: string }) => {
  const { data, isPending, isError, err } = useQuery({
    queryKey: ["category"],
    queryFn: async () => {
      return await getCategoryByName(categoryName);
    },
  });
  if (data) {
    console.log(data);
  }

  if (isError) return <div>{err}</div>;

  if (isPending) return <div>hii</div>;

  if (data) {
    const { lastPing, events, createdAt, updatedAt, userId, ...tableData } =
      data;
    console.log(tableData);
    return (
      <div className="w-full">
        {data.events === 0 ? (
          <>
            <EmptyEventPage />
          </>
        ) : (
          <>
            <LoadedEventPage tableData={tableData} />
          </>
        )}
      </div>
    );
  }
};

export default EventPage;
