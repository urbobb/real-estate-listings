import React from "react";
import Contact from "../components/Contact";
import GoogleMapComponent from "../components/GoogleMapComponent";

export default function AboutUs() {
  return (
    <div className="md:h-screen w-full mx-auto md:mt-28 md:py-10 pt-5 pb-10 items-center justify-center">
      <div className=" h-full flex md:flex-row flex-col w-5/6 mx-auto">
        <div className="h-full flex basis-1/2 justify-start">
          <Contact title={"Need more Info? Leave us a message"} />
        </div>
        <div className="h-[635px] flex basis-3/5 justify-center items-start md:mt-24 ">
          <div className="h-full lg:w-3/4 w-full mx-auto flex border border-black p-5">
            <div className="w-full flex flex-col gap-2">
              <div className="flex flex-col w-full">
                <h1 className="font-bold text-xl">Address</h1>
                <p>Rom Str. 1 | Via Roma 1</p>
                <p>000101 Roma (BZ)</p>
              </div>
              <div className="flex flex-col w-full">
                <h1 className="font-bold">Contact</h1>
                <div className="flex flex-row gap-5">
                  <p className="w-1/2 font-semibold flex justify-start">
                    Telephone:
                  </p>
                  <p className="w-1/2 flex justify-end">0473 42958329</p>
                </div>
                <div className="flex flex-row gap-5">
                  <p className="w-1/2 font-semibold flex justify-start ">
                    Mobile:
                  </p>
                  <p className="w-1/2 flex justify-end">3958284759</p>
                </div>
                <div className="flex flex-row gap-5">
                  <p className="w-1/2 font-semibold flex justify-start ">
                    E-Mail:
                  </p>
                  <a
                    className="w-1/2 flex justify-end"
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
  );
}
