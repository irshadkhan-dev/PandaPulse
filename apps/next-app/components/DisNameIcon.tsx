import { cn } from "@/lib/utils";
import React from "react";

const DisNameIcon = ({
  iconTag,
  className,
}: {
  iconTag?: string;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "flex rounded-full justify-center items-center size-10 bg-[#303338] hover:bg-[#5765f2] hover:rounded-xl",
        className
      )}
    >
      {iconTag}
    </div>
  );
};

export default DisNameIcon;
