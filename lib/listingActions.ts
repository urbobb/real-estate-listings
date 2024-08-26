"use server";
import prisma from "@/lib/db";
import { NextResponse } from "next/server";
// import { getServerSession } from "next-auth/next";
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
  //const session = await getServerSession();

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
      return getListings;
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

    return getListing;
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

    return getListings;
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
