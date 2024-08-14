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

  return <SearchBarListings />;
}
