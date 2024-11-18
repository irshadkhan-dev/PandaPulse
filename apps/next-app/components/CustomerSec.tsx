import React from "react";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { Star, ArrowRightIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

const CustomerSec = () => {
  return (
    <div className="bg-white w-full pt-20 pb-10">
      <MaxWidthWrapper>
        <div className="flex flex-col md:gap-16 gap-10">
          <div className="flex flex-col items-center">
            <span className="text-brand-600">Real World Experiences</span>
            <h1 className="text-2xl md:text-4xl font-semibold">
              What our customers say
            </h1>
          </div>

          <div className="mx-auto">
            <div className="bg-brand-25 px-10 py-10 rounded-md">
              <div className="md:grid grid-cols-2 max-md:flex flex-col gap-7">
                <div className="col-span-1 flex flex-col gap-5 md:border-r border-gray-300 pr-4">
                  <div className="flex gap-1 text-brand-600 fill-brand-600">
                    <Star className="h-4 w-4" fill="" />
                    <Star className="h-4 w-4" fill="" />
                    <Star className="h-4 w-4" fill="" />
                    <Star className="h-4 w-4" fill="" />
                    <Star className="h-4 w-4" fill="" />
                  </div>

                  <div className="max-w-sm">
                    <span className="text-sm tracking-tight">
                      PandaPulse has been a game-changer for me. I've been using
                      it for two months now and seeing sales pop up in real-time
                      is super satisfying
                    </span>
                  </div>

                  <div className="flex gap-2 items-center">
                    <div className="size-10">
                      <img
                        src="/icons/user1.png"
                        alt=""
                        className="size-full rounded-full"
                      />
                    </div>
                    <div className="flex flex-col text-xs items-center">
                      <span className="font-semibold">Hagia Liber</span>
                      <span>@hagia23</span>
                    </div>
                  </div>
                </div>

                <div className="w-full h-px md:h-full md:w-px bg-gray-300 md:hidden" />

                <div className="col-span-1 flex flex-col gap-5">
                  <div className="flex gap-1 text-brand-600 fill-brand-600">
                    <Star className="h-4 w-4" fill="" />
                    <Star className="h-4 w-4" fill="" />
                    <Star className="h-4 w-4" fill="" />
                    <Star className="h-4 w-4" fill="" />
                    <Star className="h-4 w-4" fill="" />
                  </div>

                  <div className="max-w-sm">
                    <span className="text-sm tracking-tight">
                      PandaPulse been paying off for our SaaS. Nice have simple
                      way to see how we're doing day-to-day business. Definitely
                      makes our lives easier.
                    </span>
                  </div>

                  <div className="flex gap-2 items-center">
                    <div className="size-10">
                      <img
                        src="/icons/user2.png"
                        alt=""
                        className="size-full rounded-full"
                      />
                    </div>
                    <div className="flex flex-col text-xs items-center">
                      <span className="font-semibold">Kaushal B.</span>
                      <span>@burlu</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <div className="hover:border-[2px] rounded-md hover:border-brand-700 hover:p-[2px] max-h-10">
              <Button
                className="bg-brand-700 flex gap-2 items-center  "
                size={"lg"}
                variant={"gooeyLeft"}
              >
                Start For Free Today
                <ArrowRightIcon />
              </Button>
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default CustomerSec;
