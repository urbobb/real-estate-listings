import React from "react";
import { auth, signIn, signOut } from "@/auth";
import { redirect } from "next/navigation";
import AddListingButton from "./AddListingButton";
import Listings from "./Listings";

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

function SignOutButton() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
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
  // manual delay to showcase static caching
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const session = await auth();
  const user = session?.user;

  if (!user) {
    redirect("/api/auth/signin?callbackUrl=/admin");
  }

  console.log("Role", user?.role);

  if (user?.role !== "ADMIN") {
    return (
      <main className="mx-auto my-10 mt-28 min-h-screen">
        <p className="text-center text-red-600 mb-5">
          You are not authorized to view this page
        </p>
        <div className="text-center">
          <p className="mb-5">Sign in with an admin account</p>
          <SignOutButton />
        </div>
      </main>
    );
  }

  const handleAddListingClick = () => {
    redirect("/admin/addListing");
  };

  return (
    <div className="min-h-screen">
      <div className="relative w-5/6 mx-auto min-h-screen ">
        <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
          {user ? (
            <div className="container mx-auto py-8">
              {/* <!-- Title and Add Button --> */}
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold">Listings</h2>
                <AddListingButton />
              </div>

              {/* <!-- Listings Table --> */}
              <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <Listings />
              </div>
            </div>
          ) : (
            <SignInButton />
          )}
        </div>
      </div>
    </div>
  );
}
