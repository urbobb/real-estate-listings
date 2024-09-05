import { auth, signOut } from "@/auth";
import React from "react";
import FormCreateListing from "./FormCreateListing";
import { redirect } from "next/navigation";
import HomePageButton from "./HomePageButton";

type Props = {};

function SignOutButton() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}>
      <button
        type="submit"
        className="border border-black p-2 hover:bg-black hover:text-white hover:cursor-pointer transition duration-200">
        Sign out
      </button>
    </form>
  );
}

export default async function AdminPage({}: Props) {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    redirect("/admin/");
  }
  return (
    <div className="min-h-screen">
      <div className="flex flex-col mt-28 gap-5">
        <div className="lg:w-1/2 w-full mx-auto flex justify-between items-center">
          <HomePageButton />
          <div className="flex flex-row gap-3 items-center">
            um auszuloggen {"-->"} <SignOutButton />
          </div>
        </div>
        <FormCreateListing />
      </div>
    </div>
  );
}
