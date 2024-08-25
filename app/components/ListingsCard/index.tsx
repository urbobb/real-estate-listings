"use client";
import React from "react";
import Image from "next/image";
import House1 from "@/app/assets/listings/House1.jpg";

type Props = {
  image: string;
  location: string;
  area: number;
  bedrooms: number;
  price: number;
  id: number;
};

const ListingsCard = ({
  image,
  location,
  area,
  bedrooms,
  price,
  id,
}: Props) => {
  return (
    <div className=" bg-[#ffffff] rounded overflow-hidden mb-5 drop-shadow w-[19rem] sm:w-[22rem] md:w-[24rem]">
      <a href={`/listings/${id}`} target="_blank" className="w-full">
        <div className="md:w-full h-[200px]  overflow-hidden">
          <img
            className="md:h-full md:w-full rounded hover:scale-105 duration-500 ease-out delay-100 hover:cursor-pointer "
            src={`https://homefinderr-images.s3.eu-north-1.amazonaws.com/${image}`}
            alt={"House image"}
          />
        </div>
        <div className="min-h-fit mt-5 ml-2 w-full">
          <div className="h-48 flex gap-5">
            <div className="flex flex-col w-full gap-5 ">
              <div className="flex flex-row gap-28">
                <p className="w-1/2">
                  <span className="font-bold text-[14px]">Location:</span>
                </p>
                <p className="w-1/2 mr-2">{location}</p>
              </div>

              <div className="flex flex-row gap-28">
                <p className="w-1/2">
                  <span className="font-bold text-[14px]">Superfisce:</span>
                </p>
                <p className="w-1/2 mr-2">
                  {area}m<sup>2</sup>
                </p>
              </div>

              <div className="flex flex-row gap-28">
                <p className="w-1/2">
                  <span className="font-bold text-[14px]">Bedrooms:</span>
                </p>
                <p className="w-1/2 mr-2">{bedrooms}</p>
              </div>

              <div className="flex flex-row gap-28">
                <p className="w-1/2">
                  <span className="font-bold text-[14px]">Price: </span>
                </p>
                <p className="w-1/2 mr-2">{price.toLocaleString()}€</p>
              </div>
            </div>
            {/* <div className="flex flex-col basis-1/2 gap-5 font-light"></div> */}
          </div>
        </div>
      </a>
    </div>
  );
};

export default ListingsCard;
