# Jobs API Endpoints

API endpoints for managing jobs on the Trific platform.

## Endpoints

### Create Job

**POST** `/api/jobs`

Create a new job posting.

### Get Job

**GET** `/api/jobs/{id}`

Retrieve job details by ID.

### List Jobs

**GET** `/api/jobs`

List all jobs with filtering and pagination.

### Update Job

**PUT** `/api/jobs/{id}`

Update an existing job.

### Delete Job

**DELETE** `/api/jobs/{id}`

Remove a job posting.

### Job Applications

**GET** `/api/jobs/{id}/applications`

Get applications for a specific job.

## Request Examples

### Create Job Request

```json
{
	"title": "Web Development Project",
	"description": "Need a responsive website built",
	"category": "web-development",
	"budget": 5000,
	"deadline": "2025-10-01",
	"requirements": ["HTML/CSS", "JavaScript", "Responsive Design"]
}
```

### Response Format

```json
{
	"id": "job_123",
	"title": "Web Development Project",
	"status": "open",
	"created_at": "2025-09-17T10:00:00Z",
	"client_id": "client_456"
}
```
