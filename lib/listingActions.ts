"use server";
import prisma from "@/lib/db";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from "uuid";
import { revalidatePath } from "next/cache";

interface FormEntries {
  id?: number;
  title?: string;
  description?: string;
  price: number;
  location?: string;
  zipCode?: number;
  propertyType?: string;
  bedrooms?: number;
  bathrooms?: number;
  area?: number;
  energyclass?: string;
  listingType?: string;
}

interface SearchData {
  formEntries: FormEntries;
}

const s3 = new S3Client({
  region: process.env.AWS_BUCKET_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function uploadFileToAWS(buffer: Buffer, uniqueFileName: string) {
  const session = await getServerSession();

  // if (!session) {
  //   return { failure: "Not authenticated" };
  // }

  const putObjectCommand = new PutObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME!,
    Key: `${uniqueFileName}`,
    Body: buffer,
    ContentType: "image/jpeg",
  });
  try {
    const response = await s3.send(putObjectCommand);
    console.log("Files uploaded successfully: ", response);
    return uniqueFileName;
  } catch (err) {
    throw err;
  }

  // const signedURL = await getSignedUrl(s3, putObjectCommand, { expiresIn: 60 });

  //return { success: { url: signedURL } };
}

export const getListing = async (searchData: SearchData) => {
  console.log("Search Data:: ", searchData.formEntries);
  const { formEntries } = searchData;
  console.log("Listing Type:: ", formEntries);
  try {
    if (searchData) {
      const areaCondtions: any = {};
      const priceConditions: any = {};
      const area = formEntries.area;
      const price = formEntries.price;

      if (area !== undefined) {
        //Determine the area condition based on the formEntries.area value
        if (area <= 60) {
          areaCondtions.lte = 60; // less than 60
        } else if (area === 70) {
          areaCondtions.gte = 60;
          areaCondtions.lte = 71; // Between 60 and 70
        } else if (area === 80) {
          areaCondtions.gte = 70;
          areaCondtions.lte = 81; // Between 70 and 80
        } else if (area.toString() === "<90") {
          areaCondtions.gte = 80;
          areaCondtions.lte = 91; // Between 80 and 90
        } else if (area.toString() === ">90") {
          areaCondtions.gte = 90;
        }
      }

      if (price !== undefined) {
        if (price < 1000000) {
          priceConditions.lte = 1000000;
        } else if (price >= 1000000) {
          priceConditions.gte = 100000;
        }
      }

      const query = {
        where: {
          ...(formEntries.price && {
            price: priceConditions, // Filter based on price less than the provided value
          }),
          ...(formEntries.location && {
            location: formEntries.location,
          }),
          ...(formEntries.propertyType && {
            propertyType: formEntries.propertyType,
          }),
          ...(formEntries.area && {
            area: areaCondtions,
          }),
          ...(formEntries.listingType && {
            listingType: formEntries.listingType,
          }),

          //listingType: formEntries.listingType,
          //propertyType: formEntries.propertyType,
          // price: {
          //   lt: Number(formEntries.price), // Filter based on price less than the provided value
          // },
          //area: areaCondtions, // Apply the area condition dynamically
        },
      };
      const getListings = await prisma.listing.findMany(query);

      console.log("Sorted Listings: ", getListings);
      return NextResponse.json(
        {
          message: "Data fetching successfull",
          data: getListings,
        },
        { status: 200 }
      );
    }
  } catch (err) {
    console.log("Error during database operation: ", err);
    return NextResponse.json(
      { message: "Error during data fetch", error: err },
      { status: 500 }
    );
  }
};

export const getListingById = async (idParam: { id: string }) => {
  const id = parseInt(idParam.id, 10);

  console.log("Extracted ID:", id);
  try {
    const getListing = await prisma.listing.findUnique({
      where: {
        id: id, // get my ID
      },
      include: {
        images: {
          where: { listingId: id },
          orderBy: [{ id: "desc" }], // sort by id in descending order
        },
      },
    });

    return NextResponse.json(
      {
        message: "Data fetching successfull",
        data: getListing,
      },
      { status: 200 }
    );
  } catch (err) {
    console.log("Error during database operation: ", err);
    return NextResponse.json(
      { message: "Error during data fetch", error: err },
      { status: 500 }
    );
  }
};

export const getAllListing = async () => {
  try {
    console.log("All");
    const getListings = await prisma.listing.findMany({
      include: {
        // include images
        images: {
          orderBy: [{ id: "desc" }], // sort by id in descending order
        },
      },
    });

    return NextResponse.json(
      {
        message: "Data fetching successfull",
        data: getListings,
      },
      { status: 200 }
    );
  } catch (err) {
    console.log("Error during database operation: ", err);
    return NextResponse.json(
      { message: "Error during data fetch", error: err },
      { status: 500 }
    );
  }
};

export async function createListing(formData: FormData) {
  const dataToCreateListing = formData;
  console.log("Query: ", dataToCreateListing);
  const data = {
    title: dataToCreateListing.get("Title") as string,
    description: dataToCreateListing.get("Description") as string,
    price: parseInt(dataToCreateListing.get("Price") as string, 10) || 0,
    location: dataToCreateListing.get("Location") as string,
    zipCode: parseInt(dataToCreateListing.get("Zip Code") as string, 10) || 0,
    propertyType: dataToCreateListing.get("Property Type") as string,
    bedrooms: parseInt(dataToCreateListing.get("Bedrooms") as string, 10) || 0,
    bathrooms:
      parseInt(dataToCreateListing.get("Bathrooms") as string, 10) || 0,
    area: parseInt(dataToCreateListing.get("Area") as string, 10) || 0,
    energyclass: dataToCreateListing.get("Energy Class") as string,
    floors: parseInt(dataToCreateListing.get("Floors") as string, 10) || 0,
    buildingFloors:
      parseInt(dataToCreateListing.get("Building Floors") as string, 10) || 0,
    elevator: dataToCreateListing.get("Elevator") === "Yes" ? true : false,
    furnished: dataToCreateListing.get("Furnished") as string,
    balcony: dataToCreateListing.get("Balcony") === "Yes" ? true : false,
    garage: parseInt(dataToCreateListing.get("Garage") as string, 10) || 0,
    heating: dataToCreateListing.get("Heating") as string,
    listingType: dataToCreateListing.get("Listing Type") as string,
  };

  try {
    // Create all listings in parallel using Promise.all
    const files = dataToCreateListing.getAll("file") as File[];
    const uplodedFiles = [];

    for (const file of files) {
      const buffer = Buffer.from(await file.arrayBuffer());
      const uniqueFileName = `${uuidv4()}-${Date.now()}-${file.name}`; // Generate a unique filename
      const fileName = await uploadFileToAWS(buffer, uniqueFileName);
      console.log("FileName:", fileName);
      uplodedFiles.push(uniqueFileName);
    }
    // Generate a unique filename
    //const uniqueFileName = `${uuidv4()}-${Date.now()}-${fileName}`;

    const imageUrls = uplodedFiles;
    console.log("Data to create listing:", data);
    console.log("Image URLs:", imageUrls);

    const lastListing = await prisma.listing.findFirst({
      orderBy: {
        id: "desc",
      },
      select: { id: true },
    });

    const lastImage = await prisma.image.findFirst({
      orderBy: { id: "desc" },
      select: { id: true },
    });
    const newListingId = lastListing ? lastListing.id + 1 : 1; // Set to 1 if no records exist
    const newImageId = lastImage ? lastImage.id + 1 : 1; // Set to 1 if no records exist

    const createListings = await prisma.listing.create({
      data: {
        id: newListingId,
        title: data.title,
        description: data.description,
        price: data.price,
        location: data.location,
        zipCode: data.zipCode,
        propertyType: data.propertyType,
        bedrooms: data.bedrooms,
        bathrooms: data.bathrooms,
        area: data.area,
        energyclass: data.energyclass,
        floors: data.floors,
        buildingFloors: data.buildingFloors,
        elevator: data.elevator,
        furnished: data.furnished,
        balcony: data.balcony,
        garage: data.garage,
        heating: data.heating,
        listingType: data.listingType,
        images: {
          create: imageUrls.map((url) => ({
            url: url,
          })),
        },
      },
    });

    revalidatePath("/");

    console.log("Created listings:", createListings);
  } catch (err) {
    console.log("Error during database operation: ", err);
    return null;
  }
}

export const listings = [
  {
    id: 1,
    title: "Modern Apartment in Milan City Center",
    description:
      "A fully renovated apartment in the heart of Milan, featuring modern amenities and high-end finishes.",
    price: 950000,
    location: "Milan",
    zipCode: 20121,
    propertyType: "Apartment",
    bedrooms: 2,
    bathrooms: 2,
    area: 120,
    energyclass: "A",
    floors: 5,
    buildingFloors: 6,
    elevator: true,
    furnished: "Yes",
    balcony: true,
    garage: 1,
    heating: "Central",
    listingType: "For Sale",
  },
  {
    id: 2,
    title: "Charming Villa with Lake View in Como",
    description:
      "Beautiful villa with stunning lake views, surrounded by lush gardens and equipped with modern comforts.",
    price: 2300000,
    location: "Como",
    zipCode: 22100,
    propertyType: "Villa",
    bedrooms: 4,
    bathrooms: 3,
    area: 350,
    energyclass: "B",
    floors: 2,
    buildingFloors: 2,
    elevator: false,
    furnished: "Yes",
    balcony: true,
    garage: 2,
    heating: "Underfloor",
    listingType: "For Sale",
  },
  {
    id: 3,
    title: "Cozy Apartment near Turin University",
    description:
      "A cozy and affordable apartment located just a short walk from the university, ideal for students or young professionals.",
    price: 180000,
    location: "Turin",
    zipCode: 10124,
    propertyType: "Apartment",
    bedrooms: 1,
    bathrooms: 1,
    area: 50,
    energyclass: "C",
    floors: 3,
    buildingFloors: 5,
    elevator: true,
    furnished: "No",
    balcony: true,
    garage: 0,
    heating: "Electric",
    listingType: "For Sale",
  },
  {
    id: 4,
    title: "Luxury Penthouse with Panoramic Views in Genoa",
    description:
      "A stunning penthouse offering panoramic views of the city and the sea, featuring luxurious interiors and large terraces.",
    price: 1200000,
    location: "Genoa",
    zipCode: 16121,
    propertyType: "Penthouse",
    bedrooms: 3,
    bathrooms: 2,
    area: 200,
    energyclass: "A+",
    floors: 6,
    buildingFloors: 6,
    elevator: true,
    furnished: "Yes",
    balcony: true,
    garage: 1,
    heating: "Central",
    listingType: "For Sale",
  },
  {
    id: 5,
    title: "Spacious Farmhouse in the Countryside of Verona",
    description:
      "Traditional farmhouse with modern upgrades, situated in a peaceful countryside setting with large outdoor spaces.",
    price: 780000,
    location: "Verona",
    zipCode: 37121,
    propertyType: "Farmhouse",
    bedrooms: 5,
    bathrooms: 3,
    area: 400,
    energyclass: "B",
    floors: 2,
    buildingFloors: 2,
    elevator: false,
    furnished: "No",
    balcony: false,
    garage: 2,
    heating: "Biomass",
    listingType: "For Sale",
  },
  {
    id: 6,
    title: "Bright Loft in the Heart of Bologna",
    description:
      "A stylish and bright loft located in the historic center of Bologna, perfect for modern city living.",
    price: 550000,
    location: "Bologna",
    zipCode: 40125,
    propertyType: "Loft",
    bedrooms: 1,
    bathrooms: 1,
    area: 80,
    energyclass: "A",
    floors: 2,
    buildingFloors: 3,
    elevator: false,
    furnished: "Yes",
    balcony: false,
    garage: 1,
    heating: "Gas",
    listingType: "For Sale",
  },
  {
    id: 7,
    title: "Rustic Cottage with Vineyard in Asti",
    description:
      "Charming rustic cottage with a private vineyard, offering a serene and picturesque setting in the Asti countryside.",
    price: 650000,
    location: "Asti",
    zipCode: 14100,
    propertyType: "Cottage",
    bedrooms: 3,
    bathrooms: 2,
    area: 250,
    energyclass: "C",
    floors: 2,
    buildingFloors: 2,
    elevator: false,
    furnished: "No",
    balcony: true,
    garage: 1,
    heating: "Wood",
    listingType: "For Sale",
  },
  {
    id: 8,
    title: "Elegant Townhouse in Bergamo Alta",
    description:
      "An elegant and historic townhouse located in the prestigious Bergamo Alta, featuring period details and modern updates.",
    price: 1200000,
    location: "Bergamo",
    zipCode: 24129,
    propertyType: "Townhouse",
    bedrooms: 4,
    bathrooms: 3,
    area: 280,
    energyclass: "B",
    floors: 3,
    buildingFloors: 3,
    elevator: false,
    furnished: "No",
    balcony: true,
    garage: 1,
    heating: "Radiant",
    listingType: "For Sale",
  },
  {
    id: 9,
    title: "Renovated Historic Apartment in Padua",
    description:
      "A beautifully renovated apartment in a historic building, located in the heart of Padua, with high ceilings and large windows.",
    price: 850000,
    location: "Padua",
    zipCode: 35121,
    propertyType: "Apartment",
    bedrooms: 3,
    bathrooms: 2,
    area: 180,
    energyclass: "A",
    floors: 1,
    buildingFloors: 4,
    elevator: true,
    furnished: "Yes",
    balcony: false,
    garage: 1,
    heating: "Central",
    listingType: "For Sale",
  },
  {
    id: 10,
    title: "Seaside Villa with Private Pool in Liguria",
    description:
      "A luxurious seaside villa with a private pool and direct beach access, offering unparalleled views of the Ligurian Sea.",
    price: 3200000,
    location: "Portofino",
    zipCode: 16034,
    propertyType: "Villa",
    bedrooms: 5,
    bathrooms: 4,
    area: 500,
    energyclass: "A+",
    floors: 3,
    buildingFloors: 3,
    elevator: true,
    furnished: "Yes",
    balcony: true,
    garage: 2,
    heating: "Solar",
    listingType: "For Sale",
  },
];
