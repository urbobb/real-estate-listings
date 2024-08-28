import { NextRequest, NextResponse } from "next/server";
import { createListing } from "@/lib/listingActions";

export async function POST(req: NextRequest, res: NextResponse) {
  if (req.method !== "POST") {
    return NextResponse.json(
      { error: `Method ${req.method} NOT Allowed` },
      { status: 405 }
    );
  }

  try {
    const formEntries = await req.formData(); // Parse JSON body
    console.log("FormEntries", formEntries);
    return await createListing(formEntries);

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
