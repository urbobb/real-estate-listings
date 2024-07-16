import React from "react";
import Image from "next/image";
import { StaticImageData } from "next/image";

type Props = {
  listingsImage: StaticImageData;
  id: number;
};

const ListingsCard = ({ listingsImage, id }: Props) => {
  return (
    <a href={`/listings/${id}`} target="_blank" className="w-80 text-white">
      <div className="rounded-2xl overflow-hidden border-2 border-solid border-stone-400">
        <Image
          className="md:h-full rounded-2xl overflow-hidden hover:scale-90 hover:opacity-70 duration-500 ease-out delay-100 hover:cursor-pointer flex items-center justify-center"
          src={listingsImage}
          alt={listingsImage.toString()}
        />
      </div>
      <p>{id}</p>
    </a>
  );
};

export default ListingsCard;
