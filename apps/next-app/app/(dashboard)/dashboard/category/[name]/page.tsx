import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import EmptyEventPage from "./emptyEventPage";
import LoadedEventPage from "./loadedEventPage";
import EventPage from "./event-page";

export default async function Page({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const eventName = (await params).name;
  console.log(eventName);

  return <EventPage eventName={eventName} />;
}
