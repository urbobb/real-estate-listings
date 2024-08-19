"use client";
import React, { useRef } from "react";
import Image from "next/image";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { PresentationControls } from "@react-three/drei";
import useMediaQuery from "@/app/hooks/userMediaQuery";
import dynamic from "next/dynamic";
import ListingsCard from "@/app/components/ListingsCard";
import { houses } from "@/app/shared/HousesList";
import Contact from "./components/Contact";
import IconAboutUs from "@/public/Icon_AboutUs.png";
import GoogleMapComponent from "./components/GoogleMapComponent";

interface AutoRotatingGroupProps {
  children: React.ReactNode;
}

function AutoRotatingGroup({ children }: AutoRotatingGroupProps) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.1; // Adjust the speed as needed
    }
  });

  return (
    <group ref={groupRef} position-y={-0.75} dispose={null}>
      {children}
    </group>
  );
}

export default function Home() {
  const isAboveMediumScreens = useMediaQuery("(min-width:1060px)");
  const isAboveSmallScreens = useMediaQuery("(min-width: 640px)");

  const Level = dynamic(() => import("@/app/components/Level"), {
    ssr: false,
  });
  const Sudo = dynamic(() => import("@/app/components/Sudo"), {
    ssr: false,
  });
  const Cactus = dynamic(() => import("@/app/components/Cactus"), {
    ssr: false,
  });
  const Camera = dynamic(() => import("@/app/components/Camera"), {
    ssr: false,
  });
  const Icon = dynamic(() => import("@/app/components/Icon"), {
    ssr: false,
  });
  const Pyramid = dynamic(() => import("@/app/components/Pyramid"), {
    ssr: false,
  });
  const buttonHover = `h-10 w-10 border-2 rounded-3xl`;
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const displayedHouses = isAboveSmallScreens ? houses.slice(0, 3) : houses;

  function scrollLeft() {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft -= 500;
    }
  }

  function scrollRight() {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft += 500;
    }
  }

  function hidePrompt() {
    document.querySelector(".cookie-alert")?.classList.add("hide");
  }

  return (
    <main className="md:mt-10 md:p-24 pt-24 my-auto">
      {/* HOME */}

      <div
        className={`cookie-alert fixed bottom-[15px] right-[15px] w-[320px] m-0 z-[999] opacity-[1] translate-y-0 transition-all ease-out delay-150 rounded-lg overflow-hidden flex `}>
        <div className="lg:h-[200px] lg:w-[400px] h-[150px] w-[300px] flex flex-col justify-center items-center p-3 bg-blue-400">
          <p className="text-center">
            This site is currently under Development.
          </p>
          <button
            className="p-3 border border-black rounded bg-black text-white mt-5"
            onClick={() => hidePrompt()}>
            Got it!
          </button>
        </div>
      </div>
      <section
        id="home"
        className="md:h-full w-full mx-auto md:py-10 pt-5 pb-10 items-center justify-center border-b">
        {/* MAIN HEADER AND ANIMATION */}
        <div className="md:flex mx-auto mt-5 md:w-11/12 w-9/12 md:h-full ">
          {/* INTRODUCTIONS */}
          <div className="leftSlide md:basis-2/5 z-20 my-auto">
            <div className="heading">
              <h1 className="md:pb-10 pb-5 text-2xl font-extrabold text-center md:text-start">
                Welcome to Home Finder
              </h1>
              <div className="intro">
                <p className="text-lg text-center md:text-start">
                  Your perfect home awaits. Explore our curated listings and
                  find your dream property with ease. From cozy apartments to
                  luxury estates, Home Finder is your trusted partner in real
                  estate.
                </p>
              </div>
            </div>
          </div>

          {/* ANIMATIONS */}
          <div className="relative rightSlide h-[350px] md:h-[500px] mt-12 flex basis-3/5 justify-center items-center md:z-10 md:ml-40 md:my-auto md:justify-end">
            <Canvas flat dpr={[1, 2]} camera={{ fov: 25, position: [0, 0, 8] }}>
              <color attach="background" args={["#FFFFFF"]} />
              <ambientLight />
              <PresentationControls
                global
                zoom={0.8}
                rotation={[0, -Math.PI / 4, 0]}
                polar={[0, Math.PI / 4]}
                azimuth={[-Math.PI / 4, Math.PI / 4]}>
                <AutoRotatingGroup>
                  <Level />
                  <Sudo />
                  <Camera />
                  <Cactus />
                  {/* <Icon /> */}
                  <Pyramid />
                </AutoRotatingGroup>
              </PresentationControls>
            </Canvas>
          </div>
        </div>

        <div className="w-full leftSlide ">
          {/* SEARCH LISTINGS */}
          <form action="">
            <div
              className="sponsor md:w-11/12 w-5/6 mx-auto py-5 
              h-[150px]">
              <div className="pl-2 mb-3">
                <h1 className="text-2xl font-bold">Search</h1>
              </div>
              <div
                className="md:w-1/3 w-full pl-2 flex justify-between gap-3

                border border-black pointer-events-none opacity-30">
                <div className="flex justify-start items-center w-full">
                  <label className="basis-1/6" htmlFor="city">
                    City:
                  </label>
                  <select
                    className="basis-auto w-full min-h-max outline-0 md:text-[1.2em] text-[1em]
                      border-b-2 border-stone-400 focus:border-stone-200 
                      transition duration-300 bg-transparent">
                    <option value="All above">All above</option>
                    <option value="New York">New York</option>
                    <option value="Miami">Miami</option>
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
        </div>
      </section>

      {/* Services */}
      <section
        id="services"
        className="mx-auto h-full md:w-full md:py-24 py-16 border-b">
        <div className="md:w-11/12 w-5/6 mx-auto">
          <div className="flex flex-col gap-10 mb-28">
            <div className="flex md:justify-normal justify-center">
              <p className="text-[1.3rem] font-semibold">Discover</p>
            </div>
            <div className="md:w-1/2 w-full">
              <h1 className="font-bold md:text-[2.2rem] text-[1.3rem] md:text-left text-center">
                Find Your Dream Home in the Italian Alps
              </h1>
            </div>
            <div className="md:w-1/2 w-full">
              <p className="md:text-left text-center">
                At Home Finder, we specialize in personalized property matching,
                leveraging our expert local knowledge and providing premium
                customer service. Let us help you find the perfect home in the
                breathtaking Italian Alps.
              </p>
            </div>
          </div>
          {/** */}
          <div className="w-full flex md:flex-row flex-col gap-20">
            <div className="basis-1/3 flex flex-col gap-5 w-full border p-4 border-black">
              <div className="w-[50px]">
                <Image src={IconAboutUs} alt="Icon" />
              </div>
              <div className="w-full">
                <h2 className="font-extrabold text-[1.3rem] ">
                  Personalized <br /> Property Matching
                </h2>
              </div>
              <div className="w-full">
                <p>
                  We understand that every homebuyer is unique. Our team of
                  experts will match you with properties that align with your
                  specific needs and preferences.
                </p>
              </div>
            </div>
            {/* */}
            <div className="basis-1/3 flex flex-col gap-5 w-full border p-4 border-black">
              <div className="w-[50px]">
                <Image src={IconAboutUs} alt="Icon" />
              </div>
              <div className="w-full">
                <h2 className="font-extrabold text-[1.3rem]">
                  Expert <br /> Local Knowledge
                </h2>
              </div>
              <div className="w-full">
                <p>
                  Our deep understanding of the Italian Alps allows us to
                  provide you with valuable insights and guidance throughout the
                  home buying process.
                </p>
              </div>
            </div>
            {/* */}
            <div className="basis-1/3 flex flex-col gap-5 w-full border p-4 border-black">
              <div className="w-[50px]">
                <Image src={IconAboutUs} alt="Icon" />
              </div>
              <div className="w-full">
                <h2 className="font-extrabold text-[1.3rem]">
                  Premium <br /> Customer Service
                </h2>
              </div>
              <div className="w-full">
                <p>
                  We are committed to delivering exceptional customer service,
                  ensuring that your experience with Home Finder is smooth,
                  enjoyable, and stress-free.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Listings */}
      <section
        id="listings"
        className="mx-auto min-h-max md:w-full md:py-24 py-16 border-b">
        {/* LISTINGS */}
        <div className="md:w-11/12 w-5/6 mx-auto">
          {/* HEADING */}
          <div className="md:w-full mb-10">
            <h1 className="text-2xl font-bold">Listings</h1>
          </div>

          <div className="flex justify-end gap-2 mb-5">
            <button className={`${buttonHover}`} onClick={scrollLeft}>
              <i className="fa-solid fa-angle-left"></i>
            </button>

            <button className={`${buttonHover}`} onClick={scrollRight}>
              <i className="fa-solid fa-angle-right"></i>
            </button>
          </div>

          {/* LIST */}
          <div
            ref={scrollContainerRef}
            className="houseList mb-10 w-full md:min-h-max mx-auto overflow-x-auto overflow-y-hidden 
                      scroll-smooth ">
            <div className=" md:h-5/6 sm:gap-[2%] gap-10 flex md:flex-row flex-col min-w-max mx-auto">
              {houses.slice(0, 3).map(
                (
                  house,
                  index // render only first three houses
                ) => (
                  <div className={`flex justify-center box-border`} key={index}>
                    <ListingsCard
                      location={house.location}
                      area={house.area}
                      bedrooms={house.bedrooms}
                      price={house.price}
                      id={house.id}
                    />
                  </div>
                )
              )}
              <a className="" href="/listings">
                <div
                  className="item8 md:h-[calc(100%-20px)] h-[150px] flex justify-center items-center md:flex-row flex-col 
              md:gap-5 gap-4 rounded-2xl border border-solid border-stone-400">
                  <div className="w-[19rem] sm:w-[22rem] md:w-[20rem] flex items-center justify-center">
                    Click for more
                    <i className="animate-slide fa-solid fa-arrow-right fa-2xl bg-black ml-2"></i>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <div className="w-full h-full">
        <div className="w-11/12 mx-auto flex md:flex-row flex-col justify-between">
          <div className="flex lg:w-1/2">
            <Contact title={"Contact me"} />
          </div>
          {/* ADRESS AND MAPS */}
          <div className="h-[635px] flex basis-3/5 justify-center items-start md:mt-24 ">
            <div className="h-full lg:w-3/4 w-full mx-auto flex border border-black p-5">
              <div className="w-full flex flex-col gap-2">
                <div className="flex flex-col w-full">
                  <h1 className="font-bold text-xl">Address</h1>
                  <p>Rennweg 1 | Via delle corse 1</p>
                  <p>39012 Meran/o (BZ)</p>
                </div>
                <div className="flex flex-col w-full">
                  <h1 className="font-bold">Contact</h1>
                  <div className="flex flex-row gap-5">
                    <p className="w-1/2 font-semibold flex justify-start text-sm">
                      Telephone:
                    </p>
                    <p className="w-1/2 flex justify-end text-sm">
                      0473 42958329
                    </p>
                  </div>
                  <div className="flex flex-row gap-5">
                    <p className="w-1/2 font-semibold flex justify-start text-sm">
                      Mobile:
                    </p>
                    <p className="w-1/2 flex justify-end text-sm">3958284759</p>
                  </div>
                  <div className="flex flex-row gap-5">
                    <p className="w-1/2 font-semibold flex justify-start text-sm">
                      E-Mail:
                    </p>
                    <a
                      className="w-1/2 flex justify-end text-sm"
                      href="mailto:info@homefinderr.com">
                      info@homefinderr.com
                    </a>
                  </div>
                </div>
                <div className="flex flex-col w-full">
                  <h1 className="font-bold">Business Hours:</h1>
                  <div className="flex flex-row gap-5 w-full">
                    <p className="w-1/2 flex justify-start font-semibold text-sm ">
                      Mon - Fri:
                    </p>
                    <p className="w-1/2 flex justify-end text-sm">
                      9:00 AM - 6:00 PM
                    </p>
                  </div>
                  <div className="flex flex-row gap-5 w-full">
                    <p className="w-1/2 font-semibold text-sm justify-start">
                      Sat - Sun:
                    </p>
                    <p className="w-1/2 flex justify-end text-sm">Closed</p>
                  </div>
                </div>
                {/* */}
                <div className="w-full h-full">
                  <GoogleMapComponent />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
