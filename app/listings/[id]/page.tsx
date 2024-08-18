"use client";
import React, { useState } from "react";
import { houses } from "@/app/shared/HousesList";
import Image from "next/image";
import ContactInfo from "@/app/components/ContactInfo";

export default function List({ params }: { params: { id: string } }) {
  //const res = await fetch(`/listings/${params.id}`);
  const house = houses[parseInt(params.id, 10)];
  const [num, setNum] = useState(0);

  let images = [
    { src: houses[0].listingsImage },
    { src: houses[1].listingsImage },
    { src: houses[2].listingsImage },
    { src: houses[3].listingsImage },
    { src: houses[4].listingsImage },
  ];
  const increment = () => {
    if (num <= images.length - 1) {
      setNum(num + 1);
    }
    console.log("Increment");
  };
  const decrement = () => {
    if (num > 0) {
      setNum(num - 1);
    }
    console.log("Decrement");
  };
  return (
    <div className="w-full md:p-24 md:pt-24 pt-[70px] my-auto">
      <div className="flex flex-col gap-8 md:h-full md:w-9/12 w-full mx-auto md:py-10 pt-5 pb-10 drop-shadow-sm ">
        {/* IMAGES */}
        <div className="flex flex-row justify-center items-center w-full mx-auto transition duration-300">
          <div
            className="hover:cursor-pointer transition duration-300"
            onClick={decrement}>
            <Image
              className="hover:cursor-pointer md:w-[300px]"
              src={
                num > 0 ? images[num - 1].src : images[images.length - 1].src
              }
              alt="housepicture"
              height={200}
            />
          </div>
          <div className="md:h-[415px] border transition duration-300">
            <Image
              className="hover:scale-105 duration-500 ease-out delay-100 hover:cursor-pointer"
              src={
                num < images.length - 1 ? images[num + 1].src : images[0].src
              }
              alt="housepicture"
              height={500}
            />
          </div>
          <div
            className="hover:cursor-pointer md:w-[300px] transition duration-300"
            onClick={increment}>
            <Image
              className="hover:cursor-pointer"
              src={images[2 + num].src}
              alt="housepicture"
              height={200}
            />
          </div>
        </div>
        <div className="md:w-full w-11/12 mx-auto">
          {/* TITLE */}
          {/* <div className="title">
            <h1 className="font-bold text-xl">{houses[1].title}</h1>
          </div> */}
          {/* DESCRIPTION */}
          <div className="description  flex md:flex-row flex-col md:gap-16 gap-5 p-5 justify-between ">
            <div className="flex w-full">
              <div className="w-full flex md:flex-row flex-col justify-between">
                <div className="w-full flex flex-col gap-3">
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
                          <i className="fa-solid fa-ruler"></i> {houses[1].area}
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
