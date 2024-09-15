"use client";
import React, { Suspense, useEffect, useState } from "react";
import ListingsCard from "@/app/components/ListingsCard";
import { Listing } from "@/lib/types";
import SearchListings from "../components/SearchListings";
import { useRouter, useSearchParams } from "next/navigation";

interface SearchParams {
  listingType: string;
  propertyType: string;
  location: string;
  minPrice: number | null;
  maxPrice: number | null;
  minArea: number | null;
  maxArea: number | null;
}

interface SearchParamsObject {
  listingType?: string;
  propertyType?: string;
  location?: string;
  minPrice?: string;
  maxPrice?: string;
  minArea?: string;
  maxArea?: string;
  [key: string]: string | undefined;
}

const useParseSearchParams = (): SearchParamsObject => {
  const searchParams = useSearchParams();

  const parsedParams: SearchParamsObject = {};

  // List of expected parameters
  const expectedParams = [
    "listingType",
    "propertyType",
    "location",
    "minPrice",
    "maxPrice",
    "minArea",
    "maxArea",
  ];

  expectedParams.forEach((param) => {
    const value = searchParams.get(param);
    if (value !== null) {
      parsedParams[param] = value;
    }
  });

  return parsedParams;
};

export default function Listings() {
  const [dataReceivedDB, setDataReceivedDB] = useState<Listing[]>([]);
  const router = useRouter();
  const searchParams = useSearchParams();
  const parsedParams = useParseSearchParams();

  const url = `${searchParams}`;

  useEffect(() => {
    //This useEffect acts as componentDidMount. It will only run once when the component mounts, since the dependency array is empty
    async function fetchAllListings() {
      if (url !== null) {
        console.log(url);
      }
      const entries = Object.entries(url);

      try {
        const response = await fetch("/api/listings", {
          method: "POST",
          body: JSON.stringify(url !== null ? url : "GETALL"),
          headers: { "Content-Type": "application/json" },
        });

        if (response.ok) {
          const data = await response.json();
          setDataReceivedDB(data);
        } else {
          const error = await response.json();
          console.error("Data fetching failed", error.message);
        }
      } catch (err) {
        console.error("Data fetching failed Step: ", err);
      }
    }

    fetchAllListings();
  }, []);

  const handleSearch = async (params: SearchParams) => {
    // Create a new URLSearchParams object
    const queryParams = new URLSearchParams();

    // Add all non-null and non-undefined params to queryParams
    Object.entries(params).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== "") {
        queryParams.append(key, value.toString());
      }
    });

    // Update the URL
    router.push(`/listings?${queryParams.toString()}`, undefined);
    console.log(parsedParams);

    try {
      const response = await fetch("/api/listings", {
        method: "POST",
        body: JSON.stringify({
          params,
        }),
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        const data = await response.json();
        setDataReceivedDB(data);
      } else {
        const error = await response.json();
        console.error("Data fetching failed", error.message);
      }
    } catch (err) {
      console.error("Data fetching failed Step: ", err);
    }
  };

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
              <Suspense>
                <SearchListings onSearch={handleSearch} />
              </Suspense>
            </div>
          </div>
        </div>

        {/* Houses */}
        <div className="w-full mx-auto flex justify-center pt-20 ">
          <div className="flex justify-center md:items-start items-center flex-row flex-wrap gap-y-5 gap-x-28">
            {dataReceivedDB.map((house) => (
              <div className={`flex box-border`} key={house.id}>
                <ListingsCard
                  images={house.images}
                  location={house.location}
                  area={house.area}
                  bedrooms={house.bedrooms}
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
