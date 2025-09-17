# Testing - Landing Page

E2E testing workflow and BDD scenarios for comprehensive quality assurance.

## Testing Framework

**Playwright Configuration:**

```javascript
// playwright.config.js
import { defineConfig } from "@playwright/test";

export default defineConfig({
	testDir: "./tests",
	timeout: 30000,
	expect: { timeout: 5000 },
	fullyParallel: true,
	retries: process.env.CI ? 2 : 0,
	use: {
		baseURL: "http://localhost:3000",
		trace: "on-first-retry",
		screenshot: "only-on-failure",
	},
	projects: [
		{ name: "chromium", use: { ...devices["Desktop Chrome"] } },
		{ name: "mobile", use: { ...devices["iPhone 12"] } },
	],
});
```

## BDD Test Scenarios

**Core Landing Page Tests:**

```gherkin
Feature: Landing page functionality
  Scenario: Page loads successfully
    Given I navigate to the landing page
    Then the page should load within 3 seconds
    And the hero section should be visible
    And all critical images should load

  Scenario: Hero section displays correctly
    Given I am on the landing page
    Then I should see the main headline
    And I should see the primary CTA button
    And the hero image should be loaded

  Scenario: Featured categories are interactive
    Given I am on the landing page
    When I scroll to the categories section
    Then I should see at least 6 category cards
    When I click on a category card
    Then I should navigate to the provider directory
    And the category filter should be applied
```

**Registration Flow Tests:**

```gherkin
Feature: User registration
  Scenario: Client registration flow
    Given I am on the landing page
    When I click the "Get Started" button
    Then I should see the client registration form
    When I fill in valid client details
    And I submit the form
    Then I should see email verification message

  Scenario: Provider registration flow
    Given I am on the landing page
    When I click "Become a Provider"
    Then I should see the provider application form
    When I complete the pre-qualification
    Then I should proceed to detailed application
```

## Test Implementation

**Page Object Model:**

```javascript
// pages/LandingPage.js
export class LandingPage {
	constructor(page) {
		this.page = page;
		this.heroHeadline = page.locator("h1");
		this.primaryCTA = page.locator('[data-testid="primary-cta"]');
		this.providerCTA = page.locator('[data-testid="provider-cta"]');
		this.categoryCards = page.locator('[data-testid="category-card"]');
		this.searchInput = page.locator('[data-testid="search-input"]');
	}

	async goto() {
		await this.page.goto("/");
	}

	async clickPrimaryCTA() {
		await this.primaryCTA.click();
	}

	async search(query) {
		await this.searchInput.click();
		await this.searchInput.fill(query);
		await this.searchInput.press("Enter");
	}
}
```

**Core Tests:**

```javascript
// tests/landing-page.spec.js
import { test, expect } from "@playwright/test";
import { LandingPage } from "../pages/LandingPage";

test.describe("Landing Page", () => {
	let landingPage;

	test.beforeEach(async ({ page }) => {
		landingPage = new LandingPage(page);
		await landingPage.goto();
	});

	test("loads successfully with all elements", async () => {
		await expect(landingPage.heroHeadline).toBeVisible();
		await expect(landingPage.primaryCTA).toBeVisible();
		await expect(landingPage.categoryCards.first()).toBeVisible();

		const performanceMetrics = await page.evaluate(() => ({
			loadTime:
				performance.timing.loadEventEnd -
				performance.timing.navigationStart,
		}));

		expect(performanceMetrics.loadTime).toBeLessThan(3000);
	});

	test("category navigation works", async ({ page }) => {
		await landingPage.clickCategoryCard(0);
		await page.waitForURL(/.*\/providers.*/);
		expect(page.url()).toContain("/providers");
	});
});
```

## Performance & Visual Testing

**Performance Tests:**

-   Page load time <3 seconds
-   Core Web Vitals compliance (LCP <2.5s, FID <100ms, CLS <0.1)
-   Image loading optimization
-   JavaScript execution time

**Visual Regression:**

```javascript
test("landing page matches design", async ({ page }) => {
	await page.goto("/");
	await expect(page).toHaveScreenshot("landing-page.png");
});
```

**Mobile Testing:**

-   Responsive layout validation
-   Touch target sizing (≥44px)
-   Mobile navigation functionality
-   Performance on mobile devices

**Accessibility Testing:**

-   WCAG 2.1 AA compliance
-   Keyboard navigation
-   Screen reader compatibility
-   Color contrast validation

---

_Complete: All home-landing documentation updated_ ✓

    	// Full page screenshot
    	await expect(page).toHaveScreenshot("landing-page-full.png", {
    		fullPage: true,
    		threshold: 0.2,
    	});

    	// Hero section only
    	await expect(
    		page.locator('[data-testid="hero-section"]')
    	).toHaveScreenshot("hero-section.png");
    });

    test("mobile layout matches design", async ({ page }) => {
    	await page.setViewportSize({ width: 375, height: 812 });
    	await page.goto("/");

    	await expect(page).toHaveScreenshot("landing-page-mobile.png", {
    		fullPage: true,
    	});
    });

});

````

## Performance Testing

### Core Web Vitals

```javascript
// tests/performance.spec.js
import { test, expect } from "@playwright/test";

test("Core Web Vitals", async ({ page }) => {
	await page.goto("/");

	const metrics = await page.evaluate(() => {
		return new Promise((resolve) => {
			new PerformanceObserver((list) => {
				const entries = list.getEntries();
				const vitals = {};

				entries.forEach((entry) => {
					if (entry.name === "LCP") vitals.lcp = entry.value;
					if (entry.name === "FID") vitals.fid = entry.value;
					if (entry.name === "CLS") vitals.cls = entry.value;
				});

				resolve(vitals);
			}).observe({ entryTypes: ["web-vitals"] });
		});
	});

	// Core Web Vitals thresholds
	if (metrics.lcp) expect(metrics.lcp).toBeLessThan(2500);
	if (metrics.fid) expect(metrics.fid).toBeLessThan(100);
	if (metrics.cls) expect(metrics.cls).toBeLessThan(0.1);
});
````

## Accessibility Testing

### A11y Compliance

```javascript
// tests/accessibility.spec.js
import { test, expect } from "@playwright/test";
import { injectAxe, checkA11y } from "axe-playwright";

test.describe("Accessibility", () => {
	test("landing page is accessible", async ({ page }) => {
		await page.goto("/");
		await injectAxe(page);

		await checkA11y(page, null, {
			axeOptions: {
				rules: {
					"color-contrast": { enabled: true },
					keyboard: { enabled: true },
					"aria-labels": { enabled: true },
				},
			},
		});
	});

	test("keyboard navigation works", async ({ page }) => {
		await page.goto("/");

		// Tab through interactive elements
		await page.keyboard.press("Tab");
		await expect(page.locator(":focus")).toBeVisible();

		// Should focus on primary CTA
		await expect(
			page.locator('[data-testid="primary-cta"]:focus')
		).toBeVisible();
	});
});
```

## API Integration Testing

### Mock API Responses

```javascript
// tests/api-integration.spec.js
import { test, expect } from "@playwright/test";

test("handles API failures gracefully", async ({ page }) => {
	// Mock API failure
	await page.route("**/api/categories", (route) => {
		route.fulfill({
			status: 500,
			contentType: "application/json",
			body: JSON.stringify({ error: "Server error" }),
		});
	});

	await page.goto("/");

	// Should show fallback content
	await expect(
		page.locator('[data-testid="categories-fallback"]')
	).toBeVisible();
});
```

## Cross-Browser Testing

### Browser Compatibility

```javascript
// tests/cross-browser.spec.js
test.describe("Cross-browser compatibility", () => {
	["chromium", "firefox", "webkit"].forEach((browserName) => {
		test(`works in ${browserName}`, async ({ browser }) => {
			const context = await browser.newContext();
			const page = await context.newPage();

			await page.goto("/");

			// Test core functionality
			await expect(page.locator("h1")).toBeVisible();
			await page.click('[data-testid="primary-cta"]');
			await expect(page).toHaveURL(/.*\/register.*/);
		});
	});
});
```

## Test Data Management

### Test Fixtures

```javascript
// fixtures/test-data.js
export const testData = {
	validClient: {
		firstName: "John",
		lastName: "Doe",
		email: "john.doe@example.com",
		password: "SecurePass123!",
	},

	validProvider: {
		businessName: "Test Services LLC",
		email: "provider@example.com",
		businessType: "company",
		yearsExperience: 5,
	},
};
```

## Continuous Integration

### GitHub Actions

```yaml
# .github/workflows/e2e-tests.yml
name: E2E Tests
on: [push, pull_request]

jobs:
    test:
        runs-on: ubuntu-latest
        steps:
            - uses: actions/checkout@v3
            - uses: actions/setup-node@v3
              with:
                  node-version: 18

            - name: Install dependencies
              run: npm ci

            - name: Install Playwright
              run: npx playwright install --with-deps

            - name: Run E2E tests
              run: npx playwright test

            - name: Upload test results
              uses: actions/upload-artifact@v3
              if: always()
              with:
                  name: playwright-report
                  path: playwright-report/
```

## Test Reporting

### Custom Reporter

```javascript
// utils/custom-reporter.js
class CustomReporter {
	onTestEnd(test, result) {
		if (result.status === "failed") {
			// Send failure notification
			this.notifyFailure(test, result);
		}
	}

	async notifyFailure(test, result) {
		// Integration with monitoring service
		await fetch("https://monitoring.example.com/alert", {
			method: "POST",
			body: JSON.stringify({
				test: test.title,
				error: result.error?.message,
				timestamp: new Date().toISOString(),
			}),
		});
	}
}
```

---

_All home landing documentation updated successfully! 🎉_
