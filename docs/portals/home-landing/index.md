# Trific eCommerce — Landing Page User Manual & E2E Testing Workflow

---

# 1) User Manual (Landing Page)

## Overview & Purpose

The Trific eCommerce **Landing Page** is the public, non-authenticated entry to the marketplace. It should:

-   Explain value (what Trific is, who it serves).
-   Offer fast paths to start browsing.
-   Showcase featured categories/listings, promotions, and trust signals.
-   Provide clear navigation to other public content (About, Help, Contact, etc.).
-   Connect users to support or messaging touchpoints where appropriate.

**Out of scope:** Sign up / Sign in (handled elsewhere).

## Audience & Prerequisites

-   **Audience:** First-time visitors, returning shoppers, business stakeholders evaluating the product, support agents, and QA testers.
-   **Prerequisites:** A modern desktop or mobile browser with JavaScript/cookies enabled. Role/permission requirements for this public page: **I don't know.** (Assumption: none required; page is public.)

## Page Map (ASCII)

```
+-------------------------------------------------------------+
| Global Header                                               |
| [Logo]  [Primary Nav: Home | Categories | Deals | Help]     |
|           [Search Bar / Icon]       [Cart Icon] [Support?]  |
+-------------------------------------------------------------+
| Hero Section                                                |
| - Headline                                                  |
| - Subheadline                                               |
| - Primary CTA (e.g., "Start Browsing")                      |
| - Secondary CTA (e.g., "Learn More")                        |
+-------------------------------------------------------------+
| Featured Categories / Collections                           |
| [Card 1] [Card 2] [Card 3] [Card 4] ...                     |
+-------------------------------------------------------------+
| Featured Listings / Trending / New Arrivals (Carousel/Grid) |
| [Listing Card xN: image, title, price, rating, CTA]         |
+-------------------------------------------------------------+
| Promotions / Banners / Trust Signals                        |
| - Promo Banner (e.g., seasonal)                             |
| - Badges (Secure Checkout, Escrow Info?)                    |
| - Payments Accepted (M-Pesa/PayPal/DPO?) -> I don't know    |
+-------------------------------------------------------------+
| Content Blocks                                              |
| - How It Works / Value Props                                |
| - Testimonials / Logos -> I don't know                      |
+-------------------------------------------------------------+
| Footer                                                      |
| [About] [Contact] [Help Center/FAQ] [Policies] [Social]     |
+-------------------------------------------------------------+
```

## Key Scenarios & Actions

| Scenario                | Trigger                            | Steps                                             | Expected Outcome                                     | Error/Recovery                                                                  | Notes                              |
| ----------------------- | ---------------------------------- | ------------------------------------------------- | ---------------------------------------------------- | ------------------------------------------------------------------------------- | ---------------------------------- |
| Discover value          | User lands on URL                  | 1) View hero copy 2) Review value props           | Understand offering; sees clear next step (CTA)      | If hero fails to load, show minimal fallback headline and CTA                   | Exact copy **I don't know**        |
| Start browsing          | Click primary CTA "Start Browsing" | 1) Click CTA 2) Navigate to browsing/catalog page | Navigated to catalog with default filters            | If route fails, show toast + retry link                                         | Target URL **I don't know**        |
| Category drill-in       | Click a featured category card     | 1) Click category card 2) Go to category results  | Category results page loads with that filter applied | On 404, redirect to generic catalog with info message                           | Category taxonomy **I don't know** |
| Search from header      | Enter query in search and submit   | 1) Focus search 2) Type query 3) Submit           | Results page for query loads; empty state if none    | If API fails, show non-blocking error and suggest popular searches              | Search endpoint **I don't know**   |
| View listing teaser     | Scroll featured listings           | 1) Scroll 2) Lazy-load more items                 | Cards load with images/title/price/CTA               | On image CDN fail, show placeholder image; on API fail, show "Try again" button | Pagination policy **I don't know** |
| Open help/support       | Click Help/Contact link            | 1) Click Help 2) Navigate to Help Center          | Help page opens in same tab                          | If missing, show generic FAQ section                                            | Help URL **I don't know**          |
| See promotions          | Promo banner present               | 1) Banner visible 2) Click banner CTA             | Route to promo landing/details                       | If expired, hide banner gracefully                                              | Promo rules **I don't know**       |
| Understand trust/escrow | View trust badges                  | 1) Hover/click trust badges                       | Tooltip/modal explaining security/escrow             | If content missing, link to policy page                                         | Final copy **I don't know**        |
| View footer policies    | Click Privacy/Terms                | 1) Click policy link 2) Page loads                | Policy page opens                                    | 404 -> fallback to site map                                                     | Policy URLs **I don't know**       |

## States

-   **First-time visitor:** Show default hero, generic featured categories, intro promos. If consent banner is required (cookies), display on first visit (**I don't know** if required).
-   **Returning visitor:** Optionally personalize featured sections (recently viewed, saved preferences) — **I don't know** if personalization exists.
-   **Loading:** Skeletons for hero text blocks, cards, and images; spinner only when necessary.
-   **Empty:** For content blocks with no data (e.g., no promotions), hide the section or show tasteful empty-state messaging.
-   **Error:** Non-blocking toasts for transient errors; persistent modules show retry affordance. Critical routing errors show friendly fallback and link to catalog/home.

## Content & Messaging

-   **Hero:** Headline, subheadline, primary CTA ("Start Browsing"), secondary CTA ("Learn More"). Exact copy and tone **I don't know**.
-   **CTAs:** Start Browsing, View Category, See Deal, Learn More, Help/Contact. Final labels **I don't know**.
-   **Promotions:** Seasonal or partner promos; expiry and eligibility rules **I don't know**.
-   **Notifications/Messaging touchpoints:** The meeting noted backend ready and frontend config ongoing; on landing page, this likely surfaces as: global toasts for errors/info; possible cookie/consent banners; marketing banners. Specific trigger rules **I don't know**.

## Accessibility (WCAG 2.1 AA Essentials)

-   All interactive elements keyboard reachable (Tab order logical; :focus visible).
-   Proper landmarks (`<header>`, `<nav>`, `<main>`, `<footer>`), headings in outline order.
-   Images with informative `alt` text; decorative images with empty `alt`.
-   Link/CTA names are descriptive (no "Learn more" without context).
-   Color contrast ≥ 4.5:1 for text; 3:1 for large text and UI components.
-   Motion/auto-play: avoid or provide controls; respect reduced motion.
-   Error messages exposed programmatically (`aria-live="polite"` where relevant).

## Performance & Reliability Considerations

-   Prioritize **above-the-fold** content (hero copy + first row/category).
-   **Lazy-load** lower sections/images; use responsive images `srcset`/`sizes`.
-   Cache policy/CDN for static assets; stale-while-revalidate for content where safe (**I don't know** exact strategy).
-   Guard third-party failures (analytics, chat widgets) so they don't block rendering.
-   Minimize layout shift (reserve image/container dimensions).

## Security & Privacy (Public, Non-Auth)

-   Avoid exposing PII in query params or logs.
-   Respect cookie/consent requirements (**I don't know** jurisdictional needs).
-   Analytics: use first-party or trusted third-party; anonymize IP if policy requires (**I don't know**).
-   If payment badges/logos shown, do not imply card data handling on the landing page.

## Analytics & Telemetry (examples; exact spec **I don't know**)

-   `page_view` (url, referrer, device_breakpoint)
-   `cta_click` (cta_id, location=hero/footer/promo)
-   `category_card_click` (category_id, position)
-   `search_submit` (query_length, result_count bucketed)
-   `promo_view`/`promo_click` (campaign_id)
-   `error_toast_shown` (module, error_code bucketed)

## FAQs & Troubleshooting

-   **I don't see any listings.** Try refreshing; check if a network blocker is active. If still broken, contact support.
-   **Promotions look outdated.** Clear cache and reload; if persists, it may be expired content.
-   **Images are broken.** A placeholder should appear; try again later or visit the catalog directly.
-   **Search won't submit.** Ensure connectivity; if the error persists, navigate via category tiles.

## Reuse Notes (Template Guidance)

-   Keep the **Page Map** and **Scenarios** structure and replace modules/URLs/selectors per page.
-   Maintain **States**, **Accessibility**, **Performance**, **Privacy**, and **Analytics** sections as a baseline.
-   Swap **Content & Messaging** with page-specific copy and CTAs.
-   Update **Edge Cases** and **Telemetry** to match the page's unique features.

---

# 2) E2E Testing Workflow (Playwright, BDD)

## Scope & Objectives

Validate critical **landing-page** behaviors (public, non-auth):

-   Page renders essential modules (header, hero, featured categories, featured listings, footer).
-   Navigation via CTAs, category tiles, and footer links works.
-   Search interaction from the header works (at least submits and routes).
-   Promotions/trust signals display (when configured).
-   Basic resilience to loading/empty/error states.
-   Key accessibility checks.

## Test Environment & Data

-   **Base URL:** **I don't know** (e.g., `https://<env>.trific.<tld>/`)
-   **Environments:** Dev/Staging/Prod — **I don't know**
-   **Feature flags:** Notifications/messaging frontend toggle — **I don't know**
-   **Seed content:** At least 4 categories, 8 featured listings, 1 promo banner — **I don't know**
-   **User accounts:** Not required (public page)

## Entry/Exit Criteria

-   **Entry:** Deployed landing page URL reachable; critical services up (content API, CDN, analytics non-blocking).
-   **Exit (Pass):** 100% of **Critical** test cases pass; ≥ 95% of **High** pass; no **Critical** open defects.

## Test Case Schema (for tracking)

**Columns:** ID | Title | Tags | Preconditions | Steps (G/W/T) | Assertions | Evidence | Notes

> Each test also includes a Playwright-ready BDD outline (pseudo-feature text) that QA can paste into step definitions.

---

### Positive Test Cases (≥10)

**TC-LP-001 | Load essential modules**

-   **Tags:** smoke, render
-   **Preconditions:** Base URL reachable
-   **G/W/T (BDD):**

    -   **Given** I navigate to the landing page
    -   **When** the page finishes first paint
    -   **Then** I see the header, hero, featured categories, featured listings, and footer

-   **Assertions:** selectors exist & visible; no JS fatal errors in console
-   **Evidence:** Screenshot after load; console log
-   **Notes:** Exact selectors **I don't know**

_BDD Outline (Playwright comments):_

```gherkin
Feature: Landing page essential render
  Scenario: Modules render
    Given I open the landing page
    When the page loads
    Then I should see "#header" "#hero" "#featured-categories" "#featured-listings" "footer"
```

**TC-LP-002 | Hero primary CTA navigates**

-   **Tags:** nav, cta
-   **Preconditions:** CTA exists and route configured
-   **G/W/T:**

    -   **Given** the landing page is open
    -   **When** I click the hero primary CTA
    -   **Then** I am navigated to the expected browsing/catalog route

-   **Assertions:** URL matches pattern; page title contains expected text
-   **Evidence:** Before/after URLs; screenshot
-   **Notes:** Route **I don't know**

```gherkin
Scenario: Hero CTA navigates to catalog
  Given I open the landing page
  When I click "[data-test=hero-cta-primary]"
  Then I should be on "/catalog"        # pattern I don't know
```

**TC-LP-003 | Featured category tile filters**

-   **Tags:** nav, category
-   **Preconditions:** Category cards populated
-   **G/W/T:** Given landing open; When click first category; Then category results load
-   **Assertions:** URL includes category param; heading shows category label
-   **Evidence:** Screenshot; URL
-   **Notes:** Param name/label **I don't know**

```gherkin
Scenario: Category tile navigates with filter
  Given I open the landing page
  When I click the first "[data-test=category-card]"
  Then I should see a category results page with heading matching the tile text
```

**TC-LP-004 | Header search submits**

-   **Tags:** search, nav
-   **Preconditions:** Search available; API responsive
-   **G/W/T:** Given landing open; When enter "shoe" and submit; Then results page loads
-   **Assertions:** URL includes query; results or empty-state visible
-   **Evidence:** Screenshot
-   **Notes:** Selector/URL param **I don't know**

```gherkin
Scenario: Header search flow
  Given I open the landing page
  When I type "shoe" into "[data-test=header-search-input]" and press Enter
  Then I should be on a results page with either results or a defined empty state
```

**TC-LP-005 | Featured listings lazy-load**

-   **Tags:** content, performance
-   **Preconditions:** At least 8 items; lazy loading enabled
-   **G/W/T:** Given landing open; When scroll to listings; Then images load progressively
-   **Assertions:** `loading="lazy"` or intersection observer behavior; placeholders swap to images
-   **Evidence:** Network panel/log; screenshots
-   **Notes:** Implementation **I don't know**

```gherkin
Scenario: Featured listings lazy-load
  Given I open the landing page
  When I scroll to "[data-test=featured-listings]"
  Then listing images should become visible as they enter the viewport
```

**TC-LP-006 | Promo banner displays and navigates**

-   **Tags:** promo
-   **Preconditions:** Active promo
-   **G/W/T:** Given landing open; When I click promo CTA; Then promo page opens
-   **Assertions:** Banner visible; URL matches promo route
-   **Evidence:** Screenshot/URL
-   **Notes:** Campaign ID/route **I don't know**

```gherkin
Scenario: Promo banner click-through
  Given I open the landing page
  When I click "[data-test=promo-cta]"
  Then I should land on the promo details page
```

**TC-LP-007 | Footer policy links work**

-   **Tags:** nav, compliance
-   **Preconditions:** Policy pages deployed
-   **G/W/T:** Given landing open; When click Privacy; Then Privacy page loads
-   **Assertions:** Title contains "Privacy"
-   **Evidence:** Screenshot/URL
-   **Notes:** Exact paths **I don't know**

```gherkin
Scenario: Footer privacy link
  Given I open the landing page
  When I click "footer a[data-test=link-privacy]"
  Then I should see a Privacy Policy page
```

**TC-LP-008 | Trust badges visible**

-   **Tags:** trust, ui
-   **Preconditions:** Trust badges configured
-   **G/W/T:** Given landing open; When view trust area; Then badges visible with accessible names
-   **Assertions:** `aria-label` or alt present; tooltip/modal if applicable
-   **Evidence:** Accessibility snapshot
-   **Notes:** Badge list **I don't know**

```gherkin
Scenario: Trust badges accessible
  Given I open the landing page
  When I inspect "[data-test=trust-badges]"
  Then each badge has an accessible name and description
```

**TC-LP-009 | Notifications/messaging toast (info)**

-   **Tags:** messaging, ui
-   **Preconditions:** Frontend config enabled; trigger available
-   **G/W/T:** Given landing open; When info event fires; Then non-blocking toast appears
-   **Assertions:** Toast readable; dismissible; auto-hides
-   **Evidence:** Screenshot
-   **Notes:** Trigger mechanism **I don't know**

```gherkin
Scenario: Info toast displays
  Given I open the landing page with messaging enabled
  When an info event is triggered
  Then an aria-live polite toast appears and can be dismissed
```

**TC-LP-010 | No fatal JS errors**

-   **Tags:** stability, smoke
-   **Preconditions:** None
-   **G/W/T:** Given landing open; When console captured; Then no uncaught exceptions
-   **Assertions:** Zero `page.on('pageerror')`; zero severe console errors
-   **Evidence:** Console log
-   **Notes:** Known benign warnings may be filtered

```gherkin
Scenario: No fatal console errors
  Given I open the landing page
  When I monitor console
  Then there should be no uncaught exceptions
```

**TC-LP-011 | Responsive layout: mobile header**

-   **Tags:** responsive
-   **Preconditions:** Mobile viewport 375x812
-   **G/W/T:** Given mobile viewport; When load page; Then hamburger/menu and search affordance visible
-   **Assertions:** Elements not overlapping; tap targets ≥ 44px
-   **Evidence:** Screenshot
-   **Notes:** Breakpoints **I don't know**

```gherkin
Scenario: Mobile header renders
  Given I set viewport to a mobile size
  When I open the landing page
  Then the mobile header and navigation controls are visible and usable
```

**TC-LP-012 | Keyboard navigation (smoke)**

-   **Tags:** a11y, keyboard
-   **Preconditions:** None
-   **G/W/T:** Given landing open; When Tab through interactive elements; Then logical order and visible focus
-   **Assertions:** Focus ring visible; no traps
-   **Evidence:** Video/screencap
-   **Notes:** Focus management **I don't know**

```gherkin
Scenario: Keyboard tab order
  Given I open the landing page
  When I navigate with the keyboard
  Then focus moves in a logical order and is always visible
```

---

### Negative / Edge Cases (≥5)

**TC-LP-N01 | Slow network (3G)**

-   **Tags:** perf, resilience
-   **G/W/T:** Given throttled network; When load page; Then skeletons show; content paints without layout shift
-   **Assertions:** LCP under budget **I don't know**; no infinite spinners
-   **Evidence:** Perf trace (LCP/CLS)
-   **Notes:** Perf budgets **I don't know**

```gherkin
Scenario: Slow network fallback
  Given I throttle the network to Slow 3G
  When I open the landing page
  Then skeletons are shown and the page remains usable
```

**TC-LP-N02 | Content API failure for featured listings**

-   **Tags:** api-fail, resilience
-   **G/W/T:** Given API returns 500; When load page; Then show non-blocking error and retry
-   **Assertions:** Toast visible; retry button re-requests successfully (when API restored)
-   **Evidence:** Screenshot, network log

```gherkin
Scenario: Listings API 500
  Given the listings API returns a 500 error
  When I open the landing page
  Then a non-blocking error is shown and a retry is available
```

**TC-LP-N03 | Empty categories module**

-   **Tags:** empty-state
-   **G/W/T:** Given zero categories; When load page; Then hide section or show empty message
-   **Assertions:** No broken layout; accessible message if shown
-   **Evidence:** Screenshot

```gherkin
Scenario: No categories available
  Given the categories API returns an empty array
  When I open the landing page
  Then the categories section hides or shows a defined empty state
```

**TC-LP-N04 | Image CDN failure**

-   **Tags:** media, resilience
-   **G/W/T:** Given images 404; When load; Then placeholders appear; no layout shift
-   **Assertions:** `alt` text present; dimensions reserved
-   **Evidence:** Screenshot

```gherkin
Scenario: Listing images fail to load
  Given listing images return 404
  When I open the landing page
  Then placeholders are displayed and layout remains stable
```

**TC-LP-N05 | Third-party script blocked**

-   **Tags:** resilience
-   **G/W/T:** Given analytics/chat script blocked; When load; Then page still renders core modules
-   **Assertions:** No fatal errors; degraded features hidden gracefully
-   **Evidence:** Console log

```gherkin
Scenario: Third-party blocked
  Given analytics scripts are blocked
  When I open the landing page
  Then core content renders without fatal errors
```

**TC-LP-N06 | Routing 404 on hero CTA**

-   **Tags:** nav, error
-   **G/W/T:** Given CTA route misconfigured; When click CTA; Then user sees friendly fallback and Home link
-   **Assertions:** 404 page with guidance
-   **Evidence:** Screenshot

```gherkin
Scenario: CTA 404
  Given the hero CTA route is misconfigured
  When I click it
  Then I see a friendly 404 with a link back to the home/catalog
```

---

## Accessibility Checks (Automation + Manual)

-   Keyboard: all interactive elements reachable; no traps.
-   Focus: visible focus ring; programmatic focus on open/close of modals/toasts.
-   Landmarks & headings present (`header/nav/main/footer`); unique page title.
-   Images have `alt`; decorative images `alt=""`.
-   Color contrast: automated checks plus manual spot checks (brand palette).
-   Live regions: toasts use `aria-live="polite"`.
-   **Assertions:** Use Playwright's Axe (if integrated) — **I don't know** if allowed; otherwise manual verification.

---

## Non-Functional Checks

-   **Performance budgets:** LCP, CLS, TBT thresholds **I don't know** (recommend: LCP < 2.5s, CLS < 0.1 on mid-tier mobile).
-   **Resilience:** No uncaught JS exceptions during basic flows.
-   **Lazy-loading:** below-the-fold assets not fetched until needed.
-   **Caching:** Static assets served with long-cache headers — **I don't know** specifics.

---

## Defect Triage & Reporting

-   **Severity Scheme:**

    -   **Critical:** Core render/navigation broken; blocks release.
    -   **High:** Major module broken or severe a11y/perf regression; workaround exists.
    -   **Medium:** Non-blocking defect; minor visual/a11y/perf issue.
    -   **Low:** Cosmetic or content nit; no user impact.

-   **Report Fields:** Title, Steps to Reproduce, Actual vs Expected, Env/Build, Screenshots/Logs, Severity, Suspected Area.
-   **Example:** "Critical – Landing page fails to render hero in Safari iOS 16; blank above-the-fold; console shows uncaught TypeError."

---

## Acceptance Criteria (Release)

-   All **Critical** test cases pass in target browsers (desktop+mobile) and network profiles (normal + throttled).
-   No **Critical** open bugs; **High** defects have approved mitigations.
-   a11y smoke checks pass; no keyboard traps; focus visible.
-   Core performance meets agreed budgets (**I don't know** exact thresholds).

---

## ASCII Flow — Primary Journey

```
[Enter Landing URL]
        |
        v
 [Hero Visible?]--no-->[Show minimal fallback + retry link]
        |
       yes
        |
        v
 [Choose Path]-->[Search]-->[Results]
        |            ^
        |            |
        +-->[Featured Category]-->[Category Results]
        |            ^
        |            |
        +-->[Promo CTA]-->[Promo Details]
        |
        +-->[Footer Policies/Help]-->[Policy/Help Page]
```

---

## What I Don't Know (Gaps) & Evidence Needed

1. **Exact content & copy** (hero headline/subheadline, CTA labels, promo text).
   **Need:** Approved content spec or screenshots from design.
2. **Navigation targets & routes** (catalog URL, category param, help/policy URLs).
   **Need:** Route map / site map or router config.
3. **Selectors & data-test attributes** for Playwright.
   **Need:** Frontend DOM contract or a QA selectors guideline.
4. **Telemetry/analytics schema** (event names, properties, consent rules).
   **Need:** Analytics tracking plan with data dictionary.
5. **Performance budgets & accessibility tooling** (axe integration, thresholds).
   **Need:** Agreed NFRs, CI config, and tooling availability.

---

### How QA Can Implement Quickly (Playwright Tips)

-   Prefer stable `data-test="..."` selectors. If unavailable, request them.
-   Centralize env handling: `BASE_URL` via env var; fixtures for viewport profiles.
-   Add helpers for network mocking (API 500, empty arrays, image 404).
-   Capture artifacts on failure: `page.screenshot()`, console, network traces.

## Quick Navigation

### Documentation Sections

1. **[Content Management](content-management/)** - Landing page content management
2. **[Content Pages](content-pages/)** - Landing page specific content requirements
3. **[Performance](performance/)** - Performance requirements and testing guidelines
4. **[Provider Directory](provider-directory/)** - Landing page integration details
5. **[SEO Features](seo-features/)** - SEO requirements and implementation details
6. **[User Registration](user-registration/)** - User acquisition and registration flow

---

_Need help with the Landing Page? Check our [Support Documentation](/support/) or [Contact Support](/support/contact)._
