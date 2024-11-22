"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Rocket } from "lucide-react";
import Link from "next/link";
import { CreateQuickStartCategory } from "lib/actions/user.actions";
import { useMutation } from "@tanstack/react-query";

const DashboardBody = () => {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [categoryData, setCategoryData] = useState<CategoryTableProps[]>();

  const handleQucickStart = async () => {};

  return (
    <div className="w-full flex flex-col gap-4 items-center bg-white md:py-20 py-5 rounded border border-gray-200">
      {categoryData ? (
        <>
          <div>letss seee what happes</div>
        </>
      ) : (
        <>
          <div className="">
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
              onClick={() => handleQucickStart()}
            >
              <Rocket />
              {isLoading ? "Creating..." : "Quick Start"}
            </Button>
            <Button
              className="bg-brand-700  border border-brand-600 flex gap-2 items-center"
              variant={"gooeyLeft"}
            >
              Add Category
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default DashboardBody;
