import React, { useState } from "react";
import SearchListings from "../components/SearchListings";
import { SearchParams } from "@/lib/types";
import useMediaQuery from "../hooks/userMediaQuery";

type Props = {
  onSearch: (params: SearchParams) => void;
};

const ClientSearchBar = ({ onSearch }: Props) => {
  const [showSearchBar, setShowSearchBar] = useState<boolean>(true);
  const isAboveMediumScreens = useMediaQuery("(min-width:768px)");
  const showSearchBarStyle = showSearchBar ? "h-[85px] overflow-hidden" : "";

  const handleSearchBarClick = () => {
    console.log("Clicked", showSearchBar);
    setShowSearchBar((prevState) => !prevState);
  };

  return (
    <>
      <div className="flex md:justify-start justify-center md:mb-5 mb-2 sm:mx-5 md:mt-0 mt-5 border w-full bg-gray-400 rounded-lg">
        <h1 className="md:text-[1.3rem] text-[1.6rem] md:font-extrabold tracking-[10px]">
          <i className="fa-solid fa-list fa-xs"></i>Filter
        </h1>
      </div>
      {/* FORM */}
      <div
        className={`md:w-auto w-full mx-auto mt-5 md:h-full ${showSearchBarStyle}`}>
        <SearchListings onSearch={onSearch} />
      </div>
      {!isAboveMediumScreens ? (
        <div
          className="absolute -bottom-5 border rounded-3xl px-1 py-0.5 bg-blue-400 -mb-5"
          onClick={handleSearchBarClick}>
          {showSearchBar ? (
            <i className="fa-solid fa-chevron-down fa-lg"></i>
          ) : (
            <i className="fa-solid fa-chevron-up fa-lg"></i>
          )}
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default ClientSearchBar;
