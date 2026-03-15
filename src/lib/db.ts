import { sql } from "@vercel/postgres";

export async function initDB() {
  await sql`
    CREATE TABLE IF NOT EXISTS judgments (
      id SERIAL PRIMARY KEY,
      created_at TIMESTAMP DEFAULT NOW(),
      illy_what_happened TEXT,
      illy_pov TEXT,
      illy_feelings TEXT,
      eddie_what_happened TEXT,
      eddie_pov TEXT,
      eddie_feelings TEXT,
      verdict TEXT,
      illy_rationality INTEGER,
      eddie_rationality INTEGER,
      illy_feedback TEXT,
      eddie_feedback TEXT,
      resolution TEXT,
      cat_comment TEXT
    )
  `;
}

export async function saveJudgment(
  illy: { whatHappened: string; pov: string; feelings: string },
  eddie: { whatHappened: string; pov: string; feelings: string },
  result: {
    verdict: string;
    illy_rationality: number;
    eddie_rationality: number;
    illy_feedback: string;
    eddie_feedback: string;
    resolution: string;
    cat_comment: string;
  }
) {
  await sql`
    INSERT INTO judgments (
      illy_what_happened, illy_pov, illy_feelings,
      eddie_what_happened, eddie_pov, eddie_feelings,
      verdict, illy_rationality, eddie_rationality,
      illy_feedback, eddie_feedback, resolution, cat_comment
    ) VALUES (
      ${illy.whatHappened}, ${illy.pov}, ${illy.feelings},
      ${eddie.whatHappened}, ${eddie.pov}, ${eddie.feelings},
      ${result.verdict}, ${result.illy_rationality}, ${result.eddie_rationality},
      ${result.illy_feedback}, ${result.eddie_feedback}, ${result.resolution}, ${result.cat_comment}
    )
  `;
}

export async function getJudgments(limit = 20) {
  const { rows } = await sql`
    SELECT * FROM judgments ORDER BY created_at DESC LIMIT ${limit}
  `;
  return rows;
}

export async function getRecentForContext(limit = 5) {
  const { rows } = await sql`
    SELECT verdict, illy_rationality, eddie_rationality FROM judgments
    ORDER BY created_at DESC LIMIT ${limit}
  `;
  return rows;
}

export async function getStats() {
  const { rows } = await sql`
    SELECT
      COUNT(*) as total,
      SUM(CASE WHEN illy_rationality > eddie_rationality THEN 1 ELSE 0 END) as illy_wins,
      SUM(CASE WHEN eddie_rationality > illy_rationality THEN 1 ELSE 0 END) as eddie_wins
    FROM judgments
  `;
  return rows[0];
}
