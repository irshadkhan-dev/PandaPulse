"use client";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import React from "react";

const SignOutBtn = () => {
  return (
    <Button
      className="bg-white  text-gray-500"
      variant={"gooeyLeft"}
      size={"sm"}
      onClick={() => signOut({ redirectTo: "/" })}
    >
      Sign out
    </Button>
  );
};

export default SignOutBtn;
