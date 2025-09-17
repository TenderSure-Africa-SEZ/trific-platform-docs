# Analytics - Landing Page

PostHog-powered analytics and tracking for the Trific landing page.

## PostHog Setup

**Installation & Initialization:**

```javascript
import posthog from "posthog-js";

posthog.init("YOUR_PROJECT_KEY", {
	api_host: "https://app.posthog.com",
	loaded: (posthog) => {
		if (process.env.NODE_ENV === "development") posthog.debug();
	},
});
```

## Core Event Tracking

**Landing Page Events:**

```typescript
interface LandingPageEvents {
	page_view: {
		page: "landing";
		referrer?: string;
		utm_source?: string;
		utm_campaign?: string;
	};
	cta_click: {
		cta_text: string;
		cta_position: "hero" | "section" | "footer";
		user_type: "client" | "provider";
	};
	category_click: {
		category_name: string;
		category_position: number;
	};
	search_initiated: {
		query: string;
		search_type: "header" | "hero";
	};
	registration_started: {
		user_type: "client" | "provider";
		source: "cta" | "navigation";
	};
}
```

**Event Implementation:**

```javascript
// Page view tracking
posthog.capture("page_view", {
	page: "landing",
	referrer: document.referrer,
	utm_source: urlParams.get("utm_source"),
});

// CTA click tracking
const trackCTAClick = (element) => {
	posthog.capture("cta_click", {
		cta_text: element.textContent,
		cta_position: element.dataset.position,
		user_type: element.dataset.userType,
	});
};

// Scroll depth tracking
let maxScroll = 0;
window.addEventListener("scroll", () => {
	const scrollPercent = Math.round(
		(window.scrollY / (document.body.scrollHeight - window.innerHeight)) *
			100
	);

	if (scrollPercent > maxScroll && [25, 50, 75, 90].includes(scrollPercent)) {
		maxScroll = scrollPercent;
		posthog.capture("scroll_depth", {
			depth: scrollPercent,
			page: "landing",
		});
	}
});
```

## User Properties & Identification

**Visitor Properties:**

```typescript
interface VisitorProperties {
	device_type: "desktop" | "mobile" | "tablet";
	browser: string;
	operating_system: string;
	screen_resolution: string;
	country?: string;
	timezone: string;
	first_visit: boolean;
	traffic_source: "organic" | "paid" | "social" | "direct" | "referral";
	utm_campaign?: string;
}
```

**User Identification:**

```javascript
// When user registers
posthog.identify(userId, {
	user_type: "client", // or 'provider'
	registration_date: new Date().toISOString(),
	registration_source: "landing_page",
});

posthog.people.set({
	email: userEmail,
	name: userName,
	user_type: userType,
});
```

## Conversion Funnels & A/B Testing

**Client Funnel:**

```javascript
const clientFunnel = [
	"page_view", // Land on page
	"cta_click", // Click get started
	"registration_started", // Begin registration
	"email_verified", // Complete verification
	"registration_completed", // Finish registration
];

// Track funnel step
posthog.capture("funnel_step", {
	funnel: "client_acquisition",
	step: "registration_started",
	step_number: 3,
});
```

**A/B Testing:**

```javascript
// Feature flag implementation
const showNewHero = posthog.isFeatureEnabled("new-hero-design");

if (showNewHero) {
	posthog.capture("ab_test_exposure", {
		test: "hero_design",
		variant: "new_design",
	});
}

// Test runner
const runABTest = (testId) => {
	const variant = posthog.getFeatureFlag(testId);
	posthog.capture("ab_test_exposure", {
		test: testId,
		variant: variant,
	});
	return variant;
};
```

## Performance Analytics

**Core Web Vitals Tracking:**

```javascript
import { getCLS, getLCP } from "web-vitals";

getCLS((metric) => {
	posthog.capture("web_vital", {
		name: "CLS",
		value: metric.value,
		rating: metric.rating,
	});
});

getLCP((metric) => {
	posthog.capture("web_vital", {
		name: "LCP",
		value: metric.value,
		rating: metric.rating,
	});
});

// Page load time
window.addEventListener("load", () => {
	const loadTime =
		performance.timing.loadEventEnd - performance.timing.navigationStart;
	posthog.capture("page_load_time", {
		page: "landing",
		load_time_ms: loadTime,
	});
});
```

## Dashboards & Monitoring

**Key Metrics Dashboard:**

-   Page views (daily/weekly/monthly)
-   Conversion rates (registration completion)
-   Traffic sources breakdown
-   User flow analysis
-   Drop-off point identification

**Performance Dashboard:**

-   Core Web Vitals (LCP, FID, CLS scores)
-   Average page load times
-   JavaScript error rates
-   Device performance metrics

**Real-time Alerts:**

```javascript
const criticalEvents = [
	"registration_error",
	"payment_failed",
	"page_load_timeout",
	"high_bounce_rate",
];

criticalEvents.forEach((event) => {
	posthog.capture(event, {
		alert: true,
		severity: "high",
	});
});
```

## Privacy & Compliance

**GDPR Compliance:**

```javascript
// Consent-based tracking
if (hasUserConsent()) {
	posthog.opt_in_capturing();
} else {
	posthog.opt_out_capturing();
}

// Respect do-not-track
if (navigator.doNotTrack === "1") {
	posthog.opt_out_capturing();
}
```

**Data Retention:**

-   Events: 1 year retention
-   User properties: Until deletion request
-   Session recordings: 30 days
-   Error logs: 90 days

---

_Next: [Optimization](../optimization/) →_
