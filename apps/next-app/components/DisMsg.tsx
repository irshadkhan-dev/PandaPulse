import React from "react";

import Image from "next/image";
import { cn } from "@/lib/utils";

interface DiscordMsgProps {
  pandaAvatarSrc: string;
  emoji?: string;
  userName: string;
  msgTitle?: string;

  timeDate?: string;
  badgeText?: string;
  badgeColor?: string;
  content: {
    [key: string]: string;
  };
}

type BadgeColor = "#43b581" | "#faa61a" | (string & {});

const getBadgeColor = (color: BadgeColor) => {
  switch (color) {
    case "#43b581":
      return "bg-green-500/10 text-green-400 ring-yellow-500/20";
    case "#faa61a":
      return "bg-yellow-500/10 text-yellow-400 ring-yellow-500/20";
    default:
      return "bg-gray-500/10 text-gray-400 ring-gray-500/20";
  }
};

const DisMsg = ({
  pandaAvatarSrc,
  emoji,
  userName,
  msgTitle,

  timeDate,
  badgeText,
  content,
  badgeColor = "#43b581",
}: DiscordMsgProps) => {
  return (
    <div className="flex flex-col gap-3 w-full px-4 py-7 ">
      <div className="flex items-center gap-1">
        <div className="flex">
          <Image
            src={pandaAvatarSrc}
            alt="panda image"
            width={40}
            height={40}
            className="rounded-full"
          />
        </div>

        <div>
          <span>{userName}</span>
        </div>

        <div>
          <span className="text-sm text-gray-500">{timeDate}</span>
        </div>
      </div>

      <div className="flex flex-col gap-2 p-4 bg-[#2a2d31] rounded-md md:mx-7">
        <div className="flex justify-between md:gap-10  items-center">
          <div className="md:text-base text-sm">
            {emoji} {msgTitle}
          </div>
          {badgeText ? (
            <>
              <div
                className={cn(
                  "flex text-sm p-1 rounded-lg px-2",
                  getBadgeColor(badgeColor)
                )}
              >
                {badgeText}
              </div>
            </>
          ) : null}
        </div>

        <div className="space-y-1">
          {Object.entries(content).map(([key, value]) => (
            <span className="flex gap-2 text-sm text-gray-300" key={key}>
              <p className="text-sm text-gray-400">{key}: </p> {value}
            </span>
          ))}
        </div>

        <div className="text-sm text-gray-400">{timeDate}</div>
      </div>
    </div>
  );
};

export default DisMsg;
