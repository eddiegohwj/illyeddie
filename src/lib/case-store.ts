// Shared server-side case state for multi-device submissions

export interface Submission {
  whatHappened: string;
  pov: string;
  feelings: string;
  submittedAt: number;
}

export interface CurrentCase {
  id: string;
  illy: Submission | null;
  eddie: Submission | null;
  verdict: Record<string, unknown> | null;
  judging: boolean;
  createdAt: number;
}

// Use a module-level variable that persists within the same serverless instance
let currentCase: CurrentCase | null = null;

export function getCase(): CurrentCase | null {
  // Auto-reset if case is older than 2 hours
  if (currentCase && Date.now() - currentCase.createdAt > 2 * 60 * 60 * 1000) {
    currentCase = null;
  }
  return currentCase;
}

export function getOrCreateCase(): CurrentCase {
  const existing = getCase();
  if (existing) return existing;

  currentCase = {
    id: Date.now().toString(),
    illy: null,
    eddie: null,
    verdict: null,
    judging: false,
    createdAt: Date.now(),
  };
  return currentCase;
}

export function resetCase(): void {
  currentCase = null;
}
