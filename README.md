# ARD-News-Tracker - Frontend

A modern, high-performance web interface built with **React 19**, **Vite 8**, and **TypeScript 6** to display and filter news imported from the ARD network. This application operates as a secure, anonymous client interacting with a headless Symfony backend API.

---

## 🛠 Tech Stack & Tools

* **Framework:** [React 19](https://react.dev) (Functional Components, Hooks)
* **Build Tool:** [Vite 8](https://vite.dev) (Extremely fast Hot Module Replacement)
* **Language:** [TypeScript 6](https://typescriptlang.org) (Strict type-safety & Autocomplete)
* **Styling:** [Tailwind CSS v4](https://tailwindcss.com) (Modern CSS-first utility framework)
* **Linter/Formatter:** [ESLint 10](https://eslint.org) & [Prettier](https://prettier.io) (Automated code-style enforcement via Flat Config)
* **Testing:** [Vitest](https://vitest.dev) & [React Testing Library](https://testing-library.com) (Component & Integration testing with `jsdom`)
* **API Mocking:** [MSW 2 (Mock Service Worker)](https://mswjs.io) (Intercepts network requests during testing)

---

## 📁 Project Architecture

The codebase follows a scalable **feature-driven** and **domain-driven** folder structure:

```text
src/
├── assets/             # Global static assets (logos, global styles)
├── components/         # Reusable global UI elements (Tables, Pagination, Inputs)
├── config/             # Central configurations (Generic Fetch API Client)
├── features/           # Domain-driven features
│   └── news/           # Everything related to the ARD News domain
│       ├── components/ # Feature-specific UI (NewsDashboard, NewsTable)
│       ├── services/   # Dedicated API service layers (Fetch requests)
│       └── types/      # TypeScript interfaces (e.g., NewsItem)
├── test/               # Central testing infrastructure
│   ├── server.ts       # MSW mock server configuration and API handlers
│   └── setup.ts        # Global Vitest setup (jest-dom framework extensions)
├── types/              # Global fallback type declarations (Vite client env, PaginatedResponse)
├── App.tsx             # Main application core layout
└── main.tsx            # Application entry point
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have **Node.js 22+ (LTS)** installed on your machine. We recommend managing Node versions using **NVM** (Node Version Manager).

```bash
# Verify your Node version
node --version # Should output v22.x.x or higher
```

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com
   cd ARD-News-Tracker
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create your local environment configuration file:
   ```bash
   cp .env.dist .env.local
   ```
   *Note: Open `.env.local` and configure your `VITE_API_URL` and `VITE_API_KEY` to connect with your Symfony OpenAPI backend.*

---

## 💻 Available Scripts

In the project directory, you can run the following automated tasks:


| Command | Action |
| :--- | :--- |
| `npm run dev` | Launches the local development server at `http://localhost:5173`. |
| `npm run build` | Compiles TypeScript and builds the production bundle into `/dist`. |
| `npm run preview` | Runs the compiled production build locally for testing. |
| `npm run lint` | Runs ESLint to check for static code analysis errors. |
| `npm run lint:fix` | Runs ESLint and automatically fixes fixable code styling issues. |
| `npm run format` | Formats all components, styles, and markdown assets using Prettier. |
| `npm run test` | Starts the Vitest interactive watch mode for running tests. |
| `npm run test:run` | Runs all tests once and exits (ideal for CI/CD pipelines). |

---

## 🔒 Security & Testing Architecture

### No-Login Protection
Since this app provides public news access without user registration, security is enforced through an **anonymous multi-layer protection scheme** orchestrated with our Symfony backend:
1. **Client-Side API Key:** Requests are initialized with a static token (`X-API-KEY`) verified by the backend.
2. **Strict CORS Policy:** Enforced via `NelmioCorsBundle` in Symfony to restrict requests to our authorized production domain.
3. **IP-Based Rate Limiting:** Enforced via Symfony Rate Limiter to prevent automated scraping or Denial of Service (DoS) attacks.

### Robust API Mocking (MSW & Vitest)
During test runs, we **never** hit the real Symfony database. Instead:
* **MSW Wildcard Interception:** MSW intercepts all outgoing HTTP requests using flexible wildcard paths (`*/news`). This bypasses the need for hardcoded environment stubs or configuration injection during testing.
* **Component Synchronization:** Asynchronous rendering cycles in React 19 are safely tracked using robust DOM queries like `screen.findByText`.
* Comprehensive edge-cases are covered: **Successful data rendering**, **HTTP 500 error boundaries**, and **empty database state boundaries**.

---

## 🗺 Current Roadmap

* [x] **Phase 1:** Initialize React 19 boilerplate with Vite 8.
* [x] **Phase 2:** Complete transition to TypeScript 6 and configure structural interfaces.
* [x] **Phase 3:** Integrate Tailwind CSS v4 and compile UI layout components (Tables, Search, Pagination).
* [x] **Phase 4:** Establish an automated linting configuration combining ESLint 10 Flat Config and Prettier.
* [x] **Phase 5:** Implement the Generic State Fetching client connecting to the live Symfony Core Endpoints.
* [x] **Phase 6:** Integrate robust Unit and Integration Tests using Vitest, React Testing Library, and MSW.
* [ ] **Phase 7 (Next):** Reactivate the UI filter states to support **Live Searching and Pagination data** via URL parameters.
