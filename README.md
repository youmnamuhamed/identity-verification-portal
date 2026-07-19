# Identity Verification Portal

A responsive identity verification interface built to simulate the client onboarding workflow for **Infinity X Solutions**' Enterprise AI Platform. The application allows administrators to submit verification requests through a validated form and track their status via a dedicated dashboard, backed by a fully mocked API layer that mirrors a real backend contract.

---

## Overview

This project demonstrates a production-oriented frontend architecture: strict TypeScript typing, a centralized API layer, schema-driven form validation, and a clear separation between UI, server state, and mock data — all without requiring a live backend service.

---

## Features

**Verification Submission**

- Form fields: first name, last name, email, document type
- Client-side validation via React Hook Form and Zod (required fields, email format)
- Loading state during submission
- Redirects to the dashboard on successful submission

**Verification Dashboard**

- Lists all submitted verifications with status badges (Pending, Approved, Rejected)
- Responsive table layout
- Skeleton loading state while data is fetched
- Empty state when no records exist

**Verification Detail**

- Full record view for a single verification
- Skeleton loading state
- Error state with retry, shown when a record fails to load or doesn't exist

**General**

- Responsive layout, tested at mobile, tablet, and desktop widths
- Accessible form controls with visible focus states
- Consistent loading, empty, and error handling throughout

---

## Tech Stack

| Technology                | Purpose                             |
| ------------------------- | ----------------------------------- |
| Next.js 16 (App Router)   | Application framework               |
| TypeScript                | Type safety                         |
| Tailwind CSS v4           | Styling                             |
| React Hook Form           | Form state management               |
| Zod                       | Schema validation                   |
| TanStack Query            | Server state management and caching |
| Axios                     | HTTP client                         |
| MSW (Mock Service Worker) | Mock API layer                      |

---

## Getting Started

**Prerequisites:** Node.js 20+, npm

```bash
npm install
npx msw init public/ --save   # generates the mock service worker (first-time setup only)
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The application runs entirely against a mocked backend — no live API server is required.

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Create production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

---

## Mock API

The project uses **Mock Service Worker (MSW)** to intercept requests in development and serve them from an in-memory mock database (`src/mocks/db.ts`), seeded with sample verification records. A simulated network delay is included on every request so loading states can be observed and tested. The mock database resets on every full page refresh — this is expected behavior for an in-memory, frontend-only implementation.

### API Endpoints

| Method | Endpoint                     | Description                        |
| ------ | ---------------------------- | ---------------------------------- |
| POST   | `/api/v1/verifications`      | Create a verification request      |
| GET    | `/api/v1/verifications`      | Retrieve all verification requests |
| GET    | `/api/v1/verifications/{id}` | Retrieve a single verification     |

Full contract details are documented in `API_integration.md`.

> **Deviation from the documented contract:** the `GET /api/v1/verifications` response has been extended to include `document_type`, which is not part of the response shape specified in `API_integration.md`. This was a deliberate decision rather than an oversight — document type is essential information for a status dashboard, and the field already exists on every stored record. All other endpoints and response shapes match the contract exactly.

---

## Project Structure

```
src/
├── app/
│   ├── page.tsx                  # Submission form
│   ├── verifications/            # Dashboard
│   └── verifications/[id]/       # Verification detail
│
├── components/
│   ├── ui/                       # Reusable UI primitives
│   ├── shared/                   # Shared layout components
│   └── verification/             # Feature-specific components
│
├── hooks/                        # React Query hooks
│
├── lib/
│   ├── api/                      # Axios client and API functions
│   ├── query/                    # React Query configuration
│   └── validation/               # Zod schemas
│
├── mocks/                        # MSW handlers and mock database
│
└── types/                        # Shared TypeScript types
```

| Folder                     | Responsibility                                |
| -------------------------- | --------------------------------------------- |
| `app/`                     | Application routes                            |
| `components/ui/`           | Reusable, unopinionated UI primitives         |
| `components/shared/`       | App-level shared components (e.g. navigation) |
| `components/verification/` | Verification feature components               |
| `hooks/`                   | React Query hooks wrapping the API layer      |
| `lib/api/`                 | Axios client and typed API functions          |
| `lib/query/`               | React Query client configuration              |
| `lib/validation/`          | Zod validation schemas                        |
| `mocks/`                   | MSW request handlers and in-memory database   |
| `types/`                   | Shared TypeScript types                       |

---

## Architecture

```
UI Components → React Query Hooks → Axios API Layer → MSW → Mock Database
```

This layering keeps presentation, data-fetching, and API concerns independent, so the mock layer could be swapped for a real backend without changes to components or hooks.

---

## Design Decisions

- Feature-based component organization, separating reusable primitives from feature-specific components
- Centralized, typed API layer decoupled from UI and hooks
- Schema-driven form validation shared between the form and the API payload type
- A mocked backend that mirrors the documented API contract, with one disclosed, deliberate deviation (see [Mock API](#mock-api))
- Consistent loading, empty, and error states across every data-driven view

---

## Responsive Design

Manually tested at:

- Mobile — 375px
- Tablet — 768px
- Desktop — 1280px+

---

## Future Improvements

- Search and filtering
- Sorting and pagination
- Authentication
- Persistent backend integration
- Unit and integration tests
- Dark mode

---

## License

Developed as a frontend technical assessment for Infinity X Solutions. Intended for demonstration purposes only.
