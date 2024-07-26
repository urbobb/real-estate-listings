"use client";
import React, { useRef } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { PresentationControls } from "@react-three/drei";
import useMediaQuery from "@/app/hooks/userMediaQuery";
import dynamic from "next/dynamic";
import Image from "next/image";
import JPMorgan from "@/app/assets/sponsors/JPMorganChase_Logo.png";
import XLogo from "@/app/assets/sponsors/X_Logo.png";
import CoinbaseLogo from "@/app/assets/sponsors/Coinbase_Logo.png";
import MetaLogo from "@/app/assets/sponsors/Meta_Logo.png";
import HomePageList from "@/app/components/HomePageList";

import ListingsCard from "@/app/components/ListingsCard";

import { houses } from "@/app/shared/HousesList";
import Contact from "./components/Contact";

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
      scrollContainerRef.current.scrollLeft -= 100;
    }
  }

  function scrollRight() {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft += 100;
    }
  }

  return (
    <main className="md:mt-10 md:p-24 pt-24 my-auto">
      {/* HOME */}
      <section
        id="home"
        className="md:h-full w-full mx-auto md:py-10 items-center justify-center">
        {/* MAIN HEADER AND ANIMATION */}
        <div className="md:flex mx-auto mt-5 md:w-11/12 w-9/12 md:h-full ">
          {/* INTRODUCTIONS */}
          <div className="md:basis-2/5 z-20 my-auto">
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
          <div className="h-[350px] md:h-[500px] mt-12 flex basis-3/5 justify-center items-center md:z-10 md:ml-40 md:my-auto md:justify-end">
            <Canvas flat dpr={[1, 2]} camera={{ fov: 25, position: [0, 0, 8] }}>
              <color attach="background" args={["#FFD8D8"]} />
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

        <div className="w-full">
          {/* SPONSORS */}
          {isAboveMediumScreens && (
            <div className="sponsor md:w-11/12 w-full mx-auto py-10 h-[150px] flex justify-start items-center gap-16">
              <div className="w-28">
                <Image src={JPMorgan} alt="JPMorgan" />
              </div>
              <div className="w-28">
                <Image src={CoinbaseLogo} alt="Coinabse" />
              </div>
              <div className="w-28">
                <Image src={MetaLogo} alt="Meta" />
              </div>
              <div className="w-12">
                <Image src={XLogo} alt="X" />
              </div>
            </div>
          )}
        </div>
      </section>

      <section
        id="listings"
        className="mx-auto min-h-max md:w-full w-5/6 py-24">
        {/* LISTINGS */}
        <div className="md:w-11/12 mx-auto">
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
            className="houseList w-full md:min-h-max mx-auto overflow-x-auto overflow-y-hidden 
                      scroll-smooth ">
            <div className=" md:h-5/6 sm:gap-[2%] gap-10 flex min-w-max mx-auto">
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
        </div>
      </section>

      {/* CONTACT */}
      <Contact />
    </main>
  );
}
