import { NextResponse } from "next/server";
import { getJudgments, initDB } from "@/lib/db";

export async function GET() {
  try {
    if (process.env.POSTGRES_URL) {
      await initDB();
      const history = await getJudgments(20);
      return NextResponse.json(history);
    }
    // No database configured - return empty
    return NextResponse.json([]);
  } catch (error) {
    console.error("History error:", error);
    return NextResponse.json([]);
  }
}
