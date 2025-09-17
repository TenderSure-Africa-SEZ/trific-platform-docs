# Contract Events Webhooks

Webhook events related to contract lifecycle and management.

## Event Types

### contract.created

Triggered when a new contract is created.

### contract.signed

Triggered when all parties have signed the contract.

### contract.modified

Triggered when contract terms are modified.

### contract.completed

Triggered when a contract is marked as completed.

### contract.cancelled

Triggered when a contract is cancelled.

### contract.disputed

Triggered when a dispute is raised on a contract.

## Payload Structure

### contract.created

```json
{
	"event": "contract.created",
	"timestamp": "2025-09-17T10:00:00Z",
	"data": {
		"contract_id": "contract_123",
		"client_id": "client_456",
		"provider_id": "provider_789",
		"job_id": "job_101",
		"status": "pending_signatures",
		"value": 5000,
		"created_at": "2025-09-17T10:00:00Z"
	}
}
```

### contract.signed

```json
{
	"event": "contract.signed",
	"timestamp": "2025-09-17T11:00:00Z",
	"data": {
		"contract_id": "contract_123",
		"signed_by": "client_456",
		"signature_date": "2025-09-17T11:00:00Z",
		"all_signed": true,
		"status": "active"
	}
}
```

## Implementation

Configure your webhook endpoint to receive these events at your specified URL. Ensure your endpoint:

1. Returns a 200 HTTP status code
2. Responds within 30 seconds
3. Validates the webhook signature
4. Handles event idempotency
