# ARD-News-Tracker - Frontend

A modern, high-performance web interface built with **React 19**, **Vite 8**, and **TypeScript 6** to display and filter news imported from the ARD network. This application operates as a secure, anonymous client interacting with a headless Symfony backend API.

---

## 🛠 Tech Stack & Tools

* **Framework:** [React 19](https://react.dev) (Functional Components, Hooks)
* **Build Tool:** [Vite 8](https://vite.dev) (Extremely fast Hot Module Replacement)
* **Language:** [TypeScript 6](https://typescriptlang.org) (Strict type-safety & Autocomplete)
* **Styling:** [Tailwind CSS v4](https://tailwindcss.com) (Modern CSS-first utility framework)
* **Linter/Formatter:** [ESLint 10](https://eslint.org) & [Prettier](https://prettier.io) (Automated code-style enforcement via Flat Config)

---

## 📁 Project Architecture

The codebase follows a scalable **feature-driven** and **domain-driven** folder structure:

```text
src/
├── assets/             # Global static assets (logos, global styles)
├── components/         # Reusable global UI elements (Tables, Pagination, Inputs)
├── config/             # Central configurations (Generic Axios/Fetch API Clients)
├── features/           # Domain-driven features
│   └── news/           # Everything related to the ARD News domain
│       ├── components/ # Feature-specific UI (NewsList, NewsDashboard)
│       ├── hooks/      # Custom React Hooks (e.g., useNewsFilter)
│       ├── services/   # Dedicated API service layers (Fetch requests)
│       └── types/      # TypeScript interfaces (e.g., NewsItem)
├── types/              # Global fallback type declarations (Vite client env)
├── App.tsx             # Main application router and core layout
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
   git clone https://github.com/hannimoon/ard-news-tracker-react.git
   cd ard-news-tracker-react
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create your local environment configuration file:
   ```bash
   cp .env.example .env.local
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

---

## 🔒 Security Best Practices (No-Login Architecture)

Since this app provides public news access without user registration, security is enforced through an **anonymous multi-layer protection scheme** orchestrated with our Symfony backend:

1. **Client-Side API Key:** Requests are initialized with a static token verified by the backend OpenAPI docs.
2. **Strict CORS Policy:** The Symfony gateway strictly restricts requests to our authorized production domain.
3. **IP-Based Rate Limiting:** Enforced via Symfony Rate Limiter to prevent automated scraping or Denial of Service (DoS) attacks.
4. **Server-Side Edge Caching:** Client fetch requests hit micro-cached results (3-5 mins cache headers) to protect database resources.

---

## 🗺 Current Roadmap

* [x] **Phase 1:** Initialize React 19 boilerplate with Vite 8.
* [x] **Phase 2:** Complete transition to TypeScript 6 and configure structural interfaces.
* [x] **Phase 3:** Integrate Tailwind CSS v4 and compile UI layout components (Tables, Search, Pagination).
* [x] **Phase 4:** Establish an automated linting configuration combining ESLint 10 Flat Config and Prettier.
* [ ] **Phase 5 (Next):** Implement the Generic State Fetching client connecting to the live Symfony Core Endpoints.
* [ ] **Phase 6:** Integrate local client-side states using custom React hooks to process **Live Searching, Categorization, and Pagination data**.
