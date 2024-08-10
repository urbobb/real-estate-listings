import prisma from "@/lib/db";
import { Decimal } from "@prisma/client/runtime/library";

export async function getListing() {
  try {
    const getListings = await prisma.listing.findMany();
    console.log("Listings: ", getListings);
  } catch (err) {
    console.log("Error during database operation: ", err);
    return null;
  }
}

export async function createListing(
  title: string,
  description: string,
  price: number,
  location: string,
  zipCode: number,
  propertyType: string,
  bedrooms: number,
  bathrooms: number,
  area: number,
  energyclass: string,
  listingType: string
) {
  try {
    // Create all listings in parallel using Promise.all
    const createListings = await prisma.listing.createMany({
      data: {
        title: title,
        description: description,
        price: price,
        location: location,
        zipCode: zipCode,
        propertyType: propertyType,
        bedrooms: bedrooms,
        bathrooms: bathrooms,
        area: area,
        energyclass: energyclass,
        listingType: listingType,
      },
    });

    console.log("Created listings:", createListings);
  } catch (err) {
    console.log("Error during database operation: ", err);
    return null;
  }
}
