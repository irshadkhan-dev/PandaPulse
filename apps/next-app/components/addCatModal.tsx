"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { Circle } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateCategory } from "lib/actions/user.actions";

const colorTypee = ["red", "yellow", "green", "blue"] as const;
const emojiTypee = ["🙋‍♂️", "💰", "🚀"] as const;

const FormSchema = z.object({
  categoryName: z.string(),
});

const AddCatModal = () => {
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      categoryName: "",
    },
  });

  const { mutate, isError, err, isPending } = useMutation({
    mutationFn: async (categoryName: CreateCategoryType[]) => {
      console.log(categoryName);
      return await CreateCategory(categoryName);
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

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    const categoryName = [data];

    mutate(categoryName);
  };

  if (isError) {
    <div>error craeting events {err}</div>;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Dialog>
          <DialogTrigger asChild>
            <Button>Add category</Button>
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>New Event Category</DialogTitle>
              <DialogDescription>
                Create a new category to organize your events.
              </DialogDescription>
            </DialogHeader>

            <FormField
              control={form.control}
              name="categoryName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="eg: signup or sale" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <DialogFooter className="bg-brand-50 py-7 rounded flex items-center">
              <div className="mr-5 flex items-center gap-5">
                <DialogTrigger asChild>
                  <Button className="bg-brand-700" size={"lg"}>
                    Cancel
                  </Button>
                </DialogTrigger>
                <Button
                  size={"lg"}
                  type="submit"
                  className="bg-brand-700"
                  variant={"gooeyLeft"}
                  onClick={form.handleSubmit(onSubmit)}
                  disabled={isPending}
                >
                  {isPending ? "Creating event..." : "Create Event"}
                </Button>
              </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </form>
    </Form>
  );
};

export default AddCatModal;
