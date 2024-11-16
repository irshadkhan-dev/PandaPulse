import React from "react";
import MaxWidthWrapper from "./MaxWidthWrapper";
import DisNameIcon from "./DisNameIcon";
import {
  CirclePlus,
  PhoneCall,
  VideoIcon,
  PinIcon,
  User2Icon,
  SearchIcon,
  InboxIcon,
  CircleHelp,
} from "lucide-react";
import PandaIcon from "./PandaIcon";
import DisMsg from "./DisMsg";
import { DisMsgContent } from "lib/resource";
import DisSideBar from "./DisSideBar";
import DirectMsgTab from "./DirectMsgTab";

const DiscordTab = () => {
  return (
    <div className=" bg-brand-25 w-full">
      <MaxWidthWrapper className="px-5">
        <div className="">
          <div className="relative">
            <div className="border border-gray-400 rounded-md bg-white relative z-20">
              <div className="grid md:grid-cols-12 grid-cols-6 h-[100vh]">
                <div className="col-span-1  bg-[#1e1f22] text-white flex flex-col gap-4 items-center py-3 rounded-tl-sm rounded-bl-sm">
                  <DisSideBar />
                </div>

                <div className="col-span-3 max-md:hidden">
                  <DirectMsgTab />
                </div>

                <div className="md:col-span-8 col-span-5 bg-[#303338] text-white">
                  <div className="flex border-b border-black py-3 items-center justify-between px-3">
                    <div className="flex gap-2 items-center text-base">
                      <PandaIcon />
                      <span>PandaPulse</span>
                    </div>

                    <div className="flex gap-4 items-center">
                      <PhoneCall className="size-5" />
                      <VideoIcon className="size-5" />
                      <PinIcon className="size-5 hidden md:block" />
                      <User2Icon className="size-5 hidden md:block" />
                      <SearchIcon className="size-5 hidden md:block" />
                      <InboxIcon className="size-5 hidden md:block" />
                      <CircleHelp className="size-5 hidden md:block" />
                    </div>
                  </div>

                  <DisMsg content={DisMsgContent} />
                </div>
              </div>
            </div>
            <div className="absolute  -inset-3 rounded-md bg-gradient-to-b backdrop-blur-lg transition-all  from-gray-200 to-[95%] via-gray-400 to-transparent/5 z-10" />
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default DiscordTab;
