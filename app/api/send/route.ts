import { EmailTemplate } from "@/app/components/EmailTemplate";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const formEntries = await req.formData();
    console.log("Data received: ", formEntries);

    const name = formEntries.get("name") as string;
    const phone = formEntries.get("phone") as string;
    const message = formEntries.get("message") as string;
    const id = formEntries.get("id") as string;

    const { data, error } = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "devilism09@gmail.com",
      subject: "Hello world",
      react: EmailTemplate({
        firstName: name,
        phone: phone,
        message: message,
        id: id,
      }),
    });

    if (error) {
      return NextResponse.json({ error }, { status: 500 });
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
