# Werkly — frontend foundation

A local service marketplace demo for the configured launch region. Built with React 19, TypeScript strict mode, TanStack Start and its file-based router, TanStack Query, Tailwind CSS 4, Motion, React Hook Form and Zod.

## Local development

```sh
npm ci
npm run dev
```

Open http://localhost:3000. Use a current Node.js version supported by the installed Vite/TanStack packages (Node 22.12+; developed with Node 25).

```sh
npm run typecheck
npm run lint
npm test
npm run build
```

TanStack Start generates `src/routeTree.gen.ts` during dev/build. Run the build before typechecking a fresh checkout if the generated file is absent. The lockfile pins the installed dependency graph. Vite configuration follows [TanStack Start's setup](https://tanstack.com/start/latest/docs/framework/react/build-from-scratch).

## Routes

| Route | Experience |
| --- | --- |
| `/` | Homepage: categories, four-step explanation, benefits, regional context, business onboarding and accessible FAQ |
| `/auftrag-erstellen?category=painting` | Four-step validated request wizard; category preselection; local attachment previews; review and mock creation |
| `/dashboard` | Customer requests, offer comparison, public business profiles, acceptance and completion |
| `/betrieb/dashboard` | Protected business workspace, open requests, offers and accepted jobs |
| `/login` | Shared sign-in for the two public demo accounts |
| `/register` | Customer registration for a temporary demo profile |
| `/register/business` | Business registration with service categories and region |
| `/impressum` | Clearly marked incomplete legal placeholder |
| `/datenschutz` | Clearly marked incomplete privacy disclosure |

## Architecture

- `src/routes`: thin file-based route definitions and Start document shell.
- `src/components/ui` and `layout`: shared primitives, responsive navigation and footer.
- `src/features`: homepage, requests, offers, business area and demo identity components.
- `src/types/domain.ts`: domain models, statuses and public/private DTOs with string IDs.
- `src/config`: navigation and active service regions. Region names are not embedded in presentation components. Only configured postal codes are supported; there is no invented service radius.
- `src/services/repositories/interfaces.ts`: request, offer, business and auth contracts.
- `src/services/repositories/index.ts`: the single adapter selection point.
- `src/services/repositories/mock.ts`: isolated in-memory store factory and mock authorization checks.
- `src/data/mock`: fictional seed records, imported only by the mock adapter.
- `src/hooks/use-marketplace.ts`: TanStack Query queries and mutation invalidation.
- `src/services/api/client.ts`: future HTTP transport interface; no speculative endpoints.
- `src/styles/app.css`: palette, type, spacing, responsive UI, focus and reduced-motion styles.

## Demo data and authorization

The sign-in page supplies the public customer and business demo credentials. Use those accounts to switch between both sides of an order in the same tab. Registration creates a separate temporary identity and signs it in immediately. Registration passwords are discarded after validation, so registered profiles cannot sign back in. Use fictional values only. The session is held in memory and resets on reload. Logout clears the identity and query cache while keeping mock marketplace changes in the current tab.

The frontend guards control demo navigation. Real authentication, business verification and password recovery require the backend. The old `/anmelden`, `/registrieren` and `/betrieb` URLs redirect to the new routes.

Data lives in the JavaScript module's in-memory store. Client-side route navigation preserves mutations; a full reload resets them. There is no database, browser persistence, email, SMS, notification delivery, payment or subscription integration. The frontend demo must not be used with real personal data.

Business list responses are explicitly constructed `ServiceRequestPreviewDto` objects, excluding customer identity, phone, email and exact address. Customer responses are scoped to the active customer. Offer responses include public business identity. Accepted customer contact is available only through a separate repository operation that verifies the winning business. The customer can obtain accepted business contact through a separate operation as well. Query data is cleared when switching roles.

Acceptance verifies ownership, request and offer state. It synchronously changes the request to `ASSIGNED`, accepts the selected offer and rejects competing submitted offers, with no await between checks and mutation. Further acceptance fails. All affected TanStack Query caches are invalidated after mutations. This simulates consistency within one demo store; it is not a server transaction.

Attachments support up to four JPEG/PNG/WebP files, five megabytes each. File objects stay local to the wizard. Object URLs are revoked on removal, submission and unmount. Only file metadata is retained in the mock request; no upload or persistent image storage is claimed. Public descriptions must not contain private data. Server-side attachment scanning, metadata stripping and moderation are still required before launch.

## Replacing mocks with Spring Boot

1. Implement the four repository interfaces with HTTP adapters using an agreed Spring Boot API contract and the `HttpClient` boundary. Select them centrally in `repositories/index.ts`; presentation components and query hooks keep the same repository-facing contracts.
2. Replace demo identity with backend-managed sessions, load the authenticated session at the auth boundary, and derive role and identity on the server.
3. Enforce all ownership and contact authorization on the backend. Use public response projections so private fields never enter unauthorized responses.
4. Implement offer acceptance atomically in PostgreSQL with a transaction, row locking or optimistic concurrency, and a unique accepted-offer constraint. Recheck request and offer state in that transaction.
5. Add persistent requests, validated uploads, authorized attachment access and backend validation. Do not trust browser validation or identity claims.
6. Map backend errors to user-facing Austrian German and invalidate the same query keys after successful writes.

No operational backend endpoint, authentication mechanism or deployment target is invented in this phase.

## Verification and remaining production work

The test suite covers schema rules, attachment limits, request creation, public offer comparison, owner authorization, contact privacy, offer acceptance, competing rejection, concurrent/double acceptance, detached repository snapshots and completion.

Before public launch: implement and audit the backend/authentication, persist data, scan and sanitize attachments, complete and legally review company/privacy disclosures, configure real contact/support details, define actual launch terms, and perform browser/device and assistive-technology QA.

The approved navy/yellow redesign is documented in `docs/visual-redesign.md`. Photography and the generated tradesperson are local optimized assets; see `/bildnachweise` and `public/assets/LICENSE.md`. Fonts use Google Fonts (DM Sans and Manrope), which receives normal browser resource requests. For production, assess privacy requirements and consider self-hosting fonts. No testimonials, ratings, verification badges or activity statistics are fabricated.

