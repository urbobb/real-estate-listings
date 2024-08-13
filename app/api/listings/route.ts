import { NextRequest, NextResponse } from "next/server";
import { getListing } from "@/lib/listingActions";

export async function POST(req: NextRequest) {
  if (req.method !== "POST") {
    return NextResponse.json(
      { error: `Method ${req.method} NOT Allowed` },
      { status: 405 }
    );
  }

  try {
    const formData = await req.json(); // Parse JSON body

    const { listingType, propertyType, city, price, area } = formData;
    console.log("Route FormData", listingType, propertyType, city, price, area);

    const searchData = new FormData();
    searchData.append("listingType", listingType);
    searchData.append("propertyType", propertyType);
    searchData.append("city", city);
    searchData.append("price", price);
    searchData.append("area", area);

    // Fetch listings based on form data
    return await getListing(searchData);

    // Return the listings as a JSON response
    //return NextResponse.json(listings, { status: 200 });
  } catch (err) {
    console.error("Failed to fetch data", err);
    return NextResponse.json(
      { error: "Failed to fetch Data" },
      { status: 500 }
    );
  }

  return new NextResponse();
}
