"use client";
import { Button } from "@/components/ui/button";
import { CreateCategory } from "lib/actions/user.actions";
import { Rocket } from "lucide-react";
import Image from "next/image";
import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import AddCatModal from "./addCatModal";

const DashHome = () => {
  const queryClient = useQueryClient();

  const { mutate: quickStart, isPending: isLoading } = useMutation({
    mutationFn: async (category: CreateCategoryType[]) => {
      return await CreateCategory(category);
    },

    onSuccess: (newCategory: any) => {
      // Invalidate and refetch the categories query
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: (error: any) => {
      console.error("Error creating category:", error);
      // Here you could also add toast notification for error
    },
  });

  const onClickQuickStart = (category: CreateCategoryType[]) => {
    quickStart(
      category.map((cat) => ({
        ...cat,
      }))
    );
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
          onClick={() =>
            onClickQuickStart([
              { categoryName: "sale" },
              { categoryName: "signup" },
            ])
          }
        >
          <Rocket />
          {isLoading ? "Creating.." : "QuickStart"}
        </Button>
        <AddCatModal />
      </div>
    </div>
  );
};

export default DashHome;
