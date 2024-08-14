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
  const hamburgerStyle = `transition duration-500 mt-1 block h-[3px] w-[25px] 
   border-2 border-black`;

  // useEffect(() => {
  //   if (typeof window === "undefined") return; // Ensure window is defined

  //   let prevScrollPos = window.scrollY;

  //   window.onscroll = () => {
  //     scrollFunction();
  //   };

  //   function scrollFunction() {
  //     let currentScrollPos = window.scrollY;

  //     if (prevScrollPos > currentScrollPos) {
  //       (document.getElementById("navbar") as HTMLFormElement).style.top = "0";
  //     } else {
  //       (document.getElementById("navbar") as HTMLFormElement).style.top =
  //         "-100px";
  //     }

  //     prevScrollPos = currentScrollPos;
  //   }
  // });

  function mobileMenu() {
    document.querySelector(".hamburger")?.classList.toggle("active");
    //document.querySelector(".mobileMenu")?.classList.toggle("active");
  }

  return (
    <nav>
      <div
        id="navbar"
        className={`${flexBetween} navbar border-b-2 fixed top-0 z-40 h-[90px] py-6 w-full bg-[#ffffff] text-slate-500`}>
        {/* Parent container of navbar links */}
        <div className={`${flexBetween} mx-auto w-5/6`}>
          {/* Navbar links */}
          <div className={`${flexBetween} w-full gap-16`}>
            <span
              className={`inline-flex ${logoHover} logo h-10 px-2.5 min-w-max flex items-center justify-center transition duration-500`}>
              <a
                href="/"
                className="inline text-lg font-extrabold tracking-widest">
                Home Finder
              </a>
            </span>

            {/* RIGHT SIDE */}

            {isAboveMediumScreens ? (
              <div className={`flex items-center justify-end w-full`}>
                <div className={`${flexBetween} gap-8 text-sm`}>
                  <Links name="Listings" />
                  <Links name="AboutUs" />
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
              <div
                className="mobileMenu fixed right-0 bottom-0 z-30 h-full w-full 
              bg-[#ffffff] drop-shadow-xl">
                {/* MENU ITEMS */}
                <div className="mx-[33%] mt-[8rem] flex flex-col justify-center items-center gap-10 text-2xl">
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
