"use client";
import { Button } from "@/components/ui/button";
import { CreateQuickStartCategory } from "lib/actions/user.actions";
import { Rocket } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

const DashHome = () => {
  const [isLoading, setIsLoading] = useState(false);
  const onClickQuickStart = async () => {
    try {
      setIsLoading(true);
      const createCategory = await CreateQuickStartCategory();
    } catch (error) {
      console.error("Error creating category:", error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="bg-white rounded border border-gray-200 flex flex-col gap-4 items-center">
      <div>
        <Image
          src={"/icons/pandaWave.png"}
          alt="panda waving"
          width={300}
          height={300}
        />
      </div>
      <div className="flex flex-col gap-2 text-base text-center">
        <span className="font-medium">No Event Categories Yet</span>
        <span className="text-sm text-gray-500">
          Start tracking events by creating your first category.
        </span>
      </div>
      <div className="flex gap-5 pt-4">
        <Button
          className="flex gap-2 items-center border border-gray-300 p-1 rounded"
          onClick={onClickQuickStart}
        >
          <Rocket />
          {isLoading ? "Creating.." : "QuickStart"}
        </Button>
        <Button
          className="bg-brand-700  border border-brand-600 flex gap-2 items-center"
          variant={"gooeyLeft"}
        >
          Add Category
        </Button>
      </div>
    </div>
  );
};

export default DashHome;
