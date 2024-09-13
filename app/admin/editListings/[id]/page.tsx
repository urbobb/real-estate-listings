"use client";
import React, { ChangeEvent, useEffect, useState } from "react";
import ImageGallery from "@/app/components/ImageGallery";
import balcony from "@/app/assets/balcony.png";
import Image from "next/image";
import ListingDetailItem from "./ListingDetailitem";
import { usePathname } from "next/navigation";
import { toast } from "@/components/ui/use-toast";
import { ListingId } from "@/lib/types";

export default function EditListing({ params }: { params: { id: string } }) {
  const pathname = usePathname();
  const [dataReceivedDB, setDataReceivedDB] = useState<ListingId | null>(null);
  const [imagesUrl, setImagesUrl] = useState<string[]>([]);
  const [isGalleryClicked, setIsGalleryClicked] = useState<boolean>(false);
  const [values, setValues] = useState({
    id: dataReceivedDB?.id || "",
    title: dataReceivedDB?.title || "",
    bedrooms: dataReceivedDB?.bedrooms || "",
    bathrooms: dataReceivedDB?.bathrooms || "",
    area: dataReceivedDB?.area || "",
    price: dataReceivedDB?.price || "",
    location: dataReceivedDB?.location || "",
    propertyType: dataReceivedDB?.propertyType || "",
    listingType: dataReceivedDB?.listingType || "",
    floors: dataReceivedDB?.floors || "",
    buildingFloors: dataReceivedDB?.buildingFloors || "",
    elevator: dataReceivedDB?.elevator || "",
    furnished: dataReceivedDB?.furnished || "",
    balcony: dataReceivedDB?.balcony || "",
    garage: dataReceivedDB?.garage || "",
    heating: dataReceivedDB?.heating || "",
    energyclass: dataReceivedDB?.energyclass || "",
    description: dataReceivedDB?.description || "",
  });

  const detailsStyle = `flex flex-col`;
  const detailsContentStyle = `text-sm ml-7`;

  useEffect(() => {
    setValues({
      id: dataReceivedDB?.id || "",
      title: dataReceivedDB?.title || "",
      bedrooms: dataReceivedDB?.bedrooms || "",
      bathrooms: dataReceivedDB?.bathrooms || "",
      area: dataReceivedDB?.area || "",
      price: dataReceivedDB?.price || "",
      location: dataReceivedDB?.location || "",
      propertyType: dataReceivedDB?.propertyType || "",
      listingType: dataReceivedDB?.listingType || "",
      floors: dataReceivedDB?.floors || "",
      buildingFloors: dataReceivedDB?.buildingFloors || "",
      elevator: dataReceivedDB?.elevator || "",
      furnished: dataReceivedDB?.furnished || "",
      balcony: dataReceivedDB?.balcony || "",
      garage: dataReceivedDB?.garage || "",
      heating: dataReceivedDB?.heating || "",
      energyclass: dataReceivedDB?.energyclass || "",
      description: dataReceivedDB?.description || "",
    });
  }, [dataReceivedDB]);

  useEffect(() => {
    const id = pathname.split("/").pop(); //extract the id from the pathname. assume the id is the last segment of the path
    async function fetchListing() {
      try {
        const response = await fetch(`/api/${pathname}`, {
          method: "POST",
          body: JSON.stringify({
            id, // send the extracted id in the request body
          }),
          headers: { "Content-Type": "application/json" },
        });

        if (response.ok) {
          const data = await response.json();
          setDataReceivedDB(data);
          toast({ description: "Successfully fetched Listing." });
          if (data && data.images) {
            const urls = data.images.map((image: any) => image.url);
            setImagesUrl(urls);
          }
        } else {
          const err = await response.json();
          toast({
            variant: "destructive",
            description: `${err.error}`,
          });
          console.error("Data fetching failed", err.message);
        }
      } catch (err) {
        console.error("Data fetching failed: ", err);
      }
    }
    fetchListing();
  }, [pathname]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const formEntries = Object.fromEntries(formData);
    console.log("formData", formEntries);

    async function updateListing() {
      try {
        const response = await fetch(`/api/${pathname}`, {
          method: "PUT",
          body: formData,
        });

        if (response.ok) {
          const data = await response.json();
          toast({ description: "Successfully updated Listing." });
          //revalidatePath("/");
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        } else {
          const error = await response.json();
          toast({
            variant: "destructive",
            description: "An error occured. Please try again.",
          });
        }
      } catch (err) {
        toast({
          variant: "destructive",
          description: "An error occured. Please try again.",
        });
      }
    }
    updateListing();
  };

  const handleGalleryClicked = () => {};

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value, // Update the specific field
    }));
  };

  return (
    <div className="w-full md:p-24 md:pt-24 pt-[70px] my-auto">
      <div className="flex flex-col gap-8 md:h-full md:w-9/12 w-full mx-auto md:py-10 pt-5 pb-10 drop-shadow-sm">
        {/* IMAGES */}
        <div
          className="grid gap-8 md:grid-cols-1 w-full"
          onClick={handleGalleryClicked}>
          <ImageGallery
            images={imagesUrl}
            clicked={isGalleryClicked}
            listingType={dataReceivedDB?.listingType}
          />
        </div>
        {!isGalleryClicked ? (
          <div className="md:w-full w-11/12 mx-auto">
            <div className="description  flex lg:flex-row flex-col md:gap-16 gap-5 p-5 justify-between">
              <div className="flex w-full">
                <div className="w-full flex md:flex-row flex-col justify-between">
                  <form
                    onSubmit={handleSubmit}
                    className="w-full flex flex-col gap-3">
                    <div className="flex flex-col gap-5">
                      <div className="flex md:flex-row flex-col gap-5 justify-between">
                        <div className="flex flex-col gap-5 w-5/6">
                          <input
                            type="text"
                            name={"title"}
                            value={values.title}
                            onChange={handleInputChange}
                            className="font-bold text-xl p-2 w-auto max-auto-fit"
                          />
                          <div className="flex flex-row gap-5">
                            <p>
                              <i className="fa-solid fa-bed"></i>
                              <input
                                type="text"
                                name={"bedrooms"}
                                value={values.bedrooms}
                                onChange={handleInputChange}
                                className="w-8 text-center"
                              />
                              Beds
                            </p>
                            <p>
                              <i className="fa-solid fa-bath"></i>
                              <input
                                type="text"
                                name={"bathrooms"}
                                value={values.bathrooms}
                                onChange={handleInputChange}
                                className="w-8 text-center"
                              />
                              Baths
                            </p>
                            <p>
                              <i className="fa-solid fa-ruler"></i>
                              <input
                                type="text"
                                name={"area"}
                                value={values.area}
                                onChange={handleInputChange}
                                className="w-12 text-center"
                              />
                              m&#178;
                            </p>
                          </div>
                        </div>

                        {/* PRICE AND LOCATION */}
                        <div className="">
                          <div className="flex flex-row">
                            <input
                              type="text"
                              name={"price"}
                              value={values.price}
                              onChange={handleInputChange}
                              className="font-bold text-[1.2rem] mb-2 w-[150px]"
                            />
                            <p>€</p>
                          </div>

                          <div className="flex flex-row">
                            <p>Location: </p>
                            <input
                              type="text"
                              name={"location"}
                              value={values.location}
                              onChange={handleInputChange}
                              className="pl-2 w-[150px]"
                            />
                          </div>
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
                            name={"propertyType"}
                            content={values.propertyType}
                            onChange={handleInputChange}
                            icon={`fa-solid fa-building mr-2`}
                          />
                          <ListingDetailItem
                            title={"Contract"}
                            name={"listingType"}
                            content={values.listingType}
                            onChange={handleInputChange}
                            icon={`fa-solid fa-file-signature mr-2`}
                          />
                          <ListingDetailItem
                            title={"Floors"}
                            name={"floors"}
                            content={values.floors}
                            onChange={handleInputChange}
                            icon={`fa-solid fa-stairs mr-2`}
                          />
                          <ListingDetailItem
                            title={"Building Floors"}
                            name={"buildingFloors"}
                            content={values.buildingFloors}
                            icon={`fa-solid fa-building mr-2`}
                            onChange={handleInputChange}
                          />
                          <ListingDetailItem
                            title={"Elevator"}
                            name={"elevator"}
                            content={values.elevator !== "" ? "Yes" : "No"}
                            onChange={handleInputChange}
                            icon={`fa-solid fa-elevator mr-2`}
                          />

                          <div className={`${detailsStyle}`}>
                            <h2 className="font-semibold md:text-base text-[0.9rem]">
                              <i className="fa-solid fa-ruler mr-2"></i>
                              Area in m&#178;
                            </h2>
                            <input
                              type="text"
                              name="area"
                              className={`${detailsContentStyle}`}
                              value={values.area}
                              onChange={handleInputChange}
                            />
                          </div>

                          <ListingDetailItem
                            title={"Bedrooms"}
                            name={"bedrooms"}
                            content={values.bedrooms}
                            onChange={handleInputChange}
                            icon={`fa-solid fa-bed mr-2`}
                          />
                          <ListingDetailItem
                            title={"Bathrooms"}
                            name={"bathrooms"}
                            content={values.bathrooms}
                            onChange={handleInputChange}
                            icon={`fa-solid fa-bath mr-2`}
                          />
                          <ListingDetailItem
                            title={"Furnished"}
                            name={"furnished"}
                            content={values.furnished}
                            onChange={handleInputChange}
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
                            <input
                              type="text"
                              name={"balcony"}
                              value={values.balcony ? "Yes" : "No"}
                              onChange={handleInputChange}
                              className={`${detailsContentStyle}`}
                            />
                          </div>

                          <ListingDetailItem
                            title={"Garage"}
                            name={"garage"}
                            content={values.garage}
                            onChange={handleInputChange}
                            icon={`fa-solid fa-car mr-2`}
                          />
                          <ListingDetailItem
                            title={"Heating"}
                            name={"heating"}
                            content={values.heating}
                            onChange={handleInputChange}
                            icon={`fa-solid fa-fire mr-2`}
                          />
                          <ListingDetailItem
                            title={"Energy Class"}
                            name={"energyclass"}
                            content={values.energyclass}
                            onChange={handleInputChange}
                            icon={`fa-solid fa-fire mr-2`}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col gap-5 mt-10 basis-[25%]">
                      <h1>Description:</h1>
                      <input
                        type="text"
                        value={values.description}
                        name={"description"}
                        onChange={handleInputChange}
                        className="text-justify"
                      />
                      <input
                        type="text"
                        value={values.id}
                        name={"id"}
                        onChange={() => {}}
                        className="text-justify"
                      />
                    </div>
                    <button className="border border-black p-2 hover:bg-black hover:text-white hover:cursor-pointer transition duration-200">
                      Submit
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
