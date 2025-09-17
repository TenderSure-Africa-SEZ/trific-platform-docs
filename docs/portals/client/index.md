# Client Portal Documentation

The **TRIFIC Client Portal** enables clients to register, post jobs, manage contracts, track payments, and communicate with service providers through a comprehensive platform interface.

## Overview & Purpose

The Client Portal serves as the primary interface for clients to:

-   **Register and verify identity** through KYC/business verification processes
-   **Post and manage jobs** (create, edit, delete, publish)
-   **View and approve contracts** and milestones
-   **Track spending and wallet balance** with transaction history
-   **Communicate with service providers** through in-app messaging and file sharing
-   **Leave reviews** after job completion to build trust in the marketplace

## Target Audience

-   **Primary Users:** Individual clients and business organizations
-   **Secondary Users:** Support staff, QA testers, product stakeholders
-   **Prerequisites:** Active client account with verified KYC status

## Platform Navigation Map

```
+------------------------------------------------------------+
| Header: Logo | Nav (Dashboard | Jobs | Wallet | Messages ) |
|                                    | Profile | Help        |
+------------------------------------------------------------+
| Dashboard: KPIs (Spend, Jobs) | Notifications              |
+------------------------------------------------------------+
| Jobs: Active | In-progress | Completed | Pending Approval  |
| - Create/Edit/Delete/Publish Job                            |
+------------------------------------------------------------+
| Contracts: View | Approve Milestones | Upload Docs         |
+------------------------------------------------------------+
| Messaging: Threads per Job | File Sharing                  |
+------------------------------------------------------------+
| Wallet: Balance | Transaction History | Fund Escrow        |
+------------------------------------------------------------+
| Profile: Bio | Avatar | Verification | Rating/Badge        |
+------------------------------------------------------------+
| Footer: Policies | Contact | Help                          |
+------------------------------------------------------------+
```

## Client Job Lifecycle Flow

```
[Client Registers + KYC]
    -> [Post Job]
        -> [Provider Applies]
            -> [Contract + Milestones]
                -> [Client Approves]
                    -> [Escrow Release to Provider]
                        -> [Job Complete]
                            -> [Client Leaves Review]
```

## Core Features & Modules

### [Dashboard](dashboard/)

-   **Purpose:** Central overview of client activities
-   **Key Features:** KPI metrics, notifications, quick actions
-   **Content:** Monthly spend tracking, active job counts, recent activities

### [Job Management](job-management/)

-   **Purpose:** Create, edit, and manage job postings
-   **Key Features:** Job creation wizard, status tracking, applicant management
-   **Content:** Job lifecycle management, skills matching, budget setting

### [Contract Management](contract-management/)

-   **Purpose:** Handle service agreements and milestone approvals
-   **Key Features:** Contract viewing, milestone approval, document uploads
-   **Content:** Escrow integration, payment releases, contract modifications

### [Provider Discovery](provider-discovery/)

-   **Purpose:** Find and evaluate potential service providers
-   **Key Features:** Search filters, provider profiles, rating system
-   **Content:** Skills matching, portfolio reviews, communication tools

### [Messaging](messaging/)

-   **Purpose:** Communication hub for client-provider interactions
-   **Key Features:** Job-specific threads, file sharing, real-time chat
-   **Content:** Message history, attachment management, notification settings

### [Payments](payments/)

-   **Purpose:** Financial management and transaction processing
-   **Key Features:** Wallet balance, escrow funding, transaction history
-   **Content:** PayPal/M-Pesa integration, refund processing, spending analytics

### [Reviews & Ratings](reviews-ratings/)

-   **Purpose:** Feedback system for completed services
-   **Key Features:** Rating submissions, review management, provider feedback
-   **Content:** Review templates, rating criteria, dispute resolution

### [User Management](user-management/)

-   **Purpose:** Account settings and profile management
-   **Key Features:** Profile updates, KYC status, security settings
-   **Content:** Personal information, verification documents, preferences

## System States & User Experience

| State                 | Description               | User Experience                       |
| --------------------- | ------------------------- | ------------------------------------- |
| **First-time Client** | New user, no jobs posted  | Dashboard prompts to create first job |
| **Active Client**     | Has posted/managing jobs  | Dashboard shows job status overview   |
| **Loading States**    | Data fetching in progress | Skeleton placeholders for content     |
| **Empty States**      | No content available      | Helpful CTAs to guide next actions    |
| **Error States**      | API failures or issues    | Error banners with retry options      |

## Security & Privacy

-   **Session Management:** Automatic logout for expired sessions
-   **Data Encryption:** KYC documents encrypted at rest
-   **Access Control:** Permission-based job data access
-   **Privacy Protection:** No sensitive information in URLs

## Accessibility Features

-   **Keyboard Navigation:** Full tab-order support through all interfaces
-   **ARIA Support:** Proper roles and labels on forms and interactive elements
-   **Focus Management:** Visible focus states on all actionable elements
-   **Screen Reader Support:** Alt text for images and descriptive labels

## Performance & Reliability

-   **Lazy Loading:** Optimized loading for job lists and message threads
-   **Caching Strategy:** Wallet balances cached for immediate display
-   **Error Recovery:** Graceful retry mechanisms for failed API calls
-   **Load Performance:** Dashboard loads in under 2 seconds

## Analytics & Telemetry

Key tracking events include:

-   Job posting and management activities
-   Milestone approvals and payment releases
-   Message sending and file sharing
-   Wallet funding and transaction events
-   Profile updates and verification status

## Troubleshooting & Support

### Common Issues & Solutions

**Q: Why can't I post a job?**
A: Ensure your profile and KYC verification are complete and approved.

**Q: Why can't I release milestone funds?**
A: Verify the milestone approval status and check your escrow balance.

**Q: Why can't I see provider messages?**
A: Check your network connection and refresh the page. Ensure notifications are enabled.

**Q: How do I fund my escrow account?**
A: Navigate to Wallet → Fund Escrow and select PayPal, bank transfer, or M-Pesa options.

## Documentation Sections

### User Guides

-   [User Manual - Comprehensive Guide](user-manual/)
-   [Quick Start Guide](../getting-started/quick-start/)
-   [Client Handbook](../../guides/user-guides/client-handbook/)

### Testing & Quality Assurance

-   [E2E Testing Workflow](testing/e2e-workflow/)
-   [User Acceptance Testing](testing/uat-scenarios/)
-   [Accessibility Testing](testing/accessibility/)

### Technical Documentation

-   [API Integration](../../api/)
-   [Security Implementation](../../architecture/security/)
-   [Platform Architecture](../../architecture/system-overview/)

### Support Resources

-   [FAQ](../../support/faq/)
-   [Contact Support](../../support/contact/)
-   [Troubleshooting Guide](../../support/troubleshooting/)

---

_This documentation is designed to be reusable across other portal types (Service Provider, Admin, Management) by adapting the modules and workflows to their specific contexts._
