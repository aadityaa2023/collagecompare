import { NextResponse } from "next/server";

// In-memory leads store for this dev/runtime session
const inMemoryLeads = [];

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, phone, state, preferredCourse, answersSummary } = body;

    if (!name || !phone) {
      return NextResponse.json(
        { error: "Name and Phone Number are required." },
        { status: 400 }
      );
    }

    const lead = {
      id: `LEAD-${Date.now().toString(36).toUpperCase()}`,
      name: name.trim(),
      phone: phone.trim(),
      state: state || "Not specified",
      preferredCourse: preferredCourse || "General Counselling",
      answersSummary: answersSummary || {},
      receivedAt: new Date().toISOString(),
    };

    inMemoryLeads.unshift(lead);

    // If an external Google Form or webhook URL is configured in server env, forward to it
    const externalWebhook = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
    if (externalWebhook) {
      try {
        await fetch(externalWebhook, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(lead),
        });
      } catch (fwdErr) {
        console.warn("Failed forwarding to external webhook:", fwdErr);
      }
    }

    return NextResponse.json(
      {
        success: true,
        message: "Counselling lead received successfully",
        leadId: lead.id,
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
  // Return the count of leads and recent leads for diagnostics
  return NextResponse.json({
    totalLeads: inMemoryLeads.length,
    leads: inMemoryLeads.slice(0, 10),
  });
}
