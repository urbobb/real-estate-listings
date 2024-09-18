import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import SearchCheckbox from "../SearchCheckbox";

interface SearchParams {
  listingType: string;
  propertyType: string;
  location: string;
  minPrice: number | null;
  maxPrice: number | null;
  minArea: number | null;
  maxArea: number | null;
}

interface SearchComponentProps {
  initialParams?: Partial<SearchParams>;
  onSearch: (params: SearchParams) => void;
}

type TypeState = {
  Sale: boolean;
  Rent: boolean;
};

type CatergoryState = {
  House: boolean;
  Apartment: boolean;
  Villa: boolean;
  Business: boolean;
};

const SearchComponent: React.FC<SearchComponentProps> = ({
  initialParams,
  onSearch,
}) => {
  const [searchParams, setSearchParams] = useState<SearchParams>({
    listingType: "",
    propertyType: "",
    location: "",
    minPrice: null,
    maxPrice: null,
    minArea: null,
    maxArea: null,
  });
  const [typeState, setTypeState] = useState<TypeState>({
    Sale: true,
    Rent: false,
  });
  const [catergoryState, setCatergoryState] = useState<CatergoryState>({
    House: false,
    Apartment: false,
    Villa: false,
    Business: false,
  });
  const [minPriceState, setMinPriceState] = useState<number | null>(null);
  const [maxPriceState, setMaxPriceState] = useState<number | null>(null);
  const [minAreaState, setMinAreaState] = useState<number | null>(null);
  const [maxAreaState, setMaxAreaState] = useState<number | null>(null);
  const inputStyles = `w-full mb-2 min-h-max outline-0 text-[1.1em] 
  border-b-2 border-stone-400 focus:border-stone-200 transition duration-300
  bg-transparent`;

  const handleTypeCheckboxChange = async (name: keyof TypeState) => {
    await setTypeState((prevState) => {
      let newState = {
        Sale: false,
        Rent: false,
        [name]: !prevState[name], // toggle the checkbox state
      };

      // Log the new state of the checkbox
      console.log(`Checked [${name}]: `, newState);

      return newState;
    });
  };

  const handleCatergoryCheckboxChange = async (name: keyof CatergoryState) => {
    await setCatergoryState((prevState) => {
      let newState = {
        House: false,
        Apartment: false,
        Villa: false,
        Business: false,
        [name]: !prevState[name],
      };

      console.log(`Checked [${name}]: `, newState);
      return newState;
    });
  };

  const handleMinPriceChange = (e: string) => {
    if (e === null || e === undefined) {
      setMinPriceState(null);
    } else {
      setMinPriceState(parseInt(e));
    }
  };

  const handleMaxPriceChange = (e: string) => {
    if (e === null || e === undefined) {
      setMaxPriceState(null);
    } else {
      setMaxPriceState(parseInt(e));
    }
  };

  const handleMinAreaChange = (e: string) => {
    if (e === null || e === undefined) {
      setMinAreaState(null);
    } else {
      setMinAreaState(parseInt(e));
    }
  };

  const handleMaxAreaChange = (e: string) => {
    if (e === null || e === undefined) {
      setMaxAreaState(null);
    } else {
      setMaxAreaState(parseInt(e));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget); // Get form data
    const formEntries = Object.fromEntries(formData);

    // Update URL with search params
    const updatedSearchParams = {
      ...searchParams,
      ...formEntries,
      listingType: formEntries.listingType
        ? (formEntries.listingType as string)
        : "",
      propertyType: formEntries.propertyType
        ? (formEntries.propertyType as string)
        : "",
      location: formEntries.location ? (formEntries.location as string) : "",
      minPrice: formEntries.minPrice
        ? Number(formEntries.minPrice)
        : searchParams.minPrice,
      maxPrice: formEntries.maxPrice
        ? Number(formEntries.maxPrice)
        : searchParams.maxPrice,
      minArea: formEntries.minArea
        ? Number(formEntries.minArea)
        : searchParams.minArea,
      maxArea: formEntries.maxArea
        ? Number(formEntries.maxArea)
        : searchParams.maxArea,
    };

    //setSearchParams(updatedSearchParams);
    console.log("Component Entries", updatedSearchParams);
    onSearch(updatedSearchParams);
  };

  return (
    <form
      action=""
      method="POST"
      onSubmit={handleSubmit}
      className="flex flex-col gap-5 md:w-[250px] w-9/12 mx-auto">
      <div className="flex md:gap-10 gap-6 flex-col md:mb-10 mb-5">
        {/* TYPE */}
        <div className="flex flex-col items-start gap-2">
          <p>
            <i className="fa-solid fa-building w-5"></i> Property Type
          </p>
          <div className="w-full flex flex-row justify-around items-center ">
            <SearchCheckbox
              name="listingType"
              labelName="Sale"
              checked={typeState.Sale}
              value={"Sale"}
              handleAction={() => handleTypeCheckboxChange("Sale")}
            />
            <SearchCheckbox
              name="listingType"
              labelName="Rent"
              checked={typeState.Rent}
              value={"Rent"}
              handleAction={() => handleTypeCheckboxChange("Rent")}
            />
          </div>
        </div>
        <div className="flex flex-col md:justify-center gap-2">
          <p>
            <i className="fa-solid fa-layer-group w-5"></i> Category
          </p>
          <div className="flex flex-col gap-2">
            <div className="w-full flex flex-row justify-around gap-2">
              <SearchCheckbox
                name="propertyType"
                labelName="House"
                value={"House"}
                checked={catergoryState.House}
                handleAction={() => handleCatergoryCheckboxChange("House")}
              />

              <SearchCheckbox
                name="propertyType"
                labelName="Apartment"
                value={"Apartment"}
                checked={catergoryState.Apartment}
                handleAction={() => handleCatergoryCheckboxChange("Apartment")}
              />
            </div>
            <div className="w-full flex flex-row justify-around gap-2">
              <SearchCheckbox
                name="propertyType"
                labelName="Villa"
                value={"Villa"}
                checked={catergoryState.Villa}
                handleAction={() => handleCatergoryCheckboxChange("Villa")}
              />

              <SearchCheckbox
                name="propertyType"
                labelName="Business"
                value={"Business"}
                checked={catergoryState.Business}
                handleAction={() => handleCatergoryCheckboxChange("Business")}
              />
            </div>
          </div>
        </div>
        {/* PLACE */}
        <div className="flex flex-row gap-2">
          <p className="min-w-fit">
            <i className="fa-solid fa-map-location w-5"></i> City
          </p>
          <select className={`${inputStyles}`} name="location">
            <option value="">All above</option>
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
        {/* <div className="flex flex-row gap-2">
                    <p>Zone</p>
                    <input type="text" className={`${inputStyles}`} />
                  </div> */}

        <div className="flex flex-col md:gap-10 gap-5">
          <div className="flex flex-col gap-5 ">
            <label htmlFor="">
              <i className="fa-solid fa-money-bill-1 fa-lg mr-2 w-5"></i>Price
            </label>
            <div className="flex flex-row gap-2 justify-around">
              <input
                type="number"
                name="minPrice"
                value={minPriceState ? minPriceState : undefined}
                placeholder="From"
                className="border w-28 p-2 rounded-lg h-10 hover:cursor-pointer hover:text-blue-600 hover:border-blue-600"
                onChange={(e) => {
                  handleMinPriceChange(e.target.value);
                }}
              />
              <input
                type="number"
                name="maxPrice"
                value={maxPriceState ? maxPriceState : undefined}
                placeholder="To"
                className="border w-28 p-2 rounded-lg h-10 hover:cursor-pointer hover:text-blue-600 hover:border-blue-600"
                onChange={(e) => {
                  handleMaxPriceChange(e.target.value);
                }}
              />
            </div>
          </div>

          <div className="flex flex-col gap-5">
            <label htmlFor="">
              <i className="fa-solid fa-ruler fa-lg mr-2 w-5"></i>
              Area in m<sup>2</sup>
            </label>
            <div className="flex flex-row gap-2 justify-around">
              <input
                type="number"
                name="minArea"
                value={minAreaState ? minAreaState : undefined}
                placeholder="From"
                className="border w-28 p-2 rounded-lg h-10 hover:cursor-pointer hover:text-blue-600 hover:border-blue-600"
                onChange={(e) => {
                  handleMinAreaChange(e.target.value);
                }}
              />
              <input
                type="number"
                name="maxArea"
                value={maxAreaState ? maxAreaState : undefined}
                placeholder="To"
                className="border w-28 p-2 rounded-lg h-10 hover:cursor-pointer hover:text-blue-600 hover:border-blue-600"
                onChange={(e) => {
                  handleMaxAreaChange(e.target.value);
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <button
        className="-mt-5 rounded-lg border border-black px-8 py-3 transition 
              duration-500 hover:text-white hover:scale-90 hover:bg-black">
        Search
      </button>
    </form>
  );
};

export default SearchComponent;
