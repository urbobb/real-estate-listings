"use server";
import prisma from "@/lib/db";
import { NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from "uuid";
import { revalidatePath } from "next/cache";

interface SearchData {
  params: SearchParams;
}

interface SearchParams {
  minPrice?: number | null;
  maxPrice?: number | null;
  location?: string;
  propertyType?: string;
  minArea?: number | null;
  maxArea?: number | null;
  listingType?: string;
}

const s3 = new S3Client({
  region: process.env.AWS_BUCKET_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
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

export const getListing = async (searchData: any) => {
  const { params } = searchData;

  console.log("formEntries DB:", params);

  try {
    if (searchData) {
      let areaCondtions: any = {};
      let priceConditions: any = {};
      const minPrice = (parseInt(params?.minPrice) as number) || null;
      const maxPrice = (parseInt(params?.maxPrice) as number) || null;
      const minArea = (parseInt(params?.minArea) as number) || null;
      const maxArea = (parseInt(params?.maxArea) as number) || null;
      if (minArea === null && maxArea === null) {
        areaCondtions = {};
      } else if (minArea === null && maxArea !== null) {
        areaCondtions.lte = maxArea;
      } else if (minArea !== null && maxArea === null) {
        areaCondtions.gte = minArea;
      } else {
        areaCondtions.gte = minArea;
        areaCondtions.lte = maxArea;
      }
      if (minPrice === null && maxPrice === null) {
        priceConditions = {};
      } else if (minPrice === null && maxPrice !== null) {
        priceConditions.lte = maxPrice;
      } else if (minPrice !== null && maxPrice === null) {
        priceConditions.gte = minPrice;
      } else {
        priceConditions.gte = minPrice;
        priceConditions.lte = maxPrice;
      }
      const getListings = await prisma.listing.findMany({
        where: {
          price: priceConditions, // Filter based on price less than the provided value
          ...(params?.location && {
            location: params?.location === "all-above" ? {} : params?.location,
          }),
          ...(params?.propertyType && {
            propertyType: params?.propertyType,
          }),
          area: areaCondtions,
          ...(params?.listingType && {
            listingType: params?.listingType,
          }),
        },
        include: {
          images: {
            orderBy: [{ id: "desc" }],
          },
        },
      });
      return getListings;
    }
  } catch (err) {
    console.error("Error during database operation: ", err);
    return NextResponse.json(
      { message: "Error during data fetch", error: err },
      { status: 500 }
    );
  }
};

export const getListingById = async (idParam: { id: string }) => {
  const id = parseInt(idParam.id, 10);
  try {
    const getListing = await prisma.listing.findUnique({
      where: {
        id: id, // get by ID
      },
      include: {
        images: {
          where: { listingId: id },
          orderBy: [{ id: "desc" }],
        },
      },
    });

    return getListing;
  } catch (err) {
    console.error("Error during database operation: ", err);
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
      orderBy: {
        id: "asc",
      },
      include: {
        // include images
        images: {
          orderBy: [{ id: "desc" }], // sort by id in descending order
        },
      },
    });

    return getListings;
  } catch (err) {
    console.error("Error during database operation: ", err);
    return NextResponse.json(
      { message: "Error during data fetch", error: err },
      { status: 500 }
    );
  }
};

export async function createListing(formData: FormData) {
  const dataToCreateListing = formData;
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
      uplodedFiles.push(fileName);
    }

    const imageUrls = uplodedFiles;
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

    if (!data.title) {
      throw new Error("Title is required");
    }

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
    return createListings;
  } catch (err) {
    console.error("Error during database operation: ", err);
    return null;
  }
}

export async function updateListing(formData: FormData) {
  const dataToUpdateListing = formData;
  const data = {
    id: dataToUpdateListing.get("id") as string,
    title: dataToUpdateListing.get("title") as string,
    description: dataToUpdateListing.get("description") as string,
    price: parseInt(dataToUpdateListing.get("price") as string, 10) || 0,
    location: dataToUpdateListing.get("location") as string,
    zipCode: parseInt(dataToUpdateListing.get("zipCode") as string, 10) || 0,
    propertyType: dataToUpdateListing.get("propertyType") as string,
    bedrooms: parseInt(dataToUpdateListing.get("bedrooms") as string, 10) || 0,
    bathrooms:
      parseInt(dataToUpdateListing.get("bathrooms") as string, 10) || 0,
    area: parseInt(dataToUpdateListing.get("area") as string, 10) || 0,
    energyclass: dataToUpdateListing.get("energyclass") as string,
    floors: parseInt(dataToUpdateListing.get("floors") as string, 10) || 0,
    buildingFloors:
      parseInt(dataToUpdateListing.get("buildingFloors") as string, 10) || 0,
    elevator: dataToUpdateListing.get("elevator") === "Yes" ? true : false,
    furnished: dataToUpdateListing.get("furnished") as string,
    balcony: dataToUpdateListing.get("balcony") === "Yes" ? true : false,
    garage: parseInt(dataToUpdateListing.get("garage") as string, 10) || 0,
    heating: dataToUpdateListing.get("heating") as string,
    listingType: dataToUpdateListing.get("listingType") as string,
  };

  try {
    const updateListing = await prisma.listing.update({
      where: {
        id: parseInt(data.id),
      },
      data: {
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
      },
    });
    return updateListing;
  } catch (err) {
    console.error("Failed to update Listing.");
  }
}

export async function deleteListingById(idParam: { id: string }) {
  const id = parseInt(idParam.id, 10);

  try {
    await prisma.image.deleteMany({
      where: { listingId: id },
    });

    const listingtoDelete = await prisma.listing.delete({
      where: { id: id },
    });

    return listingtoDelete;
  } catch (err) {
    console.error("Error during database operation: ", err);
    return NextResponse.json(
      { message: "Error during data fetch", error: err },
      { status: 500 }
    );
  }
}
