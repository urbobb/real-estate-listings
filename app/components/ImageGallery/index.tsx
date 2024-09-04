import { useEffect, useRef, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";

interface Images {
  images: string[];
  clicked: boolean;
  listingType: string | undefined;
}

export default function ImageGallery({ images, clicked, listingType }: Images) {
  const [bigImage, setBigImage] = useState<string>("");
  const [bigImageClicked, setBigImageClicked] = useState<boolean>(false);
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  let thumbnailImages: string[] = [];
  thumbnailImages = images;
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const onClickImageStyle = bigImageClicked
    ? "absolute w-[900px]"
    : " h-full w-full";
  const tagStyle =
    listingType === "Sale"
      ? `bg-green-400`
      : listingType === "Rent"
      ? `bg-green-400`
      : listingType === "Sold"
      ? `bg-red-500`
      : "";

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  useEffect(() => {
    if (images.length > 0) {
      setBigImage(images[0]);
    }
  }, [images]);

  const handleBigImageClick = (image: string) => {
    console.log(image);

    setBigImage(image);
  };

  const handleOpenImage = () => {
    setBigImageClicked((prevState) => !prevState);
  };

  return (
    <div className="flex gap-4 flex-col lg:items-center md:w-full w-screen">
      <div className="grid gap-4 lg:grid-cols-2">
        <div
          className={`relative overflow-hidden md:rounded-lg bg-gray-100 lg:col-span-5 
         w-full mx-auto lg:h-[500px] h-[250px] lg:w-[700px] ${
           clicked ? "scale-up-image" : ""
         }`}>
          <Carousel setApi={setApi}>
            <CarouselContent className="w-full ">
              {thumbnailImages.map((image: any, idx: any) => (
                <CarouselItem
                  key={idx}
                  className="overflow-hidden rounded-lg bg-gray-100 md:w-[100px] w-[70px]">
                  <img
                    src={`https://homefinderr-images.s3.eu-north-1.amazonaws.com/${image}`}
                    alt="image"
                    className={`${onClickImageStyle} object-cover object-center aspect-square `}
                  />
                  <span
                    className={`absolute left- top-0 rounded-br-lg ${tagStyle} px-3 py-1.5 uppercase tracking-wider text-white`}>
                    {listingType}
                  </span>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>

      <div
        className="fullPageScroll flex flex-row gap-4 lg:order-none md:mx-0 mx-2
            lg:w-[700px] overflow-x-auto overflow-y-hidden scroll-smooth">
        <div className="flex flex-row justify-center min-w-max lg:gap-5 gap-2">
          {images.map((image: any, index: any) => (
            <div
              key={index}
              className="overflow-hidden rounded-lg bg-gray-100 md:w-[100px] w-[70px] hover:border-2 hover:border-blue-500 hover:cursor-pointer">
              <img
                src={`https://homefinderr-images.s3.eu-north-1.amazonaws.com/${image}`}
                alt="image"
                width={200}
                height={200}
                className="h-full w-full object-cover object-center cursor-pointer"
                onClick={() => api && api.scrollTo(index)}
              />
            </div>
          ))}
        </div>
      </div>

      {/* <div
        ref={scrollContainerRef}
        className=" fullPageScroll flex flex-row gap-4 lg:order-none md:mx-0 mx-2
            lg:w-[700px] overflow-x-auto overflow-y-hidden scroll-smooth ">
        <div className="flex flex-row justify-center min-w-max lg:gap-5 gap-2">
          {images.map((image: any, idx: any) => (
            <div
              key={idx}
              className="overflow-hidden rounded-lg bg-gray-100 md:w-[100px] w-[70px] hover:border-2 hover:border-blue-500">
              <img
                src={`https://homefinderr-images.s3.eu-north-1.amazonaws.com/${image}`}
                alt="image"
                width={200}
                height={200}
                className="h-full w-full object-cover object-center cursor-pointer"
                onClick={() => handleBigImageClick(idx)}
              />
            </div>
          ))}
        </div>
      </div> */}
    </div>
  );
}
