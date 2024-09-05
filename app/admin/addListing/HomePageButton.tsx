// app/admin/AddListingButton.tsx
"use client";

import { useRouter } from "next/navigation";

const HomePageButton = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/admin");
  };

  return (
    <button
      onClick={handleClick}
      className="border border-black p-2 hover:bg-black hover:text-white hover:cursor-pointer transition duration-200">
      Admin page
    </button>
  );
};

export default HomePageButton;
