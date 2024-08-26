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

    if (formEntries === "GETALL") {
      console.log("Get it");
      const listing = await getAllListing();
      return NextResponse.json(listing, { status: 200 });
    } else {
      // Fetch listings based on form data
      const listing = await getListing(formEntries);
      return NextResponse.json(listing, { status: 200 });
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
