import { NextResponse } from "next/server";
import { trackServerEvent } from "@/lib/integrations/analytics/server";

export async function POST(req: Request) {
  try {
    const { eventName, properties } = await req.json();

    if (!eventName) {
      return NextResponse.json({ error: "eventName is required" }, { status: 400 });
    }

    await trackServerEvent(eventName, properties);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Analytics API error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
