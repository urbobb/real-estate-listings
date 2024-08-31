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
    const createdListing = await createListing(formEntries);
    return NextResponse.json(createdListing, { status: 200 });
  } catch (err) {
    console.error("Failed to Create Listing", err);
    return NextResponse.json(
      { error: "Failed to Create Listing" },
      { status: 500 }
    );
  }
  return new NextResponse();
}
