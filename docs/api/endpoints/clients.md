# API Endpoints - Clients

The Clients API enables management of client profiles, preferences, and account information within the Trific Platform ecosystem.

## Overview

The Clients API provides endpoints for:

-   **Client Profile Management** - Create, read, update client profiles
-   **Preferences & Settings** - Manage client preferences and configurations
-   **Project History** - Access client's project and engagement history
-   **Team Management** - Manage team members and permissions
-   **Billing & Payments** - Handle billing information and payment methods

## Base URL

```
https://api.trific.com/v1/clients
```

## Authentication

All endpoints require authentication via API key or OAuth 2.0:

```http
Authorization: Bearer YOUR_ACCESS_TOKEN
X-API-Key: YOUR_API_KEY
```

## Endpoints

### List Clients

Retrieve a paginated list of clients. Requires admin or management permissions.

```http
GET /clients
```

#### Query Parameters

| Parameter        | Type    | Description                                            |
| ---------------- | ------- | ------------------------------------------------------ |
| `limit`          | integer | Number of results per page (1-100, default: 20)        |
| `offset`         | integer | Number of results to skip (default: 0)                 |
| `status`         | string  | Filter by status: `active`, `inactive`, `suspended`    |
| `created_after`  | string  | Filter by creation date (ISO 8601)                     |
| `created_before` | string  | Filter by creation date (ISO 8601)                     |
| `company_size`   | string  | Filter by company size                                 |
| `industry`       | string  | Filter by industry                                     |
| `sort`           | string  | Sort by: `created_at`, `last_active`, `projects_count` |
| `order`          | string  | Sort order: `asc`, `desc`                              |

#### Example Request

```bash
curl -X GET "https://api.trific.com/v1/clients" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -G \
  -d "status=active" \
  -d "company_size=medium" \
  -d "limit=10" \
  -d "sort=created_at" \
  -d "order=desc"
```

#### Response

```json
{
	"data": [
		{
			"id": "client_abc123",
			"email": "john.doe@acmecorp.com",
			"first_name": "John",
			"last_name": "Doe",
			"display_name": "John Doe",
			"avatar_url": "https://cdn.trific.com/avatars/client123.jpg",
			"company": {
				"name": "ACME Corporation",
				"website": "https://acmecorp.com",
				"industry": "Technology",
				"size": "medium",
				"location": {
					"country": "US",
					"region": "California",
					"city": "San Francisco"
				}
			},
			"contact_info": {
				"phone": "+1-555-0123",
				"timezone": "America/Los_Angeles",
				"preferred_language": "en"
			},
			"account_info": {
				"status": "active",
				"account_type": "business",
				"member_since": "2023-08-15T10:30:00Z",
				"last_active": "2024-01-20T14:25:00Z",
				"subscription_tier": "professional"
			},
			"stats": {
				"total_projects": 12,
				"active_projects": 3,
				"total_spent": 125000.0,
				"avg_project_value": 10416.67,
				"providers_worked_with": 8,
				"repeat_engagement_rate": 0.75
			},
			"preferences": {
				"communication_method": "email",
				"project_types": ["web-development", "mobile-apps"],
				"budget_range": {
					"min": 5000,
					"max": 50000,
					"currency": "USD"
				}
			},
			"created_at": "2023-08-15T10:30:00Z",
			"updated_at": "2024-01-18T16:45:00Z"
		}
	],
	"pagination": {
		"limit": 10,
		"offset": 0,
		"total": 1247,
		"has_more": true
	},
	"meta": {
		"total_active": 1198,
		"total_business_accounts": 856,
		"avg_projects_per_client": 8.5,
		"top_industries": {
			"Technology": 342,
			"Healthcare": 198,
			"Finance": 156
		}
	}
}
```

### Get Client

Retrieve detailed information about a specific client.

```http
GET /clients/{client_id}
```

#### Path Parameters

| Parameter   | Type   | Description              |
| ----------- | ------ | ------------------------ |
| `client_id` | string | Unique client identifier |

#### Example Request

```bash
curl -X GET "https://api.trific.com/v1/clients/client_abc123" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Content-Type: application/json"
```

#### Response

```json
{
	"data": {
		"id": "client_abc123",
		"email": "john.doe@acmecorp.com",
		"first_name": "John",
		"last_name": "Doe",
		"display_name": "John Doe",
		"avatar_url": "https://cdn.trific.com/avatars/client123.jpg",
		"bio": "Product Manager with 8+ years experience in tech startups",
		"company": {
			"name": "ACME Corporation",
			"legal_name": "ACME Corporation Inc.",
			"website": "https://acmecorp.com",
			"industry": "Technology",
			"sub_industry": "SaaS",
			"size": "medium",
			"employee_count": "51-200",
			"founded_year": 2018,
			"description": "Leading provider of business automation software",
			"logo_url": "https://cdn.trific.com/companies/acme.jpg",
			"location": {
				"country": "US",
				"country_name": "United States",
				"region": "California",
				"city": "San Francisco",
				"address": "123 Market Street, San Francisco, CA 94105",
				"timezone": "America/Los_Angeles",
				"coordinates": {
					"lat": 37.7749,
					"lng": -122.4194
				}
			}
		},
		"contact_info": {
			"phone": "+1-555-0123",
			"secondary_phone": "+1-555-0124",
			"timezone": "America/Los_Angeles",
			"preferred_language": "en",
			"working_hours": {
				"monday": { "start": "09:00", "end": "17:00" },
				"tuesday": { "start": "09:00", "end": "17:00" },
				"wednesday": { "start": "09:00", "end": "17:00" },
				"thursday": { "start": "09:00", "end": "17:00" },
				"friday": { "start": "09:00", "end": "17:00" },
				"saturday": null,
				"sunday": null
			}
		},
		"account_info": {
			"status": "active",
			"account_type": "business",
			"member_since": "2023-08-15T10:30:00Z",
			"last_active": "2024-01-20T14:25:00Z",
			"last_login": "2024-01-20T09:15:00Z",
			"subscription_tier": "professional",
			"subscription_status": "active",
			"subscription_expires": "2024-12-15T23:59:59Z",
			"email_verified": true,
			"phone_verified": true,
			"two_factor_enabled": true
		},
		"stats": {
			"total_projects": 12,
			"active_projects": 3,
			"completed_projects": 9,
			"cancelled_projects": 0,
			"total_spent": 125000.0,
			"avg_project_value": 10416.67,
			"largest_project_value": 25000.0,
			"providers_worked_with": 8,
			"repeat_engagement_rate": 0.75,
			"avg_project_duration": 45,
			"on_time_completion_rate": 0.89,
			"client_satisfaction_score": 4.7
		},
		"preferences": {
			"communication_method": "email",
			"notification_preferences": {
				"email_notifications": true,
				"sms_notifications": false,
				"push_notifications": true,
				"marketing_emails": false
			},
			"project_types": ["web-development", "mobile-apps", "ui-ux-design"],
			"preferred_provider_types": ["company", "agency"],
			"budget_range": {
				"min": 5000,
				"max": 50000,
				"currency": "USD",
				"typical": 15000
			},
			"timeline_preferences": {
				"typical_duration": "2-3 months",
				"flexibility": "medium",
				"rush_projects": false
			},
			"geographic_preferences": {
				"local_preferred": false,
				"time_zone_overlap": "required",
				"min_overlap_hours": 4
			}
		},
		"billing_info": {
			"currency": "USD",
			"payment_methods": [
				{
					"id": "pm_123",
					"type": "credit_card",
					"brand": "visa",
					"last4": "4242",
					"is_default": true,
					"expires": "2025-12"
				}
			],
			"billing_address": {
				"line1": "123 Market Street",
				"city": "San Francisco",
				"state": "CA",
				"postal_code": "94105",
				"country": "US"
			},
			"tax_info": {
				"business_tax_id": "12-3456789",
				"tax_exempt": false
			}
		},
		"team": [
			{
				"id": "team_001",
				"name": "Sarah Johnson",
				"email": "sarah.johnson@acmecorp.com",
				"role": "Technical Lead",
				"permissions": [
					"view_projects",
					"manage_providers",
					"approve_payments"
				],
				"avatar_url": "https://cdn.trific.com/avatars/sarah.jpg",
				"added_at": "2023-09-01T12:00:00Z"
			}
		],
		"security": {
			"last_password_change": "2023-12-01T10:30:00Z",
			"login_attempts": {
				"successful": 45,
				"failed": 2,
				"last_failed": "2024-01-18T08:30:00Z"
			},
			"ip_whitelist": ["192.168.1.100", "10.0.0.50"],
			"session_timeout": 3600
		},
		"created_at": "2023-08-15T10:30:00Z",
		"updated_at": "2024-01-18T16:45:00Z",
		"profile_completion": 92
	}
}
```

### Create Client

Create a new client account.

```http
POST /clients
```

#### Request Body

```json
{
	"email": "jane.smith@newcorp.com",
	"first_name": "Jane",
	"last_name": "Smith",
	"password": "SecurePassword123!",
	"company": {
		"name": "NewCorp Inc.",
		"website": "https://newcorp.com",
		"industry": "Healthcare",
		"size": "small",
		"location": {
			"country": "US",
			"region": "Texas",
			"city": "Austin"
		}
	},
	"contact_info": {
		"phone": "+1-555-0199",
		"timezone": "America/Chicago",
		"preferred_language": "en"
	},
	"preferences": {
		"project_types": ["web-development"],
		"budget_range": {
			"min": 10000,
			"max": 30000,
			"currency": "USD"
		}
	},
	"accept_terms": true,
	"subscribe_to_updates": true
}
```

#### Response

```json
{
	"data": {
		"id": "client_xyz789",
		"email": "jane.smith@newcorp.com",
		"first_name": "Jane",
		"last_name": "Smith",
		"status": "pending_verification",
		"verification": {
			"email_sent": true,
			"expires_at": "2024-01-23T15:30:00Z"
		},
		"created_at": "2024-01-22T15:30:00Z"
	},
	"message": "Client account created successfully. Verification email sent."
}
```

### Update Client

Update an existing client profile.

```http
PUT /clients/{client_id}
PATCH /clients/{client_id}
```

#### Request Body (PATCH example)

```json
{
	"display_name": "John D. Doe",
	"bio": "Senior Product Manager specializing in B2B SaaS solutions",
	"company": {
		"size": "large",
		"employee_count": "201-500"
	},
	"preferences": {
		"budget_range": {
			"min": 10000,
			"max": 75000,
			"currency": "USD"
		},
		"project_types": ["web-development", "mobile-apps", "data-analytics"]
	},
	"contact_info": {
		"secondary_phone": "+1-555-0125"
	}
}
```

#### Response

```json
{
	"data": {
		"id": "client_abc123",
		"email": "john.doe@acmecorp.com",
		"display_name": "John D. Doe",
		"updated_at": "2024-01-22T16:45:00Z"
	},
	"message": "Client profile updated successfully."
}
```

### Get Client Projects

Retrieve projects associated with a specific client.

```http
GET /clients/{client_id}/projects
```

#### Query Parameters

| Parameter | Type    | Description                                          |
| --------- | ------- | ---------------------------------------------------- |
| `status`  | string  | Filter by status: `active`, `completed`, `cancelled` |
| `limit`   | integer | Number of results per page (default: 20)             |
| `offset`  | integer | Number of results to skip                            |
| `sort`    | string  | Sort by: `created_at`, `updated_at`, `value`         |

#### Response

```json
{
	"data": [
		{
			"id": "proj_123",
			"title": "E-commerce Platform Development",
			"description": "Complete e-commerce solution with payment integration",
			"status": "active",
			"budget": {
				"amount": 25000.0,
				"currency": "USD",
				"type": "fixed"
			},
			"provider": {
				"id": "prov_abc123",
				"business_name": "TechCorp Solutions",
				"avatar_url": "https://cdn.trific.com/logos/techcorp.jpg"
			},
			"timeline": {
				"start_date": "2024-01-01",
				"end_date": "2024-03-31",
				"duration_days": 90
			},
			"progress": {
				"percentage": 65,
				"milestones_completed": 4,
				"milestones_total": 6
			},
			"created_at": "2023-12-15T10:00:00Z",
			"updated_at": "2024-01-20T14:30:00Z"
		}
	],
	"pagination": {
		"limit": 20,
		"offset": 0,
		"total": 12,
		"has_more": false
	},
	"summary": {
		"total_value": 125000.0,
		"avg_value": 10416.67,
		"active_count": 3,
		"completed_count": 9
	}
}
```

### Get Client Team

Retrieve team members for a specific client.

```http
GET /clients/{client_id}/team
```

#### Response

```json
{
	"data": [
		{
			"id": "team_001",
			"email": "sarah.johnson@acmecorp.com",
			"first_name": "Sarah",
			"last_name": "Johnson",
			"display_name": "Sarah Johnson",
			"role": "Technical Lead",
			"permissions": [
				"view_projects",
				"manage_providers",
				"approve_payments",
				"manage_team"
			],
			"status": "active",
			"avatar_url": "https://cdn.trific.com/avatars/sarah.jpg",
			"last_active": "2024-01-20T11:30:00Z",
			"added_by": "client_abc123",
			"added_at": "2023-09-01T12:00:00Z"
		}
	],
	"permissions_available": [
		"view_projects",
		"create_projects",
		"manage_providers",
		"approve_payments",
		"manage_team",
		"view_billing",
		"manage_billing"
	]
}
```

### Add Team Member

Add a new team member to a client account.

```http
POST /clients/{client_id}/team
```

#### Request Body

```json
{
	"email": "mike.wilson@acmecorp.com",
	"first_name": "Mike",
	"last_name": "Wilson",
	"role": "Project Manager",
	"permissions": ["view_projects", "create_projects", "manage_providers"],
	"send_invitation": true
}
```

#### Response

```json
{
	"data": {
		"id": "team_002",
		"email": "mike.wilson@acmecorp.com",
		"status": "invitation_sent",
		"invitation_expires": "2024-01-29T15:30:00Z",
		"added_at": "2024-01-22T15:30:00Z"
	},
	"message": "Team member added and invitation sent."
}
```

### Update Payment Methods

Manage client payment methods.

```http
POST /clients/{client_id}/payment-methods
```

#### Request Body

```json
{
	"type": "credit_card",
	"card": {
		"number": "4242424242424242",
		"exp_month": 12,
		"exp_year": 2025,
		"cvc": "123"
	},
	"billing_address": {
		"line1": "123 Market Street",
		"city": "San Francisco",
		"state": "CA",
		"postal_code": "94105",
		"country": "US"
	},
	"make_default": true
}
```

#### Response

```json
{
	"data": {
		"id": "pm_456",
		"type": "credit_card",
		"brand": "visa",
		"last4": "4242",
		"exp_month": 12,
		"exp_year": 2025,
		"is_default": true,
		"created_at": "2024-01-22T16:00:00Z"
	},
	"message": "Payment method added successfully."
}
```

### Client Search & Filtering

Search and filter clients (admin/management only).

```http
POST /clients/search
```

#### Request Body

```json
{
	"query": "technology startup",
	"filters": {
		"account_status": ["active"],
		"company_size": ["small", "medium"],
		"industry": ["Technology", "SaaS"],
		"subscription_tier": ["professional", "enterprise"],
		"location": {
			"country": ["US", "CA"],
			"region": ["California", "New York"]
		},
		"stats": {
			"min_projects": 5,
			"min_total_spent": 50000
		},
		"created_after": "2023-01-01",
		"last_active_after": "2024-01-01"
	},
	"sort": [
		{ "field": "stats.total_spent", "order": "desc" },
		{ "field": "created_at", "order": "desc" }
	],
	"pagination": {
		"limit": 25,
		"offset": 0
	}
}
```

#### Response

```json
{
	"data": [
		// Client objects matching search criteria
	],
	"pagination": {
		"limit": 25,
		"offset": 0,
		"total": 156,
		"has_more": true
	},
	"facets": {
		"industry": {
			"Technology": 89,
			"Healthcare": 34,
			"Finance": 23
		},
		"company_size": {
			"small": 67,
			"medium": 56,
			"large": 33
		},
		"subscription_tier": {
			"professional": 98,
			"enterprise": 45,
			"basic": 13
		}
	}
}
```

## Error Responses

### Standard Error Format

```json
{
	"error": {
		"code": "VALIDATION_ERROR",
		"message": "Request validation failed",
		"details": [
			{
				"field": "email",
				"message": "Email already exists",
				"code": "DUPLICATE_EMAIL"
			}
		],
		"request_id": "req_client123"
	}
}
```

### Common Error Codes

| Code                   | HTTP Status | Description                            |
| ---------------------- | ----------- | -------------------------------------- |
| `CLIENT_NOT_FOUND`     | 404         | Client with specified ID not found     |
| `DUPLICATE_EMAIL`      | 409         | Email address already in use           |
| `INVALID_PERMISSIONS`  | 403         | Insufficient permissions for operation |
| `PAYMENT_METHOD_ERROR` | 400         | Payment method validation failed       |
| `TEAM_LIMIT_EXCEEDED`  | 400         | Maximum team size exceeded             |

---

_Next: [Jobs API](/api/endpoints/jobs) →_
