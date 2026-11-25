import type { TestInfo } from '@playwright/test';

export type LogAnnotationType = 'INFO' | 'VERIFICATION' | 'VIOLATION';

/** Adds a structured event consumed by the custom JSONL reporter. */
export function logEvent(
  testInfo: TestInfo,
  type: LogAnnotationType,
  text: string
): void {
  testInfo.annotations.push({ type, description: text });
}
