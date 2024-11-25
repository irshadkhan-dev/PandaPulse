import React from "react";

import AppSideBar from "components/app-sidebar";

import { SidebarProvider } from "@/components/ui/sidebar";
export default async function Rootpage({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <SidebarProvider>
        <main className="w-full overflow-hidden flex gap-10">
          <div className="max-md:hidden">
            <AppSideBar className="bg-white w-[18rem]" />
          </div>
          {children}
        </main>
      </SidebarProvider>
    </>
  );
}
