export interface ConcernOption {
  value: string;
  label: string;
  aliases: string[];
}

export const CONCERN_OPTIONS: ConcernOption[] = [
  { value: 'anxiety', label: 'Anxiety', aliases: ['anxiety'] },
  { value: 'stress', label: 'Stress', aliases: ['stress'] },
  { value: 'depression', label: 'Depression', aliases: ['depression'] },
  { value: 'relationships', label: 'Relationship Issues', aliases: ['relationships', 'relationship', 'relationship issues'] },
  { value: 'burnout', label: 'Work & Career Burnout', aliases: ['burnout', 'career', 'work', 'work/burnout', 'career/burnout', 'work burnout', 'career burnout', 'work & career burnout'] },
  { value: 'trauma', label: 'Trauma & PTSD / Grief', aliases: ['trauma', 'ptsd', 'grief', 'trauma/grief', 'trauma & ptsd', 'trauma & grief', 'trauma/ptsd', 'trauma & ptsd / grief'] },
  { value: 'self-esteem', label: 'Self-Esteem', aliases: ['self-esteem', 'self esteem', 'confidence'] },
  { value: 'other', label: 'Something else', aliases: ['other', 'something else'] },
];

export const CONCERN_LABELS = CONCERN_OPTIONS.map((c) => c.label);

/**
 * Maps any input string or array of strings (concern IDs, labels, or aliases)
 * to standard CONCERN_LABELS.
 */
export function mapToConcernLabels(inputs: string[]): string[] {
  const matchedLabels: string[] = [];

  for (const raw of inputs) {
    const cleaned = raw.trim().toLowerCase();
    if (!cleaned) continue;

    // Check direct label match
    const exact = CONCERN_OPTIONS.find(
      (c) => c.label.toLowerCase() === cleaned || c.value.toLowerCase() === cleaned
    );
    if (exact) {
      matchedLabels.push(exact.label);
      continue;
    }

    // Check alias match
    const byAlias = CONCERN_OPTIONS.find((c) =>
      c.aliases.some((alias) => cleaned === alias || cleaned.includes(alias) || alias.includes(cleaned))
    );
    if (byAlias) {
      matchedLabels.push(byAlias.label);
    }
  }

  return Array.from(new Set(matchedLabels));
}
