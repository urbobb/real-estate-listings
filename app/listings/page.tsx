import React from "react";

export default function Listings() {
  return (
    <div className="h-screen mx-auto w-full pt-24 ">
      <div className="md:w-5/6 w-9/12 mx-auto">
        <div className="w-full mx-auto mt-5">
          <h1 className="text-2xl font-light">Search</h1>
          {/* SEARCH */}
          <div className="w-full">
            <form action="" className="flex flex-col gap-5">
              <div className="flex md:flex-row flex-col">
                <div className="flex justify-start">
                  <label htmlFor="">Type</label>
                  <select>
                    <option value="value">All above</option>
                    <option value="">Buy</option>
                    <option value="">Rent</option>
                  </select>
                </div>
                <div className="flex md:justify-center">
                  <label htmlFor="">Category</label>
                  <select>
                    <option value="value">All above</option>
                    <option value="">Display Text 2</option>
                    <option value="">Display Text 3</option>
                  </select>
                </div>
              </div>
              <div className="">
                <label htmlFor="">City</label>
                <select>
                  <option value="value">All above</option>
                  <option value="">New York</option>
                  <option value="">Miami</option>
                </select>
                <label htmlFor="">Zone</label>
                <input type="text" />
              </div>
              <div className="">
                <label htmlFor="">Price</label>
                <input type="text" />
                <label htmlFor="">Squaremeters</label>
                <input type="text" />
              </div>
              <button
                className="-mt-5 rounded-lg border-2 border-slate-50 px-8 py-3 transition 
              duration-500 hover:text-black hover:bg-white">
                Search
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
