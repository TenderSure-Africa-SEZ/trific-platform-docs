# TRIFIC Platform - Development Features & Tasks

**Version:** 1.0  
**Date:** September 22, 2025  
**Status:** Active Template

---

# Overview

This document serves as a centralized template for tracking development features and tasks for the TRIFIC Platform. Following specification-driven development (SDD) principles, this template ensures consistent documentation, clear acceptance criteria, and traceable implementation across all platform portals.


# Features

---

# Specification (per feature)

## FEAT-001 — Public Home Pages (Landing + Provider Directory)

**Summary**
Non-logged-in visitors can discover vetted service providers from the landing page: browse by category/sub-category, see basic profile info (rating, static rate cards), and access guides & company info. Value: drives qualified demand into the marketplace and shortens time to first engagement.
**Users/Personas**

* Corporate Client (prospect, not signed-in)
* Local/International Buyer (prospect, not signed-in)
* SEO/Acquisition (indirect persona; needs crawlable, fast pages)

**Goals/Benefits**

* Fast discovery of vetted providers; reduce friction before sign-in.
* SEO-friendly, performant pages to support organic acquisition.
* Clear calls-to-action to sign in / proceed to provider profile/contact.

**Non-Functional** (initial)

* Perf: First Contentful Paint < 2.0s on 3G; TTI < 3.5s (mobile).
* Security: No PII on public pages; rate-limit directory queries; safe query params.
* Observability: Page views, filter interactions, outbound CTA clicks logged.

### Acceptance Criteria (Gherkin)

CRIT-001

```
Given I am a visitor on the landing page
When I open the “Service Providers” directory
Then I can filter by category and sub-category
And I can see each provider’s rating and static rate card snippet
```

CRIT-002

```
Given I am on the directory
When I apply a filter (e.g., "Legal" → "Litigation")
Then the provider list updates within 300ms (cached or pre-fetched)
And the URL reflects filter state for shareability (query params or path)
```

CRIT-003

```
Given I am on the landing page
When I click “Guides” or “Company information”
Then I see navigable pages for FAQs, contact, privacy, and social links
```

CRIT-004

```
Given I am on a provider card
When I click “View Profile”
Then I am taken to the provider’s profile page (requires sign-in if needed)
```

CRIT-005

```
Given I am a search engine crawler
When I crawl the landing and directory pages
Then I can render meta tags (title/description), JSON-LD breadcrumbs, and canonical links
```

**Evidence**

* **From manuals/PRD:** I don’t know. \[NEEDS CLARIFICATION: Confirm the exact “Home Pages” scope and acceptance criteria text for public directory, guides, and company info in the PRD/manuals.]
* **From e2e workflows:** I don’t know. \[NEEDS CLARIFICATION: Provide or confirm e2e cases for public directory navigation and filtering (e.g., `e2e/Public/directory.yml`).]
* **SDD foundation & gates:** This spec follows your SDD approach: specifications are the source of truth that drive plans/tasks, with explicit uncertainty markers when evidence is missing  and enforced gates for simplicity/anti-abstraction/integration-first in planning .

**Definition of Done**

* All acceptance criteria have automated tests (contract/integration/e2e).
* Telemetry: page views, filter usage, CTA clicks, error paths (404/5xx) captured.
* Docs: public routing map, SEO/meta policy, and analytics dimensions updated.

---

# 2) Technical Implementation Plan (per feature)

**Architecture (high-level)**

* **Frontend (Public):**

  * Routes: `/` (landing), `/providers` (directory; optional `/providers/:category/:subcat`).
  * Components: `Hero`, `CategoryFilters`, `ProviderGrid`, `GuideLinks`, `FooterMeta`.
  * SEO: SSR or pre-render for landing/directory; JSON-LD + canonical tags; clean URLs.
* **Backend (Read-only for public):**

  * REST endpoints:

    * `GET /api/public/categories`
    * `GET /api/public/providers?category=&subcat=&page=&sort=` (rate-limited, cached)
  * Caching: edge/CDN + server cache (e.g., 60–300s) for directory queries.
  * Data exposure: only non-PII public fields (name, rating, tags, rate-card range, city).
* **Observability:**

  * Events: `page_view`, `filter_applied`, `provider_card_clicked`, `cta_login_clicked`.
  * Logs with correlation IDs; dashboards for funnel and filter performance.
* **Security/Abuse:**

  * Input validation on filters; IP rate-limit; minimal error surface on public APIs.

**Decisions (with SDD gate checks)**

* Use the framework’s built-in routing/SSR instead of custom wrappers → passes **Anti-Abstraction Gate / Article VIII** (“use framework directly”) .
* Start with ≤3 projects (frontend app, backend API, infra) to avoid over-segmentation → passes **Simplicity Gate / Article VII** (≤3 projects; no future-proofing) .
* Define API contracts first and write contract/integration tests before UI wiring → passes **Integration-First / Article IX** (contract tests mandatory; real services preferred) .
* Maintain high-level plan; push verbose details into `implementation-details/` to keep readability, per SDD template guidance .

**Contracts (sketch)**

* `GET /api/public/categories` → `200 OK: { categories: [{ id, name, subcats: [{ id, name }] }] }`
* `GET /api/public/providers`

  * **Request**: `category` (string), `subcat` (string), `sort`(“rating|price|recent”), `page`(int)
  * **Response**:

    ```
    200 OK: {
      items: [{ id, displayName, rating, rateCardMin, rateCardMax, categories:[{id,name}], city }],
      page: 1, pageSize: 20, total: 134
    }
    ```
  * **Errors**: `400` invalid params, `429` rate-limit, `5xx` server.

**Data Model (public projection)**

* **ProviderPublic**: `id`, `displayName`, `categories[]`, `rating`(avg), `rateCardMin/Max`, `city`, `isVetted`(bool).
* **Category**: `id`, `name`; **SubCategory**: `id`, `name`, `parentCategoryId`.

**Testing Strategy** (order required by SDD)

1. **Contract tests** for both endpoints; 2) **Integration** (real DB, seed data); 3) **e2e** (landing→directory→filter→profile CTA); 4) **Unit** (pure UI utils). This follows the test-first and ordering guidance (contracts → integration → e2e → unit) .

**Risks & Mitigations**

* **Risk:** PRD/manual ambiguity about public field exposure.

  * **Mitigation:** Ship with a conservative read model (no emails/phones) + redaction layer; mark gaps as clarifications.
* **Risk:** SEO/perf regressions with client-side only rendering.

  * **Mitigation:** SSR/pre-render static paths; Core Web Vitals CI check.
* **Risk:** Abuse (scraping, heavy queries).

  * **Mitigation:** IP rate-limit, pagination caps, basic WAF rules.

---

# 3) Executable Tasks (per feature)

> **Derivation rule:** Tasks are generated from plan → contracts → entities → scenarios, per SDD `/tasks` guidance (inputs/outputs, parallelization) .

| ID       | Title                                                                       | Owner/Skill            | Time   | Deps         | Artifacts                                                | \[P/S] | Traceability                    |
| -------- | --------------------------------------------------------------------------- | ---------------------- | ------ | ------------ | -------------------------------------------------------- | ------ | ------------------------------- |
| TASK-001 | Define public API contracts for categories & providers                      | Backend (Django/DRF)   | S      | —            | `contracts/public.yml`                                   | \[P]   | FEAT-001 → CRIT-001/002         |
| TASK-002 | Write contract tests for `/api/public/categories` & `/api/public/providers` | Backend (QA/BE)        | S      | TASK-001     | `tests/contracts/test_public_api.py`                     | \[S]   | FEAT-001 → CRIT-001/002         |
| TASK-003 | Implement endpoints with read-models (no PII) + pagination & sorting        | Backend (Django/DRF)   | M      | TASK-002     | `apps/public/views.py`, `serializers.py`                 | \[S]   | FEAT-001 → CRIT-001/002         |
| TASK-004 | Add server caching + rate-limiting + input validation                       | Backend                | S      | TASK-003     | `middleware/rate_limit.py`                               | \[S]   | FEAT-001 → CRIT-002             |
| TASK-005 | Integration tests with seeded data (real DB)                                | Backend QA             | S      | TASK-003     | `tests/integration/test_public_api.py`                   | \[S]   | FEAT-001 → CRIT-001/002         |
| TASK-006 | Public routes & SSR/pre-render for `/` and `/providers`                     | Frontend (Vue)         | M      | —            | `src/pages/index.vue`, `src/pages/providers.vue`         | \[P]   | FEAT-001 → CRIT-003/005         |
| TASK-007 | Directory UI: filters, provider grid, empty states                          | Frontend (Vue/TS)      | M      | TASK-006     | `src/components/CategoryFilters.vue`, `ProviderCard.vue` | \[S]   | FEAT-001 → CRIT-001/002         |
| TASK-008 | URL state sync (query params) + back/forward behavior                       | Frontend               | S      | TASK-007     | `src/composables/useDirectoryState.ts`                   | \[S]   | FEAT-001 → CRIT-002             |
| TASK-009 | SEO: meta tags, canonical, JSON-LD, sitemap entry                           | Frontend               | S      | TASK-006     | `src/seo/*`, `public/sitemap.xml`                        | \[S]   | FEAT-001 → CRIT-005             |
| TASK-010 | Guides & company info pages (FAQs, contact, privacy)                        | Frontend (CMS/Content) | S      | TASK-006     | `src/pages/guides.vue`, `src/pages/privacy.vue`          | \[S]   | FEAT-001 → CRIT-003             |
| TASK-011 | e2e tests: landing→directory→filter→profile CTA                             | QA (e2e)               | S      | TASK-006–010 | `e2e/public_directory.spec.ts`                           | \[S]   | FEAT-001 → CRIT-001/002/003/004 |
| TASK-012 | Telemetry: page/filter/click events + dashboards                            | FE/BE (Analytics)      | S      | TASK-006–011 | `analytics/events.md`, dashboards                        | \[S]   | FEAT-001 (DoD)                  |
| TASK-013 | Error paths: 404/5xx UX + logging                                           | FE/BE                  | S      | TASK-006–007 | `src/pages/404.vue`, log config                          | \[S]   | FEAT-001 (DoD)                  |
| TASK-014 | Doc update: routing map, SEO policy, observability                          | Docs                   | XS     | TASK-009/012 | `docs/public-portal.md`                                  | \[S]   | FEAT-001 (DoD)                  |

**Parallel Lanes**

* **Lane A (Backend):** TASK-001 → 002 → 003 → 004 → 005
* **Lane B (Frontend):** TASK-006 → 007 → 008 → 009/010 → 011
* **Lane C (Cross-cut):** TASK-012 → 013 → 014

---

## Clarifications Backlog (for this feature)

* \[NEEDS CLARIFICATION] Exact public fields allowed on provider cards (e.g., city? tags? rate card min/max?).
* \[NEEDS CLARIFICATION] Is provider profile page partially public or fully gated behind sign-in?
* \[NEEDS CLARIFICATION] Confirm copy and structure for “Guides” and “Company information” (links & policies).
* \[NEEDS CLARIFICATION] Provide canonical e2e spec file(s) for public discovery (directory navigation & filter flow).
* \[NEEDS CLARIFICATION] Confirm SEO requirements (localized metas? hreflang? indexing rules).


---

# Specification (per feature)

## FEAT-003 — Service Provider Onboarding & Vetting

**Summary**
Local and international service providers can register, submit KYV/KYB documents, complete onboarding questionnaires, and undergo TenderSure’s vetting and scoring. Only approved providers appear in the client directory and can receive direct engagements.

**Users/Personas**

* **Local Service Provider (e.g., Kenyan law firm)** — wants visibility and credibility to attract clients.
* **Admin/Vetting Officer (TenderSure)** — ensures only qualified providers pass vetting.
* **Clients** (indirect) — benefit from seeing only vetted providers.

**Goals/Benefits**

* Streamlined provider onboarding process.
* Assurance of quality through vetting and scoring.
* Transparency and compliance through quarterly re-evaluations.

**Non-Functional**

* Perf: upload documents ≤ 5MB, processed within 5s.
* Security: KYV/KYB stored encrypted (at rest + transit); audit logs for submissions and approvals.
* Observability: metrics on approval rates, rejection reasons, and re-evaluation triggers.

### Acceptance Criteria (Gherkin)

CRIT-020 (Provider Registration)

```
Given I am a new provider
When I sign up and fill the onboarding questionnaire
Then my profile is saved in “Pending Vetting” status
```

CRIT-021 (Document Upload & Verification)

```
Given I have registered as a provider
When I upload KYV/KYB documents
Then the system securely stores them
And marks my profile as “Awaiting Review”
```

CRIT-022 (Admin Vetting & Scoring)

```
Given I am an Admin reviewing a provider
When I evaluate questionnaire responses and documents
Then I can apply scoring criteria
And approve/reject the provider with rationale
```

CRIT-023 (Directory Visibility)

```
Given a provider is approved
When a client searches the directory
Then the provider appears with profile and rate card
```

CRIT-024 (Re-evaluations & Blacklisting)

```
Given a provider is due for quarterly re-evaluation
When the due date arrives
Then the system flags the provider
And Admin can re-score or blacklist if underperforming
```

**Evidence**

* **PRD – Service Provider Portal:** onboarding (sign up, questionnaire, KYV/KYB upload, vetting with scoring, vetting fee), visibility after approval, job invitations, acceptance criteria requiring KYV/KYB before approval and visibility only after scoring .
* **PRD – Admin Portal:** vetting workflow, scoring setup, approve/reject, quarterly re-evaluation, blacklisting underperformers; acceptance criteria specify auto-flagging and suspension triggers .
* **Backend breakdown:** tasks include registration, KYC upload, verification status indicator, approve/reject KYC docs, evaluation criteria setup, KYC compliance tracking .
* **Frontend breakdown:** tasks include registration form, KYC document upload, verification status UI, approve/reject KYC docs, evaluation criteria setup .

**Unknowns**

* I don’t know. **\[NEEDS CLARIFICATION]**: Exact vetting criteria and scoring thresholds (what weights, what pass mark?).
* I don’t know. **\[NEEDS CLARIFICATION]**: File types accepted for KYV/KYB (PDF only? JPEG/PNG?).
* I don’t know. **\[NEEDS CLARIFICATION]**: Vetting fee amount and payment workflow (paid upfront, integrated with escrow?).
* I don’t know. **\[NEEDS CLARIFICATION]**: How re-evaluation reminders are triggered (cron job, notification, both?).

**Definition of Done**

* All acceptance criteria tested (registration → vetting → approval → directory visibility → re-evaluation).
* Telemetry for onboarding funnel (drop-off, approval rates).
* Documentation updated (vetting workflow, scoring rules, re-evaluation policies).

---

# 2) Technical Implementation Plan

**Architecture (high-level)**

* **Frontend (Provider portal)**

  * Routes: `/register-provider`, `/onboarding`, `/dashboard`
  * Forms: Questionnaire, Document upload (with status indicators), Profile editor.
  * Admin UI: Review queue, scoring inputs, approve/reject actions.

* **Backend (Django/DRF)**

  * Endpoints:

    * `POST /api/providers/register` → new provider entry, pending vetting.
    * `POST /api/providers/{id}/documents` → KYV/KYB upload.
    * `GET /api/admin/providers/pending` → list for review.
    * `POST /api/admin/providers/{id}/vetting` → scoring + approve/reject.
    * `POST /api/admin/providers/{id}/blacklist` → mark as blacklisted.
    * Auto-job: check quarterly re-evaluations; flag overdue.

* **Data model**

  * **Provider**: id, status \[Pending, Awaiting Review, Approved, Rejected, Blacklisted], score, vettedAt, nextReviewAt.
  * **ProviderDocs**: providerId, type, url, status, uploadedAt.
  * **EvaluationCriteria**: id, name, weight, threshold.

**Decisions (with SDD gate checks)**

* Use DRF serializers/views directly for registration and vetting → **Anti-Abstraction Gate PASS**.
* Limit projects ≤3 for MVP → **Simplicity Gate PASS**.
* Define contracts and write tests first (contract → integration → e2e → unit) → **Integration-First Gate PASS**.
* Encrypt KYV/KYB docs in S3 with signed URLs; access restricted to Admins → compliance with GDPR/data privacy.

**Testing Strategy**

1. Contract tests: registration, document upload, vetting, re-evaluation.
2. Integration: real DB, S3 storage, scoring rules applied.
3. e2e: provider registers → uploads docs → admin reviews → provider visible.
4. Unit: questionnaire validation, scoring calculation, re-evaluation scheduler.

**Risks & Mitigations**

* **Risk:** Ambiguity in vetting criteria. → Mitigation: Document criteria in config, flag as NEEDS CLARIFICATION.
* **Risk:** Document fraud or tampering. → Mitigation: integrate basic OCR/metadata validation, manual admin review.
* **Risk:** High drop-off at doc upload. → Mitigation: progress indicators, save drafts.
* **Risk:** Delays in quarterly re-evaluations. → Mitigation: automatic reminders, dashboard alerts.

---

# 3) Executable Tasks

| ID       | Title                                                                       | Owner | Time   | Deps             | Artifacts                                                             | \[P/S] | Traceability  |
| -------- | --------------------------------------------------------------------------- | ----- | ------ | ---------------- | --------------------------------------------------------------------- | ------ | ------------- |
| TASK-040 | Define contracts for registration, doc upload, vetting, re-evaluation       | BE    | S      | —                | `contracts/provider-onboarding.yml`                                   | \[P]   | CRIT-020..024 |
| TASK-041 | Write contract tests for all endpoints                                      | QA/BE | S      | T040             | `tests/contracts/test_provider_onboarding.py`                         | \[S]   | CRIT-020..024 |
| TASK-042 | Implement `POST /providers/register` & questionnaire model                  | BE    | M      | T041             | `apps/providers/views.py`                                             | \[S]   | CRIT-020      |
| TASK-043 | Implement `POST /providers/{id}/documents` with S3 upload + encryption      | BE    | M      | T041             | `apps/providers/docs.py`                                              | \[S]   | CRIT-021      |
| TASK-044 | Admin UI: pending providers list + scoring form                             | FE    | M      | —                | `src/pages/admin/vetting.vue`                                         | \[P]   | CRIT-022      |
| TASK-045 | Implement `POST /admin/providers/{id}/vetting` scoring + approve/reject     | BE    | M      | T041             | `apps/admin/vetting.py`                                               | \[S]   | CRIT-022      |
| TASK-046 | Directory visibility logic (Approved only)                                  | BE    | S      | T045             | `apps/providers/search.py`                                            | \[S]   | CRIT-023      |
| TASK-047 | FE: provider onboarding forms (register, questionnaire, doc upload, status) | FE    | M      | —                | `src/pages/register-provider.vue`, `src/components/VettingStatus.vue` | \[P]   | CRIT-020,021  |
| TASK-048 | FE: verification status indicator (pending, rejected, resubmit option)      | FE    | S      | T047             | `src/components/VerificationBadge.vue`                                | \[S]   | CRIT-021      |
| TASK-049 | Auto-job: re-evaluation flagging (quarterly)                                | BE    | S      | T045             | `jobs/re-evaluation.py`                                               | \[S]   | CRIT-024      |
| TASK-050 | Admin blacklist action                                                      | BE    | S      | T045             | `apps/admin/blacklist.py`                                             | \[S]   | CRIT-024      |
| TASK-051 | Integration tests: end-to-end vetting + directory visibility                | QA    | M      | T042–T050        | `tests/integration/test_vetting.py`                                   | \[S]   | CRIT-020..024 |
| TASK-052 | e2e: provider registers → uploads docs → admin vets → directory visible     | QA    | M      | T047, T044, T051 | `e2e/provider_onboarding.spec.ts`                                     | \[S]   | CRIT-020..024 |
| TASK-053 | Telemetry: onboarding funnel, approval rates, re-eval triggers              | BE/FE | S      | T042–T052        | `analytics/provider-onboarding.md`                                    | \[S]   | DoD           |
| TASK-054 | Docs: vetting workflow, scoring, re-evaluation policy                       | Docs  | XS     | T040–T053        | `docs/provider-vetting.md`                                            | \[S]   | DoD           |

**Parallel Lanes**

* **Lane A (Backend)**: T040 → T041 → (T042,043,045,046,049,050) → T051
* **Lane B (Frontend)**: (T047,048,044) → T052
* **Lane C (Analytics/Docs)**: T053 → T054

---

## Clarifications Backlog

1. \[NEEDS CLARIFICATION] Vetting criteria & scoring thresholds (weights, pass mark).
2. \[NEEDS CLARIFICATION] Allowed KYV/KYB document formats (PDF, JPEG, PNG?).
3. \[NEEDS CLARIFICATION] Vetting fee integration: payment method, amount, timing.
4. \[NEEDS CLARIFICATION] Quarterly re-evaluation reminders: cron job, notifications, or manual triggers?

---

# Specification (per feature)

## FEAT-004 — Admin Vetting & Compliance Portal

**Summary**
Platform administrators (TenderSure officers) manage provider vetting, apply evaluation scoring, enforce quarterly re-evaluations, and blacklist underperformers to maintain trust and compliance in the marketplace.

**Users/Personas**

* **Admin (TenderSure Vetting Officer)** — primary user, manages vetting workflow.
* **Management (Oversight)** — monitors compliance and escalations.
* **Providers (indirect)** — impacted by approvals/rejections/blacklisting.

**Goals/Benefits**

* Ensure only high-quality, vetted providers are visible.
* Prevent reputational risk to clients.
* Automate compliance tasks (re-evaluations, anomaly detection).

**Non-Functional**

* Perf: vetting list loads in < 2s for up to 500 providers.
* Security: admin access requires MFA; all actions logged with rationale.
* Observability: dashboards for approval/rejection rates, blacklisting trends.

### Acceptance Criteria (Gherkin)

CRIT-030 (Provider Review Workflow)

```
Given I am an Admin
When I open the vetting dashboard
Then I see pending providers with submitted documents and questionnaire
And I can review them in detail
```

CRIT-031 (Scoring & Decision)

```
Given I am reviewing a provider
When I apply evaluation scoring
Then I can approve or reject the provider
And my decision rationale is recorded
```

CRIT-032 (Re-evaluation Enforcement)

```
Given a provider’s quarterly review date arrives
When I log into the admin portal
Then the provider is flagged as "Due for Re-evaluation"
```

CRIT-033 (Blacklisting & Suspension)

```
Given a provider underperforms or anomalies are detected
When I select "Blacklist"
Then the provider is hidden from the directory
And a suspension record is created
```

CRIT-034 (Audit & Compliance Logs)

```
Given I am a Management user
When I review compliance logs
Then I see all admin vetting actions with timestamp, rationale, and actor
```

**Evidence**

* **PRD – Admin Portal:** vetting workflow, scoring criteria, approve/reject, directory management, audit & compliance with quarterly re-evaluations, blacklisting, anomalies trigger suspension; acceptance criteria specify automatic flags for re-evaluation and suspension triggers.
* **Backend breakdown:** tasks for approve/reject KYC docs, create/improve evaluation criteria, view/manage users, suspend/ban accounts, monitor contracts/disputes, incident/dispute reports, KYC compliance tracking.
* **Frontend breakdown:** admin UI tasks include approve/reject KYC docs, evaluation criteria management, suspend/ban accounts, monitor jobs, disputes, fraud monitoring.
* **Project Plan:** Admin portal is a core deliverable in build phase, week 3 (16–29 Sept).

**Unknowns**

* I don’t know. **\[NEEDS CLARIFICATION]**: Specific scoring rubric (weights, criteria names).
* I don’t know. **\[NEEDS CLARIFICATION]**: Policy for anomalies triggering automatic suspension (what constitutes anomaly?).
* I don’t know. **\[NEEDS CLARIFICATION]**: Exact retention period for compliance logs.

**Definition of Done**

* Admin dashboard supports full vetting, scoring, approvals, blacklisting, and compliance logging.
* All CRIT scenarios tested.
* Telemetry and reporting for vetting KPIs.
* Docs updated with admin workflows, scoring rules, compliance policies.

---

# 2) Technical Implementation Plan

**Architecture (high-level)**

* **Frontend (Admin portal)**

  * Routes: `/admin/dashboard`, `/admin/providers/:id`, `/admin/logs`.
  * Components: Pending list, scoring form, blacklist button, compliance log viewer.
* **Backend (Django/DRF)**

  * Endpoints:

    * `GET /api/admin/providers/pending`
    * `POST /api/admin/providers/{id}/decision` (approve/reject + rationale)
    * `POST /api/admin/providers/{id}/blacklist`
    * `GET /api/admin/logs`
  * Jobs: quarterly re-evaluation flagging; anomaly detection triggers.
  * Logs: all admin actions saved in immutable audit table.

**Data Model**

* **Provider**: id, status \[Pending, Approved, Rejected, Blacklisted], score, rationale, nextReviewAt.
* **AuditLog**: id, actorId, action, targetId, rationale, timestamp.
* **EvaluationCriteria**: configurable set of scoring rules.

**Decisions (with gate checks)**

* Use DRF viewsets for vetting endpoints → **Anti-Abstraction Gate PASS**.
* ≤3 projects rule observed (frontend, backend, infra) → **Simplicity Gate PASS**.
* Contracts first, then contract → integration → e2e → unit tests → **Integration-First Gate PASS**.
* Compliance logs persisted in DB, accessible only by Admin/Management with MFA.

**Testing Strategy**

1. Contract: vetting, scoring, blacklisting, logs.
2. Integration: DB + audit log.
3. e2e: admin reviews → approves/rejects → compliance logs visible.
4. Unit: scoring calculation, re-evaluation scheduler.

**Risks & Mitigations**

* **Risk:** Lack of clarity in scoring rules. → Mitigation: placeholder criteria config; clarify policy.
* **Risk:** Compliance logs tampering. → Mitigation: append-only audit table, restricted access.
* **Risk:** Admin workload overload. → Mitigation: filters, bulk actions, search in dashboard.

---

# 3) Executable Tasks

| ID       | Title                                                                     | Owner | Time   | Deps      | Artifacts                                  | \[P/S] | Traceability  |
| -------- | ------------------------------------------------------------------------- | ----- | ------ | --------- | ------------------------------------------ | ------ | ------------- |
| TASK-060 | Define vetting/decision/blacklist API contracts                           | BE    | S      | —         | `contracts/admin-vetting.yml`              | \[P]   | CRIT-030..034 |
| TASK-061 | Write contract tests for vetting endpoints                                | QA/BE | S      | T060      | `tests/contracts/test_admin_vetting.py`    | \[S]   | CRIT-030..034 |
| TASK-062 | Implement `GET /admin/providers/pending` + review detail                  | BE    | M      | T061      | `apps/admin/providers.py`                  | \[S]   | CRIT-030      |
| TASK-063 | Implement `POST /admin/providers/{id}/decision` (scoring, approve/reject) | BE    | M      | T061      | `apps/admin/vetting.py`                    | \[S]   | CRIT-031      |
| TASK-064 | FE: Admin dashboard with pending list + review forms                      | FE    | M      | —         | `src/pages/admin/dashboard.vue`            | \[P]   | CRIT-030,031  |
| TASK-065 | Implement `POST /admin/providers/{id}/blacklist` + status update          | BE    | S      | T063      | `apps/admin/blacklist.py`                  | \[S]   | CRIT-033      |
| TASK-066 | FE: Blacklist button + status indicators                                  | FE    | S      | T064      | `src/components/admin/BlacklistButton.vue` | \[S]   | CRIT-033      |
| TASK-067 | Auto-job: quarterly re-evaluation flagging                                | BE    | S      | T062      | `jobs/re-evaluation.py`                    | \[S]   | CRIT-032      |
| TASK-068 | Implement immutable AuditLog model + `GET /admin/logs`                    | BE    | M      | T061      | `apps/admin/logs.py`                       | \[S]   | CRIT-034      |
| TASK-069 | FE: Compliance logs UI (searchable, filterable)                           | FE    | S      | T068      | `src/pages/admin/logs.vue`                 | \[S]   | CRIT-034      |
| TASK-070 | Integration tests for vetting decisions, blacklisting, logs               | QA    | M      | T062–T069 | `tests/integration/test_admin_vetting.py`  | \[S]   | CRIT-030..034 |
| TASK-071 | e2e: admin reviews → approves → blacklists → logs visible                 | QA    | M      | T064–T069 | `e2e/admin_vetting.spec.ts`                | \[S]   | CRIT-030..034 |
| TASK-072 | Telemetry: admin actions, re-eval rates, blacklisting trends              | BE/FE | S      | T062–T071 | `analytics/admin-vetting.md`               | \[S]   | DoD           |
| TASK-073 | Docs: scoring policy, admin workflows, audit log retention                | Docs  | XS     | T060–T072 | `docs/admin-vetting.md`                    | \[S]   | DoD           |

**Parallel Lanes**

* **Lane A (Backend):** T060 → T061 → (T062,T063,T065,T067,T068) → T070
* **Lane B (Frontend):** (T064,T066,T069) → T071
* **Lane C (Analytics/Docs):** T072 → T073

---

## Clarifications Backlog

1. \[NEEDS CLARIFICATION] Vetting scoring rubric (criteria, weights, thresholds).
2. \[NEEDS CLARIFICATION] Definition of “anomaly” for automatic suspension triggers.
3. \[NEEDS CLARIFICATION] Retention period for compliance logs (e.g., 7 years?).

---

# Specification (per feature)

## FEAT-005 — Management Portal (Escrow, Disputes & Reporting)

**Summary**
Management users oversee platform operations: approve escrow releases and refunds, access messaging logs for escalations, and review operational/financial reports to ensure compliant, trustworthy marketplace operations.

**Users/Personas**

* **Management (Trific Ops/Finance/Compliance)** — primary operators for funds control, disputes, and reporting.
* **Admin (TenderSure Vetting)** — indirect; may collaborate on dispute evidence.
* **Clients/Providers (indirect)** — affected by fund releases and dispute outcomes.

**Goals/Benefits**

* Strong financial controls over **escrow deposits, milestone releases, payouts, refunds**.
* Efficient, auditable **dispute resolution** leveraging message logs.
* Clear **operational analytics** for growth, risk, and revenue oversight.

**Non-Functional**

* Security: management actions require elevated roles + MFA; all actions are auditable.
* Perf: payout/escrow approval pages load ≤2s for typical queues (<200 rows).
* Observability: dashboards for payouts vs deposits, dispute rates, revenue metrics.

### Acceptance Criteria (Gherkin)

CRIT-040 (Escrow Release Approval)

```
Given I am a Management user
When a milestone is approved by a client
Then I can review the escrow release request
And approve or deny it with a recorded rationale
```

CRIT-041 (Refund Handling)

```
Given a dispute results in a refund decision
When I action a refund from the management portal
Then the escrow is reversed to the client
And an audit log is created
```

CRIT-042 (Dispute Evidence Access)

```
Given a dispute is escalated
When I open the case
Then I can view the relevant in-app messaging logs (read-only)
And attach notes used in the decision
```

CRIT-043 (Financial Reporting)

```
Given I am on the financial insights view
When I select a date range
Then I see payouts vs deposits, revenue/fees, and trends
```

CRIT-044 (Operational Reporting)

```
Given I am on the operations dashboard
When I filter by portal or date
Then I see total users, active jobs, disputes & fraud trends
```

**Evidence**

* **Management Portal (features & acceptance):** financial operations (escrow, payouts, refunds) and dispute access to messaging logs; escrow releases require management approval; messaging logs are accessible only for disputes .
* **Payments:** escrow model, deposit → milestone approval → release; refunds via management review; gateway coverage (PayPal/DPO/Mpesa; Sidian trade finance); acceptance criteria for escrow holding and releases .
* **Reporting/Analytics tasks** appear in breakdowns (platform revenue, payouts vs deposits, disputes/fraud trends, operational reports) to be surfaced in management views  .
* **Project plan** slots Management portal in build & MVP phases, indicating scope priority .

**Unknowns**

* I don’t know. **\[NEEDS CLARIFICATION]** Exact approval matrix (single approver vs dual control thresholds).
* I don’t know. **\[NEEDS CLARIFICATION]** Refund policy rules (windows, partial refunds, fees).
* I don’t know. **\[NEEDS CLARIFICATION]** Which payment gateways are **in** scope for MVP beyond PayPal (DPO/Mpesa) and whether Sidian trade finance is MVP or post-MVP.
* I don’t know. **\[NEEDS CLARIFICATION]** Data retention period for dispute evidence (message logs, attachments).

**Definition of Done**

* All criteria covered by automated tests.
* Telemetry for approvals/denials, refunds, dispute outcomes.
* Docs updated: approval policy, dispute SOP, financial reporting definitions.

---

# 2) Technical Implementation Plan (per feature)

**Architecture (high-level)**

* **Frontend (Management portal)**

  * Routes: `/mgmt/escrow`, `/mgmt/disputes`, `/mgmt/financial-insights`, `/mgmt/ops-dashboard`.
  * Modules:

    * Escrow queue (requests, details, approve/deny w/ rationale).
    * Disputes (case list, view read-only message logs, add notes, link decisions).
    * Financial Insights (payouts vs deposits, revenue/fees, breakdowns).
    * Ops Dashboard (users, active jobs, dispute/fraud trends).

* **Backend (Django/DRF)**

  * **Escrow/Payouts/Refunds**

    * `GET /api/mgmt/escrow/requests`
    * `POST /api/mgmt/escrow/{id}/decision` (approve|deny, rationale)
    * `POST /api/mgmt/refunds` (caseId, amount, rationale)
  * **Disputes**

    * `GET /api/mgmt/disputes` (filters)
    * `GET /api/mgmt/disputes/{id}` (metadata, related contract/milestones, **read-only** message log pointer)
  * **Reporting**

    * `GET /api/mgmt/reports/financial?from&to` (payouts, deposits, commissions, currency)
    * `GET /api/mgmt/reports/ops?from&to` (users, jobs, disputes/fraud indicators)

* **Security & Compliance**

  * Management role + MFA; action gating by policy thresholds.
  * All actions recorded in **immutable audit log** (actor, action, target, rationale, timestamp).
  * Dispute evidence access is scoped to the case; logs are read-only (no edits).
  * Payments use gateway SDKs; escrow ledger consistency enforced by DB transactions + idempotency keys.

**Decisions (gated via SDD)**

* Use DRF viewsets and built-in auth/permissions; avoid custom abstraction layers → **Anti-Abstraction Gate: PASS**.
* Keep ≤3 projects (FE app, BE API, infra) for MVP; centralize escrow logic in one service → **Simplicity Gate: PASS**.
* Contracts first; test order **contract → integration → e2e → unit**; verify with real gateway sandbox (at least PayPal) → **Integration-First Gate: PASS**.
* Restrict evidence access to disputes only, per PRD; no broad log searches → aligns with acceptance and privacy stance .

**Contracts (sketch)**

* `POST /api/mgmt/escrow/{id}/decision`

  * Body: `{ decision: "APPROVE"|"DENY", rationale: string }`
  * 201: `{ status: "APPROVED"|"DENIED", escrowId, actorId, at }`
* `POST /api/mgmt/refunds`

  * Body: `{ caseId, amount, currency, rationale }`
  * 201: `{ refundId, status: "INITIATED", at }`
* `GET /api/mgmt/reports/financial`

  * 200: `{ payouts:{total,series[]}, deposits:{total,series[]}, revenue:{fees,commissions}, breakdown:{byDay|byMonth} }`

**Data Model (key entities)**

* **EscrowLedger** `{ id, contractId, balance, currency }`
* **EscrowRequest** `{ id, milestoneId, amount, status, createdAt }`
* **Refund** `{ id, caseId, amount, currency, status, createdAt }`
* **DisputeCase** `{ id, contractId, reason, status, openedAt, closedAt }`
* **AuditLog** `{ id, actorId, action, targetType, targetId, rationale, at }`

**Testing Strategy** (required order)

1. **Contract tests** for decisions/refunds/reports; schema & auth.
2. **Integration** with real DB + gateway sandbox (PayPal at minimum) and escrow ledger invariants.
3. **e2e**: milestone approved → escrow request appears → management approves → ledger updates → payout webhook simulation; dispute case → view logs → record decision & refund.
4. **Unit**: calculators for payouts vs deposits; permission guards; idempotency utilities.

**Risks & Mitigations**

* **Financial correctness** (rounding, multi-currency): strict money types; rounding policy document; reconciliation job.
* **Gateway heterogeneity** (PayPal/DPO/Mpesa): abstract via adapter pattern only at integration boundary; MVP with PayPal confirmed; others toggled behind feature flags. **\[NEEDS CLARIFICATION]** on scope.
* **Evidence privacy**: ensure logs are case-scoped and read-only; redact PII where unnecessary.

---

# 3) Executable Tasks (per feature)

| ID       | Title                                                                | Owner/Skill       | Time   | Deps      | Artifacts                               | \[P/S] | Traceability  |
| -------- | -------------------------------------------------------------------- | ----------------- | ------ | --------- | --------------------------------------- | ------ | ------------- |
| TASK-080 | Define API contracts (escrow decisions, refunds, disputes, reports)  | BE (DRF)          | S      | —         | `contracts/management.yml`              | \[P]   | CRIT-040..044 |
| TASK-081 | Contract tests for mgmt endpoints (auth, schemas, limits)            | QA/BE             | S      | T080      | `tests/contracts/test_management.py`    | \[S]   | CRIT-040..044 |
| TASK-082 | Implement escrow decision endpoint + ledger updates + audit          | BE                | M      | T081      | `apps/mgmt/escrow.py`                   | \[S]   | CRIT-040      |
| TASK-083 | Implement refunds endpoint + gateway adapter (PayPal sandbox)        | BE                | M      | T081      | `apps/mgmt/refunds.py`                  | \[S]   | CRIT-041      |
| TASK-084 | Disputes: case list/detail with **read-only** message log pointer    | BE                | M      | T081      | `apps/mgmt/disputes.py`                 | \[S]   | CRIT-042      |
| TASK-085 | Financial insights report API (payouts/deposits/revenue)             | BE                | M      | T081      | `apps/mgmt/reports_fin.py`              | \[S]   | CRIT-043      |
| TASK-086 | Ops dashboard report API (users/jobs/disputes/fraud trends)          | BE                | M      | T081      | `apps/mgmt/reports_ops.py`              | \[S]   | CRIT-044      |
| TASK-087 | FE: Escrow queue UI (approve/deny w/ rationale)                      | FE (Vue/TS)       | M      | —         | `src/pages/mgmt/escrow.vue`             | \[P]   | CRIT-040      |
| TASK-088 | FE: Dispute case UI (read-only logs, notes)                          | FE                | M      | T087      | `src/pages/mgmt/disputes.vue`           | \[S]   | CRIT-042      |
| TASK-089 | FE: Financial insights charts (range selector)                       | FE                | S      | T085      | `src/pages/mgmt/financial-insights.vue` | \[S]   | CRIT-043      |
| TASK-090 | FE: Ops dashboard tiles + trends                                     | FE                | S      | T086      | `src/pages/mgmt/ops-dashboard.vue`      | \[S]   | CRIT-044      |
| TASK-091 | Integration tests: decisions, refunds, reports, disputes access      | QA                | M      | T082–T090 | `tests/integration/test_management.py`  | \[S]   | CRIT-040..044 |
| TASK-092 | e2e: milestone→escrow request→approve→payout; dispute→logs→refund    | QA                | M      | T087–T091 | `e2e/management_portal.spec.ts`         | \[S]   | CRIT-040..044 |
| TASK-093 | Telemetry + dashboards: approvals/denials, refunds, dispute outcomes | BE/FE (Analytics) | S      | T082–T092 | `analytics/management.md`               | \[S]   | DoD           |
| TASK-094 | Docs: approval matrix, refund policy, reporting metrics dictionary   | Docs              | XS     | T080–T093 | `docs/management-portal.md`             | \[S]   | DoD           |

**Parallel lanes**

* **Lane A (Backend)**: T080 → T081 → (T082..T086) → T091
* **Lane B (Frontend)**: (T087..T090) → T092
* **Lane C (Analytics/Docs)**: T093 → T094

---

## Clarifications Backlog (for this feature)

1. **Approval matrix**: one-person vs two-person approval for amounts over X? Regional limits?
2. **Refund policy**: eligibility windows, partial refunds, fee handling, chargeback strategy.
3. **Gateway scope**: confirm MVP gateways (PayPal only vs also DPO/Mpesa) and **Sidian trade finance** inclusion.
4. **Evidence retention**: how long to retain dispute logs & attachments for compliance.


---

# Specification (per feature)

## FEAT-006 — Messaging (Client ↔ Provider, Secure Docs & Contracts)

**Summary**
Clients and providers communicate in-platform using secure, auditable threads. Messaging supports clarifications, document exchange, and contract discussions — but **excludes bidding/negotiation tools**.

**Users/Personas**

* **Clients (corporate buyers, procurement managers)** — use chat to clarify requirements and finalize contract terms.
* **Providers (law firms, consultants, service SMEs)** — use chat to respond, share documents, and confirm engagements.
* **Management/Admin (indirect)** — access logs only in case of escalated disputes.

**Goals/Benefits**

* Keeps all client-provider communication in-platform (compliance, audit).
* Provides secure channel for exchanging contracts and clarifications.
* Ensures disputes can be resolved with complete evidence.

**Non-Functional**

* Security: all messages & attachments encrypted in transit + at rest.
* Privacy: only case-linked logs exposed to Management for disputes.
* Perf: p95 send-to-receive latency ≤ 250ms (normal traffic).
* Observability: metrics on message volume, attachment types, conversation starts.

### Acceptance Criteria (Gherkin)

CRIT-050 (Thread Creation)

```
Given a client selects a provider
When I click “Engage Provider”
Then a secure message thread is created for both parties
```

CRIT-051 (Messaging)

```
Given a message thread exists
When I send a message
Then the provider receives it in real-time
And it appears in the conversation history
```

CRIT-052 (Document Sharing)

```
Given a thread exists
When I upload a contract or supporting document
Then it is securely stored
And visible/downloadable only to thread participants
```

CRIT-053 (Contract Review in Chat)

```
Given a contract is uploaded in a thread
When I open the chat
Then I can view and comment on the contract in the conversation context
```

CRIT-054 (Audit & Dispute Access)

```
Given a dispute is escalated
When a Management user opens the case
Then they can view the relevant message logs
But cannot edit or delete any content
```

**Evidence**

* **PRD – Messaging:** in-app messaging for clarifications and contract discussions; negotiation tools explicitly excluded; acceptance criteria include clarifications, secure encrypted doc sharing; workflow shows selection → secure chat opens → docs shared → contract review → engagement finalized.
* **Backend breakdown:** tasks include in-app chat, file sharing (docs/images/contracts), job-specific communication threads.
* **Frontend breakdown:** tasks include chat with client/provider, file sharing, threads per job/engagement.
* **Project plan:** messaging is part of Week 4 scope before UAT.

**Unknowns**

* I don’t know. **\[NEEDS CLARIFICATION]**: Final messaging technology — PRD mentions *Stream, TalkJS, or Custom*; memory notes a **custom solution**.
* I don’t know. **\[NEEDS CLARIFICATION]**: Maximum attachment size and supported file types (PDF, DOCX, images?).
* I don’t know. **\[NEEDS CLARIFICATION]**: Retention period for message history (permanent vs time-bound archiving).

**Definition of Done**

* Secure real-time threads functional; contracts/docs sharable.
* Telemetry for message sends, attachments, thread creation, errors.
* Documentation updated: messaging flows, limits, escalation access.

---

# 2) Technical Implementation Plan

**Architecture (high-level)**

* **Frontend**

  * Routes: `/app/threads/:id`.
  * Components: `ThreadList`, `MessageInput`, `MessageBubble`, `AttachmentPreview`, `ContractReview`.
  * State: thread participants, message history, unread counts.
* **Backend**

  * Services:

    * `POST /api/threads` → new thread.
    * `POST /api/threads/{id}/messages` → send message.
    * `POST /api/threads/{id}/attachments` → upload file.
    * `GET /api/threads/{id}` → thread details & history.
  * Storage: attachments in S3 w/ signed URLs; virus scan; DB pointer.
  * Real-time: Django Channels (WebSockets) for push delivery.
  * Audit: all messages immutable; management can fetch logs for disputes.

**Data Model**

* **Thread**: `{ id, clientId, providerId, createdAt }`.
* **Message**: `{ id, threadId, senderId, content, type[text|system], createdAt }`.
* **Attachment**: `{ id, threadId, uploaderId, filename, mime, size, url }`.
* **AuditLog** (for disputes): pointer to messages.

**Decisions (gated)**

* **No negotiation tools** → aligns with PRD compliance, passes **Simplicity Gate**.
* **Custom solution** (if confirmed) built on Django Channels + S3 → avoids vendor lock; passes **Anti-Abstraction Gate**.
* Contracts first, test-first order: contract → integration → e2e → unit → **Integration-First Gate**.

**Testing Strategy**

1. Contract: threads, messages, attachments.
2. Integration: DB + WebSockets + S3.
3. e2e: client selects provider → chat opens → send message → upload doc → review.
4. Unit: message validators, attachment utils.

**Risks & Mitigations**

* **Vendor indecision**: confirm messaging provider early; fallback to custom.
* **File abuse**: enforce type/size limits, scan uploads.
* **Realtime scaling**: test concurrency; use Redis + Channels.
* **Compliance**: ensure management-only access for disputes.

---

# 3) Executable Tasks

| ID       | Title                                                               | Owner/Skill | Time   | Deps      | Artifacts                                                     | \[P/S] | Traceability  |
| -------- | ------------------------------------------------------------------- | ----------- | ------ | --------- | ------------------------------------------------------------- | ------ | ------------- |
| TASK-100 | Define API contracts (threads, messages, attachments)               | BE          | S      | —         | `contracts/messaging.yml`                                     | \[P]   | CRIT-050..054 |
| TASK-101 | Contract tests for messaging endpoints                              | QA/BE       | S      | T100      | `tests/contracts/test_messaging.py`                           | \[S]   | CRIT-050..054 |
| TASK-102 | Implement `POST /threads` & thread creation logic                   | BE          | M      | T101      | `apps/messaging/threads.py`                                   | \[S]   | CRIT-050      |
| TASK-103 | Implement `POST /threads/{id}/messages` + WebSocket push            | BE          | M      | T101      | `apps/messaging/messages.py`                                  | \[S]   | CRIT-051      |
| TASK-104 | Implement `POST /threads/{id}/attachments` w/ S3 upload + scan      | BE          | M      | T101      | `apps/messaging/attachments.py`                               | \[S]   | CRIT-052      |
| TASK-105 | Implement `GET /threads/{id}` (history, metadata)                   | BE          | S      | T101      | `apps/messaging/threads.py`                                   | \[S]   | CRIT-051..053 |
| TASK-106 | FE: thread list & detail view components                            | FE          | M      | —         | `src/pages/app/threads.vue`                                   | \[P]   | CRIT-050,051  |
| TASK-107 | FE: message input & bubble UI                                       | FE          | S      | T106      | `src/components/MessageInput.vue`, `MessageBubble.vue`        | \[S]   | CRIT-051      |
| TASK-108 | FE: attachment upload + preview + contract review                   | FE          | M      | T106      | `src/components/AttachmentUploader.vue`, `ContractReview.vue` | \[S]   | CRIT-052,053  |
| TASK-109 | Management read-only log access for disputes                        | BE          | S      | T102–T105 | `apps/mgmt/disputes_logs.py`                                  | \[S]   | CRIT-054      |
| TASK-110 | FE: dispute case viewer for logs (mgmt only)                        | FE          | S      | T109      | `src/pages/mgmt/dispute-logs.vue`                             | \[S]   | CRIT-054      |
| TASK-111 | Integration tests: threads, messages, attachments, mgmt logs        | QA          | M      | T102–T110 | `tests/integration/test_messaging.py`                         | \[S]   | CRIT-050..054 |
| TASK-112 | e2e: client selects provider → chat → send → upload → mgmt log view | QA          | M      | T106–T110 | `e2e/messaging.spec.ts`                                       | \[S]   | CRIT-050..054 |
| TASK-113 | Telemetry: thread creations, msg counts, attachment metrics         | BE/FE       | S      | T102–T112 | `analytics/messaging.md`                                      | \[S]   | DoD           |
| TASK-114 | Docs: messaging architecture, limits, dispute access policy         | Docs        | XS     | T100–T113 | `docs/messaging.md`                                           | \[S]   | DoD           |

**Parallel Lanes**

* **Lane A (Backend)**: T100 → T101 → (T102–T105, T109) → T111
* **Lane B (Frontend)**: (T106–T108, T110) → T112
* **Lane C (Analytics/Docs)**: T113 → T114

---

## Clarifications Backlog

1. \[NEEDS CLARIFICATION] Confirm messaging tech: *Stream*, *TalkJS*, or **Custom Django solution**.
2. \[NEEDS CLARIFICATION] Define max attachment size & allowed types.
3. \[NEEDS CLARIFICATION] Retention period for chat logs.


---

# Specification (per feature)

## FEAT-007 — Payments (Escrow, Payouts, Refunds, Financing)

**Summary**
Payments in Trific flow entirely through an **escrow model**: clients deposit into escrow, funds are released to providers upon milestone approval, with refunds handled via management. Supported gateways include PayPal, DPO, Mpesa, and Sidian Bank (trade finance).

**Users/Personas**

* **Clients** — deposit funds, approve milestone-based releases.
* **Providers** — receive escrowed payouts, withdraw to bank/mobile.
* **Management** — authorize releases/refunds, monitor financial flows.

**Goals/Benefits**

* Reduce risk by holding all funds in escrow until deliverables approved.
* Enable flexible payouts across global/local gateways.
* Provide financing options (via Sidian Bank) for suppliers needing liquidity.

**Non-Functional**

* Security: PCI-DSS compliance; escrow ledger invariant checks; sensitive data never logged.
* Perf: p95 deposit API < 500ms (gateway response excluded).
* Reliability: idempotent payment operations; double-spend prevention.
* Observability: transaction logs, payout vs deposit dashboards, error alerting.

### Acceptance Criteria (Gherkin)

CRIT-060 (Escrow Deposit)

```
Given I am a client with a contract
When I deposit funds via PayPal/DPO/Mpesa
Then the funds are held in escrow
And linked to the contract milestones
```

CRIT-061 (Milestone Release)

```
Given a contract milestone is approved
When management authorizes release
Then escrowed funds are transferred to the provider’s payout account
```

CRIT-062 (Refunds)

```
Given a dispute results in a refund decision
When management initiates a refund
Then escrowed funds are returned to the client’s account
```

CRIT-063 (Withdrawals)

```
Given I am a provider with available balance
When I request a withdrawal
Then funds are sent to my configured payout method
And status updates are logged
```

CRIT-064 (Trade Finance)

```
Given I am an approved provider
When I request financing
Then Sidian Bank can access escrow/contract data
And financing terms are returned
```

**Evidence**

* **PRD – Payments:** gateways (PayPal, DPO, Mpesa), trade finance (Sidian Bank), default USD/KES conversion, escrow model, release triggered by milestone approval, refunds via management review.
* **Backend tasks:** PayPal integration, escrow deposits, milestone approvals, withdrawals, transaction history, refund handling, payout method management.
* **Frontend tasks:** load funds, escrow balance views, wallet transactions, withdrawal flows, approve milestone releases.
* **Project Plan:** payments & escrow integrated in Week 3–4 before MVP signoff.

**Unknowns**

* I don’t know. **\[NEEDS CLARIFICATION]**: Which gateways are MVP-critical (PayPal only, or also DPO/Mpesa)?
* I don’t know. **\[NEEDS CLARIFICATION]**: Financing flow with Sidian Bank — MVP or Phase 2?
* I don’t know. **\[NEEDS CLARIFICATION]**: Refund policy rules (partial refunds allowed? timelines?).
* I don’t know. **\[NEEDS CLARIFICATION]**: Payout method limits (bank accounts vs mobile wallets per provider).

**Definition of Done**

* Escrow deposits, milestone-based releases, refunds, and withdrawals fully tested.
* Telemetry: deposits, payouts, refunds, disputes.
* Docs updated: escrow flow, gateway scope, refund/withdrawal SOPs.

---

# 2) Technical Implementation Plan

**Architecture (high-level)**

* **Frontend (Wallet/Payments module)**

  * Routes: `/wallet`, `/wallet/deposit`, `/wallet/withdraw`, `/contracts/:id/milestones`.
  * UI: escrow balance display, deposit/withdraw forms, milestone release approval flows.

* **Backend (Django/DRF)**

  * Endpoints:

    * `POST /api/payments/deposit` (gateway, amount, contractId)
    * `POST /api/payments/milestones/{id}/release`
    * `POST /api/payments/refunds`
    * `POST /api/payments/withdrawals`
    * `GET /api/payments/transactions`
  * Gateways: PayPal SDK integration (sandbox MVP), adapters for DPO/Mpesa.
  * Ledger: EscrowLedger table ensures invariants (balance ≥ 0).
  * Financing: Sidian Bank API integration (if in scope).

**Data Model**

* **EscrowLedger**: `{ id, contractId, balance, currency }`
* **Transaction**: `{ id, type[deposit|release|refund|withdrawal], amount, currency, status, gateway, at }`
* **Withdrawal**: `{ id, providerId, method[bank|mobile], amount, status }`
* **FinancingRequest**: `{ id, providerId, contractId, amount, status, terms }`

**Decisions (SDD gate checks)**

* Contracts defined first; tests before integration → **Integration-First PASS**.
* DRF + gateway SDKs used directly → **Anti-Abstraction PASS**.
* Limit scope to escrow core + PayPal first → **Simplicity PASS**.

**Testing Strategy**

1. Contract: deposits, releases, refunds, withdrawals.
2. Integration: DB ledger invariants + PayPal sandbox + payout method.
3. e2e: client deposits → milestone → release → provider withdraws.
4. Unit: ledger math, rounding, idempotency.

**Risks & Mitigations**

* **Gateway reliability**: retry w/ idempotency keys.
* **Multi-currency mismatches**: enforce conversion policy; log mismatches.
* **Refund abuse**: enforce policies; management approval gates.
* **Financing delays**: flag Sidian integration as Phase 2 unless confirmed.

---

# 3) Executable Tasks

| ID       | Title                                                             | Owner/Skill | Time   | Deps      | Artifacts                                                   | \[P/S] | Traceability  |
| -------- | ----------------------------------------------------------------- | ----------- | ------ | --------- | ----------------------------------------------------------- | ------ | ------------- |
| TASK-120 | Define payment API contracts (deposit, release, refund, withdraw) | BE          | S      | —         | `contracts/payments.yml`                                    | \[P]   | CRIT-060..064 |
| TASK-121 | Contract tests for escrow endpoints                               | QA/BE       | S      | T120      | `tests/contracts/test_payments.py`                          | \[S]   | CRIT-060..064 |
| TASK-122 | Implement `POST /payments/deposit` w/ PayPal sandbox              | BE          | M      | T121      | `apps/payments/deposit.py`                                  | \[S]   | CRIT-060      |
| TASK-123 | Implement escrow ledger + milestone release endpoint              | BE          | M      | T121      | `apps/payments/release.py`                                  | \[S]   | CRIT-061      |
| TASK-124 | Implement refunds endpoint (mgmt only)                            | BE          | M      | T121      | `apps/payments/refunds.py`                                  | \[S]   | CRIT-062      |
| TASK-125 | Implement withdrawals endpoint + payout methods                   | BE          | M      | T121      | `apps/payments/withdrawals.py`                              | \[S]   | CRIT-063      |
| TASK-126 | Sidian Bank financing adapter (if in scope)                       | BE          | M      | T121      | `apps/payments/financing.py`                                | \[S]   | CRIT-064      |
| TASK-127 | FE: Wallet dashboard (balance, transactions)                      | FE          | M      | —         | `src/pages/wallet.vue`                                      | \[P]   | CRIT-060–063  |
| TASK-128 | FE: Deposit & withdraw forms + status views                       | FE          | M      | T127      | `src/components/wallet/DepositForm.vue`, `WithdrawForm.vue` | \[S]   | CRIT-060,063  |
| TASK-129 | FE: Contract milestone release action                             | FE          | S      | T127      | `src/components/contracts/MilestoneRelease.vue`             | \[S]   | CRIT-061      |
| TASK-130 | FE: Financing request UI (if in scope)                            | FE          | S      | T127      | `src/components/wallet/FinancingRequest.vue`                | \[S]   | CRIT-064      |
| TASK-131 | Integration tests: deposits, releases, refunds, withdrawals       | QA          | M      | T122–T130 | `tests/integration/test_payments.py`                        | \[S]   | CRIT-060..064 |
| TASK-132 | e2e: deposit→release→withdrawal→refund                            | QA          | M      | T127–T130 | `e2e/payments.spec.ts`                                      | \[S]   | CRIT-060..063 |
| TASK-133 | Telemetry: deposit/payout/refund dashboards                       | BE/FE       | S      | T122–T132 | `analytics/payments.md`                                     | \[S]   | DoD           |
| TASK-134 | Docs: escrow model, gateway scope, refund/withdraw policies       | Docs        | XS     | T120–T133 | `docs/payments.md`                                          | \[S]   | DoD           |

**Parallel lanes**

* **Lane A (Backend)**: T120 → T121 → (T122–T126) → T131
* **Lane B (Frontend)**: (T127–T130) → T132
* **Lane C (Analytics/Docs)**: T133 → T134

---

## Clarifications Backlog

1. \[NEEDS CLARIFICATION] Confirm MVP gateway scope: PayPal only vs also DPO/Mpesa.
2. \[NEEDS CLARIFICATION] Confirm Sidian Bank financing is MVP or Phase 2.
3. \[NEEDS CLARIFICATION] Define refund rules: partial refunds, timelines.
4. \[NEEDS CLARIFICATION] Payout methods supported (bank, mobile wallets).

---

# Specification (per feature)

## FEAT-008 — Notifications (Real-Time Updates, Alerts, Preferences)

**Summary**
Trific users (clients, providers, admins, management) receive timely notifications about important events (new messages, job/contract changes, payments, disputes, system alerts). Notifications are delivered in-app (real-time), with optional email/push. Users can manage preferences.

**Users/Personas**

* **Clients** — get notified about provider responses, contract milestones, escrow actions.
* **Providers** — get notified about client messages, milestone approvals, payouts.
* **Admins/Management** — alerted about disputes, fraud flags, pending KYCs, large withdrawals.

**Goals/Benefits**

* Keep all parties updated to reduce delays and disputes.
* Support compliance by alerting admins/management of suspicious/fraudulent activity.
* Improve user experience with configurable preferences.

**Non-Functional**

* Real-time push latency ≤ 250ms.
* Reliability: guarantee delivery with retry (for email/push).
* Security: only intended recipients receive notifications; PII redacted.
* Observability: metrics on volume, delivery failures, user opt-outs.

### Acceptance Criteria (Gherkin)

CRIT-070 (Real-time In-app Notification)

```
Given I am a client
When a provider sends me a message
Then I receive an in-app notification in real-time
```

CRIT-071 (Email/Push Alerts)

```
Given I have opted into email/push
When a contract milestone is approved
Then I receive an email/push notification
```

CRIT-072 (Admin Alerts)

```
Given a large withdrawal request is flagged
When I am an Admin
Then I see an alert in my dashboard
And I receive an in-app notification
```

CRIT-073 (User Preferences)

```
Given I am a logged-in user
When I open notification settings
Then I can enable/disable email/push for categories
```

CRIT-074 (Audit & Logs)

```
Given a notification is sent
When I check the audit logs
Then I see the type, recipient, channel, and status
```

**Evidence**

* **Frontend tasks:** real-time notifications, email & push preferences, system alerts (jobs, bids, direct messages, disputes, flagged accounts, KYC approvals, etc.).
* **Backend tasks:** notification service, email/push template management, fraud alerts, incident/dispute reports.
* **PRD (Admin & Management):** admins receive alerts for disputes, fraud, flagged accounts; management sees system alerts & approvals.
* **Project Plan:** notifications scoped during build phase (Week 3–4).

**Unknowns**

* I don’t know. **\[NEEDS CLARIFICATION]**: Push provider (Firebase, AWS SNS, custom?).
* I don’t know. **\[NEEDS CLARIFICATION]**: Retention period for notifications (e.g., 30 days vs permanent log).
* I don’t know. **\[NEEDS CLARIFICATION]**: Categories of notifications that are mandatory vs user-configurable.

**Definition of Done**

* Real-time in-app, email, and push notifications working.
* Preferences functional; opt-outs respected.
* Telemetry + logs for all notifications.
* Documentation updated: notification categories, retention, templates.

---

# 2) Technical Implementation Plan

**Architecture (high-level)**

* **Frontend**

  * Global notification store (Pinia/Vuex).
  * Components: `NotificationBell`, `NotificationDropdown`, `PreferencesPage`.
  * Real-time: WebSocket channel (shared infra with messaging).

* **Backend**

  * Services:

    * `POST /api/notifications` (create notification, routes to delivery channels).
    * `GET /api/notifications` (list for user).
    * `PATCH /api/notifications/preferences` (per category).
    * Delivery workers: in-app (WS push), email (SMTP/provider), push (Firebase/SNS).
  * Template management: system alerts, milestone, payment, dispute templates.
  * Audit log: all notification events stored immutably.

**Data Model**

* **Notification**: `{ id, userId, type, channel[in-app|email|push], payload, status, createdAt, readAt }`.
* **Preference**: `{ userId, type, inApp:bool, email:bool, push:bool }`.

**Decisions (SDD gate checks)**

* Leverage existing WS infra (Channels/Redis) → avoids over-architecture, **Simplicity PASS**.
* Use DRF serializers directly; no abstraction wrappers → **Anti-Abstraction PASS**.
* Test-first: contract → integration → e2e → unit → **Integration-First PASS**.

**Testing Strategy**

1. Contract: create/list notifications, preferences.
2. Integration: DB + WS push + email/push sandbox.
3. e2e: provider sends message → client notified in real-time + email.
4. Unit: preference toggles, audit logging utils.

**Risks & Mitigations**

* **Delivery failures** (esp. email/push): retries, dead-letter queue.
* **Spam risk**: rate-limits + mandatory categories separate from optional ones.
* **Privacy**: redact sensitive contract details in subject/body.

---

# 3) Executable Tasks

| ID       | Title                                                      | Owner/Skill | Time   | Deps      | Artifacts                                                             | \[P/S] | Traceability  |
| -------- | ---------------------------------------------------------- | ----------- | ------ | --------- | --------------------------------------------------------------------- | ------ | ------------- |
| TASK-140 | Define notification API contracts                          | BE          | S      | —         | `contracts/notifications.yml`                                         | \[P]   | CRIT-070..074 |
| TASK-141 | Contract tests for notification endpoints                  | QA/BE       | S      | T140      | `tests/contracts/test_notifications.py`                               | \[S]   | CRIT-070..074 |
| TASK-142 | Implement `POST /notifications` (create + channel routing) | BE          | M      | T141      | `apps/notifications/service.py`                                       | \[S]   | CRIT-070..072 |
| TASK-143 | Implement in-app WS push (Channels/Redis)                  | BE          | M      | T141      | `apps/notifications/realtime.py`                                      | \[S]   | CRIT-070      |
| TASK-144 | Implement email & push delivery workers                    | BE          | M      | T141      | `apps/notifications/delivery.py`                                      | \[S]   | CRIT-071      |
| TASK-145 | Implement `GET /notifications` + `PATCH /preferences`      | BE          | S      | T141      | `apps/notifications/api.py`                                           | \[S]   | CRIT-073      |
| TASK-146 | FE: Notification bell + dropdown UI                        | FE          | M      | —         | `src/components/NotificationBell.vue`                                 | \[P]   | CRIT-070      |
| TASK-147 | FE: Preferences page (toggle per category)                 | FE          | M      | T145      | `src/pages/preferences/notifications.vue`                             | \[S]   | CRIT-073      |
| TASK-148 | FE: Admin dashboard alerts integration                     | FE          | S      | T142      | `src/pages/admin/alerts.vue`                                          | \[S]   | CRIT-072      |
| TASK-149 | Audit log model + UI (Mgmt portal)                         | BE/FE       | S      | T142      | `apps/notifications/audit.py`, `src/pages/mgmt/notification-logs.vue` | \[S]   | CRIT-074      |
| TASK-150 | Integration tests: create → deliver (WS/email/push) → log  | QA          | M      | T142–T149 | `tests/integration/test_notifications.py`                             | \[S]   | CRIT-070..074 |
| TASK-151 | e2e: provider sends msg → client in-app + email alert      | QA          | M      | T146–T148 | `e2e/notifications.spec.ts`                                           | \[S]   | CRIT-070..072 |
| TASK-152 | Telemetry: delivery success/failure dashboards             | BE/FE       | S      | T142–T151 | `analytics/notifications.md`                                          | \[S]   | DoD           |
| TASK-153 | Docs: categories, retention, templates                     | Docs        | XS     | T140–T152 | `docs/notifications.md`                                               | \[S]   | DoD           |

**Parallel lanes**

* **Lane A (Backend)**: T140 → T141 → (T142–T145, T149) → T150
* **Lane B (Frontend)**: (T146–T148) → T151
* **Lane C (Analytics/Docs)**: T152 → T153

---

## Clarifications Backlog

1. \[NEEDS CLARIFICATION] Which push/email provider (Firebase, AWS SNS, SES, etc.)?
2. \[NEEDS CLARIFICATION] Retention policy for notifications.
3. \[NEEDS CLARIFICATION] Mandatory vs optional categories (e.g., disputes/fraud always-on).


---

# Specification (per feature)

## FEAT-009 — Reviews & Ratings (post-engagement feedback)

**Summary**
After an engagement (per contract/milestones), clients can rate providers and leave a short review; approved reviews aggregate into each provider’s public rating to inform future client selection.

**Users/Personas**

* **Client (review author)** — shares outcome and quality signal.
* **Provider (review subject)** — receives feedback; rating influences visibility.
* **Admin/Management (moderation & compliance)** — handles flags, abuse, disputes.

**Goals/Benefits**

* Capture trusted, contract-anchored feedback (reduces spam).
* Surface **aggregate rating** on provider cards/profiles to speed discovery.
* Provide an appeal/flag channel to maintain quality and fairness.

**Non-Functional**

* Data integrity: one review per (client × contract) unless amended by Admin.
* Security & privacy: redact PII in public text; store raw in encrypted DB.
* Observability: metrics for review rate, average rating by category, flag rate.

### Acceptance Criteria (Gherkin)

CRIT-080 (Eligibility)

```
Given a contract has at least one completed milestone
When the client opens the engagement summary
Then the client can create exactly one review for that contract
```

CRIT-081 (Submit review)

```
Given I am an eligible client
When I submit a star rating and an optional comment
Then the review is stored and linked to the contract and provider
And the provider’s aggregate rating is updated
```

CRIT-082 (Visibility on profile & directory)

```
Given a provider has approved reviews
When I view their profile and the directory card
Then I see the aggregate rating and recent review excerpts
```

CRIT-083 (Flagging & moderation)

```
Given a review is inappropriate or contested
When a provider or admin flags the review
Then the review enters "Under Review" status
And admins can approve, edit for redaction, or remove with rationale
```

CRIT-084 (Auditability)

```
Given a moderation action occurs
When I view compliance logs
Then I see actor, action, target review, rationale, and timestamp
```

**Evidence**

* From manuals: **I don’t know.** **\[NEEDS CLARIFICATION]** Please point to the exact passages in `USER_MANUALS/PortalA.pdf` / `PortalB.pdf` that describe ratings/reviews, including who can rate whom and when.
* From e2e workflows: **I don’t know.** **\[NEEDS CLARIFICATION]** Please provide or confirm e2e cases (e.g., `e2e/Client/review.yml`, `e2e/Provider/review-flag.yml`) tied to the above criteria.
* From SDD foundation & gates: this spec explicitly marks unknowns and will pass decisions through Simplicity, Anti-Abstraction, and Integration-First gates, as required by your SDD template and constitutional gates  .

**Definition of Done**

* All CRIT scenarios covered by automated tests (contract → integration → e2e → unit).
* Telemetry: review submissions, flags, moderation outcomes; error paths captured.
* Docs updated: eligibility rules, moderation policy, API contracts, data model.

---

# 2) Technical Implementation Plan (per feature)

**Architecture (high-level)**

* **Frontend**

  * Client: review composer on contract summary (`/app/contracts/:id/review`), star widget, flag button on review.
  * Provider: review list with status badges; flag control.
  * Public: provider profile & directory card show aggregate rating (+ N recent snippets).
* **Backend (Django/DRF)**

  * **Reviews service**: CRUD with constraints; aggregates kept in provider projection table or materialized view.
  * **Moderation**: state machine (PUBLISHED → UNDER\_REVIEW → {REDACTED|REMOVED|REINSTATED}); append-only **AuditLog**.
  * **Events**: on review create/update → recalc aggregate; emit notification to provider.

**Decisions (gate checks)**

* Keep ≤3 deployable projects; Reviews lives in core API → **Simplicity Gate (Article VII): PASS**.&#x20;
* Use DRF viewsets/serializers directly; no custom infra wrappers → **Anti-Abstraction Gate (Article VIII): PASS**.&#x20;
* Define contracts first; write **contract → integration → e2e → unit** tests in that order; prefer real DB for integration → **Integration-First (Article IX): PASS**.&#x20;

**Contracts (initial shapes)**

* `POST /api/reviews`

  * Body: `{ contractId, providerId, rating: 1..5, comment?: string }`
  * Rules: server validates client↔contract relation and one-per-contract constraint; returns `{ reviewId, status:"PUBLISHED" }`.
* `GET /api/providers/{id}/reviews?limit=20&offset=0` → list public reviews with redactions.
* `GET /api/providers/{id}/rating` → `{ average: number, count: number, updatedAt }`.
* `POST /api/reviews/{id}/flag` → `{ status:"UNDER_REVIEW" }` (provider/admin).
* `POST /api/admin/reviews/{id}/moderate`

  * Body: `{ action:"REDACT"|"REMOVE"|"REINSTATE", rationale }`
  * Returns moderation result + AuditLog entry.

**Data Model (key entities)**

* **Review** `{ id, contractId, providerId, clientId, rating, comment, status, createdAt }`
* **ProviderRating** `{ providerId, avgRating, ratingsCount, updatedAt }` (denormalized)
* **AuditLog** `{ id, actorId, action, targetType:"review", targetId, rationale, at }`

**Testing Strategy**

1. **Contract tests**: schema validation, one-per-contract rule, permissions, moderation actions.
2. **Integration tests**: real DB; aggregate recompute; race-condition tests on concurrent reviews.
3. **e2e**: complete milestone → client leaves review → provider sees it → provider flags → admin moderates → aggregate updates/visibility verified.
4. **Unit tests**: rating reducer, redaction util, eligibility calculator.

**Risks & Mitigations**

* **Astroturfing/abuse**: lock reviews to completed contracts; rate-limit; moderation + audit.
* **Legal/defamation**: redaction/removal workflow with rationale and retention in audit.
* **Bias & cold-start**: display count and recency; default to “Not enough reviews” state.

---

# 3) Executable Tasks (per feature)

> Derived from contracts/entities/scenarios following your SDD tasking flow (inputs → tasks → parallelization) .

| ID       | Title                                                                | Owner/Skill | Time   | Deps      | Artifacts                                                   | \[P/S] | Traceability             |
| -------- | -------------------------------------------------------------------- | ----------- | ------ | --------- | ----------------------------------------------------------- | ------ | ------------------------ |
| TASK-160 | Define Reviews API contracts & moderation states                     | BE          | S      | —         | `contracts/reviews.yml`                                     | \[P]   | FEAT-009 → CRIT-080..084 |
| TASK-161 | Contract tests: create, list, flag, moderate                         | QA/BE       | S      | T160      | `tests/contracts/test_reviews.py`                           | \[S]   | CRIT-080..084            |
| TASK-162 | Implement `POST /reviews` with eligibility & one-per-contract rule   | BE          | M      | T161      | `apps/reviews/views.py`                                     | \[S]   | CRIT-080,081             |
| TASK-163 | Implement aggregate rating projection + recompute hook               | BE          | S      | T162      | `apps/reviews/aggregates.py`                                | \[S]   | CRIT-081,082             |
| TASK-164 | Implement `GET /providers/:id/reviews` & `GET /providers/:id/rating` | BE          | S      | T162      | `apps/reviews/views.py`                                     | \[S]   | CRIT-082                 |
| TASK-165 | Implement `POST /reviews/:id/flag` and admin moderation endpoint     | BE          | M      | T161      | `apps/reviews/moderation.py`                                | \[S]   | CRIT-083                 |
| TASK-166 | Append-only AuditLog model & write-path from moderation              | BE          | S      | T165      | `apps/audit/models.py`                                      | \[S]   | CRIT-084                 |
| TASK-167 | FE: Review composer on contract summary                              | FE          | M      | —         | `src/pages/contracts/review.vue`                            | \[P]   | CRIT-080,081             |
| TASK-168 | FE: Provider profile & card — show aggregate + recent snippets       | FE          | S      | —         | `src/components/provider/RatingBadge.vue`, `ReviewList.vue` | \[P]   | CRIT-082                 |
| TASK-169 | FE: Flag review UI (provider/admin) + status badges                  | FE          | S      | T165      | `src/components/reviews/FlagButton.vue`                     | \[S]   | CRIT-083                 |
| TASK-170 | Integration tests: end-to-end review lifecycle + aggregates          | QA          | M      | T162–T169 | `tests/integration/test_reviews.py`                         | \[S]   | CRIT-080..084            |
| TASK-171 | e2e: complete milestone → leave review → flag → moderate             | QA          | M      | T167–T169 | `e2e/reviews.spec.ts`                                       | \[S]   | CRIT-080..084            |
| TASK-172 | Telemetry & dashboards (review rate, avg by category, flag rate)     | BE/FE       | S      | T162–T171 | `analytics/reviews.md`                                      | \[S]   | DoD                      |
| TASK-173 | Docs: eligibility, moderation policy, API & data model               | Docs        | XS     | T160–T172 | `docs/reviews.md`                                           | \[S]   | DoD                      |

**Parallel lanes**

* **Lane A (Backend):** T160 → T161 → (T162..T166) → T170
* **Lane B (Frontend):** (T167..T169) → T171
* **Lane C (Analytics/Docs):** T172 → T173

---

## Clarifications Backlog (for this feature)

1. **Rating scale**: confirm 1–5 stars (any half-stars?) and rounding rules.
2. **Eligibility**: must **all** milestones be completed, or “at least one”? Is review allowed after refunds/disputes?
3. **Edit policy**: can authors edit within a window (e.g., 7 days) or add amendments only via Admin?
4. **Anonymity & display**: show client name/company? If not, what pseudonymization?
5. **Moderation SLAs**: target time to decision; auto-hide during review?
6. **Data retention**: how long to retain removed content vs public excerpts?

---

