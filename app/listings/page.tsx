"use client";
import React, { useState } from "react";
import SearchListings from "../components/SearchListings";
import SearchCheckbox from "../components/SearchCheckbox";
import ListingsCard from "../components/ListingsCard";
import { houses } from "@/app/shared/HousesList";

type TypeState = {
  buy: boolean;
  rent: boolean;
};

type CatergoryState = {
  reside: boolean;
  business: boolean;
  luxury: boolean;
  holiday: boolean;
};

export default function Listings() {
  const [typeState, setTypeState] = useState<TypeState>({
    buy: false,
    rent: false,
  });
  const [catergoryState, setCatergoryState] = useState<CatergoryState>({
    reside: false,
    business: false,
    luxury: false,
    holiday: false,
  });
  const [priceState, setPriceState] = useState(0);

  const inputStyles = `w-full mb-2 min-h-max outline-0 text-[1.1em] 
  border-b-2 border-stone-400 focus:border-stone-200 transition duration-300
  bg-transparent`;
  const checkBoxLabelStyle = `flex items-center justify-center border w-28 
  rounded-lg h-10 hover:cursor-pointer hover:text-blue-600 hover:border-blue-600  `;
  // const focusCheckbox = checkBoxState.buy
  //   ? `focus:bg-blue-100 focus:text-blue-600
  // focus:border-blue-600`
  //   : "";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    const formData = new FormData(e.currentTarget);
    e.preventDefault(); // prevents reloading when the form is submitted
    const formEntries = Object.fromEntries(formData.entries());
    console.log("Submitted: ", formEntries);
  };

  const handleTypeCheckboxChange = async (name: keyof TypeState) => {
    // giving type to name
    //console.log(name);

    await setTypeState((prevState) => {
      let newState = {
        ...prevState,
        [name]: !prevState[name], // toggle the checkbox state
      };

      // Log the new state of the checkbox
      //console.log(`Checked [${name}]: `, newState);

      return newState;
    });

    //console.log("TypeState: ", typeState);
  };

  const handleCatergoryCheckboxChange = async (name: keyof CatergoryState) => {
    // giving type to name
    await setCatergoryState((prevState) => {
      let newState = {
        ...prevState,
        [name]: !prevState[name],
      };

      return newState;
    });

    //console.log("Category State: ", catergoryState);
  };

  function handlePriceChange(e: string) {
    setPriceState(parseInt(e));
  }

  return (
    <div className="relative h-screen w-screen pt-20">
      <div className="flex md:flex-row flex-col md:w-screen h-screen ">
        <div className="flex basis-1/4 border-2 h-screen mx-auto bg-[#FEFCFF]">
          {/* SEARCHBAR */}
          <div
            className="md:fixed md:basis-1/4 md:left-0 md:top-0 md:bottom-0 
          mx-auto p-5 pr-10 md:pt-28">
            <div className="flex md:justify-start justify-center mb-5 sm:mx-5">
              <h1 className="md:text-[1.3rem] text-[1.5rem] md:font-extrabold font-semibold tracking-[10px]">
                Search
              </h1>
            </div>

            <div className="min-w-max">
              <form
                action=""
                onSubmit={handleSubmit}
                className="flex flex-col gap-5 mx-5 w-[250px]">
                <div className="flex md:gap-10 flex-col mb-5">
                  {/* TYPE */}
                  <div className="flex flex-col items-start gap-2">
                    <p>Type</p>
                    <div className="flex justify-center items-center gap-2">
                      <SearchCheckbox
                        name="Buy"
                        checked={typeState.buy}
                        handleAction={() => handleTypeCheckboxChange("buy")}
                      />
                      <SearchCheckbox
                        name="Rent"
                        checked={typeState.rent}
                        handleAction={() => handleTypeCheckboxChange("rent")}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col md:justify-center gap-2">
                    <p>Category</p>
                    <div className="flex flex-col gap-2">
                      <div className="flex justify-start gap-2">
                        <SearchCheckbox
                          name="Reside"
                          checked={catergoryState.reside}
                          handleAction={() =>
                            handleCatergoryCheckboxChange("reside")
                          }
                        />

                        <SearchCheckbox
                          name="Business"
                          checked={catergoryState.business}
                          handleAction={() =>
                            handleCatergoryCheckboxChange("business")
                          }
                        />
                      </div>
                      <div className="flex justify-start gap-2">
                        <SearchCheckbox
                          name="Luxury"
                          checked={catergoryState.luxury}
                          handleAction={() =>
                            handleCatergoryCheckboxChange("luxury")
                          }
                        />

                        <SearchCheckbox
                          name="Holiday"
                          checked={catergoryState.holiday}
                          handleAction={() =>
                            handleCatergoryCheckboxChange("holiday")
                          }
                        />
                      </div>
                    </div>
                  </div>
                  {/* PLACE */}
                  <div className="flex flex-row gap-2">
                    <p>City</p>
                    <select className={`${inputStyles}`}>
                      <option value="All above">All above</option>
                      <option value="New York">New York</option>
                      <option value="Miami">Miami</option>
                    </select>
                  </div>
                  <div className="flex flex-row gap-2">
                    <p>Zone</p>
                    <input type="text" className={`${inputStyles}`} />
                  </div>

                  <div className="flex flex-col gap-10">
                    <div className="flex flex-col gap-2">
                      <label htmlFor="">Price</label>
                      <input
                        type="range"
                        min="100000"
                        max="1000000"
                        className="slider w-full mb-2 min-h-max"
                        onChange={(e) => {
                          handlePriceChange(e.target.value);
                        }}
                      />
                      <p>{priceState} €</p>
                    </div>

                    <div className="flex flex-col gap-2">
                      <label htmlFor="">Squaremeters</label>
                      <input type="text" className={`${inputStyles}`} />
                    </div>
                  </div>
                </div>
                <button
                  className="-mt-5 rounded-lg border border-black px-8 py-3 transition 
              duration-500 hover:text-white hover:scale-90 hover:bg-black">
                  Search
                </button>
              </form>
            </div>
            <div className="h-full"></div>
          </div>
        </div>

        {/* Houses */}
        <div className="w-full mx-auto flex md:pt-5 pt-20 ">
          <div className="flex justify-center items-center flex-row flex-wrap gap-y-5 gap-x-28">
            {houses.map((house, index) => (
              <div
                className={`flex-[0_0_calc(20%_-_1rem)] box-border`}
                key={index}>
                <ListingsCard
                  listingsImage={house.listingsImage}
                  location={house.location}
                  area={house.area}
                  energyClass={house.energyClass}
                  price={house.price}
                  id={house.id}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
