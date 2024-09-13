"use client";
import { toast } from "@/components/ui/use-toast";
import { Listing } from "@/lib/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Listings = () => {
  const router = useRouter();
  const [dataReceivedDB, setDataReceivedDB] = useState<Listing[]>([]);

  useEffect(() => {
    async function fetchAllListings() {
      try {
        const response = await fetch("/api/listings", {
          method: "POST",
          body: JSON.stringify("GETALL"),
          headers: { "Content-Type": "application/json" },
        });

        if (response.ok) {
          const data = await response.json();
          setDataReceivedDB(data);
        } else {
          const error = response.json();
          console.error("Fetching Failed:", error);
        }
      } catch (err) {
        console.error("Error Message: ", err);
      }
    }
    fetchAllListings();
  }, []);

  const handleAddListingClick = () => {
    router.push("/admin/addListing");
  };

  const handleViewClick = (id: number) => {
    window.open(`/listings/${id}`, "_blank");
    console.log("View");
  };

  const handleEditClick = (id: number) => {
    window.open(`/admin/editListings/${id}`, "_blank");
    console.log("Edit");
  };

  const handleDeleteClick = (id: number) => {
    //console.log("id", id);
    async function deleteListing() {
      try {
        const response = await fetch(`/api/admin/listings/${id}`, {
          method: "DELETE",
          body: JSON.stringify({ id }),
          headers: { "Content-Type": "application/json" },
        });

        if (response.ok) {
          const data = await response.json();
          toast({ description: "Successfully deleted Listing." });
          window.location.reload();
        } else {
          const err = await response.json();
          toast({
            variant: "destructive",
            description: `${err.error}`,
          });
          console.error("Response error", err);
        }
      } catch (err) {
        toast({
          variant: "destructive",
          description: `${err}`,
        });
        console.error("Failed to Delete Listing:", err);
      }
    }

    deleteListing();
  };

  return (
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
        {dataReceivedDB.map((house, index) => (
          <tr key={index}>
            <td className="px-6 py-4 whitespace-nowrap">{house.id}</td>
            <td className="px-6 py-4 whitespace-nowrap">{house.title}</td>
            <td className="px-6 py-4 whitespace-nowrap">{house.location}</td>
            <td className="px-6 py-4 whitespace-nowrap">{house.price}</td>
            <td className="px-6 py-4 whitespace-nowrap">
              <button
                onClick={() => handleViewClick(house.id)}
                className="text-blue-600 hover:text-blue-800">
                View
              </button>
              <button
                onClick={() => handleEditClick(house.id)}
                className="text-yellow-500 hover:text-yellow-700 ml-4">
                Edit
              </button>
              <button
                onClick={() => handleDeleteClick(house.id)}
                className="text-red-600 hover:text-red-800 ml-4">
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Listings;
