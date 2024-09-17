import React, { useState } from "react";
import SearchListings from "../components/SearchListings";
import { SearchParams } from "@/lib/types";

type Props = {
  onSearch: (params: SearchParams) => void;
};

const ClientSearchBar = ({ onSearch }: Props) => {
  const [showSearchBar, setShowSearchBar] = useState<boolean>(true);
  let toggleShowSearchBar = false;
  const showSearchBarStyle = showSearchBar ? "h-[85px] overflow-hidden" : "";

  const handleSearchBarClick = () => {
    console.log("Clicked", showSearchBar);
    setShowSearchBar((prevState) => !prevState);
  };

  return (
    <>
      <div className="flex md:justify-start justify-center md:mb-5 mb-2 sm:mx-5 md:mt-0 mt-5">
        <h1 className="md:text-[1.3rem] text-[1.5rem] md:font-extrabold font-semibold tracking-[10px]">
          Search
        </h1>
      </div>

      {/* FORM */}
      <div
        className={`md:w-auto w-full mx-auto mt-5 md:h-full ${showSearchBarStyle}`}>
        <SearchListings onSearch={onSearch} />
      </div>
      <div
        className="absolute -bottom-5 border rounded-3xl px-1.5 py-0.5 bg-blue-400 -mb-5"
        onClick={handleSearchBarClick}>
        <i className="fa-solid fa-chevron-down"></i>
      </div>
    </>
  );
};

export default ClientSearchBar;
