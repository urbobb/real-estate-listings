import React from "react";
import { auth, signIn, signOut } from "@/auth";
import { redirect } from "next/navigation";
import AddListingButton from "./AddListingButton";

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
          <p className="mb-5">Sign in with admin accound</p>

          <SignOutButton />
        </div>
      </main>
    );
  }

  const handleAddListingClick = () => {
    redirect("/admin/addListing");
  };

  return (
    <div className="min-h-screen mt-28">
      <div className="relative w-5/6 mx-auto mt-28 ">
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
                <table className="min-w-full">
                  <thead className="bg-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        #
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Title
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Location
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Price
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {/* <!-- Listing Row --> */}
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">1</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        Modern Apartment
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        New York, NY
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        $2,500,000
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button className="text-blue-600 hover:text-blue-800">
                          View
                        </button>
                        <button className="text-yellow-500 hover:text-yellow-700 ml-4">
                          Edit
                        </button>
                        <button className="text-red-600 hover:text-red-800 ml-4">
                          Delete
                        </button>
                      </td>
                    </tr>
                    {/* <!-- Repeat for each listing --> */}
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">2</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        Luxury Villa
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">Miami, FL</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        $5,000,000
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button className="text-blue-600 hover:text-blue-800">
                          View
                        </button>
                        <button className="text-yellow-500 hover:text-yellow-700 ml-4">
                          Edit
                        </button>
                        <button className="text-red-600 hover:text-red-800 ml-4">
                          Delete
                        </button>
                      </td>
                    </tr>
                    {/* <!-- More rows as needed --> */}
                  </tbody>
                </table>
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
