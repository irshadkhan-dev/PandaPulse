import React from "react";

import DashboardHeader from "./dash-header";
import DashboardBody from "./dash-body";

const Dashboard = () => {
  return (
    <div className="w-full bg-[#fafafa] h-screen pt-10">
      <div className="flex flex-col gap-10 w-full px-5">
        <DashboardHeader />
        <DashboardBody />
      </div>
    </div>
  );
};

export default Dashboard;
