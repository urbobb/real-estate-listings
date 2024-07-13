import React from "react";
import Image from "next/image";
import { StaticImageData } from "next/image";

type Props = {
  listingsImage: StaticImageData;
};

const ListingsCard = ({ listingsImage }: Props) => {
  return (
    <div className="h-60 w-96 mb-10 md:mb-0">
      <Image src={listingsImage} alt={listingsImage.toString()} />
      <p>{listingsImage.src}</p>
    </div>
  );
};

export default ListingsCard;
