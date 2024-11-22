"use client";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import React from "react";
import { ArrowLeft, Plus } from "lucide-react";

const DashboardHeader = () => {
  const path = usePathname();
  const pathName = path
    .replace("/", "")
    .replace(/^./, (char) => char.toUpperCase());

  return (
    <>
      <div className="w-full flex items-center p-2 gap-5">
        <div className="bg-white px-4 py-2 rounded border border-gray-200 shadow-sm">
          <ArrowLeft className="h-4 w-4 flex-shrink-0" />
        </div>
        <span className="md:text-4xl text-2xl">{pathName}</span>
        <Button className="flex gap-2 bg-brand-700" variant={"gooeyLeft"}>
          <Plus className="h-4 w-4 flex-shrink-0" />
          Add Category
        </Button>
      </div>
      <div className="w-full h-px bg-gray-200" />
    </>
  );
};

export default DashboardHeader;
