import React from "react";
import { SettingsIcon, User } from "lucide-react";
import { InboxIcon, HeadphonesIcon, Mic } from "lucide-react";
import PandaIcon from "./PandaIcon";
import DisNameIcon from "./DisNameIcon";

const DirectMsgTab = () => {
  return (
    <div className="h-full bg-[#2a2d31] text-white  flex flex-col justify-between">
      <div className="">
        <div className="flex py-3 px-3 border-b border-black mt-1">
          <div className="text-sm bg-[#1e1f22] py-2 rounded-sm w-full text-center">
            Start conversation
          </div>
        </div>

        <div className="flex flex-col justify-between  py-5">
          <div className="flex flex-col gap-5 px-3">
            <div className="flex gap-3 items-center">
              <User />
              <span>Friends</span>
            </div>

            <div className="flex gap-3 items-center">
              <InboxIcon />
              <span>Nitro</span>
            </div>

            <div className="text-sm text-gray-400">DIRECT MESSAGES</div>

            <div className="flex gap-2 items-center bg-[#303338] rounded-sm w-full py-1 px-1">
              <PandaIcon />
              <span className="text-sm">Panda Pulse</span>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex gap-2 items-center">
                <DisNameIcon />
                <span className="text-sm text-gray-500">Aman</span>
              </div>
              <div className="flex gap-2 items-center">
                <DisNameIcon />
                <span className="text-sm text-gray-500">Sakshyam</span>
              </div>
              <div className="flex gap-2 items-center">
                <DisNameIcon />
                <span className="text-sm text-gray-500">Juhi</span>
              </div>
              <div className="flex gap-2 items-center">
                <DisNameIcon />
                <span className="text-sm text-gray-500">Junaid</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex w-full px-1 py-2 bg-[#1e1f22] gap-1">
        <div>
          <DisNameIcon className="bg-[#5765f2]" />
        </div>
        <div className=" flex flex-col items-center justify-center text-xs">
          <div>Irshad</div>
          <div className="text-gray-500">online</div>
        </div>

        <div className="flex w-full items-center justify-center gap-1">
          <Mic className="h-4 w-4" />
          <HeadphonesIcon className="h-4 w-4" />
          <SettingsIcon className="h-4 w-4" />
        </div>
      </div>
    </div>
  );
};

export default DirectMsgTab;
