import React from "react";
import MaxWidthWrapper from "./MaxWidthWrapper";
import Image from "next/image";

const BentoGrid = () => {
  return (
    <div className="w-full bg-brand-25 h-full pt-20 max-md:pt-52">
      <MaxWidthWrapper>
        <div className="flex flex-col gap-10">
          <div className="flex flex-col items-center">
            <span className="text-brand-500">Intuitive Monitoring</span>
            <h1 className="text-xl md:text-4xl font-semibold">
              Stay ahead with real-time insights
            </h1>
          </div>

          <div className="grid grid-cols-6 gap-5 w-full  max-md:flex flex-col md:px-7 px-5 relative">
            <div className="md:col-span-2  bg-white shadow-xl rounded-l-[30px] rounded-r-md">
              <div className="pt-7 px-7 flex flex-col md:justify-between  h-full w-full gap-5 items-center">
                <div className="flex flex-col gap-4">
                  <span className="text-xl font-semibold">
                    Real-time Notifications
                  </span>
                  <span className="text-sm text-gray-500">
                    Get notified for the crirical events the moment they happen,
                    no matter if you're at the go or at home.
                  </span>
                </div>

                <div className="flex h-full ">
                  <Image
                    src={"/icons/phone1.png"}
                    width={300}
                    height={300}
                    alt="phone image"
                  />
                </div>
              </div>
            </div>

            <div className="col-span-2  grid grid-rows-2 gap-5">
              <div className="row-span-1  bg-white shadow-xl rounded-lg pt-7 px-7">
                <div className="flex flex-col gap-7  items-center h-full">
                  <div className="flex flex-col gap-3">
                    <span className="text-xl font-semibold">
                      Track Any Event
                    </span>
                    <span className="text-sm text-gray-500">
                      From new user signups to successful payments, PnadaPulse
                      notifies you for all critical events in your SaaS.
                    </span>
                  </div>

                  <div className="">
                    <img src="/icons/event.png" alt="" />
                  </div>
                </div>
              </div>
              <div className="row-span-1 bg-white shadow-xl rounded-lg pt-7 px-7">
                <div className="flex flex-col gap-7  items-center h-full">
                  <div className="flex flex-col gap-3">
                    <span className="text-xl font-semibold">
                      Track Any Properties
                    </span>
                    <span className="text-sm text-gray-500">
                      Add any custom data you like to an event such as a user
                      email, purchase amount or an exceeded quota.
                    </span>
                  </div>

                  <div className="">
                    <Image
                      src={"/icons/bentodata.png"}
                      width={300}
                      height={300}
                      alt="code picture"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="md:col-span-2 bg-white shadow-xl rounded-r-[30px] rounded-l-md">
              <div className="pt-7 px-7 flex flex-col gap-5 w-full items-center md:justify-between  h-full">
                <div className="flex flex-col gap-4">
                  <span className="text-xl font-semibold">
                    Easy Integration
                  </span>
                  <span className="text-sm text-gray-500">
                    Get notified for the crirical events the moment they happen,
                    no matter if you're at the go or at home.
                  </span>
                </div>

                <div className="flex h-full">
                  <Image
                    src={"/icons/code.png"}
                    width={300}
                    height={300}
                    alt="phone image"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default BentoGrid;
