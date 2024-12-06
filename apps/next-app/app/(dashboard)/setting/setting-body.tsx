"use client";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { SaveDiscordId } from "lib/actions/user.actions";
import { useToast } from "@/hooks/use-toast";

const FormSchema = z.object({
  discordId: z.string().min(19, {
    message: "Discord Id is of 19 Digits",
  }),
});

const SettingBody = () => {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      discordId: "",
    },
  });

  const { mutate, isPending, isError, isSuccess } = useMutation({
    mutationKey: ["discordId"],
    mutationFn: async (discordId: string) => await SaveDiscordId(discordId),
  });

  useEffect(() => {
    const savedDiscordId = localStorage.getItem("discordId");
    if (savedDiscordId) {
      form.setValue("discordId", savedDiscordId);
    }
  }, [form]);

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    localStorage.setItem("discordId", data.discordId);
    mutate(data.discordId);
  };

  if (isError) console.log("error");

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="max-w-sm">
          <div className="bg-white border border-gray-300 rounded-lg shadow-sm flex flex-col gap-5 py-6 px-6">
            <FormField
              control={form.control}
              name="discordId"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Discord ID</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Discord id" />
                  </FormControl>
                  {fieldState.error && (
                    <FormMessage>{fieldState.error.message}</FormMessage>
                  )}
                </FormItem>
              )}
            />

            <Button
              type="submit"
              size={"sm"}
              variant={"gooeyLeft"}
              className="bg-brand-700 w-28 rounded-sm text-xs"
            >
              {isPending ? "Saving Changes.." : "Save Changes"}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default SettingBody;
