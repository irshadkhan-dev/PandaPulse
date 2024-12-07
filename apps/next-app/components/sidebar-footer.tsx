import { auth } from "auth";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const SideBarFooter = async () => {
  const session = await auth();
  const user = session?.user;

  return (
    <Link href="/setting" className="flex gap-2 items-center">
      <Image
        width={30}
        height={30}
        alt="profile image"
        src={user.image}
        className="rounded-full"
      />
      <span className="flex flex-col text-xs">
        <span>{user.name}</span>
        <span>{user.email}</span>
      </span>
    </Link>
  );
};

export default SideBarFooter;
