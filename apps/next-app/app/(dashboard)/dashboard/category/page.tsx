import { CategoryBody } from "components/categoryBody";
import DashboardBody from "components/dash-body";
import DashboardHeader from "components/dash-header";

const Page = () => {
  return (
    <div className="w-full bg-[#fafafa] h-screen pt-10">
      <div className="flex flex-col gap-10 w-full px-5">
        <DashboardHeader />
        <CategoryBody />
      </div>
    </div>
  );
};

export default Page;
