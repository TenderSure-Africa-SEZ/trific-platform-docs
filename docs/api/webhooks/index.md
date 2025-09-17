# Webhooks

Webhook system for real-time notifications about platform events.

## Overview

Webhooks allow your application to receive real-time notifications when events occur on the Trific platform. This enables you to keep your systems in sync and respond immediately to important changes.

## Event Categories

### Payment Events

Notifications about payment processing, confirmations, and failures.

-   [Payment Events Documentation](/api/webhooks/payment-events)

### Contract Events

Notifications about contract lifecycle events.

-   [Contract Events Documentation](/api/webhooks/contract-events)

### Job Events

Notifications about job postings, applications, and completions.

-   [Job Events Documentation](/api/webhooks/job-events)

### User Events

Notifications about user registration, verification, and profile changes.

-   [User Events Documentation](/api/webhooks/user-events)

## Setup

1. Configure your webhook endpoint URL
2. Select the events you want to receive
3. Verify your endpoint receives test events
4. Implement signature verification for security

## Security

All webhook payloads are signed with your webhook secret. Verify signatures to ensure authenticity.

## Retry Policy

Failed webhooks are retried with exponential backoff:

-   Immediate retry
-   1 minute later
-   5 minutes later
-   15 minutes later
-   1 hour later (final attempt)
