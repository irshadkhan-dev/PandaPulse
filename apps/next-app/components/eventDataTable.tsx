"use client";
import React from "react";

import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "./data-table/data-table";

export type CategoryInfoType = {
  id: string;
  name: string;
  amount: string;
  clientUserEmail: string;
  deliveryStatus: string;
};

const EventDataTable = ({ tableData }: { tableData: CategoryInfoType }) => {
  const data: CategoryInfoType[] = [{ ...tableData }];
  console.log(data);
  const columns: ColumnDef<CategoryInfoType>[] = [
    {
      accessorKey: data[0]!.name,
      header: data[0]!.name,
    },
    {
      accessorKey: data[0]!.amount,
      header: data[0]?.amount,
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      <div>
        <span className="text-4xl font-semibold">Event Overview</span>
      </div>

      <div>
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
};

export default EventDataTable;
