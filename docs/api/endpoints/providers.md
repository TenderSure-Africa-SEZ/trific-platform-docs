# API Endpoints - Providers

The Providers API enables management of service provider profiles, capabilities, and business information within the Trific Platform ecosystem.

## Overview

The Providers API provides endpoints for:

-   **Provider Profile Management** - Create, read, update provider profiles
-   **Service Catalog Management** - Manage service offerings and capabilities
-   **Verification Status** - Track vetting and verification status
-   **Performance Metrics** - Access provider ratings and statistics
-   **Search & Discovery** - Advanced provider search capabilities

## Base URL

```
https://api.trific.com/v1/providers
```

## Authentication

All endpoints require authentication via API key or OAuth 2.0:

```http
Authorization: Bearer YOUR_ACCESS_TOKEN
X-API-Key: YOUR_API_KEY
```

## Endpoints

### List Providers

Retrieve a paginated list of providers with filtering options.

```http
GET /providers
```

#### Query Parameters

| Parameter    | Type    | Description                                              |
| ------------ | ------- | -------------------------------------------------------- |
| `limit`      | integer | Number of results per page (1-100, default: 20)          |
| `offset`     | integer | Number of results to skip (default: 0)                   |
| `category`   | string  | Filter by service category                               |
| `location`   | string  | Filter by geographic location                            |
| `rating_min` | number  | Minimum rating (1-5)                                     |
| `verified`   | boolean | Filter by verification status                            |
| `available`  | boolean | Filter by availability status                            |
| `sort`       | string  | Sort by: `rating`, `reviews`, `created_at`, `updated_at` |
| `order`      | string  | Sort order: `asc`, `desc`                                |

#### Example Request

```bash
curl -X GET "https://api.trific.com/v1/providers" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -G \
  -d "category=web-development" \
  -d "location=US" \
  -d "verified=true" \
  -d "limit=10" \
  -d "sort=rating" \
  -d "order=desc"
```

#### Response

```json
{
	"data": [
		{
			"id": "prov_abc123",
			"business_name": "TechCorp Solutions",
			"display_name": "TechCorp",
			"slug": "techcorp-solutions",
			"email": "contact@techcorp.com",
			"phone": "+1-555-0123",
			"website": "https://techcorp.com",
			"logo_url": "https://cdn.trific.com/logos/techcorp.jpg",
			"cover_image_url": "https://cdn.trific.com/covers/techcorp.jpg",
			"tagline": "Innovative web solutions for modern businesses",
			"description": "Full-service web development agency...",
			"location": {
				"country": "US",
				"region": "California",
				"city": "San Francisco",
				"timezone": "America/Los_Angeles"
			},
			"categories": [
				{
					"id": "cat_web_dev",
					"name": "Web Development",
					"slug": "web-development"
				}
			],
			"specializations": [
				"React.js",
				"Node.js",
				"E-commerce",
				"API Development"
			],
			"rating": {
				"average": 4.8,
				"count": 124,
				"distribution": {
					"5": 98,
					"4": 20,
					"3": 4,
					"2": 1,
					"1": 1
				}
			},
			"verification": {
				"status": "verified",
				"tendersure_score": 85,
				"last_verified": "2024-01-15T10:30:00Z",
				"badges": [
					"identity_verified",
					"business_verified",
					"skill_verified"
				]
			},
			"business_info": {
				"type": "company",
				"years_in_business": 8,
				"team_size": "11-50",
				"registration_number": "REG123456789"
			},
			"availability": {
				"status": "available",
				"response_time": "within_2_hours",
				"capacity": "medium"
			},
			"pricing": {
				"hourly_rate": {
					"min": 75,
					"max": 150,
					"currency": "USD"
				},
				"project_rate": {
					"min": 5000,
					"max": 50000,
					"currency": "USD"
				}
			},
			"stats": {
				"projects_completed": 156,
				"repeat_client_rate": 0.78,
				"on_time_delivery": 0.94,
				"client_satisfaction": 0.96
			},
			"created_at": "2023-06-15T14:30:00Z",
			"updated_at": "2024-01-20T09:45:00Z"
		}
	],
	"pagination": {
		"limit": 10,
		"offset": 0,
		"total": 245,
		"has_more": true
	},
	"meta": {
		"total_verified": 198,
		"total_available": 156,
		"avg_rating": 4.6,
		"categories_count": {
			"web-development": 89,
			"mobile-development": 67,
			"design": 45
		}
	}
}
```

### Get Provider

Retrieve detailed information about a specific provider.

```http
GET /providers/{provider_id}
```

#### Path Parameters

| Parameter     | Type   | Description                |
| ------------- | ------ | -------------------------- |
| `provider_id` | string | Unique provider identifier |

#### Example Request

```bash
curl -X GET "https://api.trific.com/v1/providers/prov_abc123" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Content-Type: application/json"
```

#### Response

```json
{
	"data": {
		"id": "prov_abc123",
		"business_name": "TechCorp Solutions",
		"display_name": "TechCorp",
		"slug": "techcorp-solutions",
		"email": "contact@techcorp.com",
		"phone": "+1-555-0123",
		"website": "https://techcorp.com",
		"logo_url": "https://cdn.trific.com/logos/techcorp.jpg",
		"cover_image_url": "https://cdn.trific.com/covers/techcorp.jpg",
		"tagline": "Innovative web solutions for modern businesses",
		"description": "Full-service web development agency specializing in modern web applications, e-commerce solutions, and API development. We combine cutting-edge technology with proven methodologies to deliver exceptional results for our clients.",
		"location": {
			"country": "US",
			"region": "California",
			"city": "San Francisco",
			"address": "123 Tech Street, San Francisco, CA 94105",
			"timezone": "America/Los_Angeles",
			"coordinates": {
				"lat": 37.7749,
				"lng": -122.4194
			}
		},
		"categories": [
			{
				"id": "cat_web_dev",
				"name": "Web Development",
				"slug": "web-development",
				"is_primary": true
			},
			{
				"id": "cat_mobile_dev",
				"name": "Mobile Development",
				"slug": "mobile-development",
				"is_primary": false
			}
		],
		"specializations": [
			"React.js",
			"Node.js",
			"E-commerce",
			"API Development",
			"Cloud Architecture",
			"DevOps"
		],
		"industries": ["E-commerce", "FinTech", "Healthcare", "Education"],
		"rating": {
			"average": 4.8,
			"count": 124,
			"distribution": {
				"5": 98,
				"4": 20,
				"3": 4,
				"2": 1,
				"1": 1
			},
			"recent_trend": "stable"
		},
		"verification": {
			"status": "verified",
			"tendersure_score": 85,
			"last_verified": "2024-01-15T10:30:00Z",
			"next_review": "2024-04-15T10:30:00Z",
			"badges": [
				{
					"id": "identity_verified",
					"name": "Identity Verified",
					"icon": "shield-check",
					"verified_at": "2023-06-20T14:30:00Z"
				},
				{
					"id": "business_verified",
					"name": "Business Verified",
					"icon": "building-check",
					"verified_at": "2023-06-22T16:45:00Z"
				},
				{
					"id": "skill_verified",
					"name": "Skills Verified",
					"icon": "star-check",
					"verified_at": "2023-07-10T11:20:00Z"
				}
			]
		},
		"business_info": {
			"type": "company",
			"legal_name": "TechCorp Solutions LLC",
			"years_in_business": 8,
			"founded_date": "2016-03-15",
			"team_size": "11-50",
			"registration_number": "REG123456789",
			"tax_id": "TAX987654321",
			"certifications": [
				{
					"name": "AWS Solutions Architect",
					"issuer": "Amazon Web Services",
					"valid_until": "2025-06-30",
					"verified": true
				}
			],
			"insurance": {
				"professional_liability": true,
				"general_liability": true,
				"coverage_amount": 2000000,
				"valid_until": "2024-12-31"
			}
		},
		"availability": {
			"status": "available",
			"response_time": "within_2_hours",
			"capacity": "medium",
			"working_hours": {
				"timezone": "America/Los_Angeles",
				"monday": { "start": "09:00", "end": "17:00" },
				"tuesday": { "start": "09:00", "end": "17:00" },
				"wednesday": { "start": "09:00", "end": "17:00" },
				"thursday": { "start": "09:00", "end": "17:00" },
				"friday": { "start": "09:00", "end": "17:00" },
				"saturday": null,
				"sunday": null
			},
			"vacation_periods": [
				{
					"start": "2024-07-01",
					"end": "2024-07-15",
					"reason": "Summer vacation"
				}
			]
		},
		"pricing": {
			"hourly_rate": {
				"min": 75,
				"max": 150,
				"currency": "USD",
				"effective_date": "2024-01-01"
			},
			"project_rate": {
				"min": 5000,
				"max": 50000,
				"currency": "USD"
			},
			"payment_terms": {
				"deposit_required": true,
				"deposit_percentage": 30,
				"payment_schedule": "milestone_based",
				"accepted_methods": ["bank_transfer", "credit_card", "check"]
			}
		},
		"stats": {
			"projects_completed": 156,
			"active_projects": 8,
			"repeat_client_rate": 0.78,
			"on_time_delivery": 0.94,
			"client_satisfaction": 0.96,
			"response_time_avg": "1.2 hours",
			"completion_rate": 0.98
		},
		"portfolio": [
			{
				"id": "port_123",
				"title": "E-commerce Platform Redesign",
				"description": "Complete redesign and development of e-commerce platform",
				"image_url": "https://cdn.trific.com/portfolio/project123.jpg",
				"project_type": "Web Development",
				"completion_date": "2023-11-15",
				"client_testimonial": "Outstanding work and excellent communication throughout the project."
			}
		],
		"team": [
			{
				"id": "team_001",
				"name": "John Smith",
				"role": "Lead Developer",
				"specializations": ["React.js", "Node.js"],
				"years_experience": 8,
				"avatar_url": "https://cdn.trific.com/avatars/john.jpg"
			}
		],
		"contact_preferences": {
			"preferred_method": "email",
			"available_methods": ["email", "phone", "video_call"],
			"languages": ["English", "Spanish"],
			"response_commitment": "within_24_hours"
		},
		"created_at": "2023-06-15T14:30:00Z",
		"updated_at": "2024-01-20T09:45:00Z",
		"profile_completion": 95
	}
}
```

### Create Provider

Create a new provider profile. Requires appropriate permissions.

```http
POST /providers
```

#### Request Body

```json
{
	"business_name": "New Tech Solutions",
	"display_name": "NewTech",
	"email": "contact@newtech.com",
	"phone": "+1-555-0199",
	"website": "https://newtech.com",
	"tagline": "Cutting-edge technology solutions",
	"description": "We specialize in modern web applications and mobile solutions...",
	"location": {
		"country": "US",
		"region": "New York",
		"city": "New York",
		"timezone": "America/New_York"
	},
	"categories": ["web-development", "mobile-development"],
	"specializations": ["React.js", "React Native", "TypeScript"],
	"business_info": {
		"type": "company",
		"legal_name": "New Tech Solutions Inc.",
		"years_in_business": 3,
		"team_size": "1-10",
		"registration_number": "REG999888777"
	},
	"pricing": {
		"hourly_rate": {
			"min": 60,
			"max": 120,
			"currency": "USD"
		}
	}
}
```

#### Response

```json
{
	"data": {
		"id": "prov_xyz789",
		"business_name": "New Tech Solutions",
		"status": "pending_verification",
		"verification": {
			"status": "pending",
			"next_steps": [
				"Complete business verification",
				"Upload required documents",
				"Complete TenderSure assessment"
			]
		},
		"created_at": "2024-01-22T15:30:00Z"
	},
	"message": "Provider profile created successfully. Verification process initiated."
}
```

### Update Provider

Update an existing provider profile.

```http
PUT /providers/{provider_id}
PATCH /providers/{provider_id}
```

#### Request Body (PATCH example)

```json
{
	"tagline": "Updated tagline for our services",
	"specializations": ["React.js", "Vue.js", "Node.js", "Python"],
	"availability": {
		"status": "busy",
		"capacity": "low"
	},
	"pricing": {
		"hourly_rate": {
			"min": 80,
			"max": 160,
			"currency": "USD"
		}
	}
}
```

#### Response

```json
{
	"data": {
		"id": "prov_abc123",
		"business_name": "TechCorp Solutions",
		"tagline": "Updated tagline for our services",
		"updated_at": "2024-01-22T16:45:00Z"
	},
	"message": "Provider profile updated successfully."
}
```

### Search Providers

Advanced provider search with complex filtering.

```http
POST /providers/search
```

#### Request Body

```json
{
	"query": "web development react",
	"filters": {
		"categories": ["web-development"],
		"specializations": ["React.js"],
		"location": {
			"country": "US",
			"radius": {
				"lat": 37.7749,
				"lng": -122.4194,
				"distance": 50,
				"unit": "km"
			}
		},
		"rating": {
			"min": 4.0,
			"min_reviews": 10
		},
		"pricing": {
			"hourly_rate": {
				"max": 150,
				"currency": "USD"
			}
		},
		"availability": {
			"status": ["available", "busy"],
			"response_time": "within_24_hours"
		},
		"verification": {
			"verified_only": true,
			"badges": ["skill_verified"]
		}
	},
	"sort": [
		{ "field": "rating.average", "order": "desc" },
		{ "field": "stats.projects_completed", "order": "desc" }
	],
	"pagination": {
		"limit": 20,
		"offset": 0
	}
}
```

#### Response

```json
{
	"data": [
		// Provider objects matching search criteria
	],
	"pagination": {
		"limit": 20,
		"offset": 0,
		"total": 45,
		"has_more": true
	},
	"facets": {
		"categories": {
			"web-development": 89,
			"mobile-development": 67
		},
		"location": {
			"US": 156,
			"CA": 45
		},
		"rating": {
			"4_to_5": 134,
			"3_to_4": 23
		}
	},
	"search_meta": {
		"query_time": 45,
		"total_indexed": 15420,
		"filters_applied": 7
	}
}
```

### Get Provider Reviews

Retrieve reviews and ratings for a specific provider.

```http
GET /providers/{provider_id}/reviews
```

#### Query Parameters

| Parameter  | Type    | Description                              |
| ---------- | ------- | ---------------------------------------- |
| `limit`    | integer | Number of reviews per page (default: 10) |
| `offset`   | integer | Number of reviews to skip                |
| `rating`   | integer | Filter by rating (1-5)                   |
| `sort`     | string  | Sort by: `date`, `rating`, `helpfulness` |
| `verified` | boolean | Show only verified reviews               |

#### Response

```json
{
	"data": [
		{
			"id": "rev_123",
			"rating": 5,
			"title": "Exceptional work and communication",
			"content": "TechCorp delivered exactly what we needed on time and within budget. Their communication was excellent throughout the project.",
			"client": {
				"name": "John D.",
				"avatar_url": "https://cdn.trific.com/avatars/client123.jpg",
				"verified": true
			},
			"project": {
				"title": "E-commerce Website Development",
				"category": "Web Development",
				"completion_date": "2024-01-10",
				"value_range": "$10k-$25k"
			},
			"metrics": {
				"communication": 5,
				"quality": 5,
				"timeliness": 5,
				"value": 4
			},
			"helpful_votes": 8,
			"verified_purchase": true,
			"created_at": "2024-01-15T14:30:00Z"
		}
	],
	"summary": {
		"average_rating": 4.8,
		"total_reviews": 124,
		"rating_distribution": {
			"5": 98,
			"4": 20,
			"3": 4,
			"2": 1,
			"1": 1
		},
		"metrics_average": {
			"communication": 4.9,
			"quality": 4.8,
			"timeliness": 4.7,
			"value": 4.6
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
				"message": "Invalid email format",
				"code": "INVALID_FORMAT"
			}
		],
		"request_id": "req_abc123def456"
	}
}
```

### Common Error Codes

| Code                  | HTTP Status | Description                            |
| --------------------- | ----------- | -------------------------------------- |
| `PROVIDER_NOT_FOUND`  | 404         | Provider with specified ID not found   |
| `VALIDATION_ERROR`    | 400         | Request validation failed              |
| `PERMISSION_DENIED`   | 403         | Insufficient permissions for operation |
| `RATE_LIMIT_EXCEEDED` | 429         | API rate limit exceeded                |
| `INTERNAL_ERROR`      | 500         | Internal server error                  |

## Rate Limits

-   **Standard endpoints**: 100 requests per minute
-   **Search endpoints**: 50 requests per minute
-   **Bulk operations**: 20 requests per minute

Rate limit headers are included in responses:

```http
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1643723400
```

---

_Next: [Clients API](/api/endpoints/clients) →_
