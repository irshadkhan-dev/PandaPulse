"use client";

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
import { Button } from "@/components/ui/button";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateCategory } from "lib/actions/user.actions";
import { useToast } from "@/hooks/use-toast";

const FormSchema = z.object({
  categoryName: z.string(),
});

const AddCatModal = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      categoryName: "",
    },
  });

  const { mutate, isError, isPending } = useMutation({
    mutationFn: async (categoryName: CreateCategoryType[]) => {
      return await CreateCategory(categoryName);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    const categoryName = [data];
    mutate(categoryName);
  };

  if (isError) {
    toast({
      title: "Error Creating Events",
      description: "Try again creating Events",
      variant: "destructive",
    });
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
