import { auth, signOut } from "@/auth";
import React from "react";
import FormCreateListing from "./FormCreateListing";
import { redirect } from "next/navigation";
//import { getSignedURL } from "@/lib/listingActions";

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
  const user = session?.user;

  if (!user) {
    redirect("/admin/");
  }
  return (
    <div className="min-h-screen">
      <div className="flex flex-col mt-28">
        <div className="lg:w-1/2 w-full mx-auto flex justify-end items-center">
          um auszuloggen {"-->"} <SignOutButton />
        </div>
        <FormCreateListing />
      </div>
    </div>
  );
}
