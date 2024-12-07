import React from "react";
import MaxWidthWrapper from "./MaxWidthWrapper";
import Link from "next/link";
import { SidebarTrigger } from "@/components/ui/sidebar";

const MobileNav = () => {
  return (
    <div className="border-b border-gray-200 w-full flex h-14 backdrop-blur-lg bg-white/75 sticky top-0 transition-all z-[100]">
      <MaxWidthWrapper className="flex items-center">
        <div className="flex justify-between items-center w-full">
          <Link href={"/"}>
            <div className="flex text-base font-medium">
              <span className="text-brand-600">Panda</span>Pulse
            </div>
          </Link>

          <div>
            <SidebarTrigger />
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default MobileNav;
