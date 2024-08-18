import Image from "next/image";
import { useRef, useState } from "react";

interface iAppProps {
  images: any;
}

export default function ImageGallery({ images }: iAppProps) {
  const [bigImage, setBigImage] = useState(images[0]);
  const listingType = {
    sale: "SALE",
    rent: "RENT",
    sold: "SOLD",
  };
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const buttonHover = `h-10 w-10 `;

  const handleBigImageClick = (image: any) => {
    setBigImage(image);
  };

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
    <div className="flex gap-4 flex-col lg:items-center md:w-full w-screen">
      <div className="grid gap-4 lg:grid-cols-2">
        <div
          className="relative overflow-hidden md:rounded-lg bg-gray-100 lg:col-span-5 
        lg:h-[500px] h-[250px] lg:w-[700px] w-full mx-auto">
          <Image
            src={bigImage.src}
            alt="image"
            width={500}
            height={500}
            className="h-full w-full object-cover object-center"
          />
          <span className="absolute left- top-0 rounded-br-lg bg-red-500 px-3 py-1.5 uppercase tracking-wider text-white">
            {listingType.sale}
          </span>
        </div>
      </div>

      <div
        ref={scrollContainerRef}
        className=" fullPageScroll flex flex-row gap-4 lg:order-none md:mx-0 mx-2
            lg:w-[700px] overflow-x-auto overflow-y-hidden scroll-smooth ">
        <div className="flex flex-row justify-center min-w-max lg:gap-5 gap-2">
          {images.map((image: any, idx: any) => (
            <div
              key={idx}
              className="overflow-hidden rounded-lg bg-gray-100 md:w-[100px] w-[70px]">
              <Image
                src={image.src}
                alt="image"
                width={200}
                height={200}
                className="h-full w-full object-cover object-center cursor-pointer"
                onClick={() => handleBigImageClick(image)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
