"use client";
import { Button } from "@/components/ui/button";
import { CreateCategory } from "lib/actions/user.actions";
import { Rocket } from "lucide-react";
import Image from "next/image";
import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import AddCatModal from "./addCatModal";
import { useToast } from "@/hooks/use-toast";

type CreateCategoryType = {
  categoryName: string;
};

const DashHome: React.FC = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const {
    mutate: quickStart,
    isPending: isLoading,
    isError,
    error,
  } = useMutation({
    mutationFn: async (categories: CreateCategoryType[]) => {
      try {
        const result = await CreateCategory(categories);
        return result;
      } catch (err) {
        console.error("Category creation error:", err);
        throw err;
      }
    },
    onSuccess: (newCategory: any) => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });

      toast({
        title: "Categories Created",
        description: "Quick start categories have been added successfully!",
        variant: "default",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Category Creation Failed",
        description:
          error?.message || "Unable to create categories. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onClickQuickStart = () => {
    const defaultCategories: CreateCategoryType[] = [
      { categoryName: "sale" },
      { categoryName: "signup" },
    ];

    quickStart(defaultCategories);
  };

  return (
    <div className="bg-white rounded border border-gray-200 flex flex-col gap-4 items-center h-[60vh] justify-center">
      <div>
        <Image
          src="/icons/pandaWave.png"
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
          disabled={isLoading}
          onClick={onClickQuickStart}
          className="flex gap-2 items-center"
        >
          <Rocket />
          {isLoading ? "Creating.." : "QuickStart"}
        </Button>

        <AddCatModal />
      </div>

      {isError && (
        <div className="text-red-500 text-sm mt-2">
          {error instanceof Error
            ? error.message
            : "An unexpected error occurred"}
        </div>
      )}
    </div>
  );
};

export default DashHome;
