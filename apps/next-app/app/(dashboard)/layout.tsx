import React from "react";

import AppSideBar from "components/app-sidebar";
import Providers from "components/providers";
export default async function Rootpage({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Providers>
        <div className="max-md:hidden">
          <AppSideBar className="bg-white w-[18rem]" />
        </div>
        {children}
      </Providers>
    </>
  );
}
