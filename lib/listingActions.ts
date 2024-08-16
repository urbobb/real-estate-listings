"use server";
import prisma from "@/lib/db";
import { NextResponse } from "next/server";
import { property } from "three/examples/jsm/nodes/Nodes.js";

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

export const getAllListing = async () => {
  try {
    console.log("All");
    const getListings = await prisma.listing.findMany();

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

//Create more listings
// export async function createListing() {
//   try {
//     const listingsData = [
//       {
//         title: "Modern House",
//         description: "A beautiful modern house.",
//         price: 550000,
//         location: "New York",
//         zipCode: 10001,
//         propertyType: "HOUSE",
//         bedrooms: 3,
//         bathrooms: 2,
//         area: 150,
//         energyclass: "A",
//         listingType: "FOR_SALE",
//       },
//       {
//         title: "Cozy Apartment",
//         description: "A cozy apartment in the city.",
//         price: 350000,
//         location: "San Francisco",
//         zipCode: 94105,
//         propertyType: "APARTMENT",
//         bedrooms: 2,
//         bathrooms: 1,
//         area: 80,
//         energyclass: "B",
//         listingType: "FOR_RENT",
//       },
//       {
//         title: "Spacious Condo",
//         description: "A spacious condo with a great view.",
//         price: 420000,
//         location: "Chicago",
//         zipCode: 60614,
//         propertyType: "CONDO",
//         bedrooms: 4,
//         bathrooms: 3,
//         area: 80,
//         energyclass: "C",
//         listingType: "FOR_SALE",
//       },
//       {
//         title: "Beautiful Land",
//         description: "Vacant land for development.",
//         price: 210000,
//         location: "Austin",
//         zipCode: 73301,
//         propertyType: "LAND",
//         bedrooms: 0,
//         bathrooms: 0,
//         area: 58,
//         energyclass: null,
//         listingType: "FOR_SALE",
//       },
//       {
//         title: "Luxury House",
//         description: "A luxury house with high-end features.",
//         price: 1100000,
//         location: "Los Angeles",
//         zipCode: 90001,
//         propertyType: "HOUSE",
//         bedrooms: 5,
//         bathrooms: 4,
//         area: 79,
//         energyclass: "A",
//         listingType: "SOLD",
//       },
//       {
//         title: "Charming Studio",
//         description: "A charming studio apartment.",
//         price: 260000,
//         location: "Seattle",
//         zipCode: 98101,
//         propertyType: "APARTMENT",
//         bedrooms: 1,
//         bathrooms: 1,
//         area: 127,
//         energyclass: "B",
//         listingType: "FOR_RENT",
//       },
//       {
//         title: "Urban Loft",
//         description: "An urban loft with industrial design.",
//         price: 380000,
//         location: "Philadelphia",
//         zipCode: 19103,
//         propertyType: "CONDO",
//         bedrooms: 2,
//         bathrooms: 2,
//         area: 120,
//         energyclass: "C",
//         listingType: "FOR_SALE",
//       },
//       {
//         title: "Countryside Land",
//         description: "Land in the countryside.",
//         price: 120000,
//         location: "Denver",
//         zipCode: 80201,
//         propertyType: "LAND",
//         bedrooms: 0,
//         bathrooms: 0,
//         area: 140,
//         energyclass: null,
//         listingType: "FOR_SALE",
//       },
//       {
//         title: "Penthouse Suite",
//         description: "A luxurious penthouse suite.",
//         price: 2500000,
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
//         price: 620000,
//         location: "Atlanta",
//         zipCode: 30301,
//         propertyType: "HOUSE",
//         bedrooms: 4,
//         bathrooms: 3,
//         area: 90,
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
