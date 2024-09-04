"use client";
import ListingsCard from "@/app/components/ListingsCard";
import { useToast } from "@/components/ui/use-toast";
import { revalidatePath } from "next/cache";
import React, { useEffect, useState } from "react";

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
  energyclass: string;
  listingType: string;
  createdAt: string;
  updatedAt: string;
  images: Image[];
}

interface Image {
  id: number;
  url: string;
  listingId: number;
}

type Props = {};

const GetListings = ({}: Props) => {
  const [priceState, setPriceState] = useState(250000);
  const [dataReceivedDB, setDataReceivedDB] = useState<Listing[]>([]);
  const [imagesUrl, setImagesUrl] = useState<string[]>([]);

  useEffect(() => {
    //This useEffect acts as componentDidMount. It will only run once when the component mounts, since the dependency array is empty
    async function fetchAllListings() {
      try {
        const response = await fetch("/api/listings", {
          method: "POST",
          body: JSON.stringify("GETALL"),
          headers: { "Content-Type": "application/json" },
        });

        if (response.ok) {
          const data = await response.json();
          setDataReceivedDB(data);
          const allImagesUrls = data.map((listing: Listing) =>
            listing.images.map((image) => image.url)
          );
          setImagesUrl(allImagesUrls);
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // prevents reloading when the form is submitted
    const formData = new FormData(e.currentTarget); // Get form data
    const formEntries = Object.fromEntries(formData);

    try {
      const response = await fetch("/api/listings", {
        method: "POST",
        body: JSON.stringify({
          formEntries,
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

    // setTypeState({
    //   FOR_SALE: false,
    //   FOR_RENT: false,
    // });
    // setCatergoryState({
    //   HOUSE: false,
    //   APARTMENT: false,
    //   Villa: false,
    //   Business: false,
    // });
  };

  return (
    <div className="w-full mx-auto flex justify-center pt-20 ">
      <div className="flex justify-center md:items-start items-center flex-row flex-wrap gap-y-5 gap-x-28">
        {dataReceivedDB.map((house) => (
          <div className={`flex box-border`} key={house.id}>
            <ListingsCard
              image={house.images[0].url}
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
  );
};

export default GetListings;
