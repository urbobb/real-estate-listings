"use client";
import React, { useState } from "react";
import SearchListings from "../components/SearchListings";
import SearchCheckbox from "../components/SearchCheckbox";

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
    <div className="h-screen mx-auto w-full pt-24">
      <div className="md:w-full h-full w-9/12 mx-auto">
        <div className="border-2 md:fixed w-full md:left-0 md:top-0 pt-28 sm:w-[300px] h-full mx-auto md:bg-[#FEFCFF]">
          <div className="md:w-5/6 mx-auto">
            <div className="mb-5">
              <h1 className="text-[1.2rem] font-semibold">Search</h1>
            </div>
            {/* SEARCH */}
            <div className="sticky">
              <form
                action=""
                onSubmit={handleSubmit}
                className="flex flex-col gap-5">
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
      </div>
    </div>
  );
}
