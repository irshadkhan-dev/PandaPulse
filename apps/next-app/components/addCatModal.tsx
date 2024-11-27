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

const colorTypee = ["red", "yellow", "green", "blue"] as const;
const emojiTypee = ["🙋‍♂️", "💰", "🚀"] as const;

const FormSchema = z.object({
  eventType: z.enum(["signup", "sale", "revenue"], {
    required_error: "You only create signup, sale and revenue event for now.",
  }),

  colorType: z.enum(colorTypee, {
    required_error: "You need to select one color type",
  }),

  emojiType: z.enum(emojiTypee, {
    required_error: "Select emoji related to event.",
  }),
});

console.log(colorTypee.map((c) => c === "red"));

const onSubmit = () => {};

const AddCatModal = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });
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
              name="eventType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="eg: signup or sale" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="colorType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Color</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <div className="flex items-center gap-4 ">
                        {colorTypee.map((c) => (
                          <FormItem key={c}>
                            <FormControl>
                              <RadioGroupItem
                                value={c}
                                className={cn(
                                  `w-10 h-10 bg-${c}-500 border-none`
                                )}
                              />
                            </FormControl>
                          </FormItem>
                        ))}
                      </div>
                    </RadioGroup>
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              name="emojiType"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Emoji</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <div className="flex items-center gap-4">
                        {emojiTypee.map((e) => (
                          <FormItem key={e}>
                            <FormControl>
                              <RadioGroupItem
                                value={e}
                                className="bg-brand-50 h-10 w-10 rounded border-none"
                              >
                                <div className="text-xl items-center">{e}</div>
                              </RadioGroupItem>
                            </FormControl>
                          </FormItem>
                        ))}
                      </div>
                    </RadioGroup>
                  </FormControl>
                </FormItem>
              )}
            />

            <DialogFooter className="bg-brand-50 py-7 rounded flex items-center">
              <div className="mr-5">
                <Button size={"lg"} className="">
                  Create Category
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
