import React from "react";
import ListingsCard from "@/app/components/ListingsCard";
import House1 from "@/app/assets/listings/House1.png";
import House2 from "@/app/assets/listings/House2.jpg";
import House3 from "@/app/assets/listings/House3.jpg";
import House4 from "@/app/assets/listings/House4.jpeg";
import House5 from "@/app/assets/listings/House5.jpg";
import House6 from "@/app/assets/listings/House6.jpg";

type Props = {};

const HomePageList = (props: Props) => {
  return (
    <div className="md:min-h-max">
      <div className="houseList md:h-5/6 md:gap-[50px] gap-2">
        <div className="item1 col-start-1 col-end-1 row-span-2">
          <ListingsCard listingsImage={House3} id={1} />
        </div>
        <div className="item2 md:h-[200px] ">
          <ListingsCard listingsImage={House2} id={2} />
        </div>
        <div className="item3 md:h-[200px]">
          <ListingsCard listingsImage={House3} id={3} />
        </div>
        <div className="item4 row-start-3 row-end-3 md:h-[200px]">
          <ListingsCard listingsImage={House4} id={4} />
        </div>
        <div className="item5 row-start-4 row-end-4 md:h-[200px]">
          <ListingsCard listingsImage={House5} id={5} />
        </div>
        <div className="item6 col-start-2 col-end-3 row-span-2">
          <ListingsCard listingsImage={House6} id={6} />
        </div>
        <div className="item7">
          <ListingsCard listingsImage={House1} id={7} />
        </div>
        <div className="item8 flex justify-center items-center md:flex-row flex-col md:gap-5 gap-4 rounded-2xl border-2 border-solid border-stone-400">
          <a className="" href="/listings">
            Click for more
          </a>
          <i className="animate-slide fa-solid fa-arrow-right fa-2xl bg-black -ml-4"></i>
        </div>
      </div>
    </div>
  );
};

export default HomePageList;
