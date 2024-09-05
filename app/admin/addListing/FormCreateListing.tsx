"use client";
import { useToast } from "@/components/ui/use-toast";
import { revalidatePath } from "next/cache";
import React, { useState } from "react";

type Props = {};

const FormCreateListing = ({}: Props) => {
  const { toast } = useToast();
  const [file, setFile] = useState<File[]>([]);
  const [previewUrl, setPreviewUrl] = useState<string[]>([]);
  let uploadedFiles;
  const listingDetails = [
    "Location",
    "Zip Code",
    "Property Type",
    "Bedrooms",
    "Bathrooms",
    "Area",
    "Energy Class",
    "Floors",
    "Building Floors",
    "Elevator",
    "Furnished",
    "Balcony",
    "Garage",
    "Heating",
    "Listing Type",
  ];
  const inputStyles = `w-full mb-10 min-h-max outline-0 text-[1.5em] border-b-2 
  border-stone-400 focus:border-stone-200 
  transition duration-300 bg-transparent`;
  const listingDetailLabelStyles = `lg:w-32`;
  const listingDetailInputStyles = `border rounded-md w-[150px] h-[50px] p-2`;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    uploadedFiles = e.target.files ?? null;

    if (uploadedFiles) {
      const filesArray = Array.from(uploadedFiles);

      setFile((prevState) => {
        const newState = [...prevState, ...filesArray];
        return newState;
      });

      filesArray.forEach((file) => {
        const previewUrl = URL.createObjectURL(file);
        console.log(previewUrl);

        // If you want to revoke the old preview URL
        URL.revokeObjectURL(previewUrl);
      });

      const url = filesArray.map((file) => URL.createObjectURL(file));

      setPreviewUrl((prevState) => {
        const newState = [...prevState, ...url];
        return newState;
      });
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const files = formData.getAll("file");
    const formEntries = Object.fromEntries(formData);

    try {
      if (file) {
        //After the file upload, submit the rest of the form data to your backend
        const response = await fetch("/api/admin/addListing", {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          const data = await response.json();
          toast({ description: "Successfully created Listing." });
          //revalidatePath("/");
          window.location.reload();
        } else {
          const error = await response.json();
          toast({
            variant: "destructive",
            description: "An error occured. Please try again.",
          });
          console.error("Submission failed: ", error.message);
        }
      }
    } catch (err) {
      toast({
        variant: "destructive",
        description: "An error occured. Please try again.",
      });
      console.error("Error during submission: ", err);
    }
  };

  const handleClearClick = () => {
    // Clear the list
    setPreviewUrl([]);
    setFile([]);
    uploadedFiles = null;
  };

  return (
    <div className="lg:w-1/2 w-full mx-auto flex flex-col lg:p-0 p-5">
      <div>
        <p className="font-bold text-[1.3rem]">Add a new Listing</p>
      </div>
      <form action="" onSubmit={onSubmit}>
        <div className="w-full mx-auto mt-5 mb-5">
          <label htmlFor="Title">Title</label>
          <input
            id="title"
            name="Title"
            type="text"
            className={`${inputStyles}`}
          />
          <label htmlFor="">Description</label>
          <textarea
            id="description"
            name="Description"
            className={`${inputStyles}`}
            cols={2}
            rows={4}
          />

          <div className="flex flex-row gap-2 items-center mb-16">
            <label htmlFor="">Price</label>
            <input
              id="price"
              name="Price"
              type="number"
              placeholder="200.000 €"
              className="border rounded-md w-[200px] h-[50px] p-2"
            />
          </div>

          <div className="">
            <div className="bg-slate-200 p-2 rounded-lg mb-5">
              <h1 className="font-bold text-xl">
                <i className="fa-solid fa-house"></i> Property Details
              </h1>
            </div>
            <div className="grid md:grid-cols-2 grid-cols-1 gap-y-5 lg:gap-x-2 md:gap-x-2 w-full">
              {listingDetails.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-row gap-2 lg:justify-normal justify-between items-center">
                  <label className={`${listingDetailLabelStyles}`} htmlFor="">
                    {item}
                  </label>
                  <input
                    id={item}
                    name={item}
                    type="text"
                    className={`${listingDetailInputStyles}`}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="upload-container justify-start items-start">
          <div className="upload-area border-[2px] border-dashed border-[#007BFF] rounded-lg p-[50px] text-center bg-[#fff] relative cursor-pointer transition-[background-color] duration-[0.3s] ease-[ease] ">
            <i className="fa-solid fa-cloud-arrow-up font-[50px] text-[#007BFF]"></i>
            <p className="font-[18px] text-[#555]">Upload images here!</p>
            <input
              type="file"
              id="file"
              name="file"
              accept="images/*"
              multiple
              className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
              onChange={(e) => {
                handleChange(e);
              }}
            />
          </div>
        </div>
        <button
          className="w-full mt-5 border p-2 bg-transparent rounded-md transition 
          ease-in duration-200 hover:bg-black hover:text-white">
          Add
        </button>
      </form>
      <div className="file-list mt-5 w-full flex flex-col" id="fileList">
        <ul className="relative grid grid-cols-6 gap-2 h-full">
          {previewUrl.map((item, index) => (
            <img
              className="h-full"
              key={index}
              src={item}
              alt="Selected file"
            />
          ))}
        </ul>
        <div className="flex justify-end">
          <button
            onClick={handleClearClick}
            className="p-3 mb-3 border rounded-md hover:bg-red-500">
            Clear All
          </button>
        </div>
      </div>
    </div>
  );
};

export default FormCreateListing;
