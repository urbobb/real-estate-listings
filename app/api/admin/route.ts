"use server";
import { createListing } from "@/lib/listingActions";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const formEntries = await req.formData(); // Parse JSON body
    // console.log(formEntries);
    return await createListing(formEntries);
  } catch (err) {
    console.error("Failed to fetch data", err);
    return NextResponse.json(
      { error: "Failed to fetch Data" },
      { status: 500 }
    );
  }
  return new NextResponse();
}
