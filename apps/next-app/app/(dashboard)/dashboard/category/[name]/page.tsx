import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import EmptyEventPage from "./emptyEventPage";
import LoadedEventPage from "./loadedEventPage";

export default async function Page({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  // const categoryName = (await params).name;

  return <LoadedEventPage />;
}
