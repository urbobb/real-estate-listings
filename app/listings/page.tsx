"use server";
import React from "react";
import SearchBarListings from "@/app/components/SearchListings";
import ListingsCard from "../components/ListingsCard";
import { houses } from "@/app/shared/HousesList";
import { getListing } from "@/lib/listingActions";
import { get } from "http";

interface Listing {
  id: number;
  title: string;
  description: string;
  price: number;
  location: string;
  zipCode: number;
  propertyType: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  energyclass: string | null;
  listingType: string;
  createdAt: string | Date;
  updatedAt: string | Date;
}

export default async function Listings() {
  let listingsData: FormData;
  let dataToPass: FormData;

  const getList = async () => {
    const response = await fetch(`http://localhost:3000/api/listings`, {
      method: "POST",
    });

    return response.json();
  };

  // console.log("Directly from server: ", data);

  const receivedData = (data: FormData) => {
    "use server";
    console.log("received data: ", data);
    return data;
  };

  //const { listingType, propertyType, city, price, area } = receivedData;

  // const formData = new FormData();
  // formData.append("listingType", listingType);
  // formData.append("propertyType", propertyType);
  // formData.append("city", city);
  // formData.append("price", price);
  // formData.append("area", area);

  // console.log(formData);

  const data = await getListing();
  //console.log("data r: ", data);

  //Retrieve the listings
  // Fetch listings from the database

  // const receivedData = (data) => {
  //   console.log("Received Data from Database:", data);
  // };

  // const data = await getListing();

  // if (data === null) {
  //   return;
  // }

  //console.log("Data: ", typeof handleAction());

  return <div className="relative md:min-h-screen md:w-screen w-full mx-auto pt-20">
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
          
        </div>
      </div>
    </div>

    {/* Houses */}
    <div className="w-full mx-auto flex  pt-20 ">
      
    </div>
  </div>
</div>;
}
