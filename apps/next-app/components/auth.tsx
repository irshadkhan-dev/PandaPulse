"use client";
import { Button } from "@/components/ui/button";
import React from "react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import MaxWidthWrapper from "./MaxWidthWrapper";
import Image from "next/image";
import { signIn } from "next-auth/react";
const Auth = () => {
  return (
    <div className="w-full h-[100vh] bg-brand-25 ">
      <MaxWidthWrapper className="flex items-center justify-center">
        <div className="flex  rounded-lg bg-brand-50 shadow-xl max-md:flex-col border border-gray-200">
          <div className="">
            <Image
              src={"/icons/pandaHeart.png"}
              alt="panda"
              width={500}
              height={500}
              className=""
            />
          </div>
          <div className="flex flex-col gap-7 bg-brand-25 items-center p-7 rounded-lg shadow-xl w-full">
            <div className="flex flex-col gap-2">
              <span className="text-center text-3xl">Create an account</span>
              <span className="text-center text-base text-gray-400">
                Go ahead with google or github
              </span>
            </div>

            <div className="flex flex-col gap-4 w-full items-center">
              <div className="hover:border-[2px] rounded-md hover:border-brand-700 hover:p-[2px] max-h-10 w-full">
                <Button
                  className="bg-brand-700 flex gap-2 items-center w-full"
                  size={"lg"}
                  variant={"gooeyLeft"}
                  onClick={() => signIn("google", { redirectTo: "/dashboard" })}
                >
                  <FcGoogle className="h-7 w-7" />
                </Button>
              </div>

              <span className="text-xl font-semibold">OR,</span>

              <div className="hover:border-[2px] rounded-md hover:border-brand-700 hover:p-[2px] max-h-10 w-full">
                <Button
                  className="bg-brand-700 flex gap-2 items-center w-full"
                  size={"lg"}
                  variant={"gooeyLeft"}
                  onClick={() => signIn("github", { redirectTo: "/dashboard" })}
                >
                  <FaGithub className="h-7 w-7" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default Auth;
