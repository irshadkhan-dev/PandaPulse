import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateCategory } from "lib/actions/user.actions";
import React from "react";

type CreateCategoryProps = {
  categoryName: string;
};

const AddCatogoryBtn = () => {
  const queryClient = useQueryClient();

  const onClickCreate = () => {
    try {
      const {} = useMutation({
        mutationFn: async (categories: CreateCategoryType[]) => {
          return await CreateCategory(categories);
        },

        onMutate: async () => {
          await queryClient.cancelQueries({ queryKey: ["categories"] });

          const previousData = await queryClient.getQueryData({
            queryKey: ["categories"],
          });

          queryClient.setQueryData(["categories"], (old: {categoryTable: CategoryTableProps[]} | undefined) => {
            return {
                ...old,
                categoryTable: old?.categoryTable.
            }
          })
        },
      });
    } catch (error) {}
  };
  return <div>AddCatogoryBtn</div>;
};

export default AddCatogoryBtn;
