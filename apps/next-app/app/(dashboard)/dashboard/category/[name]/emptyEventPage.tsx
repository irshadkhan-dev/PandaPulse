import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const EmptyEventPage = () => {
  return (
    <div className="w-full bg-[#fafafa] h-screen pt-4 md:pt-10">
      <div className="flex flex-col gap-10 w-full px-5">
        <div className="w-full flex items-center p-2 gap-7">
          <Link href={"/dashboard"}>
            <div className="bg-white px-6 py-3 rounded border border-gray-200 shadow-sm flex items-center">
              <ArrowLeft className="h-4 w-4 flex-shrink-0" />
            </div>
          </Link>

          <span className="md:text-4xl text-2xl">💰 Sale Events</span>
        </div>
        <div className="w-full h-px bg-gray-200" />
        <div className="w-full bg-white/5 backdrop-blur-lg transition-all z-[100] flex items-center justify-center h-[70vh] p-4 border border-gray-200 rounded-lg">
          <div className="flex flex-col gap-5 items-center">
            <div className="flex flex-col">
              <span className="text-2xl font-semibold text-center">
                Create your first sale event
              </span>
              <span className="text-sm text-gray-500 text-center">
                Get started by sending a request to our Tracking API
              </span>
            </div>

            <div className="">
              <Image
                src={"/icons/codeSnap.png"}
                alt="code image"
                width={400}
                height={400}
                className="rounded-lg"
              />
            </div>

            <div className="flex gap-2 items-center">
              <div className="bg-green-500 rounded-full h-2 w-2" />
              <span className="text-sm text-gray-500">
                Listening to upcoming events...
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmptyEventPage;
