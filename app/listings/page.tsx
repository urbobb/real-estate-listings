import React from "react";
import SearchBarListings from "@/app/components/SearchListings";
import ListingsCard from "../components/ListingsCard";
import { houses } from "@/app/shared/HousesList";
import { getListing } from "@/lib/listingActions";

export default async function Listings() {
  //Retrieve the listings
  // Fetch listings from the database
  const data = await getListing();

  if (data === null) {
    return;
  }

  //console.log("Data: ", typeof handleAction());

  return (
    <div className="relative md:min-h-screen md:w-screen w-full mx-auto pt-20">
      <div className="flex md:flex-row flex-col md:w-screen w-full md:min-h-screen  ">
        {/* SEARCHBAR */}
        <div
          className="flex md:min-h-screen justify-center items-center
          w-full md:w-[400px] bg-[#fcf9fd]">
          {" "}
          {/*bg-[#FEFCFF]*/}
          <div
            className="relative md:fixed md:top-0 flex flex-col justify-center items-center min-h-max 
            md:w-auto w-11/12 mx-auto md:pt-28">
            {/* TITLE */}
            <div className="flex md:justify-start justify-center md:mb-5 mb-2 sm:mx-5 md:mt-0 mt-5">
              <h1 className="md:text-[1.3rem] text-[1.5rem] md:font-extrabold font-semibold tracking-[10px]">
                Search
              </h1>
            </div>

            {/* FORM */}
            <div className="md:w-auto w-full mx-auto mt-5">
              <SearchBarListings />
            </div>
          </div>
        </div>

        {/* Houses */}
        <div className="w-full mx-auto flex  pt-20 ">
          <div className="flex justify-center items-center flex-row flex-wrap gap-y-5 gap-x-28">
            {data.map((house) => (
              <div
                className={`flex-[0_0_calc(20%_-_1rem)] box-border`}
                key={house.id}>
                <ListingsCard
                  location={house.location}
                  area={house.area}
                  energyClass={house.energyclass}
                  price={house.price}
                  id={house.id}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
