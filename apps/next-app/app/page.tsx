import DiscordTab from "components/DiscordTab";
import HomeTitle from "components/HomeTitle";

export default function Home() {
  return (
    <div className="bg-brand-25 w-full">
      <HomeTitle />
      <DiscordTab />
    </div>
  );
}
