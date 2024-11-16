import BentoGrid from "components/BentoGrid";
import CustomerSec from "components/CustomerSec";
import DiscordTab from "components/DiscordTab";
import HomeTitle from "components/HomeTitle";

export default function Home() {
  return (
    <div className="bg-brand-25 w-full flex flex-col gap-10">
      <HomeTitle />
      <DiscordTab />
      <BentoGrid />
      <CustomerSec />
    </div>
  );
}
