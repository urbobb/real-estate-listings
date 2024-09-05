// app/admin/AddListingButton.tsx
"use client";

import { useRouter } from "next/navigation";

const AddListingButton = () => {
  const router = useRouter();

  const handleAddListingClick = () => {
    router.push("/admin/addListing");
  };

  return (
    <button
      onClick={handleAddListingClick}
      className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
      Add New Listing
    </button>
  );
};

export default AddListingButton;
