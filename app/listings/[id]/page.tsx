"use client";
import React, { useState } from "react";
import { houses } from "@/app/shared/HousesList";
import ContactInfo from "@/app/components/ContactInfo";
import ImageGallery from "@/app/components/ImageGallery";

export default function List({ params }: { params: { id: string } }) {
  //const res = await fetch(`/listings/${params.id}`);
  const house = houses[parseInt(params.id, 10)];

  let images = [
    { src: houses[0].listingsImage },
    { src: houses[1].listingsImage },
    { src: houses[2].listingsImage },
    { src: houses[3].listingsImage },
    { src: houses[4].listingsImage },
    { src: houses[5].listingsImage },
    { src: houses[6].listingsImage },
    { src: houses[1].listingsImage },
    { src: houses[3].listingsImage },
    { src: houses[9].listingsImage },
  ];

  let details = [
    {
      yearOfConstruction: 1990,
    },
  ];

  return (
    <div className="w-full md:p-24 md:pt-24 pt-[70px] my-auto">
      <div className="flex flex-col gap-8 md:h-full md:w-9/12 w-full mx-auto md:py-10 pt-5 pb-10 drop-shadow-sm ">
        {/* IMAGES */}
        <div className="grid gap-8 md:grid-cols-1 w-full">
          <ImageGallery images={images} />
        </div>
        <div className="md:w-full w-11/12 mx-auto">
          <div className="description  flex lg:flex-row flex-col md:gap-16 gap-5 p-5 justify-between ">
            <div className="flex w-full">
              <div className="w-full flex md:flex-row flex-col justify-between">
                <div className="w-full flex flex-col gap-3">
                  <div className="flex flex-col gap-5">
                    <div className="flex md:flex-row flex-col gap-5 justify-between">
                      <div className="flex flex-col gap-5">
                        <h1 className="font-bold text-xl">
                          {houses[0].title.toLocaleString()}
                        </h1>
                        <div className="flex flex-row gap-5">
                          <p>
                            <i className="fa-solid fa-bed"></i>{" "}
                            {houses[1].bedrooms} Beds
                          </p>
                          <p>
                            <i className="fa-solid fa-bath"></i>{" "}
                            {houses[1].bathrooms} Baths
                          </p>
                          <p>
                            <i className="fa-solid fa-ruler"></i>{" "}
                            {houses[1].area}
                            m&#178;
                          </p>
                        </div>
                      </div>

                      {/* PRICE AND LOCATION */}
                      <div className="">
                        <p className="font-bold text-[1.2rem] mb-2">
                          {houses[0].price.toLocaleString()} €
                        </p>
                        <p>Location: {houses[1].location}</p>
                      </div>
                    </div>
                    {/* DETAILS */}
                    <div className="flex-row border-t border-b w-full py-2">
                      <h1 className="mb-3 font-semibold w-full border bg-gray-200 rounded p-2">
                        <i className="fa-solid fa-house"></i> Property
                        Information
                      </h1>
                      <div className="px-4">
                        <div className="mb-5">
                          <h2 className="font-semibold mb-2">Year Built</h2>
                          <p>&bull; Year Built: {houses[0].yearBuilt}</p>
                        </div>
                        <div>
                          <h2 className="font-semibold mb-2">Property Type</h2>
                          <p>&bull; Property Type: {houses[0].propertyType} </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-5 mt-10 basis-[25%]">
                    <h1>Description:</h1>
                    <p className="text-justify">{houses[0].description}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative flex justify-center h-full border rounded-lg">
              <ContactInfo />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
