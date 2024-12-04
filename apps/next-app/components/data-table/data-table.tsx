import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { EventInfoType } from "components/eventDataTable";
import React from "react";

const DataTable = ({ tableData }: { tableData: EventInfoType[] }) => {
  const field = tableData.map((t) => t.fields);

  const firstField: any = field[0];

  const filteredData = tableData.map(
    ({ id, createdAt, name, deliveryStatus, fields }) => ({
      id,
      createdAt,
      name,
      deliveryStatus,
      fields,
    })
  );

  return (
    <Table className="">
      <TableCaption>A list of recent events</TableCaption>
      <TableHeader className="">
        <TableRow className="">
          <TableHead className="md:py-4">Category</TableHead>
          <TableHead className="max-md:hidden">Date</TableHead>
          {Object.keys(firstField).map((key, index) => (
            <TableHead key={index}>{key}</TableHead>
          ))}
          <TableHead className="">Delivery Status</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody className="">
        {filteredData.map((t) => (
          <>
            <TableRow key={t.id}>
              <TableCell>{t.name}</TableCell>
              <TableCell className="md:py-4 max-md:hidden">
                {new Date(t.createdAt).toLocaleString("en-US", {
                  month: "short",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </TableCell>
              {Object.entries(t.fields).map(([key, value]) => (
                <TableCell key={key}>{String(value)}</TableCell>
              ))}
              <TableCell className="">{t.deliveryStatus}</TableCell>
            </TableRow>
          </>
        ))}
      </TableBody>
    </Table>
  );
};

export default DataTable;
