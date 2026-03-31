# Cypress Portfolio

A test automation portfolio project built with Cypress, showcasing UI, API, and Accessibility testing skills.

## Tech Stack

- **Cypress** — E2E and API testing framework
- **cypress-axe** — Accessibility testing using axe-core (WCAG 2.0/2.1)
- **cypress-jsonl-logger** — Custom structured JSONL logger ([GitHub](https://github.com/valentinomilanov/cypress-jsonl-logger))
- **Qase** — Test case management and result reporting

## Project Structure
```
cypress-portfolio/
├── cypress/
│   ├── e2e/
│   │   ├── ui/               ← UI test specs
│   │   ├── api/              ← API test specs
│   │   └── accessibility/    ← Accessibility test specs
│   ├── pages/                ← Page Object Model
│   ├── fixtures/             ← Test data (JSON)
│   ├── logs/                 ← Auto-generated JSONL logs
│   └── support/              ← Cypress support files
├── cypress.config.js
└── package.json
```

## Test Coverage

| Suite | Tests | Description |
|---|---|---|
| Smoke | 1 | Logger smoke test |
| UI | 8 | Login, logout, product filtering, cart, checkout |
| API | 6 | Auth, products, categories, user profile |
| Accessibility | 5 | WCAG 2.0/2.1 scans on key pages |
| **Total** | **20** | |

## Target Application

[Practice Software Testing](https://practicesoftwaretesting.com) — a purpose-built e-commerce application for QA practice.

API documentation: [Swagger UI](https://api.practicesoftwaretesting.com/api/documentation)

## Setup

### Prerequisites
- Node.js v18+
- npm

### Installation

Clone the repository:
```bash
git clone https://github.com/valentinomilanov/cypress-portfolio.git
cd cypress-portfolio
```

Install dependencies:
```bash
npm install
```

### Running Tests

Run all tests:
```bash
npx cypress run
```

Run a specific suite:
```bash
npx cypress run --spec "cypress/e2e/ui/*.cy.js"
npx cypress run --spec "cypress/e2e/api/*.cy.js"
npx cypress run --spec "cypress/e2e/accessibility/*.cy.js"
```

Open Cypress UI:
```bash
npx cypress open
```
## CI/CD

This project uses GitHub Actions for continuous integration, automatically triggered on every push to `master`.

### Pipeline structure
1. Clone the [Practice Software Testing](https://github.com/testsmith-io/practice-software-testing) app
2. Start the full app stack with Docker Compose
3. Configure Laravel environment and seed the database
4. Wait for API and frontend to be ready
5. Run all 20 Cypress tests against the local Docker instance
6. Upload logs and screenshots as artifacts

### Why Docker?
The public practice site (`practicesoftwaretesting.com`) rate limits requests from GitHub Actions IP addresses. Running the app locally in Docker completely bypasses this limitation and gives us a stable, isolated environment for CI.

### Run locally

**Against the public site (no Docker needed):**
```bash
npx cypress run
```

**Against a local Docker instance (recommended for CI parity):**
```bash
# Start the practice app
git clone https://github.com/testsmith-io/practice-software-testing.git
cd practice-software-testing
docker compose up -d

# Run tests against local instance
cd ../cypress-portfolio
$env:CYPRESS_BASE_URL="http://localhost:4200"; $env:CYPRESS_API_URL="http://localhost:8091"; npx cypress run
```

## Logging

This project uses a custom JSONL logger that generates structured log files in `cypress/logs/YYYY-MM-DD/`.

Each log entry contains:
```json
{"ts":"2026-03-26T10:00:00.000Z","spec":"auth.cy.js","test":"TC-2: Login with valid credentials","type":"STEP","text":"Navigate to login page URL"}
{"ts":"2026-03-26T10:00:01.000Z","spec":"auth.cy.js","test":"TC-2: Login with valid credentials","type":"VERIFICATION","text":"User is logged in — nav menu is visible"}
{"ts":"2026-03-26T10:00:01.500Z","spec":"auth.cy.js","test":"TC-2: Login with valid credentials","type":"RESULT","status":"PASSED","duration":3200}
```

Log types:
| Type | Description |
|---|---|
| `STEP` | User action performed |
| `VERIFICATION` | Assertion made |
| `INFO` | Additional data or context |
| `VIOLATION` | Accessibility violation detected |
| `RESULT` | Test pass/fail status and duration |

## Page Object Model

All UI interactions are encapsulated in Page Objects:

| Page Object | Responsibility |
|---|---|
| `LoginPage` | Login form interactions and assertions |
| `ProductPage` | Product browsing, filtering, cart actions |
| `CheckoutPage` | Cart, address, payment flow |
| `NavigationBar` | Navigation bar interactions |

## Author

Valentino Milanov