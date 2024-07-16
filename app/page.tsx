"use client";
import React from "react";
import * as THREE from "three";
import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { PresentationControls } from "@react-three/drei";
import Camera from "./components/Camera";
import Image from "next/image";
import JPMorgan from "@/app/assets/sponsors/JPMorganChase_Logo.png";
import XLogo from "@/app/assets/sponsors/X_Logo.png";
import CoinbaseLogo from "@/app/assets/sponsors/Coinbase_Logo.png";
import MetaLogo from "@/app/assets/sponsors/Meta_Logo.png";
import ListingsCard from "@/app/components/ListingsCard";
import House1 from "@/app/assets/listings/House1.png";
import useMediaQuery from "@/app/hooks/userMediaQuery";
import dynamic from "next/dynamic";

export default function Home() {
  const isAboveMediumScreens = useMediaQuery("(min-width:1060px)");

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

  return (
    <main className="w-full bg-[#FFD8D8] md:h-[calc(100vh-176px)] mx-auto">
      <section id="home" className="gap-16 py-10 md:h-full md:pb-0">
        {/* MAIN HEADER AND ANIMATION */}
        <div className="md:flex flex-wrap justify-between items-center py-28 w-5/6 md:h-full mx-auto ">
          {/* INTRODUCTIONS */}
          <div className="flex basis-2/5 z-20">
            <div className="flex-row ">
              <div className="heading pb-10">
                <h1 className="text-2xl font-extrabold">
                  Welcome to Home Finder
                </h1>
              </div>
              <div className="intro">
                <p className="text-lg">
                  Your perfect home awaits. Explore our curated listings and
                  find your dream property with ease. From cozy apartments to
                  luxury estates, Home Finder is your trusted partner in real
                  estate.
                </p>
              </div>
            </div>
          </div>

          {/* ANIMATIONS */}
          <div className="md:flex justify-center items-center z-10 sm:mt-10 basis-3/5 mx-auto h-[500px] w-[500px]">
            <Canvas flat dpr={[1, 2]} camera={{ fov: 25, position: [0, 0, 8] }}>
              <color attach="background" args={["#FFD8D8"]} />
              <ambientLight />
              <PresentationControls
                global
                zoom={0.8}
                rotation={[0, -Math.PI / 4, 0]}
                polar={[0, Math.PI / 4]}
                azimuth={[-Math.PI / 4, Math.PI / 4]}>
                <group position-y={-0.75} dispose={null}>
                  <Level />
                  <Sudo />
                  <Camera />
                  <Cactus />
                  <Icon />
                  <Pyramid />
                </group>
              </PresentationControls>
            </Canvas>
          </div>

          {/* SPONSORS */}
          <div className="sponsor flex gap-20 items-center w-full sm:mt-10">
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
        </div>

        {/* LISTINGS */}
        {isAboveMediumScreens && (
          <div className="h-screen w-5/6 mx-auto pt-20">
            <div className="mb-16">
              <h1 className="text-2xl font-bold">Listings</h1>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-[repeat(4,2fr)] gap-2 md:h-5/6 w-full items-center justify-center">
              <div className="md:row-span-2 ">
                <ListingsCard listingsImage={House1} id={1} />
              </div>
              <div className="">
                <ListingsCard listingsImage={House1} id={2} />
              </div>
              <div className="">
                <ListingsCard listingsImage={House1} id={3} />
              </div>
              <div className="">
                <ListingsCard listingsImage={House1} id={4} />
              </div>
              <div className="">
                <ListingsCard listingsImage={House1} id={5} />
              </div>
              <div>
                <ListingsCard listingsImage={House1} id={6} />
              </div>
              <div>
                <ListingsCard listingsImage={House1} id={7} />
              </div>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
