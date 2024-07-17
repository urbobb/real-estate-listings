"use client";
import React, { useEffect, useState } from "react";
import useMediaQuery from "@/app/hooks/userMediaQuery";
import Links from "./Links";

type Props = {};

const Navbar = (props: Props) => {
  const [isMenuToggled, setIsMenuToggled] = useState<boolean>(false);
  const flexBetween = `flex justify-between items-center`;
  const isAboveMediumScreens = useMediaQuery("(min-width: 1060px)");
  const logoHover = `duration-400 hover:cursor-crosshair hover:bg-[#5ADDEF] hover:text-white 
  hover:border-1 border-black rounded-lg`;
  const hamburgerStyle = `transition duration-500 mt-1 block h-[3px] w-[25px] bg-white border-2 border-slate-50`;

  function mobileMenu() {
    document.querySelector(".hamburger")?.classList.toggle("active");
  }

  return (
    <nav>
      <div
        className={`${flexBetween} navbar fixed top-0 z-40 py-6 w-full bg-[#FFD8D8] text-slate-500`}>
        {/* Parent container of navbar links */}
        <div className={`${flexBetween} mx-auto w-9/12`}>
          {/* Navbar links */}
          <div className={`${flexBetween} w-full gap-16`}>
            <span
              className={`inline-flex ${logoHover} logo h-10 px-5 transition duration-500`}>
              <a
                href="/"
                className="inline font-Open-Sans text-lg font-extrabold tracking-widest">
                Real Estate
              </a>
            </span>

            {/* RIGHT SIDE */}

            {isAboveMediumScreens ? (
              <div className={`flex items-center justify-end w-full`}>
                <div className={`${flexBetween} gap-8 text-sm`}>
                  <Links name="Listings" />
                  <Links name="About" />
                  <Links name="Contact" />
                  <Links name="Profile" />
                </div>
              </div>
            ) : (
              <div
                className="hamburger z-40"
                onClick={() => {
                  setIsMenuToggled(!isMenuToggled);
                  mobileMenu();
                }}>
                <span className={`${hamburgerStyle} bar`}></span>
                <span className={`${hamburgerStyle} bar`}></span>
                <span className={`${hamburgerStyle} bar`}></span>
              </div>
            )}

            {!isAboveMediumScreens && isMenuToggled && (
              <div className="fixed right-0 bottom-0 z-30 h-full w-full bg-[#FFD8D8] drop-shadow-xl">
                {/* MENU ITEMS */}
                <div className="mx-[33%] mt-[8rem] flex flex-col gap-10 text-2xl">
                  <Links name="Listings" />
                  <Links name="About" />
                  <Links name="Contact" />
                  <Links name="Profile" />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
