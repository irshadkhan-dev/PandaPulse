import EventPage from "./event-page";

export default async function Page({
  params,
}: {
  params: Promise<{ name: "sale" | "signup" | "revenue" }>;
}) {
  const eventName = (await params).name;

  return <EventPage eventName={eventName} />;
}
