import Spline from "@splinetool/react-spline/next";
import Image from "next/image";
import JPMorgan from "./assets/sponsors/JPMorganChase_Logo.png";
import XLogo from "./assets/sponsors/X_Logo.png";
import CoinbaseLogo from "./assets/sponsors/Coinbase_Logo.png";
import MetaLogo from "./assets/sponsors/Meta_Logo.png";
import ListingsCard from "./components/ListingsCard";
import House1 from "./assets/listings/House1.png";

export default function Home() {
  return (
    <main className="w-full bg-[#FFD8D8] sm:min-h-min md:h-[calc(100vh-176px)]">
      <div className="md:flex flex-wrap justify-between md:mt-24 w-5/6 h-full mx-auto ">
        {/* INTRODUCTIONS */}
        <div className="flex basis-2/5 z-20">
          <div className="flex-row ">
            <div className="heading pt-24 pb-10">
              <h1 className="text-2xl font-extrabold">
                Welcome to Home Finder
              </h1>
            </div>
            <div className="intro">
              <p className="text-lg">
                Your perfect home awaits. Explore our curated listings and find
                your dream property with ease. From cozy apartments to luxury
                estates, Home Finder is your trusted partner in real estate.
              </p>
            </div>
          </div>
        </div>

        {/* ANIMATIONS */}
        <div className="md:flex justify-center items-center z-10 sm:mt-10 basis-1/2 mx-auto h-[500px] w-[500px]">
          <Spline scene="https://prod.spline.design/WJH9iBF3XsfNCL2X/scene.splinecode" />
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
      <div className="h-screen w-5/6 mx-auto pt-16">
        <div className="mb-16">
          <h1 className="text-2xl font-bold">Listings</h1>
        </div>
        <div className="grid grid-cols-4 gap-10">
          <a href="/listings/1">
            <ListingsCard listingsImage={House1} />
          </a>
          <a>
            <ListingsCard listingsImage={House1} />
          </a>
          <a>
            <ListingsCard listingsImage={House1} />
          </a>
          <a>
            <ListingsCard listingsImage={House1} />
          </a>
          <a>
            <ListingsCard listingsImage={House1} />
          </a>
          <a>
            <ListingsCard listingsImage={House1} />
          </a>
          <a>
            <ListingsCard listingsImage={House1} />
          </a>
        </div>
      </div>
    </main>
  );
}
