import React, { useRef } from "react";
import ListingsCard from "@/app/components/ListingsCard";
import House1 from "@/app/assets/listings/House1.png";
import House2 from "@/app/assets/listings/House2.jpg";
import House3 from "@/app/assets/listings/House3.jpg";
import House4 from "@/app/assets/listings/House4.jpeg";
import House5 from "@/app/assets/listings/House5.jpg";
import House6 from "@/app/assets/listings/House6.jpg";

type Props = {};

const HomePageList = (props: Props) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  function scrollLeft() {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft -= 100;
    }
  }

  function scrollRight() {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft += 100;
    }
  }
  return (
    <div
      ref={scrollContainerRef}
      className="houseList w-full md:min-h-max overflow-x-auto overflow-y-hidden 
              scroll-smooth ">
      <div className=" md:h-5/6 gap-[5%] flex min-w-max">
        <div className="item1">
          <ListingsCard
            location={"New york"}
            area={76}
            bedrooms={2}
            price={350}
            id={1}
          />
        </div>
        <div className="item2">
          <ListingsCard
            location={"New york"}
            area={76}
            bedrooms={2}
            price={350}
            id={1}
          />
        </div>
        <div className="item3">
          <ListingsCard
            location={"New york"}
            area={76}
            bedrooms={2}
            price={350}
            id={1}
          />
        </div>
        <div className="item8 flex justify-center items-center md:flex-row flex-col md:gap-5 gap-4 rounded-2xl border-2 border-solid border-stone-400">
          <div className="w-[19rem] sm:w-[22rem] md:w-[24rem] flex items-center justify-center">
            <a className="" href="/listings">
              Click for more
            </a>
            <i className="animate-slide fa-solid fa-arrow-right fa-2xl bg-black ml-2"></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePageList;
