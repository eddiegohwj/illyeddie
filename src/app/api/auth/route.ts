import { NextRequest, NextResponse } from "next/server";

const SITE_PASSWORD = process.env.SITE_PASSWORD || "illyeddie2026";

export async function POST(req: NextRequest) {
  const { password } = await req.json();

  if (password === SITE_PASSWORD) {
    return NextResponse.json({ success: true });
  }

  return NextResponse.json({ error: "Wrong password" }, { status: 401 });
}
