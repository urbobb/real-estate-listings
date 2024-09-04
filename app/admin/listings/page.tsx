import { auth, signOut } from "@/auth";
import React from "react";
import { redirect } from "next/navigation";
import GetListings from "./GetListings";

type Props = {};

export default async function Listings({}: Props) {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    redirect("/admin/");
  }
  return (
    <div className="min-h-screen">
      <div className="w-[60%] mx-auto flex flex-col mt-24">
        {/* SUCHE */}
        <div className="border rounded-md">d</div>
        <GetListings />
      </div>
    </div>
  );
}
