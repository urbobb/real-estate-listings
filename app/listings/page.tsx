"use client";
import React, { useState } from "react";
import SearchListings from "../components/SearchListings";

export default function Listings() {
  const [checkBoxState, setCheckBoxState] = useState({
    buy: false,
    rent: false,
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // prevents reloading when the form is submitted
    console.log("Submitted");
  };

  const handleCheckboxChange = async (name: string) => {
    //console.log(name);

    await setCheckBoxState((prevState: any) => {
      let newState = {
        ...prevState,
        [name]: !prevState[name], // toggle the checkbox state
      };

      // Log the new state of the checkbox
      console.log(`Checked [${name}]: `, newState);

      return newState;
    });

    console.log(checkBoxState);
  };

  function handlePriceChange(e: string) {
    setPriceState(parseInt(e));
  }

  return (
    <div className="h-screen mx-auto w-full pt-24">
      <div className="md:w-5/6 h-full w-9/12 mx-auto">
        <div className="md:fixed md:left-0 ml-10 md:w-1/6 mx-auto mt-5 ">
          <h1 className="text-2xl font-light">Search</h1>
          {/* SEARCH */}
          <div className="sticky">
            <form
              action=""
              onSubmit={handleSubmit}
              className="flex flex-col gap-5">
              <div className="flex md:gap-10 flex-col">
                <div className="flex justify-start items-center gap-2">
                  <p>Type</p>
                  <input
                    type="checkbox"
                    id="checkBuy"
                    name="rent"
                    value="buy"
                    checked={checkBoxState.buy}
                    className="hidden"
                  />
                  <label
                    className={`${checkBoxLabelStyle} ${
                      checkBoxState.buy
                        ? "bg-blue-100 text-blue-600 border-blue-600"
                        : "border-gray-300 text-black"
                    }`}
                    onClick={(e) => handleCheckboxChange("buy")}>
                    Buy
                  </label>

                  <input
                    type="checkbox"
                    id="checkRent"
                    value="rent"
                    checked={checkBoxState.rent}
                    onChange={() => {}}
                    className="hidden"
                  />
                  <label
                    className={`${checkBoxLabelStyle} ${
                      checkBoxState.rent
                        ? "bg-blue-100 text-blue-600 border-blue-600"
                        : ""
                    }`}
                    onClick={(e) => handleCheckboxChange("rent")}>
                    Rent
                  </label>
                </div>
                <div className="flex flex-col md:justify-center gap-2">
                  <p>Category</p>
                  <div className="flex flex-col gap-2">
                    <div className="flex justify-start gap-16">
                      <input type="checkbox" className="hidden" />
                      <label htmlFor="" className={`${checkBoxLabelStyle}`}>
                        Rent
                      </label>
                      <input type="checkbox" className="hidden" />
                      <label htmlFor="" className={`${checkBoxLabelStyle}`}>
                        Business
                      </label>
                    </div>
                    <div className="flex justify-start gap-16">
                      <input type="checkbox" className="hidden" />
                      <label htmlFor="" className={`${checkBoxLabelStyle}`}>
                        Luxus
                      </label>
                      <input type="checkbox" className="hidden" />
                      <label htmlFor="" className={`${checkBoxLabelStyle}`}>
                        Holiday
                      </label>
                    </div>
                  </div>
                </div>
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

                <div className="">
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
                  <label htmlFor="">Squaremeters</label>
                  <input type="text" className={`${inputStyles}`} />
                </div>
              </div>
              <button
                className="-mt-5 rounded-lg border border-black px-8 py-3 transition 
              duration-500 hover:text-white hover:scale-90 hover:bg-black">
                Search
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
