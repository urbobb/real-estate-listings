import React from "react";
import Image from "next/image";
import { StaticImageData } from "next/image";

type Props = {
  listingsImage: StaticImageData;
  location: string;
  area: number;
  energyClass: string;
  price: number;
  id: number;
};

const ListingsCard = ({
  listingsImage,
  location,
  area,
  energyClass,
  price,
  id,
}: Props) => {
  return (
    <div className=" bg-[#ffffff] rounded overflow-hidden mb-5 drop-shadow w-[19rem] sm:w-[22rem] md:w-[24rem]">
      <a href={`/listings/${id}`} target="_blank" className="w-full">
        <div className="md:w-full h-[200px]  overflow-hidden ">
          <Image
            className="md:h-full md:w-full rounded hover:scale-105 duration-500 ease-out delay-100 hover:cursor-pointer "
            src={listingsImage}
            alt={listingsImage.toString()}
          />
        </div>
        <div className="min-h-fit mt-5 ml-2 w-full">
          <div className="h-48 flex gap-5">
            <div className="flex flex-col basis-2/3 gap-5 ">
              <p>
                <span className="font-bold text-[14px]">Location:</span>
              </p>
              <p>
                <span className="font-bold text-[14px]">
                  Superfisce calpistabili:
                </span>
              </p>
              <p>
                <span className="font-bold text-[14px]">Energy class:</span>
              </p>
              <p>
                <span className="font-bold text-[14px]">Price: </span>
              </p>
            </div>
            <div className="flex flex-col basis-1/4 gap-5 font-light">
              <p>{location}</p>
              <p>
                {area}m<sup>2</sup>
              </p>
              <p>{energyClass}</p>
              <p>{price.toFixed(3)}€</p>
            </div>
          </div>
        </div>
      </a>
    </div>
  );
};

export default ListingsCard;
