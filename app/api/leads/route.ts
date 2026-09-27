import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isAuthenticated } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const { name, phone, email, interest, message } = await req.json();

    if (!name || !email) {
      return NextResponse.json(
        { error: "Name and email are required." },
        { status: 400 },
      );
    }

    const lead = await prisma.lead.create({
      data: {
        name: String(name).slice(0, 100),
        phone: phone ? String(phone).slice(0, 30) : null,
        email: String(email).slice(0, 254),
        interest: String(interest || "VWC Early Access").slice(0, 100),
        message: message ? String(message).slice(0, 2000) : null,
      },
    });

    return NextResponse.json({ success: true, lead }, { status: 201 });
  } catch (error) {
    console.error("Error creating lead:", error);
    return NextResponse.json(
      { error: "Failed to submit lead" },
      { status: 500 },
    );
  }
}

export async function GET() {
  try {
    const authed = await isAuthenticated();
    if (!authed) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const leads = await prisma.lead.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ leads });
  } catch (error) {
    console.error("Error fetching leads:", error);
    return NextResponse.json(
      { error: "Failed to fetch leads" },
      { status: 500 },
    );
  }
}
