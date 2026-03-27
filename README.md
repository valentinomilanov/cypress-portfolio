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
| UI | 8 | Login, logout, product filtering, cart, checkout |
| API | 6 | Auth, products, categories, user profile |
| Accessibility | 5 | WCAG 2.0/2.1 scans on key pages |
| **Total** | **19** | |

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
- Smoke tests
- API tests
- UI tests  
- Accessibility tests

### Known limitation
The target application (`practicesoftwaretesting.com`) rate limits requests from GitHub Actions IP addresses. As a result, UI and accessibility tests may fail in CI due to `403 Forbidden` responses — this is a limitation of the practice site, not the test suite itself. API tests run reliably in CI as they target a separate API server (`api.practicesoftwaretesting.com`).

All 20 tests pass consistently when run locally:
```bash
npx cypress run
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