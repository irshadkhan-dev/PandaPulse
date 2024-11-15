import Image from "next/image";
import React from "react";

const PandaIcon = () => {
  return (
    <div className="flex size-10">
      <Image
        src={"/icons/panda.png"}
        alt="panda icon"
        width={50}
        height={50}
        className="rounded-full"
      />
    </div>
  );
};

export default PandaIcon;
