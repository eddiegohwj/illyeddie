import { NextRequest, NextResponse } from "next/server";
import { getOrCreateCase } from "@/lib/case-store";

export async function POST(req: NextRequest) {
  try {
    const { person, whatHappened, pov, feelings } = await req.json();

    if (!person || !["illy", "eddie"].includes(person)) {
      return NextResponse.json({ error: "Invalid person" }, { status: 400 });
    }

    if (!whatHappened?.trim() || !pov?.trim() || !feelings?.trim()) {
      return NextResponse.json({ error: "All fields required" }, { status: 400 });
    }

    const currentCase = getOrCreateCase();

    const submission = {
      whatHappened: whatHappened.trim(),
      pov: pov.trim(),
      feelings: feelings.trim(),
      submittedAt: Date.now(),
    };

    if (person === "illy") {
      currentCase.illy = submission;
    } else {
      currentCase.eddie = submission;
    }

    return NextResponse.json({
      success: true,
      caseId: currentCase.id,
      illySubmitted: !!currentCase.illy,
      eddieSubmitted: !!currentCase.eddie,
    });
  } catch (error) {
    console.error("Submit error:", error);
    return NextResponse.json({ error: "Submission failed" }, { status: 500 });
  }
}
