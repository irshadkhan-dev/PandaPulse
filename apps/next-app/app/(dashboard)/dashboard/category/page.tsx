import DashboardBody from "components/dash-body";
import DashboardHeader from "components/dash-header";
import React from "react";

const Page = () => {
  return (
    <div className="w-full bg-[#fafafa] h-screen pt-10">
      <div className="flex flex-col gap-10 w-full px-5">
        <DashboardHeader />
        <div></div>
      </div>
    </div>
  );
};

export default Page;
