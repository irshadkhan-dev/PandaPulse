import React from "react";

const DisNameIcon = ({ iconTag }: { iconTag: string }) => {
  return (
    <div className="flex rounded-full justify-center items-center size-10 bg-[#303338] hover:bg-[#5765f2] hover:rounded-xl">
      {iconTag}
    </div>
  );
};

export default DisNameIcon;
