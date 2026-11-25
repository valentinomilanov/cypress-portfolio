# Playwright Portfolio

A TypeScript test automation portfolio built with **Playwright Test**, showcasing end-to-end UI, API, and accessibility testing against the Practice Software Testing application.

## Tech stack

- **Playwright Test** — browser automation, UI tests, API requests, fixtures, retries, and traces
- **TypeScript** — strict typing for tests, page objects, and test data
- **@axe-core/playwright** — automated WCAG 2.0 A/AA accessibility scans
- **Custom JSONL reporter** — structured test, step, verification, information, and accessibility-violation logs
- **GitHub Actions + Docker Compose** — repeatable CI environment using a local instance of the target application

## Project structure

```text
playwright-portfolio/
├── .github/
│   ├── actions/
│   │   └── setup-app/
│   │       └── action.yml
│   └── workflows/
│       ├── playwright-smoke.yml
│       ├── playwright-sequential.yml
│       └── playwright-parallel.yml
├── src/
│   ├── pages/                 # Page Object Model
│   ├── reporters/             # Custom JSONL reporter
│   └── utils/                 # Logging helpers
├── tests/
│   ├── accessibility/         # axe-core accessibility tests
│   ├── api/                   # API tests using Playwright APIRequest
│   ├── fixtures/              # Typed reusable test data
│   ├── smoke/                 # Smoke test
│   └── ui/                    # UI tests
├── playwright.config.ts
├── tsconfig.json
└── package.json
```

## Test coverage

| Suite | Tests | Coverage |
|---|---:|---|
| Smoke | 1 | Application availability and home page |
| UI | 8 | Login, logout, product filtering, cart, checkout |
| API | 6 | Authentication, products, categories, user profile |
| Accessibility | 5 | WCAG 2.0 A/AA scans on key application views |
| **Total** | **20** | |

Accessibility scans log all axe violations and fail the test when a critical-impact violation is present. Automated scans are a useful regression signal, not a substitute for manual accessibility review.

## Target application

[Practice Software Testing](https://practicesoftwaretesting.com) — a purpose-built e-commerce application for QA practice.

API documentation: [Swagger UI](https://api.practicesoftwaretesting.com/api/documentation)

## Prerequisites

- Node.js 22 or newer (Playwright's current supported Node.js lines are documented in the [Playwright installation guide](https://playwright.dev/docs/intro))
- npm
- Docker Desktop / Docker Engine and Docker Compose (for the local CI-parity environment)

## Installation

```bash
git clone https://github.com/valentinomilanov/cypress-portfolio.git
cd cypress-portfolio
npm install
npx playwright install chromium
```

On Linux CI runners, install browser system dependencies with:

```bash
npx playwright install --with-deps chromium
```

## Running tests

Run the complete suite:

```bash
npm test
```

Run a specific suite:

```bash
npm run test:smoke
npm run test:ui
npm run test:api
npm run test:a11y
```

Useful development commands:

```bash
npm run test:headed
npm run test:debug
npm run typecheck
npm run report
```

Playwright uses Chromium by default. Tests can be run against the public application or a locally hosted Docker instance.

## Configuration

The base URL and API URL can be overridden with environment variables:

| Variable | Default |
|---|---|
| `BASE_URL` | `https://practicesoftwaretesting.com` |
| `API_URL` | `https://api.practicesoftwaretesting.com` |

PowerShell example for the public app:

```powershell
$env:BASE_URL="https://practicesoftwaretesting.com"
$env:API_URL="https://api.practicesoftwaretesting.com"
npm test
```

## CI/CD

Three GitHub Actions pipelines are provided:

| Workflow | Trigger | Purpose |
|---|---|---|
| `playwright-smoke.yml` | Push to `master` + manual | Fast smoke gate |
| `playwright-sequential.yml` | Pull request to `master` + manual | All suites in one job, one after another |
| `playwright-parallel.yml` | Manual | Smoke, UI, API, and accessibility suites in separate jobs |

Each workflow uses the shared composite action at `.github/actions/setup-app`. It starts the Practice Software Testing app using Docker Compose, configures and seeds its Laravel database, waits for the API and frontend to become ready, installs Node dependencies, and installs Chromium.

The target app runs at `http://localhost:4200`; its API runs at `http://localhost:8091`.

## Run locally against Docker

Start the Practice Software Testing application:

```bash
git clone https://github.com/testsmith-io/practice-software-testing.git
cd practice-software-testing
docker compose up -d
```

After its containers are running and the Laravel setup/database seed steps used by the composite action are complete, run the portfolio from another terminal:

```bash
# From the portfolio project directory
BASE_URL=http://localhost:4200 API_URL=http://localhost:8091 npm test
```

PowerShell:

```powershell
$env:BASE_URL="http://localhost:4200"
$env:API_URL="http://localhost:8091"
npm test
```

## Reporting and diagnostics

The custom reporter writes structured JSONL records to:

```text
playwright/logs/YYYY-MM-DD/test-run.jsonl
```

It records test steps, annotations (information, verifications, and accessibility violations), and final test status/duration. Playwright also retains traces, screenshots, and videos on failure in `test-results/`. Open the HTML report with `npm run report` when a report has been generated.

Example JSONL records:

```json
{"ts":"2026-11-24T10:00:00.000Z","spec":"auth.spec.ts","test":"Authentication › TC-2: Login with valid credentials","type":"STEP","text":"Submit valid account credentials"}
{"ts":"2026-11-24T10:00:01.000Z","spec":"auth.spec.ts","test":"Authentication › TC-2: Login with valid credentials","type":"VERIFICATION","text":"Authenticated user menu is visible"}
{"ts":"2026-11-24T10:00:01.500Z","spec":"auth.spec.ts","test":"Authentication › TC-2: Login with valid credentials","type":"RESULT","status":"PASSED","duration":3200}
```

## Page Object Model

UI behavior is encapsulated in typed page objects:

| Page object | Responsibility |
|---|---|
| `LoginPage` | Login form interactions and validation |
| `ProductPage` | Category filtering, product selection, cart actions |
| `CheckoutPage` | Cart, address, and payment flow |
| `NavigationBar` | Main navigation, account menu, logout, cart |

API tests use Playwright's built-in `APIRequestContext`; accessibility tests use `@axe-core/playwright`.

## Migration notes

This branch replaces the former Cypress/JavaScript implementation with Playwright/TypeScript. Cypress configuration, support commands, fixtures, page objects, specs, dependencies, and Cypress-specific GitHub Actions commands have been removed.

## Author

Valentino Milanov
