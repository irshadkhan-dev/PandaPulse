"use client";
import React from "react";
import { SessionProvider } from "next-auth/react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const client = new QueryClient();
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const Providers = ({ children }: { children: React.ReactNode }) => {
  // const session = await auth();
  // if (!session) redirect("/");
  return (
    <SessionProvider>
      <QueryClientProvider client={client}>
        <div className="">{children}</div>

        <ReactQueryDevtools initialIsOpen={true} />
      </QueryClientProvider>
    </SessionProvider>
  );
};

export default Providers;
