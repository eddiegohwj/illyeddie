import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { saveJudgment, getRecentForContext, getStats, initDB } from "@/lib/db";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || "",
});

const useDB = !!process.env.POSTGRES_URL;

// Fallback in-memory store for local dev without database
const memoryHistory: Array<{
  verdict: string;
  illy_rationality: number;
  eddie_rationality: number;
}> = [];

export async function POST(req: NextRequest) {
  try {
    const { illy, eddie } = await req.json();

    // Build context from past judgments
    let pastContext = "";
    try {
      if (useDB) {
        await initDB();
        const stats = await getStats();
        const recent = await getRecentForContext(5);
        if (recent.length > 0) {
          pastContext = `\n\nPAST JUDGMENT HISTORY (last ${recent.length} cases):\n`;
          pastContext += `Overall record: Illy rated higher ${stats.illy_wins} times, Eddie rated higher ${stats.eddie_wins} times, ties: ${Number(stats.total) - Number(stats.illy_wins) - Number(stats.eddie_wins)}\n`;
          recent.forEach((c, i) => {
            pastContext += `Case ${i + 1}: Illy ${c.illy_rationality}% vs Eddie ${c.eddie_rationality}% - "${String(c.verdict).substring(0, 80)}..."\n`;
          });
          pastContext += `\nUse this history for context but judge the CURRENT case on its own merits. Do not let past patterns bias your judgment.\n`;
        }
      } else if (memoryHistory.length > 0) {
        const recent = memoryHistory.slice(-5);
        pastContext = `\n\nPAST JUDGMENT HISTORY (last ${recent.length} cases):\n`;
        let illyWins = 0, eddieWins = 0;
        memoryHistory.forEach((j) => {
          if (j.illy_rationality > j.eddie_rationality) illyWins++;
          else if (j.eddie_rationality > j.illy_rationality) eddieWins++;
        });
        pastContext += `Overall record: Illy rated higher ${illyWins} times, Eddie rated higher ${eddieWins} times, ties: ${memoryHistory.length - illyWins - eddieWins}\n`;
        recent.forEach((c, i) => {
          pastContext += `Case ${i + 1}: Illy ${c.illy_rationality}% vs Eddie ${c.eddie_rationality}% - "${c.verdict.substring(0, 80)}..."\n`;
        });
        pastContext += `\nUse this history for context but judge the CURRENT case on its own merits.\n`;
      }
    } catch {
      // If DB fails, continue without history context
    }

    const systemPrompt = `You are Judge Whiskers, a wise and fair pixel-art cat judge presiding over Cat Court. You speak in a calm, balanced tone with occasional cat puns. You are NEVER biased toward either party.

You will receive two perspectives on a disagreement between Illy (she/her) and Eddie (he/him). They are a couple who love each other.

Your job:
1. Identify the core issue
2. Evaluate each person's rationality (logic, fairness, emotional awareness)
3. Give a rationality percentage (must add to 100%)
4. Deliver a verdict that acknowledges both sides
5. Suggest a resolution

Rules:
- Be genuinely fair. Don't default to 50/50 to avoid conflict.
- Consider emotional validity alongside logical reasoning
- Call out logical fallacies or unfair framing from either side
- Keep it warm and constructive — this is a couple who loves each other
- End with a cat-themed closing remark
- Keep each field concise (2-3 sentences max)
${pastContext}

You MUST respond with valid JSON only, no markdown, no code fences. Use this exact structure:
{"verdict":"your overall verdict","illy_rationality":55,"eddie_rationality":45,"illy_feedback":"feedback for illy","eddie_feedback":"feedback for eddie","resolution":"suggested resolution","cat_comment":"a cute cat-themed closing remark"}`;

    const userMessage = `ILLY'S TESTIMONY:
What happened: ${illy.whatHappened}
My POV: ${illy.pov}
How I feel: ${illy.feelings}

EDDIE'S TESTIMONY:
What happened: ${eddie.whatHappened}
My POV: ${eddie.pov}
How I feel: ${eddie.feelings}`;

    const response = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1024,
      system: systemPrompt,
      messages: [{ role: "user", content: userMessage }],
    });

    const text = response.content[0].type === "text" ? response.content[0].text : "";
    const parsed = JSON.parse(text);

    // Validate required fields
    const result = {
      verdict: parsed.verdict || "The court has deliberated.",
      illy_rationality: Math.max(0, Math.min(100, Number(parsed.illy_rationality) || 50)),
      eddie_rationality: Math.max(0, Math.min(100, Number(parsed.eddie_rationality) || 50)),
      illy_feedback: parsed.illy_feedback || "",
      eddie_feedback: parsed.eddie_feedback || "",
      resolution: parsed.resolution || "",
      cat_comment: parsed.cat_comment || "",
    };

    // Ensure percentages add to 100
    if (result.illy_rationality + result.eddie_rationality !== 100) {
      const total = result.illy_rationality + result.eddie_rationality;
      result.illy_rationality = Math.round((result.illy_rationality / total) * 100);
      result.eddie_rationality = 100 - result.illy_rationality;
    }

    // Save to storage
    try {
      if (useDB) {
        await saveJudgment(illy, eddie, result);
      } else {
        memoryHistory.push({
          verdict: result.verdict,
          illy_rationality: result.illy_rationality,
          eddie_rationality: result.eddie_rationality,
        });
      }
    } catch {
      // Don't fail the request if saving fails
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("Judge error:", error);
    return NextResponse.json(
      { error: "Judge Whiskers encountered an error" },
      { status: 500 }
    );
  }
}
