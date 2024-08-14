import React from "react";
import Image from "next/image";
import Contact from "../components/Contact";
import contact from "@/app/assets/contact.webp";

export default function AboutUs() {
  return (
    <div className="md:h-screen w-full mx-auto md:mt-28 md:py-10 pt-5 pb-10 items-center justify-center border-b">
      <div className=" h-full flex md:flex-row flex-col w-5/6 mx-auto">
        <div className="h-full flex basis-1/2 justify-start">
          <Contact />
        </div>
        <div className="h-full flex basis-3/5 justify-center items-start md:mt-24 ">
          <div className="flex justify-center items-center">
            <Image src={contact} alt="contact" width={500} height={500} />
          </div>
        </div>
      </div>
    </div>
  );
}
