import { NextRequest, NextResponse } from "next/server";
import { getListingById } from "@/lib/listingActions";

export async function POST(req: NextRequest, res: NextResponse) {
  if (req.method !== "POST") {
    return NextResponse.json(
      { error: `Method ${req.method} NOT Allowed` },
      { status: 405 }
    );
  }

  try {
    const data = await req.json(); // Parse JSON body
    console.log(data);
    // Fetch listings based on form data
    return await getListingById(data);
    //return NextResponse.json(listings, { status: 200 });

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
