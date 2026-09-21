import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Lead from "@/models/Lead";

export async function POST(request) {
  try {
    await dbConnect();
    const body = await request.json();
    const { name, phone, state, preferredCourse, answersSummary } = body;

    if (!name || !phone) {
      return NextResponse.json(
        { error: "Name and Phone Number are required." },
        { status: 400 }
      );
    }

    const lead = new Lead({
      name: name.trim(),
      phone: phone.trim(),
      state: state || "Not specified",
      preferredCourse: preferredCourse || "General Counselling",
      answersSummary: answersSummary || {},
    });

    await lead.save();

    // If an external Google Form or webhook URL is configured in server env, forward to it
    const externalWebhook = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
    if (externalWebhook) {
      try {
        await fetch(externalWebhook, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: lead._id,
            name: lead.name,
            phone: lead.phone,
            state: lead.state,
            preferredCourse: lead.preferredCourse,
            answersSummary: lead.answersSummary,
            receivedAt: lead.createdAt,
          }),
        });
      } catch (fwdErr) {
        console.warn("Failed forwarding to external webhook:", fwdErr);
      }
    }

    return NextResponse.json(
      {
        success: true,
        message: "Counselling lead received successfully",
        leadId: lead._id,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing counselling submission:", error);
    return NextResponse.json(
      { error: "Failed to process counselling request" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await dbConnect();
    const totalLeads = await Lead.countDocuments();
    const leads = await Lead.find().sort({ createdAt: -1 }).limit(10);
    
    return NextResponse.json({
      totalLeads,
      leads,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch leads" },
      { status: 500 }
    );
  }
}
