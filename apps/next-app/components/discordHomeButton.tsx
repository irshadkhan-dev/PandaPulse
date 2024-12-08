import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import React from "react";

import Link from "next/link";

const DiscordHomeButton = async ({
  btnType,
  className,
  children,
  user,
}: {
  className?: string;
  btnType?: string;
  children?: React.ReactNode;
  user: any;
}) => {
  return (
    <Link href={user ? "/dashboard" : "/auth/signup"}>
      <Button className={cn("bg-brand-700", className)} variant={"gooeyLeft"}>
        {user
          ? btnType !== "nav"
            ? "Go to Dashboard"
            : "Dashboard"
          : btnType === "nav"
            ? "Sign up"
            : "Start For Free Today"}
        {children}
      </Button>
    </Link>
  );
};

export default DiscordHomeButton;
