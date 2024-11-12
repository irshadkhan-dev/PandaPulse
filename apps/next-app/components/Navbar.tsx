import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import { ArrowRight } from "lucide-react";
import MaxWidthWrapper from "./MaxWidthWrapper";

const Navbar = () => {
  const user = false;
  return (
    <div className="border-b border-gray-200 w-full flex h-14 backdrop-blur-lg bg-white/75 sticky top-0 transition-all z-[100]">
      <MaxWidthWrapper className="flex items-center">
        <div className="flex justify-between items-center w-full">
          <div className="flex text-base font-medium">
            <span className="text-brand-600">Panda</span>Pulse
          </div>

          <div className="flex justify-between gap-5 items-center px-5 ">
            <div>
              <Link
                href={`${user ? "/sign-out" : "/pricing"}`}
                className="text-gray-600 text-sm"
              >
                {user ? "Sign out" : "Pricing"}
              </Link>
            </div>
            <div className="w-[1px] h-7 bg-gray-400" />
            <div>
              <Button variant={"gooeyLeft"} className="h-8  bg-brand-600">
                {user ? "Dashboard" : "Sing up"}
              </Button>
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default Navbar;
