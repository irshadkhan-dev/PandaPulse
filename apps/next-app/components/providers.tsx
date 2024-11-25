"use client";
import React from "react";
import { SessionProvider } from "next-auth/react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const client = new QueryClient();

const Providers = ({ children }: { children: React.ReactNode }) => {
  // const session = await auth();
  // if (!session) redirect("/");
  return (
    <SessionProvider>
      <QueryClientProvider client={client}>{children}</QueryClientProvider>
    </SessionProvider>
  );
};

export default Providers;
