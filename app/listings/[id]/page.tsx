"use client";
import React, { useState } from "react";
import { houses } from "@/app/shared/HousesList";
import ContactInfo from "@/app/components/ContactInfo";
import ImageGallery from "@/app/components/ImageGallery";
import balcony from "@/app/assets/balcony.png";
import Image from "next/image";
import ListingDetailItem from "@/app/components/ListingDetailItem";

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

  const detailsStyle = `flex flex-col`;
  const detailsContentStyle = `text-sm ml-7`;

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
                      <div className="grid grid-cols-2 md:gap-y-2 gap-y-4">
                        <ListingDetailItem
                          title={"Property Type"}
                          content={houses[0].propertyType}
                          icon={`fa-solid fa-building mr-2`}
                        />
                        <ListingDetailItem
                          title={"Contract"}
                          content={houses[0].listingType}
                          icon={`fa-solid fa-file-signature mr-2`}
                        />
                        <ListingDetailItem
                          title={"Floors"}
                          content={houses[0].floors}
                          icon={`fa-solid fa-stairs mr-2`}
                        />
                        <ListingDetailItem
                          title={"Building Floors"}
                          content={houses[0].floors}
                          icon={`fa-solid fa-building mr-2`}
                        />
                        <ListingDetailItem
                          title={"Elevator"}
                          content={houses[0].elevator ? "Yes" : "No"}
                          icon={`fa-solid fa-elevator mr-2`}
                        />
                        <ListingDetailItem
                          title={"Area"}
                          content={`${houses[0].area}m²`}
                          icon={`fa-solid fa-elevator mr-2`}
                        />
                        <ListingDetailItem
                          title={"Bedrooms"}
                          content={houses[0].bedrooms}
                          icon={`fa-solid fa-bed mr-2`}
                        />
                        <ListingDetailItem
                          title={"Bathrooms"}
                          content={houses[0].bathrooms}
                          icon={`fa-solid fa-bath mr-2`}
                        />
                        <ListingDetailItem
                          title={"Furnished"}
                          content={houses[0].furnished}
                          icon={`fa-solid fa-couch mr-2`}
                        />

                        <div className={`${detailsStyle}`}>
                          <div className=" flex flex-row gap-2">
                            <Image
                              src={balcony}
                              alt="balconyImage"
                              height={18}
                            />
                            <h2 className="font-semibold md:text-base text-[0.9rem]">
                              Balcony
                            </h2>
                          </div>
                          <p className={`${detailsContentStyle}`}>
                            {houses[0] ? "Yes" : "No"}
                          </p>
                        </div>

                        <ListingDetailItem
                          title={"Garage"}
                          content={houses[0].garage}
                          icon={`fa-solid fa-car mr-2`}
                        />
                        <ListingDetailItem
                          title={"Heating"}
                          content={houses[0].heating}
                          icon={`fa-solid fa-fire mr-2`}
                        />
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
            <div className="relative flex justify-center h-full border rounded-lg md:mt-0 mt-10">
              <ContactInfo />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
