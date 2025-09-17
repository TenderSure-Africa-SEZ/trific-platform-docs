# Webhook Events - Payment Events

Payment webhooks notify your application about payment-related events in real-time, enabling you to update your systems and respond to payment status changes.

## Overview

Payment webhooks are triggered for:

-   **Payment Processing** - Status changes during payment processing
-   **Escrow Management** - Deposits, holds, and releases from escrow
-   **Milestone Payments** - Milestone-based payment approvals and releases
-   **Refunds & Disputes** - Refund processing and dispute resolutions
-   **Failed Payments** - Payment failures and retry attempts

## Event Types

### Core Payment Events

#### `payment.created`

Triggered when a new payment is initiated.

```json
{
	"id": "evt_payment_created_123",
	"type": "payment.created",
	"created": 1643723400,
	"data": {
		"object": {
			"id": "pay_abc123def456",
			"amount": 15000.0,
			"currency": "USD",
			"status": "pending",
			"payment_method": {
				"id": "pm_card789",
				"type": "credit_card",
				"brand": "visa",
				"last4": "4242"
			},
			"client": {
				"id": "client_xyz789",
				"email": "john.doe@acmecorp.com",
				"name": "John Doe"
			},
			"project": {
				"id": "proj_abc123",
				"title": "E-commerce Platform Development"
			},
			"description": "Payment for milestone 2 completion",
			"metadata": {
				"milestone_id": "milestone_456",
				"invoice_id": "inv_789"
			},
			"created_at": "2024-01-22T15:30:00Z"
		}
	}
}
```

#### `payment.succeeded`

Triggered when a payment is successfully processed.

```json
{
	"id": "evt_payment_succeeded_456",
	"type": "payment.succeeded",
	"created": 1643723460,
	"data": {
		"object": {
			"id": "pay_abc123def456",
			"amount": 15000.0,
			"currency": "USD",
			"status": "succeeded",
			"payment_method": {
				"id": "pm_card789",
				"type": "credit_card",
				"brand": "visa",
				"last4": "4242"
			},
			"processing_fee": {
				"amount": 450.0,
				"percentage": 3.0
			},
			"net_amount": 14550.0,
			"processed_at": "2024-01-22T15:32:15Z",
			"settlement_date": "2024-01-24T15:32:15Z",
			"transaction_id": "txn_gateway_123456789"
		}
	}
}
```

#### `payment.failed`

Triggered when a payment fails to process.

```json
{
	"id": "evt_payment_failed_789",
	"type": "payment.failed",
	"created": 1643723520,
	"data": {
		"object": {
			"id": "pay_def456ghi789",
			"amount": 8500.0,
			"currency": "USD",
			"status": "failed",
			"failure_code": "card_declined",
			"failure_message": "Your card was declined.",
			"failure_reason": "generic_decline",
			"last_payment_error": {
				"code": "card_declined",
				"message": "Your card was declined.",
				"decline_code": "generic_decline",
				"charge_id": "ch_failed_123"
			},
			"retry_attempt": 1,
			"max_retries": 3,
			"next_retry_at": "2024-01-22T16:00:00Z",
			"failed_at": "2024-01-22T15:35:10Z"
		}
	}
}
```

### Escrow Events

#### `escrow.deposited`

Triggered when funds are deposited into escrow.

```json
{
	"id": "evt_escrow_deposited_123",
	"type": "escrow.deposited",
	"created": 1643723600,
	"data": {
		"object": {
			"id": "escrow_abc123",
			"project_id": "proj_def456",
			"amount": 25000.0,
			"currency": "USD",
			"status": "held",
			"client": {
				"id": "client_xyz789",
				"name": "ACME Corporation"
			},
			"provider": {
				"id": "prov_abc123",
				"name": "TechCorp Solutions"
			},
			"deposit_source": {
				"payment_id": "pay_source123",
				"payment_method": "credit_card"
			},
			"hold_period": {
				"start": "2024-01-22T16:00:00Z",
				"release_conditions": ["milestone_approval", "time_period"],
				"auto_release_date": "2024-02-21T16:00:00Z"
			},
			"deposited_at": "2024-01-22T16:00:00Z"
		}
	}
}
```

#### `escrow.released`

Triggered when escrowed funds are released to the provider.

```json
{
	"id": "evt_escrow_released_456",
	"type": "escrow.released",
	"created": 1643810000,
	"data": {
		"object": {
			"id": "escrow_abc123",
			"amount": 12500.0,
			"currency": "USD",
			"status": "released",
			"release_type": "milestone_completion",
			"milestone": {
				"id": "milestone_789",
				"title": "Frontend Development Complete",
				"approved_by": "client_xyz789",
				"approved_at": "2024-01-23T14:30:00Z"
			},
			"platform_fee": {
				"amount": 625.0,
				"percentage": 5.0
			},
			"provider_amount": 11875.0,
			"payout_method": "bank_transfer",
			"payout_id": "payout_def789",
			"released_at": "2024-01-23T16:00:00Z"
		}
	}
}
```

#### `escrow.refunded`

Triggered when escrowed funds are refunded to the client.

```json
{
	"id": "evt_escrow_refunded_789",
	"type": "escrow.refunded",
	"created": 1643896400,
	"data": {
		"object": {
			"id": "escrow_def456",
			"amount": 5000.0,
			"currency": "USD",
			"status": "refunded",
			"refund_reason": "project_cancelled",
			"refund_type": "full",
			"original_amount": 5000.0,
			"refund_amount": 4850.0,
			"processing_fee_retained": 150.0,
			"refund_method": "original_payment_method",
			"refund_id": "ref_abc123",
			"initiated_by": "client_xyz789",
			"approved_by": "admin_support_001",
			"refunded_at": "2024-01-24T16:00:00Z"
		}
	}
}
```

### Milestone Payment Events

#### `milestone.payment_requested`

Triggered when a provider requests payment for a completed milestone.

```json
{
	"id": "evt_milestone_payment_requested_123",
	"type": "milestone.payment_requested",
	"created": 1643982800,
	"data": {
		"object": {
			"id": "milestone_abc123",
			"project_id": "proj_def456",
			"title": "API Development Complete",
			"description": "All backend APIs developed and tested",
			"amount": 8000.0,
			"currency": "USD",
			"status": "pending_approval",
			"provider": {
				"id": "prov_abc123",
				"name": "TechCorp Solutions"
			},
			"deliverables": [
				{
					"name": "API Documentation",
					"url": "https://docs.example.com/api",
					"submitted_at": "2024-01-25T14:00:00Z"
				},
				{
					"name": "Test Results",
					"url": "https://reports.example.com/tests",
					"submitted_at": "2024-01-25T14:05:00Z"
				}
			],
			"requested_at": "2024-01-25T16:00:00Z",
			"due_date": "2024-01-27T16:00:00Z"
		}
	}
}
```

#### `milestone.payment_approved`

Triggered when a client approves a milestone payment.

```json
{
	"id": "evt_milestone_payment_approved_456",
	"type": "milestone.payment_approved",
	"created": 1644069200,
	"data": {
		"object": {
			"id": "milestone_abc123",
			"amount": 8000.0,
			"currency": "USD",
			"status": "approved",
			"approved_by": {
				"id": "client_xyz789",
				"name": "John Doe",
				"role": "Project Owner"
			},
			"approval_notes": "Excellent work on the API development. All requirements met.",
			"escrow_release": {
				"escrow_id": "escrow_def456",
				"release_amount": 8000.0,
				"release_scheduled": "2024-01-26T16:00:00Z"
			},
			"approved_at": "2024-01-26T14:30:00Z"
		}
	}
}
```

#### `milestone.payment_rejected`

Triggered when a client rejects a milestone payment request.

```json
{
	"id": "evt_milestone_payment_rejected_789",
	"type": "milestone.payment_rejected",
	"created": 1644155600,
	"data": {
		"object": {
			"id": "milestone_def789",
			"amount": 6000.0,
			"currency": "USD",
			"status": "rejected",
			"rejected_by": {
				"id": "client_xyz789",
				"name": "John Doe"
			},
			"rejection_reason": "deliverables_incomplete",
			"rejection_notes": "The mobile app testing is incomplete. Please address the issues listed in the feedback before resubmission.",
			"feedback": [
				"Login functionality not working on iOS",
				"Payment flow has validation errors",
				"Missing error handling for network timeouts"
			],
			"resubmission_allowed": true,
			"rejected_at": "2024-01-27T10:15:00Z"
		}
	}
}
```

### Dispute Events

#### `dispute.created`

Triggered when a payment dispute is initiated.

```json
{
	"id": "evt_dispute_created_123",
	"type": "dispute.created",
	"created": 1644242000,
	"data": {
		"object": {
			"id": "disp_abc123def456",
			"payment_id": "pay_disputed_789",
			"amount": 12000.0,
			"currency": "USD",
			"reason": "unrecognized_charge",
			"status": "warning_needs_response",
			"evidence_due_by": "2024-02-05T23:59:59Z",
			"client": {
				"id": "client_xyz789",
				"name": "ACME Corporation"
			},
			"provider": {
				"id": "prov_def456",
				"name": "Design Studio Pro"
			},
			"project": {
				"id": "proj_ghi789",
				"title": "Brand Identity Design"
			},
			"created_at": "2024-01-28T16:00:00Z",
			"network_reason_code": "4855"
		}
	}
}
```

#### `dispute.funds_withdrawn`

Triggered when funds are withdrawn due to a dispute.

```json
{
	"id": "evt_dispute_funds_withdrawn_456",
	"type": "dispute.funds_withdrawn",
	"created": 1644328400,
	"data": {
		"object": {
			"id": "disp_abc123def456",
			"amount": 12000.0,
			"currency": "USD",
			"status": "under_review",
			"withdrawn_from": {
				"account_id": "acct_provider_456",
				"account_name": "Design Studio Pro",
				"withdrawal_method": "bank_account_debit"
			},
			"funds_held": true,
			"hold_reason": "dispute_investigation",
			"withdrawn_at": "2024-01-29T16:00:00Z"
		}
	}
}
```

#### `dispute.funds_reinstated`

Triggered when disputed funds are reinstated to the provider.

```json
{
	"id": "evt_dispute_funds_reinstated_789",
	"type": "dispute.funds_reinstated",
	"created": 1644414800,
	"data": {
		"object": {
			"id": "disp_abc123def456",
			"amount": 12000.0,
			"currency": "USD",
			"status": "won",
			"resolution": "evidence_accepted",
			"reinstated_to": {
				"account_id": "acct_provider_456",
				"account_name": "Design Studio Pro"
			},
			"resolution_notes": "Sufficient evidence provided to support the charge. Project deliverables confirmed.",
			"reinstated_at": "2024-01-30T16:00:00Z"
		}
	}
}
```

### Refund Events

#### `refund.created`

Triggered when a refund is initiated.

```json
{
	"id": "evt_refund_created_123",
	"type": "refund.created",
	"created": 1644501200,
	"data": {
		"object": {
			"id": "ref_abc123def456",
			"payment_id": "pay_original_789",
			"amount": 7500.0,
			"currency": "USD",
			"reason": "requested_by_customer",
			"status": "pending",
			"refund_type": "partial",
			"original_amount": 15000.0,
			"client": {
				"id": "client_xyz789",
				"name": "ACME Corporation"
			},
			"provider": {
				"id": "prov_abc123",
				"name": "TechCorp Solutions"
			},
			"project": {
				"id": "proj_def456",
				"title": "E-commerce Platform"
			},
			"refund_reason_details": "Project scope reduced by 50%",
			"created_at": "2024-01-31T16:00:00Z"
		}
	}
}
```

#### `refund.succeeded`

Triggered when a refund is successfully processed.

```json
{
	"id": "evt_refund_succeeded_456",
	"type": "refund.succeeded",
	"created": 1644587600,
	"data": {
		"object": {
			"id": "ref_abc123def456",
			"amount": 7500.0,
			"currency": "USD",
			"status": "succeeded",
			"refund_method": "original_payment_method",
			"processing_time": "5-10_business_days",
			"transaction_id": "refund_txn_123456789",
			"processed_at": "2024-02-01T16:00:00Z",
			"expected_arrival": "2024-02-08T16:00:00Z"
		}
	}
}
```

### Payout Events

#### `payout.created`

Triggered when a payout to a provider is created.

```json
{
	"id": "evt_payout_created_123",
	"type": "payout.created",
	"created": 1644674000,
	"data": {
		"object": {
			"id": "payout_abc123def456",
			"amount": 18750.0,
			"currency": "USD",
			"status": "pending",
			"provider": {
				"id": "prov_abc123",
				"name": "TechCorp Solutions",
				"account_id": "acct_provider_123"
			},
			"payout_method": {
				"type": "bank_transfer",
				"bank": {
					"name": "Chase Bank",
					"last4": "1234",
					"routing_number_last4": "5678"
				}
			},
			"source_payments": [
				{
					"payment_id": "pay_123",
					"amount": 10000.0,
					"project": "E-commerce Platform"
				},
				{
					"payment_id": "pay_456",
					"amount": 8750.0,
					"project": "Mobile App Development"
				}
			],
			"fees": {
				"platform_fee": 937.5,
				"processing_fee": 62.5
			},
			"created_at": "2024-02-02T16:00:00Z"
		}
	}
}
```

#### `payout.paid`

Triggered when a payout is successfully sent to a provider.

```json
{
	"id": "evt_payout_paid_456",
	"type": "payout.paid",
	"created": 1644760400,
	"data": {
		"object": {
			"id": "payout_abc123def456",
			"amount": 18750.0,
			"currency": "USD",
			"status": "paid",
			"arrival_date": "2024-02-05T16:00:00Z",
			"transaction_id": "payout_txn_987654321",
			"paid_at": "2024-02-03T16:00:00Z"
		}
	}
}
```

## Webhook Payload Structure

### Event Object Structure

```typescript
interface WebhookEvent {
	id: string; // Unique event identifier
	type: string; // Event type (e.g., "payment.succeeded")
	created: number; // Unix timestamp
	api_version: string; // API version (e.g., "2024-01-01")
	data: {
		object: any; // The object related to the event
		previous_attributes?: any; // Previous values (for update events)
	};
	livemode: boolean; // true for live events, false for test
	pending_webhooks: number; // Number of pending webhook deliveries
	request: {
		id: string; // API request ID that triggered this event
		idempotency_key?: string; // Idempotency key if provided
	};
}
```

## Webhook Security

### Signature Verification

Each webhook includes a signature in the `TRIFIC-Signature` header:

```http
TRIFIC-Signature: t=1643723400,v1=5257a869e7ecebeda32affa62cdca3fa51cad7e77a0e56ff536d0ce8e108d8bd
```

#### Verification Example (Node.js)

```javascript
const crypto = require("crypto");

function verifyWebhookSignature(payload, signature, secret) {
	const elements = signature.split(",");
	const timestamp = elements.find((el) => el.startsWith("t=")).split("=")[1];
	const sig = elements.find((el) => el.startsWith("v1=")).split("=")[1];

	// Create expected signature
	const signedPayload = timestamp + "." + payload;
	const expectedSig = crypto
		.createHmac("sha256", secret)
		.update(signedPayload, "utf8")
		.digest("hex");

	// Compare signatures
	return crypto.timingSafeEqual(
		Buffer.from(sig, "hex"),
		Buffer.from(expectedSig, "hex")
	);
}

// Usage
const rawBody = req.body; // Raw request body as string
const signature = req.headers["TRIFIC-signature"];
const webhookSecret = process.env.TRIFIC_WEBHOOK_SECRET;

if (!verifyWebhookSignature(rawBody, signature, webhookSecret)) {
	return res.status(400).send("Invalid signature");
}
```

### Best Practices

#### Idempotency

Handle duplicate events by tracking processed event IDs:

```javascript
const processedEvents = new Set();

function handleWebhook(event) {
  // Check if already processed
  if (processedEvents.has(event.id)) {
    return res.status(200).send('Event already processed');
  }

  // Process the event
  await processEvent(event);

  // Mark as processed
  processedEvents.add(event.id);

  return res.status(200).send('Event processed');
}
```

#### Retry Logic

Implement exponential backoff for failed webhook processing:

```javascript
async function processEventWithRetry(event, maxRetries = 3) {
	for (let attempt = 1; attempt <= maxRetries; attempt++) {
		try {
			await processEvent(event);
			return; // Success
		} catch (error) {
			if (attempt === maxRetries) {
				throw error; // Final attempt failed
			}

			// Exponential backoff
			const delay = Math.pow(2, attempt) * 1000;
			await new Promise((resolve) => setTimeout(resolve, delay));
		}
	}
}
```

---

_Next: [Contract Events](/api/webhooks/contract-events) →_
