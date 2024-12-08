import BentoGrid from "components/BentoGrid";
import CustomerSec from "components/CustomerSec";
import DiscordTab from "components/DiscordTab";
import HomeTitle from "components/HomeTitle";
import { auth } from "../../auth";
export default async function Home() {
  const session = await auth();
  const user = session?.user;

  return (
    <div className="bg-brand-25 w-full flex flex-col gap-10">
      <HomeTitle user={user} />
      <DiscordTab />
      <BentoGrid />
      <CustomerSec user={user} />
    </div>
  );
}
