import { NextRequest, NextResponse } from "next/server";
import { getListingById, updateListing } from "@/lib/listingActions";

export async function PUT(req: NextRequest) {
  console.log("PUTTTTTTTTTTT");
  if (req.method !== "PUT") {
    return NextResponse.json(
      { error: `Method ${req.method} NOT Allowed` },
      { status: 405 }
    );
  }

  try {
    // Parse JSON body
    const formEntries = await req.formData();
    console.log("data", formEntries);
    const updatedListing = await updateListing(formEntries);
    return NextResponse.json(updatedListing, { status: 200 });
  } catch (err) {
    console.error("Failed to fetch data", err);
    return NextResponse.json(
      { error: "Failed to fetch Data" },
      { status: 500 }
    );
  }
  return new NextResponse();
}

export async function POST(req: NextRequest) {
  console.log("POST");
  if (req.method !== "POST") {
    return NextResponse.json(
      { error: `Method ${req.method} NOT Allowed` },
      { status: 405 }
    );
  }

  try {
    // Parse JSON body
    const data = await req.json();
    // Fetch listings based on form data
    const listing = await getListingById(data);
    return NextResponse.json(listing, { status: 200 });
  } catch (err) {
    console.error("Failed to fetch data", err);
    return NextResponse.json(
      { error: "Failed to fetch Data" },
      { status: 500 }
    );
  }
  return new NextResponse();
}
