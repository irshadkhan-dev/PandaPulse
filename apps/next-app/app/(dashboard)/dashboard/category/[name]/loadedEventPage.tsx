import EventDataTable, { EventInfoType } from "components/eventDataTable";
import EventTab from "components/eventTab";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

const LoadedEventPage = ({ tableData }: { tableData: EventInfoType[] }) => {
  return (
    <div className="w-full bg-[#fafafa] h-screen pt-4 md:pt-10">
      <div className="flex flex-col gap-10 w-full px-5">
        <div className="w-full flex items-center p-2 gap-7">
          <Link href={"/dashboard"}>
            <div className="bg-white px-6 py-3 rounded border border-gray-200 shadow-sm flex items-center">
              <ArrowLeft className="h-4 w-4 flex-shrink-0" />
            </div>
          </Link>

          <span className="md:text-4xl text-2xl">💰 Sale Events</span>
        </div>
        <div className="w-full h-px bg-gray-200" />

        <div className="w-full flex flex-col gap-14">
          <EventTab eventsData={tableData} />
          <EventDataTable tableData={tableData} />
        </div>
      </div>
    </div>
  );
};

export default LoadedEventPage;
