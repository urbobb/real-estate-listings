"use client";
import React, { useState } from "react";
import Image from "next/image";
import Model from "../components/Model";
import trump from "@/app/assets/trump.webp";

type TypeState = {
  buy: boolean;
  rent: boolean;
};

export default function AboutUs() {
  return (
    <div className="md:min-h-screen w-full mx-auto md:mt-28 mt-20 md:py-10 pt-5 pb-10 items-center justify-center border-b">
      {/* MAIN HEADER AND ANIMATION */}
      <div className="md:flex mx-auto mt-5 md:w-5/6 w-9/12 md:h-full ">
        {/* INTRODUCTIONS */}
        <div className="leftSlide md:basis-2/5 z-20 my-auto">
          <div className="heading">
            <h1 className="md:pb-10 pb-5 text-2xl font-extrabold text-center md:text-start">
              Welcome to Home Finder
            </h1>
            <div className="intro">
              <p className="text-lg text-center md:text-start">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industrys standard dummy text
                ever since the 1500s, when an unknown printer took a galley of
                type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of
                Lorem Ipsum.
              </p>
            </div>
          </div>
        </div>

        {/* ANIMATIONS */}
        <div
          className="relative rightSlide h-[350px] md:h-[500px] 
        mt-12 flex basis-1/2 justify-center items-center md:z-10
        md:ml-40 md:my-auto md:justify-end">
          <Model />
        </div>
      </div>
      {/* TEAM */}
      {/* First */}
      <div className="flex md:flex-row flex-col w-5/6 mx-auto mt-28 md:border-none border md:p-0 p-4">
        <div className="intro basis-1/2 justify-start items-center">
          <p className="h-full flex justify-center items-center">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industrys standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. .
          </p>
        </div>
        <div className="basis-1/2 flex justify-end">
          <Image width={500} height={500} src={trump} alt="notewierd" />
        </div>
      </div>

      {/* Second */}
      <div className="flex md:flex-row flex-col w-5/6 mx-auto mt-36 md:border-none border md:p-0 p-4">
        <div className="basis-1/2 flex justify-start">
          <Image width={500} height={500} src={trump} alt="notewierd" />
        </div>
        <div className="intro basis-1/2 justify-start items-center">
          <p className="h-full flex justify-end items-center">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industrys standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. .
          </p>
        </div>
      </div>
    </div>
  );
}
