# Smart Recipes — Frontend

A **Next.js** frontend for Smart Recipes: manage your pantry, generate AI recipes from ingredients, and save your favorites. Built as a portfolio project to showcase modern React patterns, auth flows, and a clear feature-based architecture.

---

## Tech Stack

| Layer | Choice |
|-------|--------|
| **Framework** | Next.js 16 (App Router), React 19 |
| **Language** | TypeScript 5 |
| **Styling** | Tailwind CSS 4, class-variance-authority (cva), tailwind-merge |
| **UI** | Radix UI primitives, shadcn-style components (Button, Card, Dialog, Table, Field, etc.) |
| **State** | Zustand (auth, pantry, recipes) |
| **Forms** | react-hook-form, Zod (validation), @hookform/resolvers |
| **HTTP** | Axios (withCredentials for cookies), centralized interceptors |
| **Feedback** | Sonner (toasts), loading states |
| **Icons** | Lucide React |

---

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── (auth)/             # Auth route group: signin, signup
│   ├── (protected)/        # Authenticated routes: dashboard, pantry, generate, saved
│   ├── layout.tsx         # Root layout: AuthInitializer, ThemeProvider, Header, Toaster
│   ├── error.tsx, loading.tsx, not-found.tsx
│   └── page.tsx           # Landing
├── features/               # Feature-based modules
│   ├── auth/               # Auth state, signin/signup, AuthInitializer, authAxios
│   ├── dashboard/         # Dashboard layout, profile, saved recipes & pantry widgets
│   ├── pantry/            # Pantry CRUD, store, AddPantryItemDialog
│   ├── recipes/           # Generate, save, list, delete; recipes store & API
│   └── ingredients/       # Shared types (used by pantry/recipes)
├── shared/
│   ├── components/        # Layout (Header), navigation, LoadingSpinner, providers
│   ├── ui/                # Design system: Button, Card, Dialog, Field, Table, etc.
│   ├── lib/                # axios, env, utils, auth (AuthManager, JWT utils), server-error-toast
│   └── routing/           # Central route config (ROUTES, PROTECTED_PATH_PREFIXES, etc.)
└── proxy.ts                # Optional proxy logic for auth redirects (used by host if needed)
```

- **App Router**: Route groups `(auth)` and `(protected)` keep auth vs app layouts separate; `[slug]` for saved recipe detail.
- **Features**: Each feature owns its **components**, **api**, **stores**, and **types**; auth also exposes a public barrel (`features/auth`) and **authAxios** for authenticated requests.
- **Shared**: Reusable UI primitives, layout, and cross-cutting lib (env, axios, auth helpers, error toasts).

---

## Strengths (Portfolio Highlights)

### Authentication & Session

- **JWT access + HTTP-only refresh cookie**: Access token in memory (Zustand); refresh token sent only to the API (cross-origin safe).
- **AuthManager**: Single place for refresh logic—`init()` on load, proactive refresh before expiry, and versioned in-flight requests to avoid race conditions on logout.
- **AuthInitializer**: Wraps the app, restores session via refresh on mount, and gates rendering until auth state is ready.
- **Protected layout**: Client-side guard that redirects to signin when there is no access token after init (works even when the refresh cookie isn’t visible to the server, e.g. different subdomain).
- **authAxios**: Interceptor attaches Bearer token; on 401, calls AuthManager to refresh and retries the request once.

### Architecture & Data Flow

- **Typed route config** (`shared/routing/routes.ts`): Single source of truth for paths, labels, and protected vs auth routes; derived lists for navigation and proxy logic.
- **Feature-scoped API layer**: Each feature has an `api` module (e.g. `recipes.api.ts`, `pantry.api.ts`) that uses `authAxios`; server errors handled in one place via interceptors and `showServerErrorToast`.
- **Zustand stores**: Minimal, feature-specific stores (auth, pantry, recipes) for server state and UI state (e.g. generated recipe, selection). No global Redux; co-located with features.

### Forms & Validation

- **Consistent form pattern**: react-hook-form + Zod schemas + `Field`/`FieldLabel`/`FieldError` from shared UI; accessible (`htmlFor`, `id`, `aria-invalid`).
- **Reusable dialogs**: Add Pantry Item and Confirm Delete Recipe use the same Dialog pattern; optional “stay on page” behavior so adding from the generate page doesn’t navigate away.

### UX & Accessibility

- **Responsive layout**: Breakpoints used for padding and grid (e.g. saved recipe page, generate page); mobile-friendly navigation (sheet menu).
- **Loading and errors**: Loading spinners where needed; error boundaries and `not-found` for failed/404 recipe loads; toasts for API errors.
- **Semantic HTML**: `<main>`, `<section>`, `<header>`, `<nav>`; icon-only buttons use `aria-label`; form labels and errors wired for screen readers.

### UI & Design System

- **Shared component library**: Buttons, cards, dialogs, tables, fields, checkboxes, etc., built on Radix and Tailwind with a consistent API.
- **Theme**: next-themes for light/dark with a single ThemeProvider in the root layout.

---

## Getting Started

**Requirements:** Node ≥ 24.

1. **Install**
   ```bash
   npm install
   ```

2. **Environment**
   - Create `.env.local` and set the API base URL:
     ```env
     NEXT_PUBLIC_API_URL=http://localhost:3333
     ```
   - Point this at your [Smart Recipes backend](https://github.com/your-org/ai-recipes) (or deployed API).

3. **Run**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000). Use signup/signin to access dashboard, pantry, generate, and saved recipes.

4. **Build**
   ```bash
   npm run build
   npm start
   ```

---

## Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm start` | Run production server |
| `npm run lint` | Run ESLint |

---

## Backend

This app expects the **Smart Recipes API** (NestJS) for auth (signup, signin, refresh), users, pantry, and recipes (generate, save, list, delete). See the backend repo for API docs and deployment.
