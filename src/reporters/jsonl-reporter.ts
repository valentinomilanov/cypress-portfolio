import fs from 'node:fs';
import path from 'node:path';
import type {
  FullConfig,
  Reporter,
  TestCase,
  TestResult,
  TestStep
} from '@playwright/test/reporter';

type LogRecord = {
  ts: string;
  spec: string;
  test: string;
  type: string;
  text: string;
  status?: string;
  duration?: number;
  details?: unknown;
};

/**
 * Writes test lifecycle events and annotations to newline-delimited JSON.
 * Each worker-safe record is appended synchronously by the reporter at test end.
 */
class JsonlReporter implements Reporter {
  private logFile = '';

  onBegin(_config: FullConfig): void {
    const date = new Date().toISOString().slice(0, 10);
    const directory = path.join(process.cwd(), 'playwright', 'logs', date);
    fs.mkdirSync(directory, { recursive: true });
    this.logFile = path.join(directory, 'test-run.jsonl');
    fs.writeFileSync(this.logFile, '', 'utf8');
  }

  onTestEnd(test: TestCase, result: TestResult): void {
    const spec = path.basename(test.location.file);
    const testName = test.titlePath().join(' › ');
    const records: LogRecord[] = [];

    for (const annotation of result.annotations) {
      const type = annotation.type.toUpperCase();
      if (['INFO', 'VERIFICATION', 'VIOLATION', 'STEP'].includes(type)) {
        records.push({
          ts: new Date().toISOString(),
          spec,
          test: testName,
          type,
          text: annotation.description || type,
          details: annotation.description
        });
      }
    }

    records.push({
      ts: new Date().toISOString(),
      spec,
      test: testName,
      type: 'RESULT',
      text: `Test ${result.status}`,
      status: result.status.toUpperCase(),
      duration: result.duration
    });

    fs.appendFileSync(
      this.logFile,
      records.map((record) => JSON.stringify(record)).join('\n') + '\n',
      'utf8'
    );
  }

  onStepBegin(test: TestCase, _result: TestResult, step: TestStep): void {
    if (step.category !== 'test.step') return;
    const record: LogRecord = {
      ts: new Date().toISOString(),
      spec: path.basename(test.location.file),
      test: test.titlePath().join(' › '),
      type: 'STEP',
      text: step.title
    };
    fs.appendFileSync(this.logFile, JSON.stringify(record) + '\n', 'utf8');
  }
}

export default JsonlReporter;
