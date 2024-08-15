import { NextRequest, NextResponse } from "next/server";
import { getAllListing, getListing } from "@/lib/listingActions";

export async function POST(req: NextRequest) {
  if (req.method !== "POST") {
    return NextResponse.json(
      { error: `Method ${req.method} NOT Allowed` },
      { status: 405 }
    );
  }

  try {
    const formEntries = await req.json(); // Parse JSON body

    //const { listingType, propertyType, city, price, area } = formEntries;
    //console.log("Route FormData", formEntries);

    if (formEntries === "GETALL") {
      console.log("Get it");
      const listings = await getAllListing();
      console.log("Route FormData", listings);
      //return listings;
      return NextResponse.json(listings, { status: 200 });
    } else {
      // Fetch listings based on form data
      const listings = await getListing(formEntries);
      console.log("Route FormData", listings);
      //return listings;
      return NextResponse.json(listings, { status: 200 });
    }

    // Return the listings as a JSON response
  } catch (err) {
    console.error("Failed to fetch data", err);
    return NextResponse.json(
      { error: "Failed to fetch Data" },
      { status: 500 }
    );
  }

  return new NextResponse();
}

// export async function GET(req: NextRequest) {
//   try {
//     const data = await getListing();
//     return data;
//   } catch (err) {
//     return NextResponse.json(
//       { error: "Failed to fetch Data" },
//       { status: 500 }
//     );
//   }
// }
