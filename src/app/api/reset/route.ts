import { NextResponse } from "next/server";
import { resetCase } from "@/lib/case-store";

export async function POST() {
  resetCase();
  return NextResponse.json({ success: true });
}
