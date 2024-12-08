import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

import SettingBody from "./setting-body";

const Page = () => {
  return (
    <div className="w-full bg-[#fafafa] h-screen pt-4 md:pt-10">
      <div className="flex flex-col gap-10 w-full px-5">
        <div className="w-full flex items-center p-2 gap-7">
          <Link href={"/dashboard"}>
            <div className="bg-white px-6 py-3 rounded border border-gray-200 shadow-sm flex items-center">
              <ArrowLeft className="h-4 w-4 flex-shrink-0" />
            </div>
          </Link>

          <span className="md:text-4xl text-2xl">Account Setting</span>
        </div>

        <div className="w-full h-px bg-gray-200" />
        <div className="w-full  h-[70vh] border border-gray-200 rounded-lg px-10 pt-10">
          <SettingBody />
        </div>
      </div>
    </div>
  );
};

export default Page;
