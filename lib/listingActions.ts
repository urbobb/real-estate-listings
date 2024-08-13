import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export const getListing = async (formData: FormData) => {
  try {
    let getListings;
    if (formData) {
      const dataToSearch = {
        listingType: formData.get("listingType") as string,
        propertyType: formData.get("propertyType") as string,
        city: formData.get("city") as string,
        price: formData.get("price") as string,
        area: formData.get("area") as string,
      };
      console.log("Query:", {
        listingType: dataToSearch.listingType,
        propertyType: dataToSearch.propertyType,
        city: dataToSearch.city,
        price: dataToSearch.price,
        area: dataToSearch.area,
      });

      getListings = await prisma.listing.findMany({
        where: {
          listingType: {
            in: dataToSearch.listingType
              ? [dataToSearch.listingType]
              : undefined,
          },
        },
      });

      console.log("Sorted Listings: ", getListings);
      return NextResponse.json(
        { message: "Data fetching successfull", data: getListings },
        { status: 200 }
      );
    } else {
      //console.log("All FormData: ", formData);
      getListings = await prisma.listing.findMany({});

      //console.log("Listings: ", getListings);
      return NextResponse.json(
        { message: "Data fetching successfull", data: getListings },
        { status: 200 }
      );
    }
  } catch (err) {
    console.log("Error during database operation: ", err);
    return [];
  }
};

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

// Create more listings
// export async function createListing() {
//   try {
//     const listingsData = [
//       {
//         title: "Modern House",
//         description: "A beautiful modern house.",
//         price: 500000,
//         location: "New York",
//         zipCode: 10001,
//         propertyType: "HOUSE",
//         bedrooms: 3,
//         bathrooms: 2,
//         area: 1500,
//         energyclass: "A",
//         listingType: "FOR_SALE",
//       },
//       {
//         title: "Cozy Apartment",
//         description: "A cozy apartment in the city.",
//         price: 300000,
//         location: "San Francisco",
//         zipCode: 94105,
//         propertyType: "APARTMENT",
//         bedrooms: 2,
//         bathrooms: 1,
//         area: 800,
//         energyclass: "B",
//         listingType: "FOR_RENT",
//       },
//       {
//         title: "Spacious Condo",
//         description: "A spacious condo with a great view.",
//         price: 400000,
//         location: "Chicago",
//         zipCode: 60614,
//         propertyType: "CONDO",
//         bedrooms: 4,
//         bathrooms: 3,
//         area: 2000,
//         energyclass: "C",
//         listingType: "FOR_SALE",
//       },
//       {
//         title: "Beautiful Land",
//         description: "Vacant land for development.",
//         price: 200000,
//         location: "Austin",
//         zipCode: 73301,
//         propertyType: "LAND",
//         bedrooms: 0,
//         bathrooms: 0,
//         area: 5000,
//         energyclass: null,
//         listingType: "FOR_SALE",
//       },
//       {
//         title: "Luxury House",
//         description: "A luxury house with high-end features.",
//         price: 1500000,
//         location: "Los Angeles",
//         zipCode: 90001,
//         propertyType: "HOUSE",
//         bedrooms: 5,
//         bathrooms: 4,
//         area: 3500,
//         energyclass: "A",
//         listingType: "SOLD",
//       },
//       {
//         title: "Charming Studio",
//         description: "A charming studio apartment.",
//         price: 250000,
//         location: "Seattle",
//         zipCode: 98101,
//         propertyType: "APARTMENT",
//         bedrooms: 1,
//         bathrooms: 1,
//         area: 600,
//         energyclass: "B",
//         listingType: "FOR_RENT",
//       },
//       {
//         title: "Urban Loft",
//         description: "An urban loft with industrial design.",
//         price: 350000,
//         location: "Philadelphia",
//         zipCode: 19103,
//         propertyType: "CONDO",
//         bedrooms: 2,
//         bathrooms: 2,
//         area: 1200,
//         energyclass: "C",
//         listingType: "FOR_SALE",
//       },
//       {
//         title: "Countryside Land",
//         description: "Land in the countryside.",
//         price: 180000,
//         location: "Denver",
//         zipCode: 80201,
//         propertyType: "LAND",
//         bedrooms: 0,
//         bathrooms: 0,
//         area: 4500,
//         energyclass: null,
//         listingType: "FOR_SALE",
//       },
//       {
//         title: "Penthouse Suite",
//         description: "A luxurious penthouse suite.",
//         price: 2000000,
//         location: "Miami",
//         zipCode: 33101,
//         propertyType: "CONDO",
//         bedrooms: 6,
//         bathrooms: 5,
//         area: 4000,
//         energyclass: "A",
//         listingType: "FOR_SALE",
//       },
//       {
//         title: "Suburban House",
//         description: "A family house in the suburbs.",
//         price: 600000,
//         location: "Atlanta",
//         zipCode: 30301,
//         propertyType: "HOUSE",
//         bedrooms: 4,
//         bathrooms: 3,
//         area: 2500,
//         energyclass: "B",
//         listingType: "FOR_RENT",
//       },
//     ];

//     // Create all listings in parallel using Promise.all
//     const createListings = await prisma.listing.createMany({
//       data: listingsData,
//     });

//     console.log("Created listings:", createListings);
//   } catch (err) {
//     console.log("Error during database operation: ", err);
//     return null;
//   }
// }
