import React from "react";
import { auth, signIn } from "@/auth";
import { redirect } from "next/navigation";

type Props = {};

function SignInButton() {
  return (
    <form
      action={async () => {
        "use server"; // for server actions
        await signIn();
      }}>
      <button
        type="submit"
        className="border border-black p-2 hover:bg-black hover:text-white hover:cursor-pointer transition duration-200">
        Sign in
      </button>
    </form>
  );
}

export default async function AdminPage({}: Props) {
  const session = await auth();
  const user = session?.user;

  if (user) {
    redirect("/admin/addListing");
  }

  return (
    <div className="max-h-screen">
      <div className="relative w-5/6 mx-auto mt-28 min-h-screen">
        <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
          {user ? null : <SignInButton />}
        </div>
      </div>
    </div>
  );
}
