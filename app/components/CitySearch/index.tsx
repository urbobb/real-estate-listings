import { useRouter } from "next/navigation";
import React, { useState } from "react";

const CitySearch: React.FC = () => {
  const router = useRouter();
  const [selectedCity, setSelectedCity] = useState("all-above");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (selectedCity) {
      router.push(`listings?location=${selectedCity}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center space-x-2">
      <div
        className="sponsor md:w-11/12 w-5/6 mx-auto py-5 
              h-[150px]">
        <div className="pl-2 mb-3">
          <h1 className="text-2xl font-bold">Search</h1>
        </div>
        <div
          className="md:w-1/3 w-full pl-2 flex justify-between gap-3
                border border-black ">
          <div className="flex justify-start items-center w-full">
            <label className="basis-1/6" htmlFor="city">
              City:
            </label>
            <select
              name="location"
              id="location"
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="basis-auto w-full min-h-max outline-0 md:text-[1.2em] text-[1em]
                      border-b-2 border-stone-400 focus:border-stone-200 
                      transition duration-300 bg-transparent">
              <option value="all-above">All above</option>
              <option value="Milan">Milan</option>
              <option value="Como">Como</option>
              <option value="Bologna">Bologna</option>
              <option value="Verona">Verona</option>
              <option value="Turin">Turin</option>
              <option value="Brescia">Brescia</option>
              <option value="Asti">Asti</option>
              <option value="Genoa">Genoa</option>
              <option value="Venice">Venice</option>
            </select>
          </div>
          <button
            className="rounded-full border-2 border-slate-50 
                  px-3 py-2 transition duration-500 hover:text-black hover:bg-white">
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </div>
      </div>
    </form>
  );
};

export default CitySearch;
